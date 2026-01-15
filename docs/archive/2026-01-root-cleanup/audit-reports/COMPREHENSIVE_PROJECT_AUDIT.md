# Comprehensive Project Audit Report
**Date:** January 2025  
**Project:** Ask Seba - Perfume Recommendation App  
**Framework:** Next.js 16.1.1 (App Router) + NextAuth.js v5

---

## Phase 1: Authentication Flow Mapping

### 1.1 Login Page Entry Point

**File Path:** `src/app/login/page.tsx`

**Route:** `/login`

**Full Component Code:**
```typescript
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
      {/* ... UI code ... */}
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
```

**Key Authentication Logic:**
- **Line 22:** Google OAuth sign-in: `await signIn('google', { callbackUrl, redirect: true })`
- **Lines 42-46:** Credentials sign-in: `await signIn('credentials', { email, password, redirect: false })`
- **Line 52:** Redirect after successful login: `router.push(callbackUrl)`
- **Line 12:** Default callback URL: `callbackUrl || '/dashboard'`

**Outgoing Links:**
- **Line 151:** Link to `/register`: `<Link href="/register">إنشاء حساب جديد</Link>`

---

### 1.2 Register Page Entry Point

**File Path:** `src/app/register/page.tsx`

**Route:** `/register`

**Full Component Code:**
```typescript
'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CTAButton } from '@/components/ui/CTAButton'

export default function Register() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

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

    // Demo only - show message that registration will be activated soon
    setTimeout(() => {
      setError('سيتم تفعيل إنشاء الحساب قريبًا. حالياً يمكنك استخدام حساب تجريبي: demo@askseba.com / 123456')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F2F0EB] flex items-center justify-center p-4">
      {/* ... UI code ... */}
    </div>
  )
}
```

**Key Authentication Logic:**
- **Line 47:** Google OAuth sign-in: `await signIn('google', { callbackUrl: '/dashboard', redirect: true })`
- **Lines 67-70:** Registration form is NOT functional (demo mode) - shows error message

**Outgoing Links:**
- **Line 200:** Link to `/login`: `<Link href="/login">تسجيل الدخول</Link>`

---

### 1.3 Authentication Configuration

**File Path:** `src/auth.ts`

**Full Configuration:**
```typescript
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      credentials: {
        email: { label: 'البريد الإلكتروني', type: 'email' },
        password: { label: 'كلمة المرور', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Demo credentials
        if (email === 'demo@askseba.com' && password === '123456') {
          return { 
            id: 'demo-user',
            name: 'مستخدم تجريبي', 
            email: 'demo@askseba.com',
            image: '/demo-avatar.png'
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { 
    strategy: 'jwt' 
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.bio = user.bio
      }
      if (trigger === 'update' && session) {
        token.bio = session.bio || token.bio
        token.image = session.image || token.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.bio = token.bio as string | undefined
        session.user.image = token.image as string | undefined
      }
      return session
    }
  }
})
```

**Session Management:**
- **Line 59:** Session strategy: `'jwt'`
- **Lines 62-76:** JWT callback handles user data and session updates
- **Lines 77-84:** Session callback extends session object with user data

**API Route:** `src/app/api/auth/[...nextauth]/route.ts`
```typescript
import { handlers } from '@/auth'
export const { GET, POST } = handlers
```

---

### 1.4 Session Provider

**File Path:** `src/components/SessionProvider.tsx`

```typescript
'use client'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
```

**Usage in Root Layout:** `src/app/layout.tsx` (Lines 91-92)
```typescript
<SessionProvider>
  <QuizProvider>
    {children}
    {/* ... */}
  </QuizProvider>
</SessionProvider>
```

---

### 1.5 User Icon & Dropdown Analysis

**CRITICAL FINDING:** There is **NO visible header/navigation component** with a user icon or dropdown menu in the application.

**Evidence:**
- No Header.tsx or Navigation.tsx component found in `src/components/`
- No global navigation bar visible in `src/app/layout.tsx`
- Users access profile directly via URL (`/profile`) - no navigation UI to get there

**Session Usage Pattern:**
- Pages use `useSession()` hook directly from `next-auth/react`
- Profile page (`/profile`) is the main user-facing page (not accessible via header navigation)

---

### 1.6 Redirect Logic After Login/Logout

**After Successful Login:**
- **Login page (line 52):** `router.push(callbackUrl)` - defaults to `/dashboard` if no callbackUrl
- **Google OAuth (line 22):** `signIn('google', { callbackUrl, redirect: true })` - NextAuth handles redirect

**After Logout:**
- **Profile page (lines 211-212):** 
  ```typescript
  await signOut({ callbackUrl: '/' });
  router.push('/');
  ```

**Protected Route Redirects:**
- **Dashboard (line 56):** `router.push('/login?callbackUrl=/dashboard')`
- **Settings (line 15):** `router.push('/login?callbackUrl=/settings')`
- **Notifications (line 15):** `router.push('/login?callbackUrl=/notifications')`

---

## Phase 2: Core Pages Audit

### 2.1 Profile Page (`/profile`)

**File Path:** `src/app/profile/page.tsx`

**Route:** `/profile`

**Data Source:**
- Session data from NextAuth: `useSession()` hook (line 25)
- User data: `session?.user?.name`, `session?.user?.bio`, `session?.user?.image`
- No external data file - all user data comes from session

**Component Dependencies:**
- `next-auth/react`: `useSession`, `signOut`
- `next/navigation`: `useRouter`
- `lucide-react`: Icons (User, Heart, Sparkles, ShieldCheck, HelpCircle, MessageCircle, ChevronLeft, LogOut, Camera, Image)
- `framer-motion`: `motion`, `AnimatePresence`
- `next/image`: `Image`
- `@/lib/utils`: `cn`

**Outgoing Links:**
- **Line 39:** `/about` - قصتنا (عن صبا)
- **Line 40:** `/faq` - تساؤلات تهمك
- **Line 41:** `/privacy` - الخصوصية والأمان
- **Lines 210-212:** Logout redirects to `/`

**Key Functionality:**
- **Lines 48-97:** Image upload handler (avatar)
- **Lines 99-103:** Contact email handler (`openEmail()` function)
- **Lines 210-212:** Logout handler

**Contact Us Implementation (Lines 196-205):**
```typescript
<button
  onClick={openEmail}
  className="w-full bg-gradient-to-r from-primary to-amber-600 text-white rounded-3xl p-5 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all font-semibold text-base"
>
  <MessageCircle size={24} />
  <span>تواصل مع فريق صبا</span>
</button>
```

**Email Handler (Lines 99-103):**
```typescript
const openEmail = () => {
  const subject = encodeURIComponent('استفسار حول صبا');
  const body = encodeURIComponent('مرحباً فريق صبا،\n\nأود الاستفسار عن...\n\nشكراً!');
  window.open(`mailto:support@askseba.com?subject=${subject}&body=${body}`, '_blank');
};
```

---

### 2.2 About Us Page (`/about` - "قصتنا")

**File Path:** `src/app/about/page.tsx`

**Route:** `/about`

**Data Source:**
- **File:** `src/content/content.json`
- **Import:** `import content from '@/content/content.json'` (line 4)
- **Usage:** `const data = content.about` (line 9)

**Component Dependencies:**
- `next/link`: `Link`
- `lucide-react`: `ArrowLeft`, `Quote`
- `framer-motion`: `motion`

**Outgoing Links:**
- **Line 19:** `/profile` - Back button: `<Link href="/profile">الرجوع للملف الشخصي</Link>`
- **Line 40:** `/quiz` - CTA button in hero section

**Key Content Structure:**
- Hero section (title, subtitle, CTA)
- Feature cards (sections)
- Stats section
- Testimonials
- Values section
- Final CTA section

---

### 2.3 FAQ Page (`/faq` - "تساؤلات تهمك")

**File Path:** `src/app/faq/page.tsx`

**Route:** `/faq`

**Data Source:**
- **File:** `src/content/content.json`
- **Import:** `import content from '@/content/content.json'` (line 5)
- **Usage:** `const data = content.faq` (line 11)

**Component Dependencies:**
- `next/link`: `Link`
- `react`: `useState`
- `@radix-ui/react-accordion`: `* as Accordion`
- `lucide-react`: `ChevronDown`, `ArrowLeft`, `Search`
- `framer-motion`: `motion`

**Outgoing Links:**
- **Line 29:** `/profile` - Back button: `<Link href="/profile">الرجوع للملف الشخصي</Link>`

**Key Features:**
- **Line 12:** Search functionality (filters questions)
- **Lines 82-102:** Accordion UI for questions/answers
- **Lines 15-22:** Filter logic for search term

---

### 2.4 Privacy Policy Page (`/privacy` - "سياسة الخصوصية")

**File Path:** `src/app/privacy/page.tsx`

**Route:** `/privacy`

**Data Source:**
- **File:** `src/content/content.json`
- **Import:** `import content from '@/content/content.json'` (line 5)
- **Usage:** `const data = content.privacy` (line 11)

**Component Dependencies:**
- `next/link`: `Link`
- `react`: `useState`
- `@radix-ui/react-accordion`: `* as Accordion`
- `lucide-react`: `ChevronDown`, `ArrowLeft`, `Mail`, `Shield`
- `framer-motion`: `motion`

**Outgoing Links:**
- **Line 19:** `/profile` - Back button: `<Link href="/profile">الرجوع للملف الشخصي</Link>`

**Key Features:**
- **Lines 44-70:** Table of Contents sidebar
- **Lines 76-89:** Quick summary section
- **Lines 92-127:** Accordion sections
- **Lines 129-147:** Contact card with email link
- **Lines 150-169:** Compliance badge

**Contact Email Link (Lines 140-145):**
```typescript
<a 
  href={`mailto:${data.contact.email}`} 
  className="text-[#c0841a] hover:underline text-base block mb-1"
>
  {data.contact.email}
</a>
```

---

## Phase 3: Favorites Feature

### 3.1 Favorites Icon Location

**CRITICAL FINDING:** There is **NO global favorites icon in a header/navigation bar**. 

Favorites functionality exists in two places:

1. **Results Page (`/results`)** - Heart icon on each perfume card
2. **Dashboard Page (`/dashboard`)** - Favorites tab

---

### 3.2 Results Page Favorites Implementation

**File Path:** `src/app/results/page.tsx`

**Heart Icon Location:** Lines 559-567

**Full Code:**
```typescript
<button
  onClick={() => {
    const action = favoriteIds.has(perfume.id) ? 'remove' : 'add'
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
        const guestFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]')
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
        localStorage.setItem('guestFavorites', JSON.stringify(updatedFavs))
        return
      }
      
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfumeId: perfume.id, action })
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(action === 'add' ? 'تم الحفظ في المفضلة ♥️' : 'تم الحذف من المفضلة', {
          style: { direction: 'rtl', textAlign: 'right' }
        })
      } else {
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
        toast.error(data.error || 'حدث خطأ', {
          style: { direction: 'rtl', textAlign: 'right' }
        })
      }
    } catch (err) {
      // Error handling with revert...
      console.error('Error saving favorite:', err)
      toast.error('حدث خطأ أثناء الحفظ', {
        style: { direction: 'rtl', textAlign: 'right' }
      })
    }
  }}
  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 ${
    favoriteIds.has(perfume.id)
      ? 'bg-red-500 text-white'
      : 'bg-white text-red-500 hover:bg-red-50'
  }`}
  aria-label={favoriteIds.has(perfume.id) ? `إزالة ${perfume.name} من المفضلة` : `إضافة ${perfume.name} إلى المفضلة`}
>
  <Heart className={`w-5 h-5 ${favoriteIds.has(perfume.id) ? 'fill-current' : ''}`} />
</button>
```

**Click Logic:**
- **Lines 496-512:** Guest users → localStorage (`guestFavorites`)
- **Lines 515-527:** Authenticated users → API call to `/api/user/favorites`

**No Navigation:** The heart icon does NOT navigate to a page - it toggles favorite status inline.

---

### 3.3 Dashboard Page Favorites

**File Path:** `src/app/dashboard/page.tsx`

**Favorites Tab:** Lines 77, 84-85, 159

**Full Code:**
```typescript
const tabs = [
  { id: 'favorites', label: '💜 المفضلة', icon: 'favorite', count: favorites.length },
  { id: 'disliked', label: '❌ المكروهة', icon: 'thumb_down', count: dislikedPerfumes.length },
  { id: 'wishlist', label: '💾 قائمة الرغبات', icon: 'bookmark', count: wishlistPerfumes.length }
]

const getCurrentPerfumes = () => {
  switch (activeTab) {
    case 'favorites':
      return favorites
    // ...
  }
}
```

**Favorites Loading (Lines 34-52):**
```typescript
useEffect(() => {
  if (session?.user?.id) {
    fetch('/api/user/favorites')
      .then(res => res.json())
      .then((ids: string[]) => {
        const favPerfumes = perfumes.filter(p => ids.includes(p.id))
        setFavorites(favPerfumes)
      })
      .catch(err => {
        console.error('Error loading favorites:', err)
      })
  } else {
    // Guest: load from localStorage
    const guestFavs = JSON.parse(localStorage.getItem('guestFavorites') || '[]')
    const favPerfumes = perfumes.filter(p => guestFavs.includes(p.id))
    setFavorites(favPerfumes)
  }
}, [session?.user?.id])
```

**Navigation:** Dashboard is accessible at `/dashboard` - requires authentication (redirects to `/login` if not authenticated).

---

### 3.4 Favorites API Endpoints

**File Path:** `src/app/api/user/favorites/route.ts`

**POST Endpoint (Lines 5-64):**
- Adds/removes favorites for authenticated users
- Uses Prisma to interact with `user_favorites` table
- Returns JSON response with success status

**GET Endpoint (Lines 66-84):**
- Retrieves favorite perfume IDs for authenticated user
- Returns array of perfume IDs

**Guest vs. Logged-in Behavior:**
- **Guest:** Uses `localStorage.getItem('guestFavorites')` - array of perfume IDs
- **Logged-in:** Uses database via `/api/user/favorites` endpoint

---

## Phase 4: Contact Us Logic

### 4.1 Contact Us Elements Found

**1. Profile Page - "تواصل مع فريق صبا" Button**

**File Path:** `src/app/profile/page.tsx`

**Location:** Lines 196-205

**Code:**
```typescript
<button
  onClick={openEmail}
  className="w-full bg-gradient-to-r from-primary to-amber-600 text-white rounded-3xl p-5 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all font-semibold text-base"
>
  <MessageCircle size={24} />
  <span>تواصل مع فريق صبا</span>
</button>
```

**Handler Function (Lines 99-103):**
```typescript
const openEmail = () => {
  const subject = encodeURIComponent('استفسار حول صبا');
  const body = encodeURIComponent('مرحباً فريق صبا،\n\nأود الاستفسار عن...\n\nشكراً!');
  window.open(`mailto:support@askseba.com?subject=${subject}&body=${body}`, '_blank');
};
```

**Action Type:** Opens default email client with `mailto:` link

**Email Address:** `support@askseba.com`

---

**2. Privacy Policy Page - Contact Card**

**File Path:** `src/app/privacy/page.tsx`

**Location:** Lines 129-147

**Code:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 mb-8"
>
  <div className="flex gap-3 items-center mb-3">
    <Mail className="w-6 h-6 text-[#c0841a]" />
    <h3 className="text-lg font-bold">للتواصل</h3>
  </div>
  <a 
    href={`mailto:${data.contact.email}`} 
    className="text-[#c0841a] hover:underline text-base block mb-1"
  >
    {data.contact.email}
  </a>
  <p className="text-sm text-[#5B4233]/60">{data.contact.response_time}</p>
</motion.div>
```

**Data Source:** `content.json` → `content.privacy.contact.email`

**Action Type:** `<a href="mailto:...">` link (opens default email client)

---

### 4.2 Contact Information Summary

- **Primary Contact Email:** `support@askseba.com`
- **Contact Methods:**
  1. Profile page button (mailto with pre-filled subject/body)
  2. Privacy policy page email link (simple mailto)
- **No Contact Form:** No `/contact` route or form submission endpoint found

---

## Summary of Critical Findings

### Missing Components
1. **No Global Navigation Header** - Users cannot navigate between pages via UI
2. **No User Icon/Dropdown** - No visible authentication state indicator
3. **No Favorites Icon in Header** - Favorites only accessible via:
   - Heart icons on perfume cards (results page)
   - Dashboard tab (requires authentication)

### Authentication Flow
- Login/Register pages exist and function
- Session management via NextAuth (JWT strategy)
- Protected routes redirect to `/login` with callbackUrl
- Profile page accessible directly (no navigation link)

### Data Sources
- **Profile:** Session data (NextAuth)
- **About/FAQ/Privacy:** `src/content/content.json`
- **Favorites:** Database (authenticated) or localStorage (guests)

### Navigation Pattern
- Users navigate via direct URL access
- Back buttons on legal pages return to `/profile`
- No persistent navigation menu

---

**Report Generated:** January 2025  
**Audit Type:** Comprehensive Technical Audit  
**Scope:** Authentication, Core Pages, Favorites, Contact Logic