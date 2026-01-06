'use client'
import React, { useState } from 'react'

interface FilterFamily {
  name: string
  color?: string
  children?: Array<{ name: string; checked?: boolean }>
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  onApply?: (filters: {
    matchPercentage: number
    safeOnly: boolean
    families: string[]
    priceRange: [number, number]
  }) => void
  className?: string
}

export function FilterSidebar({ 
  isOpen, 
  onClose, 
  onApply,
  className = '' 
}: FilterSidebarProps) {
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
    <div className={`fixed inset-0 z-[60] ${className}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background-light shadow-2xl flex flex-col rounded-r-3xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-white/50">
          <h2 className="font-display text-2xl text-primary font-bold">تصفية النتائج</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-primary/5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Match Percentage Slider */}
          <div>
            <label className="block text-primary font-bold mb-3 flex justify-between">
              <span>نسبة التوافق</span>
              <span className="text-secondary">{matchPercentage}% +</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={matchPercentage}
              onChange={(e) => setMatchPercentage(Number(e.target.value))}
              className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer range-slider accent-secondary"
            />
          </div>

          {/* Safe Only Checkbox */}
          <div className="flex items-center justify-between py-2 border-b border-primary/5">
            <span className="text-primary font-medium">آمن للبشرة الحساسة</span>
            <input
              type="checkbox"
              checked={safeOnly}
              onChange={(e) => setSafeOnly(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
            />
          </div>

          {/* Perfume Families */}
          <div>
            <h3 className="font-bold text-primary mb-3">العائلة العطرية</h3>
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
                    <span className="text-primary group-hover:text-secondary transition-colors">
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
                            className="flex items-center gap-2 text-sm text-primary/70 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleFamilyToggle(family.name, child.name)}
                              className="rounded text-accent focus:ring-accent"
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
            <h3 className="font-bold text-primary mb-3">السعر</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white px-3 py-2 rounded-lg border border-primary/10 text-center flex-1">
                {priceRange[0]} ر.س
              </div>
              <span className="text-primary/50">-</span>
              <div className="bg-white px-3 py-2 rounded-lg border border-primary/10 text-center flex-1">
                {priceRange[1]} ر.س
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full h-2 bg-primary/10 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-primary/10 bg-white/50">
          <button
            onClick={handleApply}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
          >
            عرض {selectedFamilies.length * 8} نتيجة
          </button>
        </div>
      </aside>
    </div>
  )
}

export default FilterSidebar
