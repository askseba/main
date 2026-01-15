import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      )
    }

    const { id } = await params
    const suggestionId = id

    // Update suggestion status to approved
    const suggestion = await prisma.suggestion.update({
      where: { id: suggestionId },
      data: { status: 'approved' },
    })

    // Ensure suggestion is an object
    if (!suggestion || typeof suggestion !== 'object' || Array.isArray(suggestion)) {
      throw new Error('فشل تحديث الاقتراح')
    }

    return NextResponse.json({
      success: true,
      message: 'تمت الموافقة على الاقتراح',
    })
  } catch (error) {
    console.error('Error approving suggestion:', error)
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'الاقتراح غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'فشلت الموافقة على الاقتراح' },
      { status: 500 }
    )
  }
}
