export default function QuizPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-brown-text mb-6">صبا - بصمتك العطرية</h1>
      <p className="text-xl text-brown-text/80 mb-12 max-w-md text-center leading-relaxed">
        اكتشف العطور المثالية لك من خلال اختبار بسيط
      </p>
      <a 
        href="/quiz/step1-favorites"
        className="min-h-[44px] bg-gradient-to-r from-primary to-accent-yellow text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all inline-flex items-center gap-3 touch-manipulation"
      >
        ابدأ الاختبار
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}
