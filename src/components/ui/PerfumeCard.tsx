'use client'
import React, { useState, useEffect } from 'react'
import { BarChart3, Check } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'

interface PerfumeCardProps {
  id?: string
  variant?: 'on-sale' | 'just-arrived'
  title?: string
  brand?: string
  matchPercentage?: number
  imageUrl?: string
  description?: string
  isSafe?: boolean
  isSelected?: boolean
  onSelect?: () => void
  selectionType?: 'liked' | 'disliked'
  showAddButton?: boolean
}

export function PerfumeCard({ 
  id,
  variant = 'on-sale',
  title = 'عود ملكي فاخر',
  brand = 'أطيار',
  matchPercentage = 90,
  imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuALBOCEY2KBnfmkKMp5T6wk7_tpNpYd3gxmLv44JaVnWWHheh5gIzBLiaDI5fKGIARWSWatCeEb4azL5A17HBLlqMqHVuK3B3mVJP3jO-BI7w6oAg5ou-jeK7DuIMj6Fd_QONDQwXlpOjjSEcE84Knt_5z4mBLf1A7QxpZMHAyHOw0YtNyEweRUfJ7Tsxs967MWYSrjlI3dDLoQqWt7pg8oDqHBhO1T_uX29W1QDSJ9EaqoM6FdQ8hSW7f4MY2a-H26q7iDJrV4WnI3',
  description = 'تولیفة ساحرة تجمع بین دهن العود الكمبودي والمسك الأسود.',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isSafe = true,
  isSelected = false,
  onSelect,
  selectionType = 'liked',
  showAddButton = true
}: PerfumeCardProps) {
  const { favorites, isFavorite, toggleFavorite, isLoading } = useFavorites()
  const [isAdded, setIsAdded] = useState(false)

  // Update isAdded state when favorite status changes (including cross-tab updates)
  useEffect(() => {
    if (id) {
      setIsAdded(isFavorite(id))
    }
  }, [id, favorites, isFavorite])

  // Handle "Add to Analysis" button click
  const handleAddToAnalysis = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click event
    
    if (!id || isLoading) return
    
    try {
      await toggleFavorite(id)
      // isAdded will be updated via useEffect when isFavorite changes
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }
  // Analytical badge based on matchPercentage
  const getAnalyticalBadge = () => {
    if (matchPercentage >= 80) {
      return {
        label: 'آمن',
        emoji: '🛡',
        color: 'text-green-600',
        bg: 'bg-green-600/20',
        border: 'border-green-500/30'
      }
    } else if (matchPercentage >= 60) {
      return {
        label: 'تحذير',
        emoji: '⚠',
        color: 'text-amber-600',
        bg: 'bg-amber-600/20',
        border: 'border-amber-500/30'
      }
    } else {
      return {
        label: 'غير موصى به',
        emoji: '❌',
        color: 'text-red-600',
        bg: 'bg-red-600/20',
        border: 'border-red-500/30'
      }
    }
  }

  const getVariantConfig = () => {
    switch(variant) {
      case 'on-sale':
        return {
          matchColor: matchPercentage >= 80 ? 'text-orange-600' : 'text-yellow-600',
          matchBg: matchPercentage >= 80 ? 'bg-orange-600' : 'bg-yellow-600'
        };
      case 'just-arrived':
        return {
          matchColor: matchPercentage >= 70 ? 'text-yellow-600' : 'text-red-600',
          matchBg: matchPercentage >= 70 ? 'bg-yellow-600' : 'bg-red-600',
          isLowMatch: matchPercentage < 70
        };
      default:
        return {
          matchColor: 'text-green-600',
          matchBg: 'bg-green-600'
        };
    }
  };

  const config = getVariantConfig();
  const analyticalBadge = getAnalyticalBadge();

  return (
    <div 
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={
        onSelect
          ? typeof matchPercentage === 'number'
            ? `${title} - نسبة التطابق ${matchPercentage}%`
            : title
          : undefined
      }
      onKeyDown={onSelect ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      } : undefined}
      className={`w-full max-w-sm bg-cream-bg rounded-2xl shadow-[0_0_20px_rgba(236,156,19,0.15)] overflow-hidden border transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,156,19,0.25)] hover:scale-[1.01] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        onSelect ? 'cursor-pointer' : ''
      } ${
        isSelected 
          ? selectionType === 'liked'
            ? 'border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] ring-2 ring-green-500/20'
            : 'border-4 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] ring-2 ring-red-500/20'
          : 'border border-brown-text/5'
      }`}
    >

      {/* Selected Indicator */}
      {isSelected && (
        <div className={`absolute top-4 right-4 z-30 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center shadow-lg touch-manipulation ${
          selectionType === 'liked' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <span className="text-white text-base font-bold">
            {selectionType === 'liked' ? '✅' : '❌'}
          </span>
        </div>
      )}

      {/* Match Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-center gap-1">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-brown-text border-2 border-primary/30 shadow-lg">
          <svg className="absolute inset-0 w-full h-full -rotate-90 text-primary" viewBox="0 0 36 36">
            <path 
              className="text-white/10" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            />
            <path 
              className={`${config.matchColor} drop-shadow-[0_0_2px_rgba(236,156,19,0.8)]`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
              fill="none" 
              stroke="currentColor" 
              strokeDasharray={`${matchPercentage}, 100`}
              strokeLinecap="round" 
              strokeWidth="2.5"
            />
          </svg>
          <span className="text-sm font-bold text-white leading-none">{matchPercentage}%</span>
        </div>
        <span className="text-xs font-bold text-brown-text/85 uppercase tracking-wider">تطابق</span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-8 mt-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
        <div 
          className="relative z-10 w-full h-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6 pt-2 flex flex-col gap-4 bg-transparent">
        {/* Analytical Badge (based on matchPercentage) */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${analyticalBadge.bg} ${analyticalBadge.border} backdrop-blur-sm`}>
            <span className={`text-base ${analyticalBadge.color}`}>
              {analyticalBadge.emoji}
            </span>
            <span className={`text-xs font-medium ${analyticalBadge.color}`}>
              {analyticalBadge.label}
            </span>
          </div>
          <span className="text-brand-gold-darker text-sm font-bold tracking-wide">{brand}</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-brown-text leading-tight line-clamp-2 overflow-hidden">{title}</h3>
          <p className="text-brown-text/85 text-sm line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="h-px w-full bg-brown-text/10 my-1"></div>

        {/* Action Button */}
        {showAddButton && id && (
          <div className="flex items-center justify-center mt-1">
            <button 
              onClick={handleAddToAnalysis}
              disabled={isLoading}
              className={`flex-1 min-h-[44px] rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
                  : 'bg-primary hover:bg-primary/90 text-brand-brown-dark shadow-[0_4px_12px_rgba(236,156,19,0.3)]'
              }`}
              aria-label={isAdded ? 'إزالة من التحليل' : 'أضف للتحليل'}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>جاري...</span>
                </>
              ) : isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>تمت الإضافة ✓</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5" />
                  <span>أضف للتحليل</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Low Match Warning (Just Arrived only) */}
        {config.isLowMatch && (
          <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-orange-800 leading-relaxed">
                ذوقك فريد جداً. جرب تغيير بعض التفضيلات لرؤية اقتراحاتنا المميزة.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfumeCard;
