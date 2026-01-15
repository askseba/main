"use client"
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { perfumes } from '@/lib/data/perfumes'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { CompactPerfumeCard } from '@/components/ui/CompactPerfumeCard'
import { CTAButton } from '@/components/ui/CTAButton'

const MIN_SELECTIONS = 3
const MAX_SELECTIONS = 12

export default function Step2DislikedPage() {
  const router = useRouter()
  const isInitialized = useRef(false)
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Load from sessionStorage on mount (client-side only)
  // This is a valid use case - reading from storage on mount
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      const saved = sessionStorage.getItem('step2_disliked')
      if (saved) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSelectedPerfumes(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load step2 disliked:', e)
        }
      }
    }
  }, [])

  // Save to sessionStorage whenever selectedPerfumes changes
  useEffect(() => {
    if (isInitialized.current) {
      sessionStorage.setItem('step2_disliked', JSON.stringify(selectedPerfumes))
    }
  }, [selectedPerfumes])

  // Debounce search term (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  // Calculate loading state based on search term vs debounced term
  const isSearchLoading = searchTerm !== debouncedSearchTerm

  // Validate perfumes data synchronously
  const error = (!perfumes || !Array.isArray(perfumes) || perfumes.length === 0) 
    ? 'بيانات العطور غير متاحة' 
    : null

  // Search functionality - useMemo (exclude already selected perfumes)
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return []
    try {
      if (!perfumes || !Array.isArray(perfumes)) return []
      return perfumes.filter(p =>
        // Filter by search term
        (p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
         p.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
        // Exclude already selected perfumes
        !selectedPerfumes.includes(p.id)
      )
    } catch (err) {
      console.error('Error filtering perfumes:', err)
      return []
    }
  }, [debouncedSearchTerm, selectedPerfumes])

  const togglePerfume = useCallback((id: string) => {
    setSelectedPerfumes(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id)
      } else if (prev.length < MAX_SELECTIONS) {
        return [...prev, id]
      }
      return prev
    })
  }, [])

  // Add perfume from search results to selected list
  const handleAddPerfume = useCallback((id: string) => {
    if (selectedPerfumes.length < MAX_SELECTIONS && !selectedPerfumes.includes(id)) {
      setSelectedPerfumes(prev => [...prev, id])
    }
  }, [selectedPerfumes])

  const handleNext = () => {
    // Allow skipping (empty array) or proceed with valid selection
    if (selectedPerfumes.length === 0 || (selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS)) {
      sessionStorage.setItem('quiz_step2', JSON.stringify(selectedPerfumes))
      router.push('/quiz/step3-allergy')
    }
  }

  const handleSkip = () => {
    sessionStorage.setItem('quiz_step2', JSON.stringify([]))
    router.push('/quiz/step3-allergy')
  }

  const canProceed = selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS
  const selectedPerfumesList = useMemo(() => {
    try {
      if (!perfumes || !Array.isArray(perfumes)) return []
      return perfumes.filter(p => selectedPerfumes.includes(p.id))
    } catch (err) {
      console.error('Error filtering selected perfumes:', err)
      return []
    }
  }, [selectedPerfumes])

  return (
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-tajawal-bold text-4xl md:text-5xl text-brown-text mb-4">
            ❌ العطور التي لا تعجبني
          </h1>
          <p className="text-xl text-brown-text/85 max-w-2xl mx-auto">
            اختر 3-12 عطور لا تعجبك
          </p>
        </div>

        {/* Selection Counter Badge - Always Visible */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all ${
            canProceed 
              ? 'bg-green-600/10 border-2 border-green-600' 
              : selectedPerfumes.length > 0
              ? 'bg-primary/10 border-2 border-primary'
              : 'bg-gray-100 border-2 border-gray-300'
          }`}>
            <span className={`font-tajawal-bold text-lg ${
              canProceed ? 'text-green-700' : selectedPerfumes.length > 0 ? 'text-brown-text' : 'text-gray-500'
            }`}>
              غير المفضلة: {selectedPerfumes.length} / {MAX_SELECTIONS}
            </span>
            {canProceed && (
              <span className="text-green-600 text-xl">✓</span>
            )}
            {!canProceed && selectedPerfumes.length > 0 && selectedPerfumes.length < MIN_SELECTIONS && (
              <span className="text-sm text-amber-600 font-medium">
                (اختر {MIN_SELECTIONS - selectedPerfumes.length} عطراً إضافياً على الأقل)
              </span>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brown-text/50 w-5 h-5" />
            <input
              type="search"
              inputMode="search"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن عطر..."
              className="w-full px-12 py-4 border-2 border-brown-text/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-brown-text placeholder-brown-text/50"
            />
            {isSearchLoading && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>

        {/* Search-First UX */}
        {error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <CTAButton onClick={() => window.location.reload()} variant="primary">
              إعادة المحاولة
            </CTAButton>
          </div>
        ) : (
          <>
            {/* Search Results - Compact Cards */}
            {debouncedSearchTerm.trim() && searchResults.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brown-text mb-4">نتائج البحث</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {searchResults.map((perfume) => (
                    <CompactPerfumeCard
                      key={perfume.id}
                      perfume={{
                        id: perfume.id,
                        name: perfume.name,
                        brand: perfume.brand,
                        matchPercentage: perfume.matchPercentage ?? perfume.score,
                        isSafe: perfume.isSafe
                      }}
                      onAdd={() => handleAddPerfume(perfume.id)}
                      disabled={selectedPerfumes.length >= MAX_SELECTIONS}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* رسالة عدم وجود نتائج */}
            {debouncedSearchTerm.trim() && searchResults.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                لا توجد نتائج مطابقة لبحثك
              </div>
            )}

            {/* Empty State - فقط عند عدم وجود بحث */}
            {!debouncedSearchTerm.trim() && (
              <div className="text-center py-20 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl p-12">
                <Search className="w-20 h-20 mx-auto mb-6 text-primary/50" />
                <h3 className="text-xl md:text-2xl font-bold text-brown-text mb-3">
                  ابدأ البحث عن عطرك المفضل
                </h3>
                <p className="text-lg text-brown-text/85 mb-8 max-w-md mx-auto">
                  اكتب اسم العطر أو الماركة مثل: Dior، Chanel، Oud، Jasmine
                </p>
              </div>
            )}

            {/* Selected Perfumes (Full Cards with Images) */}
            {selectedPerfumesList.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brown-text mb-4">
                  العطور المختارة ({selectedPerfumesList.length}/{MAX_SELECTIONS})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedPerfumesList.map((perfume) => (
                    <PerfumeCard
                      key={perfume.id}
                      variant={perfume.variant}
                      title={perfume.name}
                      brand={perfume.brand}
                      matchPercentage={perfume.matchPercentage ?? perfume.score ?? 0}
                      imageUrl={perfume.image}
                      description={perfume.description}
                      isSafe={perfume.isSafe}
                      isSelected={true}
                      onSelect={() => togglePerfume(perfume.id)}
                      selectionType="disliked"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-brown-text/10">
          <button
            onClick={() => router.push('/quiz/step1-favorites')}
            aria-label="العودة للخطوة السابقة"
            className="min-h-[44px] px-8 py-3 text-brown-text border-2 border-brown-text/30 rounded-2xl font-tajawal-bold hover:bg-brown-text hover:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto touch-manipulation"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" aria-hidden="true" />
            رجوع
          </button>

          <CTAButton
            variant={canProceed ? "primary" : "disabled"}
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {canProceed ? (
              <>
                التالي
                <ChevronLeft className="w-5 h-5 inline me-2 rtl:rotate-180" aria-hidden="true" />
              </>
            ) : selectedPerfumes.length < MIN_SELECTIONS ? (
              `اختر ${MIN_SELECTIONS} عطور على الأقل`
            ) : (
              `الحد الأقصى ${MAX_SELECTIONS} عطور`
            )}
          </CTAButton>
        </div>

        {/* Skip Button */}
        <div className="text-center mt-8">
          <CTAButton
            variant="tertiary"
            size="default"
            onClick={handleSkip}
            className="text-brown-text/85 hover:text-brown-text"
          >
            💡 تخطي هذه الخطوة
          </CTAButton>
          <p className="text-xs text-brown-text/50 mt-2">
            يمكنك تخطي هذه الخطوة إذا لم تكن هناك عطور تكرهها
          </p>
        </div>
      </div>
    </div>
  )
}
