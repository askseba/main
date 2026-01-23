"use client"
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronLeft, ChevronRight, Plus, X, AlertTriangle } from 'lucide-react'
import { perfumes } from '@/lib/data/perfumes'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { CTAButton } from '@/components/ui/CTAButton'

const MIN_SELECTIONS = 3
const MAX_SELECTIONS = 12

export default function Step1FavoritesPage() {
  const router = useRouter()
  const isInitialized = useRef(false)
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [showMaxWarning, setShowMaxWarning] = useState(false)

  // Validate perfumes data synchronously (no effect needed)
  const error = (!perfumes || !Array.isArray(perfumes) || perfumes.length === 0) 
    ? 'بيانات العطور غير متاحة' 
    : null

  // Load from sessionStorage on mount (client-side only)
  // This is a valid use case - reading from storage on mount
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      const saved = sessionStorage.getItem('step1_favorites')
      if (saved) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSelectedPerfumes(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load step1 favorites:', e)
        }
      }
    }
  }, [])

  // Save to sessionStorage whenever selectedPerfumes changes
  useEffect(() => {
    if (isInitialized.current) {
      sessionStorage.setItem('step1_favorites', JSON.stringify(selectedPerfumes))
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

  // Check if max reached
  const isMaxReached = selectedPerfumes.length >= MAX_SELECTIONS

  // Timer ref for max warning
  const maxWarningTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup function to clear max warning timeout
  useEffect(() => {
    return () => {
      if (maxWarningTimerRef.current) {
        clearTimeout(maxWarningTimerRef.current)
      }
    }
  }, [])

  const handleMaxWarning = useCallback((id: string) => {
    if (selectedPerfumes.length >= MAX_SELECTIONS && !selectedPerfumes.includes(id)) {
      setShowMaxWarning(true)
      // Clear any existing timeout
      if (maxWarningTimerRef.current) {
        clearTimeout(maxWarningTimerRef.current)
      }
      maxWarningTimerRef.current = setTimeout(() => {
        setShowMaxWarning(false)
        maxWarningTimerRef.current = null
      }, 3000)
    }
  }, [selectedPerfumes])

  // Search functionality - exclude already selected perfumes
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return []
    try {
      if (!perfumes || !Array.isArray(perfumes)) return []
      return perfumes.filter(p =>
        (p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
         p.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
        !selectedPerfumes.includes(p.id)
      )
    } catch (err) {
      console.error('Error filtering perfumes:', err)
      return []
    }
  }, [debouncedSearchTerm, selectedPerfumes])

  // Add perfume from search results
  const handleAddPerfume = useCallback((id: string) => {
    if (selectedPerfumes.length >= MAX_SELECTIONS) {
      handleMaxWarning(id)
      return
    }
    if (!selectedPerfumes.includes(id)) {
      setSelectedPerfumes(prev => [...prev, id])
    }
  }, [selectedPerfumes, handleMaxWarning])

  // Remove perfume from selected list
  const handleRemovePerfume = useCallback((id: string) => {
    setSelectedPerfumes(prev => prev.filter(p => p !== id))
  }, [])

  const handleNext = () => {
    if (selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS) {
      sessionStorage.setItem('quiz_step1', JSON.stringify(selectedPerfumes))
      router.push('/quiz/step2-disliked')
    }
  }

  const canProceed = selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS
  
  // Get full perfume objects for selected IDs
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
        <div 
          className="flex items-center justify-center gap-2 mb-8"
          role="progressbar"
          aria-valuenow={1}
          aria-valuemin={0}
          aria-valuemax={3}
          aria-label="تقدم الاختبار: الخطوة 1 من 3"
        >
          <div className="w-3 h-3 rounded-full bg-primary" aria-current="step" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-tajawal-bold text-4xl md:text-5xl text-brown-text mb-4">
            🧡 العطور التي تعجبني
          </h1>
          <p className="text-xl text-brown-text/85 max-w-2xl mx-auto">
            اختر 3-12 عطور من المفضّلات لديك
          </p>
        </div>

        {/* Selection Counter Badge */}
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
              المفضلة: {selectedPerfumes.length} / {MAX_SELECTIONS}
            </span>
            {canProceed && (
              <span className="text-green-600 text-xl">✓</span>
            )}
            {!canProceed && selectedPerfumes.length < MIN_SELECTIONS && (
              <span className="text-sm text-amber-600 font-medium">
                (اختر {MIN_SELECTIONS - selectedPerfumes.length} عطراً إضافياً على الأقل)
              </span>
            )}
          </div>
        </div>

        {/* Max Selection Warning */}
        {showMaxWarning && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">الحد الأقصى 12 عطراً!</span>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <Search className="absolute end-4 top-1/2 transform -translate-y-1/2 text-brown-text/50 w-5 h-5" />
            <input
              type="search"
              inputMode="search"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="اكتب اسم عطر للبدء..."
              aria-label="ابحث عن عطر مفضل"
              aria-describedby="search-help"
              maxLength={50}
              className="w-full px-12 py-4 border-2 border-brown-text/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-brown-text placeholder-brown-text/50 text-lg"
            />
            <span id="search-help" className="sr-only">
              ابحث عن العطور بالاسم أو الماركة. ستظهر لك أفضل النتائج.
            </span>
            {isSearchLoading && (
              <div className="absolute start-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              </div>
            )}
          </div>

          {/* ========================================
              SEARCH RESULTS - TEXT ONLY (No Images)
              ======================================== */}
          {debouncedSearchTerm.trim() && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-brown-text/20 rounded-xl shadow-xl z-40 max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs text-brown-text/50 px-3 py-2 border-b border-brown-text/10">
                  {searchResults.length} نتيجة
                </div>
                {searchResults.map((perfume) => (
                  <div
                    key={perfume.id}
                    className="flex items-center justify-between p-3 hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {/* Text Only - Name & Brand */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-brown-text truncate">
                        {perfume.name}
                      </h3>
                      <p className="text-sm text-brown-text/75 truncate">
                        {perfume.brand}
                      </p>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => handleAddPerfume(perfume.id)}
                      disabled={isMaxReached}
                      aria-label={`إضافة ${perfume.name} من ${perfume.brand}`}
                      className={`min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg font-semibold text-sm transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        isMaxReached
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-primary text-white hover:bg-primary/90 active:scale-95'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {debouncedSearchTerm.trim() && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-brown-text/20 rounded-xl shadow-xl z-40 p-6 text-center">
              <p className="text-brown-text/75">لا توجد نتائج مطابقة لـ &ldquo;{debouncedSearchTerm}&rdquo;</p>
            </div>
          )}
        </div>

        {error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <CTAButton onClick={() => window.location.reload()} variant="primary">
              إعادة المحاولة
            </CTAButton>
          </div>
        ) : (
          <>
            {/* ========================================
                EMPTY STATE - Before Search
                ======================================== */}
            {!debouncedSearchTerm.trim() && selectedPerfumesList.length === 0 && (
              <div className="text-center py-20 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl">
                <Search className="w-20 h-20 mx-auto mb-6 text-primary/40" />
                <h3 className="text-2xl font-bold text-brown-text mb-3">
                  اكتب اسم عطر للبدء...
                </h3>
                <p className="text-lg text-brown-text/75 mb-4 max-w-md mx-auto">
                  ابحث عن عطورك المفضلة بالاسم أو الماركة
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {['Dior', 'Chanel', 'Tom Ford', 'Creed', 'Oud'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchTerm(suggestion)}
                      className="min-h-[44px] min-w-[44px] px-6 py-3 bg-white border border-brown-text/20 rounded-full text-sm text-brown-text/85 hover:border-primary hover:text-primary transition-colors touch-manipulation"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================
                SELECTED PERFUMES - Full Cards with Images
                ======================================== */}
            {selectedPerfumesList.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-brown-text">
                    العطور المختارة ({selectedPerfumesList.length}/{MAX_SELECTIONS})
                  </h2>
                  {selectedPerfumesList.length > 0 && (
                    <button
                      onClick={() => setSelectedPerfumes([])}
                      className="min-h-[44px] min-w-[44px] px-4 py-2 text-sm text-red-500 hover:text-red-600 font-medium touch-manipulation"
                    >
                      مسح الكل
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedPerfumesList.map((perfume) => (
                    <div key={perfume.id} className="relative group">
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemovePerfume(perfume.id)}
                        className="absolute -top-2 -right-2 z-10 min-w-[44px] min-h-[44px] w-11 h-11 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 touch-manipulation"
                        aria-label={`إزالة ${perfume.name}`}
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Full PerfumeCard with Image */}
                      <PerfumeCard
                        id={perfume.id}
                        variant={perfume.variant}
                        title={perfume.name}
                        brand={perfume.brand}
                        matchPercentage={perfume.matchPercentage ?? perfume.score ?? 0}
                        imageUrl={perfume.image}
                        description={perfume.description}
                        isSafe={perfume.isSafe}
                        isSelected={true}
                        onSelect={() => handleRemovePerfume(perfume.id)}
                        selectionType="liked"
                        showAddButton={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 mt-8 border-t border-brown-text/10">
          <button
            onClick={() => router.push('/quiz')}
            aria-label="العودة لصفحة الاختبار"
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

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-brown-text/75">
            💡 كلما اخترت عطور أكثر، كانت التوصيات أدق وأكثر تناسباً مع ذوقك
          </p>
        </div>
      </div>
    </div>
  )
}
