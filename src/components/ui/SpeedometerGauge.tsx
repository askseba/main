// src/components/ui/SpeedometerGauge.tsx
'use client'
import { motion } from 'framer-motion'
import { useLayoutEffect, useState } from 'react'

interface SpeedometerProps {
  score: number
  status: 'danger' | 'warning' | 'safe'
}

export function SpeedometerGauge({ score, status }: SpeedometerProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  // Animation initialization - using useLayoutEffect for synchronous DOM updates
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    setAnimatedScore(0)
    const timer = setTimeout(() => setAnimatedScore(score), 100)
    return () => clearTimeout(timer)
  }, [score])
  /* eslint-enable react-hooks/set-state-in-effect */

  const getStatusText = () => {
    if (score < 60) return '⚠️ تحذير حساسية'
    if (score < 80) return '🟡 جرب عينة أولاً'
    return '✅ شراء آمن موصى به'
  }

  const rotation = (score / 100) * 180 - 90

  return (
    <div className="w-[280px] h-[180px] mx-auto relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cream via-gray-100 to-cream shadow-inner">
        <svg 
          viewBox="0 0 280 180" 
          className="w-full h-full"
          role="meter"
          aria-label={`توافق ${score}%`}
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <defs>
            <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="safeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          
          {/* Danger Zone Arc (0-59%) */}
          <path 
            d="M 20 90 Q 140 10 260 90" 
            fill="none"
            stroke="url(#dangerGradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Warning Zone Arc (60-79%) */}
          <path 
            d="M 20 90 Q 140 10 260 90" 
            fill="none"
            stroke="url(#warningGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="283 283"
            strokeDashoffset="113"
          />
          
          {/* Safe Zone Arc (80-100%) */}
          <path 
            d="M 20 90 Q 140 10 260 90" 
            fill="none"
            stroke="url(#safeGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="283 283"
            strokeDashoffset="57"
          />
        </svg>
      </div>

      {/* Animated Needle */}
      <motion.div 
        className="absolute left-1/2 top-1/2 w-[8px] h-20 bg-gradient-to-t from-gray-900 to-black rounded-full shadow-lg origin-bottom z-10"
        style={{ transformOrigin: 'center bottom' }}
        animate={{ rotate: `${rotation}deg` }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-lg border-4 border-white" />
      </motion.div>

      {/* Center Number + Status */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
        <motion.div 
          className="text-4xl font-black bg-gradient-to-r from-gray-900 to-black text-transparent bg-clip-text shadow-2xl drop-shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.8 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {Math.round(animatedScore)}%
        </motion.div>
        <div 
          className={`text-lg font-bold mt-2 shadow-lg ${
            status === 'safe' ? 'bg-green-100 text-green-800 px-3 py-1.5 rounded-full' :
            status === 'warning' ? 'bg-gauge-warning/20 text-gauge-warning border-2 border-gauge-warning/50 px-4 py-2 rounded-2xl' :
            'bg-gauge-danger/20 text-gauge-danger border-2 border-gauge-danger/50 px-4 py-2 rounded-2xl'
          }`}
          aria-live="polite"
        >
          {getStatusText()}
        </div>
      </div>
    </div>
  )
}
