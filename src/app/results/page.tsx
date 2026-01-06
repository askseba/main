"use client"
import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { MobileFilterModal } from '@/components/ui/MobileFilterModal'
import { CTAButton } from '@/components/ui/CTAButton'
import { perfumes } from '@/lib/data/perfumes'
import { useQuiz } from '@/contexts/QuizContext'
import { formatPerfumeResultsTitle } from '@/lib/utils/arabicPlural'

interface FilterState {
  minMatch: number
  maxPrice: number
  family: string
  safeOnly: boolean
}

export default function ResultsPage() {
  const { data: quizData } = useQuiz()
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    minMatch: 0,
    maxPrice: 500,
    family: 'all',
    safeOnly: false,
  })
  const [sortBy, setSortBy] = useState<'match' | 'price-low' | 'price-high' | 'rating'>('match')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const itemsPerPage = 12

  // Personalized Filter + Sort Logic
  const personalizedPerfumes = useMemo(() => {
    // Map allergy ingredient IDs to Arabic names for matching
    const allergyIngredientMap: Record<string, string[]> = {
      'jasmine': ['ياسمين', 'jasmine'],
      'rose': ['ورد', 'rose'],
      'oud': ['عود', 'oud'],
      'sandalwood': ['صندل', 'sandalwood'],
      'vanilla': ['فانيليا', 'vanilla'],
      'musk': ['مسك', 'musk'],
      'amber': ['عنبر', 'amber'],
      'patchouli': ['باتشولي', 'patchouli'],
      'lavender': ['لافندر', 'lavender'],
      'bergamot': ['برغموت', 'bergamot'],
      'pepper': ['فلفل', 'pepper'],
      'leather': ['جلد', 'leather']
    }
    const result = perfumes
      .map(perfume => {
        // Calculate personalized match percentage
        let personalizedMatch = perfume.matchPercentage ?? perfume.score ?? 0
        
        // Boost liked perfumes (+20%)
        if (quizData.step1_liked.includes(perfume.id)) {
          personalizedMatch = Math.min(100, personalizedMatch + 20)
        }

        return {
          ...perfume,
          personalizedMatch,
          originalMatch: perfume.matchPercentage ?? perfume.score ?? 0
        }
      })
      .filter(perfume => {
        // Exclude disliked perfumes
        if (quizData.step2_disliked.includes(perfume.id)) {
          return false
        }

        // Filter by allergy ingredients (check description)
        const description = (perfume.description || '').toLowerCase()
        const hasAllergyIngredient = quizData.step3_allergy.ingredients.some(ingId => {
          const searchTerms = allergyIngredientMap[ingId] || [ingId]
          return searchTerms.some(term => description.includes(term.toLowerCase()))
        })
        
        if (hasAllergyIngredient) {
          return false
        }

        // Search filter
        const matchesSearch = 
          perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          perfume.brand.toLowerCase().includes(searchQuery.toLowerCase())
        
        if (!matchesSearch) return false

        // Other filters
        const matchesFilters = 
          perfume.personalizedMatch >= filters.minMatch &&
          (perfume.price ?? Infinity) <= filters.maxPrice &&
          (!filters.safeOnly || perfume.isSafe)

        return matchesFilters
      })

    // Sort
    switch (sortBy) {
      case 'match':
        result.sort((a, b) => b.personalizedMatch - a.personalizedMatch)
        break
      case 'price-low':
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        break
      case 'price-high':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
        break
      case 'rating':
        result.sort((a, b) => b.personalizedMatch - a.personalizedMatch)
        break
    }

    return result
  }, [searchQuery, filters, sortBy, quizData])

  const filteredPerfumes = personalizedPerfumes

  const totalPages = Math.ceil(filteredPerfumes.length / itemsPerPage)
  const paginatedPerfumes = filteredPerfumes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleFilterApply = (filterData: {
    matchPercentage: number
    safeOnly: boolean
    families: string[]
    priceRange: [number, number]
  }) => {
    setFilters({
      minMatch: filterData.matchPercentage,
      maxPrice: filterData.priceRange[1],
      family: 'all',
      safeOnly: filterData.safeOnly,
    })
    setCurrentPage(1)
  }

  // Loading state for filters
  useEffect(() => {
    setIsFiltering(true)
    const timer = setTimeout(() => {
      setIsFiltering(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [filters, sortBy, searchQuery, currentPage])

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
            نتائج البحث ({filteredPerfumes.length})
          </h1>
          <p className="text-xl text-brown-text/70 mb-2">
            {filteredPerfumes.length === 0 
              ? "لا توجد نتائج مطابقة" 
              : `تم العثور على ${formatPerfumeResultsTitle(filteredPerfumes.length)}`
            }
          </p>
          {(quizData.step1_liked.length > 0 || quizData.step2_disliked.length > 0 || quizData.step3_allergy.ingredients.length > 0) && (
            <p className="text-lg text-primary font-medium">
              ✨ نتائج مخصّصة بناءً على إجاباتك
            </p>
          )}
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-text/50 w-5 h-5" />
              <input
                type="text"
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
            className="lg:hidden p-4 bg-white border-2 border-brown-text/20 rounded-2xl hover:shadow-md flex items-center gap-2"
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
              <h2 className="font-tajawal-bold text-2xl text-brown-text mb-6">تصفية النتائج</h2>
              
              {/* Match Percentage */}
              <div className="mb-6">
                <label className="block text-brown-text font-medium mb-3 flex justify-between">
                  <span>نسبة التوافق</span>
                  <span className="text-primary">{filters.minMatch}% +</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.minMatch}
                  onChange={(e) => setFilters({ ...filters, minMatch: Number(e.target.value) })}
                  className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Safe Only */}
              <div className="mb-6 flex items-center justify-between py-2 border-b border-brown-text/10">
                <span className="text-brown-text font-medium">آمن للبشرة الحساسة</span>
                <input
                  type="checkbox"
                  checked={filters.safeOnly}
                  onChange={(e) => setFilters({ ...filters, safeOnly: e.target.checked })}
                  className="w-5 h-5 rounded border-brown-text/20 text-primary focus:ring-primary"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-tajawal-bold text-brown-text mb-3">السعر</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-cream-bg px-3 py-2 rounded-lg border border-brown-text/10 text-center flex-1">
                    {filters.maxPrice} ر.س
                  </div>
                </div>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <CTAButton
                variant="primary"
                onClick={() => setCurrentPage(1)}
                className="w-full"
              >
                تطبيق الفلاتر
              </CTAButton>
            </div>
          </div>

          {/* Mobile Filter Modal */}
          <MobileFilterModal 
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={(filterData) => {
              handleFilterApply(filterData)
              setIsFilterOpen(false)
            }}
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
                <h3 className="text-2xl font-tajawal-bold text-brown-text mb-4">
                  لا توجد نتائج
                </h3>
                <p className="text-lg text-brown-text/60 mb-8 max-w-md mx-auto">
                  حاول تعديل الفلاتر أو كلمات البحث
                </p>
                <CTAButton 
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({ minMatch: 0, maxPrice: 500, family: 'all', safeOnly: false })
                    setCurrentPage(1)
                  }}
                >
                  إعادة تعيين الفلاتر
                </CTAButton>
              </motion.div>
            ) : (
              <>
                {/* Results Grid */}
                {isFiltering ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="aspect-square bg-gray-200 rounded-lg" />
                        <div className="h-4 bg-gray-200 rounded mt-4 w-3/4" />
                        <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {paginatedPerfumes.map((perfume, index) => (
                      <motion.div
                        key={perfume.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <PerfumeCard 
                          variant={perfume.variant}
                          title={perfume.name}
                          brand={perfume.brand}
                          matchPercentage={perfume.personalizedMatch ?? perfume.matchPercentage ?? perfume.score ?? 0}
                          imageUrl={perfume.image}
                          description={perfume.description}
                          isSafe={perfume.isSafe}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-3 rounded-xl bg-white border border-brown-text/20 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                      السابق
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
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
                      className="p-3 rounded-xl bg-white border border-brown-text/20 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
