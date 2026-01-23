"use client"
import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronLeft, ChevronRight, Sparkles, DollarSign, Heart } from 'lucide-react'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { CTAButton } from '@/components/ui/CTAButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { UpgradePrompt } from '@/components/ui/UpgradePrompt'
import { useQuiz } from '@/contexts/QuizContext'
import { useSession } from 'next-auth/react'
import { formatPerfumeResultsTitle } from '@/lib/utils/arabicPlural'
import { LIMITS } from '@/lib/gating'
import { type ScoredPerfume } from '@/lib/matching'
import { toast } from 'sonner'
import Link from 'next/link'
import { useResultsFilters } from '@/hooks/useResultsFilters'
import { getStorageJSON, setStorageJSON } from '@/lib/utils/storage'
import { safeFetch, validateArray, validateObject } from '@/lib/utils/api-helpers'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'

// Lazy load MobileFilterModal - heavy modal component
const MobileFilterModal = dynamic(
  () => import('@/components/ui/MobileFilterModal').then(mod => ({ default: mod.MobileFilterModal })),
  {
    ssr: false,
    loading: () => null // Modal handles its own loading state
  }
)

interface MatchAPIResponse {
  success: boolean
  total: number
  perfumes: ScoredPerfume[]
  userScentDNA: string[]
  hasPreferences: boolean
}

export default function ResultsPage() {
  const { data: quizData } = useQuiz()
  const { data: session } = useSession()
  const { isOnline } = useNetworkStatus()
  
  // Determine user tier (GUEST if no session, otherwise assume PREMIUM for logged-in users)
  const userTier = !session ? 'GUEST' : 'PREMIUM'
  
  // State for API data
  const [scoredPerfumes, setScoredPerfumes] = useState<ScoredPerfume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasPreferences, setHasPreferences] = useState(false)
  const [userScentDNA, setUserScentDNA] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  
  // Load favorites from DB on mount
  useEffect(() => {
    if (session?.user?.id) {
      safeFetch<{ success: boolean; data?: string[]; error?: string }>('/api/user/favorites')
        .then((response) => {
          if (response.success && response.data) {
            const ids = validateArray<string>(response.data, 'المفضلات يجب أن تكون مصفوفة')
            setFavoriteIds(new Set(ids))
          } else {
            setFavoriteIds(new Set())
            if (response.error) {
              toast.error(response.error)
            }
          }
        })
        .catch((err) => {
          console.error('Error loading favorites:', err)
          setFavoriteIds(new Set())
          const errorMessage = err instanceof Error ? err.message : 'فشل تحميل المفضلات'
          toast.error(errorMessage)
        })
    } else {
      // Guest: load from localStorage
      const guestFavs = getStorageJSON<string[]>('guestFavorites', [])
      setFavoriteIds(new Set(guestFavs))
    }
  }, [session?.user?.id])
  
  // UI State
  const [searchQuery, setSearchQuery] = useState('')
  const { filters, setFilters } = useResultsFilters()
  // ✅ CHANGED: Removed 'price-low' and 'price-high' from sort options
  const [sortBy, setSortBy] = useState<'match' | 'rating'>('match')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemsPerPage = 12

  // Fetch scored perfumes from API
  useEffect(() => {
    async function fetchMatchedPerfumes() {
      setIsLoading(true)
      setError(null)
      
      try {
        const data = await safeFetch<MatchAPIResponse>('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            preferences: {
              likedPerfumeIds: quizData.step1_liked,
              dislikedPerfumeIds: quizData.step2_disliked,
              allergyProfile: {
                symptoms: quizData.step3_allergy.symptoms || [],
                families: quizData.step3_allergy.families || [],
                ingredients: quizData.step3_allergy.ingredients || []
              }
            }
          })
        })

        // Validate response structure
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          throw new Error('استجابة غير صحيحة من الخادم')
        }
        
        const validatedData = data as MatchAPIResponse
        
        if (validatedData.success) {
          // Validate perfumes is an array
          const perfumesArray = Array.isArray(validatedData.perfumes) 
            ? validatedData.perfumes 
            : []
          
          setScoredPerfumes(perfumesArray)
          setHasPreferences(validatedData.hasPreferences === true)
          setUserScentDNA(Array.isArray(validatedData.userScentDNA) 
            ? validatedData.userScentDNA 
            : [])
        } else {
          throw new Error('API returned unsuccessful response')
        }
      } catch (err) {
        console.error('Error fetching matches:', err)
        setScoredPerfumes([])
        setHasPreferences(false)
        setUserScentDNA([])
        const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل النتائج'
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatchedPerfumes()
  }, [quizData.step1_liked, quizData.step2_disliked, quizData.step3_allergy])

  // Client-side filtering (search, match%, families - NO PRICE)
  const filteredPerfumes = useMemo(() => {
    let result = [...scoredPerfumes]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(perfume =>
        perfume.name.toLowerCase().includes(query) ||
        perfume.brand.toLowerCase().includes(query)
      )
    }

    // Match percentage filter
    if (filters.matchPercentage > 0) {
      result = result.filter(perfume => perfume.finalScore >= filters.matchPercentage)
    }

    // ❌ REMOVED: Price filter (lines 164-169 deleted)
    // Price is for reference only, not for filtering

    // Families filter
    if (filters.families.length > 0) {
      result = result.filter(perfume => {
        const perfumeFamiliesLower = (perfume.families || []).map(f => f.toLowerCase())
        
        return filters.families.some(selectedFamily => {
          const selectedLower = selectedFamily.toLowerCase()
          
          // Handle child keys like "الأخشاب-عود" - extract child name
          const childName = selectedLower.includes('-') 
            ? selectedLower.split('-').slice(1).join('-') 
            : null
          
          // Check if perfume families match parent family or child name
          return perfumeFamiliesLower.some(perfumeFamily => {
            // Match parent family name
            if (perfumeFamily.includes(selectedLower) || selectedLower.includes(perfumeFamily)) {
              return true
            }
            // Match child name if it's a child selection
            if (childName && (perfumeFamily.includes(childName) || childName.includes(perfumeFamily))) {
              return true
            }
            return false
          })
        })
      })
    }

    // ✅ CHANGED: Sort (removed price-low and price-high)
    switch (sortBy) {
      case 'match':
        result.sort((a, b) => b.finalScore - a.finalScore)
        break
      case 'rating':
        result.sort((a, b) => b.finalScore - a.finalScore)
        break
    }

    return result
  }, [scoredPerfumes, searchQuery, filters, sortBy])

  // Determine results limit based on tier
  const resultsToShow = userTier === 'GUEST' 
    ? LIMITS.GUEST_RESULTS  // 3
    : LIMITS.PREMIUM_RESULTS // 12
  
  // Limit visible results for guests
  const visibleResults = filteredPerfumes.slice(0, resultsToShow)
  
  const totalPages = Math.ceil(visibleResults.length / itemsPerPage)
  const paginatedPerfumes = visibleResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )


  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-bg flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xl text-brown-text">جاري حساب التوافق...</p>
          <p className="text-brown-text/75 mt-2">نحلل تفضيلاتك للحصول على أفضل النتائج</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-cream-bg flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <CTAButton onClick={() => window.location.reload()}>
            إعادة المحاولة
          </CTAButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-bg pb-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Header */}
        <div className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-tajawal-black text-brown-text mb-4 leading-tight">
              <Sparkles className="inline w-10 h-10 text-primary mb-2" />
              {formatPerfumeResultsTitle(filteredPerfumes.length)}
            </h1>
            <p className="text-xl text-brown-text/75 mb-6">
              {hasPreferences 
                ? 'عطور مخصصة لك بناءً على تفضيلاتك'
                : 'جميع العطور المتاحة'}
            </p>
            {userScentDNA.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {userScentDNA.map((family, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {family}
                  </span>
                ))}
              </div>
            )}
            <div className="flex justify-center gap-4">
              <ShareButton 
                title="نتائج بحث صبا"
                text={`اكتشفت ${filteredPerfumes.length} عطر مناسب لي عبر صبا!`}
              />
              <Link href="/dashboard">
                <CTAButton variant="secondary">
                  لوحة التحكم
                </CTAButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 hidden lg:block">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl sticky top-24">
              {/* Search */}
              <div className="mb-6 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-text/40" />
                <input
                  type="text"
                  placeholder="ابحث عن عطر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 rounded-xl border border-brown-text/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-text"
                />
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-tajawal-bold text-2xl md:text-3xl text-brown-text mb-3">الترتيب</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full p-3 rounded-xl border border-brown-text/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-brown-text bg-white"
                >
                  <option value="match">الأعلى تطابقاً</option>
                  <option value="rating">الأعلى تقييماً</option>
                  {/* ❌ REMOVED: price-low and price-high options */}
                </select>
              </div>

              {/* Match Percentage Filter */}
              <div className="mb-6">
                <h3 className="font-tajawal-bold text-2xl md:text-3xl text-brown-text mb-3">نسبة التطابق</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={filters.matchPercentage}
                  onChange={(e) => setFilters({ ...filters, matchPercentage: Number(e.target.value) })}
                  className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm text-brown-text/75 mt-2">
                  <span>{filters.matchPercentage}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* ❌ REMOVED: Price Filter (lines 391-406 deleted) */}
              {/* Price is for reference only - users use "قارن الأسعار" button */}

              {/* Families Filter */}
              <div className="mb-6">
                <h3 className="font-tajawal-bold text-2xl md:text-3xl text-brown-text mb-3">العائلة العطرية</h3>
                <div className="space-y-2">
                  {['الأخشاب', 'الشرقية', 'الزهرية'].map((family) => (
                    <label key={family} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.families.includes(family)}
                        onChange={(e) => {
                          const newFamilies = e.target.checked
                            ? [...filters.families, family]
                            : filters.families.filter(f => f !== family)
                          setFilters({...filters, families: newFamilies})
                        }}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-brown-text">{family}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Score Breakdown Legend */}
              <div className="mb-6 p-4 bg-cream-bg rounded-xl">
                <h3 className="font-tajawal-bold text-xl md:text-2xl text-brown-text mb-3">كيف يُحسب التوافق؟</h3>
                <div className="space-y-2 text-sm text-brown-text/85">
                  <div className="flex justify-between">
                    <span>الذوق العطري</span>
                    <span className="text-primary font-medium">70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>عامل الأمان</span>
                    <span className="text-primary font-medium">30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Modal */}
          <MobileFilterModal 
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Results Grid */}
          <div className="flex-1">
            {paginatedPerfumes.length === 0 ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <div className="w-32 h-32 mx-auto mb-8 bg-primary/10 rounded-3xl flex items-center justify-center">
                  <Search className="w-16 h-16 text-primary/50" />
                </div>
                <h3 className="text-2xl md:text-3xl font-tajawal-bold text-brown-text mb-4">
                  لا توجد نتائج
                </h3>
                <p className="text-lg text-brown-text/75 mb-8 max-w-md mx-auto">
                  حاول تعديل الفلاتر أو كلمات البحث
                </p>
                <CTAButton 
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({ matchPercentage: 0, maxPrice: 5000, families: [] })
                    setCurrentPage(1)
                  }}
                >
                  إعادة تعيين الفلاتر
                </CTAButton>
              </motion.div>
            ) : (
              <>
                {/* Results Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {paginatedPerfumes.map((perfume, index) => (
                    <motion.div
                      key={perfume.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative group"
                      data-perfume-card
                    >
                      <PerfumeCard 
                        id={perfume.id}
                        variant={perfume.variant as 'on-sale' | 'just-arrived' | undefined}
                        title={perfume.name}
                        brand={perfume.brand}
                        matchPercentage={perfume.finalScore}
                        imageUrl={perfume.image}
                        description={perfume.description || undefined}
                        isSafe={perfume.safetyScore === 100}
                      />
                      
                      {/* Favorite and Share Buttons */}
                      <motion.div 
                        className="absolute top-4 left-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Favorite Button - Available to all users */}
                        <button
                            onClick={async (e) => {
                              e.stopPropagation()
                              const isFavorite = favoriteIds.has(perfume.id)
                              const action = isFavorite ? 'remove' : 'add'
                              
                              // Optimistic update
                              setFavoriteIds(prev => {
                                const newSet = new Set(prev)
                                if (action === 'add') {
                                  newSet.add(perfume.id)
                                } else {
                                  newSet.delete(perfume.id)
                                }
                                return newSet
                              })
                              
                              try {
                                if (!session?.user?.id) {
                                  // Guest: use localStorage
                                  const guestFavs = getStorageJSON<string[]>('guestFavorites', [])
                                  let updatedFavs: string[]
                                  if (action === 'add') {
                                    updatedFavs = [...new Set([...guestFavs, perfume.id])]
                                    toast.success('تم الحفظ في المفضلة ♥️', {
                                      style: { direction: 'rtl', textAlign: 'right' }
                                    })
                                  } else {
                                    updatedFavs = guestFavs.filter((id: string) => id !== perfume.id)
                                    toast.success('تم الحذف من المفضلة', {
                                      style: { direction: 'rtl', textAlign: 'right' }
                                    })
                                  }
                                  setStorageJSON('guestFavorites', updatedFavs)
                                  return
                                }
                                
                                // Check network status for authenticated users
                                if (!isOnline) {
                                  toast.error('لا يوجد اتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.', {
                                    style: { direction: 'rtl', textAlign: 'right' }
                                  })
                                  return
                                }
                                
                                const response = await safeFetch<{ success: boolean; message?: string; error?: string }>(
                                  '/api/user/favorites',
                                  {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ perfumeId: perfume.id, action })
                                  }
                                )
                                
                                if (response.success) {
                                  toast.success(action === 'add' ? 'تم الحفظ في المفضلة ♥️' : 'تم الحذف من المفضلة', {
                                    style: { direction: 'rtl', textAlign: 'right' }
                                  })
                                } else {
                                  // Revert optimistic update on error
                                  throw new Error(response.error || 'فشل العملية')
                                }
                              } catch (err) {
                                // Revert optimistic update on error
                                setFavoriteIds(prev => {
                                  const newSet = new Set(prev)
                                  if (action === 'add') {
                                    newSet.delete(perfume.id)
                                  } else {
                                    newSet.add(perfume.id)
                                  }
                                  return newSet
                                })
                                console.error('Error saving favorite:', err)
                                const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ'
                                toast.error(errorMessage, {
                                  style: { direction: 'rtl', textAlign: 'right' }
                                })
                              }
                            }}
                            className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 touch-manipulation ${
                              favoriteIds.has(perfume.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-white text-red-500 hover:bg-red-50'
                            }`}
                            aria-label={favoriteIds.has(perfume.id) ? `إزالة ${perfume.name} من المفضلة` : `إضافة ${perfume.name} إلى المفضلة`}
                          >
                            <Heart className={`w-5 h-5 ${favoriteIds.has(perfume.id) ? 'fill-current' : ''}`} />
                          </button>

                        {/* Share Button - Authenticated users only */}
                        {session && (
                          <div className="min-w-[44px] min-h-[44px]">
                            <ShareButton
                              title={perfume.name}
                              text={`${perfume.name} من ${perfume.brand} - تطابق ${perfume.finalScore}%`}
                              url={`${typeof window !== 'undefined' ? window.location.origin : ''}/perfume/${perfume.id}?from=results`}
                              variant="icon"
                            />
                          </div>
                        )}
                      </motion.div>

                      {/* Price Comparison Button - Results Page Only */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const searchQuery = encodeURIComponent(`${perfume.name} ${perfume.brand}`)
                          window.open(`https://www.google.com/search?q=${searchQuery}+price+buy`, '_blank')
                        }}
                        title="مقارنة الأسعار الخارجية"
                        className="absolute bottom-4 left-4 z-20 min-w-[44px] min-h-[44px] w-11 h-11 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 touch-manipulation"
                        aria-label={`قارن أسعار ${perfume.name}`}
                      >
                        <DollarSign className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* UpgradePrompt for Guests after limited results */}
                {filteredPerfumes.length > resultsToShow && userTier === 'GUEST' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                  >
                    <UpgradePrompt />
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="min-h-[44px] min-w-[44px] p-3 rounded-xl bg-white border border-brown-text/20 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 touch-manipulation"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                      السابق
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl font-medium transition-all touch-manipulation ${
                          currentPage === page
                            ? 'bg-primary text-white shadow-button'
                            : 'bg-white border border-brown-text/20 hover:shadow-md'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="min-h-[44px] min-w-[44px] p-3 rounded-xl bg-white border border-brown-text/20 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 touch-manipulation"
                    >
                      التالي
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
