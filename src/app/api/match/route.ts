// src/app/api/match/route.ts
// MERGED: Base + Phase 2 (Bridge) + Phase 3 (Gating + Value Ladder)
// Dynamic Matching API Endpoint with Unified Perfume Support and Value Ladder Gating
// POST /api/match - Returns scored and sorted perfumes from both local and Fragella sources

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getPerfumesUnified, enrichBatchWithIFRA, searchUnified } from '@/lib/services/perfume-bridge.service'
import { 
  calculateMatchScores, 
  type UserPreferenceForMatching,
  type PerfumeForMatching 
} from '@/lib/matching'
import { prisma, parsePerfumeFromDB } from '@/lib/prisma'
import { 
  getUserTierInfo, 
  getResultsLimit, 
  getBlurredCount,
  checkTestLimit,
  incrementTestCount,
  getUpgradeMessage,
  logConversionEvent,
  LIMITS
} from '@/lib/gating'

// Request body type
interface MatchRequestBody {
  sessionId?: string
  // Allow direct preferences for client-side data (from sessionStorage)
  preferences?: {
    likedPerfumeIds: string[] // Supports both local ('1', '2') and Fragella ('fragella-123') IDs
    dislikedPerfumeIds: string[]
    allergyProfile: {
      symptoms: string[]
      families: string[]
      ingredients: string[]
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MatchRequestBody = await request.json()
    const { sessionId, preferences } = body

    // ============================================
    // AUTHENTICATION & TIER CHECK (Phase 3)
    // ============================================
    
    const session = await auth()
    const userId = session?.user?.id
    
    // Determine tier
    let tier: 'GUEST' | 'FREE' | 'PREMIUM' = 'GUEST'
    let userInfo = null
    
    if (userId) {
      userInfo = await getUserTierInfo(userId)
      tier = userInfo.tier
      
      // Check if user can take this test
      const testAccess = await checkTestLimit(userId)
      
      if (!testAccess.canAccess) {
        return NextResponse.json({
          success: false,
          error: testAccess.reason,
          message: testAccess.upgradeMessage,
          limit: testAccess.limit,
          remaining: 0
        }, { status: 403 })
      }
    }
    
    // ============================================
    // PREFERENCE HANDLING (Base + Phase 2)
    // ============================================
    
    // If preferences provided directly, use them (Phase 2 approach)
    if (preferences) {
      // 1. Fetch user's liked perfumes (supports both local and Fragella IDs)
      const likedPerfumes = await getPerfumesUnified(preferences.likedPerfumeIds)
      
      if (likedPerfumes.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No liked perfumes found' },
          { status: 400 }
        )
      }

      // 2. Extract families from liked perfumes for "Scent DNA"
      const likedFamilies = likedPerfumes.flatMap(p => p.families || [])
      const uniqueFamilies = [...new Set(likedFamilies)]

      // 3. Build user preference object (matching library format)
      const userPreference: UserPreferenceForMatching = {
        likedPerfumesFamilies: uniqueFamilies,
        dislikedPerfumeIds: preferences.dislikedPerfumeIds,
        allergyProfile: preferences.allergyProfile
      }

      // 4. Get CANDIDATE perfumes for matching (NOT the liked perfumes!)
      // Strategy: Fetch perfumes with similar families that user hasn't selected
      const candidatePerfumes: any[] = []

      // 4a. Fetch from local database (Perfume model)
      try {
        const dbPerfumes = await prisma.perfume.findMany({
          where: {
            AND: [
              // Exclude liked perfumes
              { id: { notIn: preferences.likedPerfumeIds.filter(id => !id.startsWith('fragella-')) } },
              // Exclude disliked perfumes
              { id: { notIn: preferences.dislikedPerfumeIds.filter(id => !id.startsWith('fragella-')) } },
              // Exclude unsafe perfumes
              { status: { not: 'not-safe' } }
            ]
          },
          take: 50,
          orderBy: { baseScore: 'desc' }
        })

        // Convert DB perfumes to format
        for (const p of dbPerfumes) {
          candidatePerfumes.push({
            id: p.id,
            name: p.name,
            brand: p.brand,
            image: p.image,
            description: p.description,
            price: p.price,
            families: JSON.parse(p.families || '[]'),
            ingredients: JSON.parse(p.ingredients || '[]'),
            symptomTriggers: JSON.parse(p.symptomTriggers || '[]'),
            isSafe: p.isSafe,
            status: p.status,
            variant: p.variant,
            scentPyramid: p.scentPyramid ? JSON.parse(p.scentPyramid) : null
          })
        }
      } catch (dbError) {
        console.error('Database fetch failed:', dbError)
      }

      // 4b. Fetch similar perfumes from Fragella (if scent DNA available)
      if (uniqueFamilies.length > 0) {
        try {
          // Search Fragella for perfumes matching the user's scent DNA
          // Use the most common family as search term
          const familySearchTerm = uniqueFamilies[0] || 'oriental'
          const fragellaResults = await searchUnified(familySearchTerm, {
            includeLocal: false,
            includeFragella: true,
            limit: 30
          })

          // Filter out liked and disliked perfumes
          const filteredFragella = fragellaResults.filter(p => 
            !preferences.likedPerfumeIds.includes(p.id) &&
            !preferences.dislikedPerfumeIds.includes(p.id)
          )

          // Add to candidates
          for (const p of filteredFragella) {
            candidatePerfumes.push({
              id: p.id,
              name: p.name,
              brand: p.brand,
              image: p.image,
              description: p.description || null,
              price: p.price,
              families: p.families || [],
              ingredients: p.ingredients || [],
              symptomTriggers: p.symptomTriggers || [],
              isSafe: p.isSafe,
              status: p.status || 'safe',
              variant: p.variant || null,
              scentPyramid: p.stages ? (() => {
                const topStage = p.stages.find((s: any) => s.stage === 'top')
                const heartStage = p.stages.find((s: any) => s.stage === 'heart')
                const baseStage = p.stages.find((s: any) => s.stage === 'base')
                return {
                  top: Array.isArray(topStage?.notes) ? topStage.notes : [],
                  heart: Array.isArray(heartStage?.notes) ? heartStage.notes : [],
                  base: Array.isArray(baseStage?.notes) ? baseStage.notes : []
                }
              })() : null
            })
          }
        } catch (fragellaError) {
          console.error('Fragella fetch failed:', fragellaError)
        }
      }

      // If no candidates found, return empty results
      if (candidatePerfumes.length === 0) {
        return NextResponse.json({
          success: true,
          total: 0,
          perfumes: [],
          userScentDNA: uniqueFamilies,
          hasPreferences: true,
          tier,
          limit: getResultsLimit(tier),
          shown: 0,
          locked: 0,
          blurredItems: [],
          upgradeMessage: null
        })
      }

      // 5. Convert candidates to UnifiedPerfume format
      const unifiedCandidates = candidatePerfumes.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.image,
        description: p.description || '',
        price: p.price || null,
        originalPrice: null,
        matchPercentage: 70,
        isSafe: p.isSafe ?? true,
        status: p.status || 'safe',
        variant: p.variant || null,
        families: p.families || [],
        ingredients: p.ingredients || [],
        symptomTriggers: p.symptomTriggers || [],
        stages: undefined,
        source: p.id.startsWith('fragella-') ? 'fragella' as const : 'local' as const
      }))

      // 6. Enrich candidates with IFRA data
      const enrichedCandidates = await enrichBatchWithIFRA(
        unifiedCandidates,
        preferences.allergyProfile.symptoms
      )

      // 7. Convert enriched perfumes to PerfumeForMatching format
      const perfumesForMatching: PerfumeForMatching[] = enrichedCandidates.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.image,
        description: p.description || null,
        price: p.price || null,
        families: p.families || [],
        ingredients: p.ingredients || [],
        symptomTriggers: p.symptomTriggers || [],
        isSafe: p.isSafe,
        status: p.status || 'safe',
        variant: p.variant || null,
        scentPyramid: p.stages ? (() => {
          const topStage = p.stages.find((s: any) => s.stage === 'top')
          const heartStage = p.stages.find((s: any) => s.stage === 'heart')
          const baseStage = p.stages.find((s: any) => s.stage === 'base')
          return {
            top: Array.isArray(topStage?.notes) ? topStage.notes : [],
            heart: Array.isArray(heartStage?.notes) ? heartStage.notes : [],
            base: Array.isArray(baseStage?.notes) ? baseStage.notes : []
          }
        })() : null
      }))

      // 8. Calculate match scores
      const scoredPerfumes = calculateMatchScores(perfumesForMatching, userPreference)

      // ============================================
      // VALUE LADDER GATING (Phase 3)
      // ============================================
      
      const resultsLimit = getResultsLimit(tier)
      const blurredCount = getBlurredCount(tier)
      
      // Slice results
      const visibleResults = scoredPerfumes.slice(0, resultsLimit)
      const lockedResults = scoredPerfumes.slice(resultsLimit, resultsLimit + blurredCount)
      
      // Prepare blurred metadata (NO sensitive data)
      const blurredMetadata = lockedResults.map(item => ({
        id: item.id,
        matchScore: Math.round(item.finalScore || 0),
        familyHint: item.families?.[0] || 'عطر مميز'
      }))
      
      // For Premium: Fetch price comparison
      let priceComparison = null
      if (tier === 'PREMIUM' && visibleResults.length > 0) {
        try {
          const perfumeIds = visibleResults.map(p => p.id).filter(id => !id.startsWith('fragella-'))
          if (perfumeIds.length > 0) {
            const prices = await prisma.price.findMany({
              where: { perfumeId: { in: perfumeIds } },
              include: { store: true },
              orderBy: { price: 'asc' }
            })
            
            priceComparison = prices.reduce((acc, price) => {
              if (!acc[price.perfumeId]) acc[price.perfumeId] = []
              acc[price.perfumeId].push({
                retailer: price.store?.name || '',
                price: price.price,
                currency: price.currency,
                url: price.store?.affiliateUrl || '',
                inStock: true
              })
              return acc
            }, {} as Record<string, any[]>)
          }
        } catch (error) {
          console.error('Failed to fetch price comparison:', error)
        }
      }
      
      // Increment test count for Free users
      if (userId && tier === 'FREE') {
        await incrementTestCount(userId)
      }
      
      // Log conversion event
      await logConversionEvent('quiz_completed', userId, {
        tier,
        resultsShown: visibleResults.length,
        totalMatches: scoredPerfumes.length,
        page: '/api/match'
      })
      
      // ============================================
      // RETURN RESPONSE (Phase 3 structure)
      // ============================================
      
      return NextResponse.json({
        success: true,
        
        // Results
        perfumes: visibleResults,
        total: scoredPerfumes.length,
        
        // Gating info
        tier,
        limit: resultsLimit,
        shown: visibleResults.length,
        locked: lockedResults.length,
        
        // Blurred teaser data
        blurredItems: blurredMetadata,
        
        // Upgrade messaging
        upgradeMessage: tier === 'PREMIUM' 
          ? null 
          : getUpgradeMessage(tier, 'results'),
        
        // Premium features
        priceComparison: tier === 'PREMIUM' ? priceComparison : null,
        
        // User data
        userScentDNA: uniqueFamilies,
        hasPreferences: uniqueFamilies.length > 0 || 
                        preferences.allergyProfile.ingredients.length > 0 ||
                        preferences.allergyProfile.symptoms.length > 0,
        
        // Test limits
        testLimits: userId ? {
          monthly: tier === 'PREMIUM' ? LIMITS.PREMIUM_MONTHLY_TESTS : LIMITS.FREE_MONTHLY_TESTS,
          used: userInfo?.monthlyTestCount || 0,
          remaining: tier === 'PREMIUM' 
            ? Infinity 
            : Math.max(0, LIMITS.FREE_MONTHLY_TESTS - (userInfo?.monthlyTestCount || 0))
        } : null,
        
        // Sources (for backward compatibility)
        sources: {
          local: visibleResults.filter(p => !p.id.startsWith('fragella-')).length,
          fragella: visibleResults.filter(p => p.id.startsWith('fragella-')).length
        }
      })

    } else if (sessionId) {
      // ============================================
      // SESSION-BASED PREFERENCE HANDLING (Base file)
      // ============================================
      
      // Fetch from database
      const dbPreference = await prisma.userPreference.findUnique({
        where: { sessionId }
      })

      if (!dbPreference) {
        // No preferences found - return default scoring
        const dbPerfumes = await prisma.perfume.findMany({
          orderBy: { baseScore: 'desc' },
          take: getResultsLimit(tier)
        })

        const perfumes = dbPerfumes.map(p => {
          const parsed = parsePerfumeFromDB(p)
          return {
            ...parsed,
            finalScore: parsed.score,
            tasteScore: 50,
            safetyScore: 100,
            isExcluded: false,
            exclusionReason: null
          }
        })

        return NextResponse.json({
          success: true,
          total: perfumes.length,
          perfumes,
          userScentDNA: [],
          hasPreferences: false,
          tier,
          limit: getResultsLimit(tier),
          shown: perfumes.length,
          locked: 0,
          blurredItems: [],
          upgradeMessage: tier === 'PREMIUM' ? null : getUpgradeMessage(tier, 'results')
        })
      }

      // Parse JSON fields
      const likedPerfumeIds = JSON.parse(dbPreference.likedPerfumes) as string[]
      const dislikedPerfumeIds = JSON.parse(dbPreference.dislikedPerfumes) as string[]
      const allergyProfile = JSON.parse(dbPreference.allergyProfile) as {
        symptoms: string[]
        families: string[]
        ingredients: string[]
      }

      // Get liked perfumes (supports both local and Fragella)
      const likedPerfumes = await getPerfumesUnified(likedPerfumeIds)
      const likedFamilies = likedPerfumes.flatMap(p => p.families || [])
      const uniqueFamilies = [...new Set(likedFamilies)]

      // Build user preference
      const userPreference: UserPreferenceForMatching = {
        likedPerfumesFamilies: uniqueFamilies,
        dislikedPerfumeIds,
        allergyProfile
      }

      // Fetch all perfumes from database
      const dbPerfumes = await prisma.perfume.findMany()
      
      // Parse perfumes from DB format
      const allPerfumes: PerfumeForMatching[] = dbPerfumes.map(p => {
        const parsed = parsePerfumeFromDB(p)
        return {
          ...parsed,
          scentPyramid: parsed.scentPyramid as PerfumeForMatching['scentPyramid']
        }
      })

      // Calculate match scores
      const scoredPerfumes = calculateMatchScores(allPerfumes, userPreference)

      // Apply gating
      const resultsLimit = getResultsLimit(tier)
      const blurredCount = getBlurredCount(tier)
      const visibleResults = scoredPerfumes.slice(0, resultsLimit)
      const lockedResults = scoredPerfumes.slice(resultsLimit, resultsLimit + blurredCount)
      
      const blurredMetadata = lockedResults.map(item => ({
        id: item.id,
        matchScore: Math.round(item.finalScore || 0),
        familyHint: item.families?.[0] || 'عطر مميز'
      }))

      return NextResponse.json({
        success: true,
        total: scoredPerfumes.length,
        perfumes: visibleResults,
        userScentDNA: uniqueFamilies,
        hasPreferences: uniqueFamilies.length > 0 || 
                        allergyProfile.ingredients.length > 0 ||
                        allergyProfile.symptoms.length > 0,
        tier,
        limit: resultsLimit,
        shown: visibleResults.length,
        locked: lockedResults.length,
        blurredItems: blurredMetadata,
        upgradeMessage: tier === 'PREMIUM' ? null : getUpgradeMessage(tier, 'results'),
        sources: {
          local: visibleResults.filter(p => !p.id.startsWith('fragella-')).length,
          fragella: visibleResults.filter(p => p.id.startsWith('fragella-')).length
        }
      })

    } else {
      // No session or preferences - return default scoring
      const dbPerfumes = await prisma.perfume.findMany({
        orderBy: { baseScore: 'desc' },
        take: getResultsLimit(tier)
      })

      const perfumes = dbPerfumes.map(p => {
        const parsed = parsePerfumeFromDB(p)
        return {
          ...parsed,
          finalScore: parsed.score,
          tasteScore: 50,
          safetyScore: 100,
          isExcluded: false,
          exclusionReason: null
        }
      })

      return NextResponse.json({
        success: true,
        total: perfumes.length,
        perfumes,
        userScentDNA: [],
        hasPreferences: false,
        tier,
        limit: getResultsLimit(tier),
        shown: perfumes.length,
        locked: 0,
        blurredItems: [],
        upgradeMessage: tier === 'PREMIUM' ? null : getUpgradeMessage(tier, 'results')
      })
    }

  } catch (error) {
    console.error('Matching API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint for simple fetch without preferences
export async function GET() {
  try {
    const session = await auth()
    const userId = session?.user?.id
    let tier: 'GUEST' | 'FREE' | 'PREMIUM' = 'GUEST'
    
    if (userId) {
      const userInfo = await getUserTierInfo(userId)
      tier = userInfo.tier
    }

    const dbPerfumes = await prisma.perfume.findMany({
      orderBy: { baseScore: 'desc' },
      take: getResultsLimit(tier)
    })

    const perfumes = Array.isArray(dbPerfumes)
      ? dbPerfumes.map(p => {
          const parsed = parsePerfumeFromDB(p)
          return {
            ...parsed,
            finalScore: parsed.score,
            tasteScore: 50,
            safetyScore: 100,
            isExcluded: false,
            exclusionReason: null
          }
        })
      : []

    return NextResponse.json({
      success: true,
      total: perfumes.length,
      perfumes,
      hasPreferences: false,
      tier,
      limit: getResultsLimit(tier),
      shown: perfumes.length,
      locked: 0,
      blurredItems: [],
      upgradeMessage: tier === 'PREMIUM' ? null : getUpgradeMessage(tier, 'results')
    })
  } catch (error) {
    console.error('Match GET Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
