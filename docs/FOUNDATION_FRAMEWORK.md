# 🏗️ FOUNDATION - إطار مشترك للصفحات الثلاثة

هذا الإطار أساس لـ About + FAQ + Privacy

---

## ═══════════════════════════════════════════════════════════════
## DESIGN SYSTEM (ثابت لكل الصفحات)
## ═══════════════════════════════════════════════════════════════

### Colors:
- **bg**: `#F2F0EB`
- **text**: `#5B4233`
- **accent**: `#c0841a`
- **border**: `#5B4233/20`

### Typography (Tajawal):
- **H1**: `text-5xl font-bold`
- **H2**: `text-3xl font-bold`
- **Body**: `text-base`

### Cards:
- **bg**: `bg-white/90 backdrop-blur-sm shadow-lg`
- **rounded**: `rounded-3xl`
- **padding**: `p-6`
- **border**: `border border-[#5B4233]/20`
- **hover**: `hover:bg-[#c0841a]/50`

### Responsive:
- **Mobile**: 1 col
- **md (768px)**: 2 cols
- **lg (1024px)**: 3-4 cols

---

## ═══════════════════════════════════════════════════════════════
## RTL SUPPORT (إلزامي)
## ═══════════════════════════════════════════════════════════════

```tsx
<div dir="rtl" className="text-right">
  {/* المحتوى */}
</div>
```

**قواعد RTL:**
- `flex-row-reverse` عند الحاجة
- `mr-auto` بدلاً من `ml-auto`
- `text-right` لجميع النصوص
- `dir="rtl"` على العنصر الجذر

---

## ═══════════════════════════════════════════════════════════════
## DATA SOURCE
## ═══════════════════════════════════════════════════════════════

```typescript
import content from '@/content/content.json'

// About Page
const aboutData = content.about

// FAQ Page
const faqData = content.faq

// Privacy Page
const privacyData = content.privacy
```

⚠️ **مهم جداً:** لا تولّد بيانات - استخدم `content.json` فقط

---

## ═══════════════════════════════════════════════════════════════
## SHARED IMPORTS
## ═══════════════════════════════════════════════════════════════

```typescript
import Link from 'next/link'
import content from '@/content/content.json'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowLeft, Mail, Shield } from 'lucide-react'
```

**ملاحظات:**
- استخدم `@radix-ui/react-accordion` للـ Accordion في FAQ و Privacy
- استخدم `lucide-react` للأيقونات
- استخدم `next/link` للتنقل

---

## ═══════════════════════════════════════════════════════════════
## BACK BUTTON (كل صفحة)
## ═══════════════════════════════════════════════════════════════

```tsx
<Link 
  href="/profile" 
  className="flex items-center gap-2 text-[#5B4233] mb-6 hover:text-[#c0841a] transition-colors"
>
  <ArrowLeft className="w-5 h-5" />
  <span>الرجوع للملف الشخصي</span>
</Link>
```

**الموقع:** في أعلى كل صفحة، قبل المحتوى الرئيسي

---

## ═══════════════════════════════════════════════════════════════
## VALIDATION RULES
## ═══════════════════════════════════════════════════════════════

### ✅ قواعد التحقق الإلزامية:

1. **جميع البيانات من content.json**
   - لا تكتب بيانات hardcoded
   - استخدم `content.about`, `content.faq`, `content.privacy`

2. **RTL support كامل**
   - `dir="rtl"` على العنصر الجذر
   - `text-right` لجميع النصوص
   - `flex-row-reverse` عند الحاجة

3. **No hardcoded text**
   - جميع النصوص من `content.json`
   - لا تكتب نصوص مباشرة في الكود

4. **Responsive breakpoints**
   - Mobile: `default` (1 col)
   - Tablet: `md:` (768px) - 2 cols
   - Desktop: `lg:` (1024px) - 3-4 cols

5. **TypeScript clean**
   - لا توجد أخطاء TypeScript
   - جميع الأنواع محددة

6. **النصوص المحددة**
   - استخدم "آلاف العطور العالمية" في stats (ليس "50,000+")
   - احترم النصوص الموجودة في `content.json` تماماً

---

## ═══════════════════════════════════════════════════════════════
## PAGE STRUCTURE TEMPLATE
## ═══════════════════════════════════════════════════════════════

```tsx
'use client'

import Link from 'next/link'
import content from '@/content/content.json'
import { ArrowLeft } from 'lucide-react'

export default function PageName() {
  const pageData = content.pageName // about, faq, or privacy

  return (
    <div dir="rtl" className="min-h-screen bg-[#F2F0EB] text-[#5B4233]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link 
          href="/profile" 
          className="flex items-center gap-2 text-[#5B4233] mb-6 hover:text-[#c0841a] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>الرجوع للملف الشخصي</span>
        </Link>

        {/* Page Content */}
        {/* ... */}
      </div>
    </div>
  )
}
```

---

## ═══════════════════════════════════════════════════════════════
## CARD COMPONENT TEMPLATE
## ═══════════════════════════════════════════════════════════════

```tsx
<div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 hover:bg-[#c0841a]/50 transition-colors">
  {/* Card Content */}
</div>
```

---

## ═══════════════════════════════════════════════════════════════
## GRID LAYOUT TEMPLATE
## ═══════════════════════════════════════════════════════════════

```tsx
{/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3-4 cols */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid Items */}
</div>
```

---

## ═══════════════════════════════════════════════════════════════
## ACCORDION TEMPLATE (FAQ & Privacy)
## ═══════════════════════════════════════════════════════════════

```tsx
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

<Accordion.Root type="single" collapsible className="space-y-4">
  <Accordion.Item value="item-1" className="bg-white/90 rounded-3xl border border-[#5B4233]/20">
    <Accordion.Header>
      <Accordion.Trigger className="flex items-center justify-between w-full p-6 text-right hover:bg-[#c0841a]/50 transition-colors">
        <span className="text-lg font-bold">السؤال</span>
        <ChevronDown className="w-5 h-5 transition-transform duration-300 data-[state=open]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="px-6 pb-6 text-base">
      <p>الإجابة</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

## ═══════════════════════════════════════════════════════════════
## NOTES
## ═══════════════════════════════════════════════════════════════

- ✅ احفظ هذا الإطار - سنستخدمه في البرومبتات التالية
- ✅ جميع الصفحات يجب أن تتبع هذا الإطار
- ✅ لا توجد استثناءات للقواعد المذكورة أعلاه
- ✅ استخدم `content.json` فقط كمصدر للبيانات

---

**تاريخ الإنشاء:** 2025-01-12  
**آخر تحديث:** 2025-01-12  
**الحالة:** ✅ جاهز للاستخدام
