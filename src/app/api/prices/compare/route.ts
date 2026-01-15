import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const perfumeId = searchParams.get('perfumeId')

    if (!perfumeId) {
      return NextResponse.json(
        { error: 'perfumeId is required' },
        { status: 400 }
      )
    }

    const prices = await prisma.price.findMany({
      where: {
        perfumeId,
        store: {
          isActive: true
        }
      },
      include: {
        store: true
      },
      orderBy: {
        price: 'asc'
      }
    })

    // Ensure prices is an array
    const pricesArray = Array.isArray(prices) ? prices : []

    return NextResponse.json({
      success: true,
      data: pricesArray,
      total: pricesArray.length
    })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}
