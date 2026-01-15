import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// ============================================
// GET - Fetch approved suggestions + doneCount
// ============================================
export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

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
          where: { userId },
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

    // Ensure suggestions is an array
    const suggestionsArray = Array.isArray(suggestions) ? suggestions : []
    
    const formattedSuggestions = suggestionsArray.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      publicStatus: s.publicStatus || 'planned',
      votes: s._count?.votes ?? 0,
      hasVoted: Array.isArray(s.votes) && s.votes.length > 0,
      userId: s.userId,
      isMine: s.userId === userId,
      category: s.category || 'general',
    }))

    // Ensure formattedSuggestions is an array
    const formattedArray = Array.isArray(formattedSuggestions) ? formattedSuggestions : []
    const doneCountNum = typeof doneCount === 'number' ? doneCount : 0

    return NextResponse.json({
      success: true,
      suggestions: formattedArray,
      doneCount: doneCountNum,
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'فشل تحميل الاقتراحات',
        suggestions: [],
        doneCount: 0
      },
      { status: 500 }
    )
  }
}

// ============================================
// POST - Create new suggestion (pending)
// ============================================
export async function POST(request: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

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
        userId,
      },
    })

    // Ensure suggestion is an object
    const suggestionObj = suggestion && typeof suggestion === 'object' && !Array.isArray(suggestion)
      ? suggestion
      : null

    return NextResponse.json({
      success: true,
      suggestion: suggestionObj,
      message: 'تم إرسال اقتراحك بنجاح! سيتم مراجعته قريباً.',
    })
  } catch (error) {
    console.error('Error creating suggestion:', error)
    return NextResponse.json(
      { success: false, error: 'فشل إنشاء الاقتراح' },
      { status: 500 }
    )
  }
}
