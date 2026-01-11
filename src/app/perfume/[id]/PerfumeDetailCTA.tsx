'use client'
import { useState, useRef, useEffect } from 'react'
import { DollarSign } from 'lucide-react'
import { ShareButton } from '@/components/ui/ShareButton'
import { Button } from '@/components/ui/button'
import { type Perfume } from '@/lib/data/perfumes'

interface PerfumeDetailCTAProps {
  perfume: Perfume
}

const STORES = {
  noon: (perfume: Perfume) => `https://www.noon.com/saudi-en/search?q=${encodeURIComponent(`${perfume.brand} ${perfume.name}`)}&o=askseba`,
  namshi: (perfume: Perfume) => `https://www.namshi.com/sa-ar/search?q=${encodeURIComponent(`${perfume.brand} ${perfume.name}`)}`,
  sixthstreet: (perfume: Perfume) => `https://sa-en.6thstreet.com/search?q=${encodeURIComponent(`${perfume.brand} ${perfume.name}`)}`
}

export function PerfumeDetailCTA({ perfume }: PerfumeDetailCTAProps) {
  const [showStores, setShowStores] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStores(false)
      }
    }

    if (showStores) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showStores])

  const basePrice = perfume.price || 299
  const noonPrice = basePrice
  const namshiPrice = basePrice > 15 ? basePrice - 15 : basePrice

  return (
    <div className="space-y-6">
      {/* CTA Section - Fixed positioning */}
      <div 
        className="cta-section fixed bottom-4 left-1/2 -translate-x-1/2 z-50 mt-8 p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 mx-auto max-w-4xl w-[calc(100%-2rem)]"
        ref={dropdownRef}
      >
        <div className="flex gap-3">
          {/* Share Button */}
          <ShareButton 
            title={`${perfume.name} - ${perfume.brand}`}
            text={`صبا اختارت لي ${perfume.name} بنسبة ${perfume.score ?? 85}% 🎯 ✅ آمن تماماً`}
            variant="secondary"
            className="flex-1"
          />
          
          {/* قارن الأسعار Button - Prominent */}
          <div className="relative flex-[2]">
            <Button 
              className="w-full flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all font-semibold text-base px-8 py-4 rounded-full"
              onClick={() => setShowStores(!showStores)}
            >
              <DollarSign className="w-5 h-5" />
              قارن الأسعار
            </Button>
            
            {/* Dropdown */}
            {showStores && (
              <div className="absolute bottom-full right-0 mb-2 z-50 bg-white shadow-2xl rounded-2xl border-2 border-brown-text/10 p-3 grid grid-cols-2 gap-2 min-w-[280px]" dir="rtl">
                <a 
                  href={STORES.noon(perfume)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 hover:bg-gray-50 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors border border-gray-100"
                >
                  🛒 Noon 
                  <span className="text-xs opacity-75">SAR {noonPrice}</span>
                </a>
                <a 
                  href={STORES.namshi(perfume)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 hover:bg-gray-50 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors border border-gray-100"
                >
                  👕 Namshi 
                  <span className="text-xs opacity-75">SAR {namshiPrice}</span>
                </a>
                <a 
                  href={STORES.sixthstreet(perfume)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 hover:bg-gray-50 rounded-xl flex items-center gap-2 text-sm font-semibold col-span-2 border-t border-gray-200 pt-2 mt-2 text-primary hover:text-primary/80 transition-colors"
                >
                  🎁 شراء عينة
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
