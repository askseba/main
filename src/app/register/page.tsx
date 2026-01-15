'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CTAButton } from '@/components/ui/CTAButton'
import { safeFetch } from '@/lib/utils/api-helpers'
import { toast } from 'sonner'

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup function to clear any pending timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!email) {
      errors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!password) {
      errors.password = 'كلمة المرور مطلوبة'
    } else if (password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'كلمة المرور غير متطابقة'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn('google', { callbackUrl: '/dashboard', redirect: true })
    } catch (err) {
      console.error('[Register] Google sign-in error:', err)
      setError('حدث خطأ أثناء تسجيل الدخول بـ Google')
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setValidationErrors({})

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    try {
      // Register user via API
      const response = await safeFetch<{
        success: boolean
        message?: string
        error?: string
        user?: {
          id: string
          email: string
          name?: string | null
        }
      }>('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name: email.split('@')[0] // Use email prefix as default name
        })
      })

      if (response.success) {
        // Show success message
        toast.success('تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...', {
          duration: 3000
        })

        // Auto-login after registration
        const loginResult = await signIn('credentials', {
          email,
          password,
          redirect: false
        })

        if (loginResult?.ok) {
          router.push('/dashboard')
        } else {
          // If auto-login fails, redirect to login page
          router.push('/login?registered=true')
        }
      } else {
        setError(response.error || 'حدث خطأ أثناء إنشاء الحساب')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('[Register] Error:', err)
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.'
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-cream-bg flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-primary/10">
        <div className="text-center mb-8">
          {/* FIX: Brand consistency - Always "Ask Seba" */}
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gradient-start to-brand-gold bg-clip-text text-transparent mb-4">
            إنشاء حساب Ask Seba
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
            تسجيل بـ Google
          </CTAButton>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-brown/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-brand-brown/60">أو</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-brown mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setValidationErrors(prev => ({ ...prev, email: '' }))
                }}
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed ${
                  validationErrors.email ? 'border-red-300' : 'border-brand-brown/20'
                }`}
                placeholder="example@email.com"
                required
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-brown mb-2">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setValidationErrors(prev => ({ ...prev, password: '', confirmPassword: '' }))
                }}
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed ${
                  validationErrors.password ? 'border-red-300' : 'border-brand-brown/20'
                }`}
                placeholder="••••••••"
                required
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-brown mb-2">
                تأكيد كلمة المرور
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setValidationErrors(prev => ({ ...prev, confirmPassword: '' }))
                }}
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed ${
                  validationErrors.confirmPassword ? 'border-red-300' : 'border-brand-brown/20'
                }`}
                placeholder="••••••••"
                required
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            <CTAButton
              type="submit"
              disabled={isLoading}
              className="w-full"
              isLoading={isLoading}
            >
              إنشاء الحساب
            </CTAButton>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-brand-brown/70">
          لديك حساب؟{' '}
          <Link href="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  )
}
