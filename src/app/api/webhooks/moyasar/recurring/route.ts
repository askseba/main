// MOYASAR ADDON - Recurring Payment Callback Route Handler
// 🎯 User-facing redirect after recurring payment completion
// ✅ Redirects user to dashboard after recurring charge
// Note: Actual subscription update is handled by webhook route.ts (server-to-server)

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Log in development only
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Moyasar Recurring] GET request received')
  }
  
  // Redirect to dashboard with recurring payment parameter
  return NextResponse.redirect(
    new URL('/dashboard?payment=recurring', request.url),
    { status: 307 }
  )
}

export async function POST(request: NextRequest) {
  // Log in development only
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Moyasar Recurring] POST request received')
  }
  
  // Redirect to dashboard with recurring payment parameter
  return NextResponse.redirect(
    new URL('/dashboard?payment=recurring', request.url),
    { status: 307 }
  )
}
