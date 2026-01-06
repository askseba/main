/**
 * ⚠️ مرجع قديم: هذا الملف مرجع قديم وقد لا يطابق الكود الحالي.
 * تم تحديثه آخر مرة في 2026-01-04.
 * يرجى الرجوع إلى الكود الفعلي في `src/components/LoadingSpinner.tsx` للاطلاع على التطبيق الحالي.
 */

import React, { useState } from 'react';

const LoadingSpinner = () => {
  const [activeType, setActiveType] = useState('type3');

  const spinners = [
    {
      id: 'type1',
      title: 'Type 1: Pulsing Circles',
      description: 'دوائر متحدة المركز نابضة',
      component: (
        <div className="relative flex items-center justify-center w-64 h-64">
          <div className="absolute h-64 w-64 animate-pulse rounded-full bg-[#c0841a]/5 blur-3xl"></div>
          <div className="absolute h-32 w-32 animate-ping rounded-full bg-[#c0841a]/20 duration-[3000ms]"></div>
          <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#c0841a]/40"></div>
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#c0841a] to-[#f3b956] shadow-[0_0_40px_rgba(236,156,19,0.4)] ring-4 ring-white/40">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )
    },
    {
      id: 'type2',
      title: 'Type 2: Progress Bar',
      description: 'شريط تقدم خطي متحرك',
      component: (
        <div className="relative flex flex-col items-center justify-center w-full max-w-md gap-8">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#c0841a] shadow-[0_0_25px_rgba(236,156,19,0.5)]">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="w-full max-w-[180px]">
            <div className="h-1 w-full rounded-full bg-[#5B4233]/10 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-[#c0841a] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <p className="text-xs text-[#5B4233]/60 font-medium tracking-widest uppercase">جاري التحليل...</p>
        </div>
      )
    },
    {
      id: 'type3',
      title: 'Type 3: Bouncing Dots',
      description: 'نقاط متحركة صعوداً ونزولاً (جديد)',
      component: (
        <div className="relative flex flex-col items-center justify-center gap-12">
          {/* Main Icon */}
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-[0_0_30px_rgba(193,132,26,0.3)]">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>

          {/* Bouncing Dots */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-lg animate-[bounce_1s_infinite_0ms]"></div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-lg animate-[bounce_1s_infinite_200ms]"></div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-lg animate-[bounce_1s_infinite_400ms]"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <p className="text-lg font-bold text-[#5B4233] mb-1">جاري البحث عن عطرك المثالي...</p>
            <p className="text-sm text-[#5B4233]/60">نحلل تفضيلاتك لاختيار الأنسب لك</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-[#c0841a] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[#c0841a]/50 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-[#c0841a]/30 animate-pulse delay-150"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center p-8" style={{ fontFamily: '"Noto Sans Arabic", "Manrope", sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-[#c0841a]/10 rounded-full mb-4">
          <span className="text-[#c0841a] text-sm font-bold tracking-wider uppercase">Component Library</span>
        </div>
        <h1 className="text-4xl font-bold text-[#5B4233] mb-2">LoadingSpinner Component</h1>
        <p className="text-[#5B4233]/70 text-lg">3 Types | Including New Type 3</p>
      </div>

      {/* Type Selector */}
      <div className="flex gap-3 mb-12 flex-wrap justify-center">
        {spinners.map(spinner => (
          <button
            key={spinner.id}
            onClick={() => setActiveType(spinner.id)}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              activeType === spinner.id
                ? 'bg-[#5B4233] text-white shadow-lg'
                : 'bg-white text-[#5B4233]/60 hover:text-[#5B4233] border border-[#5B4233]/10'
            }`}
          >
            {spinner.title}
          </button>
        ))}
      </div>

      {/* Active Spinner Display */}
      <div className="bg-white rounded-3xl shadow-2xl p-16 mb-8 border border-[#5B4233]/5 min-w-[500px] min-h-[400px] flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-[#5B4233] mb-2">
            {spinners.find(s => s.id === activeType)?.title}
          </h3>
          <p className="text-[#5B4233]/60 text-sm">
            {spinners.find(s => s.id === activeType)?.description}
          </p>
        </div>

        {/* The Actual Spinner */}
        <div className="flex-1 flex items-center justify-center w-full">
          {spinners.find(s => s.id === activeType)?.component}
        </div>

        {/* Specs */}
        <div className="w-full mt-8 pt-6 border-t border-[#5B4233]/10">
          <h4 className="text-sm font-bold text-[#5B4233] mb-3">Technical Specs:</h4>
          <div className="grid grid-cols-2 gap-3 text-xs text-[#5B4233]/70">
            <div className="flex justify-between">
              <span>Animation:</span>
              <span className="font-bold">
                {activeType === 'type1' && 'Pulse + Ping'}
                {activeType === 'type2' && 'Shimmer (2s)'}
                {activeType === 'type3' && 'Bounce (1s)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Colors:</span>
              <span className="font-bold">Gradient Primary</span>
            </div>
            <div className="flex justify-between">
              <span>Use Case:</span>
              <span className="font-bold">
                {activeType === 'type1' && 'Initial Load'}
                {activeType === 'type2' && 'Analysis'}
                {activeType === 'type3' && 'Processing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-bold">
                {activeType === 'type1' && '3s loop'}
                {activeType === 'type2' && '2s loop'}
                {activeType === 'type3' && '1s loop'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Types Preview */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#5B4233]/5 w-full max-w-5xl">
        <h3 className="text-xl font-bold text-[#5B4233] mb-6 text-center">All Types Preview</h3>
        <div className="grid grid-cols-3 gap-6">
          {spinners.map(spinner => (
            <div key={spinner.id} className="flex flex-col items-center gap-4 p-6 rounded-xl bg-[#F2F0EB]/50 min-h-[300px]">
              <div className="flex-1 flex items-center justify-center w-full">
                <div className="scale-75">
                  {spinner.component}
                </div>
              </div>
              <span className="text-xs text-[#5B4233]/60 font-medium text-center">{spinner.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Note */}
      <div className="mt-8 max-w-2xl text-center">
        <div className="bg-[#c0841a]/10 border border-[#c0841a]/20 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div className="text-right">
              <h4 className="font-bold text-[#5B4233] mb-2">When to Use:</h4>
              <ul className="text-sm text-[#5B4233]/70 space-y-1 list-disc list-inside">
                <li><strong>Type 1:</strong> شاشة التحميل الأولية (قبل دخول التطبيق)</li>
                <li><strong>Type 2:</strong> تحليل البيانات مع Progress Bar</li>
                <li><strong>Type 3:</strong> معالجة النتائج أو البحث المتقدم</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(150%); }
        }
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;