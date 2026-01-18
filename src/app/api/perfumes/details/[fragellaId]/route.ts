import { NextResponse } from 'next/server'
import { getPerfume } from '@/lib/services/perfume.service'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ fragellaId: string }> }) {
  const { fragellaId } = await params
  
  if (!fragellaId) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 })
  }

  try {
    const perfume = await getPerfume(fragellaId)
    return NextResponse.json({ success: true, data: perfume })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
