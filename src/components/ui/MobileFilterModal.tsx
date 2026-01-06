"use client"
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { CTAButton } from './CTAButton'

interface FilterFamily {
  name: string
  color?: string
  children?: Array<{ name: string; checked?: boolean }>
}

interface MobileFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply?: (filters: {
    matchPercentage: number
    safeOnly: boolean
    families: string[]
    priceRange: [number, number]
  }) => void
}

export function MobileFilterModal({ 
  isOpen, 
  onClose, 
  onApply
}: MobileFilterModalProps) {
  const [matchPercentage, setMatchPercentage] = useState(85)
  const [safeOnly, setSafeOnly] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 5000])
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(['عود'])

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

  const handleFamilyToggle = (familyName: string, childName?: string) => {
    const key = childName ? `${familyName}-${childName}` : familyName
    setSelectedFamilies(prev => 
      prev.includes(key) 
        ? prev.filter(f => f !== key)
        : [...prev, key]
    )
  }

  const handleApply = () => {
    onApply?.({
      matchPercentage,
      safeOnly,
      families: selectedFamilies,
      priceRange
    })
    onClose()
  }

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
              <span className="text-primary">{matchPercentage}% +</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={matchPercentage}
              onChange={(e) => setMatchPercentage(Number(e.target.value))}
              className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Safe Only Checkbox */}
          <div className="flex items-center justify-between py-2 border-b border-brown-text/10">
            <span className="text-brown-text font-medium">آمن للبشرة الحساسة</span>
            <input
              type="checkbox"
              checked={safeOnly}
              onChange={(e) => setSafeOnly(e.target.checked)}
              className="w-5 h-5 rounded border-brown-text/20 text-primary focus:ring-primary"
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
                    onClick={() => handleFamilyToggle(family.name)}
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
                        const isChecked = selectedFamilies.includes(key)
                        return (
                          <label 
                            key={childIdx}
                            className="flex items-center gap-2 text-sm text-brown-text/70 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleFamilyToggle(family.name, child.name)}
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
                {priceRange[0]} ر.س
              </div>
              <span className="text-brown-text/50">-</span>
              <div className="bg-cream-bg px-3 py-2 rounded-lg border border-brown-text/10 text-center flex-1">
                {priceRange[1]} ر.س
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-brown-text/10 bg-cream-bg sticky bottom-0">
          <CTAButton
            variant="primary"
            onClick={handleApply}
            className="w-full"
          >
            عرض {selectedFamilies.length * 8} نتيجة
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default MobileFilterModal
