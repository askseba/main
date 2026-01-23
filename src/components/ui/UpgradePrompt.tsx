// Phase 2 - File 1/3: src/components/ui/UpgradePrompt.tsx
// ✅ COMPLETE FILE - Ready for copy-paste
// 🆕 NEW COMPONENT - Shows after 10 results for guests

'use client'
import { Lock, Star, Sparkles, ArrowLeft } from 'lucide-react'
import { signIn } from 'next-auth/react'

interface UpgradePromptProps {
  className?: string
}

export function UpgradePrompt({ className = '' }: UpgradePromptProps) {
  return (
    <div 
      className={`relative bg-gradient-to-br from-primary/5 via-amber-500/5 to-primary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-xl overflow-hidden ${className}`}
      dir="rtl"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-4 right-4 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-4 left-4 w-40 h-40 bg-amber-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-br from-primary to-amber-500 p-6 rounded-full">
              <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-3xl md:text-4xl font-black text-brown-text leading-tight">
            <span className="bg-gradient-to-l from-primary to-amber-600 bg-clip-text text-transparent">
              70 عطر إضافي
            </span>
            <br />
            ينتظرك! 🎁
          </h3>
          <div className="flex items-center justify-center gap-2 text-brown-text/75">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-lg font-medium">
              مخصصة لذوقك بنسبة 100%
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-bold text-brown-text">نتائج دقيقة</p>
            <p className="text-xs text-brown-text/60">بناءً على تفضيلاتك</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
            <div className="text-3xl mb-2">💾</div>
            <p className="text-sm font-bold text-brown-text">حفظ المفضلات</p>
            <p className="text-xs text-brown-text/60">في جميع الأجهزة</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-primary/10">
            <div className="text-3xl mb-2">🔔</div>
            <p className="text-sm font-bold text-brown-text">تنبيهات العروض</p>
            <p className="text-xs text-brown-text/60">لا تفوت الفرص</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={() => signIn()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Star className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>سجّل الآن مجاناً</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <p className="text-xs text-brown-text/50 mt-4">
            التسجيل مجاني 100% • لا حاجة لبطاقة ائتمان
          </p>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-brown-text/60">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              ✓
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              ✓
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              ✓
            </div>
          </div>
          <span>انضم لأكثر من 1,000+ مستخدم</span>
        </div>
      </div>
    </div>
  )
}
