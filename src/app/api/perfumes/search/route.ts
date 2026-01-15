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
    // Ensure dbPerfumes is an array
    const perfumesArray = Array.isArray(dbPerfumes) ? dbPerfumes : []
    const results = perfumesArray.map(parsePerfumeFromDB)

    // Ensure results is an array
    const resultsArray = Array.isArray(results) ? results : []

    return NextResponse.json({
      success: true,
      perfumes: resultsArray,
      total: resultsArray.length
    })
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
