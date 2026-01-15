'use client'
import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const handleLoad = () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration.scope)
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error)
          })
      }

      window.addEventListener('load', handleLoad)

      // Cleanup: remove event listener when component unmounts
      return () => {
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [])

  return null
}
