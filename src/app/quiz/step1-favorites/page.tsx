"use client"
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { perfumes } from '@/lib/data/perfumes'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { PerfumeSearchResult } from '@/components/ui/PerfumeSearchResult'
import { CTAButton } from '@/components/ui/CTAButton'

const MIN_SELECTIONS = 3
const MAX_SELECTIONS = 12

export default function Step1FavoritesPage() {
  const router = useRouter()
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('step1_favorites')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load step1 favorites:', e)
        }
      }
    }
    return []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Save to sessionStorage whenever selectedPerfumes changes
  useEffect(() => {
    sessionStorage.setItem('step1_favorites', JSON.stringify(selectedPerfumes))
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
  const isLoading = searchTerm !== debouncedSearchTerm

  // Search functionality - useMemo
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return []
    return perfumes.filter(p =>
      p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [debouncedSearchTerm])

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

  const handleNext = () => {
    if (selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS) {
      sessionStorage.setItem('quiz_step1', JSON.stringify(selectedPerfumes))
      router.push('/quiz/step2-disliked')
    }
  }

  const canProceed = selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS
  const selectedPerfumesList = perfumes.filter(p => selectedPerfumes.includes(p.id))
  const displayedPerfumes = searchTerm ? searchResults : perfumes.slice(0, 12)

  return (
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-tajawal-bold text-4xl md:text-5xl text-brown-text mb-4">
            🧡 العطور التي تعجبني
          </h1>
          <p className="text-xl text-brown-text/70 max-w-2xl mx-auto">
            اختر 3-12 عطور من المفضّلات لديك
          </p>
        </div>

        {/* Selection Counter Badge */}
        {selectedPerfumes.length > 0 && (
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              canProceed 
                ? 'bg-green-600/10 border-2 border-green-600' 
                : 'bg-primary/10 border-2 border-primary'
            }`}>
              <span className={`font-tajawal-bold text-lg ${
                canProceed ? 'text-green-700' : 'text-brown-text'
              }`}>
                اخترت {selectedPerfumes.length}/{MAX_SELECTIONS}
              </span>
              {canProceed && (
                <span className="text-green-600 text-xl">✓</span>
              )}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brown-text/50 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن عطر..."
              className="w-full px-12 py-4 border-2 border-brown-text/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-brown-text placeholder-brown-text/50"
            />
            {isLoading && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {!searchTerm && searchResults.length === 0 && (
          <div className="text-center py-12 text-brown-text/60">
            <Search className="w-16 h-16 mx-auto mb-4 text-brown-text/30" />
            <h3 className="text-lg font-medium mb-2">اكتب اسم عطر للبدء</h3>
            <p className="text-sm">جرب &quot;Dior&quot; أو &quot;Chanel&quot; أو &quot;Oud&quot;</p>
          </div>
        )}

        {/* Search Results (Text-only) */}
        {searchTerm && searchResults.length > 0 && (
          <div className="space-y-2 mb-8 max-h-96 overflow-y-auto">
            {searchResults.map((perfume) => (
              <PerfumeSearchResult
                key={perfume.id}
                perfume={{
                  id: perfume.id,
                  name: perfume.name,
                  brand: perfume.brand,
                  matchPercentage: perfume.matchPercentage ?? perfume.score,
                  isSafe: perfume.isSafe
                }}
                isSelected={selectedPerfumes.includes(perfume.id)}
                onSelect={() => togglePerfume(perfume.id)}
                disabled={!selectedPerfumes.includes(perfume.id) && selectedPerfumes.length >= MAX_SELECTIONS}
              />
            ))}
          </div>
        )}

        {/* Selected Perfumes (Full Cards with Images) */}
        {selectedPerfumesList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brown-text mb-4">العطور المختارة</h2>
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
                  selectionType="liked"
                />
              ))}
            </div>
          </div>
        )}

        {/* Default Grid (when no search) */}
        {!searchTerm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedPerfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                variant={perfume.variant}
                title={perfume.name}
                brand={perfume.brand}
                matchPercentage={perfume.matchPercentage ?? perfume.score ?? 0}
                imageUrl={perfume.image}
                description={perfume.description}
                isSafe={perfume.isSafe}
                isSelected={selectedPerfumes.includes(perfume.id)}
                onSelect={() => togglePerfume(perfume.id)}
                selectionType="liked"
              />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-brown-text/10">
          <button
            onClick={() => router.push('/')}
            aria-label="العودة للصفحة الرئيسية"
            className="px-8 py-3 text-brown-text border-2 border-brown-text/30 rounded-2xl font-tajawal-bold hover:bg-brown-text hover:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
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
                <ChevronLeft className="w-5 h-5 inline mr-2" aria-hidden="true" />
              </>
            ) : selectedPerfumes.length < MIN_SELECTIONS ? (
              `اختر ${MIN_SELECTIONS} عطور على الأقل`
            ) : (
              `الحد الأقصى ${MAX_SELECTIONS} عطور`
            )}
          </CTAButton>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-brown-text/60">
            💡 كلما اخترت عطور أكثر، كانت التوصيات أدق وأكثر تناسباً مع ذوقك
          </p>
        </div>
      </div>
    </div>
  )
}
