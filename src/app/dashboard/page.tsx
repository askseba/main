'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense, useState, useMemo, useEffect, useCallback } from 'react'
import { StatsGrid, PerfumeGrid, FilterTabs, Badge } from '@/components/ui'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Heart, ThumbsDown, Bookmark, Sparkles } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/contexts/QuizContext'
import { calculateScentProfile } from '@/lib/scent-analysis'
import { migrateGuestFavorites } from '@/lib/migrate-favorites'
import { getStorageJSON } from '@/lib/utils/storage'
import { safeFetch, validateArray } from '@/lib/utils/api-helpers'
import { toast } from 'sonner'
import { 
  perfumes,
  getDislikedPerfumes, 
  getWishlistPerfumes,
  defaultUserStats,
  type Perfume
} from '@/lib/data/perfumes'

// Lazy load RadarChart - heavy component with animations
const RadarChart = dynamic(
  () => import('@/components/ui/RadarChart').then(mod => ({ default: mod.RadarChart })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[90vw] sm:max-w-[400px] aspect-square flex items-center justify-center">
        <LoadingSpinner size="md" />
      </div>
    )
  }
)

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('favorites')
  const { data: quizData } = useQuiz()
  const [favorites, setFavorites] = useState<Perfume[]>([])
  const [isMigrating, setIsMigrating] = useState(false)

  // Calculate dynamic radar data from user's liked perfumes
  const dynamicRadarData = useMemo(() => {
    const likedIds = quizData.step1_liked || []
    return calculateScentProfile(likedIds)
  }, [quizData.step1_liked])

  const hasQuizData = useMemo(() => {
    return quizData.step1_liked && quizData.step1_liked.length > 0
  }, [quizData.step1_liked])

  // Memoize disliked and wishlist perfumes to prevent recalculation on every render
  const dislikedPerfumes = useMemo(() => getDislikedPerfumes(), [])
  const wishlistPerfumes = useMemo(() => getWishlistPerfumes(), [])

  // Load favorites function
  const loadFavorites = useCallback(async () => {
    if (session?.user?.id) {
      try {
        // 1. Migrate guest favorites first and wait for completion
        setIsMigrating(true)
        await migrateGuestFavorites(session.user.id)
        
        // 2. Then fetch from API after migration is complete
        const response = await safeFetch<{ success: boolean; data?: string[]; error?: string }>('/api/user/favorites')
        
        if (!response.success || !response.data) {
          throw new Error(response.error || 'فشل تحميل المفضلات')
        }
        
        const ids = validateArray<string>(response.data, 'المفضلات يجب أن تكون مصفوفة')
        const favPerfumes = perfumes.filter(p => ids.includes(p.id))
        setFavorites(favPerfumes)
      } catch (err) {
        console.error('Error loading favorites:', err)
        // Still try to fetch favorites even if migration fails
        try {
          const response = await safeFetch<{ success: boolean; data?: string[]; error?: string }>('/api/user/favorites')
          
          if (response.success && response.data) {
            const ids = validateArray<string>(response.data, 'المفضلات يجب أن تكون مصفوفة')
            const favPerfumes = perfumes.filter(p => ids.includes(p.id))
            setFavorites(favPerfumes)
          } else {
            toast.error(response.error || 'فشل تحميل المفضلات')
          }
        } catch (fetchErr) {
          console.error('Error fetching favorites after migration failure:', fetchErr)
          const errorMessage = fetchErr instanceof Error ? fetchErr.message : 'فشل تحميل المفضلات'
          toast.error(errorMessage)
        }
      } finally {
        setIsMigrating(false)
      }
    } else {
      // Guest: load from localStorage
      const guestFavs = getStorageJSON<string[]>('guestFavorites', [])
      const favPerfumes = perfumes.filter(p => guestFavs.includes(p.id))
      setFavorites(favPerfumes)
    }
  }, [session?.user?.id])

  // Load favorites from DB on mount
  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  // Listen to BroadcastChannel for cross-tab synchronization
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return

    const channel = new BroadcastChannel('favorites-sync')
    
    const handleMessage = (event: MessageEvent<{ type: string; userId?: string; favorites?: string[] }>) => {
      const message = event.data
      
      // Only handle favorites-updated messages
      if (message.type !== 'favorites-updated' || !message.favorites) return
      
      // For authenticated users, only sync if it's for the same user
      if (session?.user?.id) {
        if (message.userId && message.userId !== session.user.id) return
        
        // Update favorites from other tabs
        const favPerfumes = perfumes.filter(p => message.favorites!.includes(p.id))
        setFavorites(favPerfumes)
      } else {
        // For guest users, update from localStorage changes
        const favPerfumes = perfumes.filter(p => message.favorites!.includes(p.id))
        setFavorites(favPerfumes)
      }
    }
    
    channel.addEventListener('message', handleMessage)
    
    // Also listen to storage events as fallback
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'guestFavorites' && e.newValue && !session?.user?.id) {
        try {
          const guestFavs = JSON.parse(e.newValue)
          if (Array.isArray(guestFavs)) {
            const favPerfumes = perfumes.filter(p => guestFavs.includes(p.id))
            setFavorites(favPerfumes)
          }
        } catch (err) {
          console.error('Error parsing storage event:', err)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      channel.removeEventListener('message', handleMessage)
      channel.close()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [session?.user?.id, loadFavorites])

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    router.push('/login?callbackUrl=/dashboard')
    return (
      <div className="min-h-screen bg-cream-bg/50 flex items-center justify-center">
        <LoadingSpinner message="جاري التحويل..." />
      </div>
    )
  }

  // Show loading while checking session
  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-cream-bg/50 flex items-center justify-center">
        <LoadingSpinner message="جاري التحميل..." />
      </div>
    )
  }

  // Memoize tabs array to prevent recreation on every render
  const tabs = useMemo(() => [
    { id: 'favorites', label: '💜 المفضلة', icon: 'favorite', count: favorites.length },
    { id: 'disliked', label: '❌ المكروهة', icon: 'thumb_down', count: dislikedPerfumes.length },
    { id: 'wishlist', label: '💾 قائمة الرغبات', icon: 'bookmark', count: wishlistPerfumes.length }
  ], [favorites.length, dislikedPerfumes.length, wishlistPerfumes.length])

  // Memoize current perfumes based on active tab to prevent recalculation
  const currentPerfumes = useMemo(() => {
    switch (activeTab) {
      case 'favorites':
        return favorites
      case 'disliked':
        return dislikedPerfumes
      case 'wishlist':
        return wishlistPerfumes
      default:
        return favorites
    }
  }, [activeTab, favorites, dislikedPerfumes, wishlistPerfumes])

  // Memoize tab change handler to prevent recreation
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
  }, [])

  // Memoize perfume click handler to prevent recreation
  const handlePerfumeClick = useCallback((perfume: Perfume) => {
    router.push(`/perfume/${perfume.id}`)
  }, [router])

  // Memoize empty state handlers
  const handleStartQuiz = useCallback(() => {
    router.push('/quiz/step1-favorites')
  }, [router])

  const handleBrowsePerfumes = useCallback(() => {
    router.push('/results')
  }, [router])

  return (
    <div className="min-h-screen bg-cream-bg/50" dir="rtl">
      {/* Hero Header with User Info */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-b-3xl shadow-2xl mb-8">
        <div className="max-w-6xl mx-auto flex items-center gap-6 flex-wrap">
          {session.user?.image ? (
            <div className="relative w-20 h-20 rounded-full ring-4 ring-white/50 shadow-lg overflow-hidden">
              <Image 
                src={session.user.image} 
                alt={`صورة الملف الشخصي لـ ${session.user.name || 'المستخدم'}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full ring-4 ring-white/50 shadow-lg bg-white/20 flex items-center justify-center text-3xl font-bold">
              {(session.user?.name || 'U')[0].toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 truncate">مرحباً {session.user?.name || 'مستخدم'}</h1>
            <p className="opacity-90 text-lg truncate">{session.user?.email}</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-8 px-6 pb-12">
        {/* Header Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-cream-bg/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-safe-green to-emerald-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-brown-text leading-tight">لوحة التحكم</h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-brown-text/85">بصمتك العطرية مكتملة ✅</p>
                  {!session?.user?.statsVerified && (
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-800 border-amber-200">
                      أرقام تجريبية
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-start">
              <div className="text-2xl font-bold text-safe-green mb-1">{defaultUserStats.totalMatches} تطابق</div>
              <div className="text-sm text-brown-text/75">عطور محفوظة</div>
            </div>
          </div>
          <StatsGrid stats={[
            { label: 'عمليات البحث', value: defaultUserStats.searches, icon: 'search' },
            { label: 'محفوظات', value: defaultUserStats.savedPerfumes, icon: 'bookmark' },
            { label: 'تطابقات', value: defaultUserStats.totalMatches, icon: 'favorite' },
            { label: 'عينات مطلوبة', value: defaultUserStats.samples, icon: 'science' }
          ]} />
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-cream-bg/50">
          <FilterTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className="mb-6"
          />

          {/* Tab Content */}
          <div className="mt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-brown-text mb-6">
              {activeTab === 'favorites' && '💜 عطورك المفضلة'}
              {activeTab === 'disliked' && '❌ العطور المكروهة'}
              {activeTab === 'wishlist' && '💾 قائمة الرغبات'}
            </h2>
            {isMigrating && activeTab === 'favorites' ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner message="جاري نقل مفضلاتك..." />
              </div>
            ) : currentPerfumes.length === 0 ? (
              <EmptyState
                icon={
                  activeTab === 'favorites' ? (
                    <Heart className="w-24 h-24 mx-auto text-red-400" strokeWidth={1.5} />
                  ) : activeTab === 'disliked' ? (
                    <ThumbsDown className="w-24 h-24 mx-auto text-gray-400" strokeWidth={1.5} />
                  ) : (
                    <Bookmark className="w-24 h-24 mx-auto text-amber-400" strokeWidth={1.5} />
                  )
                }
                title={
                  activeTab === 'favorites' 
                    ? 'لا توجد عطور مفضلة بعد'
                    : activeTab === 'disliked'
                    ? 'لا توجد عطور مكروهة'
                    : 'قائمة الرغبات فارغة'
                }
                description={
                  activeTab === 'favorites'
                    ? 'ابدأ رحلتك في اكتشاف العطور المثالية لك! قم بإجراء الاختبار أو تصفح مجموعتنا الواسعة من العطور.'
                    : activeTab === 'disliked'
                    ? 'لم تحدد أي عطور مكروهة بعد. قم بإجراء الاختبار لتحديد العطور التي لا تناسبك.'
                    : 'احفظ العطور التي تريد تجربتها لاحقاً. تصفح مجموعتنا وابدأ في بناء قائمة رغباتك!'
                }
                ctaLabel={
                  activeTab === 'favorites'
                    ? 'ابدأ الاختبار الآن'
                    : activeTab === 'disliked'
                    ? 'ابدأ الاختبار الآن'
                    : 'تصفح العطور'
                }
                ctaOnClick={
                  activeTab === 'favorites' || activeTab === 'disliked'
                    ? handleStartQuiz
                    : handleBrowsePerfumes
                }
              />
            ) : (
              <PerfumeGrid 
                perfumes={currentPerfumes} 
                columns={4}
                onPerfumeClick={handlePerfumeClick}
              />
            )}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-cream-bg/50">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-text mb-4 sm:mb-6 md:mb-8 text-center">بصمتك العطرية</h2>
          {!hasQuizData && (
            <p className="text-center text-brown-text/85 mb-4 sm:mb-6 text-base sm:text-lg px-4">
              قم بإجراء الاختبار لرؤية بصمتك العطرية الشخصية
            </p>
          )}
          <div className="flex justify-center px-2">
            <RadarChart data={dynamicRadarData} size={400} />
          </div>
        </div>
      </div>
    </div>
  )
}
