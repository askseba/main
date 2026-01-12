'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, Suspense } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CTAButton } from '@/components/ui/CTAButton'

function LoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn('google', { callbackUrl, redirect: true })
    } catch (err) {
      console.error('[Login] Google sign-in error:', err)
      setError('حدث خطأ أثناء تسجيل الدخول بـ Google')
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
        setIsLoading(false)
      } else if (result?.ok) {
        router.push(callbackUrl)
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('[Login] Exception:', err)
      setError('حدث خطأ أثناء تسجيل الدخول')
      setIsLoading(false)
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F2F0EB] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-primary/10">
        <div className="text-center mb-8">
          {/* FIX: Brand consistency - Always "Ask Seba" */}
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#2f6f73] to-[#c0841a] bg-clip-text text-transparent mb-4">
            تسجيل الدخول Ask Seba
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <CTAButton
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full"
            isLoading={isLoading}
          >
            <svg className="w-5 h-5 me-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            دخول بـ Google
          </CTAButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#5B4233]/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#5B4233]/60">أو</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5B4233] mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-[#5B4233]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-[#5B4233] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#5B4233] mb-2">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-[#5B4233]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-[#5B4233] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
                required
              />
            </div>

            <CTAButton
              type="submit"
              disabled={isLoading}
              className="w-full"
              isLoading={isLoading}
            >
              دخول
            </CTAButton>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[#5B4233]/70">
          لا تملك حساباً؟{' '}
          <Link href="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F2F0EB] flex items-center justify-center">
        <LoadingSpinner message="جاري التحميل..." />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
