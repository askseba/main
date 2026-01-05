"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PerfumeCard } from '@/components/ui/PerfumeCard'
import { CTAButton } from '@/components/ui/CTAButton'
import { perfumes } from '@/lib/data/perfumes'
import { useQuiz } from '@/contexts/QuizContext'

const MIN_SELECTIONS = 3
const MAX_SELECTIONS = 6

// Framer Motion variants
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.4
    }
  })
}

export default function Step2DislikedPage() {
  const router = useRouter()
  const { data, setStep } = useQuiz()
  const [selectedPerfumes, setSelectedPerfumes] = useState<string[]>(() => data.step2_disliked || [])

  const togglePerfume = (id: string) => {
    setSelectedPerfumes(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(p => p !== id)
        : prev.length < MAX_SELECTIONS
        ? [...prev, id]
        : prev
      
      // Update context
      setStep('step2_disliked', newSelection)
      return newSelection
    })
  }

  const handleNext = () => {
    if (selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS) {
      // Data already saved in context
      router.push('/quiz/step3-allergy')
    }
  }

  const canProceed = selectedPerfumes.length >= MIN_SELECTIONS && selectedPerfumes.length <= MAX_SELECTIONS
  const isMaxReached = selectedPerfumes.length >= MAX_SELECTIONS

  return (
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-tajawal-bold text-4xl md:text-5xl text-brown-text mb-4">
            ❌ العطور التي لا تعجبني
          </h1>
          <p className="text-xl text-brown-text/70 max-w-2xl mx-auto">
            اختر 3-6 عطور لا تعجبك
          </p>
        </motion.div>

        {/* Selection Counter Badge */}
        {selectedPerfumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              canProceed 
                ? 'bg-red-600/10 border-2 border-red-600' 
                : isMaxReached
                ? 'bg-orange-600/10 border-2 border-orange-600'
                : 'bg-primary/10 border-2 border-primary'
            }`}>
              <span className={`font-tajawal-bold text-lg ${
                canProceed ? 'text-red-700' : isMaxReached ? 'text-orange-700' : 'text-brown-text'
              }`}>
                {selectedPerfumes.length} / {MIN_SELECTIONS}-{MAX_SELECTIONS}
              </span>
              {canProceed && (
                <span className="text-red-600 text-xl">✓</span>
              )}
              {isMaxReached && (
                <span className="text-orange-600 text-sm">(الحد الأقصى)</span>
              )}
            </div>
          </motion.div>
        )}

        {/* Perfumes Grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {perfumes.slice(0, 12).map((perfume, index) => (
            <motion.div
              key={perfume.id}
              variants={cardItem}
              custom={index}
            >
              <PerfumeCard
                variant={perfume.variant}
                title={perfume.name}
                brand={perfume.brand}
                matchPercentage={perfume.matchPercentage ?? perfume.score ?? 0}
                price={perfume.price}
                originalPrice={perfume.originalPrice}
                imageUrl={perfume.image}
                description={perfume.description}
                isSafe={perfume.isSafe}
                isSelected={selectedPerfumes.includes(perfume.id)}
                onSelect={() => togglePerfume(perfume.id)}
                selectionType="disliked"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-brown-text/10">
          <button
            onClick={() => router.push('/quiz/step1-favorites')}
            aria-label="العودة للخطوة السابقة"
            className="px-8 py-3 text-brown-text border-2 border-brown-text/30 rounded-2xl font-tajawal-bold hover:bg-brown-text hover:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
            رجوع
          </button>

          <CTAButton
            variant={canProceed ? "primary" : "disabled"}
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {canProceed ? (
              <>
                التالي
                <ChevronLeft className="w-5 h-5 inline mr-2" aria-hidden="true" />
              </>
            ) : selectedPerfumes.length < MIN_SELECTIONS ? (
              `اختر ${MIN_SELECTIONS} عطور على الأقل`
            ) : (
              `الحد الأقصى ${MAX_SELECTIONS} عطور`
            )}
          </CTAButton>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-brown-text/60">
            💡 يمكنك تخطي هذه الخطوة إذا لم تكن هناك عطور تكرهها
          </p>
        </motion.div>
      </div>
    </div>
  )
}
