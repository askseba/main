// MOYASAR ADDON - Callback Route Handler
// 🎯 User-facing redirect after payment completion
// ✅ Redirects user to dashboard after Moyasar checkout
// Note: Actual subscription upgrade is handled by webhook route.ts (server-to-server)

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Log in development only
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Moyasar Callback] GET request received')
  }
  
  // Redirect to dashboard with payment success parameter
  return NextResponse.redirect(
    new URL('/dashboard?payment=completed', request.url),
    { status: 307 }
  )
}

export async function POST(request: NextRequest) {
  // Log in development only
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Moyasar Callback] POST request received')
  }
  
  // Redirect to dashboard with payment success parameter
  return NextResponse.redirect(
    new URL('/dashboard?payment=completed', request.url),
    { status: 307 }
  )
}
