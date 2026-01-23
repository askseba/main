'use client'
import React from 'react'
import { Lock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface BlurredItem {
  name: string
  brand: string
  matchScore: number
}

// Support both old and new interfaces
interface BlurredTeaserCardProps {
  // New interface (single card)
  title?: string
  brand?: string
  matchPercentage?: number
  // Old interface (multiple items)
  items?: BlurredItem[]
  tier?: 'GUEST' | 'FREE'
  onUpgrade?: () => void
}

export function BlurredTeaserCard({ 
  title, 
  brand, 
  matchPercentage = 85,
  items,
  tier,
  onUpgrade
}: BlurredTeaserCardProps) {
  const router = useRouter()
  
  // Handle old interface (items array)
  if (items && items.length > 0) {
    const averageMatch = Math.round(
      items.reduce((sum, i) => sum + i.matchScore, 0) / items.length
    )
    
    const message = tier === 'GUEST' 
      ? 'سجّل مجاناً لحفظ بصمتك العطرية'
      : 'اشترك للوصول لجميع النتائج'
    
    const ctaText = tier === 'GUEST'
      ? 'سجّل الآن مجاناً'
      : 'اشترك بـ 15 ريال/شهر'
    
    const handleClick = () => {
      if (tier === 'GUEST') {
        signIn()
      } else {
        onUpgrade?.() || router.push('/pricing')
      }
    }
    
    return (
      <div className="relative bg-gradient-to-br from-primary/5 via-purple-500/5 to-primary/10 rounded-3xl p-8 border-2 border-primary/20 overflow-hidden" dir="rtl">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-purple-600 p-6 rounded-full shadow-2xl">
              <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="relative z-20 text-center space-y-6">
          <div className="flex justify-center gap-4 mb-6">
            {items.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-primary/10">
                <p className="text-xs text-brown-text/60 mb-1">{item.brand}</p>
                <p className="text-sm font-bold text-brown-text truncate w-20">{item.name}</p>
                <p className="text-xs text-primary font-bold mt-1">{item.matchScore}%</p>
              </div>
            ))}
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-brown-text">
            {items.length} عطر إضافي ينتظرك
          </h3>
          <p className="text-lg text-brown-text/75">{message}</p>
          <p className="text-3xl font-black text-primary">{averageMatch}%</p>
          <p className="text-sm text-brown-text/60">متوسط التطابق</p>
          <button
            onClick={handleClick}
            className="w-full py-4 px-8 bg-gradient-to-l from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {ctaText}
          </button>
        </div>
      </div>
    )
  }
  
  // New interface (single card)
  return (
    <div className="w-full max-w-sm bg-cream-bg rounded-2xl shadow-lg overflow-hidden border border-brown-text/5">
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-8 mt-2 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="absolute inset-0 backdrop-blur-md bg-black/20" />
        <Lock className="w-16 h-16 text-white/70 relative z-10" />
      </div>
      <div className="relative px-6 pb-6 pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-300">
            🔒 مموّه
          </span>
          <span className="text-brand-gold-darker text-sm font-bold">{brand}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-6 bg-brown-text/10 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-brown-text/10 rounded-lg w-full animate-pulse" />
        </div>
        <div className="h-px w-full bg-brown-text/10" />
        <button 
          onClick={() => {
            if (!tier || tier === 'GUEST') {
              signIn()
            } else {
              router.push('/pricing')
            }
          }}
          className="w-full min-h-[44px] rounded-full font-bold text-base bg-primary hover:bg-primary/90 text-white transition-all"
        >
          اشترك لرؤية النتيجة
        </button>
      </div>
    </div>
  )
}
