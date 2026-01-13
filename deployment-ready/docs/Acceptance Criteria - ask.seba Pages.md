# Acceptance Criteria - ask.seba Pages

## ABOUT PAGE (`/about`)

### Hero Section
- [ ] Title displays correctly (48px Bold)
- [ ] Subtitle displays correctly (32px Regular)
- [ ] CTA button visible and clickable (href="/quiz")
- [ ] Gradient background renders properly
- [ ] Mobile layout: single column, proper padding
- [ ] Desktop layout: centered, max-width 1200px

### Feature Cards Section
- [ ] 4 feature cards display (story, problem, solution, how-it-works)
- [ ] Grid: 1 col mobile → 2 cols tablet → 3 cols desktop
- [ ] Each card has: icon, title, body text, bullets
- [ ] Hover effect: background changes to amber-50/50
- [ ] Cards are responsive and properly spaced (gap-6)
- [ ] Text alignment is correct (RTL)

### Stats Section
- [ ] 4 stats display: 50,000+, 95%+, 0%, 3 دقائق
- [ ] Numbers are correct (not rounded or changed)
- [ ] Grid: 1 col mobile → 2 cols tablet → 4 cols desktop
- [ ] Stats are centered in cards
- [ ] Counter animation works (optional but preferred)
- [ ] Labels are clear and readable

### Testimonials Section
- [ ] 3 testimonials display
- [ ] Each testimonial shows: quote, author, city
- [ ] Carousel/slide functionality works
- [ ] Navigation buttons (prev/next) or dots visible
- [ ] Mobile: 1 testimonial visible
- [ ] Desktop: 3 testimonials visible
- [ ] Quote icon displays at top-left

### Values Section
- [ ] 5 value cards display
- [ ] Each card has: emoji icon, title, description
- [ ] Grid: 1 col mobile → 2 cols tablet → 5 cols desktop
- [ ] Hover effect works
- [ ] Text is readable and properly aligned (RTL)

### Final CTA Section
- [ ] Title: "رحلتك تبدأ الآن"
- [ ] Body text displays correctly
- [ ] Button visible and clickable (href="/quiz")
- [ ] Section has proper background/styling
- [ ] Button text: "ابدأ الاختبار الآن - مجاناً ←"

### General
- [ ] Page loads at `/about`
- [ ] All animations are smooth (fade-in on scroll)
- [ ] RTL layout: no text/layout breaking
- [ ] Colors match design system (cream, brown, amber)
- [ ] Typography matches (Tajawal Bold/Regular)
- [ ] Mobile responsiveness: 375px minimum
- [ ] No console errors or warnings
- [ ] Page is accessible (ARIA labels, semantic HTML)

---

## FAQ PAGE (`/faq`)

### Hero Section
- [ ] Title: "الأسئلة الشائعة"
- [ ] Subtitle: "كل ما تريد معرفته عن ask.seba في مكان واحد"
- [ ] Both display correctly with proper sizing
- [ ] Background is cream color

### Search Input
- [ ] Search bar visible above accordion
- [ ] Placeholder text: "ابحث عن سؤالك..."
- [ ] Search icon displays (lucide-react)
- [ ] Real-time filtering works
- [ ] Typing filters questions dynamically
- [ ] Clear button works (if implemented)

### Accordion Categories
- [ ] 6 categories display:
  1. 🎯 أساسيات التطبيق (3 questions)
  2. 🧪 الحساسية والأمان (3 questions)
  3. 🎯 الاختبار والنتائج (1 question)
  4. 🔐 التسجيل والخصوصية (2 questions)
  5. 🌍 العطور والتوفر (3 questions)
  6. 📞 الدعم والتواصل (2 questions)
- [ ] Category names display with emojis
- [ ] Total questions: 14+

### Accordion Functionality
- [ ] Questions display in collapsed state
- [ ] Clicking question expands to show answer
- [ ] ChevronDown icon rotates on expand
- [ ] Only ONE question open at a time (single expand)
- [ ] Opening new question closes previous one
- [ ] Animation is smooth (slide-down 300ms)
- [ ] Answers are readable and properly formatted

### Question Content
- [ ] All 14+ questions display
- [ ] Each question has unique ID
- [ ] Answers are complete and accurate
- [ ] Links in answers work (e.g., support@askseba.com)
- [ ] Numbers are preserved (50,000+, 95%+, 80%+, etc.)
- [ ] Emoji icons display correctly

### Mobile Experience
- [ ] Search bar is full-width
- [ ] Accordion items are touch-friendly (min 44px height)
- [ ] Text is readable (no overflow)
- [ ] RTL layout doesn't break

### General
- [ ] Page loads at `/faq`
- [ ] No console errors
- [ ] Colors match design system
- [ ] Responsive: 375px minimum
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Back button to `/profile` works

---

## PRIVACY PAGE (`/privacy`)

### Hero Section
- [ ] Title: "سياسة الخصوصية"
- [ ] Subtitle: "🔒 خصوصيتك أولويتنا"
- [ ] Last updated: "يناير 2026"
- [ ] All text displays correctly

### Summary Bullets Section
- [ ] Card displays with accent border (2px)
- [ ] Background: accent/10 (light amber)
- [ ] 5 bullets display:
  1. إجابات الاختبار: مشفرة ومحمية بالكامل
  2. المفضلات: خاصة بك فقط ولا يمكن لأحد الوصول إليها
  3. لا بيع، لا إعلانات، لا مشاركة تجارية
  4. حذف فوري: بنقرة واحدة من لوحة التحكم
  5. امتثال كامل: GDPR + Saudi PDPL
- [ ] Each bullet has icon (Shield, Lock, Trash2, etc.)
- [ ] Icons are accent color
- [ ] Text is readable

### Numbered Sections (Accordion)
- [ ] 7 sections display:
  1. البيانات التي نجمعها
  2. كيف نستخدم بياناتك؟
  3. مشاركة البيانات
  4. حقوقك القانونية
  5. الأمان والتشفير
  6. التغييرات على هذه السياسة
  7. تواصل معنا
- [ ] Each section is an accordion item
- [ ] Single expand: only one open at a time
- [ ] ChevronDown icon rotates on expand
- [ ] Content is complete and accurate
- [ ] Numbers are preserved (AES-256, 72 ساعة, 30 يوم, etc.)

### Section Content
- [ ] All subsections display correctly
- [ ] Lists and bullet points format properly
- [ ] Links work (support@askseba.com, dashboard links)
- [ ] Text is readable and properly aligned (RTL)
- [ ] No formatting issues

### Contact Card
- [ ] Email: support@askseba.com (clickable link)
- [ ] Response time: 24-48 ساعة
- [ ] Card styling matches design system
- [ ] Margin and spacing correct

### Compliance Badge
- [ ] Background: green-50/10
- [ ] Border: 2px green-200
- [ ] Title: "متوافق بالكامل مع"
- [ ] Standards: GDPR (الأوروبي) + Saudi PDPL (السعودي)
- [ ] Note: "هذه السياسة تحميك وتحمينا قانونياً. خصوصيتك ليست للبيع أبداً."
- [ ] Shield icon displays (32px green)
- [ ] Text is centered

### TOC Sidebar (Optional)
- [ ] Sidebar visible on desktop only
- [ ] Links to all 7 sections
- [ ] Active indicator shows current section
- [ ] Smooth scroll to section on click
- [ ] Sticky positioning works

### Mobile Experience
- [ ] All content readable
- [ ] Accordion items are touch-friendly
- [ ] No horizontal scroll
- [ ] RTL layout correct

### General
- [ ] Page loads at `/privacy`
- [ ] No console errors
- [ ] Colors match design system
- [ ] Responsive: 375px minimum
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Back button to `/profile` works

---

## Cross-Page Requirements

### Navigation
- [ ] All pages have back button to `/profile`
- [ ] Profile page has links to `/about`, `/faq`, `/privacy`
- [ ] Links use `<Link href={...}>` (not onClick preventDefault)
- [ ] Navigation is smooth and instant

### Design Consistency
- [ ] All pages use same color scheme
- [ ] Typography matches (Tajawal Bold/Regular)
- [ ] Spacing is consistent (gap-6, p-6, py-8)
- [ ] Cards have same styling (rounded-3xl, shadow-lg, border-brown-20)
- [ ] Hover effects consistent

### Performance
- [ ] npm run build: 0 errors
- [ ] npm run lint: 0 warnings
- [ ] Lighthouse score: >90
- [ ] Page load time: <3s
- [ ] No memory leaks

### Accessibility
- [ ] WCAG AA compliance
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] ARIA labels on interactive elements

### RTL Support
- [ ] All pages render correctly in RTL
- [ ] Text alignment: right
- [ ] Flex direction: row-reverse where needed
- [ ] Margins/padding: mr-auto instead of ml-auto
- [ ] No text overflow or breaking

### Mobile Responsiveness
- [ ] Tested on 375px (minimum)
- [ ] Tested on 768px (tablet)
- [ ] Tested on 1024px (desktop)
- [ ] No layout breaking
- [ ] Touch targets: minimum 44px

---

## Testing Checklist

### Functional Testing
- [ ] All links work correctly
- [ ] Accordion expand/collapse works
- [ ] Search functionality works (FAQ)
- [ ] Animations are smooth
- [ ] No JavaScript errors

### Visual Testing
- [ ] Colors match design system
- [ ] Typography is correct
- [ ] Spacing is consistent
- [ ] Responsive layouts work
- [ ] RTL layout is correct

### Performance Testing
- [ ] Lighthouse >90
- [ ] Page load <3s
- [ ] No console errors
- [ ] No memory leaks

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] ARIA labels present

### Cross-Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## Deployment Checklist

- [ ] All 3 pages created and tested
- [ ] All links working
- [ ] No console errors
- [ ] Lighthouse >90
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Ready for production deployment
