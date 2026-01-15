# Component Dependencies & Styling Audit Report

**Date:** January 2025  
**Project:** f5-new (Ask Seba)  
**Purpose:** Ensure Header/Footer match project's design system

---

## Part 1: Dependencies Status

### Package Versions

| Package | Installed? | Version | Notes |
|---------|------------|---------|-------|
| **@radix-ui/react-dropdown-menu** | ❌ **NO** | N/A | **MISSING** - Not installed |
| **@radix-ui/react-accordion** | ✅ YES | ^1.2.12 | Used in FAQ/Privacy pages |
| **@radix-ui/react-dialog** | ✅ YES | ^1.1.15 | Used for modals |
| **@radix-ui/react-tooltip** | ✅ YES | ^1.2.8 | Used for tooltips |
| **lucide-react** | ✅ YES | ^0.562.0 | Primary icon library |
| **framer-motion** | ✅ YES | ^12.23.26 | Animation library |
| **next** | ✅ YES | 16.1.1 | Framework |
| **next-auth** | ✅ YES | ^5.0.0-beta.30 | Authentication |
| **react** | ✅ YES | 19.2.3 | React library |
| **react-dom** | ✅ YES | 19.2.3 | React DOM |
| **tailwindcss** | ✅ YES | ^4 | Styling (v4) |
| **class-variance-authority** | ✅ YES | ^0.7.1 | Used in CTAButton |
| **clsx** | ✅ YES | ^2.1.1 | Class name utility |
| **tailwind-merge** | ✅ YES | ^3.4.0 | Tailwind class merging |

### Missing Dependencies

**Critical Missing:**
- ❌ **@radix-ui/react-dropdown-menu** - Required for user dropdown menu

**Compatibility Check:**
- ✅ Other Radix UI packages are v1.x (accordion: 1.2.12, dialog: 1.1.15, tooltip: 1.2.8)
- ✅ Recommended: Install `@radix-ui/react-dropdown-menu@^1.1.15` (matches dialog version)

---

### Alternative Dropdown Solutions

**Option A: Custom Dropdown with Headless UI**
- ❌ **NOT AVAILABLE** - Headless UI not installed
- Would require additional dependency

**Option B: Pure CSS Dropdown**
- ⚠️ **RISKY** - Poor accessibility, keyboard navigation issues
- Not recommended for production

**Option C: Install @radix-ui/react-dropdown-menu** ✅ **RECOMMENDED**
- ✅ Consistent with existing Radix UI usage
- ✅ Built-in accessibility (ARIA, keyboard navigation)
- ✅ RTL support (auto-detects `dir` attribute)
- ✅ Matches project's component library pattern

**Recommendation:** **Option C - Install @radix-ui/react-dropdown-menu**

**Installation Command:**
```bash
npm install @radix-ui/react-dropdown-menu@^1.1.15
```

**Justification:**
1. **Consistency:** Project already uses Radix UI (accordion, dialog, tooltip)
2. **Accessibility:** Built-in ARIA support, keyboard navigation
3. **RTL Support:** Auto-detects `dir="rtl"` from HTML
4. **Maintenance:** Same library family, easier to maintain
5. **Pattern Match:** Follows existing component patterns

---

## Part 2: Design System Tokens

### Colors (from `tailwind.config.ts`)

```typescript
const colors = {
  // Primary Brand Colors
  primary: '#c0841a',              // Amber/Gold - Main brand color
  'gradient-start': '#2f6f73',     // Teal - Gradient start
  'gradient-end': '#c0841a',       // Amber - Gradient end
  
  // Background Colors
  background: 'var(--background)',  // White (#ffffff)
  'cream-bg': '#F2F0EB',           // Cream - Main background
  'beige-light': '#EBE1DD',        // Light beige
  
  // Text Colors
  foreground: 'var(--foreground)',  // Dark (#171717)
  'brown-text': '#5B4233',         // Brown - Primary text
  'brown-medium': '#A88B78',       // Medium brown
  'gray-brown': '#AFA393',          // Gray-brown
  
  // Status Colors
  'safe-green': '#10B981',          // Success/Green
  'warning-orange': '#F59E0B',      // Warning/Orange
  'danger-red': '#EF4444',          // Error/Red
  'gauge-safe': '#15803d',          // Dark green
  'gauge-warning': '#F59E0B',       // Orange
  'gauge-danger': '#EF4444',        // Red
  
  // Accent Colors
  'pink-light': '#EEDDD8',          // Light pink
}
```

**Usage Patterns:**
- **Header backgrounds:** `bg-white/90`, `bg-gradient-to-r from-primary to-primary/80`
- **Text on headers:** `text-white` (on gradient), `text-brown-text` (on white)
- **Borders:** `border-brown-text/20`, `border-primary/10`
- **Hover states:** `hover:bg-primary/10`, `hover:bg-amber-50/50`

---

### Spacing Scale

**From Component Analysis:**

```typescript
const spacing = {
  // Button Padding
  buttonPadding: {
    default: 'px-8 py-3',      // h-12 (48px)
    sm: 'px-6 py-2.5',         // h-11 (44px)
    lg: 'px-10 py-4',          // h-14 (56px)
    icon: 'p-0',               // h-11 w-11 (44px)
  },
  
  // Card Padding
  cardPadding: {
    small: 'p-4',              // 16px
    medium: 'p-6',             // 24px
    large: 'p-8',              // 32px
    xl: 'p-12',                // 48px
  },
  
  // Container Padding
  containerPadding: {
    mobile: 'px-4',            // 16px
    tablet: 'px-6',             // 24px
    desktop: 'px-8',            // 32px
  },
  
  // Gap Values (Flex/Grid)
  gaps: {
    xs: 'gap-1',               // 4px
    sm: 'gap-2',               // 8px
    md: 'gap-3',               // 12px
    lg: 'gap-4',               // 16px
    xl: 'gap-6',               // 24px
  },
  
  // Margin Values
  margins: {
    section: 'mb-8',           // 32px
    large: 'mb-12',            // 48px
    xl: 'mb-16',               // 64px
  },
}
```

**Common Patterns:**
- **Header padding:** `px-4 py-3` (mobile), `px-6 py-4` (desktop)
- **Container padding:** `px-4` (mobile), `px-6` (desktop)
- **Gap between items:** `gap-2` (small), `gap-3` (medium), `gap-4` (large)

---

### Border Radius

**From Component Analysis:**

```typescript
const borderRadius = {
  // Buttons
  button: 'rounded-full',      // Full circle (CTAButton)
  buttonAlt: 'rounded-md',     // Medium (Button component)
  buttonSm: 'rounded-xl',       // Extra large (some buttons)
  
  // Cards
  card: 'rounded-2xl',         // 16px - Most common
  cardLarge: 'rounded-3xl',    // 24px - Large cards
  cardSmall: 'rounded-xl',     // 12px - Small cards
  
  // Icons
  icon: 'rounded-full',        // Full circle for icon buttons
  
  // Inputs
  input: 'rounded-xl',         // 12px - Input fields
}
```

**Usage:**
- **Header:** `rounded-b-3xl` (bottom only, like dashboard header)
- **Buttons:** `rounded-full` (CTAButton), `rounded-md` (Button)
- **Cards:** `rounded-2xl` (most common), `rounded-3xl` (large)

---

### Shadows

**From `tailwind.config.ts` and Components:**

```typescript
const shadows = {
  // Custom Shadows (from config)
  luxury: '0 20px 40px rgba(0,0,0,0.08)',        // Cards
  button: '0 10px 25px rgba(47,111,115,0.2)',   // Buttons
  radar: '0 0 40px rgba(16,185,129,0.3)',        // Radar Chart
  timeline: '0 10px 30px rgba(0,0,0,0.1)',       // Timeline
  
  // Standard Tailwind
  sm: 'shadow-sm',                                // Small
  md: 'shadow-md',                                // Medium
  lg: 'shadow-lg',                                // Large (common)
  xl: 'shadow-xl',                                // Extra large
  '2xl': 'shadow-2xl',                           // 2X large (headers, modals)
  
  // Custom Inline Shadows
  perfumeCard: '0_0_20px_rgba(236,156,19,0.15)', // Perfume cards
  perfumeCardHover: '0_0_30px_rgba(236,156,19,0.25)',
  buttonPrimary: '0_4px_12px_rgba(236,156,19,0.3)',
}
```

**Usage Patterns:**
- **Headers:** `shadow-2xl` (dashboard header), `shadow-lg` (profile header)
- **Cards:** `shadow-lg` (most cards), `shadow-xl` (hover states)
- **Buttons:** `shadow-button` (custom), `shadow-lg` (hover)

---

## Part 3: Typography Scale

### Font Family

**From `tailwind.config.ts`:**

```typescript
const typography = {
  fontFamily: {
    arabic: ['var(--font-arabic)', 'sans-serif'],  // Noto Sans Arabic - Default
    sans: ['var(--font-arabic)', 'sans-serif'],    // Default to Arabic
    serif: ['Playfair Display', 'serif'],          // Logo font
    tajawal: ['Tajawal', 'sans-serif'],           // Fallback
  },
}
```

**Usage:**
- **Body text:** `font-sans` (default, uses Arabic font)
- **Logo:** `font-serif` (Playfair Display)
- **Buttons:** `font-tajawal-semibold` (CTAButton)

---

### Text Sizes

**From Component Analysis:**

```typescript
const textSizes = {
  xs: 'text-xs',        // 12px - Small labels
  sm: 'text-sm',        // 14px - Secondary text, buttons
  base: 'text-base',    // 16px - Body text (default)
  lg: 'text-lg',        // 18px - Large body text
  xl: 'text-xl',        // 20px - Section headings
  '2xl': 'text-2xl',    // 24px - Page headings
  '3xl': 'text-3xl',    // 30px - Large headings
  '4xl': 'text-4xl',    // 36px - Hero headings
  '5xl': 'text-5xl',    // 48px - Extra large
}
```

**Common Patterns:**
- **Header text:** `text-2xl` to `text-4xl` (depending on importance)
- **Body text:** `text-base` (16px)
- **Button text:** `text-sm` (14px)
- **Labels:** `text-xs` or `text-sm`

---

### Font Weights

**From Component Analysis:**

```typescript
const fontWeights = {
  normal: 'font-normal',     // 400
  medium: 'font-medium',     // 500
  semibold: 'font-semibold', // 600
  bold: 'font-bold',         // 700
  black: 'font-black',       // 900 (logo)
}
```

**Usage:**
- **Buttons:** `font-semibold` or `font-bold`
- **Headings:** `font-bold`
- **Body:** `font-normal` or `font-medium`
- **Logo:** `font-black`

---

## Part 4: Component Patterns

### Button Patterns

#### Primary Button (CTAButton)

**From `src/components/ui/CTAButton.tsx`:**

```tsx
<button className="
  inline-flex items-center justify-center 
  rounded-full 
  font-tajawal-semibold text-sm font-semibold 
  bg-gradient-to-r from-gradient-start via-primary to-gradient-end 
  shadow-button 
  text-primary-foreground 
  font-bold 
  hover:scale-[1.02] hover:shadow-lg 
  active:scale-[0.98] 
  transition-all duration-200 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50
  h-12 px-8
">
  {children}
</button>
```

#### Secondary Button (CTAButton)

```tsx
<button className="
  inline-flex items-center justify-center 
  rounded-full 
  font-tajawal-semibold text-sm font-semibold 
  border-2 border-primary 
  bg-transparent 
  shadow-border 
  hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-button 
  active:scale-[0.98] 
  transition-all duration-200 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50
  h-12 px-8
">
  {children}
</button>
```

#### Icon Button (for Header)

**From existing icon buttons:**

```tsx
<button className="
  p-2 
  min-w-[44px] min-h-[44px] 
  rounded-full 
  hover:bg-primary/10 
  transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
">
  <Icon className="w-5 h-5 text-brown-text" />
</button>
```

**Alternative (with explicit size):**

```tsx
<button className="
  w-10 h-10 
  rounded-full 
  flex items-center justify-center 
  shadow-lg 
  hover:bg-primary/10 
  transition-all 
  hover:scale-110 
  active:scale-95
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
">
  <Icon className="w-5 h-5 text-brown-text" />
</button>
```

---

### Link Patterns

**From `src/app/profile/page.tsx:170-191`:**

```tsx
<Link 
  href={item.href}
  className="
    flex items-center justify-between 
    p-5 
    hover:bg-amber-50/50 
    transition-all 
    group 
    relative
  "
>
  <div className="flex items-center gap-4">
    <div className="
      p-3 
      bg-brown/5 
      hover:bg-primary/10 
      group-hover:bg-primary/20 
      rounded-2xl 
      transition-all 
      w-12 h-12 
      flex items-center justify-center
    ">
      {icon}
    </div>
    <span className="text-base font-semibold text-brown leading-tight">
      {label}
    </span>
  </div>
  <ChevronLeft size={20} />
</Link>
```

**Simplified Link Pattern (for Header):**

```tsx
<Link 
  href="/"
  className="
    flex items-center 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 
    rounded-lg
    hover:opacity-80
    transition-opacity
  "
>
  <Logo />
</Link>
```

---

### Interactive States

**From Component Analysis:**

```typescript
const interactiveStates = {
  // Hover States
  hover: {
    background: 'hover:bg-primary/10',        // Light primary background
    backgroundAlt: 'hover:bg-amber-50/50',    // Amber tint
    scale: 'hover:scale-[1.02]',              // Slight scale up
    shadow: 'hover:shadow-lg',                // Increase shadow
    border: 'hover:border-primary/50',         // Primary border
    text: 'hover:text-primary',                // Primary text color
  },
  
  // Active States
  active: {
    scale: 'active:scale-[0.98]',             // Slight scale down
    background: 'active:bg-primary/20',       // Darker background
  },
  
  // Focus States
  focus: {
    ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    // Standard pattern used throughout project
  },
  
  // Disabled States
  disabled: {
    opacity: 'disabled:opacity-50',
    cursor: 'disabled:cursor-not-allowed',
    pointer: 'disabled:pointer-events-none',
  },
}
```

**Standard Focus Pattern (Used Everywhere):**
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
```

---

### Animation Patterns

#### Framer Motion

**From `src/app/page.tsx`:**

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
}
```

**Common Animation Presets:**

```typescript
// Fade In
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
}

// Slide Up
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

// Scale
const scale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 }
}
```

#### CSS Transitions

**Common Patterns:**

```typescript
const transitions = {
  default: 'transition-all duration-200',      // Most common
  colors: 'transition-colors',                // Color changes only
  transform: 'transition-transform',          // Transform only
  long: 'transition-all duration-300',        // Longer duration
  fast: 'transition-all duration-150',       // Faster
}
```

---

## Part 5: Icon Usage Patterns

### Icon System

**Library:** `lucide-react` ✅

**Common Icon Sizes:**

```typescript
const iconSizes = {
  xs: 'w-4 h-4',      // 16px - Small icons, inline text
  sm: 'w-5 h-5',      // 20px - Standard (most common)
  md: 'w-6 h-6',      // 24px - Medium, buttons
  lg: 'w-8 h-8',      // 32px - Large, headers
}
```

**Usage:**
- **Header icons:** `w-5 h-5` (20px) - Standard size
- **Button icons:** `w-5 h-5` or `w-6 h-6`
- **Inline icons:** `w-4 h-4`

**Icon Colors:**

```typescript
const iconColors = {
  default: 'text-brown-text',        // Inherit text color
  primary: 'text-primary',           // Primary color
  white: 'text-white',               // White (on dark backgrounds)
  muted: 'text-brown-text/60',       // Muted
  inherit: '',                       // Inherit from parent
}
```

**Icon in Buttons - Spacing:**

```tsx
// Icon before text
<Icon className="w-5 h-5 me-2" />
<span>Text</span>

// Icon after text
<span>Text</span>
<Icon className="w-5 h-5 ms-2" />
```

---

## Part 6: Responsive Patterns

### Mobile Navigation

**Status:** ❌ **NO existing hamburger menu found**

**Mobile Breakpoints:**

```typescript
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets (most common)
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

**Common Responsive Patterns:**

```tsx
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="lg:hidden"

// Responsive padding
className="px-4 md:px-6 lg:px-8"

// Responsive text size
className="text-2xl md:text-3xl lg:text-4xl"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

### Container Patterns

**From Component Analysis:**

```typescript
const containers = {
  // Standard Container
  standard: 'container mx-auto px-4',
  
  // With Max Width
  constrained: 'container mx-auto px-4 max-w-6xl',
  
  // Full Width with Padding
  fullWidth: 'px-4 md:px-6',
  
  // Centered Content
  centered: 'max-w-4xl mx-auto px-4',
}
```

**Common Patterns:**
- **Page containers:** `container mx-auto px-4 py-8 max-w-6xl`
- **Header containers:** `container mx-auto px-4` (no max-width for full-width header)
- **Content sections:** `max-w-4xl mx-auto px-4`

---

## Part 7: Z-Index Strategy

### Layering System

**From Code Analysis:**

```typescript
const zIndex = {
  // Base Content
  base: 'z-0',              // Default (no z-index)
  
  // Overlays
  overlay: 'z-10',           // Dropdowns, tooltips
  overlayAlt: 'z-20',        // Card hover buttons, overlays
  
  // Header/Navigation
  header: 'z-30',            // Header (recommended)
  sticky: 'z-30',            // Sticky elements
  
  // Modals/Important
  modal: 'z-50',             // Modals, fixed CTAs, loading overlays
  modalAlt: 'z-[60]',        // Mobile filter modal
  modalHighest: 'z-[100]',   // Feedback modal (highest)
  
  // Tooltips
  tooltip: 'z-50',           // Tooltips
}
```

**Z-Index Hierarchy:**

```
z-[100]  - FeedbackModal (highest)
z-[60]   - MobileFilterModal
z-50     - AdminModal, Loading Overlays, Fixed CTAs, Tooltips
z-30     - Header (recommended) ← Add here
z-20     - Card hover buttons, overlays
z-10     - Dropdowns, tooltips
z-0      - Content (default)
```

**Recommendation for Header:**
- **Z-index:** `z-30` ✅
- **Reason:** Above content, below modals
- **If sticky:** `sticky top-0 z-30`

---

## Part 8: Loading States

### Loading Patterns

**Component:** `src/components/LoadingSpinner.tsx` ✅

**Usage:**

```tsx
<LoadingSpinner 
  type={3}                    // Type 1, 2, or 3
  message="جاري التحميل..."   // Optional message
  size="md"                   // sm, md, lg
/>
```

**Types:**
- **Type 1:** Spinning circles
- **Type 2:** Progress bar
- **Type 3:** Icon with bouncing dots (most common)

**Skeleton Loading:**

**Not found in project** - No skeleton components

**Alternative Loading States:**

```tsx
// Simple spinner
<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />

// Loading text
<div className="text-center">
  <LoadingSpinner size="md" />
  <p className="text-brown-text/70 mt-4">جاري التحميل...</p>
</div>
```

**For Header Loading State:**

```tsx
{status === 'loading' && (
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">جاري التحميل...</span>
  </div>
)}
```

---

## Part 9: Recommended Header Styling

### Complete Header Structure

**Based on Project Patterns:**

```tsx
'use client'

import { useSession } from 'next-auth/react'
import { Heart, User, Search, Menu } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header 
      dir="rtl"
      className="
        sticky top-0 
        z-30 
        bg-white/90 
        backdrop-blur-sm 
        border-b border-brown-text/20 
        shadow-lg
      "
    >
      <nav className="
        container mx-auto 
        px-4 py-3 
        flex items-center justify-between
      ">
        {/* Start (Right) - Actions */}
        <div className="flex items-center gap-2">
          {/* User Icon */}
          <button
            className="
              p-2 
              min-w-[44px] min-h-[44px] 
              rounded-full 
              hover:bg-primary/10 
              transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            "
            aria-label="قائمة المستخدم"
          >
            <User className="w-5 h-5 text-brown-text" />
          </button>

          {/* Favorites Icon */}
          <button
            className="
              p-2 
              min-w-[44px] min-h-[44px] 
              rounded-full 
              hover:bg-primary/10 
              transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            "
            aria-label="المفضلة"
          >
            <Heart className="w-5 h-5 text-brown-text" />
          </button>

          {/* Mobile Menu */}
          <button
            className="
              p-2 
              min-w-[44px] min-h-[44px] 
              rounded-full 
              hover:bg-primary/10 
              transition-colors 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              lg:hidden
            "
            aria-label="القائمة"
          >
            <Menu className="w-5 h-5 text-brown-text" />
          </button>
        </div>

        {/* End (Left) - Logo */}
        <Link
          href="/"
          className="
            flex items-center 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 
            rounded-lg
            hover:opacity-80
            transition-opacity
          "
          aria-label="الصفحة الرئيسية"
        >
          <span className="font-serif italic text-2xl font-black text-primary">
            Ask Seba
          </span>
        </Link>
      </nav>
    </header>
  )
}
```

---

## Part 10: Dropdown Implementation

### Recommended: Install @radix-ui/react-dropdown-menu

**Installation:**
```bash
npm install @radix-ui/react-dropdown-menu@^1.1.15
```

**Implementation Example:**

```tsx
'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { User, LogOut, Settings, Heart } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function UserDropdown() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="
            p-2 
            min-w-[44px] min-h-[44px] 
            rounded-full 
            hover:bg-primary/10 
            transition-colors 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          "
          aria-label="قائمة المستخدم"
        >
          <User className="w-5 h-5 text-brown-text" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          side="bottom"
          sideOffset={8}
          className="
            min-w-[200px] 
            bg-white 
            rounded-2xl 
            shadow-2xl 
            border border-brown-text/10 
            p-2
            z-50
          "
          dir="rtl"
        >
          {session ? (
            <>
              <DropdownMenu.Item
                className="
                  flex items-center gap-3 
                  px-4 py-3 
                  rounded-xl 
                  text-right 
                  text-brown-text 
                  hover:bg-primary/10 
                  cursor-pointer 
                  outline-none 
                  focus:bg-primary/10
                "
                onSelect={() => router.push('/profile')}
              >
                <User className="w-5 h-5" />
                <span>الملف الشخصي</span>
              </DropdownMenu.Item>

              <DropdownMenu.Item
                className="
                  flex items-center gap-3 
                  px-4 py-3 
                  rounded-xl 
                  text-right 
                  text-brown-text 
                  hover:bg-primary/10 
                  cursor-pointer 
                  outline-none 
                  focus:bg-primary/10
                "
                onSelect={() => router.push('/dashboard')}
              >
                <Heart className="w-5 h-5" />
                <span>المفضلة</span>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-px bg-brown-text/10 my-2" />

              <DropdownMenu.Item
                className="
                  flex items-center gap-3 
                  px-4 py-3 
                  rounded-xl 
                  text-right 
                  text-red-600 
                  hover:bg-red-50 
                  cursor-pointer 
                  outline-none 
                  focus:bg-red-50
                "
                onSelect={async () => {
                  await signOut({ callbackUrl: '/' })
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </DropdownMenu.Item>
            </>
          ) : (
            <DropdownMenu.Item
              className="
                flex items-center gap-3 
                px-4 py-3 
                rounded-xl 
                text-right 
                text-brown-text 
                hover:bg-primary/10 
                cursor-pointer 
                outline-none 
                focus:bg-primary/10
              "
              onSelect={() => router.push('/login')}
            >
              <User className="w-5 h-5" />
              <span>تسجيل الدخول</span>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
```

---

## Summary & Action Items

### Dependencies

- ✅ **Install:** `@radix-ui/react-dropdown-menu@^1.1.15`
- ✅ **All other dependencies:** Already installed

### Design Tokens

- ✅ **Colors:** Extracted from `tailwind.config.ts`
- ✅ **Spacing:** Documented from component analysis
- ✅ **Typography:** Documented from config and usage
- ✅ **Shadows:** Custom shadows documented

### Component Patterns

- ✅ **Buttons:** CTAButton and Button patterns documented
- ✅ **Links:** Link patterns extracted
- ✅ **Interactive states:** Hover, focus, active, disabled documented
- ✅ **Animations:** Framer Motion patterns documented

### Implementation Ready

- ✅ **Header structure:** Complete example provided
- ✅ **Dropdown:** Radix UI implementation provided
- ✅ **Z-index:** Strategy documented (z-30 for header)
- ✅ **Loading states:** LoadingSpinner usage documented

---

**Report Status:** ✅ Complete  
**Ready for Implementation:** ✅ YES  
**Missing Dependencies:** 1 (dropdown-menu - install recommended)

---

**Next Steps:**
1. Install `@radix-ui/react-dropdown-menu@^1.1.15`
2. Implement Header using provided patterns
3. Implement UserDropdown using Radix UI
4. Test responsive behavior
5. Verify z-index layering
6. Test accessibility (keyboard navigation, screen readers)
