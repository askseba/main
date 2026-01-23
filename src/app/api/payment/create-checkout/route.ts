// MOYASAR ADDON - File 2/8: src/app/api/payment/create-checkout/route.ts
// ✅ PRODUCTION-READY CREATE MOYASAR CHECKOUT SESSION
// 🎯 Called from PricingPage when user clicks subscribe
// ✅ Server-side price validation (authoritative source)
// ✅ Production error masking

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMoyasarService } from '@/lib/payment/moyasar.service'
import { prisma } from '@/lib/prisma'
import { logConversionEvent } from '@/lib/gating'

interface CheckoutRequest {
  plan: 'monthly' | 'yearly'
}

// ✅ Server-side price validation (authoritative source)
// This prevents client-side manipulation of payment amounts
const ALLOWED_PLANS: Record<'monthly' | 'yearly', { id: string; name: string; amount: number; currency: string }> = {
  monthly: {
    id: 'premium-monthly',
    name: 'اشتراك شهري',
    amount: 15,
    currency: 'SAR'
  },
  yearly: {
    id: 'premium-yearly',
    name: 'اشتراك سنوي',
    amount: 150,
    currency: 'SAR'
  }
}

export async function POST(request: NextRequest) {
  let session: any = null
  
  try {
    // 1. Check authentication
    session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }
    
    const userId = session.user.id
    const userEmail = session.user.email || ''
    const userName = session.user.name || ''
    
    // 2. Parse request
    const body: CheckoutRequest = await request.json()
    const { plan } = body
    
    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'خطة غير صالحة' },
        { status: 400 }
      )
    }
    
    // 3. Check if user already has active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: { gt: new Date() }
      }
    })
    
    if (existingSubscription) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'لديك اشتراك نشط بالفعل',
          subscription: {
            plan: existingSubscription.plan,
            endDate: existingSubscription.endDate
          }
        },
        { status: 400 }
      )
    }
    
    // 4. ✅ Server-side price validation (authoritative source)
    const allowedPlan = ALLOWED_PLANS[plan]
    if (!allowedPlan) {
      const isProduction = process.env.NODE_ENV === 'production'
      console.error('Invalid plan requested:', plan)
      return NextResponse.json(
        { 
          success: false, 
          error: isProduction ? 'خطة غير صالحة' : `Invalid plan: ${plan}`
        },
        { status: 400 }
      )
    }
    
    // 5. Get plan from service (for display only - we use ALLOWED_PLANS for actual amount)
    const moyasar = getMoyasarService()
    const servicePlans = moyasar.getPlans()
    const servicePlan = servicePlans[plan]
    
    if (!servicePlan) {
      const isProduction = process.env.NODE_ENV === 'production'
      console.error('Service plan not found:', plan)
      return NextResponse.json(
        { 
          success: false, 
          error: isProduction ? 'خطأ في تكوين الخطة' : `Service plan not found: ${plan}`
        },
        { status: 500 }
      )
    }
    
    // ✅ Validate amount matches server-side authoritative source
    if (servicePlan.amount !== allowedPlan.amount) {
      const isProduction = process.env.NODE_ENV === 'production'
      console.error('Plan amount mismatch:', {
        plan,
        serviceAmount: servicePlan.amount,
        allowedAmount: allowedPlan.amount
      })
      return NextResponse.json(
        { 
          success: false, 
          error: isProduction ? 'خطأ في تكوين الخطة' : 'Plan amount mismatch - configuration error'
        },
        { status: 500 }
      )
    }
    
    // 6. Create checkout session with validated amount
    const checkout = await moyasar.createCheckout({
      userId,
      plan,
      amount: allowedPlan.amount, // ✅ Use server-validated amount only
      userEmail,
      userName
    })
    
    // 7. Create pending subscription record
    const startDate = new Date()
    const endDate = new Date()
    if (plan === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1)
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1)
    }
    
    await prisma.subscription.create({
      data: {
        userId,
        tier: 'PREMIUM',
        status: 'TRIAL', // Will be updated to ACTIVE by webhook
        plan,
        startDate,
        endDate,
        provider: 'MANUAL', // We'll update this in webhook
        externalId: checkout.paymentId,
        amount: allowedPlan.amount, // ✅ Use validated amount
        currency: 'SAR'
      }
    })
    
    // 8. Log conversion event
    try {
      await logConversionEvent('checkout_initiated', userId, {
        plan,
        amount: allowedPlan.amount,
        paymentId: checkout.paymentId
      })
    } catch (logError) {
      console.error('Failed to log conversion event:', logError)
    }
    
    // 9. Return checkout URL
    return NextResponse.json({
      success: true,
      checkoutUrl: checkout.checkoutUrl,
      paymentId: checkout.paymentId,
      amount: allowedPlan.amount,
      plan: allowedPlan.name
    })
    
  } catch (error) {
    const isProduction = process.env.NODE_ENV === 'production'
    
    // ✅ Log full error details server-side only
    console.error('Checkout creation error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      userId: session?.user?.id
    })
    
    // ✅ Production error masking - don't expose internal details
    return NextResponse.json(
      { 
        success: false, 
        error: isProduction 
          ? 'حدث خطأ أثناء إنشاء جلسة الدفع' 
          : (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
}
