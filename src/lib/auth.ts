// Re-export auth from NextAuth v5
// Note: NextAuth v5 uses a different API - no authOptions, use `auth` instead
import { auth, handlers, signIn, signOut } from '@/auth'

// For API routes that need getServerSession compatibility
// NextAuth v5 does NOT export authOptions - use `auth()` instead
// Keeping this for backwards compatibility with older patterns
export const authOptions = {
  // This is a compatibility shim
  // API routes should use: const session = await auth()
  // instead of: getServerSession(authOptions)
}

export { auth, handlers, signIn, signOut }
