// VALUE_LADDER - File 14/20: src/app/pricing/page.tsx
// ✅ COMPLETE PRICING PAGE
// 🎯 Shows Free, Monthly, and Yearly plans

'use client'
import { useState } from 'react'
import { Check, Crown, Zap, TrendingUp, Users, Bell, History, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { logConversionEvent } from '@/lib/gating'

export default function PricingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  
  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    if (!session) {
      // Log conversion event
      await logConversionEvent('pricing_signup_clicked', undefined, {
        plan,
        fromTier: 'GUEST'
      })
      signIn()
      return
    }
    if (isProcessing) return  // Double-click protection
    
    setIsProcessing(true)
    setCheckoutError(null)
    
    try {
      // Log conversion event
      await logConversionEvent('pricing_subscribe_clicked', session.user.id, {
        plan,
        fromTier: 'FREE',
        toTier: 'PREMIUM'
      })
      
      // TODO: Redirect to payment (Stripe/Paddle)
      router.push(`/checkout?plan=${plan}`)
    } catch (error) {
      setCheckoutError('فشل إنشاء جلسة الدفع. حاول مرة أخرى.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-bg via-white to-primary/5 py-16 px-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-brown-text mb-4">
            اختر خطتك المثالية
          </h1>
          <p className="text-xl text-brown-text/75 mb-8">
            ابدأ مجاناً، ثم ارتقِ لتجربة كاملة
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-brown-text hover:bg-gray-50'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl font-bold transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-brown-text hover:bg-gray-50'
              }`}
            >
              سنوي
              <span className="absolute -top-2 -left-2 bg-safe-green text-white text-xs px-2 py-0.5 rounded-full font-bold">
                وفّر 17%
              </span>
            </button>
          </div>
        </motion.div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200"
          >
            <div className="text-center mb-6">
              <Zap className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brown-text mb-2">مجاني</h3>
              <div className="text-4xl font-black text-brown-text mb-2">0 ريال</div>
              <p className="text-brown-text/60">للأبد</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>اختباران شهرياً</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>5 نتائج لكل اختبار</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>حفظ المفضلات</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>Scent DNA الشخصي</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>تنبيه سعر واحد</span>
              </li>
            </ul>
            
            <button
              onClick={() => !session && signIn()}
              className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                session
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-brown-text'
              }`}
              disabled={!!session}
            >
              {session ? 'خطتك الحالية' : 'ابدأ مجاناً'}
            </button>
          </motion.div>
          
          {/* Premium Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary to-amber-600 rounded-3xl p-8 shadow-2xl border-2 border-amber-500 relative transform scale-105"
          >
            <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              الأكثر شعبية
            </div>
            
            <div className="text-center mb-6 text-white">
              <Crown className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">مميز شهري</h3>
              <div className="text-4xl font-black mb-2">
                {billingCycle === 'monthly' ? '15' : '12.5'}
                <span className="text-xl mr-1">ريال/شهر</span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-white/80 text-sm">يُدفع 150 ريال سنوياً</p>
              )}
            </div>
            
            <ul className="space-y-3 mb-8 text-white">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">اختبارات غير محدودة</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">12 نتيجة لكل اختبار</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">مقارنة أسعار شاملة</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">تنبيهات أسعار غير محدودة</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">سجل اختباراتك الكامل</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-medium">دعم أولوية</span>
              </li>
            </ul>
            
            {checkoutError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="text-sm text-red-700 mb-3">{checkoutError}</p>
                <button 
                  onClick={() => handleSubscribe(billingCycle)}
                  disabled={isProcessing}
                  className="text-sm text-red-600 hover:text-red-700 underline"
                >
                  حاول مرة أخرى
                </button>
              </div>
            )}
            
            <button
              onClick={() => handleSubscribe(billingCycle)}
              disabled={isProcessing}
              className="w-full py-3 px-6 bg-white text-primary hover:bg-gray-50 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>⏳ جاري المعالجة...</>
              ) : (
                'اشترك الآن'
              )}
            </button>
            
            <p className="text-white/80 text-xs text-center mt-4">
              إلغاء في أي وقت • ضمان استرجاع خلال 7 أيام
            </p>
          </motion.div>
          
          {/* Free Trial Info (if implementing) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-primary/20"
          >
            <div className="text-center mb-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brown-text mb-2">للشركات</h3>
              <div className="text-4xl font-black text-brown-text mb-2">مخصص</div>
              <p className="text-brown-text/60">حسب الطلب</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>كل مميزات الباقة المميزة</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>حسابات متعددة للفريق</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>تقارير وتحليلات مخصصة</span>
              </li>
              <li className="flex items-start gap-2 text-brown-text">
                <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                <span>دعم مخصص</span>
              </li>
            </ul>
            
            <button
              onClick={() => router.push('/contact?type=enterprise')}
              className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all"
            >
              تواصل معنا
            </button>
          </motion.div>
        </div>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-brown-text text-center mb-8">
            الأسئلة الشائعة
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-right"
      >
        <h3 className="text-lg font-bold text-brown-text">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-brown-text" />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="text-brown-text/75 mt-4 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  )
}

const faqs = [
  {
    question: 'هل التسجيل مجاني حقاً؟',
    answer: 'نعم! التسجيل مجاني 100% ولا يتطلب بطاقة ائتمان. تحصل على اختبارين مجانيين شهرياً مع 5 نتائج لكل اختبار.'
  },
  {
    question: 'ماذا يحدث بعد استنفاذ الاختبارات المجانية؟',
    answer: 'يمكنك الانتظار حتى بداية الشهر التالي لتجديد اختباراتك المجانية، أو الاشتراك في الباقة المميزة للحصول على اختبارات غير محدودة.'
  },
  {
    question: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
    answer: 'بالتأكيد! يمكنك إلغاء اشتراكك في أي وقت من إعدادات حسابك. لن يتم خصم أي رسوم بعد الإلغاء.'
  },
  {
    question: 'ما هو ضمان استرجاع المال؟',
    answer: 'نقدم ضمان استرجاع كامل خلال 7 أيام من الاشتراك. إذا لم تكن راضياً، سنعيد لك المبلغ كاملاً دون أسئلة.'
  },
  {
    question: 'كيف تعمل مقارنة الأسعار؟',
    answer: 'نجمع أسعار العطور من متاجر متعددة (سيفورا، نون، أمازون، إلخ) ونعرض لك أفضل الأسعار المتاحة. مميز حصرياً لمشتركي الباقة المميزة.'
  }
]
