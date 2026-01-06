"use client"
import React from 'react'
import { Search, Bookmark, Heart, Package } from 'lucide-react'

interface CounterBadgeProps {
  variant?: 'search' | 'bookmarks' | 'matches' | 'samples'
  count: number
  label?: string
  icon?: React.ReactNode
  className?: string
  onClick?: () => void
}

const variantConfig = {
  search: {
    icon: Search,
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    hoverBg: 'hover:bg-blue-500/20'
  },
  bookmarks: {
    icon: Bookmark,
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    hoverBg: 'hover:bg-purple-500/20'
  },
  matches: {
    icon: Heart,
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500',
    hoverBg: 'hover:bg-green-500/20'
  },
  samples: {
    icon: Package,
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    hoverBg: 'hover:bg-orange-500/20'
  }
}

export function CounterBadge({
  variant = 'search',
  count,
  label,
  icon,
  className = '',
  onClick
}: CounterBadgeProps) {
  const config = variantConfig[variant]
  const IconComponent = config.icon

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl p-4 shadow-sm border border-brown-text/10 
        hover:shadow-md transition-all group
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Icon */}
      <div className={`
        w-10 h-10 rounded-full ${config.bgColor} ${config.hoverBg}
        flex items-center justify-center ${config.iconColor}
        group-hover:scale-110 transition-transform mb-3
      `}>
        {icon || <IconComponent className="w-5 h-5" />}
      </div>
      
      {/* Counter */}
      <div>
        <span className="text-2xl font-tajawal-bold block text-brown-text">
          {count}
        </span>
        {label && <span className="text-xs text-brown-text/60">{label}</span>}
      </div>
    </div>
  )
}

export default CounterBadge
