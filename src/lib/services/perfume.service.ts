import { prisma } from '@/lib/prisma'

const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

export async function getPerfume(fragellaId: string): Promise<any> {
  const now = new Date()
  
  const cached = await prisma.fragellaPerfume.findUnique({ where: { fragellaId } })
  if (cached && cached.expiresAt > now) {
    console.log(`✅ CACHE HIT: ${cached.name}`)
    return cached.payloadJson
  }

  const apiKey = process.env.FRAGELLA_API_KEY
  if (!apiKey) {
    if (cached) {
      console.warn(`⚠️ API KEY MISSING: Serving STALE ${fragellaId}`)
      return cached.payloadJson
    }
    throw new Error('FRAGELLA_API_KEY environment variable is not set')
  }

  console.log(`🔄 CACHE MISS: ${fragellaId}`)
  const response = await fetch(`https://api.fragella.com/api/v1/fragrances/${fragellaId}`, {
    headers: { 'x-api-key': apiKey }
  })

  if (!response.ok) {
    if (cached) {
      console.warn(`⚠️ API FAILED: Serving STALE ${fragellaId}`)
      return cached.payloadJson
    }
    const errorText = await response.text()
    throw new Error(`Fragella API: ${response.status} - ${errorText.substring(0, 200)}`)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    const text = await response.text()
    if (cached) {
      console.warn(`⚠️ INVALID RESPONSE: Serving STALE ${fragellaId}`)
      return cached.payloadJson
    }
    throw new Error(`Invalid response format. Expected JSON, got: ${contentType}`)
  }

  const data = await response.json()
  const fetchedAt = new Date()
  const expiresAt = new Date(fetchedAt.getTime() + CACHE_TTL_MS)

  await prisma.fragellaPerfume.upsert({
    where: { fragellaId },
    create: {
      fragellaId, name: data.name || 'Unknown', 
      brandName: data.brand?.name || 'Unknown',
      payloadJson: data, fetchedAt, expiresAt
    },
    update: { name: data.name || 'Unknown', brandName: data.brand?.name || 'Unknown',
      payloadJson: data, fetchedAt, expiresAt }
  })

  console.log(`💾 CACHED: ${data.name}`)
  return data
}

export async function searchPerfumes(query: string, limit = 20): Promise<any> {
  const apiKey = process.env.FRAGELLA_API_KEY
  if (!apiKey) {
    throw new Error('FRAGELLA_API_KEY environment variable is not set')
  }

  const response = await fetch(
    `https://api.fragella.com/api/v1/fragrances?search=${encodeURIComponent(query)}&limit=${limit}`,
    { headers: { 'x-api-key': apiKey } }
  )
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Search failed: ${response.status} - ${errorText.substring(0, 200)}`)
  }
  
  const contentType = response.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    const text = await response.text()
    throw new Error(`Invalid response format. Expected JSON, got: ${contentType}. Response: ${text.substring(0, 200)}`)
  }
  
  return response.json()
}

export async function searchPerfumesWithCache(query: string) {
  const cacheKey = `search:${query.toLowerCase()}`
  
  // Check cache
  const cached = await prisma.fragellaCache.findFirst({
    where: {
      key: cacheKey,
      expiresAt: { gt: new Date() }
    }
  })
  
  if (cached) {
    console.log('✅ Cache HIT:', cacheKey)
    return JSON.parse(cached.data as any)
  }
  
  // Fetch fresh
  console.log('🔄 Cache MISS - fetching:', cacheKey)
  const data = await searchPerfumes(query) // existing function
  
  // Cache for 24h
  await prisma.fragellaCache.upsert({
    where: { key: cacheKey },
    create: {
      key: cacheKey,
      data: JSON.stringify(data),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    update: {
      data: JSON.stringify(data),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  })
  
  return data
}
