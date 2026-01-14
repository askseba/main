'use client'
import { useState, useRef, useEffect } from 'react'
import { DollarSign, Loader2 } from 'lucide-react'
import { ShareButton } from '@/components/ui/ShareButton'
import { Button } from '@/components/ui/button'
import { type Perfume } from '@/lib/data/perfumes'

interface PerfumeDetailCTAProps {
  perfume: Perfume
}

interface PriceData {
  id: number
  perfumeId: string
  storeId: number
  price: number
  currency: string
  updatedAt: string
  store: {
    id: number
    name: string
    slug: string
    affiliateUrl: string
    commission: number
    isActive: boolean
  }
}

export function PerfumeDetailCTA({ perfume }: PerfumeDetailCTAProps) {
  const [showStores, setShowStores] = useState(false)
  const [prices, setPrices] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch prices when dropdown opens
  useEffect(() => {
    if (showStores && prices.length === 0 && !loading) {
      setLoading(true)
      fetch(`/api/prices/compare?perfumeId=${perfume.id}`)
        .then(res => res.json())
        .then(data => {
          setPrices(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching prices:', err)
          setLoading(false)
        })
    }
  }, [showStores, perfume.id, prices.length, loading])

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

  const getStoreUrl = (price: PriceData) => {
    // If affiliateUrl contains {query}, replace it with search query
    if (price.store.affiliateUrl.includes('{query}')) {
      const query = encodeURIComponent(`${perfume.brand} ${perfume.name}`)
      return price.store.affiliateUrl.replace('{query}', query)
    }
    // Otherwise, return the URL as-is (for stores with direct URLs)
    return price.store.affiliateUrl
  }

  // Fallback to mock prices if no data
  const basePrice = perfume.price || 299
  const hasPrices = prices.length > 0

  return (
    <div className="space-y-6">
      {/* CTA Section - Fixed positioning */}
      <div 
        className="cta-section fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 mx-auto max-w-4xl w-[calc(100%-2rem)]"
        dir="rtl"
        ref={dropdownRef}
      >
        <div className="flex gap-3 items-center">
          {/* Share Button */}
          <ShareButton 
            title={`${perfume.name} - ${perfume.brand}`}
            text={`صبا اختارت لي ${perfume.name} بنسبة ${perfume.score ?? 85}% 🎯 ✅ آمن تماماً`}
            variant="secondary"
            className="flex-1 h-12"
          />
          
          {/* قارن الأسعار Button - Prominent */}
          <div className="relative flex-1">
            <Button 
              className="w-full flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all font-semibold text-base px-6 py-3 rounded-full"
              onClick={() => setShowStores(!showStores)}
            >
              <DollarSign className="w-5 h-5" />
              قارن الأسعار
            </Button>
            
            {/* Dropdown */}
            {showStores && (
              <div className="absolute bottom-full right-0 mb-2 z-50 bg-white shadow-2xl rounded-2xl border-2 border-brown-text/10 p-3 min-w-[280px] max-w-[320px]" dir="rtl">
                {loading ? (
                  <div className="p-4 text-center">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-sm text-brown-text/60">جاري تحميل الأسعار...</p>
                  </div>
                ) : hasPrices ? (
                  <div className="space-y-2">
                    {prices.map((price) => (
                      <a
                        key={price.id}
                        href={getStoreUrl(price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 hover:bg-gray-50 rounded-xl flex items-center justify-between text-sm font-medium transition-colors border border-gray-100"
                      >
                        <span>{price.store.name}</span>
                        <span className="text-xs opacity-75 font-semibold text-primary">
                          {price.price.toFixed(0)} {price.currency}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-brown-text/60 mb-2">لا توجد أسعار متاحة حالياً</p>
                    <p className="text-xs text-brown-text/40">سيتم تحديث الأسعار قريباً</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
