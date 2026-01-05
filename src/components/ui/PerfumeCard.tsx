'use client'
import React from 'react'

interface PerfumeCardProps {
  variant?: 'bestseller' | 'on-sale' | 'just-arrived'
  title?: string
  brand?: string
  matchPercentage?: number
  price?: number
  originalPrice?: number | null
  imageUrl?: string
  description?: string
  isSafe?: boolean
  isSelected?: boolean
  onSelect?: () => void
  selectionType?: 'liked' | 'disliked'
}

export function PerfumeCard({ 
  variant = 'bestseller',
  title = 'عود ملكي فاخر',
  brand = 'أطيار',
  matchPercentage = 90,
  price = 450,
  originalPrice = null,
  imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuALBOCEY2KBnfmkKMp5T6wk7_tpNpYd3gxmLv44JaVnWWHheh5gIzBLiaDI5fKGIARWSWatCeEb4azL5A17HBLlqMqHVuK3B3mVJP3jO-BI7w6oAg5ou-jeK7DuIMj6Fd_QONDQwXlpOjjSEcE84Knt_5z4mBLf1A7QxpZMHAyHOw0YtNyEweRUfJ7Tsxs967MWYSrjlI3dDLoQqWt7pg8oDqHBhO1T_uX29W1QDSJ9EaqoM6FdQ8hSW7f4MY2a-H26q7iDJrV4WnI3',
  description = 'تولیفة ساحرة تجمع بین دهن العود الكمبودي والمسك الأسود.',
  isSafe = true,
  isSelected = false,
  onSelect,
  selectionType = 'liked'
}: PerfumeCardProps) {
  const getVariantConfig = () => {
    switch(variant) {
      case 'bestseller':
        return {
          badge: 'الأكثر مبيعاً',
          badgeColor: 'bg-[#c0841a] text-[#291d12]',
          badgeIcon: '✓',
          matchColor: matchPercentage >= 90 ? 'text-green-600' : matchPercentage >= 80 ? 'text-orange-600' : 'text-red-600',
          matchBg: matchPercentage >= 90 ? 'bg-green-600' : matchPercentage >= 80 ? 'bg-orange-600' : 'bg-red-600'
        };
      case 'on-sale':
        return {
          badge: 'تخفيضات',
          badgeColor: 'bg-[#c0841a] text-[#221c11]',
          badgeIcon: '🏷',
          matchColor: matchPercentage >= 80 ? 'text-orange-600' : 'text-yellow-600',
          matchBg: matchPercentage >= 80 ? 'bg-orange-600' : 'bg-yellow-600'
        };
      case 'just-arrived':
        return {
          badge: 'وصل حديثاً',
          badgeColor: 'bg-[#c0841a] text-[#221c11]',
          badgeIcon: '✨',
          matchColor: matchPercentage >= 70 ? 'text-yellow-600' : 'text-red-600',
          matchBg: matchPercentage >= 70 ? 'bg-yellow-600' : 'bg-red-600',
          isLowMatch: matchPercentage < 70
        };
      default:
        return {
          badge: null,
          badgeColor: '',
          badgeIcon: '',
          matchColor: 'text-green-600',
          matchBg: 'bg-green-600'
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div 
      onClick={onSelect}
      className={`w-full max-w-sm bg-[#F2F0EB] rounded-2xl shadow-[0_0_20px_rgba(236,156,19,0.15)] overflow-hidden border transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,156,19,0.25)] hover:scale-[1.01] group ${
        onSelect ? 'cursor-pointer' : ''
      } ${
        isSelected 
          ? selectionType === 'liked'
            ? 'border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)] ring-2 ring-green-500/20'
            : 'border-4 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] ring-2 ring-red-500/20'
          : 'border border-[#5B4233]/5'
      }`}
    >
      {/* Top Badge */}
      {config.badge && (
        <div className="absolute top-4 right-4 z-20">
          <div className={`${config.badgeColor} font-bold text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-1`}>
            <span className="text-[18px]">{config.badgeIcon}</span>
            <span>{config.badge}</span>
          </div>
        </div>
      )}

      {/* Selected Indicator */}
      {isSelected && (
        <div className={`absolute top-4 right-4 z-30 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
          selectionType === 'liked' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <span className="text-white text-sm font-bold">
            {selectionType === 'liked' ? '✅' : '❌'}
          </span>
        </div>
      )}

      {/* Match Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-center gap-1">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#5B4233] border-2 border-[#c0841a]/30 shadow-lg">
          <svg className="absolute inset-0 w-full h-full -rotate-90 text-[#c0841a]" viewBox="0 0 36 36">
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
        <span className="text-[10px] font-bold text-[#5B4233]/70 uppercase tracking-wider">تطابق</span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-8 mt-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#c0841a]/20 blur-[60px] rounded-full pointer-events-none"></div>
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
        {/* Safety Badge */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
            isSafe 
              ? 'bg-[#483a23]/90 border border-[#c0841a]/20' 
              : 'bg-red-900/20 border border-red-500/20'
          } backdrop-blur-sm`}>
            <span className={`text-[16px] ${isSafe ? 'text-[#c0841a]' : 'text-red-500'}`}>
              {isSafe ? '🛡' : '⚠'}
            </span>
            <span className="text-white text-xs font-medium">
              {isSafe ? 'خيار آمن' : 'تحذير'}
            </span>
          </div>
          <span className="text-[#b0720a] text-sm font-bold tracking-wide">{brand}</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-[#5B4233] leading-tight">{title}</h3>
          <p className="text-[#5B4233]/70 text-sm line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="h-px w-full bg-[#5B4233]/10 my-1"></div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-xs text-[#5B4233]/50 line-through decoration-red-500/50">
                {originalPrice} ر.س
              </span>
            )}
            <span className="text-xl font-bold text-[#b0720a]">
              {price} <span className="text-sm font-normal text-[#5B4233]/70">ر.س</span>
            </span>
          </div>
          
          <button className="flex-1 h-12 bg-[#c0841a] hover:bg-[#c0841a]/90 text-[#291d12] rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_4px_12px_rgba(236,156,19,0.3)]">
            <span>إضافة للسلة</span>
            <span className="text-[20px]">🛍</span>
          </button>
          
          <button className="w-12 h-12 rounded-full border border-[#5B4233]/10 bg-[#5B4233]/5 flex items-center justify-center text-[#5B4233] hover:bg-[#5B4233]/10 hover:text-[#b0720a] transition-colors active:scale-95">
            <span className="text-[20px]">♡</span>
          </button>
        </div>

        {/* Low Match Warning (Just Arrived only) */}
        {config.isLowMatch && (
          <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="flex items-start gap-2">
              <span className="text-[18px]">💡</span>
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
