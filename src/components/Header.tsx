'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { User, Heart, LogOut, Menu, X } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useFavorites } from '@/hooks/useFavorites'
import { useQuiz } from '@/contexts/QuizContext'
import { clearAllUserData } from '@/lib/clear-user-data'
import { useCrossTabLogout } from '@/hooks/useCrossTabLogout'

export function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { favorites } = useFavorites()
  const { clearQuiz } = useQuiz()
  const { broadcastLogout } = useCrossTabLogout()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleFavoritesClick = () => {
    if (status === 'loading') return

    if (status === 'authenticated') {
      // Logged-in: Navigate to dashboard
      router.push('/dashboard')
    } else {
      // Guest: Redirect to login with dashboard callback
      router.push('/login?callbackUrl=/dashboard')
    }
  }

  // Check if user has favorites (works for both guest and authenticated)
  const hasFavorites = favorites.length > 0

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-brown-text/20 shadow-lg"
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Start (Right) - User Actions */}
        <div className="flex items-center gap-2">
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors"
            aria-label="فتح القائمة"
          >
            <Menu className="w-6 h-6 text-brown-text" />
          </button>

          {/* User Icon Dropdown - THIRD in tab order (Desktop Only) */}
          <div className="hidden md:block">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  tabIndex={3}
                  className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="قائمة المستخدم"
                  aria-haspopup="true"
                >
                  <User className="w-5 h-5 text-brown-text" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <div dir="rtl">
                  <DropdownMenu.Content
                    align="start"
                    side="bottom"
                    sideOffset={8}
                    className="min-w-[200px] bg-white rounded-2xl shadow-2xl border border-brown-text/10 p-2 z-50"
                  >
                  {session ? (
                    <>
                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-right text-brown-text hover:bg-primary/10 cursor-pointer outline-none focus:bg-primary/10"
                        onSelect={() => router.push('/profile')}
                      >
                        <User className="w-5 h-5" />
                        <span>الملف الشخصي</span>
                      </DropdownMenu.Item>

                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-right text-brown-text hover:bg-primary/10 cursor-pointer outline-none focus:bg-primary/10"
                        onSelect={() => router.push('/dashboard')}
                      >
                        <Heart className="w-5 h-5" />
                        <span>المفضلة</span>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="h-px bg-brown-text/10 my-2" />

                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-right text-red-600 hover:bg-red-50 cursor-pointer outline-none focus:bg-red-50"
                        onSelect={async () => {
                          // Clear all user data before signOut
                          clearQuiz()
                          clearAllUserData()
                          // أرسل إشارة للتبويبات الأخرى
                          broadcastLogout()
                          await signOut({ callbackUrl: '/' })
                        }}
                      >
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                      </DropdownMenu.Item>
                    </>
                  ) : (
                    <>
                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-right text-brown-text hover:bg-primary/10 cursor-pointer outline-none focus:bg-primary/10"
                        onSelect={() => router.push('/login')}
                      >
                        <User className="w-5 h-5" />
                        <span>الدخول</span>
                      </DropdownMenu.Item>

                      <DropdownMenu.Item
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-right text-brown-text hover:bg-primary/10 cursor-pointer outline-none focus:bg-primary/10"
                        onSelect={() => router.push('/register')}
                      >
                        <User className="w-5 h-5" />
                        <span>التسجيل</span>
                      </DropdownMenu.Item>
                    </>
                  )}
                  </DropdownMenu.Content>
                </div>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>

          {/* Favorites Icon Button - SECOND in tab order */}
          <button
            tabIndex={2}
            onClick={handleFavoritesClick}
            disabled={status === 'loading'}
            className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 relative"
            aria-label={status === 'authenticated' ? 'المفضلة' : 'تسجيل الدخول للمفضلة'}
            aria-describedby={status === 'unauthenticated' ? 'login-required' : undefined}
          >
            <Heart
              className={`w-5 h-5 text-brown-text ${
                hasFavorites ? 'fill-red-500 text-red-500' : ''
              }`}
            />

            {/* Indicator for user with favorites */}
            {hasFavorites && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}

            {status === 'unauthenticated' && (
              <span id="login-required" className="sr-only">
                يتطلب تسجيل الدخول
              </span>
            )}
          </button>
        </div>

        {/* End (Left) - Logo - FIRST in tab order */}
        <Link
          href="/"
          tabIndex={1}
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg hover:opacity-80 transition-opacity"
          aria-label="الصفحة الرئيسية"
        >
          <span className="font-serif italic text-2xl font-black text-primary">
            Ask Seba
          </span>
        </Link>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide Menu */}
      <div 
        className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl md:hidden z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-brown-text/10">
          <h2 className="text-lg font-semibold text-brown-text">القائمة</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5 text-brown-text" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {session?.user ? (
            <>
              {/* Profile Link */}
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <User className="w-5 h-5 text-brown-text" />
                <span className="text-brown-text font-medium">الملف الشخصي</span>
              </Link>

              {/* Favorites Link */}
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Heart className="w-5 h-5 text-brown-text" />
                <span className="text-brown-text font-medium">المفضلة</span>
              </Link>

              {/* Divider */}
              <div className="my-2 border-t border-brown-text/10" />

              {/* Logout Button */}
              <button
                onClick={async () => {
                  setMobileMenuOpen(false)
                  // Clear all user data before signOut
                  clearQuiz()
                  clearAllUserData()
                  // أرسل إشارة للتبويبات الأخرى
                  broadcastLogout()
                  await signOut({ callbackUrl: '/' })
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-right"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">تسجيل الخروج</span>
              </button>
            </>
          ) : (
            <>
              {/* Login Link */}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <User className="w-5 h-5 text-brown-text" />
                <span className="text-brown-text font-medium">تسجيل الدخول</span>
              </Link>

              {/* Register Link */}
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <span className="text-primary font-semibold">إنشاء حساب</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
