"use client"
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Step3Allergy } from '@/components/quiz/Step3Allergy'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useQuiz } from '@/contexts/QuizContext'

interface AllergyData {
  level1: string[]
  level2: string[]
  level3: string[]
}

export default function Step3AllergyPage() {
  const router = useRouter()
  const { data, setStep } = useQuiz()
  const [isPending, startTransition] = useTransition()
  
  // Convert context format to component format
  const [allergy, setAllergy] = useState<AllergyData>(() => ({
    level1: data.step3_allergy?.symptoms || [],
    level2: data.step3_allergy?.families || [],
    level3: data.step3_allergy?.ingredients || []
  }))

  const updateAllergy = (newAllergy: AllergyData) => {
    setAllergy(newAllergy)
    // Update context
    setStep('step3_allergy', {
      symptoms: newAllergy.level1,
      families: newAllergy.level2,
      ingredients: newAllergy.level3
    })
  }

  const handleNext = () => {
    startTransition(() => {
      router.push('/results')
    })
  }

  const handleBack = () => {
    startTransition(() => {
      router.push('/quiz/step2-disliked')
    })
  }

  return (
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      {isPending && (
        <div className="fixed inset-0 bg-cream-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <LoadingSpinner type={3} message="جاري الانتقال..." size="lg" />
        </div>
      )}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator - Step 3/3 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>

        {/* Step 3 Allergy Component */}
        <Step3Allergy
          allergy={allergy}
          updateAllergy={updateAllergy}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </div>
  )
}
