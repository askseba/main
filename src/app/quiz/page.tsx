"use client"
import { CTAButton } from "@/components/ui/CTAButton"

export default function QuizStart() {
  return (
    <div className="min-h-screen bg-cream-bg flex items-center justify-center" dir="rtl">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-tajawal-bold text-brown-text mb-6">
          ابدأ رحلة العطور
        </h1>
        <p className="text-lg text-brown-text/70 mb-8">
          خطوة 1 قيد التطوير - عطور المحبوبة قريبًا
        </p>
        <CTAButton href="/quiz/step1-favorites" variant="primary">
          ابدأ الاختبار
        </CTAButton>
      </div>
    </div>
  )
}
