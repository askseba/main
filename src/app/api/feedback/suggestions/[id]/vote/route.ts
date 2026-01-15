import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const suggestionId = id

  try {
    // Server-side UNIQUE check
    const existingVote = await prisma.vote.findUnique({
      where: {
        suggestionId_userId: {
          suggestionId,
          userId: session.user.id,
        },
      },
    })

    let hasVoted: boolean

    if (existingVote) {
      // Remove vote
      await prisma.vote.delete({
        where: { id: existingVote.id },
      })
      hasVoted = false
    } else {
      // Add vote (UNIQUE constraint prevents duplicates)
      await prisma.vote.create({
        data: {
          suggestionId,
          userId: session.user.id,
        },
      })
      hasVoted = true
    }

    // Get updated vote count
    const voteCount = await prisma.vote.count({
      where: { suggestionId },
    })

    // Ensure voteCount is a number and hasVoted is a boolean
    const validatedVoteCount = typeof voteCount === 'number' ? voteCount : 0
    const validatedHasVoted = typeof hasVoted === 'boolean' ? hasVoted : false

    return NextResponse.json({
      success: true,
      votes: validatedVoteCount,
      hasVoted: validatedHasVoted,
    })
  } catch (error: unknown) {
    console.error('Error toggling vote:', error)

    // Handle UNIQUE constraint violation (race condition)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'لقد قمت بالتصويت مسبقاً' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'فشل التصويت' },
      { status: 500 }
    )
  }
}
