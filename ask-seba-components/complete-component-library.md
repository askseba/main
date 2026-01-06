# Ask Seba - Component Library

> **⚠️ مرجع قديم:** هذا الملف مرجع قديم وقد لا يطابق الكود الحالي. تم تحديثه آخر مرة في 2026-01-04. يرجى الرجوع إلى الكود الفعلي في `src/components/` للاطلاع على التطبيق الحالي.

**Version:** 2.0  
**Date:** 2026-01-04  
**Total Components:** 13  

---

## 📚 Component Index

| # | Component | Variants | Status | Found In |
|---|-----------|----------|--------|----------|
| 1 | Allergy Cards | 3 Levels | ✅ Complete | #1, #3, #4 |
| 2 | CTAButton | 4 States | ✅ Complete | #1, #2, #14 |
| 3 | ProgressStepper | 1 Type | ✅ Complete | #1, #3, #4 |
| 4 | Counter Badge | 1 Type | ✅ Complete | #9 |
| 5 | MatchBadge | 1 Type | ✅ Complete | #12, #13, #20 |
| 6 | LoadingSpinner | 3 Types | ✅ Complete | #5, #6 |
| 7 | Error State | 3 Types | ✅ Complete | #16, #17, #18 |
| 8 | Perfume Timeline | 3 Variants | ✅ Complete | #7, #19 |
| 9 | Radar Chart | 1 Type | ✅ Complete | #8 |
| 10 | Dashboard Header | 1 Type | ✅ Complete | #9 |
| 11 | Filter Sidebar | 1 Type | ✅ Complete | #11 |
| 12 | Circular Match Counter | 1 Type | ✅ Complete | #7, #12, #13, #19, #20 |
| 13 | PerfumeCard | 3 Variants | ✅ Complete | #12, #13, #20 |

---

## 🎨 Design System

### Colors
```css
:root {
  /* Primary Colors */
  --primary: #c0841a;
  --primary-light: #d68b0f;
  --primary-dark: #b0720a;
  
  /* Backgrounds */
  --background-light: #F2F0EB;
  --background-dark: #5B4233;
  --surface-light: #ffffff;
  --surface-dark: #2c241b;
  
  /* Text */
  --text-main-light: #5B4233;
  --text-main-dark: #ecebe9;
  --text-muted: #967c4f;
  
  /* Gradient */
  --gradient-start: #2f6f73;
  --gradient-end: #c0841a;
  
  /* Status Colors */
  --safe-green: #10B981;
  --warning-orange: #F59E0B;
  --danger-red: #EF4444;
}
```

### Typography
```css
/* Font Stack */
font-family: "Noto Sans Arabic", "Manrope", sans-serif;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

### Border Radius
```css
--radius-sm: 0.5rem;    /* 8px */
--radius-default: 1rem;  /* 16px */
--radius-lg: 1.5rem;     /* 24px */
--radius-xl: 2rem;       /* 32px */
--radius-2xl: 3rem;      /* 48px */
--radius-full: 9999px;   /* Full round */
```

---

## 📦 Component #1: Allergy Cards

### Overview
نظام بطاقات اختيار الحساسية بـ 3 مستويات.

### Level 1: Symptoms (الأعراض)
```jsx
<div className="group cursor-pointer">
  <input className="peer sr-only" id="symptom-1" type="checkbox" />
  <label 
    className="flex h-[120px] w-full items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-transparent peer-checked:border-primary peer-checked:bg-primary/5 hover:shadow-md transition-all"
    htmlFor="symptom-1"
  >
    <div className="flex items-center gap-4">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="material-symbols-outlined text-[32px]">sick</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold">عطس أو احتقان</span>
        <span className="text-sm text-gray-600">تهيج الأنف والجيوب الأنفية</span>
      </div>
    </div>
    <div className="flex size-6 items-center justify-center rounded-full border-2 border-primary/30 peer-checked:border-primary peer-checked:bg-primary text-transparent peer-checked:text-white">
      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
    </div>
  </label>
</div>
```

**Specs:**
- Size: Full width × 120px
- States: Default, Checked
- Icons: Material Symbols Outlined
- Colors: Primary accent on checked

### Level 2: Families (العائلات)
```jsx
<label className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-transparent hover:border-primary/30 cursor-pointer overflow-hidden">
  <input className="peer sr-only" type="checkbox" />
  
  {/* Image */}
  <div className="w-full h-32 bg-gray-100 relative">
    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(...)'}}></div>
  </div>
  
  {/* Content */}
  <div className="p-3 flex flex-col gap-1">
    <span className="text-lg font-bold">خشبية</span>
    <p className="text-xs text-gray-500">صندل، أرز، نجيل الهند</p>
    
    {/* Checkbox Indicator */}
    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary"></div>
      <span className="text-xs font-bold text-gray-400 peer-checked:text-primary">يزعجني</span>
    </div>
  </div>
  
  {/* Selected Border */}
  <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 peer-checked:opacity-100"></div>
</label>
```

**Specs:**
- Grid: 2 columns
- Image height: 128px
- Border highlight on checked

### Level 3: Specific Ingredients (المكونات)
```jsx
<div className="relative group">
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-primary/20 hover:border-primary/50 cursor-pointer">
    {/* Icon/Image */}
    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
      <span className="text-xl">🌸</span>
    </div>
    
    {/* Info */}
    <div className="flex-1 flex flex-col">
      <span className="text-base font-bold">الياسمين</span>
      <span className="text-xs text-red-500 font-medium">يسبب: صداع نصفي</span>
    </div>
    
    {/* Remove Button */}
    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600">
      <span className="material-symbols-outlined text-[18px]">close</span>
    </button>
  </div>
</div>
```

**Specs:**
- Full width cards
- Remove functionality
- Allergy note display
- Search input available

---

## 📦 Component #2: CTAButton

### States

#### Primary
```jsx
<button className="relative w-[200px] h-[48px] rounded-full bg-gradient-to-r from-[#2f6f73] to-[#c0841a] text-[#291d12] font-bold shadow-lg hover:shadow-[0_0_20px_rgba(193,132,26,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all overflow-hidden group">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
  <span className="relative">اكتشف عطرك</span>
  <span className="relative mr-2">←</span>
</button>
```

#### Secondary
```jsx
<button className="w-[200px] h-[48px] rounded-full bg-transparent border-[1.5px] border-[#c0841a] text-[#c0841a] font-semibold hover:bg-[#c0841a]/5 active:bg-[#c0841a]/10 transition-all">
  <span className="mr-2">⚙</span>
  <span>تعديل التفضيلات</span>
</button>
```

#### Disabled
```jsx
<button className="w-[200px] h-[48px] rounded-full bg-[#c0841a]/20 text-[#c0841a]/60 font-bold cursor-not-allowed" disabled>
  تابع
</button>
```

#### Skip
```jsx
<button className="w-[200px] h-[48px] rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold active:scale-95 transition-all">
  تخطي
</button>
```

---

## 📦 Component #3: ProgressStepper

### Implementation
```jsx
<div className="w-full h-1 bg-black/5">
  <div 
    className="h-full bg-primary rounded-r-full transition-all duration-300"
    style={{width: `${(currentStep / totalSteps) * 100}%`}}
  ></div>
</div>
```

**Usage:**
```jsx
// In header
<div className="flex items-center justify-between p-4">
  <button>←</button>
  <h2>حساسية - الأعراض</h2>
  <div className="text-primary font-bold">{currentStep}/{totalSteps}</div>
</div>
<ProgressStepper currentStep={1} totalSteps={4} />
```

---

## 📦 Component #4: Counter Badge

### Implementation
```jsx
<div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
  {/* Icon */}
  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
    <span className="material-symbols-outlined">search</span>
  </div>
  
  {/* Counter */}
  <div>
    <span className="text-2xl font-bold block">142</span>
    <span className="text-xs text-gray-500">عمليات البحث</span>
  </div>
</div>
```

**Variants:**
- Search (blue)
- Bookmarks (purple)
- Matches (green)
- Samples (orange)

---

## 📦 Component #5: MatchBadge

### Circular Progress
```jsx
<div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#5B4233] border-2 border-[#c0841a]/30 shadow-lg">
  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
    {/* Background Circle */}
    <path 
      className="text-white/10" 
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5"
    />
    
    {/* Progress Circle */}
    <path 
      className="text-[#c0841a]"
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
      fill="none" 
      stroke="currentColor" 
      strokeDasharray={`${percentage}, 100`}
      strokeLinecap="round" 
      strokeWidth="2.5"
    />
  </svg>
  
  {/* Percentage Text */}
  <span className="text-sm font-bold text-white">{percentage}%</span>
</div>
```

**Colors by Range:**
- 90-100%: Green (#10B981)
- 80-89%: Orange (#F59E0B)
- 70-79%: Yellow (#EAB308)
- <70%: Red (#EF4444)

---

## 📦 Component #6: LoadingSpinner

### Type 1: Pulsing Circles
```jsx
<div className="relative flex items-center justify-center w-64 h-64">
  <div className="absolute h-64 w-64 animate-pulse rounded-full bg-[#c0841a]/5 blur-3xl"></div>
  <div className="absolute h-32 w-32 animate-ping rounded-full bg-[#c0841a]/20"></div>
  <div className="absolute h-24 w-24 animate-pulse rounded-full bg-[#c0841a]/40"></div>
  
  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#c0841a] to-[#f3b956] shadow-[0_0_40px_rgba(236,156,19,0.4)]">
    <svg className="animate-spin h-8 w-8 text-white">
      {/* Spinner icon */}
    </svg>
  </div>
</div>
```

### Type 2: Progress Bar
```jsx
<div className="flex flex-col items-center gap-8">
  <div className="w-20 h-20 rounded-full bg-[#c0841a] shadow-[0_0_25px_rgba(236,156,19,0.5)]">
    <svg className="w-10 h-10 text-white">
      {/* Check icon */}
    </svg>
  </div>
  
  <div className="w-full max-w-[180px]">
    <div className="h-1 w-full rounded-full bg-[#5B4233]/10 overflow-hidden">
      <div className="h-full bg-[#c0841a] animate-[shimmer_2s_infinite]"></div>
    </div>
  </div>
  
  <p className="text-xs text-[#5B4233]/60 uppercase tracking-widest">جاري التحليل...</p>
</div>
```

### Type 3: Bouncing Dots
```jsx
<div className="flex flex-col items-center gap-12">
  {/* Main Icon */}
  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-[0_0_30px_rgba(193,132,26,0.3)]">
    <svg className="w-12 h-12 text-white">
      {/* User icon */}
    </svg>
  </div>

  {/* Bouncing Dots */}
  <div className="flex gap-3">
    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] animate-bounce" style={{animationDelay: '0ms'}}></div>
    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] animate-bounce" style={{animationDelay: '200ms'}}></div>
    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] animate-bounce" style={{animationDelay: '400ms'}}></div>
  </div>

  {/* Text */}
  <div className="text-center">
    <p className="text-lg font-bold text-[#5B4233]">جاري البحث عن عطرك المثالي...</p>
    <p className="text-sm text-[#5B4233]/60">نحلل تفضيلاتك لاختيار الأنسب لك</p>
  </div>
</div>
```

---

## 📦 Component #7: Error State

### Type 1: Service Unavailable
```jsx
<div className="flex flex-col items-center justify-center min-h-screen p-6">
  {/* Image */}
  <div className="relative w-[280px] h-[280px] mb-8">
    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
    <div className="relative w-full h-full bg-cover bg-center rounded-2xl" style={{backgroundImage: 'url(...)'}}></div>
  </div>
  
  {/* Text */}
  <h1 className="text-2xl font-bold text-center mb-4">نعتذر، المتجر مغلق مؤقتاً</h1>
  <p className="text-gray-600 text-center max-w-[320px] mb-8">
    يبدو أن خبير العطور يواجه صعوبة في الوصول إلى المكونات حالياً. يرجى المحاولة مرة أخرى بعد قليل.
  </p>
  
  {/* Actions */}
  <button className="w-full max-w-[280px] h-12 rounded-full bg-primary text-white font-bold shadow-lg">
    <span className="material-symbols-outlined">refresh</span>
    إعادة المحاولة
  </button>
</div>
```

### Type 2: No Results
```jsx
<div className="flex flex-col items-center justify-center min-h-screen p-6">
  {/* Icon */}
  <div className="relative w-48 h-48 rounded-full border border-primary/20 bg-gradient-to-b from-white to-[#E5E0D8] flex items-center justify-center mb-8">
    <span className="material-symbols-outlined text-6xl text-primary/80">search_off</span>
  </div>
  
  {/* Text */}
  <h2 className="text-2xl font-bold mb-3">لم يتم العثور على نتائج</h2>
  <p className="text-gray-600 text-center max-w-[280px] mb-10">
    ذوقك فريد جداً. جرب تغيير بعض التفضيلات لرؤية اقتراحاتنا المميزة.
  </p>
  
  {/* Actions */}
  <div className="flex flex-col gap-4 w-full max-w-[280px]">
    <button className="h-14 rounded-full bg-primary text-white font-bold">تعديل البحث</button>
    <button className="h-14 rounded-full bg-transparent border border-primary/30 text-primary font-bold">العودة للرئيسية</button>
  </div>
</div>
```

### Type 3: Permission Denied
```jsx
<div className="flex flex-col items-center justify-center min-h-screen p-6">
  {/* Icon */}
  <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-b from-[#3a2e1e] to-[#5B4233] border border-primary/30 mb-10">
    <span className="material-symbols-outlined text-primary text-6xl">lock_open</span>
    <div className="absolute -bottom-1 -right-1 bg-red-500/90 text-white w-8 h-8 rounded-full flex items-center justify-center">
      <span className="material-symbols-outlined text-lg">exclamation</span>
    </div>
  </div>
  
  {/* Text */}
  <h1 className="text-3xl font-bold mb-4">مطلوب إذن الوصول</h1>
  <p className="text-gray-600 text-center max-w-[320px] mb-12">
    للحصول على توصية دقيقة للعطور بناءً على مجموعتك، يرجى السماح للكاميرا بالوصول لمسح الزجاجة.
  </p>
  
  {/* Action */}
  <button className="w-full max-w-[280px] h-14 rounded-full bg-primary text-white font-bold shadow-lg">
    منح الإذن
  </button>
</div>
```

---

## 📦 Component #8: Perfume Timeline

### Card Component (320×120px)
```jsx
<div className="w-[320px] h-[120px] bg-white rounded-2xl shadow-lg border border-[#5B4233]/5 p-4 flex gap-4 hover:shadow-xl transition-all group">
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
      <div className={`${statusColor} px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap shrink-0`}>
        {matchPercentage}%
      </div>
    </div>

    {/* Notes */}
    <p className="text-xs text-[#5B4233]/70 leading-tight truncate">{notes}</p>

    {/* Progress Bar */}
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#5B4233]/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} rounded-full transition-all duration-1000`}
          style={{width: `${matchPercentage}%`}}
        />
      </div>
      <span className="text-[10px] font-medium text-[#5B4233]/60">{status}</span>
    </div>
  </div>
</div>
```

**Example Usage:**
```jsx
<div className="flex flex-col gap-6">
  <TimelineCard
    stage="Top"
    icon="🌅"
    title="الافتتاحية"
    subtitle="0-30 دقيقة"
    notes="برغموت • فلفل • ليمون"
    matchPercentage={92}
    status="ممتاز ✨"
    bgColor="bg-yellow-50"
    statusColor="bg-green-100 text-green-600"
    barColor="bg-green-500"
  />
  {/* Heart and Base cards */}
</div>
```

---

## 📦 Component #9: Radar Chart

### Implementation
```jsx
<div className="relative w-full aspect-square max-w-[320px]">
  <svg className="w-full h-full" viewBox="0 0 100 100">
    {/* Background Grid */}
    <g className="stroke-slate-200 fill-none" strokeWidth="0.5">
      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"></polygon>
      <polygon points="50,27.5 70,38.75 70,61.25 50,72.5 30,61.25 30,38.75"></polygon>
      <polygon points="50,38.75 60,44.375 60,55.625 50,61.25 40,55.625 40,44.375"></polygon>
      
      {/* Axis Lines */}
      <line x1="50" y1="50" x2="50" y2="5"></line>
      <line x1="50" y1="50" x2="90" y2="27.5"></line>
      <line x1="50" y1="50" x2="90" y2="72.5"></line>
      <line x1="50" y1="50" x2="50" y2="95"></line>
      <line x1="50" y1="50" x2="10" y2="72.5"></line>
      <line x1="50" y1="50" x2="10" y2="27.5"></line>
    </g>
    
    {/* User Data */}
    <polygon 
      className="stroke-primary fill-primary/20 filter drop-shadow-[0_0_8px_rgba(236,156,19,0.3)]" 
      points="50,9.5 82,32 74,72.5 40,86 18,65.75 30,38.75" 
      strokeLinejoin="round" 
      strokeWidth="1.5"
    />
    
    {/* Data Points */}
    <circle className="fill-white stroke-primary" cx="50" cy="9.5" r="2" strokeWidth="1"></circle>
    <circle className="fill-white stroke-primary" cx="82" cy="32" r="2" strokeWidth="1"></circle>
    <circle className="fill-white stroke-primary" cx="74" cy="72.5" r="2" strokeWidth="1"></circle>
    <circle className="fill-white stroke-primary" cx="40" cy="86" r="2" strokeWidth="1"></circle>
    <circle className="fill-white stroke-primary" cx="18" cy="65.75" r="2" strokeWidth="1"></circle>
    <circle className="fill-white stroke-primary" cx="30" cy="38.75" r="2" strokeWidth="1"></circle>
  </svg>
  
  {/* Labels */}
  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-bold">خشبي</span>
  <span className="absolute top-[25%] right-0 translate-x-1 text-xs">شرقي</span>
  <span className="absolute bottom-[25%] right-0 translate-x-1 text-xs">زهري</span>
  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs">حمضيات</span>
  <span className="absolute bottom-[25%] left-0 -translate-x-1 text-xs">حار</span>
  <span className="absolute top-[25%] left-0 -translate-x-1 text-xs">سويتي</span>
</div>
```

---

## 📦 Component #10: Dashboard Header

### Implementation
```jsx
<div className="flex items-center gap-2 mb-4">
  {/* Avatar */}
  <div className="w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center text-xl font-bold text-primary shadow-sm">
    أ
  </div>
  
  {/* Info */}
  <div>
    <h2 className="text-xl font-bold">مرحباً أحمد 👋</h2>
    <p className="text-sm text-gray-500">عاشق العطور الفاخرة</p>
  </div>
</div>

{/* Stats Card */}
<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
    <span className="text-sm text-gray-500">🧬 بصمتك العطرية:</span>
    <span className="text-sm font-bold text-primary">خشبي • شرقي</span>
  </div>
</div>
```

---

## ⚠️ Deprecated / تغييرات في الكود الحالي

هذا القسم يوثق الاختلافات بين هذا المرجع والكود الحالي في المشروع:

### 1. CTAButton Variants
- ❌ **`skip` variant:** تم حذفه واستبداله بـ `tertiary` variant في الكود الحالي
- ✅ **الكود الحالي:** `src/components/ui/CTAButton.tsx` يستخدم `tertiary` بدلاً من `skip`

### 2. PerfumeCard Variants
- ❌ **`bestseller` variant:** تم حذفه من الكود الحالي
- ✅ **الكود الحالي:** `src/components/ui/PerfumeCard.tsx` يدعم فقط `on-sale` و `just-arrived`

### 3. Cart Functionality
- ❌ **`onAddToCart` / Cart features:** غير مستخدمة في الكود الحالي
- ✅ **السبب:** التطبيق الحالي هو تطبيق تحليلي (analytical) وليس متجر (e-commerce)
- ✅ **الكود الحالي:** لا توجد وظائف سلة تسوق في التطبيق

### 4. Component Locations
- جميع المكونات الفعلية موجودة في `src/components/ui/` وليس في `ask-seba-components/`
- هذا المجلد (`ask-seba-components/`) هو مرجع قديم فقط للتوثيق