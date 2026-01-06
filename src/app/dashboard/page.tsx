'use client'
import Image from 'next/image'
import { Suspense, useState, useMemo } from 'react'
import { StatsGrid, PerfumeGrid, FilterTabs } from '@/components/ui'
import { RadarChart } from '@/components/ui/RadarChart'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/contexts/QuizContext'
import { calculateScentProfile } from '@/lib/scent-analysis'
import { 
  getFavoritesPerfumes, 
  getDislikedPerfumes, 
  getWishlistPerfumes,
  defaultUserStats
} from '@/lib/data/perfumes'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('favorites')
  const { data: quizData } = useQuiz()

  // Calculate dynamic radar data from user's liked perfumes
  const dynamicRadarData = useMemo(() => {
    const likedIds = quizData.step1_liked || []
    return calculateScentProfile(likedIds)
  }, [quizData.step1_liked])

  const hasQuizData = quizData.step1_liked && quizData.step1_liked.length > 0

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

  const favoritesPerfumes = getFavoritesPerfumes()
  const dislikedPerfumes = getDislikedPerfumes()
  const wishlistPerfumes = getWishlistPerfumes()

  const tabs = [
    { id: 'favorites', label: '💜 المفضلة', icon: 'favorite', count: favoritesPerfumes.length },
    { id: 'disliked', label: '❌ المكروهة', icon: 'thumb_down', count: dislikedPerfumes.length },
    { id: 'wishlist', label: '💾 قائمة الرغبات', icon: 'bookmark', count: wishlistPerfumes.length }
  ]

  const getCurrentPerfumes = () => {
    switch (activeTab) {
      case 'favorites':
        return favoritesPerfumes
      case 'disliked':
        return dislikedPerfumes
      case 'wishlist':
        return wishlistPerfumes
      default:
        return favoritesPerfumes
    }
  }

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
            <h1 className="text-4xl font-bold mb-2 truncate">مرحباً {session.user?.name || 'مستخدم'}</h1>
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
                <h1 className="text-3xl font-bold text-brown-text leading-tight">لوحة التحكم</h1>
                <p className="text-brown-text/70">بصمتك العطرية مكتملة ✅</p>
              </div>
            </div>
            <div className="text-start">
              <div className="text-2xl font-bold text-safe-green mb-1">{defaultUserStats.totalMatches} تطابق</div>
              <div className="text-sm text-brown-text/60">عطور محفوظة</div>
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
            onTabChange={setActiveTab}
            className="mb-6"
          />

          {/* Tab Content */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-brown-text mb-6">
              {activeTab === 'favorites' && '💜 عطورك المفضلة'}
              {activeTab === 'disliked' && '❌ العطور المكروهة'}
              {activeTab === 'wishlist' && '💾 قائمة الرغبات'}
            </h2>
            <PerfumeGrid 
              perfumes={getCurrentPerfumes()} 
              columns={4}
              onPerfumeClick={(perfume) => {
                router.push(`/perfume/${perfume.id}`)
              }}
            />
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-cream-bg/50">
          <h2 className="text-xl sm:text-2xl font-bold text-brown-text mb-4 sm:mb-6 md:mb-8 text-center">بصمتك العطرية</h2>
          {!hasQuizData && (
            <p className="text-center text-brown-text/70 mb-4 sm:mb-6 text-base sm:text-lg px-4">
              قم بإجراء الاختبار لرؤية بصمتك العطرية الشخصية
            </p>
          )}
          <div className="flex justify-center px-2">
            <Suspense fallback={
              <div className="w-full max-w-[90vw] sm:max-w-[400px] aspect-square flex items-center justify-center">
                <LoadingSpinner size="md" />
              </div>
            }>
              <RadarChart data={dynamicRadarData} size={400} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
