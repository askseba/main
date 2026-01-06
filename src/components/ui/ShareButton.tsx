'use client'
import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareButtonProps {
  title?: string
  text?: string
  url?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'icon'
}

export function ShareButton({ 
  title = 'عطر مثالي لك!',
  text,
  url,
  className = '',
  variant = 'primary'
}: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = text || `صبا اختارت لي ${title} 🎯 ✅ آمن تماماً`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl
        })
        setIsShared(true)
        setTimeout(() => setIsShared(false), 2000)
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error)
        fallbackCopy()
      }
    } else {
      fallbackCopy()
    }
  }

  const fallbackCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        .then(() => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea')
          textArea.value = `${shareText}\n${shareUrl}`
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        })
    }
  }

  const buttonClasses = {
    primary: 'px-6 py-3 bg-gradient-to-r from-gradient-start to-primary text-white rounded-full font-bold shadow-button hover:shadow-lg transition-all flex items-center gap-2',
    secondary: 'px-6 py-3 bg-white border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2',
    icon: 'w-12 h-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center'
  }

  return (
    <motion.button
      onClick={handleShare}
      className={`${buttonClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="شارك النتيجة"
    >
      <AnimatePresence mode="wait">
        {isShared ? (
          <motion.div
            key="shared"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>تم المشاركة!</span>
          </motion.div>
        ) : isCopied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Copy className="w-5 h-5" />
            <span>تم النسخ!</span>
          </motion.div>
        ) : (
          <motion.div
            key="share"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            {variant !== 'icon' && <span>شارك</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
