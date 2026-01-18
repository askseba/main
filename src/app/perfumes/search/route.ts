import { NextResponse } from 'next/server'
import { searchPerfumesWithCache } from '@/lib/services/perfume.service'
import { checkRateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()
  
  if (!query || query.length < 2) {
    return NextResponse.json({ error: 'Query must be 2+ chars' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed, remaining } = checkRateLimit(ip)
  
  if (!allowed) {
    return NextResponse.json({ error: 'Rate limited', remaining: 0 }, { status: 429 })
  }

  try {
    const data = await searchPerfumesWithCache(query)
    return NextResponse.json({ success: true, data, count: data.length, remaining })
  } catch (error: any) {
    console.error('Fragella error:', error)
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
}
