// VALUE_LADDER - File 5/20: src/app/api/price-alerts/route.ts
// ✅ COMPLETE PRICE ALERTS API
// 🎯 Handles: GET (list), POST (create/delete), PATCH (update)

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { checkPriceAlertLimit, getUserTierInfo, logConversionEvent } from '@/lib/gating'

// ============================================
// GET - List user's price alerts
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      )
    }
    
    const alerts = await prisma.priceAlert.findMany({
      where: {
        userId: session.user.id,
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({
      success: true,
      data: alerts
    })
    
  } catch (error) {
    console.error('Get Price Alerts Error:', error)
    return NextResponse.json(
      { success: false, error: 'فشل تحميل التنبيهات' },
      { status: 500 }
    )
  }
}

// ============================================
// POST - Create or delete price alert
// ============================================

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول لإنشاء تنبيهات الأسعار' },
        { status: 401 }
      )
    }
    
    const userId = session.user.id
    const body = await request.json()
    const { perfumeId, targetPrice, action } = body
    
    // Validate input
    if (!perfumeId) {
      return NextResponse.json(
        { success: false, error: 'معرف العطر مطلوب' },
        { status: 400 }
      )
    }
    
    // DELETE action
    if (action === 'delete') {
      await prisma.priceAlert.deleteMany({
        where: {
          userId,
          perfumeId
        }
      })
      
      return NextResponse.json({
        success: true,
        message: 'تم إلغاء التنبيه بنجاح'
      })
    }
    
    // CREATE action
    if (!targetPrice || targetPrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'السعر المستهدف غير صحيح' },
        { status: 400 }
      )
    }
    
    // Check limits
    const limitCheck = await checkPriceAlertLimit(userId)
    
    if (!limitCheck.canAccess) {
      // Log conversion event
      await logConversionEvent('price_alert_limit_reached', userId, {
        perfumeId,
        upgradeMessage: limitCheck.upgradeMessage
      })
      
      return NextResponse.json({
        success: false,
        error: limitCheck.reason,
        message: limitCheck.upgradeMessage,
        limit: limitCheck.limit,
        remaining: limitCheck.remaining
      }, { status: 403 })
    }
    
    // Create or update alert
    const alert = await prisma.priceAlert.upsert({
      where: {
        userId_perfumeId: {
          userId,
          perfumeId
        }
      },
      create: {
        userId,
        perfumeId,
        targetPrice,
        isActive: true,
        notified: false
      },
      update: {
        targetPrice,
        isActive: true,
        notified: false,
        updatedAt: new Date()
      }
    })
    
    // Log conversion event
    await logConversionEvent('price_alert_created', userId, {
      perfumeId,
      targetPrice
    })
    
    return NextResponse.json({
      success: true,
      message: 'تم إنشاء التنبيه بنجاح! سنخبرك عندما ينخفض السعر.',
      data: alert
    })
    
  } catch (error) {
    console.error('Create Price Alert Error:', error)
    return NextResponse.json(
      { success: false, error: 'فشل إنشاء التنبيه' },
      { status: 500 }
    )
  }
}

// ============================================
// PATCH - Update alert status
// ============================================

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { alertId, isActive } = body
    
    if (!alertId) {
      return NextResponse.json(
        { success: false, error: 'معرف التنبيه مطلوب' },
        { status: 400 }
      )
    }
    
    // Update alert
    const alert = await prisma.priceAlert.update({
      where: {
        id: alertId,
        userId: session.user.id // Ensure user owns this alert
      },
      data: {
        isActive: isActive ?? true,
        updatedAt: new Date()
      }
    })
    
    return NextResponse.json({
      success: true,
      message: isActive ? 'تم تفعيل التنبيه' : 'تم إيقاف التنبيه',
      data: alert
    })
    
  } catch (error) {
    console.error('Update Price Alert Error:', error)
    return NextResponse.json(
      { success: false, error: 'فشل تحديث التنبيه' },
      { status: 500 }
    )
  }
}
