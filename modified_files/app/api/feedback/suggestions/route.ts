import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// ============================================
// GET - Fetch approved suggestions + doneCount
// ============================================
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Fetch approved suggestions
    const suggestions = await prisma.suggestion.findMany({
      where: {
        status: 'approved',
      },
      include: {
        _count: {
          select: { votes: true },
        },
        votes: {
          where: { userId: session.user.id },
          select: { id: true },
        },
      },
      orderBy: {
        votes: { _count: 'desc' },
      },
    })

    // Count done suggestions
    const doneCount = await prisma.suggestion.count({
      where: {
        status: 'approved',
        publicStatus: 'done',
      },
    })

    const formattedSuggestions = suggestions.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      publicStatus: s.publicStatus || 'planned',
      votes: s._count.votes,
      hasVoted: s.votes.length > 0,
      userId: s.userId,
      isMine: s.userId === session.user.id,
      category: s.category || 'general',
    }))

    return NextResponse.json({
      suggestions: formattedSuggestions,
      doneCount,
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 })
  }
}

// ============================================
// POST - Create new suggestion (pending)
// ============================================
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, description, category } = body

    // Validation
    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const suggestion = await prisma.suggestion.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        category: category || 'other',
        status: 'pending', // Always pending for review
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      suggestion,
      message: 'تم إرسال اقتراحك بنجاح! سيتم مراجعته قريباً.',
    })
  } catch (error) {
    console.error('Error creating suggestion:', error)
    return NextResponse.json({ error: 'Failed to create suggestion' }, { status: 500 })
  }
}
