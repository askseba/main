import { Suspense } from 'react'
import { SmartImage } from '@/components/ui/SmartImage'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SpeedometerGauge } from '@/components/ui/SpeedometerGauge'
import { PerfumeTimeline } from '@/components/ui/PerfumeTimeline'
import { getPerfumeById, normalizePerfume, perfumes } from '@/lib/data/perfumes'
import { PerfumeDetailCTA } from './PerfumeDetailCTA'

interface PerfumeDetailProps {
  params: Promise<{ id: string }>
}

export default async function PerfumeDetail({ params }: PerfumeDetailProps) {
  // ✅ Server Component مع await
  const { id } = await params
  const perfumeData = getPerfumeById(id) || perfumes[0] // Fallback to first perfume
  const perfume = normalizePerfume(perfumeData)

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-bg/50 to-cream-bg/90 py-12 px-6 pb-32" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Perfume Image */}
          <div className="space-y-6">
            <div className="w-full aspect-[3/4] bg-white/70 rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden">
              <SmartImage
                src={perfume.image}
                alt={`${perfume.name} - ${perfume.brand}`}
                width={600}
                height={800}
                className="w-full h-full"
                objectFit="cover"
              />
            </div>
            <div className="space-y-4 text-right">
              <h1 className="text-4xl font-bold text-brown-text leading-tight">{perfume.name}</h1>
              <p className="text-2xl text-brown-text/70 font-semibold">{perfume.brand}</p>
            </div>
          </div>

          {/* Right: Speedometer + Timeline */}
          <div className="space-y-10">
            <Suspense fallback={<LoadingSpinner size="sm" />}>
              <SpeedometerGauge 
                score={perfume.score ?? 85} 
                status={perfume.status ?? 'safe'} 
              />
            </Suspense>
            
            <Suspense fallback={<div className="h-64 animate-pulse bg-gray-200 rounded-2xl" />}>
              <PerfumeTimeline 
                stages={[
                  {
                    score: perfume.score ?? 85,
                    status: perfume.status ?? 'safe',
                    stageName: 'الافتتاحية',
                    notes: 'برغموت • فلفل • ليمون'
                  },
                  {
                    score: (perfume.score ?? 85) - 5,
                    status: perfume.status ?? 'safe',
                    stageName: 'القلب',
                    notes: 'لافندر • باتشولي • جيرانيوم'
                  },
                  {
                    score: (perfume.score ?? 85) + 5,
                    status: perfume.status ?? 'safe',
                    stageName: 'القاعدة',
                    notes: 'أمبروكسان • أرز • فيتيفر'
                  }
                ]}
              />
            </Suspense>
            
            {/* CTA Section */}
            <PerfumeDetailCTA perfume={perfume} />
          </div>
        </div>
      </div>
    </div>
  )
}
