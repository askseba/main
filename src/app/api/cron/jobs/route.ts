// MOYASAR ADDON - File 7/8: src/app/api/cron/jobs/route.ts (MODIFIED)
// ✅ UPDATED WITH PRICE MONITORING
// 🎯 استبدل cron-reset-tests.ts بهذا الملف

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPriceDropEmail } from '@/lib/email/email.service'

/**
 * Cron job handler for multiple tasks
 * 
 * Setup in Vercel:
 * 1. Monthly test reset: 0 0 1 * * → /api/cron/jobs?action=reset-tests
 * 2. Price monitoring: 0 *\/6 * * * → /api/cron/jobs?action=check-prices
 */

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret) {
      console.error('CRON_SECRET not configured')
      return NextResponse.json(
        { error: 'Cron not configured' },
        { status: 500 }
      )
    }
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('Invalid cron secret')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get action from query params
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'reset-tests'
    
    console.log('Cron job triggered:', action)
    
    switch (action) {
      case 'reset-tests':
        return await handleTestReset()
      
      case 'check-prices':
        return await handlePriceCheck()
      
      case 'check-renewals':
        return await handleRenewalCheck()
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
    
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { 
        error: 'Cron job failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Reset monthly test counts (existing functionality)
 */
async function handleTestReset() {
  console.log('Starting monthly test count reset...')
  
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  // Find Free users whose last reset was >30 days ago
  const usersToReset = await prisma.user.findMany({
    where: {
      subscriptionTier: 'FREE',
      lastTestReset: {
        lt: thirtyDaysAgo
      },
      monthlyTestCount: {
        gt: 0
      }
    },
    select: {
      id: true,
      email: true,
      monthlyTestCount: true,
      lastTestReset: true
    }
  })
  
  console.log(`Found ${usersToReset.length} users to reset`)
  
  // Reset counts
  const resetResult = await prisma.user.updateMany({
    where: {
      id: {
        in: usersToReset.map(u => u.id)
      }
    },
    data: {
      monthlyTestCount: 0,
      lastTestReset: now
    }
  })
  
  console.log(`Reset ${resetResult.count} user test counts`)
  
  return NextResponse.json({
    success: true,
    action: 'reset-tests',
    message: `Reset ${resetResult.count} users`,
    usersReset: resetResult.count,
    timestamp: now.toISOString()
  })
}

/**
 * ✅ NEW: Check price drops and send alerts
 */
async function handlePriceCheck() {
  console.log('Starting price monitoring check...')
  
  try {
    // 1. Get all active price alerts
    const activeAlerts = await prisma.priceAlert.findMany({
      where: {
        isActive: true,
        notified: false
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            subscriptionTier: true
          }
        }
      }
    })
    
    console.log(`Found ${activeAlerts.length} active price alerts`)
    
    let notificationsSent = 0
    
    // 2. Check each alert
    for (const alert of activeAlerts) {
      try {
        // Get current price for the perfume
        const currentPrices = await prisma.price.findMany({
          where: {
            perfumeId: alert.perfumeId
          },
          include: {
            store: true,
            perfume: true
          },
          orderBy: {
            price: 'asc'
          },
          take: 1
        })
        
        if (currentPrices.length === 0) {
          continue // No price data available
        }
        
        const lowestPrice = currentPrices[0]
        
        // 3. Check if price dropped below target
        if (lowestPrice.price <= alert.targetPrice) {
          // ✅ Price dropped! Send email
          
          if (alert.user.email) {
            // Get perfume details
            await sendPriceDropEmail(alert.user.email, {
              userName: alert.user.name || 'عزيزي المستخدم',
              perfumeName: lowestPrice.perfume?.name || `عطر ${alert.perfumeId}`,
              perfumeBrand: lowestPrice.perfume?.brand || 'العلامة التجارية',
              oldPrice: alert.targetPrice,
              newPrice: lowestPrice.price,
              currency: lowestPrice.currency || 'ريال',
              perfumeUrl: lowestPrice.store?.affiliateUrl || '',
              retailer: lowestPrice.store?.name || ''
            })
            
            // Mark as notified
            await prisma.priceAlert.update({
              where: { id: alert.id },
              data: {
                notified: true,
                lastChecked: new Date()
              }
            })
            
            notificationsSent++
          }
        } else {
          // Price didn't drop, just update lastChecked
          await prisma.priceAlert.update({
            where: { id: alert.id },
            data: {
              lastChecked: new Date()
            }
          })
        }
        
      } catch (alertError) {
        console.error(`Failed to process alert ${alert.id}:`, alertError)
        // Continue with next alert
      }
    }
    
    console.log(`Price check complete. Sent ${notificationsSent} notifications`)
    
    return NextResponse.json({
      success: true,
      action: 'check-prices',
      message: `Checked ${activeAlerts.length} alerts, sent ${notificationsSent} notifications`,
      alertsChecked: activeAlerts.length,
      notificationsSent,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Price check failed:', error)
    throw error
  }
}

/**
 * ✅ NEW: Check upcoming subscription renewals
 */
async function handleRenewalCheck() {
  console.log('Checking subscription renewals...')
  
  const now = new Date()
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  
  // Find subscriptions renewing in 3 days
  const upcomingRenewals = await prisma.subscription.findMany({
    where: {
      status: 'ACTIVE',
      nextBillingDate: {
        gte: now,
        lte: threeDaysFromNow
      }
    },
    include: {
      user: {
        select: {
          email: true,
          name: true
        }
      }
    }
  })
  
  console.log(`Found ${upcomingRenewals.length} upcoming renewals`)
  
  let remindersSent = 0
  
  for (const subscription of upcomingRenewals) {
    if (subscription.user.email && subscription.nextBillingDate) {
      try {
        const { sendRenewalReminderEmail } = await import('@/lib/email/email.service')
        
        await sendRenewalReminderEmail(subscription.user.email, {
          userName: subscription.user.name || 'عزيزي المستخدم',
          plan: subscription.plan === 'monthly' ? 'شهري' : 'سنوي',
          amount: subscription.amount,
          renewalDate: subscription.nextBillingDate
        })
        
        remindersSent++
      } catch (emailError) {
        console.error(`Failed to send renewal reminder:`, emailError)
      }
    }
  }
  
  console.log(`Sent ${remindersSent} renewal reminders`)
  
  return NextResponse.json({
    success: true,
    action: 'check-renewals',
    message: `Sent ${remindersSent} renewal reminders`,
    remindersSent,
    timestamp: now.toISOString()
  })
}

/**
 * ✅ OPTIONAL: Manual trigger endpoint for testing
 */
export async function POST(request: NextRequest) {
  try {
    const { adminSecret, action } = await request.json()
    
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Create a mock request with action
    const url = new URL(request.url)
    url.searchParams.set('action', action || 'reset-tests')
    
    const mockRequest = new NextRequest(url, {
      headers: {
        'authorization': `Bearer ${process.env.CRON_SECRET}`
      }
    })
    
    return GET(mockRequest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
