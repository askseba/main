import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Fix CSRF for Next.js 15+ App Router
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
        // Diagnostic logging (remove in production)
        console.log('[Auth] authorize called with:', {
          email: credentials?.email,
          hasPassword: !!credentials?.password
        })

        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth] Missing credentials')
          return null
        }

        // Demo credentials
        const email = credentials.email as string
        const password = credentials.password as string

        console.log('[Auth] Checking credentials:', {
          email,
          passwordMatch: password === '123456'
        })

        if (email === 'demo@askseba.com' && password === '123456') {
          console.log('[Auth] ✅ Demo credentials valid')
          return { 
            id: 'demo-user',
            name: 'مستخدم تجريبي', 
            email: 'demo@askseba.com',
            image: '/demo-avatar.png'
          }
        }

        console.log('[Auth] ❌ Invalid credentials')
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
      // تحديث التوكن عند استخدام update() من الواجهة
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

// Test steps:
// 1. Visit: http://localhost:3000/dashboard
// 2. Should redirect to: /login?callbackUrl=/dashboard
// 3. Click "دخول تجريبي سريع"
// 4. Check console for [Auth] logs
// 5. Should redirect to: /dashboard with user info
