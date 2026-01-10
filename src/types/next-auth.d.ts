import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    bio?: string
    role?: string
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      bio?: string
      role?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    bio?: string
    image?: string
    role?: string
  }
}
