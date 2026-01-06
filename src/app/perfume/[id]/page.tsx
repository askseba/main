import { Suspense } from 'react'
import { SmartImage } from '@/components/ui/SmartImage'
import { ShareButton } from '@/components/ui/ShareButton'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SpeedometerGauge } from '@/components/ui/SpeedometerGauge'
import { PerfumeTimeline } from '@/components/ui/PerfumeTimeline'
import { getPerfumeById, normalizePerfume, perfumes } from '@/lib/data/perfumes'

interface PerfumeDetailProps {
  params: Promise<{ id: string }>
}

export default async function PerfumeDetail({ params }: PerfumeDetailProps) {
  // ✅ Server Component مع await
  const { id } = await params
  const perfumeData = getPerfumeById(id) || perfumes[0] // Fallback to first perfume
  const perfume = normalizePerfume(perfumeData)

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-bg/50 to-cream-bg/90 py-12 px-6" dir="rtl">
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
          <div className="space-y-8">
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
            
            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-safe-green text-white rounded-3xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all col-span-2 md:col-span-1"
                aria-label="شراء العطر الآن"
              >
                🛒 اشترِ الآن
              </button>
              <button 
                className="px-8 py-4 bg-white border-2 border-brown-text rounded-3xl font-bold hover:bg-brown-text hover:text-white transition-all"
                aria-label="طلب عينة بحجم 25 مل"
              >
                📦 عينة 25ر
              </button>
              <button 
                className="px-8 py-4 bg-[#EBE1DD]/50 border-2 border-[#EBE1DD]/50 rounded-3xl font-bold hover:shadow-xl transition-all"
                aria-label="حفظ العطر في قائمة المفضلة"
              >
                ♡ حفظ
              </button>
            </div>
            
            {/* Share Button */}
            <div className="flex justify-center mt-6">
              <ShareButton 
                title={`${perfume.name} - ${perfume.brand}`}
                text={`صبا اختارت لي ${perfume.name} بنسبة ${perfume.score ?? 85}% 🎯 ✅ آمن تماماً`}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
