import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

interface PendingSuggestion {
  id: string
  title: string
  description: string
  category: string
  userName?: string
  createdAt: string
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح', pendingSuggestions: [] },
        { status: 401 }
      )
    }

    // Check if user is admin (you can add role check here)
    // For now, we'll allow any authenticated user to access admin panel
    // In production, add proper role-based access control

    const suggestions = await prisma.suggestion.findMany({
      where: {
        status: 'pending',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Ensure suggestions is an array
    const suggestionsArray = Array.isArray(suggestions) ? suggestions : []

    const formattedSuggestions: PendingSuggestion[] = suggestionsArray.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category || 'other',
      userName: s.user?.name || undefined,
      createdAt: s.createdAt.toISOString(),
    }))

    // Ensure formattedSuggestions is an array
    const formattedArray = Array.isArray(formattedSuggestions) ? formattedSuggestions : []

    return NextResponse.json({
      success: true,
      pendingSuggestions: formattedArray,
    })
  } catch (error) {
    console.error('Error fetching pending suggestions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'فشل تحميل الاقتراحات المعلقة',
        pendingSuggestions: [],
      },
      { status: 500 }
    )
  }
}
