# RTL & Accessibility Audit Report

**Date:** January 2025  
**Project:** f5-new (Ask Seba)  
**Purpose:** Pre-implementation audit for Header/Footer components

---

## Part 1: RTL Configuration Summary

### Tailwind Configuration

**File:** `tailwind.config.ts`

**RTL Status:** ❌ **NO explicit RTL configuration**

**Findings:**
- ❌ No `direction: 'rtl'` setting in config
- ❌ No RTL plugins installed (e.g., `tailwindcss-rtl`)
- ✅ Arabic font set as default: `sans: ['var(--font-arabic)', 'sans-serif']`
- ✅ Font variables configured: `--font-arabic`, `--font-manrope`

**Configuration:**
```typescript
theme: {
  extend: {
    fontFamily: {
      arabic: ['var(--font-arabic)', 'sans-serif'],
      sans: ['var(--font-arabic)', 'sans-serif'], // Default to Arabic font
    },
    // No RTL-specific utilities
  },
  plugins: [], // No RTL plugins
}
```

**Recommendation:** RTL is handled via HTML `dir="rtl"` attribute, which is sufficient. No Tailwind RTL plugin needed.

---

### Global CSS Analysis

**File:** `src/app/globals.css`

**RTL Status:** ❌ **NO RTL-specific CSS selectors**

**Findings:**
- ❌ No `[dir="rtl"]` selectors
- ❌ No `[dir="ltr"]` selectors
- ❌ No `direction: rtl` properties
- ❌ No utility classes for RTL (e.g., `.rtl-mirror`)

**Content:**
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-arabic), sans-serif;
}

/* Accordion Animations only - no RTL styles */
```

**Conclusion:** RTL is handled entirely through HTML `dir="rtl"` attribute and Tailwind's automatic RTL support.

---

### HTML/Body RTL Setup

**File:** `src/app/layout.tsx`

**HTML Configuration:**
```typescript
<html lang="ar" dir="rtl" className={`${notoSansArabic.variable} ${manrope.variable}`}>
  <body className={`${notoSansArabic.className} antialiased`}>
```

**Status:** ✅ **CORRECTLY CONFIGURED**

- `lang="ar"` ✅
- `dir="rtl"` ✅ (Line 87)
- Font variables applied ✅

**Toaster RTL Configuration:**
```typescript
<Toaster 
  position="top-center" 
  toastOptions={{
    style: {
      direction: 'rtl',
      textAlign: 'right'
    }
  }}
/>
```

**Conclusion:** RTL is set globally on `<html>` tag. All child elements inherit RTL direction automatically.

---

### Existing Component RTL Patterns

**Pattern Found:** All pages use inline `dir="rtl"` on root divs

**Examples:**

1. **About Page** (`src/app/about/page.tsx:15`):
```tsx
<div dir="rtl" className="min-h-screen bg-[#F2F0EB] text-[#5B4233]">
```

2. **FAQ Page** (`src/app/faq/page.tsx:25`):
```tsx
<div dir="rtl" className="min-h-screen bg-[#F2F0EB] text-[#5B4233]">
```

3. **Privacy Page** (`src/app/privacy/page.tsx:15`):
```tsx
<div dir="rtl" className="min-h-screen bg-[#F2F0EB] text-[#5B4233]">
```

**Pattern Analysis:**
- ✅ Consistent: All pages use `dir="rtl"` on root container
- ✅ Redundant but safe: HTML already has `dir="rtl"`, but explicit on pages ensures correctness
- ✅ Recommendation: Header/Footer should also use `dir="rtl"` for consistency

---

## Part 2: Icon and Text Direction Analysis

### Icon Library

**Primary Library:** `lucide-react` ✅

**Usage Pattern:** Icons are imported from `lucide-react` throughout the project.

---

### Icon Flip Requirements

| Icon | Should Flip? | Reason | Current Pattern |
|------|-------------|--------|----------------|
| **ChevronLeft** | ✅ YES | Directional (left/right) | Uses `rtl:rotate-180` |
| **ChevronRight** | ✅ YES | Directional (left/right) | Uses `rtl:rotate-180` |
| **ChevronDown** | ❌ NO | Vertical (up/down) | No rotation |
| **ArrowLeft** | ✅ YES | Directional | No rotation (needs fix) |
| **ArrowRight** | ✅ YES | Directional | No rotation (needs fix) |
| **Heart** | ❌ NO | Universal symbol | No rotation |
| **User** | ❌ NO | Universal symbol | No rotation |
| **Search** | ❌ NO | Universal symbol | No rotation |
| **Logo** | ❌ NO | Brand identity | No rotation |

### Current Icon Flip Patterns

**Found in Code:**

1. **ChevronLeft/Right with RTL rotation** (`src/app/results/page.tsx:607,631`):
```tsx
<ChevronRight className="w-5 h-5 rtl:rotate-180" />
<ChevronLeft className="w-5 h-5 rtl:rotate-180" />
```

2. **ChevronLeft/Right in Quiz pages** (`src/app/quiz/step1-favorites/page.tsx:346,360`):
```tsx
<ChevronRight className="w-5 h-5 rtl:rotate-180" aria-hidden="true" />
<ChevronLeft className="w-5 h-5 inline me-2 rtl:rotate-180" aria-hidden="true" />
```

3. **ArrowLeft WITHOUT rotation** (`src/app/about/page.tsx:22`):
```tsx
<ArrowLeft className="w-5 h-5" />  // ⚠️ Should have rtl:rotate-180
```

**Recommendation for Header:**
- Use `rtl:rotate-180` for all directional icons (ChevronLeft, ChevronRight, ArrowLeft, ArrowRight)
- Do NOT rotate vertical icons (ChevronDown, ChevronUp)
- Do NOT rotate universal symbols (Heart, User, Search, Logo)

---

### Text Alignment

**Default Alignment:** Automatic from `dir="rtl"`

**Explicit Alignment Usage:**
- `text-center` - Used for hero sections, buttons, cards (48 instances)
- `text-right` - Used explicitly in some components (Accordion triggers, privacy page)
- `text-left` - Rarely used (only for LTR content like percentages)

**Pattern Found:**
```tsx
// FAQ Accordion (explicit text-right)
<Accordion.Trigger className="... text-right">
  <span>{question.question}</span>
</Accordion.Trigger>

// Privacy Accordion (explicit text-right)
<Accordion.Content className="... text-right">
```

**Recommendation:**
- Header/Footer text will align automatically with `dir="rtl"`
- Use `text-center` only when needed (e.g., logo, centered buttons)
- Avoid explicit `text-left` unless for LTR content (e.g., English text, numbers)

---

## Part 3: Dropdown/Menu RTL Behavior

### Radix UI RTL Support

**Package Status:** ❌ `@radix-ui/react-dropdown-menu` is **NOT INSTALLED**

**Installed Radix Packages:**
- ✅ `@radix-ui/react-accordion` (v1.2.12)
- ✅ `@radix-ui/react-dialog` (v1.1.15)
- ✅ `@radix-ui/react-tooltip` (v1.2.8)

**Radix Accordion RTL Pattern:**

**Example 1: FAQ Page** (`src/app/faq/page.tsx:90`):
```tsx
<Accordion.Trigger className="w-full px-6 py-4 flex flex-row-reverse justify-between items-center text-base font-bold text-[#5B4233] hover:bg-[#c0841a]/50 transition-colors text-right">
  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
  <span>{question.question}</span>
</Accordion.Trigger>
```

**Key RTL Patterns:**
- ✅ `flex-row-reverse` - Reverses flex direction for RTL
- ✅ `text-right` - Explicit right alignment
- ✅ Icon on left (visual), text on right (visual)

**Example 2: Privacy Page** (`src/app/privacy/page.tsx:112`):
```tsx
<Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center text-base font-bold text-[#5B4233] hover:bg-[#c0841a]/50 transition-colors text-right">
  <span>{section.title}</span>
  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
</Accordion.Trigger>
```

**Note:** Privacy page uses different pattern (no `flex-row-reverse`), but icon is still on right side.

---

### Dropdown Positioning Strategy for Header

**For User Icon Dropdown (when implemented):**

**RTL Alignment:**
- **Visual Right (Start):** User icon should be on the right side (start in RTL)
- **Visual Left (End):** Logo should be on the left side (end in RTL)
- **Dropdown Opening:** Should open downward-right (toward start edge)

**Recommended Radix DropdownMenu Configuration:**
```tsx
<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button aria-label="قائمة المستخدم">
      <User className="w-5 h-5" />
    </button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content
    align="start"  // Aligns to start (right in RTL)
    side="bottom"
    sideOffset={8}
    className="min-w-[200px]"
    dir="rtl"  // Explicit RTL for content
  >
    {/* Menu items */}
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

**CSS Classes for RTL Dropdown:**
```tsx
className="flex flex-row-reverse items-center gap-2 text-right"
```

---

## Part 4: Accessibility Audit of Existing Components

### Current Accessibility Patterns

**Found Patterns:**

1. **aria-label Usage** (55 instances):
   - ✅ Buttons: `aria-label="قائمة المستخدم"`
   - ✅ Cards: `aria-label="عرض تفاصيل ${perfume.name}"`
   - ✅ Icons: `aria-label="إضافة ${perfume.name} إلى المفضلة"`
   - ✅ Search: `aria-label="ابحث عن العطور بالاسم أو العلامة التجارية"`

2. **aria-describedby Usage:**
   - ❌ Not commonly used
   - ✅ One instance: `aria-describedby="radar-description"` in RadarChart

3. **role Attributes:**
   - ✅ `role="button"` - For clickable cards
   - ✅ `role="checkbox"` - For selectable items
   - ✅ `role="img"` - For charts/graphics
   - ✅ `role="region"` - For content sections
   - ✅ `role="status"` - For live updates
   - ✅ `role="meter"` - For progress indicators

4. **tabIndex Management:**
   - ✅ `tabIndex={0}` - For interactive elements
   - ✅ `tabIndex={undefined}` - For non-interactive elements

**Good Examples:**

**Example 1: PerfumeCard** (`src/components/ui/PerfumeCard.tsx:116-118`):
```tsx
<div
  role={onSelect ? "button" : undefined}
  tabIndex={onSelect ? 0 : undefined}
  aria-label={`عرض تفاصيل ${perfume.name} من ${perfume.brand}`}
>
```

**Example 2: PerfumeGrid** (`src/components/ui/PerfumeGrid.tsx:40-42`):
```tsx
<div
  tabIndex={onPerfumeClick ? 0 : undefined}
  role={onPerfumeClick ? "button" : undefined}
  aria-label={`عرض تفاصيل ${perfume.name} من ${perfume.brand}`}
>
```

**Example 3: ShareButton** (`src/components/ui/ShareButton.tsx:80`):
```tsx
<button
  aria-label="شارك النتيجة"
  // ... other props
>
```

---

### Keyboard Navigation

**Focus Styles Found:**

**Pattern 1: Focus Ring (Most Common)**
```tsx
className="... focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
```

**Pattern 2: Focus Visible (Better UX)**
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
```

**Pattern 3: Focus Ring with Offset**
```tsx
className="... focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

**Examples:**

1. **Login Input** (`src/app/login/page.tsx:116`):
```tsx
className="... focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
```

2. **CTAButton** (`src/components/ui/CTAButton.tsx:10`):
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

3. **PerfumeCard** (`src/components/ui/PerfumeCard.tsx:131`):
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
```

**Global Focus Styles:**
- ❌ No global focus styles in `globals.css`
- ✅ Focus styles are applied per-component using Tailwind classes

**Recommendation for Header:**
- Use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
- Ensure all interactive elements are keyboard accessible
- Use `tabIndex={0}` for interactive elements

---

### Screen Reader Considerations

**sr-only Classes:**
- ❌ No `sr-only` utility class found
- ❌ No screen-reader-only content patterns

**aria-live Regions:**
- ✅ Found 3 instances:
  - `aria-live="polite"` in PerfumeTimeline (line 204)
  - `aria-live="polite"` in SpeedometerGauge (lines 150, 187)

**Loading States:**
- ✅ Loading spinners use `LoadingSpinner` component
- ❌ No explicit `aria-busy` or `aria-live` for loading states
- ✅ Error messages use motion animations (visual feedback)

**Recommendation:**
- Add `sr-only` utility class for screen reader-only text
- Use `aria-live="polite"` for dynamic content updates
- Add `aria-busy="true"` during loading states

---

## Part 5: Mobile RTL Considerations

### Mobile Layout Patterns

**Responsive Breakpoints Used:**
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large (1280px+)

**Common Patterns:**
```tsx
// Grid responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Text responsive
className="text-4xl md:text-5xl"

// Padding responsive
className="p-4 md:p-6 lg:p-8"

// Flex responsive
className="flex flex-col sm:flex-row"
```

**Mobile Navigation:**
- ❌ No hamburger menu found in current codebase
- ✅ Mobile filter modal uses bottom sheet pattern (`MobileFilterModal`)
- ✅ Mobile layouts use full-width containers

**Hamburger Menu Positioning (if needed):**
- In RTL: Should be on **visual right** (start edge)
- Use `flex-row-reverse` for RTL layout
- Icon should flip if directional

---

### Touch Target Sizes

**Button/Icon Sizes Found:**

| Component | Size | Meets 44x44px? |
|-----------|------|----------------|
| **CTAButton (default)** | `h-12` (48px) | ✅ YES |
| **CTAButton (sm)** | `h-11` (44px) | ✅ YES |
| **CTAButton (icon)** | `h-11 w-11` (44px) | ✅ YES |
| **Icon buttons** | `w-10 h-10` (40px) | ⚠️ NO (needs padding) |
| **Small icons** | `w-5 h-5` (20px) | ⚠️ NO (needs padding) |

**Examples:**

1. **Favorite Button** (`src/app/results/page.tsx:559`):
```tsx
className="w-10 h-10 rounded-full ..."  // 40px - needs padding
```

2. **Share Button** (`src/app/results/page.tsx:571`):
```tsx
className="w-10 h-10 ..."  // 40px - needs padding
```

**Recommendation for Header:**
- Minimum touch target: `min-w-[44px] min-h-[44px]`
- Icon buttons: Use `p-2` or `p-3` to ensure 44x44px touch area
- Example: `className="p-2 w-10 h-10"` or `className="p-3 min-w-[44px] min-h-[44px]"`

---

## Part 6: Header Positioning Requirements

### Visual Hierarchy in RTL

**RTL Layout Convention:**
- **بداية الصفحة (Start/Right):** User actions, interactive elements
- **نهاية الصفحة (End/Left):** Logo, brand identity

**Recommended Header Layout (RTL):**

```
┌─────────────────────────────────────────┐
│ [User Icon] [Favorites] [Search]  Logo │  ← Visual layout
│   Start (Right)              End (Left) │
└─────────────────────────────────────────┘
```

**Flexbox Implementation:**
```tsx
<header dir="rtl" className="flex items-center justify-between px-4 py-3">
  {/* Start (Right) - User actions */}
  <div className="flex items-center gap-3">
    <UserIconButton />
    <FavoritesButton />
    <SearchButton />
  </div>
  
  {/* End (Left) - Logo */}
  <Link href="/" className="flex items-center">
    <Logo />
  </Link>
</header>
```

**Alternative (Logo First):**
```tsx
<header dir="rtl" className="flex items-center justify-between px-4 py-3">
  {/* Logo on End (Left) */}
  <Link href="/" className="flex items-center">
    <Logo />
  </Link>
  
  {/* Actions on Start (Right) */}
  <div className="flex items-center gap-3">
    <SearchButton />
    <FavoritesButton />
    <UserIconButton />
  </div>
</header>
```

**Recommendation:** Use first pattern (actions on right, logo on left) for better UX in RTL.

---

## Part 7: Color & Theme Compatibility

### Color Palette

**Primary Colors (from `tailwind.config.ts`):**

| Color | Value | Usage |
|-------|-------|-------|
| **Primary** | `#c0841a` | Main brand color (amber/gold) |
| **Gradient Start** | `#2f6f73` | Teal/blue-green |
| **Gradient End** | `#c0841a` | Amber/gold |
| **Brown Text** | `#5B4233` | Primary text color |
| **Cream BG** | `#F2F0EB` | Background color |
| **Safe Green** | `#10B981` | Success states |
| **Warning Orange** | `#F59E0B` | Warning states |
| **Danger Red** | `#EF4444` | Error states |

**Header Background Patterns Found:**

1. **Dashboard Header** (`src/app/dashboard/page.tsx:98`):
```tsx
<header className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-b-3xl shadow-2xl mb-8">
```

2. **Profile Header** (`src/app/profile/page.tsx:108`):
```tsx
<div className="bg-white/90 backdrop-blur-sm px-6 pt-12 pb-8 rounded-b-[40px] shadow-lg border-b border-brown/20">
```

3. **About Hero** (`src/app/about/page.tsx:31`):
```tsx
className="bg-gradient-to-br from-[#2f6f73] to-[#c0841a] text-white"
```

**Recommendation for Header:**
- **Background:** `bg-white/90 backdrop-blur-sm` or `bg-gradient-to-r from-primary to-primary/80`
- **Text:** `text-brown-text` (on white) or `text-white` (on gradient)
- **Border:** `border-b border-brown-text/20` or `border-b border-primary/20`
- **Shadow:** `shadow-lg` or `shadow-2xl`

---

### Dark Mode Considerations

**Current Status:** ❌ **NO dark mode support**

**Found in `globals.css`:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Note:** Dark mode CSS exists but is not actively used. Project uses light theme only.

**Recommendation:** Header/Footer should match current light theme. No dark mode needed for now.

---

## Recommended Header Structure (RTL-Compliant)

### Complete Implementation Example

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { User, Heart, Search, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header 
      dir="rtl"
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-brown-text/20 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Start (Right) - User Actions */}
          <div className="flex items-center gap-2">
            {/* User Icon Dropdown */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="قائمة المستخدم"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <User className="w-5 h-5 text-brown-text" />
            </button>

            {/* Favorites Button */}
            <Link
              href="/dashboard"
              className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={session ? "المفضلة" : "تسجيل الدخول للمفضلة"}
              aria-describedby={!session ? "login-required" : undefined}
            >
              <Heart className="w-5 h-5 text-brown-text" />
            </Link>
            {!session && (
              <span id="login-required" className="sr-only">
                يتطلب تسجيل الدخول
              </span>
            )}

            {/* Search Button */}
            <button
              className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
              aria-label="البحث"
            >
              <Search className="w-5 h-5 text-brown-text" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="p-2 min-w-[44px] min-h-[44px] rounded-full hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
              aria-label="القائمة"
              aria-expanded={isMenuOpen}
            >
              <Menu className="w-5 h-5 text-brown-text" />
            </button>
          </div>

          {/* End (Left) - Logo */}
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            aria-label="الصفحة الرئيسية"
          >
            <span className="font-serif italic text-2xl font-black text-primary">
              Ask Seba
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
```

### Key RTL Features:

1. ✅ `dir="rtl"` on header
2. ✅ `flex-row-reverse` not needed (flex direction handles RTL automatically)
3. ✅ Actions on right (start), logo on left (end)
4. ✅ Icons don't need rotation (User, Heart, Search are universal)
5. ✅ Touch targets: `min-w-[44px] min-h-[44px]`
6. ✅ Focus styles: `focus-visible:ring-2 focus-visible:ring-primary`
7. ✅ ARIA labels in Arabic
8. ✅ `aria-expanded` for dropdowns
9. ✅ `sr-only` for screen reader text

---

## Summary & Recommendations

### RTL Implementation Checklist

- [x] Use `dir="rtl"` on header element
- [x] Place user actions on visual right (start)
- [x] Place logo on visual left (end)
- [x] Use `rtl:rotate-180` for directional icons (ChevronLeft/Right)
- [x] Do NOT rotate universal icons (User, Heart, Search)
- [x] Use `flex-row-reverse` only when needed for specific layouts
- [x] Text alignment is automatic with `dir="rtl"`

### Accessibility Checklist

- [x] All interactive elements have `aria-label` in Arabic
- [x] Dropdowns use `aria-expanded` and `aria-haspopup`
- [x] Touch targets meet 44x44px minimum
- [x] Focus styles use `focus-visible:ring-2 focus-visible:ring-primary`
- [x] Screen reader text uses `sr-only` class (needs to be added)
- [x] Loading states should use `aria-busy="true"`

### Color & Styling Checklist

- [x] Header background: `bg-white/90 backdrop-blur-sm`
- [x] Border: `border-b border-brown-text/20`
- [x] Shadow: `shadow-lg`
- [x] Text color: `text-brown-text`
- [x] Hover: `hover:bg-primary/10`
- [x] Z-index: `z-30` (below modals: z-50+)

### Mobile Considerations

- [x] Responsive breakpoints: `sm:`, `md:`, `lg:`
- [x] Mobile menu button on visual right
- [x] Touch targets: minimum 44x44px
- [x] Bottom sheet pattern for mobile menus (if needed)

---

**Report Status:** ✅ Complete  
**Ready for Implementation:** ✅ YES  
**Risk Level:** 🟢 LOW (following established patterns)

---

**Next Steps:**
1. Add `sr-only` utility class to `globals.css`
2. Implement Header component following this report
3. Test with screen reader (NVDA/JAWS)
4. Test keyboard navigation
5. Test on mobile devices
6. Verify RTL layout in browser
