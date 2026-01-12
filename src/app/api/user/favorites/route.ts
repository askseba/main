import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const { perfumeId, action } = await req.json()
    
    if (!perfumeId || !action) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير صحيحة' },
        { status: 400 }
      )
    }
    
    if (action === 'add') {
      await prisma.userFavorite.upsert({
        where: { 
          userId_perfumeId: { 
            userId: session.user.id, 
            perfumeId 
          } 
        },
        update: {},
        create: { 
          userId: session.user.id, 
          perfumeId 
        }
      })
    } else if (action === 'remove') {
      await prisma.userFavorite.deleteMany({
        where: { 
          userId: session.user.id, 
          perfumeId 
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'إجراء غير صحيح' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({ 
      success: true,
      message: action === 'add' ? 'تم الحفظ بنجاح' : 'تم الحذف بنجاح'
    })
  } catch (error) {
    console.error('[Favorites API] Error:', error)
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json([], { status: 401 })
    }

    const favorites = await prisma.userFavorite.findMany({
      where: { userId: session.user.id },
      select: { perfumeId: true }
    })
    
    return NextResponse.json(favorites.map(f => f.perfumeId))
  } catch (error) {
    console.error('[Favorites API GET] Error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
