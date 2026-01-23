// VALUE_LADDER - File 12/20: src/app/api/cron/reset-tests/route.ts
// ✅ CRON JOB FOR MONTHLY TEST RESET
// 🎯 Resets monthlyTestCount for Free users

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Cron job to reset monthly test counts
 * 
 * Setup in Vercel:
 * 1. Go to Project Settings → Cron Jobs
 * 2. Add: 0 0 1 * * (runs at midnight on 1st of each month)
 * 3. Path: /api/cron/reset-tests
 * 4. Add CRON_SECRET to environment variables
 * 
 * Or use external service like cron-job.org with Authorization header
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
    
    // ✅ OPTIONAL: Send email notifications to reset users
    if (process.env.SEND_RESET_EMAILS === 'true') {
      await sendResetNotifications(usersToReset)
    }
    
    return NextResponse.json({
      success: true,
      message: `Reset ${resetResult.count} users`,
      usersReset: resetResult.count,
      timestamp: now.toISOString()
    })
    
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { 
        error: 'Reset failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Send email notifications to users about monthly reset
 * ✅ OPTIONAL: Implement this if you have email service
 */
async function sendResetNotifications(users: any[]): Promise<void> {
  try {
    // Example with Resend (install with: npm install resend)
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    
    for (const user of users) {
      if (!user.email) continue
      
      // await resend.emails.send({
      //   from: 'Ask Seba <noreply@askseba.com>',
      //   to: user.email,
      //   subject: '🎉 اختباراتك الشهرية جاهزة!',
      //   html: `
      //     <div dir="rtl" style="text-align: right; font-family: Arial, sans-serif;">
      //       <h2>مرحباً! 👋</h2>
      //       <p>اختباراتك الشهرية المجانية جاهزة الآن!</p>
      //       <p>لديك <strong>اختباران مجانيان</strong> هذا الشهر لاكتشاف عطور جديدة.</p>
      //       <a href="https://askseba.com/quiz/step1-favorites" 
      //          style="display: inline-block; background: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
      //         ابدأ الاختبار الآن
      //       </a>
      //       <p style="color: #666; font-size: 14px;">
      //         تريد اختبارات غير محدودة؟ 
      //         <a href="https://askseba.com/pricing">اشترك في الباقة المميزة</a> 
      //         بـ 15 ريال/شهر فقط!
      //       </p>
      //     </div>
      //   `
      // })
      
      console.log(`Would send reset email to ${user.email}`)
    }
    
    console.log(`Sent ${users.length} reset notifications`)
  } catch (error) {
    console.error('Failed to send notifications:', error)
    // Don't throw - email failures shouldn't break the cron job
  }
}

/**
 * ✅ OPTIONAL: Manual trigger endpoint for testing
 * POST /api/cron/reset-tests with admin auth
 */
export async function POST(request: NextRequest) {
  try {
    // Admin-only endpoint for manual testing
    const { adminSecret } = await request.json()
    
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Trigger the same logic as GET
    return GET(request)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
