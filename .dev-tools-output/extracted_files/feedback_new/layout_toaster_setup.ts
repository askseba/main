import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ask Seba - اكتشف عطرك المثالي',
  description: 'تطبيق ذكي لمساعدتك في اختيار العطر المناسب',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {children}
        
        {/* Sonner Toaster */}
        <Toaster
          position="top-center"
          richColors={false}
          toastOptions={{
            classNames: {
              toast:
                'bg-gradient-to-r from-amber-500/95 to-orange-500/95 text-white border-amber-300 shadow-xl',
              title: 'text-white font-bold',
              description: 'text-white/90',
              actionButton: 'bg-white text-amber-600',
              cancelButton: 'bg-white/20 text-white',
            },
            duration: 3500,
          }}
        />
      </body>
    </html>
  )
}