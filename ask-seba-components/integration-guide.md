# Ask Seba - Integration Guide

> **⚠️ مرجع قديم:** هذا الملف مرجع قديم وقد لا يطابق الكود الحالي. تم تحديثه آخر مرة في 2026-01-04. يرجى الرجوع إلى الكود الفعلي في `src/components/` للاطلاع على التطبيق الحالي.

**Version:** 2.0  
**Date:** 2026-01-04  

---

## 🎯 Overview

This guide will help you integrate the Ask Seba component library into your project. All components are built with:
- ✅ React 18+
- ✅ Tailwind CSS 3.4+
- ✅ TypeScript (optional)
- ✅ RTL Support (Arabic)

---

## 📋 Prerequisites

### Required Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Installation
```bash
npm install react react-dom
npm install -D tailwindcss autoprefixer postcss
```

---

## ⚙️ Configuration

### 1. Tailwind Config
Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#c0841a',
        'background-light': '#F2F0EB',
        'background-dark': '#5B4233',
        'surface-light': '#ffffff',
        'surface-dark': '#2c241b',
        'text-main-light': '#5B4233',
        'text-main-dark': '#ecebe9',
        'text-muted': '#967c4f',
      },
      fontFamily: {
        display: ['"Noto Sans Arabic"', '"Manrope"', 'sans-serif'],
        body: ['"Noto Sans Arabic"', '"Manrope"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: [],
}
```

### 2. CSS Setup
Create `src/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --cream-bg: #F2F0EB;
    --brown-text: #5B4233;
    --primary: #c0841a;
    --gradient-start: #2f6f73;
    --gradient-end: #c0841a;
    --safe-green: #10B981;
    --warning-orange: #F59E0B;
    --danger-red: #EF4444;
  }

  body {
    font-family: "Noto Sans Arabic", "Manrope", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html[dir="rtl"] body {
    direction: rtl;
  }
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

### 3. RTL Setup
In your main `index.html` or `App.jsx`:

```jsx
// App.jsx
function App() {
  return (
    <div dir="rtl" lang="ar">
      {/* Your app content */}
    </div>
  );
}
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CTAButton/
│   │   ├── CTAButton.jsx
│   │   ├── CTAButton.module.css (optional)
│   │   └── index.js
│   ├── LoadingSpinner/
│   │   ├── LoadingSpinner.jsx
│   │   └── index.js
│   ├── PerfumeCard/
│   │   ├── PerfumeCard.jsx
│   │   └── index.js
│   ├── PerfumeTimeline/
│   │   ├── TimelineCard.jsx
│   │   └── index.js
│   └── ... (other components)
├── styles/
│   └── globals.css
├── App.jsx
└── index.js
```

---

## 🚀 Quick Start

### Example 1: CTAButton

**1. Create Component File**
```jsx
// src/components/CTAButton/CTAButton.jsx
import React from 'react';

const CTAButton = ({ 
  state = 'primary', 
  label, 
  onClick, 
  disabled = false,
  className = '' 
}) => {
  const stateClasses = {
    primary: 'bg-gradient-to-r from-[#2f6f73] to-[#c0841a] text-[#291d12] hover:shadow-[0_0_20px_rgba(193,132,26,0.4)] hover:-translate-y-0.5',
    secondary: 'bg-transparent border-[1.5px] border-[#c0841a] text-[#c0841a] hover:bg-[#c0841a]/5',
    disabled: 'bg-[#c0841a]/20 text-[#c0841a]/60 cursor-not-allowed',
    skip: 'bg-blue-500 hover:bg-blue-600 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || state === 'disabled'}
      className={`
        relative flex items-center justify-center 
        w-[200px] h-[48px] 
        rounded-full 
        font-bold text-[15px] tracking-wide
        transition-all duration-300 
        active:scale-95
        ${stateClasses[state]}
        ${className}
      `}
    >
      {state === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
      <span className="relative">{label}</span>
    </button>
  );
};

export default CTAButton;
```

**2. Export from index**
```jsx
// src/components/CTAButton/index.js
export { default } from './CTAButton';
```

**3. Use in Your App**
```jsx
// src/App.jsx
import CTAButton from './components/CTAButton';

function App() {
  const handleDiscover = () => {
    console.log('Discover clicked!');
  };

  return (
    <div className="min-h-screen bg-background-light p-8" dir="rtl" lang="ar">
      <CTAButton 
        state="primary" 
        label="اكتشف عطرك" 
        onClick={handleDiscover} 
      />
    </div>
  );
}
```

---

### Example 2: LoadingSpinner Type 3

**1. Create Component**
```jsx
// src/components/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ type = 3, message = 'جاري البحث عن عطرك المثالي...' }) => {
  if (type === 3) {
    return (
      <div className="flex flex-col items-center gap-12">
        {/* Main Icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-[0_0_30px_rgba(193,132,26,0.3)] flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>

        {/* Bouncing Dots */}
        <div className="flex items-center justify-center gap-3">
          {[0, 200, 400].map((delay, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-gradient-to-br from-[#2f6f73] to-[#c0841a] shadow-lg animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-bold text-[#5B4233] mb-1">{message}</p>
          <p className="text-sm text-[#5B4233]/60">نحلل تفضيلاتك لاختيار الأنسب لك</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#c0841a] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-[#c0841a]/50 animate-pulse" style={{ animationDelay: '75ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-[#c0841a]/30 animate-pulse" style={{ animationDelay: '150ms' }}></div>
        </div>
      </div>
    );
  }

  // Add Type 1 and Type 2 implementations here
  return null;
};

export default LoadingSpinner;
```

**2. Usage**
```jsx
import LoadingSpinner from './components/LoadingSpinner';

function LoadingPage() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center" dir="rtl">
      <LoadingSpinner type={3} message="جاري البحث..." />
    </div>
  );
}
```

---

### Example 3: PerfumeCard

**1. Create Component**
```jsx
// src/components/PerfumeCard/PerfumeCard.jsx
import React from 'react';

const PerfumeCard = ({
  variant = 'bestseller',
  title = 'عود ملكي فاخر',
  brand = 'أطيار',
  matchPercentage = 90,
  price = 450,
  originalPrice = null,
  imageUrl = '/default-perfume.jpg',
  description = 'تولیفة ساحرة تجمع بین دهن العود الكمبودي والمسك الأسود.',
  isSafe = true,
  onAddToCart,
  onToggleFavorite,
}) => {
  const variantConfig = {
    bestseller: {
      badge: 'الأكثر مبيعاً',
      badgeColor: 'bg-[#c0841a] text-[#291d12]',
    },
    'on-sale': {
      badge: 'تخفيضات',
      badgeColor: 'bg-[#c0841a] text-[#221c11]',
    },
    'just-arrived': {
      badge: 'وصل حديثاً',
      badgeColor: 'bg-[#c0841a] text-[#221c11]',
    },
  };

  const config = variantConfig[variant];

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full max-w-sm bg-[#F2F0EB] rounded-2xl shadow-lg overflow-hidden border border-[#5B4233]/5 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group">
      {/* Top Badge */}
      <div className="absolute top-4 right-4 z-20">
        <div className={`${config.badgeColor} font-bold text-sm px-4 py-2 rounded-full shadow-lg`}>
          {config.badge}
        </div>
      </div>

      {/* Match Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-center gap-1">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#5B4233] border-2 border-[#c0841a]/30 shadow-lg">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/10"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              className={getMatchColor(matchPercentage)}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray={`${matchPercentage}, 100`}
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
          <span className="text-sm font-bold text-white leading-none">{matchPercentage}%</span>
        </div>
        <span className="text-[10px] font-bold text-[#5B4233]/70 uppercase tracking-wider">تطابق</span>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-8 mt-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#c0841a]/20 blur-[60px] rounded-full pointer-events-none"></div>
        <img
          src={imageUrl}
          alt={title}
          className="relative z-10 w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6 pt-2 flex flex-col gap-4 bg-transparent">
        {/* Safety Badge */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
            isSafe 
              ? 'bg-[#483a23]/90 border border-[#c0841a]/20' 
              : 'bg-red-900/20 border border-red-500/20'
          } backdrop-blur-sm`}>
            <span className="text-[16px]">{isSafe ? '🛡' : '⚠'}</span>
            <span className="text-white text-xs font-medium">
              {isSafe ? 'خيار آمن' : 'تحذير'}
            </span>
          </div>
          <span className="text-[#b0720a] text-sm font-bold tracking-wide">{brand}</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-[#5B4233] leading-tight">{title}</h3>
          <p className="text-[#5B4233]/70 text-sm line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="h-px w-full bg-[#5B4233]/10 my-1"></div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-xs text-[#5B4233]/50 line-through decoration-red-500/50">
                {originalPrice} ر.س
              </span>
            )}
            <span className="text-xl font-bold text-[#b0720a]">
              {price} <span className="text-sm font-normal text-[#5B4233]/70">ر.س</span>
            </span>
          </div>
          
          <button 
            onClick={onAddToCart}
            className="flex-1 h-12 bg-[#c0841a] hover:bg-[#c0841a]/90 text-[#291d12] rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_4px_12px_rgba(236,156,19,0.3)]"
          >
            <span>إضافة للسلة</span>
            <span className="text-[20px]">🛍</span>
          </button>
          
          <button 
            onClick={onToggleFavorite}
            className="w-12 h-12 rounded-full border border-[#5B4233]/10 bg-[#5B4233]/5 flex items-center justify-center text-[#5B4233] hover:bg-[#5B4233]/10 hover:text-[#b0720a] transition-colors active:scale-95"
          >
            <span className="text-[20px]">♡</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCard;
```

**2. Usage**
```jsx
import PerfumeCard from './components/PerfumeCard';

function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" dir="rtl">
      <PerfumeCard
        variant="bestseller"
        title="عود ملكي فاخر"
        brand="أطيار"
        matchPercentage={90}
        price={450}
        isSafe={true}
        onAddToCart={() => console.log('Added to cart')}
        onToggleFavorite={() => console.log('Toggled favorite')}
      />
      
      <PerfumeCard
        variant="on-sale"
        title="عنبر عود جولد"
        brand="الحرمين"
        matchPercentage={75}
        price={250}
        originalPrice={400}
        isSafe={true}
      />
    </div>
  );
}
```

---

## 🎨 Styling Tips

### Custom Animations
Add to your `globals.css`:

```css
@layer utilities {
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(150%); }
  }

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

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out;
  }
}
```

### Dark Mode Support
All components support dark mode. Enable it:

```jsx
// App.jsx
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>
        {/* Your content */}
      </div>
    </div>
  );
}
```

---

## 🧪 Testing

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

### Example Test
```jsx
// src/components/CTAButton/CTAButton.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import CTAButton from './CTAButton';

describe('CTAButton', () => {
  test('renders primary button', () => {
    render(<CTAButton state="primary" label="اكتشف عطرك" />);
    expect(screen.getByText('اكتشف عطرك')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<CTAButton state="primary" label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled button cannot be clicked', () => {
    const handleClick = jest.fn();
    render(<CTAButton state="disabled" label="Disabled" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

---

## 🚨 Troubleshooting

### Issue: Fonts not loading
**Solution:**
```html
<!-- Add to index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Issue: RTL not working
**Solution:**
```jsx
// Ensure html tag has dir="rtl"
<html dir="rtl" lang="ar">
```

### Issue: Colors not matching design
**Solution:**
Check your `tailwind.config.js` has the exact color values from the design system.

### Issue: Components not responsive
**Solution:**
```jsx
// Use responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## 📚 Additional Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev
- **Noto Sans Arabic:** https://fonts.google.com/noto/specimen/Noto+Sans+Arabic
- **Material Symbols:** https://fonts.google.com/icons

---

## 🆘 Support

For issues or questions:
1. Check the component documentation
2. Review the troubleshooting section
3. Ensure all dependencies are correctly installed
4. Verify Tailwind configuration matches the design system

---

**End of Integration Guide**

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