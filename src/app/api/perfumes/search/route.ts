import { NextRequest, NextResponse } from 'next/server'
import { perfumes, type Perfume } from '@/lib/data/perfumes'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    // Filter perfumes by query (name or brand)
    let results: Perfume[] = perfumes.filter(perfume => {
      const searchTerm = query.toLowerCase()
      return (
        perfume.name.toLowerCase().includes(searchTerm) ||
        perfume.brand.toLowerCase().includes(searchTerm)
      )
    })

    // Sort by name ascending (orderBy name asc)
    results.sort((a, b) => a.name.localeCompare(b.name))

    // Apply limit (take=limit)
    const take = limit
    results = results.slice(0, take)

    return NextResponse.json({
      perfumes: results,
      total: results.length
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
