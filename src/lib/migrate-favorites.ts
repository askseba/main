'use client'

import { toast } from 'sonner'

/**
 * Migrates guest favorites from localStorage to database
 * Should be called after successful login
 */
export async function migrateGuestFavorites(userId: string): Promise<void> {
  if (typeof window === 'undefined') return

  const guestFavorites = JSON.parse(
    localStorage.getItem('guestFavorites') || '[]'
  ) as string[]

  if (guestFavorites.length === 0) return

  try {
    // Get existing favorites from API
    const existingResponse = await fetch('/api/user/favorites')
    const existingFavorites: string[] = await existingResponse.json()

    // Find favorites that aren't already saved
    const newFavorites = guestFavorites.filter(
      id => !existingFavorites.includes(id)
    )

    if (newFavorites.length === 0) {
      // All favorites already exist, just clear localStorage
      localStorage.removeItem('guestFavorites')
      return
    }

    // Add new favorites to database
    const promises = newFavorites.map(perfumeId =>
      fetch('/api/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfumeId, action: 'add' })
      })
    )

    await Promise.all(promises)

    // Clear localStorage after successful migration
    localStorage.removeItem('guestFavorites')

    // Show success toast
    toast.success(`تم حفظ ${newFavorites.length} من مفضلاتك السابقة ♥️`, {
      style: { direction: 'rtl', textAlign: 'right' }
    })
  } catch (error) {
    console.error('Error migrating favorites:', error)
    // Don't clear localStorage on error - user can retry
  }
}
