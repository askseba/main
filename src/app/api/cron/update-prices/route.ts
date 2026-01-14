import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// This endpoint is called by Vercel Cron (or manual trigger)
export async function GET(request: Request) {
  // Verify cron secret (recommended for security)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('🔄 Starting daily price update...')

    // Get popular perfumes (top 100)
    const popularPerfumes = await prisma.perfume.findMany({
      take: 100,
      orderBy: { baseScore: 'desc' }
    })

    // Get active stores
    const stores = await prisma.store.findMany({
      where: { isActive: true }
    })

    let updatedCount = 0

    // For each perfume, update prices from each store
    for (const perfume of popularPerfumes) {
      for (const store of stores) {
        // TODO: Replace with actual scraping logic
        // For now, use mock price based on base price
        const mockPrice = (perfume.price || 299) * (0.9 + Math.random() * 0.2) // ±10% variation

        await prisma.price.upsert({
          where: {
            perfumeId_storeId: {
              perfumeId: perfume.id,
              storeId: store.id
            }
          },
          create: {
            perfumeId: perfume.id,
            storeId: store.id,
            price: mockPrice,
            currency: 'SAR'
          },
          update: {
            price: mockPrice
          }
        })

        updatedCount++
      }
    }

    console.log(`✅ Updated ${updatedCount} prices for ${popularPerfumes.length} perfumes`)

    return NextResponse.json({
      success: true,
      updated: updatedCount,
      perfumes: popularPerfumes.length,
      stores: stores.length
    })
  } catch (error) {
    console.error('❌ Price update error:', error)
    return NextResponse.json(
      { error: 'Failed to update prices', details: String(error) },
      { status: 500 }
    )
  }
}
