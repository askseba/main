"use client"
import React from 'react'
import { X } from 'lucide-react'
import { CTAButton } from './CTAButton'
import { type ResultsFilters } from '@/hooks/useResultsFilters'

interface FilterFamily {
  name: string
  color?: string
  children?: Array<{ name: string; checked?: boolean }>
}

interface MobileFilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: ResultsFilters
  onFiltersChange: (filters: ResultsFilters) => void
}

export function MobileFilterModal({ 
  isOpen, 
  onClose,
  filters,
  onFiltersChange
}: MobileFilterModalProps) {

  const families: FilterFamily[] = [
    {
      name: 'الأخشاب',
      color: '#10B981',
      children: [
        { name: 'صندل', checked: false },
        { name: 'عود', checked: true }
      ]
    },
    {
      name: 'الشرقية',
      color: '#F59E0B',
      children: [
        { name: 'عنبر', checked: false },
        { name: 'مسك', checked: false }
      ]
    },
    {
      name: 'الزهرية',
      color: '#EC4899',
      children: [
        { name: 'ورد', checked: false },
        { name: 'ياسمين', checked: false }
      ]
    }
  ]


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-x-0 bottom-0 top-auto max-h-[90vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="p-6 border-b border-brown-text/10 flex justify-between items-center bg-cream-bg sticky top-0 z-10">
          <h2 className="font-tajawal-bold text-2xl text-brown-text">تصفية النتائج</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-brown-text/5 rounded-full transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6 text-brown-text" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Match Percentage Slider */}
          <div>
            <label className="block text-brown-text font-tajawal-bold mb-3 flex justify-between">
              <span>نسبة التوافق</span>
              <span className="text-primary">{filters.matchPercentage}% +</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.matchPercentage}
              onChange={(e) => onFiltersChange({...filters, matchPercentage: Number(e.target.value)})}
              className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Perfume Families */}
          <div>
            <h3 className="font-tajawal-bold text-brown-text mb-3">العائلة العطرية</h3>
            <div className="space-y-2 pe-2 border-e-2 border-primary/10">
              {families.map((family, idx) => (
                <div key={idx}>
                  <label 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => {
                      const newFamilies = filters.families.includes(family.name)
                        ? filters.families.filter(f => f !== family.name)
                        : [...filters.families, family.name]
                      onFiltersChange({...filters, families: newFamilies})
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: family.color || '#c0841a' }}
                    />
                    <span className="text-brown-text group-hover:text-primary transition-colors">
                      {family.name}
                    </span>
                  </label>
                  {family.children && (
                    <div className="pe-6 space-y-2 mt-2">
                      {family.children.map((child, childIdx) => {
                        const key = `${family.name}-${child.name}`
                        const isChecked = filters.families.includes(key)
                        return (
                          <label 
                            key={childIdx}
                            className="flex items-center gap-2 text-sm text-brown-text/70 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                const newFamilies = filters.families.includes(key)
                                  ? filters.families.filter(f => f !== key)
                                  : [...filters.families, key]
                                onFiltersChange({...filters, families: newFamilies})
                              }}
                              className="rounded text-primary focus:ring-primary"
                            />
                            <span>{child.name}</span>
                          </label>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-tajawal-bold text-brown-text mb-3">السعر</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-cream-bg px-3 py-2 rounded-lg border border-brown-text/10 text-center flex-1">
                {filters.maxPrice} ر.س
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              step="100"
              value={filters.maxPrice}
              onChange={(e) => onFiltersChange({...filters, maxPrice: Number(e.target.value)})}
              className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-brown-text/10 bg-cream-bg sticky bottom-0">
          <CTAButton
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >
            إغلاق
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default MobileFilterModal
