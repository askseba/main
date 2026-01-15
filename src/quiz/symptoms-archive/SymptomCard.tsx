"use client"
import { motion } from 'framer-motion'
import { Symptom } from '@/quiz/symptoms-archive/symptoms'

interface SymptomCardProps {
  symptom: Symptom
  isSelected: boolean
  onClick: () => void
}

export function SymptomCard({ symptom, isSelected, onClick }: SymptomCardProps) {
  return (
    <motion.button
      onClick={onClick}
      role="checkbox"
      aria-checked={isSelected ? "true" : "false"}
      aria-label={`${symptom.name} ${isSelected ? 'مُحدد' : 'غير محدد'}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className={`
        relative p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2
        transition-all duration-300 min-h-[140px] text-right w-full
        ${isSelected
          ? 'bg-white border-4 border-primary shadow-2xl ring-2 ring-primary/20'
          : 'bg-white border-2 border-brown-text/20 hover:border-primary/50 hover:bg-cream-bg/50'
        }
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Color Indicator */}
      <div 
        className="absolute top-4 left-4 w-12 h-12 rounded-full opacity-20"
        style={{ backgroundColor: symptom.color }}
      />
      
      {/* Icon */}
      <div className="text-4xl mb-3 text-center">{symptom.icon}</div>
      
      {/* Content */}
      <div className="space-y-2">
        <h3 className={`font-tajawal-bold text-lg mb-2 leading-tight ${
          isSelected ? 'text-brown-text' : 'text-brown-text'
        }`}>
          {symptom.name}
        </h3>
        <p className="text-sm text-brown-text/85 leading-relaxed">
          {symptom.description}
        </p>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.button>
  )
}
