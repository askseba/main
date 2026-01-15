'use client'

import { toast } from 'sonner'
import { getStorageJSON, removeStorageItem } from '@/lib/utils/storage'
import { safeFetch, validateArray } from '@/lib/utils/api-helpers'

/**
 * Migrates guest favorites from localStorage to database
 * Should be called after successful login
 */
export async function migrateGuestFavorites(userId: string): Promise<void> {
  const guestFavorites = getStorageJSON<string[]>('guestFavorites', [])

  if (guestFavorites.length === 0) return

  // Check network status before attempting migration
  if (typeof window !== 'undefined' && !navigator.onLine) {
    toast.error('لا يوجد اتصال بالإنترنت. سيتم حفظ المفضلات عند عودة الاتصال.', {
      style: { direction: 'rtl', textAlign: 'right' }
    })
    throw new Error('لا يوجد اتصال بالإنترنت')
  }

  try {
    // Get existing favorites from API
    const existingResponse = await safeFetch<{ success: boolean; data?: string[]; error?: string }>('/api/user/favorites')
    
    if (!existingResponse.success || !existingResponse.data) {
      throw new Error(existingResponse.error || 'فشل جلب المفضلات الموجودة')
    }
    
    const existingFavorites = validateArray<string>(existingResponse.data, 'المفضلات يجب أن تكون مصفوفة')

    // Find favorites that aren't already saved
    const newFavorites = guestFavorites.filter(
      id => !existingFavorites.includes(id)
    )

    if (newFavorites.length === 0) {
      // All favorites already exist, just clear localStorage
      removeStorageItem('guestFavorites')
      return
    }

    // Add new favorites to database
    const promises = newFavorites.map(perfumeId =>
      safeFetch<{ success: boolean; message?: string; error?: string }>('/api/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfumeId, action: 'add' })
      }).catch(err => {
        console.error(`Error adding favorite ${perfumeId}:`, err)
        throw err
      })
    )

    await Promise.all(promises)

    // Clear localStorage after successful migration
    removeStorageItem('guestFavorites')

    // Show success toast
    toast.success(`تم حفظ ${newFavorites.length} من مفضلاتك السابقة ♥️`, {
      duration: 8000,
      dismissible: true,
      action: {
        label: 'عرض المفضلة',
        onClick: () => {
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard?tab=favorites'
          }
        }
      },
      style: { direction: 'rtl', textAlign: 'right' }
    })
  } catch (error) {
    console.error('Error migrating favorites:', error)
    // Don't clear localStorage on error - user can retry
  }
}
