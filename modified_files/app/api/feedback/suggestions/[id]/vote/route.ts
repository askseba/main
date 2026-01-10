import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const suggestionId = params.id

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

    return NextResponse.json({
      votes: voteCount,
      hasVoted,
    })
  } catch (error: any) {
    console.error('Error toggling vote:', error)

    // Handle UNIQUE constraint violation (race condition)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'You have already voted' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Failed to toggle vote' }, { status: 500 })
  }
}
