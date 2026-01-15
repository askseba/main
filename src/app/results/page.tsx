"use client"
import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronLeft, ChevronRight, Sparkles, DollarSign, Heart } from 'lucide-react'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { CTAButton } from '@/components/ui/CTAButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { useQuiz } from '@/contexts/QuizContext'
import { useSession } from 'next-auth/react'
import { formatPerfumeResultsTitle } from '@/lib/utils/arabicPlural'
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
  const [sortBy, setSortBy] = useState<'match' | 'price-low' | 'price-high' | 'rating'>('match')
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

  // Client-side filtering (search, price, etc.)
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

    // Price filter
    if (filters.maxPrice < 5000) {
      result = result.filter(perfume => 
        (perfume.price ?? 0) <= filters.maxPrice
      )
    }

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

    // Sort
    switch (sortBy) {
      case 'match':
        result.sort((a, b) => b.finalScore - a.finalScore)
        break
      case 'price-low':
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        break
      case 'price-high':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        break
      case 'rating':
        result.sort((a, b) => b.finalScore - a.finalScore)
        break
    }

    return result
  }, [scoredPerfumes, searchQuery, filters, sortBy])

  const totalPages = Math.ceil(filteredPerfumes.length / itemsPerPage)
  const paginatedPerfumes = filteredPerfumes.slice(
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
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-tajawal-bold text-4xl md:text-5xl text-brown-text mb-4">
            نتائج التوافق ({filteredPerfumes.length})
          </h1>
          <p className="text-xl text-brown-text/85 mb-2">
            {filteredPerfumes.length === 0 
              ? "لا توجد نتائج مطابقة" 
              : `تم العثور على ${formatPerfumeResultsTitle(filteredPerfumes.length)}`
            }
          </p>
          
          {/* Personalization indicator */}
          {hasPreferences && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mt-4"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">نتائج مخصّصة بناءً على ذوقك العطري</span>
            </motion.div>
          )}
          
          {/* User Scent DNA */}
          {userScentDNA.length > 0 && (
            <div className="mt-4 text-sm text-brown-text/75">
              <span>الحمض النووي العطري: </span>
              <span className="text-primary font-medium">
                {[...new Set(userScentDNA)].slice(0, 5).join(' • ')}
              </span>
            </div>
          )}

          {/* Enhanced conditional UX: Guest CTA */}
          {!session && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-200/50 backdrop-blur-sm rounded-2xl p-6 text-center mb-8"
            >
              <div className="flex flex-col items-center gap-4">
                <Heart className="w-12 h-12 text-rose-400" />
                <div>
                  <h3 className="text-xl font-bold text-rose-800 mb-2">
                    سجّل لحفظ اقتراحاتك ♥️
                  </h3>
                  <p className="text-rose-600 mb-4">
                    احفظ مفضلاتك واحصل على توصيات شخصية
                  </p>
                </div>
                <Link href={`/login?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '/results')}`}>
                  <CTAButton variant="primary" size="sm" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                    ابدأ الآن مجاناً
                  </CTAButton>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-text/50 w-5 h-5" />
              <input
                type="search"
                inputMode="search"
                autoComplete="off"
                aria-label="ابحث عن العطور بالاسم أو العلامة التجارية"
                placeholder="ابحث بالاسم أو العلامة التجارية..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pe-12 ps-4 py-4 rounded-2xl border-2 border-brown-text/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as 'match' | 'price-low' | 'price-high' | 'rating')
                setCurrentPage(1)
              }}
              className="px-6 py-4 rounded-2xl border-2 border-brown-text/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white min-w-[160px]"
            >
              <option value="match">أعلى تطابق</option>
              <option value="price-low">السعر: صاعد</option>
              <option value="price-high">السعر: هابط</option>
              <option value="rating">التقييم</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden min-h-[44px] min-w-[44px] p-4 bg-white border-2 border-brown-text/20 rounded-2xl hover:shadow-md flex items-center gap-2 touch-manipulation"
          >
            <Filter className="w-5 h-5" />
            فلاتر
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop Static */}
          <div className="hidden lg:block lg:w-[35%] lg:min-w-[320px] order-last lg:order-first">
            <div className="sticky top-4 bg-white rounded-2xl border-2 border-brown-text/20 p-6 shadow-md">
              <h2 className="font-tajawal-bold text-3xl md:text-4xl text-brown-text mb-6">تصفية النتائج</h2>
              
              {/* Match Percentage */}
              <div className="mb-6">
                <label className="block text-brown-text font-medium mb-3 flex justify-between">
                  <span>نسبة التوافق</span>
                  <span className="text-primary">{filters.matchPercentage}% +</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.matchPercentage}
                  onChange={(e) => setFilters({ ...filters, matchPercentage: Number(e.target.value) })}
                  className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-tajawal-bold text-2xl md:text-3xl text-brown-text mb-3">السعر</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-cream-bg px-3 py-2 rounded-lg border border-brown-text/10 text-center flex-1">
                    {filters.maxPrice} ر.س
                  </div>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

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
