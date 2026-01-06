/**
 * ⚠️ مرجع قديم: هذا الملف مرجع قديم وقد لا يطابق الكود الحالي.
 * تم تحديثه آخر مرة في 2026-01-04.
 * يرجى الرجوع إلى الكود الفعلي في `src/components/ui/CTAButton.tsx` للاطلاع على التطبيق الحالي.
 * 
 * ⚠️ Deprecated:
 * - variant "skip" تم استبداله بـ "tertiary" في الكود الحالي
 */

import React, { useState } from 'react';

const CTAButton = () => {
  const [activeState, setActiveState] = useState('primary');

  const buttons = [
    {
      id: 'primary',
      title: 'Primary State',
      label: 'اكتشف عطرك',
      description: 'الزر الأساسي مع Gradient',
      className: 'relative flex items-center justify-center w-[200px] h-[48px] rounded-full bg-gradient-to-r from-[#2f6f73] to-[#c0841a] text-[#291d12] font-bold text-[15px] tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(193,132,26,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group',
      icon: '←'
    },
    {
      id: 'secondary',
      title: 'Secondary State',
      label: 'تعديل التفضيلات',
      description: 'زر ثانوي شفاف مع Border',
      className: 'relative flex items-center justify-center w-[200px] h-[48px] rounded-full bg-transparent border-[1.5px] border-[#c0841a] text-[#c0841a] font-semibold text-[15px] tracking-wide hover:bg-[#c0841a]/5 active:bg-[#c0841a]/10 transition-all duration-200 cursor-pointer',
      icon: '⚙'
    },
    {
      id: 'disabled',
      title: 'Disabled State',
      label: 'تابع',
      description: 'زر معطل (غير قابل للنقر)',
      className: 'relative flex items-center justify-center w-[200px] h-[48px] rounded-full bg-[#c0841a]/20 text-[#c0841a]/60 font-bold text-[15px] tracking-wide cursor-not-allowed',
      icon: null
    },
    {
      id: 'skip',
      title: 'Skip State',
      label: 'تخطي',
      description: 'زر التخطي (Step2Disliked)',
      className: 'relative flex items-center justify-center w-[200px] h-[48px] rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl transition-all duration-200 cursor-pointer active:scale-95',
      icon: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center p-8" style={{ fontFamily: '"Noto Sans Arabic", "Manrope", sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-[#c0841a]/10 rounded-full mb-4">
          <span className="text-[#c0841a] text-sm font-bold tracking-wider uppercase">Component Library</span>
        </div>
        <h1 className="text-4xl font-bold text-[#5B4233] mb-2">CTAButton Component</h1>
        <p className="text-[#5B4233]/70 text-lg">4 States | All Variants</p>
      </div>

      {/* State Selector */}
      <div className="flex gap-3 mb-12 flex-wrap justify-center">
        {buttons.map(btn => (
          <button
            key={btn.id}
            onClick={() => setActiveState(btn.id)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              activeState === btn.id
                ? 'bg-[#5B4233] text-white shadow-lg'
                : 'bg-white text-[#5B4233]/60 hover:text-[#5B4233] border border-[#5B4233]/10'
            }`}
          >
            {btn.title}
          </button>
        ))}
      </div>

      {/* Active Button Display */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 border border-[#5B4233]/5 min-w-[400px]">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-[#5B4233] mb-2">
              {buttons.find(b => b.id === activeState)?.title}
            </h3>
            <p className="text-[#5B4233]/60 text-sm">
              {buttons.find(b => b.id === activeState)?.description}
            </p>
          </div>

          {/* The Actual Button */}
          <button
            className={buttons.find(b => b.id === activeState)?.className}
            disabled={activeState === 'disabled'}
          >
            {activeState === 'primary' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative">{buttons.find(b => b.id === activeState)?.label}</span>
                <span className="relative mr-2 text-[20px] transition-transform duration-300 group-hover:-translate-x-1">
                  {buttons.find(b => b.id === activeState)?.icon}
                </span>
              </>
            )}
            {activeState === 'secondary' && (
              <>
                <span className="mr-2 text-[20px]">{buttons.find(b => b.id === activeState)?.icon}</span>
                <span>{buttons.find(b => b.id === activeState)?.label}</span>
              </>
            )}
            {(activeState === 'disabled' || activeState === 'skip') && (
              <span>{buttons.find(b => b.id === activeState)?.label}</span>
            )}
          </button>

          {/* Specs */}
          <div className="w-full mt-6 pt-6 border-t border-[#5B4233]/10">
            <h4 className="text-sm font-bold text-[#5B4233] mb-3">Technical Specs:</h4>
            <div className="space-y-2 text-xs text-[#5B4233]/70 font-mono">
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="font-bold">200×48px</span>
              </div>
              <div className="flex justify-between">
                <span>Border Radius:</span>
                <span className="font-bold">9999px (full)</span>
              </div>
              <div className="flex justify-between">
                <span>Font:</span>
                <span className="font-bold">Noto Sans Arabic</span>
              </div>
              {activeState === 'primary' && (
                <div className="flex justify-between">
                  <span>Gradient:</span>
                  <span className="font-bold">#2f6f73 → #c0841a</span>
                </div>
              )}
              {activeState === 'secondary' && (
                <div className="flex justify-between">
                  <span>Border:</span>
                  <span className="font-bold">1.5px solid #c0841a</span>
                </div>
              )}
              {activeState === 'disabled' && (
                <div className="flex justify-between">
                  <span>Opacity:</span>
                  <span className="font-bold">bg: 20%, text: 60%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* All States Preview */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#5B4233]/5">
        <h3 className="text-xl font-bold text-[#5B4233] mb-6 text-center">All States Preview</h3>
        <div className="grid grid-cols-2 gap-6">
          {buttons.map(btn => (
            <div key={btn.id} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#F2F0EB]/50">
              <button
                className={btn.className}
                disabled={btn.id === 'disabled'}
              >
                {btn.id === 'primary' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="relative">{btn.label}</span>
                    <span className="relative mr-2 text-[20px]">{btn.icon}</span>
                  </>
                )}
                {btn.id === 'secondary' && (
                  <>
                    <span className="mr-2 text-[20px]">{btn.icon}</span>
                    <span>{btn.label}</span>
                  </>
                )}
                {(btn.id === 'disabled' || btn.id === 'skip') && (
                  <span>{btn.label}</span>
                )}
              </button>
              <span className="text-xs text-[#5B4233]/60 font-medium">{btn.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Note */}
      <div className="mt-8 max-w-2xl text-center">
        <div className="bg-[#c0841a]/10 border border-[#c0841a]/20 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="text-right">
              <h4 className="font-bold text-[#5B4233] mb-2">Usage Guidelines:</h4>
              <ul className="text-sm text-[#5B4233]/70 space-y-1 list-disc list-inside">
                <li>استخدم Primary للإجراءات الرئيسية</li>
                <li>استخدم Secondary للإجراءات الثانوية</li>
                <li>Disabled يظهر تلقائياً عند عدم استيفاء الشروط</li>
                <li>Skip حصري لخطوة {'"'}العطور المكروهة{'"'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default CTAButton;