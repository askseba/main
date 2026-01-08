import { NextRequest, NextResponse } from 'next/server'
import { prisma, parsePerfumeFromDB } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    // Use Prisma to search perfumes
    const dbPerfumes = await prisma.perfume.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { brand: { contains: query } }
        ]
      },
      orderBy: { name: 'asc' },
      take: limit
    })

    // Parse JSON fields from SQLite
    const results = dbPerfumes.map(parsePerfumeFromDB)

    return NextResponse.json({
      perfumes: results,
      total: results.length
    })
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
