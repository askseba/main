import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    // Authenticated only
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { perfumeId, action } = body // action: 'add' | 'remove'

    if (!perfumeId || !action) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير صحيحة' },
        { status: 400 }
      )
    }

    // TODO: Integrate with database (Prisma Phase 2)
    // For now, return success (demo mode)
    console.log(`[Favorites API] User ${session.user.id} ${action === 'add' ? 'added' : 'removed'} perfume ${perfumeId}`)

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
