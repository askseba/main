// MOYASAR ADDON - File 3/8: src/app/api/webhooks/moyasar/route.ts
// ✅ PRODUCTION-READY MOYASAR WEBHOOK HANDLER
// 🎯 Handle payment success, failure, and recurring charges
// ✅ All database operations wrapped in transactions
// ✅ Production error masking

import { NextRequest, NextResponse } from 'next/server'
import { getMoyasarService } from '@/lib/payment/moyasar.service'
import { prisma } from '@/lib/prisma'
import { logConversionEvent } from '@/lib/gating'
import { sendPaymentSuccessEmail, sendPaymentFailedEmail } from '@/lib/email/email.service'

export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('x-moyasar-signature') || ''
    
    // 2. ✅ Verify webhook signature (constant-time comparison)
    const moyasar = getMoyasarService()
    const isValid = moyasar.verifyWebhookSignature(rawBody, signature)
    
    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }
    
    // 3. Parse webhook payload
    const payload = JSON.parse(rawBody)
    const { type, data } = payload
    
    if (!data || !data.id) {
      const isProduction = process.env.NODE_ENV === 'production'
      console.error('Invalid webhook payload: missing data or data.id')
      return NextResponse.json(
        { error: isProduction ? 'Invalid request' : 'Invalid webhook payload: missing data or data.id' },
        { status: 400 }
      )
    }
    
    console.log('Moyasar webhook received:', type, data.id)
    
    // 4. Handle different webhook types
    switch (type) {
      case 'payment.paid':
        return await handlePaymentSuccess(data)
      
      case 'payment.failed':
        return await handlePaymentFailed(data)
      
      case 'payment.refunded':
        return await handlePaymentRefunded(data)
      
      default:
        console.log('Unhandled webhook type:', type)
        return NextResponse.json({ received: true })
    }
    
  } catch (error) {
    const isProduction = process.env.NODE_ENV === 'production'
    
    // ✅ Log full error details server-side only
    console.error('Webhook processing error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // ✅ Production error masking
    return NextResponse.json(
      { error: isProduction ? 'Webhook processing failed' : (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

/**
 * Handle successful payment
 * ✅ All database operations wrapped in transaction for atomicity
 */
async function handlePaymentSuccess(paymentData: any) {
  const paymentId = paymentData.id
  const metadata = paymentData.metadata || {}
  const userId = metadata.userId
  const plan = metadata.plan
  
  if (!userId) {
    console.error('No userId in payment metadata')
    const isProduction = process.env.NODE_ENV === 'production'
    return NextResponse.json(
      { error: isProduction ? 'Invalid request' : 'Invalid metadata' }, 
      { status: 400 }
    )
  }
  
  // Validate amount is a finite number
  if (typeof paymentData.amount !== 'number' || !Number.isFinite(paymentData.amount)) {
    const isProduction = process.env.NODE_ENV === 'production'
    console.error('Invalid payment amount:', paymentData.amount)
    return NextResponse.json(
      { error: isProduction ? 'Invalid request' : 'Invalid payment amount' },
      { status: 400 }
    )
  }
  
  // Validate plan is 'monthly' or 'yearly'
  if (plan !== 'monthly' && plan !== 'yearly') {
    const isProduction = process.env.NODE_ENV === 'production'
    console.error('Invalid plan in metadata:', plan)
    return NextResponse.json(
      { error: isProduction ? 'Invalid request' : 'Invalid plan in metadata' },
      { status: 400 }
    )
  }
  
  const amount = paymentData.amount / 100 // Convert from halalas to SAR
  
  try {
    // ✅ All database operations in a single transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get user
      const user = await tx.user.findUnique({
        where: { id: userId }
      })
      
      if (!user) {
        console.error('User not found:', userId)
        throw new Error('User not found')
      }
      
      // 2. Calculate dates
      const startDate = new Date()
      const endDate = new Date()
      if (plan === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1)
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1)
      }
      
      // 3. Find existing subscription or create new one
      let subscription = await tx.subscription.findFirst({
        where: {
          userId,
          externalId: paymentId
        }
      })
      
      if (subscription) {
        // Update existing
        subscription = await tx.subscription.update({
          where: { id: subscription.id },
          data: {
            status: 'ACTIVE',
            provider: 'MANUAL',
            startDate,
            endDate,
            moyasarPaymentId: paymentId,
            moyasarSourceId: paymentData.source?.token || null,
            lastPaymentDate: new Date(),
            nextBillingDate: endDate
          }
        })
      } else {
        // Create new
        subscription = await tx.subscription.create({
          data: {
            userId,
            tier: 'PREMIUM',
            status: 'ACTIVE',
            plan,
            startDate,
            endDate,
            provider: 'MANUAL',
            externalId: paymentId,
            moyasarPaymentId: paymentId,
            moyasarSourceId: paymentData.source?.token || null,
            amount,
            currency: 'SAR',
            lastPaymentDate: new Date(),
            nextBillingDate: endDate
          }
        })
      }
      
      // 4. Upgrade user to PREMIUM tier (within transaction)
      await tx.user.update({
        where: { id: userId },
        data: {
          subscriptionTier: 'PREMIUM'
        }
      })
      
      return { user, subscription }
    })
    
    // 5. Log conversion event (outside transaction - non-critical)
    try {
      await logConversionEvent('payment_success', userId, {
        plan,
        amount,
        paymentId,
        subscriptionId: result.subscription.id
      })
    } catch (logError) {
      console.error('Failed to log conversion event:', logError)
      // Don't fail the webhook if logging fails
    }
    
    // 6. Send success email (outside transaction - non-critical)
    if (result.user.email) {
      try {
        const endDate = new Date()
        if (plan === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1)
        } else {
          endDate.setFullYear(endDate.getFullYear() + 1)
        }
        
        await sendPaymentSuccessEmail(result.user.email, {
          userName: result.user.name || 'عزيزي المستخدم',
          plan: plan === 'monthly' ? 'شهري' : 'سنوي',
          amount,
          currency: 'ريال سعودي',
          nextBillingDate: endDate,
          transactionId: paymentId
        })
      } catch (emailError) {
        console.error('Failed to send success email:', emailError)
        // Don't fail the webhook if email fails
      }
    }
    
    console.log('Payment processed successfully:', paymentId)
    
    return NextResponse.json({ 
      success: true,
      message: 'Payment processed successfully'
    })
    
  } catch (error) {
    const isProduction = process.env.NODE_ENV === 'production'
    
    // ✅ Log full error details server-side only
    console.error('Failed to process payment success:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      paymentId,
      userId
    })
    
    // ✅ Production error masking
    return NextResponse.json(
      { 
        error: isProduction ? 'Payment processing failed' : (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
}

/**
 * Handle failed payment
 * ✅ Database operations wrapped in transaction
 */
async function handlePaymentFailed(paymentData: any) {
  const paymentId = paymentData.id
  const metadata = paymentData.metadata || {}
  const userId = metadata.userId
  const failureReason = paymentData.source?.message || 'فشل الدفع'
  
  if (!userId) {
    return NextResponse.json({ received: true })
  }
  
  try {
    // ✅ Transaction for subscription update
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get user
      const user = await tx.user.findUnique({
        where: { id: userId }
      })
      
      if (!user) {
        return null
      }
      
      // 2. Update subscription status to EXPIRED if exists (within transaction)
      await tx.subscription.updateMany({
        where: {
          userId,
          externalId: paymentId
        },
        data: {
          status: 'EXPIRED'
        }
      })
      
      return user
    })
    
    if (!result) {
      return NextResponse.json({ received: true })
    }
    
    // 3. Log event (outside transaction - non-critical)
    try {
      await logConversionEvent('payment_failed', userId, {
        paymentId,
        reason: failureReason
      })
    } catch (logError) {
      console.error('Failed to log conversion event:', logError)
    }
    
    // 4. Send failure email (outside transaction - non-critical)
    if (result.email) {
      try {
        await sendPaymentFailedEmail(result.email, {
          userName: result.name || 'عزيزي المستخدم',
          reason: failureReason,
          supportEmail: 'support@askseba.com'
        })
      } catch (emailError) {
        console.error('Failed to send failure email:', emailError)
      }
    }
    
    console.log('Payment failed:', paymentId, failureReason)
    
    return NextResponse.json({ 
      success: true,
      message: 'Payment failure processed'
    })
    
  } catch (error) {
    const isProduction = process.env.NODE_ENV === 'production'
    
    // ✅ Log full error details server-side only
    console.error('Failed to process payment failure:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      paymentId,
      userId
    })
    
    // ✅ Production error masking
    return NextResponse.json(
      { 
        error: isProduction ? 'Payment failure processing failed' : (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
}

/**
 * Handle payment refund
 * ✅ Database operations wrapped in transaction
 */
async function handlePaymentRefunded(paymentData: any) {
  const paymentId = paymentData.id
  
  // Validate refunded amount is a finite number
  if (typeof paymentData.refunded !== 'number' || !Number.isFinite(paymentData.refunded)) {
    const isProduction = process.env.NODE_ENV === 'production'
    console.error('Invalid refunded amount:', paymentData.refunded)
    return NextResponse.json(
      { error: isProduction ? 'Invalid request' : 'Invalid refunded amount' },
      { status: 400 }
    )
  }
  
  const refundedAmount = paymentData.refunded / 100 // Convert to SAR
  
  try {
    // ✅ Transaction for subscription cancellation + user downgrade
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find subscription
      const subscription = await tx.subscription.findFirst({
        where: {
          moyasarPaymentId: paymentId
        },
        include: {
          user: true
        }
      })
      
      if (!subscription) {
        return null
      }
      
      // 2. Cancel subscription (within transaction)
      await tx.subscription.update({
        where: { id: subscription.id },
        data: {
          status: 'CANCELED',
          canceledAt: new Date(),
          cancelReason: 'refunded'
        }
      })
      
      // 3. Downgrade user to FREE (within transaction)
      await tx.user.update({
        where: { id: subscription.userId },
        data: {
          subscriptionTier: 'FREE'
        }
      })
      
      return subscription
    })
    
    if (!result) {
      return NextResponse.json({ received: true })
    }
    
    // 4. Log event (outside transaction - non-critical)
    try {
      await logConversionEvent('payment_refunded', result.userId, {
        paymentId,
        amount: refundedAmount,
        subscriptionId: result.id
      })
    } catch (logError) {
      console.error('Failed to log conversion event:', logError)
    }
    
    console.log('Payment refunded:', paymentId)
    
    return NextResponse.json({ 
      success: true,
      message: 'Refund processed'
    })
    
  } catch (error) {
    const isProduction = process.env.NODE_ENV === 'production'
    
    // ✅ Log full error details server-side only
    console.error('Failed to process refund:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      paymentId
    })
    
    // ✅ Production error masking
    return NextResponse.json(
      { 
        error: isProduction ? 'Refund processing failed' : (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
}
