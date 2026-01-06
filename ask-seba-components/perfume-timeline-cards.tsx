/**
 * ⚠️ مرجع قديم: هذا الملف مرجع قديم وقد لا يطابق الكود الحالي.
 * تم تحديثه آخر مرة في 2026-01-04.
 * يرجى الرجوع إلى الكود الفعلي في `src/components/ui/PerfumeTimeline.tsx` للاطلاع على التطبيق الحالي.
 */

import React, { useState } from 'react';

interface TimelineStageProps {
  stage: string
  icon: string
  title: string
  subtitle: string
  notes: string
  matchPercentage: number
  status: string
  bgColor: string
  delay?: number
}

const TimelineStage = ({ 
  stage, 
  icon, 
  title, 
  subtitle,
  notes, 
  matchPercentage, 
  status,
  bgColor,
  delay = 0 
}: TimelineStageProps) => {
  const getStatusColor = () => {
    if (matchPercentage >= 90) return { bg: 'bg-green-100', text: 'text-green-600', bar: 'bg-green-500' };
    if (matchPercentage >= 80) return { bg: 'bg-orange-100', text: 'text-orange-600', bar: 'bg-orange-500' };
    return { bg: 'bg-red-100', text: 'text-red-600', bar: 'bg-red-500' };
  };

  const colors = getStatusColor();

  return (
    <div 
      className="w-[320px] h-[120px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#5B4233]/5 p-4 flex gap-4 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300 group"
      style={{ 
        animation: `fadeInUp 0.5s ease-out ${delay}s both`,
        fontFamily: '"Noto Sans Arabic", "Manrope", sans-serif'
      }}
    >
      {/* Icon Section */}
      <div className={`w-20 h-full ${bgColor} rounded-xl flex flex-col items-center justify-center gap-1 shrink-0 group-hover:scale-105 transition-transform`}>
        <span className="text-3xl">{icon}</span>
        <span className="text-[10px] font-bold text-[#5B4233]/70 uppercase">{stage}</span>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-base font-bold text-[#5B4233] leading-tight truncate">{title}</h4>
            <p className="text-[10px] text-[#5B4233]/60">{subtitle}</p>
          </div>
          <div className={`${colors.bg} ${colors.text} px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shrink-0`}>
            {matchPercentage}%
          </div>
        </div>

        {/* Notes */}
        <p className="text-xs text-[#5B4233]/70 leading-tight truncate">{notes}</p>

        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[#5B4233]/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colors.bar} rounded-full transition-all duration-1000`}
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
          <span className="text-[10px] font-medium text-[#5B4233]/60">{status}</span>
        </div>
      </div>
    </div>
  );
};

interface PerfumeTimelineProps {
  variant?: 'safe' | 'warning' | 'danger'
}

const PerfumeTimeline = ({ variant = 'safe' }: PerfumeTimelineProps) => {
  const timelineData = {
    safe: [
      {
        stage: 'Top',
        icon: '🌅',
        title: 'الافتتاحية',
        subtitle: '0-30 دقيقة',
        notes: 'برغموت • فلفل • ليمون',
        matchPercentage: 92,
        status: 'ممتاز ✨',
        bgColor: 'bg-yellow-50'
      },
      {
        stage: 'Heart',
        icon: '💙',
        title: 'القلب',
        subtitle: '2-4 ساعات',
        notes: 'لافندر • باتشولي • جيرانيوم',
        matchPercentage: 88,
        status: 'رائع 🌟',
        bgColor: 'bg-blue-50'
      },
      {
        stage: 'Base',
        icon: '🎯',
        title: 'القاعدة',
        subtitle: '4+ ساعات',
        notes: 'أمبروكسان • أرز • فيتيفر',
        matchPercentage: 90,
        status: 'مثالي 👌',
        bgColor: 'bg-green-50'
      }
    ],
    warning: [
      {
        stage: 'Top',
        icon: '🌅',
        title: 'الافتتاحية',
        subtitle: '0-30 دقيقة',
        notes: 'جريب فروت • زنجبيل • نعناع',
        matchPercentage: 85,
        status: 'جيد',
        bgColor: 'bg-yellow-50'
      },
      {
        stage: 'Heart',
        icon: '💙',
        title: 'القلب',
        subtitle: '2-4 ساعات',
        notes: 'ياسمين • ورد • قرنفل',
        matchPercentage: 75,
        status: 'متوسط ⚠️',
        bgColor: 'bg-orange-50'
      },
      {
        stage: 'Base',
        icon: '🎯',
        title: 'القاعدة',
        subtitle: '4+ ساعات',
        notes: 'عنبر • مسك • صندل',
        matchPercentage: 82,
        status: 'جيد',
        bgColor: 'bg-green-50'
      }
    ],
    danger: [
      {
        stage: 'Top',
        icon: '🌅',
        title: 'الافتتاحية',
        subtitle: '0-30 دقيقة',
        notes: 'ليمون • بهارات • فلفل أسود',
        matchPercentage: 78,
        status: 'جيد',
        bgColor: 'bg-yellow-50'
      },
      {
        stage: 'Heart',
        icon: '💙',
        title: 'القلب',
        subtitle: '2-4 ساعات',
        notes: 'الياسمين (حساسية) • ورد',
        matchPercentage: 65,
        status: 'تحذير ⚠️',
        bgColor: 'bg-red-50'
      },
      {
        stage: 'Base',
        icon: '🎯',
        title: 'القاعدة',
        subtitle: '4+ ساعات',
        notes: 'عود • فانيليا • تونكا',
        matchPercentage: 72,
        status: 'متوسط',
        bgColor: 'bg-orange-50'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center p-8" style={{ fontFamily: '"Noto Sans Arabic", "Manrope", sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-[#c0841a]/10 rounded-full mb-4">
          <span className="text-[#c0841a] text-sm font-bold tracking-wider uppercase">Component Library</span>
        </div>
        <h1 className="text-4xl font-bold text-[#5B4233] mb-2">Perfume Timeline Component</h1>
        <p className="text-[#5B4233]/70 text-lg">رحلة العطر | 320×120px Cards Format</p>
      </div>

      {/* Variant Selector */}
      <div className="flex gap-3 mb-12">
        {['safe', 'warning', 'danger'].map(v => (
          <button
            key={v}
            onClick={() => {}}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              variant === v
                ? 'bg-[#5B4233] text-white shadow-lg'
                : 'bg-white text-[#5B4233]/60 hover:text-[#5B4233] border border-[#5B4233]/10'
            }`}
          >
            {v === 'safe' && '✅ Safe (90%+)'}
            {v === 'warning' && '⚠️ Warning (80-89%)'}
            {v === 'danger' && '🚫 Danger (<80%)'}
          </button>
        ))}
      </div>

      {/* Timeline Display */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#5B4233]/5 mb-8">
        <div className="flex flex-col gap-8 items-center">
          <h3 className="text-2xl font-bold text-[#5B4233]">
            {variant === 'safe' && 'Safe Timeline Example'}
            {variant === 'warning' && 'Warning Timeline Example'}
            {variant === 'danger' && 'Danger Timeline Example'}
          </h3>
          
          {/* Vertical Stack of Cards */}
          <div className="flex flex-col gap-6">
            {timelineData[variant].map((stage, index) => (
              <TimelineStage key={index} {...stage} delay={index * 0.2} />
            ))}
          </div>

          {/* Connection Lines */}
          <div className="absolute left-[60px] top-[140px] bottom-[140px] w-0.5 bg-gradient-to-b from-[#c0841a] via-[#c0841a]/50 to-[#c0841a] opacity-20 pointer-events-none" 
               style={{ height: 'calc(100% - 280px)' }} />
        </div>
      </div>

      {/* All Variants Comparison */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#5B4233]/5 w-full max-w-6xl">
        <h3 className="text-xl font-bold text-[#5B4233] mb-6 text-center">All Variants Comparison</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(timelineData).map(([key, stages]) => (
            <div key={key} className="flex flex-col gap-4 items-center">
              <div className="text-center mb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  key === 'safe' ? 'bg-green-100 text-green-600' :
                  key === 'warning' ? 'bg-orange-100 text-orange-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {key.toUpperCase()}
                </span>
              </div>
              {stages.map((stage, index) => (
                <div key={index} className="scale-90 origin-top">
                  <TimelineStage {...stage} delay={0} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specs */}
      <div className="mt-8 max-w-3xl">
        <div className="bg-[#c0841a]/10 border border-[#c0841a]/20 rounded-2xl p-6">
          <h4 className="font-bold text-[#5B4233] mb-3 text-lg">Component Specs:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Card Size:</strong>
              <p className="text-[#5B4233]/70">320×120px (as per Brief)</p>
            </div>
            <div>
              <strong>Stages:</strong>
              <p className="text-[#5B4233]/70">3 (Top, Heart, Base)</p>
            </div>
            <div>
              <strong>Animation:</strong>
              <p className="text-[#5B4233]/70">Sequential reveal (0.2s delay)</p>
            </div>
            <div>
              <strong>Variants:</strong>
              <p className="text-[#5B4233]/70">Safe / Warning / Danger</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#c0841a]/20">
            <strong className="block mb-2">Usage:</strong>
            <ul className="text-sm text-[#5B4233]/70 space-y-1 list-disc list-inside">
              <li>يظهر في صفحة تفاصيل العطر (Desktop & Mobile)</li>
              <li>على Desktop: 3 Cards عمودية متصلة بخط</li>
              <li>على Mobile: Stacked بدون خط</li>
              <li>Match percentage يحدد الألوان تلقائياً</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const TimelineDemo = () => {
  const [variant, setVariant] = useState<'safe' | 'warning' | 'danger'>('safe');

  return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center p-8" style={{ fontFamily: '"Noto Sans Arabic", "Manrope", sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 bg-[#c0841a]/10 rounded-full mb-4">
          <span className="text-[#c0841a] text-sm font-bold tracking-wider uppercase">Component Library</span>
        </div>
        <h1 className="text-4xl font-bold text-[#5B4233] mb-2">Perfume Timeline Component</h1>
        <p className="text-[#5B4233]/70 text-lg">رحلة العطر | 320×120px Cards Format</p>
      </div>

      {/* Variant Selector */}
      <div className="flex gap-3 mb-12">
        <button
          onClick={() => setVariant('safe')}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
            variant === 'safe'
              ? 'bg-[#5B4233] text-white shadow-lg'
              : 'bg-white text-[#5B4233]/60 hover:text-[#5B4233] border border-[#5B4233]/10'
          }`}
        >
          ✅ Safe (90%+)
        </button>
        <button
          onClick={() => setVariant('warning')}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
            variant === 'warning'
              ? 'bg-[#5B4233] text-white shadow-lg'
              : 'bg-white text-[#5B4233]/60 hover:text-[#5B4233] border border-[#5B4233]/10'
          }`}
        >
          ⚠️ Warning (80-89%)
        </button>
        <button
          onClick={() => setVariant('danger')}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
            variant === 'danger'
              ? 'bg-[#5B4233] text-white shadow-lg'
              : 'bg-white text-[#5B4233]/60 hover:text-[#5B4233] border border-[#5B4233]/10'
          }`}
        >
          🚫 Danger (&lt;80%)
        </button>
      </div>

      <PerfumeTimeline variant={variant} />
    </div>
  );
};

export default TimelineDemo;