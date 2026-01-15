'use client'
import React from 'react'

interface Stat {
  label: string
  value: string | number
  icon?: string
  color?: string
  gradient?: string
}

interface StatsGridProps {
  stats?: Stat[]
  columns?: 2 | 4
  className?: string
}

export function StatsGrid({ 
  stats,
  columns = 4,
  className = '' 
}: StatsGridProps) {
  const defaultStats: Stat[] = [
    { label: 'عمليات البحث', value: 45, icon: 'search', color: '#c0841a' }, // brand-gold
    { label: 'محفوظات', value: 12, icon: 'bookmark', color: '#10B981' }, // safe-green
    { label: 'تطابقات', value: 23, icon: 'favorite', color: '#F59E0B' }, // warning-orange
    { label: 'عينات مطلوبة', value: 3, icon: 'science', color: '#EF4444' } // danger-red
  ]

  const displayStats = stats || defaultStats
  const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {displayStats.map((stat, index) => (
        <div
          key={index}
          className="bg-cream/50 dark:bg-surface-dark-lighter rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          {/* Gradient background on hover */}
          {stat.gradient && (
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{ background: stat.gradient }}
            />
          )}
          
          {/* Icon */}
          {stat.icon && (
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
              style={{ 
                backgroundColor: stat.color ? `${stat.color}20` : 'rgba(192, 132, 26, 0.1)'
              }}
            >
              <span 
                className="material-symbols-outlined text-xl"
                style={{ color: stat.color || '#c0841a' }} // brand-gold
              >
                {stat.icon}
              </span>
            </div>
          )}

          {/* Value */}
          <div 
            className="text-2xl font-bold text-text-dark dark:text-white"
            style={{ color: stat.color || '#5B4233' }} // brand-brown
          >
            {stat.value}
          </div>

          {/* Label */}
          <div className="text-sm text-text-dark/70 dark:text-gray-400 font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
