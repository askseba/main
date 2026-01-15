# Cursor Prompt - ask.seba Pages Implementation

## TASK: Create 3 Production-Ready Pages

Create `/about`, `/faq`, and `/privacy` pages for ask.seba using the provided package.

---

## DATA SOURCE

**File**: `content.json`

Use this single JSON file as your data source for all 3 pages:
- `content.json.about` → `/about` page
- `content.json.faq` → `/faq` page
- `content.json.privacy` → `/privacy` page

---

## UI SPECIFICATIONS

**File**: `ui-mapping.md`

Reference this file for:
- Component structure and naming
- Design tokens (colors, typography, spacing)
- Responsive breakpoints
- Animation specifications
- Accessibility requirements

Key design tokens:
```
Colors:
- background: #F2F0EB (cream)
- text-primary: #5B4233 (brown)
- accent: #c0841a (amber)
- gradient: linear(#2f6f73 → #c0841a)

Typography:
- Font: Tajawal
- H1: 48px Bold
- H2: 32px Regular
- Body: 16px Regular

Spacing:
- padding: p-6
- gap: gap-6
- rounded: rounded-3xl
```

---

## REQUIRED FIXES

**File**: `profile-links-fix.md`

Fix navigation in `src/app/profile/page.tsx` (lines 176-182):
1. REMOVE: `onClick` preventDefault handlers
2. REPLACE: with `<Link href={...}>` components
3. ROUTES: `/about`, `/faq`, `/privacy`
4. BACK BUTTON: Add back button to each new page linking to `/profile`

---

## ACCEPTANCE CRITERIA

**File**: `acceptance-criteria.md`

All checkboxes must pass:

### ABOUT Page
- [ ] Hero title and subtitle display correctly
- [ ] 4 feature cards display (story, problem, solution, how-it-works)
- [ ] Stats section: 4 numbers (50,000+, 95%+, 0%, 3 دقائق)
- [ ] 3 testimonials with carousel/slide
- [ ] 5 value cards
- [ ] Final CTA button links to `/quiz`
- [ ] All animations smooth
- [ ] RTL layout correct
- [ ] Responsive: 375px → 1024px

### FAQ Page
- [ ] Hero title and subtitle
- [ ] Search input with real-time filtering
- [ ] 6 categories with 14+ questions
- [ ] Single accordion expand (one open at a time)
- [ ] All questions and answers complete
- [ ] Numbers preserved (50,000+, 95%+, 80%+, etc.)
- [ ] Mobile-friendly
- [ ] RTL layout correct

### PRIVACY Page
- [ ] Hero with last_updated: "يناير 2026"
- [ ] Summary bullets: 5 points with icons
- [ ] 7 numbered sections (accordion)
- [ ] All section content complete
- [ ] Contact card with email link
- [ ] Compliance badge (GDPR + Saudi PDPL)
- [ ] TOC sidebar (optional, desktop only)
- [ ] RTL layout correct

### General
- [ ] `npm run build`: 0 errors
- [ ] `npm run lint`: 0 warnings
- [ ] Lighthouse score: >90
- [ ] No console errors
- [ ] All links working
- [ ] Back buttons to `/profile` functional

---

## IMPLEMENTATION STEPS

### 1. Setup Pages
```bash
# Create page files
src/app/about/page.tsx
src/app/faq/page.tsx
src/app/privacy/page.tsx
```

### 2. Create Components
Based on `ui-mapping.md`:
- PageHero (for all pages)
- FeatureCards (about)
- StatsGrid (about)
- QuoteCards (about)
- ValueCards (about)
- SearchInput (faq)
- AccordionGroup (faq)
- AccordionItem (faq)
- SummaryBullets (privacy)
- NumberedSections (privacy)
- ContactCard (privacy)
- ComplianceBadge (privacy)

### 3. Import Data
```typescript
import content from '@/data/content.json'

// In /about page
const aboutData = content.about

// In /faq page
const faqData = content.faq

// In /privacy page
const privacyData = content.privacy
```

### 4. Build Pages
- Use Radix UI Accordion for FAQ and Privacy
- Use Framer Motion for animations
- Use Lucide React for icons
- Ensure RTL support (dir="rtl", text-right, mr-auto)
- Mobile-first responsive design

### 5. Fix Navigation
- Update `src/app/profile/page.tsx` lines 176-182
- Remove onClick preventDefault
- Use `<Link href={...}>` components
- Add back buttons to new pages

### 6. Test & Validate
- Run `npm run build` (0 errors)
- Run `npm run lint` (0 warnings)
- Check Lighthouse >90
- Verify all acceptance criteria
- Test on mobile (375px) and desktop (1024px)

---

## CRITICAL REQUIREMENTS

### Data Integrity
- ✅ All numbers MUST be preserved exactly:
  - 50,000+ (not 50000 or 50k)
  - 95%+ (not 95 or 0.95)
  - 0% (not empty)
  - 3 دقائق (not 3 minutes)
- ✅ All text MUST match content.json exactly
- ✅ No typos or modifications

### Design System
- ✅ Use ONLY the colors from ui-mapping.md
- ✅ Typography: Tajawal Bold/Regular only
- ✅ Spacing: p-6, gap-6, py-8 (no custom values)
- ✅ Cards: rounded-3xl, shadow-lg, border-brown-20
- ✅ Hover: hover:bg-amber-50/50

### RTL Support
- ✅ dir="rtl" on root elements
- ✅ text-right for all text
- ✅ mr-auto instead of ml-auto
- ✅ flex-row-reverse where needed
- ✅ No text breaking or overflow

### Performance
- ✅ Lighthouse >90 (required)
- ✅ No console errors or warnings
- ✅ Lazy load images
- ✅ Code split by page
- ✅ Optimize fonts (swap strategy)

### Accessibility
- ✅ WCAG AA compliance
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML (nav, main, section, article)
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Focus indicators visible

---

## FILE REFERENCES

### Data
- `content.json` - All page content (structured)
- `content-spec.md` - Content specification (readable)

### Design
- `ui-mapping.md` - Component mapping and design tokens
- `profile-links-fix.md` - Navigation fixes required

### Testing
- `acceptance-criteria.md` - All test cases and checkboxes

---

## PRODUCTION READINESS

Before deployment, verify:

```bash
# Build
npm run build
# Output: ✅ 0 errors

# Lint
npm run lint
# Output: ✅ 0 warnings

# Lighthouse
# Score: >90 (all metrics)

# Tests
# All acceptance criteria: ✅ PASS
```

---

## DELIVERABLES

✅ 3 fully functional pages:
- `/about` - Company story and values
- `/faq` - Questions and answers with search
- `/privacy` - Privacy policy with compliance

✅ All components created and styled
✅ Navigation fixed and tested
✅ RTL support verified
✅ Mobile responsive (375px minimum)
✅ Lighthouse >90
✅ Zero console errors
✅ Production ready

---

## NOTES

- Use the exact data from `content.json` - no modifications
- Follow `ui-mapping.md` for all design decisions
- Implement all items in `acceptance-criteria.md`
- Fix navigation as specified in `profile-links-fix.md`
- Test on real devices (mobile and desktop)
- Verify RTL rendering carefully
- Ensure all links are functional
- Check performance metrics

---

**PRODUCTION READY ✅**

All 3 pages are ready for deployment to production.
