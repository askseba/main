// src/app/api/match/route.ts
// Dynamic Matching API Endpoint
// POST /api/match - Returns scored and sorted perfumes based on user preferences

import { NextRequest, NextResponse } from 'next/server'
import { prisma, parsePerfumeFromDB } from '@/lib/prisma'
import { 
  calculateMatchScores, 
  type UserPreferenceForMatching,
  type PerfumeForMatching 
} from '@/lib/matching'

// Request body type
interface MatchRequestBody {
  sessionId?: string
  // Allow direct preferences for client-side data (from sessionStorage)
  preferences?: {
    likedPerfumeIds: string[]
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

    // 1. Fetch all perfumes from database
    const dbPerfumes = await prisma.perfume.findMany()
    
    // Parse perfumes from DB format
    const allPerfumes: PerfumeForMatching[] = dbPerfumes.map(p => {
      const parsed = parsePerfumeFromDB(p)
      return {
        ...parsed,
        scentPyramid: parsed.scentPyramid as PerfumeForMatching['scentPyramid']
      }
    })

    // 2. Get user preferences
    let userPreference: UserPreferenceForMatching

    if (preferences) {
      // Use client-provided preferences (from sessionStorage)
      // Need to get families from liked perfume IDs
      const likedPerfumes = allPerfumes.filter(p => 
        preferences.likedPerfumeIds.includes(p.id)
      )
      const likedFamilies = likedPerfumes.flatMap(p => p.families)

      userPreference = {
        likedPerfumesFamilies: likedFamilies,
        dislikedPerfumeIds: preferences.dislikedPerfumeIds,
        allergyProfile: preferences.allergyProfile
      }
    } else if (sessionId) {
      // Fetch from database
      const dbPreference = await prisma.userPreference.findUnique({
        where: { sessionId }
      })

      if (dbPreference) {
        // Parse JSON fields
        const likedPerfumeIds = JSON.parse(dbPreference.likedPerfumes) as string[]
        const dislikedPerfumeIds = JSON.parse(dbPreference.dislikedPerfumes) as string[]
        const allergyProfile = JSON.parse(dbPreference.allergyProfile) as {
          symptoms: string[]
          families: string[]
          ingredients: string[]
        }

        // Get families from liked perfumes
        const likedPerfumes = allPerfumes.filter(p => 
          likedPerfumeIds.includes(p.id)
        )
        const likedFamilies = likedPerfumes.flatMap(p => p.families)

        userPreference = {
          likedPerfumesFamilies: likedFamilies,
          dislikedPerfumeIds,
          allergyProfile
        }
      } else {
        // No preferences found - return default scoring
        userPreference = {
          likedPerfumesFamilies: [],
          dislikedPerfumeIds: [],
          allergyProfile: {
            symptoms: [],
            families: [],
            ingredients: []
          }
        }
      }
    } else {
      // No session or preferences - return default scoring
      userPreference = {
        likedPerfumesFamilies: [],
        dislikedPerfumeIds: [],
        allergyProfile: {
          symptoms: [],
          families: [],
          ingredients: []
        }
      }
    }

    // 3. Calculate match scores for all perfumes
    const scoredPerfumes = calculateMatchScores(allPerfumes, userPreference)

    // 4. Return scored and sorted perfumes
    return NextResponse.json({
      success: true,
      total: scoredPerfumes.length,
      perfumes: scoredPerfumes,
      userScentDNA: userPreference.likedPerfumesFamilies,
      hasPreferences: userPreference.likedPerfumesFamilies.length > 0 || 
                      userPreference.allergyProfile.ingredients.length > 0 ||
                      userPreference.allergyProfile.symptoms.length > 0
    })

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
    const dbPerfumes = await prisma.perfume.findMany({
      orderBy: { baseScore: 'desc' }
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
      hasPreferences: false
    })
  } catch (error) {
    console.error('Match GET Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
