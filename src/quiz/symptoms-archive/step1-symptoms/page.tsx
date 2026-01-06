"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SymptomCard } from '@/quiz/symptoms-archive/SymptomCard'
import { SYMPTOMS } from '@/quiz/symptoms-archive/symptoms'
import { CTAButton } from '@/components/ui/CTAButton'

export default function Step1SymptomsPage() {
  const router = useRouter()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const handleNext = () => {
    // Save to localStorage or state management
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz-symptoms', JSON.stringify(selectedSymptoms))
    }
    // Navigate to next step (adjust route as needed)
    router.push('/quiz/step2-preferences')
  }

  const canProceed = selectedSymptoms.length > 0

  return (
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
          <div className="w-3 h-3 rounded-full bg-brown-text/20" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-tajawal-bold text-4xl md:text-5xl text-brown-text mb-4">
            ما هي حالة بشرتك؟
          </h1>
          <p className="text-xl text-brown-text/70 max-w-2xl mx-auto">
            اختر جميع الأعراض أو الحالات التي تنطبق عليك. هذا يساعدنا في اختيار العطور الآمنة لك
          </p>
        </motion.div>

        {/* Selection Counter */}
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
              <span className="font-tajawal-bold text-lg text-brown-text">
                {selectedSymptoms.length} {selectedSymptoms.length === 1 ? 'حالة محددة' : 'حالات محددة'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Symptoms Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {SYMPTOMS.map((symptom, index) => (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SymptomCard
                symptom={symptom}
                isSelected={selectedSymptoms.includes(symptom.id)}
                onClick={() => toggleSymptom(symptom.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-brown-text/10">
          <button
            onClick={() => router.push('/')}
            aria-label="العودة للصفحة الرئيسية"
            className="px-8 py-3 text-brown-text border-2 border-brown-text/30 rounded-2xl font-tajawal-bold hover:bg-brown-text hover:text-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" aria-hidden="true" />
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
                <ChevronLeft className="w-5 h-5 inline me-2 rtl:rotate-180" aria-hidden="true" />
              </>
            ) : (
              'اختر حالة واحدة على الأقل'
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
            💡 يمكنك اختيار أكثر من حالة. كلما كانت المعلومات دقيقة، كانت التوصيات أفضل
          </p>
        </motion.div>
      </div>
    </div>
  )
}
