import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              image: true,
              bio: true,
              role: true,
              statsVerified: true
            }
          })

          if (!user) {
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password)

          if (!isPasswordValid) {
            return null
          }

          // Return user data (without password)
          return {
            id: user.id,
            email: user.email,
            name: user.name || null,
            image: user.image || null,
            bio: user.bio || undefined,
            role: user.role,
            statsVerified: user.statsVerified
          }
        } catch (error) {
          console.error('[Auth] Database error:', error)
          return null
        }
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
        token.role = (user as any).role
        token.statsVerified = (user as any).statsVerified
      }
      // تحديث التوكن عند استخدام update() من الواجهة
      if (trigger === 'update' && session) {
        token.bio = session.bio || token.bio
        token.image = session.image || token.image
        if (session.statsVerified !== undefined) {
          token.statsVerified = session.statsVerified
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.bio = token.bio as string | undefined
        session.user.image = token.image as string | undefined
        session.user.role = token.role as string | undefined
        session.user.statsVerified = token.statsVerified as boolean | undefined
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
