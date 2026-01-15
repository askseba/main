# APP Visual Source of Truth

هذا الملف يوثق الواقع البصري لكل Route في التطبيق.

---

# Route: /
**النوع:** عام  
**موجود في Audit الحالي:** نعم  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط
**القسم العلوي (Hero Section):**

1. **اللوجو "Ask Seba":**
   - النص: "Ask Seba"
   - الخط: Serif Italic (Playfair Display)
   - الحجم: text-[72px] على Desktop (72px)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-black
   - الموقع: في المنتصف في الأعلى
   - المسافة السفلية: mb-12 على Desktop

2. **العنوان الرئيسي:**
   - النص: "اكتشف عطرك المثالي في ٣ دقائق"
   - الحجم: text-[48px] على Desktop (48px)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-bold
   - الموقع: في المنتصف أسفل اللوجو
   - المسافة السفلية: mb-8 على Desktop
   - line-height: leading-tight

3. **الوصف الفرعي:**
   - النص: "اختبار علمي ذكي يحلل شخصيتك ويفضل لك العطور المثالية من آلاف الخيارات العالمية"
   - الحجم: text-xl على Desktop (20px)
   - اللون: text-brown-text/70 (#5B4233 مع شفافية 70%)
   - الموقع: في المنتصف أسفل العنوان الرئيسي
   - المسافة السفلية: mb-12 على Desktop
   - max-width: max-w-2xl
   - line-height: leading-relaxed

4. **الزر الرئيسي "ابدأ الاختبار":**
   - النص: "ابدأ الاختبار"
   - النوع: Link (يربط إلى /quiz)
   - الحجم: size="lg" (h-14 = 56px)
   - Padding: px-16 على Desktop (64px) و py-6 (24px)
   - الخلفية: bg-gradient-to-r from-gradient-start via-primary to-gradient-end
     - gradient-start: #2f6f73
     - primary: #c0841a
     - gradient-end: #c0841a
   - الظل: shadow-button (0 10px 25px rgba(47,111,115,0.2))
   - النص: text-primary-foreground (أبيض)
   - الوزن: font-bold
   - الشكل: rounded-full
   - Hover Effect: scale-[1.02] و hover:shadow-lg
   - Active Effect: scale-[0.98]
   - الموقع: في المنتصف أسفل الوصف
   - المسافة السفلية: mb-12

5. **Trust Indicators (مؤشرات الثقة):**
   - الموقع: في المنتصف أسفل الزر الرئيسي
   - Layout: flex-row على Desktop
   - Gap: gap-6
   - Font Size: text-sm
   - اللون: text-brown-text/60
   
   **مؤشر 1:**
   - دائرة خضراء: w-6 h-6 (24px) bg-safe-green (#10B981) rounded-full
   - النص: "دقة ٩٢٪"
   - Gap بين الدائرة والنص: gap-2
   
   **مؤشر 2:**
   - دائرة برتقالية: w-6 h-6 (24px) bg-warning-orange (#F59E0B) rounded-full
   - النص: "١٠٠٠٠+ مستخدم"
   - Gap بين الدائرة والنص: gap-2

**القسم الأوسط (Featured Perfumes Section):**

1. **عنوان القسم:**
   - النص: "أفضل العطور المُوصى بها"
   - الحجم: text-4xl على Desktop (40px)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-bold
   - الموقع: في المنتصف
   - المسافة السفلية: mb-4

2. **وصف القسم:**
   - النص: "ابدأ رحلتك مع هذه التحف الفاخرة المختارة خصيصًا"
   - الحجم: text-lg (18px)
   - اللون: text-brown-text/60
   - max-width: max-w-2xl
   - الموقع: في المنتصف أسفل العنوان

3. **خلفية القسم:**
   - bg-white (#FFFFFF)
   - Padding: py-32 على Desktop

4. **Grid Layout:**
   - md:grid-cols-3 على Desktop (3 أعمدة)
   - gap-8 على Desktop

**كروت العطور (3 كروت):**

**كارت 1: Chanel Bleu de Chanel**
- **اسم العطر:** "Bleu de Chanel"
- **العلامة التجارية:** "Chanel"
- **نسبة التطابق:** 92%
- **الوصف:** "تولیفة ساحرة تجمع بین دهن العود الكمبودي والمسك الأسود."
- **شارة الأمان:** 🛡 "آمن"
- **صورة:** موجودة (aspect ratio 4:5)
- **الزر:** "أضف للتحليل" (أو "تمت الإضافة ✓" إذا تم الضغط)
- **الحالة الحالية:** تم الضغط على الزر - يظهر "تمت الإضافة ✓" و "إزالة من التحليل"

**كارت 2: Hermès Terre d'Hermès**
- **اسم العطر:** "Terre d'Hermès"
- **العلامة التجارية:** "Hermès"
- **نسبة التطابق:** 90%
- **الوصف:** "تولیفة ساحرة تجمع بین دهن العود الكمبودي والمسك الأسود."
- **شارة الأمان:** 🛡 "آمن"
- **صورة:** موجودة
- **الزر:** "تمت الإضافة ✓" و "إزالة من التحليل" (بعد الضغط على الكارت)

**كارت 3: Creed Aventus**
- **اسم العطر:** "Creed Aventus"
- **العلامة التجارية:** "Creed"
- **نسبة التطابق:** 90%
- **الوصف:** "تولیفة ساحرة تجمع بین دهن العود الكمبودي والمسك الأسود."
- **شارة الأمان:** 🛡 "آمن"
- **صورة:** موجودة
- **الزر:** "أضف للتحليل"

## Mobile View - ماذا أرى بالضبط
- **التغييرات الملاحظة:**
  - اللوجو: أصبح 48px بدلاً من 72px
  - العنوان الرئيسي: أصبح 36px بدلاً من 48px
  - الوصف: أصبح 18px بدلاً من 20px
  - الزر الرئيسي: padding أصبح px-12 بدلاً من px-16
  - Trust Indicators: أصبحت في عمود واحد بدلاً من صف واحد
  - كروت العطور: أصبحت في عمود واحد بدلاً من 3 أعمدة
  - المسافات: py-20 بدلاً من py-32

- **الأحجام الجديدة:**
  - Logo: text-5xl (48px)
  - العنوان: text-4xl (36px)
  - الوصف: text-lg (18px)
  - الزر: px-12 (48px)

- **Layout:**
  - Hero Section: عمودي كامل
  - Trust Indicators: flex-col (عمودي)
  - Perfumes Grid: grid-cols-1 (عمود واحد)

## التفاعلات - اختبار كل زر
- "ابدأ الاختبار" → الانتقال إلى /quiz → يعمل ✅
- "أضف للتحليل" (كارت 1) → تغيير الزر إلى "تمت الإضافة ✓" و "إزالة من التحليل" → يعمل ✅
- "أضف للتحليل" (كارت 2) → الانتقال إلى /perfume/5/ (عند الضغط على الكارت) → يعمل جزئياً ⚠️
- رابط الكارت نفسه (غير الزر) → الانتقال إلى /perfume/[id] → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**
- لا توجد حالة Loading حالياً
- البيانات محلية (static) من `getFeaturedPerfumes(3)`
- التحميل فوري (أقل من ثانية)
- لا يوجد spinner أو مؤشر تحميل
- الأزرار والروابط متاحة فوراً

**Empty (فارغ):**
- لا توجد حالة Empty حالياً
- الصفحة تعرض دائماً 3 عطور محلية
- لا توجد رسالة "لا توجد عطور" أو Empty State
- لا توجد CTA للحالة الفارغة

**Error (خطأ):**
- لا توجد حالة Error حالياً
- البيانات محلية، لا يوجد API calls
- لا توجد رسائل خطأ أو error handling
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل

---

# Route: /quiz
**النوع:** محمي  
**موجود في Audit الحالي:** نعم  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط
**القسم الأوسط (المحتوى الرئيسي):**

1. **العنوان:**
   - النص: "صبا - بصمتك العطرية"
   - الحجم: text-4xl (40px)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-bold (700)
   - الموقع: في المنتصف في الأعلى
   - المسافة السفلية: mb-6 (24px)

2. **الوصف:**
   - النص: "اكتشف العطور المثالية لك من خلال اختبار بسيط"
   - الحجم: text-xl (20px)
   - اللون: text-brown-text/80 (rgba(91, 66, 51, 0.8))
   - الموقع: في المنتصف أسفل العنوان
   - المسافة السفلية: mb-12 (48px)
   - max-width: max-w-md
   - text-align: text-center
   - line-height: leading-relaxed

3. **الزر الرئيسي "ابدأ الاختبار":**
   - النص: "ابدأ الاختبار"
   - النوع: Link (يربط إلى /quiz/step1-favorites)
   - الخلفية: bg-gradient-to-r from-primary (#c0841a) to-[#eab308] (أصفر)
   - النص: text-white
   - Padding: px-12 (48px) py-6 (24px)
   - الشكل: rounded-3xl
   - الوزن: font-bold
   - الحجم: text-xl (20px)
   - الظل: shadow-2xl
   - Hover Effect: hover:shadow-3xl hover:-translate-y-1 (يرتفع قليلاً)
   - Transition: transition-all
   - Layout: inline-flex items-center gap-3
   - الأيقونة: SVG سهم (w-6 h-6) يشير إلى اليسار (في RTL)
   - الموقع: في المنتصف أسفل الوصف

**الخلفية:**
- bg-gradient-to-br from-amber-50 to-orange-50 (متدرج من amber-50 إلى orange-50)
- min-height: min-h-screen
- Layout: flex flex-col items-center justify-center
- Padding: p-8 (32px)
- direction: dir="rtl"

## Mobile View - ماذا أرى بالضبط
- **التغييرات الملاحظة:**
  - العنوان: نفس الحجم (40px)
  - الوصف: نفس الحجم (20px)
  - الزر: نفس الحجم (px-12 py-6)
  - Padding: p-8 (32px) - نفس الحجم

- **الأحجام الجديدة:**
  - لا يوجد تغيير في الأحجام (التصميم responsive بنفس الأحجام)

- **Layout:**
  - نفس التخطيط - flex-col items-center justify-center
  - المحتوى في المنتصف على جميع الأحجام

## التفاعلات - اختبار كل زر
- "ابدأ الاختبار" → الانتقال إلى /quiz/step1-favorites → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**
- لا توجد حالة Loading حالياً
- الصفحة بسيطة (static) بدون async operations أو API calls
- التحميل فوري (أقل من ثانية)
- لا يوجد spinner أو مؤشر تحميل
- الزر والروابط متاحة فوراً

**Empty (فارغ):**
- لا توجد حالة Empty حالياً
- الصفحة تعرض دائماً نفس المحتوى (عنوان، وصف، زر)
- لا توجد رسالة "لا يوجد محتوى" أو Empty State
- لا توجد CTA للحالة الفارغة

**Error (خطأ):**
- لا توجد حالة Error حالياً
- الصفحة بسيطة (static)، لا يوجد API calls أو async operations
- لا توجد رسائل خطأ أو error handling
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل
- لا توجد Error page أو Toast messages

---

# Route: /quiz/step1-favorites
**النوع:** محمي / ديناميكي  
**موجود في Audit الحالي:** نعم  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط
**القسم العلوي:**

1. **Progress Indicator (مؤشر التقدم):**
   - 3 دوائر صغيرة
   - الدائرة الأولى: w-3 h-3 (12px) rounded-full bg-primary (#c0841a) - مكتملة ✅
   - الدائرتان الثانية والثالثة: w-3 h-3 (12px) rounded-full bg-brown-text/20 - غير مكتملة
   - الموقع: في المنتصف في الأعلى
   - Gap: gap-2 (8px)
   - Margin-bottom: mb-8 (32px)

2. **العنوان الرئيسي:**
   - النص: "🧡 العطور التي تعجبني"
   - الحجم: text-5xl على Desktop (48px)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-tajawal-bold
   - الموقع: في المنتصف
   - المسافة السفلية: mb-4 (16px)

3. **الوصف:**
   - النص: "اختر 3-12 عطور من المفضّلات لديك"
   - الحجم: text-xl (20px)
   - اللون: text-brown-text/70
   - max-width: max-w-2xl
   - الموقع: في المنتصف أسفل العنوان

4. **Selection Counter Badge (شارة العداد):**
   - النص: "المفضلة: 0 / 12" (يتغير حسب الاختيار)
   - الحالة:
     - إذا 0: bg-gray-100 border-2 border-gray-300 text-gray-500
     - إذا > 0 و < 3: bg-primary/10 border-2 border-primary text-brown-text
     - إذا >= 3: bg-green-600/10 border-2 border-green-600 text-green-700 + أيقونة ✓
   - رسالة تذكير: "(اختر 3 عطوراً إضافياً على الأقل)" إذا < 3
   - Layout: inline-flex items-center gap-3 px-6 py-3 rounded-full
   - الموقع: في المنتصف أسفل الوصف
   - Margin-bottom: mb-8 (32px)

**القسم الأوسط:**

1. **حقل البحث:**
   - Placeholder: "اكتب اسم عطر للبدء..."
   - النوع: text input
   - الأيقونة: Search في اليمين (w-5 h-5 text-brown-text/50)
   - Loading Spinner: يظهر في اليسار أثناء البحث (debounce 300ms)
   - Styling: w-full px-12 py-4 border-2 border-brown-text/20 rounded-xl
   - Focus: focus:ring-2 focus:ring-primary focus:border-primary
   - Font: text-lg text-brown-text
   - Margin-bottom: mb-8 (32px)

2. **Empty State (قبل البحث):**
   - أيقونة Search كبيرة: w-20 h-20 text-primary/40
   - العنوان: "اكتب اسم عطر للبدء..." - text-2xl font-bold text-brown-text
   - الوصف: "ابحث عن عطورك المفضلة بالاسم أو الماركة" - text-lg text-brown-text/60
   - الخلفية: bg-gradient-to-b from-primary/5 to-transparent rounded-3xl
   - Padding: py-20
   - أزرار اقتراحات: Dior, Chanel, Tom Ford, Creed, Oud
     - Styling: px-4 py-2 bg-white border border-brown-text/20 rounded-full text-sm
     - Hover: hover:border-primary hover:text-primary
     - Layout: flex flex-wrap justify-center gap-2 max-w-lg mx-auto

3. **Search Results (بعد البحث):**
   - Dropdown يظهر تحت حقل البحث
   - الخلفية: bg-white border-2 border-brown-text/20 rounded-xl shadow-xl
   - Max-height: max-h-80 overflow-y-auto
   - Z-index: z-40
   - عدد النتائج: يظهر في الأعلى "X نتيجة" - text-xs text-brown-text/50
   - كل نتيجة:
     - اسم العطر: font-bold text-brown-text
     - العلامة التجارية: text-sm text-brown-text/60
     - زر "إضافة": bg-primary text-white hover:bg-primary/90
     - Layout: flex items-center justify-between p-3 hover:bg-primary/5
   - **لا صور** - نص فقط

4. **Selected Perfumes Section (بعد الاختيار):**
   - العنوان: "العطور المختارة (X/12)" - text-2xl font-bold text-brown-text
   - زر "مسح الكل": text-sm text-red-500 hover:text-red-600
   - Grid Layout: sm:grid-cols-2 / lg:grid-cols-3 / xl:grid-cols-4 على Desktop
   - Gap: gap-6
   - كل كارت مختار:
     - صورة كاملة (aspect 4:5)
     - زر X للإزالة: absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full
     - يظهر عند hover: opacity-0 group-hover:opacity-100
     - border أخضر عند الاختيار: border-4 border-green-500
     - نسبة التطابق دائري
     - شارة الأمان 🛡

**القسم السفلي:**

1. **أزرار التنقل:**
   - Layout: flex flex-col sm:flex-row gap-4 justify-between items-center
   - Border-top: border-t border-brown-text/10
   - Padding-top: pt-8 mt-8
   
   **زر "رجوع":**
   - النص: "رجوع"
   - الأيقونة: ChevronRight (w-5 h-5)
   - Styling: px-8 py-3 text-brown-text border-2 border-brown-text/30 rounded-2xl
   - Hover: hover:bg-brown-text hover:text-white
   - Width: w-full sm:w-auto
   - Action: router.push('/')
   
   **زر "التالي" / "اختر 3 عطور على الأقل":**
   - النص: يتغير حسب الحالة:
     - إذا < 3: "اختر 3 عطور على الأقل"
     - إذا >= 3: "التالي" + أيقونة ChevronLeft
     - إذا > 12: "الحد الأقصى 12 عطور"
   - Variant: primary إذا canProceed، disabled إذا لا
   - Size: lg
   - Width: w-full sm:w-auto min-w-[200px]
   - Disabled: إذا !canProceed
   - Action: router.push('/quiz/step2-disliked') إذا canProceed

2. **Help Text:**
   - النص: "💡 كلما اخترت عطور أكثر، كانت التوصيات أدق وأكثر تناسباً مع ذوقك"
   - Styling: text-sm text-brown-text/60
   - الموقع: في المنتصف أسفل الأزرار
   - Margin-top: mt-8

**Max Selection Warning (إذا تم الوصول للحد الأقصى):**
- يظهر في الأعلى: fixed top-4 left-1/2 -translate-x-1/2 z-50
- Animation: animate-bounce
- Styling: bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg
- الأيقونة: AlertTriangle (w-5 h-5)
- النص: "الحد الأقصى 12 عطراً!"
- يختفي بعد 3 ثوان

## Mobile View - ماذا أرى بالضبط
- **التغييرات الملاحظة:**
  - العنوان: 36px (بدلاً من 48px)
  - حقل البحث: عرض كامل
  - نتائج البحث: Dropdown full-width
  - Selected Perfumes: عمود واحد (grid-cols-1)
  - أزرار التنقل: عمودي، عرض كامل

- **الأحجام الجديدة:**
  - العنوان: text-4xl (36px)
  - Grid: grid-cols-1

- **Layout:**
  - Search Results: full-width
  - Selected Perfumes: grid-cols-1
  - Navigation: flex-col (عمودي)

## التفاعلات - اختبار كل زر
- زر اقتراح "Dior" → ملء حقل البحث بـ "Dior" → يعمل ✅
- كتابة "Chanel" في حقل البحث → ظهور نتائج البحث بعد 300ms → يعمل ✅
- زر "إضافة" على نتيجة → إضافة العطر إلى قائمة المختارة → يعمل ✅
- اختيار 3 عطور → Counter Badge يتحول إلى أخضر مع أيقونة ✓ → يعمل ✅
- زر "التالي" (بعد اختيار 3 عطور) → الانتقال إلى /quiz/step2-disliked → يعمل ✅
- زر "رجوع" → الانتقال إلى / → يعمل ✅

## الحالات (Loading/Empty/Error)
- Loading Spinner: يظهر في اليسار أثناء البحث (debounce 300ms)
- Max Selection Warning: يظهر إذا تم الوصول للحد الأقصى (12 عطر) ويختفي بعد 3 ثوان

---

# Route: /quiz/step2-disliked
**النوع:** محمي / ديناميكي  
**موجود في Audit الحالي:** نعم  
**الحالة:** موثق جزئي  

## Desktop View - ماذا أرى بالضبط
**القسم العلوي:**

1. **Progress Indicator (مؤشر التقدم):**
   - 3 دوائر صغيرة
   - الدائرة الأولى: w-3 h-3 (12px) rounded-full bg-primary (#c0841a) - مكتملة ✅
   - الدائرة الثانية: w-3 h-3 (12px) rounded-full bg-primary (#c0841a) - مكتملة ✅
   - الدائرة الثالثة: w-3 h-3 (12px) rounded-full bg-brown-text/20 - غير مكتملة
   - Layout: flex items-center justify-center
   - الموقع: في المنتصف في الأعلى
   - Gap: gap-2 (8px)
   - Margin-bottom: mb-8 (32px)

2. **العنوان الرئيسي:**
   - النص: "❌ العطور التي لا تعجبني"
   - الحجم: text-4xl md:text-5xl على Desktop (48px)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-tajawal-bold
   - الموقع: text-center
   - المسافة السفلية: mb-4 (16px)

3. **الوصف:**
   - النص: "اختر 3-12 عطور لا تعجبك"
   - الحجم: text-xl (20px)
   - اللون: text-brown-text/70
   - max-width: max-w-2xl mx-auto
   - الموقع: text-center أسفل العنوان

4. **Selection Counter Badge (شارة العداد):**
   - النص: "غير المفضلة: {selectedPerfumes.length} / {MAX_SELECTIONS}" (يتغير حسب الاختيار)
   - Layout: inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all
   - الموقع: text-center أسفل الوصف
   - Margin-bottom: mb-8 (32px)
   - الحالة:
     - إذا 0: bg-gray-100 border-2 border-gray-300 text-gray-500
     - إذا > 0 و < 3: bg-primary/10 border-2 border-primary text-brown-text + رسالة "(اختر {MIN_SELECTIONS - selectedPerfumes.length} عطراً إضافياً على الأقل)" - text-sm text-amber-600 font-medium
     - إذا >= 3: bg-green-600/10 border-2 border-green-600 text-green-700 + أيقونة ✓ (text-green-600 text-xl)

**القسم الأوسط:**

1. **حقل البحث:**
   - Layout: relative
   - Placeholder: "ابحث عن عطر..."
   - النوع: text input
   - الأيقونة: Search في اليمين (w-5 h-5 text-brown-text/50) - absolute right-4 top-1/2 transform -translate-y-1/2
   - Loading Spinner: يظهر في اليسار أثناء البحث (debounce 300ms) - animate-spin rounded-full h-5 w-5 border-b-2 border-primary - absolute left-4 top-1/2 transform -translate-y-1/2
   - Styling: w-full px-12 py-4 border-2 border-brown-text/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-brown-text placeholder-brown-text/50
   - Margin-bottom: mb-8 (32px)

2. **Empty State (قبل البحث):**
   - يظهر إذا !debouncedSearchTerm.trim()
   - Layout: text-center py-20 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl p-12
   - أيقونة Search كبيرة: w-20 h-20 text-primary/50 mx-auto mb-6
   - العنوان: "ابدأ البحث عن عطرك المفضل" - text-2xl font-bold text-brown-text mb-3
   - الوصف: "اكتب اسم العطر أو الماركة مثل: Dior، Chanel، Oud، Jasmine" - text-lg text-brown-text/70 mb-8 max-w-md mx-auto
   - **لا توجد أزرار اقتراحات** (مختلف عن Step 1)

3. **Search Results (بعد البحث):**
   - يظهر إذا debouncedSearchTerm.trim() && searchResults.length > 0
   - العنوان: "نتائج البحث" - text-xl font-bold text-brown-text mb-4
   - Layout: space-y-2 max-h-96 overflow-y-auto
   - كل نتيجة: CompactPerfumeCard component
   - **CompactPerfumeCard:**
     - Layout: flex items-center justify-between p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-primary/50 hover:bg-primary/5 transition-all
     - المحتوى (flex-1 min-w-0):
       - اسم العطر: font-bold text-brown-text text-lg truncate
       - العلامة التجارية: text-sm text-brown-text/70 truncate
       - نسبة التطابق: text-xs text-primary font-medium mt-1 "تطابق: X%"
       - شارة الأمان: 🛡 "آمن" (إذا isSafe) أو ⚠ "تحذير" (إذا !isSafe) - text-xs px-2 py-0.5 rounded-full border
     - زر "أضف للتحليل": 
       - Layout: flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
       - Styling: bg-primary text-white hover:bg-primary/90 transition-all
       - الأيقونة: BarChart3 (w-4 h-4)
       - Disabled: disabled={selectedPerfumes.length >= MAX_SELECTIONS} - opacity-50 cursor-not-allowed
   - **لا صور** - نص فقط
   - **Full-width layout** (ليس dropdown - مختلف عن Step 1)

4. **رسالة عدم وجود نتائج:**
   - يظهر إذا debouncedSearchTerm.trim() && searchResults.length === 0
   - النص: "لا توجد نتائج مطابقة لبحثك"
   - التصميم: text-center py-12 text-gray-500

5. **Selected Perfumes Section (بعد الاختيار):**
   - يظهر إذا selectedPerfumesList.length > 0
   - العنوان: "العطور المختارة ({selectedPerfumesList.length}/{MAX_SELECTIONS})" - text-2xl font-bold text-brown-text mb-4
   - Grid Layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 على Desktop (2-3 أعمدة)
   - Gap: gap-6 (24px)
   - كل كارت مختار: PerfumeCard component
   - **PerfumeCard:**
     - صورة كاملة (aspect 4:5)
     - **Border أحمر** عند الاختيار: border-4 border-red-500 (بدلاً من الأخضر في Step 1)
     - selectionType="disliked"
     - isSelected={true}
     - نسبة التطابق دائري
     - شارة الأمان 🛡
     - الضغط على الكارت → togglePerfume(perfume.id) → إزالة العطر من القائمة

**القسم السفلي:**

1. **أزرار التنقل:**
   - Layout: flex flex-col sm:flex-row gap-4 justify-between items-center
   - Border-top: border-t border-brown-text/10
   - Padding-top: pt-8
   
   **زر "رجوع":**
   - النص: "رجوع"
   - الأيقونة: ChevronRight (w-5 h-5 rtl:rotate-180)
   - Styling: px-8 py-3 text-brown-text border-2 border-brown-text/30 rounded-2xl font-tajawal-bold hover:bg-brown-text hover:text-white transition-all flex items-center justify-center gap-2
   - Width: w-full sm:w-auto
   - Action: router.push('/quiz/step1-favorites')
   
   **زر "التالي" / "اختر 3 عطور على الأقل":**
   - النص: يتغير حسب الحالة:
     - إذا canProceed: "التالي" + أيقونة ChevronLeft (w-5 h-5 inline me-2 rtl:rotate-180)
     - إذا < MIN_SELECTIONS: "اختر {MIN_SELECTIONS} عطور على الأقل"
     - إذا > MAX_SELECTIONS: "الحد الأقصى {MAX_SELECTIONS} عطور"
   - Variant: primary إذا canProceed، disabled إذا !canProceed
   - Size: lg
   - Width: w-full sm:w-auto min-w-[200px]
   - Disabled: disabled={!canProceed}
   - Action: handleNext() → router.push('/quiz/step3-allergy') إذا canProceed

2. **زر "💡 تخطي هذه الخطوة":**
   - Layout: text-center mt-8
   - النص: "💡 تخطي هذه الخطوة"
   - Variant: tertiary
   - Size: default
   - Styling: text-brown-text/70 hover:text-brown-text
   - Action: handleSkip() → router.push('/quiz/step3-allergy')
   - النص التوضيحي: "يمكنك تخطي هذه الخطوة إذا لم تكن هناك عطور تكرهها" - text-xs text-brown-text/50 mt-2

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Progress Indicator:**
   - نفس الحجم (w-3 h-3 = 12px)
   - نفس التخطيط (flex-row)

2. **العنوان الرئيسي:**
   - الحجم: text-4xl (36px) على Mobile (بدلاً من text-5xl = 48px على Desktop)
   - نفس اللون والوزن (text-brown-text, font-tajawal-bold)
   - نفس الموقع والمسافات (mb-4)

3. **الوصف:**
   - نفس الحجم (text-xl = 20px)
   - نفس اللون والتصميم (text-brown-text/70, max-w-2xl)

4. **Selection Counter Badge:**
   - نفس التصميم والحجم (px-6 py-3 rounded-full)
   - نفس الموقع (text-center mb-8)

**القسم الأوسط:**

1. **حقل البحث:**
   - عرض كامل (w-full)
   - نفس Padding (px-12 py-4)
   - نفس التصميم (border-2 border-brown-text/20 rounded-xl)

2. **Search Results (Compact Cards):**
   - عرض كامل (full-width)
   - نفس التصميم CompactPerfumeCard
   - نفس الـ gap (space-y-2)

3. **Selected Perfumes Grid:**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: md:grid-cols-2 / lg:grid-cols-3 (2-3 أعمدة)
   - Gap: gap-6 (نفس القيمة)

**القسم السفلي:**

1. **أزرار التنقل:**
   - Layout: flex-col على Mobile (عمودي)
   - Desktop: sm:flex-row (صف واحد)
   - زر "رجوع": w-full على Mobile (عرض كامل) / sm:w-auto على Desktop
   - زر "التالي": w-full على Mobile (عرض كامل) / sm:w-auto على Desktop
   - min-w-[200px] على زر "التالي"
   - نفس التصميم والألوان

2. **زر "💡 تخطي هذه الخطوة":**
   - نفس التصميم
   - نفس الموقع (text-center mt-8)

**الأحجام الجديدة:**
- العنوان: text-4xl (36px) على Mobile
- Grid: grid-cols-1 على Mobile
- Navigation: flex-col (عمودي) على Mobile

**Layout:**
- Search Results: full-width على Mobile
- Selected Perfumes: grid-cols-1 (عمود واحد) على Mobile
- Navigation: flex-col (عمودي) على Mobile

## التفاعلات - اختبار كل زر

**حقل البحث:**
- كتابة "Dior" في حقل البحث → ظهور نتائج البحث بعد 300ms (debounce) → يعمل ✅
- كتابة "Chanel" في حقل البحث → ظهور نتائج البحث بعد 300ms → يعمل ✅
- Loading Spinner: يظهر في اليسار أثناء البحث (debounce 300ms) → يعمل ✅

**نتائج البحث (Compact Cards):**
- زر "إضافة" على نتيجة → إضافة العطر إلى قائمة المختارة → يعمل ✅
- Counter Badge: يتحدث إلى "غير المفضلة: X / 12" بعد الإضافة → يعمل ✅
- إذا وصلت للحد الأقصى (12 عطر): زر "إضافة" معطل (disabled) → يعمل ✅

**العطور المختارة (Full Cards):**
- الضغط على الكارت المختار → إزالة العطر من القائمة (togglePerfume) → يعمل ✅
- Border أحمر عند الاختيار (selectionType="disliked") → يظهر ✅
- Counter Badge: يتحدث عند الإزالة → يعمل ✅

**أزرار التنقل:**
- زر "رجوع" → الانتقال إلى /quiz/step1-favorites → يعمل ✅
- زر "التالي" (إذا canProceed - 3-12 عطور) → الانتقال إلى /quiz/step3-allergy → يعمل ✅
- زر "التالي" (إذا < 3 عطور) → معطل (disabled) والنص: "اختر 3 عطور على الأقل" → يعمل ✅
- زر "التالي" (إذا > 12 عطور) → معطل (disabled) والنص: "الحد الأقصى 12 عطور" → يعمل ✅

**زر التخطي:**
- "💡 تخطي هذه الخطوة" → الانتقال مباشرة إلى /quiz/step3-allergy (مع حفظ [] في sessionStorage) → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Loading Spinner (حقل البحث):**
  - يظهر في اليسار داخل حقل البحث أثناء الكتابة
  - الحالة: isSearchLoading (searchTerm !== debouncedSearchTerm)
  - المدة: 300ms (debounce)
  - التصميم: animate-spin rounded-full h-5 w-5 border-b-2 border-primary
  - الموقع: absolute left-4 top-1/2 transform -translate-y-1/2
  - يختفي تلقائياً بعد 300ms

**Empty (فارغ):**

- **Empty State (قبل البحث):**
  - يظهر عند عدم وجود نص في حقل البحث
  - التصميم: bg-gradient-to-b from-primary/5 to-transparent rounded-3xl p-12 py-20
  - الأيقونة: Search (w-20 h-20 text-primary/50)
  - العنوان: "ابدأ البحث عن عطرك المفضل" - text-2xl font-bold text-brown-text
  - الوصف: "اكتب اسم العطر أو الماركة مثل: Dior، Chanel، Oud، Jasmine" - text-lg text-brown-text/70
  - الموقع: text-center
  - لا توجد أزرار اقتراحات (مختلف عن Step 1)

- **لا توجد نتائج (بعد البحث):**
  - يظهر عند البحث بدون نتائج
  - الرسالة: "لا توجد نتائج مطابقة لبحثك" - text-center py-12 text-gray-500
  - الموقع: في المنتصف
  - لا يوجد CTA أو زر إعادة البحث

**Error (خطأ):**

- **خطأ في البيانات:**
  - يظهر إذا كانت بيانات العطور غير متاحة (!perfumes || !Array.isArray(perfumes) || perfumes.length === 0)
  - الرسالة: "بيانات العطور غير متاحة" - text-red-500 mb-4
  - الموقع: text-center py-8
  - زر "إعادة المحاولة": CTAButton variant="primary" onClick={() => window.location.reload()}
  - يحدث نادراً (البيانات محلية static)

---

# Route: /quiz/step3-allergy
**النوع:** محمي / ديناميكي  
**موجود في Audit الحالي:** نعم  
**الحالة:** موثق جزئي  

## Desktop View - ماذا أرى بالضبط
**الخلفية:**
- bg-cream-bg (min-h-screen)
- direction: dir="rtl"
- container: container mx-auto px-4 py-12
- Step3Allergy component: max-w-2xl mx-auto space-y-8

**القسم العلوي:**

1. **Progress Indicator (مؤشر التقدم - Step 3/3):**
   - 3 دوائر صغيرة
   - الدائرة الأولى: w-3 h-3 (12px) rounded-full bg-primary (#c0841a) - مكتملة ✅
   - الدائرة الثانية: w-3 h-3 (12px) rounded-full bg-primary (#c0841a) - مكتملة ✅
   - الدائرة الثالثة: w-3 h-3 (12px) rounded-full bg-primary (#c0841a) - مكتملة ✅
   - Layout: flex items-center justify-center
   - الموقع: في المنتصف في الأعلى
   - Gap: gap-2 (8px)
   - Margin-bottom: mb-8 (32px)

2. **Level Progress Indicator (مؤشر التقدم - داخل Step3Allergy component):**
   - 3 دوائر صغيرة
   - الدائرة الأولى: w-3 h-3 (12px) rounded-full bg-gauge-safe (#15803d) (إذا currentLevel >= 1) أو bg-cream/50 - مكتملة ✅
   - الدائرة الثانية: w-3 h-3 (12px) rounded-full bg-gauge-safe (#15803d) (إذا currentLevel >= 2) أو bg-cream/50
   - الدائرة الثالثة: w-3 h-3 (12px) rounded-full bg-gauge-safe (#15803d) (إذا currentLevel >= 3) أو bg-cream/50
   - Layout: flex items-center justify-center
   - الموقع: في المنتصف داخل Step3Allergy component (max-w-2xl mx-auto space-y-8)
   - Gap: gap-2 (8px)
   - Margin-bottom: mb-12 (48px)

**القسم الأوسط:**

**Level 1: الأعراض (Symptoms)**

1. **السؤال:**
   - النص: "هل سبق وسبب لك عطر أي من هذه الأعراض؟"
   - الحجم: text-3xl (30px)
   - اللون: text-text-dark
   - الوزن: font-bold
   - الموقع: text-center
   - Margin-bottom: mb-6 (24px)

2. **Grid Layout:**
   - Layout: grid grid-cols-1 md:grid-cols-2 على Desktop (عمودين)
   - Gap: gap-6 (24px)
   - كل خيار: motion.button component

3. **الخيارات (5 خيارات):**
   - **🤧 "عطاس أو احتقان":**
     - العنوان: "عطاس أو احتقان" - font-bold text-text-dark text-lg mb-2
     - الوصف: "عطور قوية تسبب لي عطاس" - text-sm text-text-dark/70
     - الأيقونة: 🤧 (text-3xl mb-3)
   - **🔴 "احمرار أو حكة":**
     - العنوان: "احمرار أو حكة" - font-bold text-text-dark text-lg mb-2
     - الوصف: "بشرتي تتحسس من بعض المكونات" - text-sm text-text-dark/70
     - الأيقونة: 🔴 (text-3xl mb-3)
   - **🤕 "صداع أو دوخة":**
     - العنوان: "صداع أو دوخة" - font-bold text-text-dark text-lg mb-2
     - الوصف: "روائح معينة تصيبني بالصداع" - text-sm text-text-dark/70
     - الأيقونة: 🤕 (text-3xl mb-3)
   - **😖 "غثيان أو ضيق تنفس":**
     - العنوان: "غثيان أو ضيق تنفس" - font-bold text-text-dark text-lg mb-2
     - الوصف: "عطور ثقيلة تضايقني" - text-sm text-text-dark/70
     - الأيقونة: 😖 (text-3xl mb-3)
   - **✅ "لا أعاني من شيء":**
     - العنوان: "لا أعاني من شيء" - font-bold text-text-dark text-lg mb-2
     - الوصف: "أنا بخير تماماً" - text-sm text-text-dark/70
     - الأيقونة: ✅ (text-3xl mb-3)

4. **تصميم الكارت (SymptomCard):**
   - Styling: p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[120px] text-right
   - عند الاختيار: bg-red-50 border-4 border-[#ef4444] shadow-2xl ring-2 ring-red-200
   - عند عدم الاختيار: bg-white border-2 border-cream/50 hover:border-text-dark/30 hover:bg-cream/50
   - Animation: whileHover={{ scale: 1.02 }}, whileTap={{ scale: 0.98 }}

5. **Selection Logic (منطق الاختيار):**
   - عند اختيار "لا أعاني" (none): يتم إلغاء جميع الاختيارات الأخرى واختيار "none" فقط
   - عند اختيار أي خيار آخر: يتم إلغاء "none" إذا كان محدداً
   - يمكن اختيار خيارات متعددة (عدا "none")

**Level 2: العائلات العطرية (Fragrance Families)**

1. **السؤال:**
   - النص: "من أي نوع عطور تزعجك؟"
   - الحجم: text-3xl (30px)
   - اللون: text-text-dark
   - الوزن: font-bold
   - الموقع: text-center
   - Margin-bottom: mb-6 (24px)

2. **Grid Layout:**
   - Layout: grid grid-cols-2 md:grid-cols-3 على Desktop (3 أعمدة)
   - Gap: gap-6 (24px)
   - كل خيار: motion.button component
   - Aspect: aspect-square (مربع)

3. **الخيارات (6 خيارات):**
   - **🌸 "زهرية":**
     - الاسم: "زهرية" - font-bold text-text-dark text-lg
     - الأمثلة: "ياسمين، ورد" - text-xs text-text-dark/60 mt-1
     - الأيقونة: 🌸 (text-4xl mb-4)
   - **🍋 "حمضية":**
     - الاسم: "حمضية" - font-bold text-text-dark text-lg
     - الأمثلة: "ليمون، برتقال" - text-xs text-text-dark/60 mt-1
     - الأيقونة: 🍋 (text-4xl mb-4)
   - **🪵 "خشبية":**
     - الاسم: "خشبية" - font-bold text-text-dark text-lg
     - الأمثلة: "عود، صندل" - text-xs text-text-dark/60 mt-1
     - الأيقونة: 🪵 (text-4xl mb-4)
   - **🌶️ "حارة":**
     - الاسم: "حارة" - font-bold text-text-dark text-lg
     - الأمثلة: "قرفة، فلفل" - text-xs text-text-dark/60 mt-1
     - الأيقونة: 🌶️ (text-4xl mb-4)
   - **🍰 "حلوة":**
     - الاسم: "حلوة" - font-bold text-text-dark text-lg
     - الأمثلة: "فانيليا، كراميل" - text-xs text-text-dark/60 mt-1
     - الأيقونة: 🍰 (text-4xl mb-4)
   - **🧥 "جلدية":**
     - الاسم: "جلدية" - font-bold text-text-dark text-lg
     - الأمثلة: "جلد، تبغ" - text-xs text-text-dark/60 mt-1
     - الأيقونة: 🧥 (text-4xl mb-4)

4. **تصميم الكارت:**
   - Styling: p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 aspect-square flex flex-col items-center justify-center
   - عند الاختيار: bg-red-50 border-4 border-[#ef4444]
   - عند عدم الاختيار: bg-white border-2 border-cream/50 hover:border-text-dark/30
   - Animation: whileHover={{ scale: 1.05 }}, whileTap={{ scale: 0.98 }}

5. **Selection Logic:**
   - يمكن اختيار عائلات متعددة
   - كل عائلة مستقلة (toggle)

**Level 3: المكونات (Ingredients)**

1. **السؤال:**
   - النص: "ما هي المكونات التي تسبب لك حساسية؟"
   - الحجم: text-3xl (30px)
   - اللون: text-text-dark
   - الوزن: font-bold
   - الموقع: text-center
   - Margin-bottom: mb-2 (8px)

2. **الوصف:**
   - النص: "اختر المكونات التي تعرف أنها تزعجك"
   - الحجم: text-text-dark/70
   - الموقع: text-center
   - Margin-bottom: mb-8 (32px)

3. **Layout:**
   - Layout: flex flex-wrap gap-4 justify-center
   - كل خيار: motion.button component (Chip/Tag)

4. **الخيارات (12 خيارات - Tags/Chips):**
   - **🌸 "ياسمين":**
     - الاسم: "ياسمين"
     - الأيقونة: 🌸 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🌹 "ورد":**
     - الاسم: "ورد"
     - الأيقونة: 🌹 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🪵 "عود":**
     - الاسم: "عود"
     - الأيقونة: 🪵 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🪵 "صندل":**
     - الاسم: "صندل"
     - الأيقونة: 🪵 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🍦 "فانيليا":**
     - الاسم: "فانيليا"
     - الأيقونة: 🍦 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **💫 "مسك":**
     - الاسم: "مسك"
     - الأيقونة: 💫 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🟡 "عنبر":**
     - الاسم: "عنبر"
     - الأيقونة: 🟡 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🍃 "باتشولي":**
     - الاسم: "باتشولي"
     - الأيقونة: 🍃 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **💜 "لافندر":**
     - الاسم: "لافندر"
     - الأيقونة: 💜 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🍋 "برغموت":**
     - الاسم: "برغموت"
     - الأيقونة: 🍋 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🌶️ "فلفل":**
     - الاسم: "فلفل"
     - الأيقونة: 🌶️ (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار
   - **🧥 "جلد":**
     - الاسم: "جلد"
     - الأيقونة: 🧥 (text-xl)
     - يظهر ✓ (text-sm) إذا تم الاختيار

5. **تصميم Chip:**
   - Layout: flex items-center gap-2 font-medium
   - Styling: px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all
   - عند الاختيار: bg-red-50 border-2 border-[#ef4444] text-[#ef4444] + أيقونة ✓ (text-sm aria-hidden="true")
   - عند عدم الاختيار: bg-white border-2 border-cream/50 text-text-dark hover:border-text-dark/30
   - الأيقونة: text-xl
   - Animation: whileHover={{ scale: 1.05 }}, whileTap={{ scale: 0.95 }}

6. **Selection Logic (منطق الاختيار):**
   - يمكن اختيار مكونات متعددة
   - كل مكون مستقل (toggle)
   - عند الضغط: toggleIngredient(id) → إضافة/إزالة من allergy.level3

**القسم السفلي:**

1. **أزرار التنقل:**
   - Layout: flex gap-4 justify-between pt-12
   - Border-top: (لا يوجد border-top واضح في الكود)
   - Padding-top: pt-12 (48px)
   
   **زر "رجوع":**
   - النص: "رجوع"
   - الأيقونة: ChevronRight (w-5 h-5 inline ms-2 rtl:rotate-180)
   - Styling: px-8 py-3 text-text-dark border-2 border-text-dark rounded-2xl font-bold hover:bg-text-dark hover:text-white transition-all flex items-center justify-center
   - Width: flex-1 md:flex-none (يملأ المساحة على Mobile، auto على Desktop)
   - Action: onBack() → router.push('/quiz/step2-disliked')
   
   **زر "التالي" / "حفظ بصمتي":**
   - النص: يتغير حسب الحالة:
     - إذا currentLevel < 3: "التالي" + أيقونة ChevronLeft (w-5 h-5 inline me-2 rtl:rotate-180 aria-hidden="true")
     - إذا currentLevel === 3: "حفظ بصمتي" (بدون أيقونة)
   - Styling: px-8 py-3 bg-gradient-to-l from-gauge-safe (#15803d) to-emerald-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center
   - Width: flex-1 md:flex-none (يملأ المساحة على Mobile، auto على Desktop)
   - Disabled: disabled={!canNext} + aria-disabled={!canNext}
   - Hover: hover:shadow-2xl hover:-translate-y-1 (إذا !disabled)
   - Action: 
     - إذا canNext && currentLevel < 3: setCurrentLevel(currentLevel + 1)
     - إذا canNext && currentLevel === 3: onNext() → router.push('/results')
   - aria-label: يتغير حسب الحالة:
     - إذا currentLevel === 3: "حفظ بصمة العطر"
     - إذا currentLevel < 3: "الانتقال للخطوة التالية"

2. **Level Indicator (مؤشر المستوى):**
   - Layout: flex justify-center gap-3 text-sm text-text-dark/60
   - المحتوى:
     - "1. الأعراض" (font-bold text-text-dark إذا currentLevel === 1)
     - "→"
     - "2. العائلات" (font-bold text-text-dark إذا currentLevel === 2)
     - "→"
     - "3. المكونات" (font-bold text-text-dark إذا currentLevel === 3)
   - الموقع: أسفل أزرار التنقل
   - Margin-top: (يتبع تلقائياً من space-y-8)

**ملاحظات مهمة:**
- **Progress Indicator:** يوجد مؤشران - واحد للـ Step (3/3) وواحد للـ Level (1-3)
- **الألوان:** جميع المستويات تستخدم نفس اللون الأحمر (#ef4444) للاختيار
- **Selection Logic:** Level 1 يحتوي على منطق خاص ("لا أعاني" يلغي كل الاختيارات)
- **Can Next Logic:** 
  - Level 1: يتطلب اختيار واحد على الأقل
  - Level 2: يتطلب إكمال Level 1
  - Level 3: يتطلب إكمال Level 1 أو Level 2

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Progress Indicator (Level Progress):**
   - نفس الحجم (w-3 h-3 = 12px)
   - نفس التخطيط (flex-row)

2. **السؤال (Level 1/2/3):**
   - الحجم: text-3xl (نفس الحجم على Mobile و Desktop)
   - نفس اللون والوزن (text-text-dark, font-bold)

**القسم الأوسط:**

1. **Level 1: الأعراض (Symptoms)**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: md:grid-cols-2 (عمودين)
   - Gap: gap-6 (نفس القيمة)
   - نفس التصميم والأحجام

2. **Level 2: العائلات العطرية (Fragrance Families)**
   - Layout: grid-cols-2 على Mobile (عمودين)
   - Desktop: md:grid-cols-3 (3 أعمدة)
   - Gap: gap-6 (نفس القيمة)
   - Aspect Square (مربع) - نفس الحجم
   - نفس التصميم والأحجام

3. **Level 3: المكونات (Ingredients)**
   - Layout: flex-wrap (نفس التخطيط على جميع الأحجام)
   - Gap: gap-4 (نفس القيمة)
   - نفس التصميم والأحجام

**القسم السفلي:**

1. **أزرار التنقل:**
   - Layout: flex gap-4 justify-between (نفس التخطيط)
   - زر "رجوع": flex-1 على Mobile (يملأ المساحة) / md:flex-none على Desktop
   - زر "التالي": نفس التصميم
   - نفس الألوان والتصميم

**الأحجام الجديدة:**
- السؤال: text-3xl (نفس الحجم على Mobile و Desktop)
- Level 1 Grid: grid-cols-1 على Mobile
- Level 2 Grid: grid-cols-2 على Mobile
- Level 3: flex-wrap (نفس التخطيط)
- Navigation: زر "رجوع" flex-1 على Mobile

**Layout:**
- Level 1: grid-cols-1 (عمود واحد) على Mobile
- Level 2: grid-cols-2 (عمودين) على Mobile
- Level 3: flex-wrap (نفس التخطيط على جميع الأحجام)
- Navigation: زر "رجوع" flex-1 على Mobile

## التفاعلات - اختبار كل زر

**Level 1: الأعراض (Symptoms)**

- اختيار أي عرض (مثلاً "عطاس أو احتقان") → Border أحمر (#ef4444) border-4، خلفية حمراء شفافة (bg-red-50)، shadow-2xl ring-2 ring-red-200 → يعمل ✅
- الضغط مرة أخرى على نفس العرض → إزالة الاختيار (Border أبيض، خلفية بيضاء) → يعمل ✅
- اختيار "لا أعاني من شيء" → يلغي جميع الاختيارات الأخرى (يترك فقط ['none']) → يعمل ✅
- اختيار عرض آخر بعد "لا أعاني" → يلغي "لا أعاني" ويضيف العرض الجديد → يعمل ✅
- Animation: whileHover scale 1.02، whileTap scale 0.98 → يعمل ✅

**Level 2: العائلات العطرية (Fragrance Families)**

- اختيار أي عائلة (مثلاً "زهرية") → Border أحمر (#ef4444) border-4، خلفية حمراء شفافة (bg-red-50) → يعمل ✅
- الضغط مرة أخرى على نفس العائلة → إزالة الاختيار (Border أبيض، خلفية بيضاء) → يعمل ✅
- يمكن اختيار أكثر من عائلة → يعمل ✅
- Animation: whileHover scale 1.05، whileTap scale 0.98 → يعمل ✅

**Level 3: المكونات (Ingredients)**

- اختيار أي مكون (مثلاً "ياسمين") → Border أحمر (#ef4444) border-2، خلفية حمراء شفافة (bg-red-50)، نص أحمر (text-[#ef4444])، أيقونة ✓ تظهر → يعمل ✅
- الضغط مرة أخرى على نفس المكون → إزالة الاختيار (Border أبيض، خلفية بيضاء، نص داكن) → يعمل ✅
- يمكن اختيار أكثر من مكون → يعمل ✅
- Animation: whileHover scale 1.05، whileTap scale 0.95 → يعمل ✅

**أزرار التنقل:**

- زر "رجوع" → الانتقال إلى /quiz/step2-disliked → يعمل ✅
- زر "التالي" (Level 1 - إذا تم اختيار عرض واحد على الأقل) → الانتقال إلى Level 2 → يعمل ✅
- زر "التالي" (Level 2 - إذا تم اختيار عرض واحد على الأقل من Level 1) → الانتقال إلى Level 3 → يعمل ✅
- زر "التالي" (Level 3 - إذا تم اختيار عائلة واحدة على الأقل من Level 2 أو عرض واحد على الأقل من Level 1) → الانتقال إلى /results → يعمل ✅
- زر "التالي" (إذا لم يتم اختيار شيء) → معطل (disabled) opacity-50 cursor-not-allowed → يعمل ✅
- النص: Level 1-2: "التالي" + أيقونة، Level 3: "حفظ بصمتي" (بدون أيقونة) → يعمل ✅

**Level Indicator (المؤشر السفلي):**

- Level 1: "1. الأعراض" bold، "2. العائلات" و "3. المكونات" عادي → يعمل ✅
- Level 2: "2. العائلات" bold، البقية عادي → يعمل ✅
- Level 3: "3. المكونات" bold، البقية عادي → يعمل ✅
- فقط للعرض (غير قابل للضغط) → يعمل ✅

**Progress Indicator (مؤشر التقدم):**

- Level 1: الدائرة الأولى bg-gauge-safe، الثانية والثالثة bg-cream/50 → يعمل ✅
- Level 2: الدائرة الأولى والثانية bg-gauge-safe، الثالثة bg-cream/50 → يعمل ✅
- Level 3: الثلاث دوائر bg-gauge-safe → يعمل ✅
- فقط للعرض (غير قابل للضغط) → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Loading Spinner (عند الانتقال):**
  - يظهر عند الانتقال بين Levels أو الانتقال إلى /results
  - الحالة: isPending (useTransition)
  - التصميم: fixed inset-0 bg-cream-bg/80 backdrop-blur-sm z-50 flex items-center justify-center
  - LoadingSpinner: type={3} message="جاري الانتقال..." size="lg"
  - الموقع: overlay كامل الشاشة
  - يختفي تلقائياً بعد الانتقال

**Empty (فارغ):**

- لا توجد حالة Empty حالياً
- البيانات محلية (static) - symptoms, families, ingredients
- الصفحة تعرض دائماً نفس المحتوى

**Error (خطأ):**

- لا توجد حالة Error حالياً
- البيانات محلية (static)، لا يوجد API calls
- لا توجد رسائل خطأ أو error handling
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل

---

# Route: /results
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط
**القسم العلوي (Header):**

1. **العنوان:**
   - النص: "نتائج التوافق (X)" - X = عدد النتائج المفلترة
   - الحجم: text-4xl md:text-5xl (36px على Mobile / 48px على Desktop)
   - اللون: text-brown-text (#5B4233)
   - الوزن: font-tajawal-bold
   - الموقع: text-center mb-4

2. **الوصف:**
   - النص: "تم العثور على X عطور" أو "لا توجد نتائج مطابقة" (إذا filteredPerfumes.length === 0)
   - الحجم: text-xl (20px)
   - اللون: text-brown-text/70
   - الموقع: text-center mb-2

3. **Personalization Indicator (إذا hasPreferences):**
   - الأيقونة: Sparkles (w-5 h-5)
   - النص: "نتائج مخصّصة بناءً على ذوقك العطري"
   - التصميم: inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mt-4
   - الموقع: text-center

4. **User Scent DNA (إذا userScentDNA.length > 0):**
   - النص: "الحمض النووي العطري: [5 عناصر الأولى]"
   - الحجم: text-sm
   - اللون: text-brown-text/60
   - العناصر: primary font-medium
   - الموقع: text-center mt-4

5. **Guest CTA (إذا !session):**
   - التصميم: bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-200/50 rounded-2xl p-6 text-center
   - الأيقونة: Heart (w-12 h-12 text-rose-400)
   - العنوان: "سجّل لحفظ اقتراحاتك ♥️" - text-xl font-bold text-rose-800
   - الوصف: "احفظ مفضلاتك واحصل على توصيات شخصية" - text-rose-600
   - الزر: "ابدأ الآن مجاناً" - CTAButton variant="primary" size="sm"
   - Link: إلى /login?callbackUrl=/results

**القسم الأوسط (Controls):**

1. **Search + Sort (flex-col sm:flex-row):**
   - حقل البحث: w-full pe-12 ps-4 py-4 rounded-2xl border-2 border-brown-text/20
   - Placeholder: "ابحث بالاسم أو العلامة التجارية..."
   - الأيقونة: Search (absolute right-4 top-1/2)
   - Sort Dropdown: px-6 py-4 rounded-2xl border-2 border-brown-text/20 min-w-[160px]
   - الخيارات: "أعلى تطابق" / "السعر: صاعد" / "السعر: هابط" / "التقييم"

2. **Mobile Filter Button (lg:hidden):**
   - النص: "فلاتر"
   - الأيقونة: Filter (w-5 h-5)
   - التصميم: p-4 bg-white border-2 border-brown-text/20 rounded-2xl hover:shadow-md
   - Action: setIsFilterOpen(true)

**القسم الرئيسي (flex-col lg:flex-row gap-8):**

1. **Filter Sidebar (Desktop - hidden lg:block lg:w-[35%]):**
   - التصميم: sticky top-4 bg-white rounded-2xl border-2 border-brown-text/20 p-6 shadow-md
   - العنوان: "تصفية النتائج" - text-2xl font-tajawal-bold text-brown-text mb-6
   
   **نسبة التوافق:**
   - Label: "نسبة التوافق" + قيمة (X% +)
   - Input: type="range" min="0" max="100" value={filters.matchPercentage}
   - Styling: w-full h-2 bg-primary/10 rounded-lg accent-primary
   
   **السعر:**
   - Label: "السعر"
   - Display: {filters.maxPrice} ر.س (bg-cream-bg px-3 py-2 rounded-lg)
   - Input: type="range" min="100" max="5000" step="100"
   
   **العائلة العطرية:**
   - Label: "العائلة العطرية"
   - Checkboxes: ['الأخشاب', 'الشرقية', 'الزهرية']
   
   **Score Breakdown Legend:**
   - التصميم: p-4 bg-cream-bg rounded-xl
   - العنوان: "كيف يُحسب التوافق؟"
   - النسب: "الذوق العطري 70%" / "عامل الأمان 30%"

2. **Mobile Filter Modal:**
   - Component: MobileFilterModal
   - isOpen: isFilterOpen
   - onClose: setIsFilterOpen(false)

3. **Results Grid (flex-1):**
   - Layout: grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12
   - كل كارت: PerfumeCard مع Favorite و Share Buttons (عند hover)
   - Price Comparison Button (عند hover)
   - Pagination (إذا totalPages > 1)

**القسم السفلي (Pagination):**

- Layout: flex items-center justify-center gap-2
- زر "السابق": disabled إذا currentPage === 1
- أرقام الصفحات: px-4 py-2 rounded-xl (bg-primary text-white إذا currentPage === page)
- زر "التالي": disabled إذا currentPage === totalPages

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Header:**
   - العنوان: text-4xl (36px) على Mobile (بدلاً من text-5xl = 48px على Desktop)
   - نفس التصميم والألوان

2. **Controls:**
   - Layout: flex-col على Mobile (عمودي)
   - Desktop: sm:flex-row (صف واحد)
   - Search: w-full (عرض كامل)
   - Sort: w-full على Mobile / min-w-[160px] على Desktop
   - Mobile Filter Button: يظهر على Mobile (lg:hidden)

3. **Filter Sidebar:**
   - مخفي على Mobile (hidden lg:block)
   - Mobile Filter Modal: يظهر بدلاً منه على Mobile

4. **Results Grid:**
   - Layout: grid-cols-2 على Mobile (عمودين)
   - Desktop: lg:grid-cols-4 (4 أعمدة)
   - Gap: gap-6 (نفس القيمة)

5. **Pagination:**
   - نفس التصميم والأحجام

**الأحجام الجديدة:**
- العنوان: text-4xl (36px) على Mobile
- Grid: grid-cols-2 على Mobile
- Controls: flex-col (عمودي) على Mobile

**Layout:**
- Controls: flex-col (عمودي) على Mobile
- Results Grid: grid-cols-2 (عمودين) على Mobile
- Filter Sidebar: مخفي (Mobile Filter Modal بدلاً منه)

## التفاعلات - اختبار كل زر

**حقل البحث:**
- كتابة نص → تحديث النتائج فوراً (client-side filtering) → يعمل ✅
- setCurrentPage(1) عند البحث → يعمل ✅

**Sort Dropdown:**
- اختيار "أعلى تطابق" → ترتيب حسب finalScore (تنازلي) → يعمل ✅
- اختيار "السعر: صاعد" → ترتيب حسب price (تصاعدي) → يعمل ✅
- اختيار "السعر: هابط" → ترتيب حسب price (تنازلي) → يعمل ✅
- اختيار "التقييم" → ترتيب حسب finalScore (تنازلي) → يعمل ✅
- setCurrentPage(1) عند التغيير → يعمل ✅

**Filter Sidebar (Desktop):**
- نسبة التوافق (Slider): تحديث filters.matchPercentage → تحديث النتائج فوراً → يعمل ✅
- السعر (Slider): تحديث filters.maxPrice → تحديث النتائج فوراً → يعمل ✅
- العائلة العطرية (Checkboxes): إضافة/إزالة من filters.families → تحديث النتائج فوراً → يعمل ✅

**Mobile Filter Button:**
- الضغط → فتح MobileFilterModal → يعمل ✅

**Favorite Button (على الكارت):**
- الضغط (إضافة) → optimistic update + API call + Toast "تم الحفظ في المفضلة ♥️" → يعمل ✅
- الضغط (إزالة) → optimistic update + API call + Toast "تم الحذف من المفضلة" → يعمل ✅
- Guest: localStorage بدلاً من API → يعمل ✅
- Error: revert optimistic update + Toast error → يعمل ✅

**Share Button (على الكارت - Authenticated only):**
- الضغط → فتح Share Dialog (ShareButton component) → يعمل ✅
- مخفي للـ Guests → يعمل ✅

**Price Comparison Button (على الكارت):**
- الضغط → فتح Google Search في tab جديد: "perfume name brand price buy" → يعمل ✅

**Pagination:**
- زر "السابق" → setCurrentPage(p - 1) → يعمل ✅
- زر "التالي" → setCurrentPage(p + 1) → يعمل ✅
- رقم الصفحة → setCurrentPage(page) → يعمل ✅
- disabled إذا currentPage === 1 أو currentPage === totalPages → يعمل ✅

**Guest CTA:**
- زر "ابدأ الآن مجاناً" → الانتقال إلى /login?callbackUrl=/results → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Loading Spinner (عند fetch API):**
  - يظهر عند isLoading === true (قبل fetch API)
  - التصميم: min-h-screen bg-cream-bg flex items-center justify-center
  - Spinner: w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4
  - الرسالة: "جاري حساب التوافق..." - text-xl text-brown-text
  - الوصف: "نحلل تفضيلاتك للحصول على أفضل النتائج" - text-brown-text/60 mt-2
  - الموقع: text-center
  - يختفي بعد fetch API (isLoading === false)

**Empty (فارغ):**

- **Empty State (لا نتائج بعد الفلترة):**
  - يظهر إذا paginatedPerfumes.length === 0 (بعد الفلترة)
  - التصميم: text-center py-24
  - الأيقونة: Search (w-16 h-16 text-primary/50) في container w-32 h-32 bg-primary/10 rounded-3xl
  - العنوان: "لا توجد نتائج" - text-2xl font-tajawal-bold text-brown-text mb-4
  - الوصف: "حاول تعديل الفلاتر أو كلمات البحث" - text-lg text-brown-text/60 mb-8
  - الزر: "إعادة تعيين الفلاتر" - CTAButton variant="primary"
  - Action: reset searchQuery و filters و currentPage

**Error (خطأ):**

- **Error State (فشل API):**
  - يظهر إذا error !== null (بعد fetch API failed)
  - التصميم: min-h-screen bg-cream-bg flex items-center justify-center text-center
  - الرسالة: "حدث خطأ أثناء تحميل النتائج" - text-xl text-red-500 mb-4
  - الزر: "إعادة المحاولة" - CTAButton onClick={() => window.location.reload()}
  - الموقع: text-center

---

# Route: /perfume/[id]
**النوع:** محمي / ديناميكي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط
**القسم الرئيسي (grid grid-cols-1 lg:grid-cols-2 gap-12):**

**الجزء الأيسر (Left):**

1. **صورة العطر:**
   - التصميم: w-full aspect-[3/4] bg-white/70 rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden
   - SmartImage: width={600} height={800} objectFit="cover"
   - Alt: "{perfume.name} - {perfume.brand}"

2. **الاسم والعلامة التجارية:**
   - الاسم: text-4xl font-bold text-brown-text leading-tight
   - العلامة التجارية: text-2xl text-brown-text/70 font-semibold
   - الموقع: text-right space-y-4

**الجزء الأيمن (Right):**

1. **SpeedometerGauge (مقياس السرعة):**
   - Suspense fallback: LoadingSpinner size="sm"
   - Score: perfume.score ?? 85
   - Status: perfume.status ?? 'safe'
   - الموقع: space-y-10

2. **PerfumeTimeline (الجدول الزمني):**
   - Suspense fallback: h-64 animate-pulse bg-gray-200 rounded-2xl
   - 3 مراحل: الافتتاحية، القلب، القاعدة
   - كل مرحلة: score, status, stageName, notes
   - الموقع: space-y-10

3. **PerfumeDetailCTA (Fixed Bottom):**
   - التصميم: fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 max-w-4xl w-[calc(100%-2rem)]
   - Layout: flex gap-3 items-center
   - ShareButton: variant="secondary" className="flex-1 h-12"
   - Price Comparison Button: "قارن الأسعار" - bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all font-semibold text-base px-6 py-3 rounded-full
   - Dropdown (عند الضغط): absolute bottom-full right-0 mb-2 z-50 bg-white shadow-2xl rounded-2xl border-2 border-brown-text/10 p-3 grid grid-cols-2 gap-2 min-w-[280px]
     - Noon: SAR {noonPrice}
     - Namshi: SAR {namshiPrice}
     - Sixth Street: "شراء عينة" (col-span-2)

**الخلفية:**
- bg-gradient-to-b from-cream-bg/50 to-cream-bg/90
- py-12 px-6 pb-32
- max-w-6xl mx-auto
- direction: dir="rtl"

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Grid Layout:**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: lg:grid-cols-2 (عمودين)
   - Gap: gap-12 (نفس القيمة)

2. **الصورة:**
   - نفس التصميم (aspect-[3/4])
   - عرض كامل على Mobile

3. **SpeedometerGauge و PerfumeTimeline:**
   - نفس التصميم والأحجام
   - ترتيب عمودي على Mobile

4. **PerfumeDetailCTA:**
   - نفس التصميم (fixed bottom)
   - w-[calc(100%-2rem)] (عرض كامل مع padding)
   - Layout: flex gap-3 (نفس التصميم)

5. **الاسم والعلامة التجارية:**
   - نفس التصميم والأحجام

**الأحجام الجديدة:**
- Grid: grid-cols-1 على Mobile
- CTA: w-[calc(100%-2rem)] على جميع الأحجام

**Layout:**
- Grid: grid-cols-1 (عمود واحد) على Mobile
- CTA: fixed bottom (نفس الموقع على جميع الأحجام)

## التفاعلات - اختبار كل زر

**ShareButton:**
- الضغط → فتح Share Dialog (ShareButton component) → يعمل ✅
- متاح لجميع المستخدمين (Guests + Authenticated) → يعمل ✅

**Price Comparison Button ("قارن الأسعار"):**
- الضغط → فتح/إغلاق Dropdown → يعمل ✅
- Dropdown يظهر: Noon, Namshi, Sixth Street → يعمل ✅
- الضغط خارج Dropdown → إغلاق Dropdown (click outside) → يعمل ✅

**Dropdown Links:**
- Noon link → فتح Noon search في tab جديد → يعمل ✅
- Namshi link → فتح Namshi search في tab جديد → يعمل ✅
- Sixth Street link → فتح Sixth Street search في tab جديد → يعمل ✅

**Back Button:**
- لا يوجد Back Button في الصفحة (Browser back button فقط)

**Favorite Button:**
- لا يوجد Favorite Button في صفحة التفاصيل

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **SpeedometerGauge Suspense:**
  - Fallback: LoadingSpinner size="sm"
  - يظهر أثناء تحميل SpeedometerGauge component
  - يختفي تلقائياً بعد التحميل

- **PerfumeTimeline Suspense:**
  - Fallback: h-64 animate-pulse bg-gray-200 rounded-2xl
  - يظهر أثناء تحميل PerfumeTimeline component
  - يختفي تلقائياً بعد التحميل

**Empty (فارغ):**

- لا توجد حالة Empty حالياً
- الصفحة تستخدم fallback: perfumes[0] إذا getPerfumeById(id) === undefined
- دائماً تعرض عطر (حتى لو ID غير موجود)

**Error (خطأ):**

- لا توجد حالة Error حالياً
- البيانات محلية (static) - getPerfumeById(id) || perfumes[0]
- لا يوجد error handling أو error boundary
- لا توجد رسائل خطأ أو error pages
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل

---

# Route: /login
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-[#F2F0EB] (cream-bg)
- min-h-screen flex items-center justify-center
- padding: p-4
- direction: dir="rtl"

**Card (الخلفية الرئيسية):**
- التصميم: bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-primary/10
- الموقع: text-center

**العنوان:**
- النص: "تسجيل الدخول Ask Seba"
- الحجم: text-4xl sm:text-5xl (36px على Mobile / 48px على Desktop)
- اللون: bg-gradient-to-r from-[#2f6f73] to-[#c0841a] bg-clip-text text-transparent
- الوزن: font-bold
- الموقع: text-center mb-4

**Error Message (إذا error !== null):**
- التصميم: mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm
- الموقع: في الأعلى قبل الأزرار

**الأزرار:**

1. **زر "دخول بـ Google":**
   - النص: "دخول بـ Google"
   - الأيقونة: SVG Google Logo (w-5 h-5 me-2) - ألوان Google (أزرق، أخضر، أصفر، أحمر)
   - التصميم: CTAButton variant="primary" className="w-full"
   - Loading: isLoading (Loader2 spinner يظهر إذا isLoading === true)
   - Disabled: disabled={isLoading}
   - Action: handleGoogleSignIn → signIn('google', { callbackUrl, redirect: true })

2. **Divider (فاصل):**
   - التصميم: relative
   - الخط: border-t border-[#5B4233]/20
   - النص: "أو" - px-2 bg-white text-[#5B4233]/60
   - الموقع: text-center

**Credentials Form:**

1. **حقل البريد الإلكتروني:**
   - Label: "البريد الإلكتروني" - block text-sm font-medium text-[#5B4233] mb-2
   - Input: type="email" id="email"
   - Placeholder: "example@email.com"
   - Styling: w-full px-4 py-3 border border-[#5B4233]/20 rounded-xl focus:ring-2 focus:ring-primary
   - Disabled: disabled={isLoading}
   - Required: required

2. **حقل كلمة المرور:**
   - Label: "كلمة المرور" - block text-sm font-medium text-[#5B4233] mb-2
   - Input: type="password" id="password"
   - Placeholder: "••••••••"
   - Styling: w-full px-4 py-3 border border-[#5B4233]/20 rounded-xl focus:ring-2 focus:ring-primary
   - Disabled: disabled={isLoading}
   - Required: required

3. **زر "دخول":**
   - النص: "دخول"
   - التصميم: CTAButton type="submit" variant="primary" className="w-full"
   - Loading: isLoading (Loader2 spinner يظهر إذا isLoading === true)
   - Disabled: disabled={isLoading}
   - Action: handleSubmit → signIn('credentials', { email, password, redirect: false })

**Register Link:**
- النص: "لا تملك حساباً؟ إنشاء حساب جديد"
- التصميم: text-center mt-6 text-sm text-[#5B4233]/70
- Link: href="/register" className="font-bold text-primary hover:text-primary/80"
- الموقع: text-center mt-6

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Card:**
   - Padding: p-8 على Mobile (بدلاً من sm:p-12 = 48px على Desktop)
   - نفس التصميم والأحجام الأخرى

2. **العنوان:**
   - الحجم: text-4xl (36px) على Mobile (بدلاً من text-5xl = 48px على Desktop)
   - نفس اللون والتصميم

3. **الأزرار والحقول:**
   - نفس التصميم والأحجام (w-full)
   - نفس التخطيط (space-y-4)

**الأحجام الجديدة:**
- العنوان: text-4xl (36px) على Mobile
- Card Padding: p-8 (32px) على Mobile

**Layout:**
- نفس التخطيط (flex-col space-y-4)
- نفس الأحجام (w-full)

## التفاعلات - اختبار كل زر

**زر "دخول بـ Google":**
- الضغط → handleGoogleSignIn → signIn('google', { callbackUrl, redirect: true }) → يعمل ✅
- Loading: isLoading === true → Loader2 spinner يظهر في الزر → يعمل ✅
- Error: setError('حدث خطأ أثناء تسجيل الدخول بـ Google') → يعمل ✅
- Disabled: disabled={isLoading} → يعمل ✅

**Credentials Form:**

- **حقل البريد الإلكتروني:**
  - الكتابة → setEmail(e.target.value) → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅
  - Required validation → يعمل ✅

- **حقل كلمة المرور:**
  - الكتابة → setPassword(e.target.value) → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅
  - Required validation → يعمل ✅

- **زر "دخول" (Submit):**
  - الضغط → handleSubmit → signIn('credentials', { email, password, redirect: false }) → يعمل ✅
  - Loading: isLoading === true → Loader2 spinner يظهر في الزر → يعمل ✅
  - Error (empty fields): setError('يرجى إدخال البريد الإلكتروني وكلمة المرور') → يعمل ✅
  - Error (invalid credentials): setError('البريد الإلكتروني أو كلمة المرور غير صحيحة') → يعمل ✅
  - Success: router.push(callbackUrl) → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅

**Register Link:**
- الضغط → الانتقال إلى /register → يعمل ✅
- Hover: hover:text-primary/80 → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Suspense Fallback (أثناء تحميل LoginContent):**
  - يظهر عند تحميل LoginContent component
  - التصميم: min-h-screen bg-[#F2F0EB] flex items-center justify-center
  - LoadingSpinner: message="جاري التحميل..."
  - يختفي تلقائياً بعد التحميل

- **Google Sign In Loading:**
  - isLoading === true → Loader2 spinner في زر "دخول بـ Google"
  - الزر معطل (disabled={isLoading})
  - يختفي بعد signIn complete أو error

- **Credentials Login Loading:**
  - isLoading === true → Loader2 spinner في زر "دخول"
  - الحقول معطلة (disabled={isLoading})
  - يختفي بعد signIn complete أو error

**Empty (فارغ):**

- لا توجد حالة Empty حالياً
- الصفحة تعرض دائماً نفس المحتوى (Google button + Form + Register link)

**Error (خطأ):**

- **Error Message (إذا error !== null):**
  - التصميم: mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm
  - الرسائل:
    - "حدث خطأ أثناء تسجيل الدخول بـ Google" (Google sign-in error)
    - "يرجى إدخال البريد الإلكتروني وكلمة المرور" (empty fields)
    - "البريد الإلكتروني أو كلمة المرور غير صحيحة" (invalid credentials)
    - "حدث خطأ أثناء تسجيل الدخول" (general error)
  - الموقع: في الأعلى قبل الأزرار
  - يختفي عند بدء محاولة جديدة (setError(null))

---

# Route: /register
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-[#F2F0EB] (cream-bg)
- min-h-screen flex items-center justify-center
- padding: p-4
- direction: dir="rtl"

**Card (الخلفية الرئيسية):**
- التصميم: bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-primary/10
- الموقع: text-center

**العنوان:**
- النص: "إنشاء حساب Ask Seba"
- الحجم: text-4xl sm:text-5xl (36px على Mobile / 48px على Desktop)
- اللون: bg-gradient-to-r from-[#2f6f73] to-[#c0841a] bg-clip-text text-transparent
- الوزن: font-bold
- الموقع: text-center mb-4

**Error Message (إذا error !== null):**
- التصميم: mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm
- الموقع: في الأعلى قبل الأزرار

**الأزرار:**

1. **زر "تسجيل بـ Google":**
   - النص: "تسجيل بـ Google"
   - الأيقونة: SVG Google Logo (w-5 h-5 me-2) - ألوان Google (أزرق، أخضر، أصفر، أحمر)
   - التصميم: CTAButton variant="primary" className="w-full"
   - Loading: isLoading (Loader2 spinner يظهر إذا isLoading === true)
   - Disabled: disabled={isLoading}
   - Action: handleGoogleSignIn → signIn('google', { callbackUrl: '/dashboard', redirect: true })

2. **Divider (فاصل):**
   - التصميم: relative
   - الخط: border-t border-[#5B4233]/20
   - النص: "أو" - px-2 bg-white text-[#5B4233]/60
   - الموقع: text-center

**Credentials Form:**

1. **حقل البريد الإلكتروني:**
   - Label: "البريد الإلكتروني" - block text-sm font-medium text-[#5B4233] mb-2
   - Input: type="email" id="email"
   - Placeholder: "example@email.com"
   - Styling: w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary
   - Border: border-red-300 إذا validationErrors.email، border-[#5B4233]/20 إذا لا
   - Disabled: disabled={isLoading}
   - Required: required
   - Validation Error: يظهر تحت الحقل (text-sm text-red-600) إذا validationErrors.email

2. **حقل كلمة المرور:**
   - Label: "كلمة المرور" - block text-sm font-medium text-[#5B4233] mb-2
   - Input: type="password" id="password"
   - Placeholder: "••••••••"
   - Styling: w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary
   - Border: border-red-300 إذا validationErrors.password، border-[#5B4233]/20 إذا لا
   - Disabled: disabled={isLoading}
   - Required: required
   - Validation Error: يظهر تحت الحقل (text-sm text-red-600) إذا validationErrors.password

3. **حقل تأكيد كلمة المرور:**
   - Label: "تأكيد كلمة المرور" - block text-sm font-medium text-[#5B4233] mb-2
   - Input: type="password" id="confirmPassword"
   - Placeholder: "••••••••"
   - Styling: w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary
   - Border: border-red-300 إذا validationErrors.confirmPassword، border-[#5B4233]/20 إذا لا
   - Disabled: disabled={isLoading}
   - Required: required
   - Validation Error: يظهر تحت الحقل (text-sm text-red-600) إذا validationErrors.confirmPassword

4. **زر "إنشاء الحساب":**
   - النص: "إنشاء الحساب"
   - التصميم: CTAButton type="submit" variant="primary" className="w-full"
   - Loading: isLoading (Loader2 spinner يظهر إذا isLoading === true)
   - Disabled: disabled={isLoading}
   - Action: handleSubmit → validateForm() → setTimeout (Demo message بعد 1 ثانية)

**Login Link:**
- النص: "لديك حساب؟ تسجيل الدخول"
- التصميم: text-center mt-6 text-sm text-[#5B4233]/70
- Link: href="/login" className="font-bold text-primary hover:text-primary/80"
- الموقع: text-center mt-6

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Card:**
   - Padding: p-8 على Mobile (بدلاً من sm:p-12 = 48px على Desktop)
   - نفس التصميم والأحجام الأخرى

2. **العنوان:**
   - الحجم: text-4xl (36px) على Mobile (بدلاً من text-5xl = 48px على Desktop)
   - نفس اللون والتصميم

3. **الأزرار والحقول:**
   - نفس التصميم والأحجام (w-full)
   - نفس التخطيط (space-y-4)

**الأحجام الجديدة:**
- العنوان: text-4xl (36px) على Mobile
- Card Padding: p-8 (32px) على Mobile

**Layout:**
- نفس التخطيط (flex-col space-y-4)
- نفس الأحجام (w-full)

## التفاعلات - اختبار كل زر

**زر "تسجيل بـ Google":**
- الضغط → handleGoogleSignIn → signIn('google', { callbackUrl: '/dashboard', redirect: true }) → يعمل ✅
- Loading: isLoading === true → Loader2 spinner يظهر في الزر → يعمل ✅
- Error: setError('حدث خطأ أثناء تسجيل الدخول بـ Google') → يعمل ✅
- Disabled: disabled={isLoading} → يعمل ✅

**Credentials Form:**

- **حقل البريد الإلكتروني:**
  - الكتابة → setEmail(e.target.value) + setValidationErrors(prev => ({ ...prev, email: '' })) → يعمل ✅
  - Validation Error: "البريد الإلكتروني مطلوب" أو "البريد الإلكتروني غير صحيح" → يظهر تحت الحقل → يعمل ✅
  - Border: border-red-300 إذا error → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅
  - Required validation → يعمل ✅

- **حقل كلمة المرور:**
  - الكتابة → setPassword(e.target.value) + setValidationErrors(prev => ({ ...prev, password: '', confirmPassword: '' })) → يعمل ✅
  - Validation Error: "كلمة المرور مطلوبة" أو "كلمة المرور يجب أن تكون 6 أحرف على الأقل" → يظهر تحت الحقل → يعمل ✅
  - Border: border-red-300 إذا error → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅
  - Required validation → يعمل ✅

- **حقل تأكيد كلمة المرور:**
  - الكتابة → setConfirmPassword(e.target.value) + setValidationErrors(prev => ({ ...prev, confirmPassword: '' })) → يعمل ✅
  - Validation Error: "تأكيد كلمة المرور مطلوب" أو "كلمة المرور غير متطابقة" → يظهر تحت الحقل → يعمل ✅
  - Border: border-red-300 إذا error → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅
  - Required validation → يعمل ✅

- **زر "إنشاء الحساب" (Submit):**
  - الضغط → handleSubmit → validateForm() → يعمل ✅
  - إذا validation fails → setValidationErrors → يعمل ✅
  - إذا validation passes → setIsLoading(true) → setTimeout (Demo message بعد 1 ثانية) → يعمل ✅
  - Loading: isLoading === true → Loader2 spinner يظهر في الزر → يعمل ✅
  - Demo Message: setError('سيتم تفعيل إنشاء الحساب قريبًا. حالياً يمكنك استخدام حساب تجريبي: demo@askseba.com / 123456') → يعمل ✅
  - Disabled: disabled={isLoading} → يعمل ✅

**Login Link:**
- الضغط → الانتقال إلى /login → يعمل ✅
- Hover: hover:text-primary/80 → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Google Sign In Loading:**
  - isLoading === true → Loader2 spinner في زر "تسجيل بـ Google"
  - الزر معطل (disabled={isLoading})
  - يختفي بعد signIn complete أو error

- **Register Form Loading:**
  - isLoading === true → Loader2 spinner في زر "إنشاء الحساب"
  - الحقول معطلة (disabled={isLoading})
  - يظهر بعد validateForm() passes
  - يختفي بعد setTimeout (Demo message)

**Empty (فارغ):**

- لا توجد حالة Empty حالياً
- الصفحة تعرض دائماً نفس المحتوى (Google button + Form + Login link)

**Error (خطأ):**

- **Error Message (إذا error !== null):**
  - التصميم: mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm
  - الرسائل:
    - "حدث خطأ أثناء تسجيل الدخول بـ Google" (Google sign-in error)
    - "سيتم تفعيل إنشاء الحساب قريبًا. حالياً يمكنك استخدام حساب تجريبي: demo@askseba.com / 123456" (Demo message بعد submit)
  - الموقع: في الأعلى قبل الأزرار
  - يختفي عند بدء محاولة جديدة (setError(null))

- **Validation Errors (تحت كل حقل):**
  - التصميم: mt-1 text-sm text-red-600
  - الرسائل:
    - "البريد الإلكتروني مطلوب" أو "البريد الإلكتروني غير صحيح"
    - "كلمة المرور مطلوبة" أو "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    - "تأكيد كلمة المرور مطلوب" أو "كلمة المرور غير متطابقة"
  - Border: border-red-300 على الحقل إذا error
  - الموقع: تحت كل حقل مباشرة
  - تختفي عند الكتابة في الحقل (setValidationErrors)

---

# Route: /dashboard
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-cream-bg/50 (min-h-screen)
- direction: dir="rtl"
- max-w-6xl mx-auto space-y-8 px-6 pb-12

**Hero Header (Header العلوي):**
- التصميم: bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-b-3xl shadow-2xl mb-8
- Layout: max-w-6xl mx-auto flex items-center gap-6 flex-wrap
- **صورة المستخدم:**
  - إذا session.user?.image: Image (w-20 h-20 rounded-full ring-4 ring-white/50 shadow-lg)
  - إذا لا: Initial (w-20 h-20 rounded-full ring-4 ring-white/50 shadow-lg bg-white/20 text-3xl font-bold) - الحرف الأول من الاسم
- **اسم المستخدم:**
  - النص: "مرحباً {session.user?.name || 'مستخدم'}"
  - الحجم: text-4xl font-bold mb-2 truncate
- **البريد الإلكتروني:**
  - النص: {session.user?.email}
  - الحجم: opacity-90 text-lg truncate

**Header Card (بطاقة العناوين):**
- التصميم: bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-cream-bg/50
- Layout: flex items-center justify-between mb-8
- **العنوان:**
  - الأيقونة: 👋 (w-12 h-12 bg-gradient-to-r from-safe-green to-emerald-500 rounded-2xl)
  - النص: "لوحة التحكم" - text-3xl font-bold text-brown-text leading-tight
  - الوصف: "بصمتك العطرية مكتملة ✅" - text-brown-text/70
- **عدد التطابقات:**
  - النص: "{defaultUserStats.totalMatches} تطابق" - text-2xl font-bold text-safe-green mb-1
  - الوصف: "عطور محفوظة" - text-sm text-brown-text/60

**StatsGrid (4 إحصائيات):**
- Layout: grid grid-cols-2 md:grid-cols-4 gap-4
- **الإحصائيات (4):**
  1. "عمليات البحث" - defaultUserStats.searches (45) - icon: 'search' - color: '#c0841a'
  2. "محفوظات" - defaultUserStats.savedPerfumes (12) - icon: 'bookmark' - color: '#10B981'
  3. "تطابقات" - defaultUserStats.totalMatches (23) - icon: 'favorite' - color: '#F59E0B'
  4. "عينات مطلوبة" - defaultUserStats.samples (3) - icon: 'science' - color: '#EF4444'
- كل إحصائية: bg-cream/50 rounded-2xl p-4 flex flex-col gap-2 hover:shadow-lg

**Dashboard Tabs (بطاقة التبويبات):**
- التصميم: bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-cream-bg/50
- **FilterTabs:**
  - Layout: flex gap-2 overflow-x-auto px-4 py-2
  - **3 Tabs:**
    1. "💜 المفضلة" (favorites) - count: favorites.length
    2. "❌ المكروهة" (disliked) - count: dislikedPerfumes.length (getDislikedPerfumes())
    3. "💾 قائمة الرغبات" (wishlist) - count: wishlistPerfumes.length (getWishlistPerfumes())
  - Active Tab: bg-primary text-white shadow-md shadow-primary/20
  - Inactive Tab: bg-white border border-stone-200 text-slate-700 hover:text-primary
- **عنوان المحتوى:**
  - النص: يتغير حسب activeTab:
    - "💜 عطورك المفضلة" (favorites)
    - "❌ العطور المكروهة" (disliked)
    - "💾 قائمة الرغبات" (wishlist)
  - الحجم: text-xl font-bold text-brown-text mb-6
- **PerfumeGrid:**
  - Layout: grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
  - perfumes: getCurrentPerfumes() (favorites أو dislikedPerfumes أو wishlistPerfumes حسب activeTab)
  - كل كارت: PerfumeCard (صورة، اسم، علامة تجارية، نسبة تطابق، سعر)

**Radar Chart (بطاقة الرادار):**
- التصميم: bg-white/70 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-cream-bg/50
- **العنوان:**
  - النص: "بصمتك العطرية"
  - الحجم: text-xl sm:text-2xl font-bold text-brown-text mb-4 sm:mb-6 md:mb-8 text-center
- **نص إذا لا يوجد quiz data:**
  - النص: "قم بإجراء الاختبار لرؤية بصمتك العطرية الشخصية"
  - الحجم: text-center text-brown-text/70 mb-4 sm:mb-6 text-base sm:text-lg px-4
  - يظهر إذا !hasQuizData (quizData.step1_liked.length === 0)
- **RadarChart:**
  - Suspense fallback: LoadingSpinner size="md" (w-full max-w-[90vw] sm:max-w-[400px] aspect-square)
  - data: dynamicRadarData (calculateScentProfile من quizData.step1_liked)
  - size: 400
  - Layout: flex justify-center px-2

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Hero Header:**
   - نفس التصميم والأحجام (flex-wrap يعمل على Mobile)

2. **Header Card:**
   - نفس التصميم والأحجام (p-8)
   - StatsGrid: grid-cols-2 على Mobile (عمودين) / md:grid-cols-4 على Desktop (4 أعمدة)

3. **Dashboard Tabs:**
   - FilterTabs: overflow-x-auto (scroll أفقي على Mobile)
   - PerfumeGrid: grid-cols-2 على Mobile (عمودين) / md:grid-cols-3 / lg:grid-cols-4 على Desktop

4. **Radar Chart:**
   - Padding: p-4 على Mobile / sm:p-6 / md:p-8 على Desktop
   - العنوان: text-xl على Mobile / sm:text-2xl على Desktop
   - RadarChart: max-w-[90vw] على Mobile / sm:max-w-[400px] على Desktop

**الأحجام الجديدة:**
- StatsGrid: grid-cols-2 على Mobile
- PerfumeGrid: grid-cols-2 على Mobile
- Radar Chart Padding: p-4 على Mobile
- Radar Chart Title: text-xl على Mobile

**Layout:**
- StatsGrid: grid-cols-2 (عمودين) على Mobile
- PerfumeGrid: grid-cols-2 (عمودين) على Mobile
- FilterTabs: overflow-x-auto (scroll أفقي) على Mobile

## التفاعلات - اختبار كل زر

**FilterTabs (تبديل التبويبات):**

- **Tab "💜 المفضلة" (favorites):**
  - الضغط → setActiveTab('favorites') → PerfumeGrid يعرض favorites → يعمل ✅
  - Active State: bg-primary text-white shadow-md → يعمل ✅
  - Count Badge: يظهر favorites.length → يعمل ✅

- **Tab "❌ المكروهة" (disliked):**
  - الضغط → setActiveTab('disliked') → PerfumeGrid يعرض dislikedPerfumes (getDislikedPerfumes()) → يعمل ✅
  - Active State: bg-primary text-white shadow-md → يعمل ✅
  - Count Badge: يظهر dislikedPerfumes.length → يعمل ✅

- **Tab "💾 قائمة الرغبات" (wishlist):**
  - الضغط → setActiveTab('wishlist') → PerfumeGrid يعرض wishlistPerfumes (getWishlistPerfumes()) → يعمل ✅
  - Active State: bg-primary text-white shadow-md → يعمل ✅
  - Count Badge: يظهر wishlistPerfumes.length → يعمل ✅

**PerfumeGrid (كروت العطور):**

- **ضغط على كارت عطر:**
  - الضغط → onPerfumeClick(perfume) → router.push(`/perfume/${perfume.id}`) → الانتقال إلى صفحة التفاصيل → يعمل ✅
  - Hover Effect: hover:scale-[1.02] hover:shadow-xl → يعمل ✅

**RadarChart:**

- **Suspense Fallback:**
  - يظهر LoadingSpinner أثناء تحميل RadarChart → يعمل ✅
  - يختفي تلقائياً بعد التحميل → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Loading (عند التحقق من الجلسة):**
  - يظهر إذا status === 'loading' أو !session
  - التصميم: min-h-screen bg-cream-bg/50 flex items-center justify-center
  - LoadingSpinner: message="جاري التحميل..."
  - الموقع: text-center
  - يختفي بعد تحميل الجلسة

- **Redirect Loading (عند عدم المصادقة):**
  - يظهر إذا status === 'unauthenticated'
  - التصميم: min-h-screen bg-cream-bg/50 flex items-center justify-center
  - LoadingSpinner: message="جاري التحويل..."
  - Action: router.push('/login?callbackUrl=/dashboard')
  - الموقع: text-center

- **RadarChart Suspense Loading:**
  - يظهر أثناء تحميل RadarChart component
  - التصميم: w-full max-w-[90vw] sm:max-w-[400px] aspect-square flex items-center justify-center
  - LoadingSpinner: size="md"
  - يختفي تلقائياً بعد التحميل

**Empty (فارغ):**

- **لا يوجد quiz data (Radar Chart):**
  - يظهر إذا !hasQuizData (quizData.step1_liked.length === 0)
  - النص: "قم بإجراء الاختبار لرؤية بصمتك العطرية الشخصية"
  - التصميم: text-center text-brown-text/70 mb-4 sm:mb-6 text-base sm:text-lg px-4
  - الموقع: فوق RadarChart
  - RadarChart: لا يزال يظهر (مع Suspense fallback)

- **لا يوجد عطور في التاب النشط:**
  - PerfumeGrid لا يعرض Empty State حالياً
  - Grid فارغ (لا كروت)
  - لا توجد رسالة "لا توجد عطور" أو Empty State

**Error (خطأ):**

- **خطأ في تحميل Favorites (API):**
  - يحدث إذا fetch('/api/user/favorites') failed
  - console.error('Error loading favorites:', err)
  - لا توجد رسالة خطأ للمستخدم
  - favorites تبقى [] (فارغ)

- **لا توجد حالات Error أخرى:**
  - البيانات الأخرى محلية (static)
  - لا يوجد error handling للـ RadarChart أو StatsGrid

---

# Route: /profile
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-cream (min-h-screen)
- pb-24 (padding-bottom لـ Footer)
- direction: dir="rtl"

**Header & Profile Card (البطاقة العلوية):**
- التصميم: bg-white/90 backdrop-blur-sm px-6 pt-12 pb-8 rounded-b-[40px] shadow-lg border-b border-brown/20
- Layout: flex flex-col items-center

**Avatar (الصورة الشخصية):**
- التصميم: w-28 h-28 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100
- الصورة: Image (width={112} height={112}) إذا imagePreview || avatarUrl
- Fallback: User icon (size={56} text-brown/60) إذا لا صورة
- **زر رفع الصورة:**
  - الموقع: absolute bottom-1 right-1
  - التصميم: bg-primary/90 hover:bg-primary text-white p-2 rounded-full border-2 border-white shadow-lg
  - الأيقونة: Camera (size={14}) أو Loading spinner (w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin) إذا isUploading
  - Disabled: disabled={isUploading}
  - Hover: group-hover:scale-110
  - Action: fileInputRef.current?.click()

**اسم المستخدم:**
- النص: {session?.user?.name || 'عبدالله محمد'}
- الحجم: text-xl font-bold text-brown leading-tight
- الموقع: mt-4

**Bio Textarea (الوصف الشخصي):**
- التصميم: w-full p-2 mt-2 border border-brown/20 rounded-xl text-sm text-center resize-none focus:ring-1 focus:ring-amber-500/30
- Placeholder: "وصف نفسك ✨"
- maxLength: 100
- rows: 2
- Value: optimisticBio (state)
- **نص التوضيحي (Hover Tooltip):**
  - النص: "يتم الحفظ تلقائياً عند الخروج ✨"
  - التصميم: absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/bio:opacity-100
  - Styling: text-[10px] text-brown/40 bg-white/80 px-2 py-0.5 rounded-full border border-brown/10 shadow-sm

**قائمة المعلومات والدعم:**
- العنوان: "المعلومات والدعم" - text-xs font-bold text-brown/60 mr-2 mb-3 tracking-wide uppercase
- التصميم: bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-brown/10 overflow-hidden
- Layout: space-y-2 (px-6 mt-8)
- **3 عناصر (Menu Items):**
  1. "قصتنا (عن صبا)" - icon: Sparkles (w-5 h-5 text-amber-500) - href: /about
  2. "تساؤلات تهمك" - icon: HelpCircle (w-5 h-5 text-blue-500) - href: /faq
  3. "الخصوصية والأمان" - icon: ShieldCheck (w-5 h-5 text-green-500) - href: /privacy
- كل عنصر:
  - Layout: flex items-center justify-between p-5 hover:bg-amber-50/50
  - الأيقونة: p-3 bg-brown/5 hover:bg-primary/10 group-hover:bg-primary/20 rounded-2xl w-12 h-12 flex items-center justify-center
  - النص: text-base font-semibold text-brown leading-tight
  - ChevronLeft: text-brown/40 group-hover:text-brown (size={20})
  - Border: border-b border-brown/5 (بين العناصر)

**CTA "تواصل مع فريق صبا":**
- التصميم: w-full bg-gradient-to-r from-primary to-amber-600 text-white rounded-3xl p-5 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95
- الأيقونة: MessageCircle (size={24})
- النص: "تواصل مع فريق صبا"
- Font: font-semibold text-base
- Action: openEmail() → window.open(`mailto:support@askseba.com?...`, '_blank')
- الموقع: px-6 mt-8

**Logout Button:**
- التصميم: w-full flex items-center justify-center gap-3 text-brown/70 hover:text-red-500 hover:bg-brown/5 rounded-2xl p-4 font-medium
- الأيقونة: LogOut (size={20})
- النص: "تسجيل الخروج"
- Action: signOut({ callbackUrl: '/' }) + router.push('/')
- الموقع: px-6 mt-12 pb-8

**Footer:**
- النص: "نسخة التطبيق 2.3.1\nصنع بكل حب في السعودية 🇸🇦"
- التصميم: text-center text-[11px] text-brown/40 mt-6 pb-6

**Hidden File Input:**
- type="file"
- accept="image/jpeg,image/png,image/webp"
- className="hidden"
- ref: fileInputRef

**Error Toast:**
- التصميم: fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-2xl shadow-2xl z-50 max-w-sm text-center text-sm font-medium border border-red-400/50
- Animation: AnimatePresence + motion (initial: opacity 0 y 20, animate: opacity 1 y 0, exit: opacity 0 y -20)
- يختفي بعد 4 ثوان (onAnimationEnd setTimeout 4000)

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Header & Profile Card:**
   - نفس التصميم والأحجام (px-6 pt-12 pb-8)
   - Avatar: w-28 h-28 (نفس الحجم)
   - Bio Textarea: w-full (عرض كامل)

2. **قائمة المعلومات والدعم:**
   - نفس التصميم والأحجام (p-5)
   - Layout: flex-col (عمودي)
   - كل عنصر: w-full (عرض كامل)

3. **CTA و Logout:**
   - نفس التصميم والأحجام (w-full)
   - Layout: flex items-center justify-center (نفس التخطيط)

4. **Error Toast:**
   - نفس التصميم (fixed top-4 left-1/2)
   - max-w-sm (نفس الحجم)

**الأحجام الجديدة:**
- لا يوجد تغيير في الأحجام (التصميم responsive بنفس الأحجام)

**Layout:**
- نفس التخطيط (flex-col items-center)
- جميع العناصر: w-full (عرض كامل على Mobile)

## التفاعلات - اختبار كل زر

**Avatar Upload (رفع الصورة):**

- **زر رفع الصورة:**
  - الضغط → fileInputRef.current?.click() → فتح File Picker → يعمل ✅
  - Disabled: disabled={isUploading} → يعمل ✅
  - Loading: isUploading === true → Loading spinner يظهر → يعمل ✅

- **File Selection:**
  - اختيار ملف صحيح (JPG/PNG/WEBP < 2MB) → handleImageUpload → Preview → يعمل ✅
  - اختيار ملف غير صحيح (نوع مختلف) → setError('الصورة غير صالحة...') → يعمل ✅
  - اختيار ملف كبير (> 2MB) → setError('الصورة غير صالحة...') → يعمل ✅

- **Upload Process:**
  - setIsUploading(true) → Loading spinner → يعمل ✅
  - fetch('/api/avatar', { method: 'POST', body: formData }) → يعمل ✅
  - Success: update({ image: avatarUrl }) → setImagePreview(null) → يعمل ✅
  - Error: setError('حدث خطأ أثناء رفع الصورة. جرب مرة أخرى.') → يعمل ✅
  - finally: setIsUploading(false) → يعمل ✅

**Bio Textarea (الوصف الشخصي):**

- **الكتابة:**
  - onChange → setOptimisticBio(e.target.value) → يعمل ✅
  - Hover Tooltip: "يتم الحفظ تلقائياً عند الخروج ✨" → group-hover/bio:opacity-100 → يعمل ✅

- **Auto-save (onBlur):**
  - onBlur → update({ bio: newBio }) → يعمل ✅
  - لا توجد Toast message (silent save)
  - القيمة تتحدث في optimisticBio → يعمل ✅

**Menu Items (قائمة المعلومات):**

- **"قصتنا (عن صبا)":**
  - الضغط → Link href="/about" → الانتقال إلى /about → يعمل ✅
  - Hover: hover:bg-amber-50/50 → يعمل ✅

- **"تساؤلات تهمك":**
  - الضغط → Link href="/faq" → الانتقال إلى /faq → يعمل ✅
  - Hover: hover:bg-amber-50/50 → يعمل ✅

- **"الخصوصية والأمان":**
  - الضغط → Link href="/privacy" → الانتقال إلى /privacy → يعمل ✅
  - Hover: hover:bg-amber-50/50 → يعمل ✅

**CTA "تواصل مع فريق صبا":**

- الضغط → openEmail() → window.open(`mailto:support@askseba.com?subject=...&body=...`, '_blank') → فتح Email Client → يعمل ✅
- Hover: hover:shadow-2xl hover:-translate-y-0.5 → يعمل ✅
- Active: active:scale-95 → يعمل ✅

**Logout Button:**

- الضغط → signOut({ callbackUrl: '/' }) + router.push('/') → تسجيل الخروج → يعمل ✅
- Hover: hover:text-red-500 hover:bg-brown/5 → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Upload Loading (رفع الصورة):**
  - isUploading === true → Loading spinner في زر رفع الصورة
  - التصميم: w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin
  - الموقع: في زر رفع الصورة (absolute bottom-1 right-1)
  - الزر معطل (disabled={isUploading})
  - يختفي بعد upload complete أو error

**Empty (فارغ):**

- **لا يوجد Avatar:**
  - Fallback: User icon (size={56} text-brown/60)
  - يظهر إذا !imagePreview && !avatarUrl
  - الموقع: في Avatar container

- **Bio فارغ:**
  - Placeholder: "وصف نفسك ✨"
  - القيمة: optimisticBio (state) - يمكن أن يكون فارغ

**Error (خطأ):**

- **Error Toast (رفع الصورة):**
  - يظهر إذا error !== '' (فشل upload أو validation)
  - التصميم: fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-2xl shadow-2xl z-50 max-w-sm text-center text-sm font-medium border border-red-400/50
  - Animation: AnimatePresence + motion (initial: opacity 0 y 20, animate: opacity 1 y 0, exit: opacity 0 y -20)
  - الرسائل:
    - "الصورة غير صالحة، يرجى اختيار صورة بصيغة JPG أو PNG أو WEBP وبحجم لا يتجاوز 2MB." (validation error)
    - "حدث خطأ أثناء رفع الصورة. جرب مرة أخرى." (upload error)
  - الموقع: fixed top-4 left-1/2 (في المنتصف أعلى الصفحة)
  - يختفي بعد 4 ثوان (onAnimationEnd setTimeout 4000)

- **لا توجد حالات Error أخرى:**
  - Bio save: silent (لا توجد error handling)
  - Menu items: Links (لا توجد error handling)
  - CTA: window.open (لا توجد error handling)
  - Logout: signOut (لا توجد error handling)

---

# Route: /privacy
**النوع:** عام  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-[#F2F0EB] (min-h-screen)
- text-[#5B4233]
- direction: dir="rtl"
- container: mx-auto px-4 py-8 max-w-7xl

**Back Button (زر الرجوع):**
- التصميم: flex items-center gap-2 text-[#5B4233] mb-6 hover:text-[#c0841a] transition-colors
- الأيقونة: ArrowLeft (w-5 h-5)
- النص: "الرجوع للملف الشخصي"
- Link: href="/profile"

**Hero Section (القسم العلوي):**
- التصميم: bg-[#F2F0EB] py-12 px-6 text-center mb-8
- Animation: motion (initial: opacity 0 y 20, animate: opacity 1 y 0, duration: 0.6)
- **العنوان:**
  - النص: "سياسة الخصوصية" (data.hero.title)
  - الحجم: text-[33.6px] font-bold mb-4 text-[#5B4233]
- **الوصف:**
  - النص: "حمايتك أولويتنا" (data.hero.subtitle)
  - الحجم: text-xl font-bold mb-2 text-[#5B4233]/80
- **تاريخ التحديث:**
  - النص: "آخر تحديث: يناير 2026" (data.hero.last_updated)
  - الحجم: text-sm text-[#5B4233]/60

**Layout (flex flex-col lg:flex-row gap-8):**

**TOC Sidebar (جدول المحتويات - Desktop):**
- التصميم: lg:w-64 flex-shrink-0 order-2 lg:order-1
- Motion: initial opacity 0 x -20, animate opacity 1 x 0, duration 0.6
- Card: sticky top-8 bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20
- **العنوان:**
  - النص: "جدول المحتويات"
  - الحجم: text-lg font-bold mb-4 text-[#5B4233]
- **Navigation:**
  - Layout: space-y-2
  - **7 Buttons (لكل section):**
    - Active: bg-[#c0841a]/20 text-[#c0841a] font-bold
    - Inactive: text-[#5B4233]/70 hover:bg-[#c0841a]/10 hover:text-[#5B4233]
    - Styling: w-full text-right px-4 py-2 rounded-xl text-sm transition-colors
    - Action: setActiveSection (toggle)

**Main Content (flex-1 order-1 lg:order-2):**

**Quick Summary (ملخص سريع):**
- التصميم: bg-[#c0841a]/10 border-2 border-[#c0841a] rounded-3xl p-6 mb-8
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay 0.1
- **العنوان:**
  - النص: "ملخص سريع"
  - الحجم: text-xl font-bold mb-4 text-[#5B4233]
- **5 Bullets:**
  - Layout: flex gap-3 items-start mb-4 last:mb-0
  - الأيقونة: Shield (w-5 h-5 text-[#c0841a] mt-1 flex-shrink-0)
  - النص: text-base (data.summaryBullets)

**Accordion Sections (7 أقسام):**
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay 0.2
- Accordion.Root: type="single" collapsible space-y-2
- **كل Accordion.Item:**
  - التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl border border-[#5B4233]/20 mb-2 overflow-hidden
  - **Accordion.Trigger:**
    - Layout: w-full px-6 py-4 flex justify-between items-center text-base font-bold text-[#5B4233] hover:bg-[#c0841a]/50 transition-colors text-right
    - النص: {section.title}
    - الأيقونة: ChevronDown (w-5 h-5 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180)
  - **Accordion.Content:**
    - التصميم: px-6 pb-4 text-base text-[#5B4233]/80 overflow-hidden text-right
    - Layout: py-2 space-y-2
    - الفقرات: whitespace-pre-line (section.content)

**Contact Card (بطاقة التواصل):**
- التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 mb-8
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay 0.3
- **Header:**
  - Layout: flex gap-3 items-center mb-3
  - الأيقونة: Mail (w-6 h-6 text-[#c0841a])
  - العنوان: "للتواصل" - text-lg font-bold
- **Email Link:**
  - href: `mailto:${data.contact.email}` (support@askseba.com)
  - Styling: text-[#c0841a] hover:underline text-base block mb-1
- **Response Time:**
  - النص: "24-48 ساعة" (data.contact.response_time)
  - الحجم: text-sm text-[#5B4233]/60

**Compliance Badge (شارة الامتثال):**
- التصميم: bg-green-50/10 border-2 border-green-200 rounded-3xl p-6 text-center
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay 0.4
- **الأيقونة:**
  - Shield (w-8 h-8 text-green-600 mx-auto mb-3)
- **العنوان:**
  - النص: "متوافق بالكامل مع" (data.compliance.title)
  - الحجم: text-lg font-bold mb-2
- **Standards:**
  - Layout: flex gap-2 justify-center mb-3 flex-wrap
  - **2 Badges:**
    - "GDPR (الأوروبي)" و "Saudi PDPL (السعودي)"
    - Styling: bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm
- **Note:**
  - النص: "هذه السياسة تحميك وتحمينا قانونياً. خصوصيتك ليست للبيع أبداً." (data.compliance.note)
  - الحجم: text-sm text-[#5B4233]/60

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Layout:**
   - Layout: flex-col على Mobile (عمودي)
   - Desktop: lg:flex-row (صف واحد)

2. **TOC Sidebar:**
   - الموقع: order-2 على Mobile (بعد المحتوى)
   - Desktop: lg:order-1 (قبل المحتوى)
   - Sticky: sticky top-8 (نفس الموقع على Desktop)
   - نفس التصميم والأحجام

3. **Main Content:**
   - الموقع: order-1 على Mobile (قبل Sidebar)
   - Desktop: lg:order-2 (بعد Sidebar)
   - نفس التصميم والأحجام

4. **Quick Summary و Accordion:**
   - نفس التصميم والأحجام
   - Layout: space-y-2 (نفس القيمة)

5. **Contact Card و Compliance Badge:**
   - نفس التصميم والأحجام

**الأحجام الجديدة:**
- Layout: flex-col (عمودي) على Mobile
- TOC Sidebar: order-2 (بعد المحتوى) على Mobile

**Layout:**
- Layout: flex-col (عمودي) على Mobile
- TOC Sidebar: order-2 (بعد المحتوى) على Mobile

## التفاعلات - اختبار كل زر

**Back Button:**
- الضغط → Link href="/profile" → الانتقال إلى /profile → يعمل ✅
- Hover: hover:text-[#c0841a] → يعمل ✅

**TOC Sidebar Buttons:**
- الضغط على أي button → setActiveSection (toggle) → يعمل ✅
- Active State: bg-[#c0841a]/20 text-[#c0841a] font-bold → يعمل ✅
- Inactive State: text-[#5B4233]/70 hover:bg-[#c0841a]/10 → يعمل ✅
- Accordion: onValueChange → setActiveSection → يعمل ✅

**Accordion Items:**
- الضغط على Accordion.Trigger → فتح/إغلاق Accordion.Content → يعمل ✅
- ChevronDown: data-[state=open]:rotate-180 → يعمل ✅
- Hover: hover:bg-[#c0841a]/50 → يعمل ✅
- type="single" collapsible → يمكن فتح قسم واحد فقط → يعمل ✅

**Contact Email Link:**
- الضغط → window.open(`mailto:support@askseba.com`, '_blank') → فتح Email Client → يعمل ✅
- Hover: hover:underline → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- لا توجد حالة Loading حالياً
- البيانات من content.json (static import)
- التحميل فوري (أقل من ثانية)
- لا يوجد spinner أو مؤشر تحميل
- الصفحة متاحة فوراً

**Empty (فارغ):**

- لا توجد حالة Empty حالياً
- البيانات من content.json (static)
- الصفحة تعرض دائماً نفس المحتوى (7 sections, summary, contact, compliance)

**Error (خطأ):**

- لا توجد حالة Error حالياً
- البيانات من content.json (static import)
- لا توجد رسائل خطأ أو error handling
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل

---

# Route: /about
**النوع:** عام  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-[#F2F0EB] (min-h-screen)
- text-[#5B4233]
- direction: dir="rtl"
- container: mx-auto px-4 py-8 max-w-6xl

**Back Button (زر الرجوع):**
- التصميم: flex items-center gap-2 text-[#5B4233] mb-6 hover:text-[#c0841a] transition-colors
- الأيقونة: ArrowLeft (w-5 h-5)
- النص: "الرجوع للملف الشخصي"
- Link: href="/profile"

**Hero Section (القسم العلوي):**
- التصميم: text-center mb-16 py-16 px-6 rounded-3xl bg-gradient-to-br from-[#2f6f73] to-[#c0841a] text-white
- Animation: motion (initial: opacity 0 y 20, animate: opacity 1 y 0, duration: 0.6)
- **العنوان:**
  - النص: "قصتنا في Ask Seba" (data.hero.title)
  - الحجم: text-4xl md:text-5xl font-bold mb-4 text-white
- **الوصف:**
  - النص: "تطبيق يحلّل توافق العطور بناءً على تفضيلاتك الشخصية" (data.hero.subtitle)
  - الحجم: text-xl md:text-2xl font-bold mb-8 text-white/90
- **CTA Button:**
  - النص: "ابدأ الاختبار" (data.hero.cta)
  - التصميم: inline-block bg-white text-[#2f6f73] px-8 py-4 rounded-3xl font-bold hover:bg-white/90 transition-colors shadow-lg
  - Link: href="/quiz"

**Feature Cards Section (أقسام القصة):**
- Layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay index * 0.1
- **4 Feature Cards (data.sections):**
  1. "🎯 لماذا Ask Seba؟" (body paragraphs)
  2. "🔍 مشاكل العطور التقليدية" (bullets)
  3. "🧬 الحل: هندسة التوافق العطري" (body paragraphs)
  4. "🎨 كيف يعمل ask.seba؟" (bullets)
- **كل Card:**
  - التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 hover:bg-[#c0841a]/50 transition-colors
  - الأيقونة: text-4xl mb-4 (section.icon)
  - العنوان: text-xl font-bold mb-4 (section.title)
  - Body: space-y-2 text-base (section.body) إذا length > 0
  - Bullets: list-disc list-inside space-y-2 text-base (section.bullets) إذا length > 0

**Stats Section (الإحصائيات):**
- Layout: grid grid-cols-1 md:grid-cols-3 gap-6
- Motion: initial opacity 0 scale 0.9, animate opacity 1 scale 1, delay index * 0.1
- **3 Stats Cards (data.stats):**
  1. "50k" - "عطر تم تحليله"
  2. "95%" - "دقة التوافق"
  3. "100%" - "آمن للبشرة"
- **كل Card:**
  - التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-8 border border-[#5B4233]/20 text-center hover:shadow-xl transition-shadow
  - الرقم: text-4xl md:text-5xl font-bold text-[#c0841a] mb-3 (stat.number)
  - التسمية: text-lg text-[#5B4233] font-medium (stat.label)

**Testimonials Section (شهادات العملاء):**
- العنوان: "ماذا يقول عملاؤنا" - text-xl font-bold mb-8 text-center
- Layout: grid grid-cols-1 md:grid-cols-3 gap-6
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay index * 0.1
- **3 Testimonials (data.testimonials):**
  1. "أحمد" - "جدة"
  2. "نورة" - "الرياض"
  3. "خالد" - "الدوحة"
- **كل Testimonial:**
  - التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 hover:bg-[#c0841a]/50 transition-colors relative
  - الأيقونة: Quote (w-8 h-8 text-[#c0841a] mb-4)
  - النص: text-base mb-4 (testimonial.quote)
  - المؤلف: text-sm font-bold (testimonial.author - testimonial.city)

**Values Section (القيم):**
- Layout: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay index * 0.1
- **5 Values Cards (data.values):**
  1. "🔬 دقة علمية، ليست تخمينات"
  2. "💰 حماية استثمارك"
  3. "🧬 تخصيص 100% لبصمتك العطرية"
  4. "🌍 قاعدة بيانات حية"
  5. "واجهة عربية متكاملة"
- **كل Card:**
  - التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 hover:bg-[#c0841a]/50 transition-colors
  - العنوان: text-xl font-bold mb-2 (value.title)
  - الوصف: text-base text-[#5B4233]/60 (value.description)

**Final CTA Section (النداء الأخير):**
- التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-8 border border-[#5B4233]/20 text-center
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, duration 0.6
- **العنوان:**
  - النص: "رحلتك تبدأ الآن" (data.cta.title)
  - الحجم: text-xl font-bold mb-4
- **الوصف:**
  - النص: "لا مزيد من التخمين. لا مزيد من الندم. لا مزيد من العطور المركونة. عطرك المثالي ينتظرك. مستشارك الذكي جاهز." (data.cta.body)
  - الحجم: text-base mb-6
- **CTA Button:**
  - النص: "ابدأ الاختبار الآن ←" (data.cta.button)
  - التصميم: inline-block bg-[#c0841a] text-white px-8 py-4 rounded-3xl font-bold hover:bg-[#c0841a]/90 transition-colors shadow-lg
  - Link: href="/quiz" (data.cta.button_href)

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Hero Section:**
   - العنوان: text-4xl على Mobile (بدلاً من md:text-5xl = 48px على Desktop)
   - الوصف: text-xl على Mobile (بدلاً من md:text-2xl = 24px على Desktop)
   - نفس التصميم والألوان

2. **Feature Cards Section:**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: md:grid-cols-2 / lg:grid-cols-3 (2-3 أعمدة)
   - Gap: gap-6 (نفس القيمة)
   - نفس التصميم والأحجام

3. **Stats Section:**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: md:grid-cols-3 (3 أعمدة)
   - الرقم: text-4xl على Mobile (بدلاً من md:text-5xl = 48px على Desktop)
   - Gap: gap-6 (نفس القيمة)

4. **Testimonials Section:**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: md:grid-cols-3 (3 أعمدة)
   - Gap: gap-6 (نفس القيمة)

5. **Values Section:**
   - Layout: grid-cols-1 على Mobile (عمود واحد)
   - Desktop: md:grid-cols-2 / lg:grid-cols-5 (2-5 أعمدة)
   - Gap: gap-6 (نفس القيمة)

6. **Final CTA Section:**
   - نفس التصميم والأحجام

**الأحجام الجديدة:**
- Hero Title: text-4xl (36px) على Mobile
- Hero Subtitle: text-xl (20px) على Mobile
- Stats Number: text-4xl (36px) على Mobile
- Feature Cards: grid-cols-1 على Mobile
- Stats: grid-cols-1 على Mobile
- Testimonials: grid-cols-1 على Mobile
- Values: grid-cols-1 على Mobile

**Layout:**
- Feature Cards: grid-cols-1 (عمود واحد) على Mobile
- Stats: grid-cols-1 (عمود واحد) على Mobile
- Testimonials: grid-cols-1 (عمود واحد) على Mobile
- Values: grid-cols-1 (عمود واحد) على Mobile

## التفاعلات - اختبار كل زر

**Back Button:**
- الضغط → Link href="/profile" → الانتقال إلى /profile → يعمل ✅
- Hover: hover:text-[#c0841a] → يعمل ✅

**Hero CTA Button:**
- الضغط → Link href="/quiz" → الانتقال إلى /quiz → يعمل ✅
- Hover: hover:bg-white/90 → يعمل ✅

**Final CTA Button:**
- الضغط → Link href="/quiz" → الانتقال إلى /quiz → يعمل ✅
- Hover: hover:bg-[#c0841a]/90 → يعمل ✅

**Feature Cards / Values Cards:**
- Hover: hover:bg-[#c0841a]/50 → يعمل ✅
- لا يوجد onClick (عرض فقط)

**Stats Cards:**
- Hover: hover:shadow-xl → يعمل ✅
- لا يوجد onClick (عرض فقط)

**Testimonials:**
- Hover: hover:bg-[#c0841a]/50 → يعمل ✅
- لا يوجد onClick (عرض فقط)

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- لا توجد حالة Loading حالياً
- البيانات من content.json (static import)
- التحميل فوري (أقل من ثانية)
- لا يوجد spinner أو مؤشر تحميل
- الصفحة متاحة فوراً

**Empty (فارغ):**

- لا توجد حالة Empty حالياً
- البيانات من content.json (static)
- الصفحة تعرض دائماً نفس المحتوى (hero, sections, stats, testimonials, values, cta)

**Error (خطأ):**

- لا توجد حالة Error حالياً
- البيانات من content.json (static import)
- لا توجد رسائل خطأ أو error handling
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل

---

# Route: /faq
**النوع:** عام  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-[#F2F0EB] (min-h-screen)
- text-[#5B4233]
- direction: dir="rtl"
- container: mx-auto px-4 py-8 max-w-6xl

**Back Button (زر الرجوع):**
- التصميم: flex items-center gap-2 text-[#5B4233] mb-6 hover:text-[#c0841a] transition-colors
- الأيقونة: ArrowLeft (w-5 h-5)
- النص: "الرجوع للملف الشخصي"
- Link: href="/profile"

**Hero Section (القسم العلوي):**
- التصميم: bg-[#F2F0EB] py-12 px-6 text-center mb-8
- Animation: motion (initial: opacity 0 y 20, animate: opacity 1 y 0, duration: 0.6)
- **العنوان:**
  - النص: "الأسئلة الشائعة" (data.hero.title)
  - الحجم: text-[33.6px] font-bold mb-4 text-[#5B4233]
- **الوصف:**
  - النص: "كل ما تريد معرفته" (data.hero.subtitle)
  - الحجم: text-xl font-bold text-[#5B4233]/80

**Search Input (حقل البحث):**
- التصميم: mb-8
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay 0.1
- Container: relative max-w-2xl mx-auto
- **Input:**
  - type: "search"
  - Placeholder: "ابحث في الأسئلة..."
  - Styling: w-full pr-12 pl-4 py-3 rounded-3xl border border-[#5B4233]/20 bg-white/90 backdrop-blur-sm shadow-lg text-base text-[#5B4233] focus:ring-2 focus:ring-[#c0841a]/50
  - الأيقونة: Search (absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5B4233]/40)
  - Value: searchTerm (state)
  - onChange: setSearchTerm(e.target.value)

**Accordion Categories (أقسام Accordion):**
- Layout: space-y-8
- Motion: initial opacity 0 y 20, animate opacity 1 y 0, delay categoryIndex * 0.1
- **5 Categories (data.categories):**
  1. "أساسيات الاستخدام" (3 أسئلة)
  2. "🧪 الحساسية والأمان" (3 أسئلة)
  3. "🎯 الاختبار والنتائج" (1 سؤال)
  4. "🔐 التسجيل والخصوصية" (2 سؤال)
  5. "🌍 العطور والتوفر" (3 أسئلة)
- **كل Category:**
  - **عنوان Category:**
    - النص: {category.name}
    - الحجم: text-xl font-bold mb-4 text-[#5B4233]
  - **Accordion.Root:**
    - type: "single" collapsible
    - className: space-y-2
    - **Accordion.Items (لكل question):**
      - التصميم: bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl border border-[#5B4233]/20 mb-2 overflow-hidden
      - **Accordion.Trigger:**
        - Layout: w-full px-6 py-4 flex flex-row-reverse justify-between items-center text-base font-bold text-[#5B4233] hover:bg-[#c0841a]/50 transition-colors text-right
        - النص: {question.question}
        - الأيقونة: ChevronDown (w-5 h-5 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180)
      - **Accordion.Content:**
        - التصميم: px-6 pb-4 text-base text-[#5B4233]/80 overflow-hidden
        - Layout: py-2
        - النص: whitespace-pre-line (question.answer)

**No Results Message (لا توجد نتائج):**
- يظهر إذا filteredCategories.length === 0 && searchTerm
- التصميم: text-center py-12
- Motion: initial opacity 0, animate opacity 1
- النص: "لم يتم العثور على أسئلة تطابق \"{searchTerm}\""
- الحجم: text-base text-[#5B4233]/60

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Hero Section:**
   - نفس التصميم والأحجام (py-12 px-6)
   - العنوان: text-[33.6px] (نفس الحجم)
   - الوصف: text-xl (نفس الحجم)

2. **Search Input:**
   - Container: max-w-2xl mx-auto (نفس الحجم)
   - Input: w-full pr-12 pl-4 py-3 (نفس الحجم)
   - نفس التصميم والأحجام

3. **Accordion Categories:**
   - Layout: space-y-8 (نفس القيمة)
   - نفس التصميم والأحجام
   - Accordion Items: نفس التصميم (w-full px-6 py-4)

4. **No Results Message:**
   - نفس التصميم والأحجام

**الأحجام الجديدة:**
- لا يوجد تغيير في الأحجام (التصميم responsive بنفس الأحجام)

**Layout:**
- نفس التخطيط (space-y-8)
- جميع العناصر: w-full (عرض كامل على Mobile)

## التفاعلات - اختبار كل زر

**Back Button:**
- الضغط → Link href="/profile" → الانتقال إلى /profile → يعمل ✅
- Hover: hover:text-[#c0841a] → يعمل ✅

**Search Input:**
- الكتابة → setSearchTerm(e.target.value) → تحديث النتائج فوراً (client-side filtering) → يعمل ✅
- Filtering: filteredCategories (filter questions بناءً على searchTerm) → يعمل ✅
- Focus: focus:ring-2 focus:ring-[#c0841a]/50 → يعمل ✅

**Accordion Items:**
- الضغط على Accordion.Trigger → فتح/إغلاق Accordion.Content → يعمل ✅
- ChevronDown: data-[state=open]:rotate-180 → يعمل ✅
- Hover: hover:bg-[#c0841a]/50 → يعمل ✅
- type="single" collapsible → يمكن فتح سؤال واحد فقط في كل category → يعمل ✅

**No Results Message:**
- يظهر إذا filteredCategories.length === 0 && searchTerm → يعمل ✅
- يختفي عند مسح searchTerm → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- لا توجد حالة Loading حالياً
- البيانات من content.json (static import)
- التحميل فوري (أقل من ثانية)
- لا يوجد spinner أو مؤشر تحميل
- الصفحة متاحة فوراً

**Empty (فارغ):**

- **No Results (لا توجد نتائج بعد البحث):**
  - يظهر إذا filteredCategories.length === 0 && searchTerm
  - التصميم: text-center py-12
  - النص: "لم يتم العثور على أسئلة تطابق \"{searchTerm}\""
  - الحجم: text-base text-[#5B4233]/60
  - الموقع: في المنتصف
  - يختفي عند مسح searchTerm أو عند وجود نتائج

- **لا توجد حالة Empty قبل البحث:**
  - الصفحة تعرض دائماً 5 categories (data.categories)
  - لا توجد رسالة "لا توجد أسئلة" قبل البحث

**Error (خطأ):**

- لا توجد حالة Error حالياً
- البيانات من content.json (static import)
- لا توجد رسائل خطأ أو error handling
- لا توجد إعادة محاولة (retry) أو أزرار إعادة التحميل

---

# Route: /feedback
**النوع:** عام  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-[#F2F0EB] (min-h-screen)
- text-[#5B4233]
- direction: dir="rtl"
- padding: p-6
- container: max-w-2xl mx-auto

**Header (القسم العلوي):**
- Layout: text-center mb-12 space-y-6
- **العنوان:**
  - النص: "ساعدنا نكون أفضل لأجلك"
  - الحجم: text-3xl md:text-4xl font-bold text-[#5B4233] mb-3 leading-tight

**Done Count Badge (شارة الإنجاز):**
- التصميم: flex items-center justify-center gap-2 bg-gradient-to-r from-green-400/10 to-emerald-400/10 text-green-700 border-2 border-green-200/50 px-6 py-3 rounded-2xl w-fit mx-auto shadow-lg
- Animation: AnimatePresence + motion (initial: opacity 0 y 10, animate: opacity 1 y 0, exit: opacity 0 y -10, duration: 0.3)
- الأيقونة: CheckCircle (w-5 h-5)
- النص: 
  - إذا doneCount > 0: "بفضلكم.. {doneCount} فكرة منكم أصبحت واقعاً! 🏆"
  - إذا doneCount === 0: "لم ننفّذ اقتراحات بعد... كن الأول 💡"
- الحجم: text-lg font-bold

**Action Buttons (أزرار الإجراءات):**
- Layout: flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto
- **زر "وش ناقصنا؟ 💡":**
  - التصميم: Button size="lg" className="w-full sm:w-auto shadow-lg bg-[#c0841a] hover:bg-[#a0701a] text-white"
  - Action: setShowAddModal(true) → فتح FeedbackModal
- **زر "👤 Admin [📋]" (إذا isAdmin):**
  - التصميم: Button variant="outline" className="shadow-sm w-full sm:w-auto"
  - Tooltip: "لوحة المراجعة (للإدارة فقط)"
  - Action: setShowAdminModal(true) → فتح AdminModal
  - يظهر إذا (session?.user as any)?.role === 'admin'

**Suggestions List (قائمة الاقتراحات):**
- Layout: space-y-4
- **Empty State (إذا suggestions.length === 0):**
  - التصميم: text-center py-12 text-[#5B4233]/60
  - Motion: initial opacity 0, animate opacity 1
  - النص: "لا توجد اقتراحات حالياً. كن أول من يقترح تحسينًا!"
- **Suggestions Cards (إذا suggestions.length > 0):**
  - كل Card: FeedbackCard component
  - Layout: suggestions.map((suggestion, index) => <FeedbackCard ... />)
  - isTopVoted: index === 0 && suggestion.votes > 0
  - onVote: handleVoteUpdate

**FeedbackCard (كارت الاقتراح):**
- **Top Voted Badge (إذا isTopVoted):**
  - التصميم: flex items-center gap-2 mb-4 bg-gradient-to-r from-orange-400/20 to-red-400/20 border-2 border-orange-300/50 text-orange-800 px-4 py-2 rounded-xl shadow-lg w-fit
  - الأيقونة: Flame (w-4 h-4)
  - النص: "الأكثر طلباً" - font-bold text-sm
  - Motion: initial scale 0.95 opacity 0, animate scale 1 opacity 1, duration 0.3
- **My Suggestion Highlight (إذا isMyInProgress):**
  - التصميم: mb-4 flex items-center gap-2 bg-gradient-to-r from-amber-400/25 via-orange-400/25 to-amber-400/25 text-amber-800 border-2 border-amber-300/60 px-4 py-2.5 rounded-xl shadow-lg w-fit mx-auto
  - الأيقونة: Sparkles (w-4 h-4)
  - النص: "فكرتك تحت التنفيذ، شكراً لمشاركتنا!" - text-sm font-bold
  - Motion: initial scale 0.9 opacity 0, animate scale 1 opacity 1, delay 0.1
- **Card Content:**
  - التصميم: p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
  - إذا isMyInProgress: ring-4 ring-amber-400/30 bg-gradient-to-br from-amber-50/80 to-orange-50/60 shadow-2xl border-2 border-amber-400
  - إذا لا: border-[#5B4233]/10 bg-white shadow-sm
  - **Title + Status Badge:**
    - Layout: flex items-start justify-between gap-3
    - العنوان: text-lg font-bold text-[#5B4233] leading-tight flex-1 (suggestion.title)
    - Status Badge: px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap
      - done: bg-green-50 text-green-700 border-green-200 - "تم الإنجاز ✅"
      - in_progress: bg-blue-50 text-blue-700 border-blue-200 - "شغالين عليها حالياً 🛠️"
      - planned: bg-purple-50 text-purple-700 border-purple-200 - "قادمة قريباً 🚀"
      - under_review: bg-yellow-50 text-yellow-700 border-yellow-200 - "قيد المراجعة ⏳"
  - **Description:**
    - النص: text-[#5B4233]/70 text-sm leading-relaxed (suggestion.description)
  - **Vote Section:**
    - Layout: flex items-center justify-between pt-3 border-t border-[#5B4233]/10
    - Vote Count: flex items-center gap-2
      - الأيقونة: text-2xl font-bold text-[#5B4233] "↑"
      - النص: text-sm font-semibold text-[#5B4233]/80 "{suggestion.votes} مهتم"
    - Vote Button:
      - النص: "أتفق 👍" (إذا !isVoting) أو "جاري..." (إذا isVoting)
      - التصميم: px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300
      - إذا hasVoted: bg-[#c0841a] text-white hover:bg-[#a0701a] shadow-md
      - إذا !hasVoted: bg-[#c0841a]/10 text-[#c0841a] hover:bg-[#c0841a]/20 border border-[#c0841a]/30
      - Disabled: disabled={isVoting}
      - Action: handleVote → API call → toast.success/error

**Modals:**

**FeedbackModal (إذا showAddModal):**
- التصميم: fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm
- Motion: initial opacity 0 scale 0.9 y 20, animate opacity 1 scale 1 y 0, exit opacity 0 scale 0.9 y 20
- Content: bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative dir="rtl"
- **Header:**
  - التصميم: bg-gradient-to-r from-[#c0841a] to-[#a0701a] p-6 text-white relative
  - Close Button: absolute left-4 top-4 p-2 hover:bg-white/20 rounded-full transition-colors (X icon)
  - العنوان: "وش ناقصنا؟" - text-2xl font-bold
  - الأيقونة: Lightbulb (w-6 h-6) في bg-white/20 p-2 rounded-xl
  - الوصف: "اقتراحك اليوم قد يكون ميزة نستخدمها جميعاً غداً. شاركنا أفكارك!" - text-white/80 text-sm
- **Form:**
  - Layout: p-6 space-y-6
  - **Title Input:**
    - Label: "عنوان الاقتراح" - text-sm font-bold text-[#5B4233] flex items-center gap-2
    - Input: type="text" placeholder="مثلاً: إضافة فلتر للعائلات العطرية" required
    - Styling: w-full px-4 py-3 rounded-xl border border-[#5B4233]/10 focus:border-[#c0841a] focus:ring-2 focus:ring-[#c0841a]/20
  - **Category Selector:**
    - Label: "التصنيف" - text-sm font-bold text-[#5B4233] flex items-center gap-2
    - Layout: flex flex-wrap gap-2
    - **5 Categories:**
      1. "🧪 اختبار العطور" (quiz)
      2. "🎯 خوارزمية التطابق" (matching)
      3. "✨ قاعدة البيانات" (perfumes)
      4. "🎨 واجهة المستخدم" (ui)
      5. "💡 اقتراح آخر" (other)
    - Active: bg-[#c0841a] text-white border-[#c0841a] shadow-md
    - Inactive: bg-white text-[#5B4233]/70 border-[#5B4233]/10 hover:border-[#c0841a]/30
  - **Description Textarea:**
    - Label: "اشرح لنا أكثر" - text-sm font-bold text-[#5B4233] flex items-center gap-2
    - Textarea: placeholder="كيف يمكن لهذه الميزة أن تحسن تجربتك في Ask Seba?" rows={4} required
    - Styling: w-full px-4 py-3 rounded-xl border border-[#5B4233]/10 focus:border-[#c0841a] focus:ring-2 focus:ring-[#c0841a]/20 resize-none
  - **Submit Button:**
    - النص: "إرسال الاقتراح" (إذا !isSubmitting) أو Loading spinner (إذا isSubmitting)
    - التصميم: w-full py-6 rounded-2xl bg-[#c0841a] hover:bg-[#a0701a] text-white font-bold text-lg shadow-xl shadow-[#c0841a]/20
    - الأيقونة: Send (w-5 h-5) إذا !isSubmitting
    - Disabled: disabled={isSubmitting || !title.trim() || !description.trim()}
- **Footer Note:**
  - النص: "بإرسالك لهذا الاقتراح، فإنك توافق على أن يتم مراجعته ونشره للعامة للتصويت عليه." - text-[10px] text-[#5B4233]/40
  - الموقع: px-6 pb-6 text-center

**AdminModal (إذا showAdminModal && isAdmin):**
- التصميم: fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4
- Content: bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto dir="rtl"
- العنوان: "لوحة إدارة الاقتراحات" - text-2xl font-bold text-[#5B4233] mb-6
- Loading: text-center py-8 text-[#5B4233]/60 "جاري التحميل..." (إذا loading)
- Pending Suggestions: List of pending suggestions with Approve/Reject buttons

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Header:**
   - العنوان: text-3xl على Mobile (بدلاً من md:text-4xl = 36px على Desktop)
   - نفس التصميم والألوان

2. **Done Count Badge:**
   - نفس التصميم والأحجام (w-fit mx-auto)
   - نفس Animation

3. **Action Buttons:**
   - Layout: flex-col على Mobile (عمودي)
   - Desktop: sm:flex-row (صف واحد)
   - زر "وش ناقصنا؟": w-full على Mobile / sm:w-auto على Desktop
   - زر "Admin": w-full على Mobile / sm:w-auto على Desktop

4. **Suggestions List:**
   - Layout: space-y-4 (نفس القيمة)
   - نفس التصميم والأحجام

5. **FeedbackCard:**
   - نفس التصميم والأحجام (p-6 rounded-2xl)
   - Layout: space-y-3 (نفس القيمة)

6. **FeedbackModal:**
   - Container: p-4 (نفس الحجم)
   - Content: max-w-lg (نفس الحجم)
   - Form: p-6 space-y-6 (نفس الحجم)

7. **AdminModal:**
   - Container: p-4 (نفس الحجم)
   - Content: max-w-2xl (نفس الحجم)

**الأحجام الجديدة:**
- Header Title: text-3xl (30px) على Mobile
- Action Buttons: flex-col (عمودي) على Mobile
- Action Buttons: w-full على Mobile

**Layout:**
- Action Buttons: flex-col (عمودي) على Mobile
- Action Buttons: w-full (عرض كامل) على Mobile

## التفاعلات - اختبار كل زر

**Action Buttons:**

- **زر "وش ناقصنا؟ 💡":**
  - الضغط → setShowAddModal(true) → فتح FeedbackModal → يعمل ✅
  - Hover: hover:bg-[#a0701a] → يعمل ✅

- **زر "👤 Admin [📋]" (إذا isAdmin):**
  - الضغط → setShowAdminModal(true) → فتح AdminModal → يعمل ✅
  - Tooltip: "لوحة المراجعة (للإدارة فقط)" → يعمل ✅
  - يظهر فقط إذا (session?.user as any)?.role === 'admin' → يعمل ✅

**FeedbackModal:**

- **Close Button (X):**
  - الضغط → onClose() → setShowAddModal(false) → إغلاق Modal → يعمل ✅

- **Category Selector:**
  - الضغط على أي category → setCategory(cat.id) → تحديث الحالة → يعمل ✅
  - Active State: bg-[#c0841a] text-white → يعمل ✅
  - Inactive State: bg-white text-[#5B4233]/70 → يعمل ✅

- **Title Input:**
  - الكتابة → setTitle(e.target.value) → يعمل ✅
  - Required validation → يعمل ✅

- **Description Textarea:**
  - الكتابة → setDescription(e.target.value) → يعمل ✅
  - Required validation → يعمل ✅

- **Submit Button:**
  - الضغط → handleSubmit → onSubmit(title, description, category) → API call → يعمل ✅
  - Loading: isSubmitting === true → Loading spinner → يعمل ✅
  - Disabled: disabled={isSubmitting || !title.trim() || !description.trim()} → يعمل ✅
  - Success: toast.success('تم إرسال اقتراحك بنجاح! سيتم مراجعته قريباً 🎉') → setShowAddModal(false) → fetchSuggestions() → يعمل ✅
  - Error: toast.error('واجهنا مشكلة في حفظ اقتراحك' أو 'تأكد من اتصالك بالإنترنت') → يعمل ✅

**FeedbackCard:**

- **Vote Button:**
  - الضغط → handleVote → API call POST `/api/feedback/suggestions/${id}/vote` → يعمل ✅
  - Loading: isVoting === true → "جاري..." → يعمل ✅
  - Success: toast.success('تسلم! صوتك وصل وبيصنع فرق ❤️') → onVote({ votes, hasVoted, suggestionId }) → handleVoteUpdate → تحديث suggestions → يعمل ✅
  - Error: toast.error('المعذرة، واجهنا مشكلة بسيطة.. جرب تصوّت مرة ثانية' أو 'ودنا نسمع صوتك! تأكد من اتصالك بالإنترنت') → يعمل ✅
  - Disabled: disabled={isVoting} → يعمل ✅
  - Active State: bg-[#c0841a] text-white إذا hasVoted → يعمل ✅
  - Inactive State: bg-[#c0841a]/10 text-[#c0841a] إذا !hasVoted → يعمل ✅

**AdminModal:**

- **Approve/Reject Buttons:**
  - Approve → API call POST `/api/admin/suggestions/${id}/approve` → toast.success('تمت الموافقة على الاقتراح ✅') → onRefresh() → يعمل ✅
  - Reject → API call POST `/api/admin/suggestions/${id}/reject` → toast.success('تم رفض الاقتراح') → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Page Loading (عند تحميل الجلسة أو fetchSuggestions):**
  - يظهر إذا status === 'loading' || loading === true
  - التصميم: min-h-screen bg-[#F2F0EB] flex items-center justify-center
  - النص: "جاري التحميل..." - text-[#5B4233] text-xl
  - الموقع: text-center
  - يختفي بعد fetchSuggestions complete

- **Vote Loading (في FeedbackCard):**
  - isVoting === true → "جاري..." في Vote Button
  - الزر معطل (disabled={isVoting})
  - يختفي بعد vote complete

- **Submit Loading (في FeedbackModal):**
  - isSubmitting === true → Loading spinner في Submit Button
  - الزر معطل (disabled={isSubmitting || !title.trim() || !description.trim()})
  - يختفي بعد submit complete

**Empty (فارغ):**

- **Empty State (لا توجد اقتراحات):**
  - يظهر إذا suggestions.length === 0 (بعد fetchSuggestions)
  - التصميم: text-center py-12 text-[#5B4233]/60
  - Motion: initial opacity 0, animate opacity 1
  - النص: "لا توجد اقتراحات حالياً. كن أول من يقترح تحسينًا!"
  - الموقع: في Suggestions List
  - لا يوجد CTA (يمكن للمستخدم الضغط على "وش ناقصنا؟" لإضافة اقتراح)

**Error (خطأ):**

- **Error Toast (fetchSuggestions failed):**
  - يظهر إذا fetchSuggestions failed
  - toast.error('واجهنا مشكلة في تحميل الاقتراحات' أو 'تأكد من اتصالك بالإنترنت')
  - الموقع: Toast notification (sonner)
  - لا يوجد error state في الصفحة (البيانات تبقى [])

- **Error Toast (vote failed):**
  - يظهر إذا vote failed
  - toast.error('المعذرة، واجهنا مشكلة بسيطة.. جرب تصوّت مرة ثانية' أو 'ودنا نسمع صوتك! تأكد من اتصالك بالإنترنت')
  - الموقع: Toast notification (sonner)

- **Error Toast (submit failed):**
  - يظهر إذا handleAddSuggestion failed
  - toast.error('واجهنا مشكلة في حفظ اقتراحك' أو 'تأكد من اتصالك بالإنترنت')
  - الموقع: Toast notification (sonner)

**Guest Redirect:**

- **Redirect (إذا unauthenticated):**
  - يحدث في useEffect إذا status === 'unauthenticated'
  - Action: router.push('/login')
  - لا توجد رسالة للمستخدم (redirect مباشر)

---

# Route: /settings
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-cream-bg/50 (min-h-screen)
- direction: dir="rtl"
- container: max-w-4xl mx-auto px-4 py-12

**Header (القسم العلوي):**
- Layout: mb-8
- **العنوان:**
  - النص: "الإعدادات"
  - الحجم: text-4xl md:text-5xl (36px على Desktop)
  - اللون: text-brown-text (#5B4233)
  - الوزن: font-bold
  - Layout: flex items-center gap-3
  - الأيقونة: Settings (w-8 h-8)
  - Margin-bottom: mb-4 (16px)
- **الوصف:**
  - النص: "إدارة إعدادات حسابك وتفضيلاتك"
  - الحجم: text-lg (18px)
  - اللون: text-brown-text/70

**Settings Sections (قائمة الإعدادات):**
- Layout: space-y-4
- **4 بطاقات (Settings Sections):**
  1. **"الملف الشخصي":**
     - الأيقونة: User (w-5 h-5 text-brown-text)
     - العنوان: "الملف الشخصي" - text-xl font-bold text-brown-text mb-1
     - الوصف: "إدارة معلوماتك الشخصية" - text-sm text-brown-text/60
     - href: /profile
  2. **"الإشعارات":**
     - الأيقونة: Bell (w-5 h-5 text-brown-text)
     - العنوان: "الإشعارات" - text-xl font-bold text-brown-text mb-1
     - الوصف: "التحكم في الإشعارات" - text-sm text-brown-text/60
     - href: #
  3. **"اللغة":**
     - الأيقونة: Globe (w-5 h-5 text-brown-text)
     - العنوان: "اللغة" - text-xl font-bold text-brown-text mb-1
     - الوصف: "اختر لغة الواجهة" - text-sm text-brown-text/60
     - href: #
  4. **"الخصوصية والأمان":**
     - الأيقونة: Shield (w-5 h-5 text-brown-text)
     - العنوان: "الخصوصية والأمان" - text-xl font-bold text-brown-text mb-1
     - الوصف: "إعدادات الخصوصية" - text-sm text-brown-text/60
     - href: /privacy

**تصميم البطاقة (Card):**
- Layout: block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-brown-text/5 hover:border-primary/30
- Content Layout: flex items-start gap-4
- الأيقونة: flex-shrink-0 mt-1
- المحتوى: flex-1

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Header:**
   - العنوان: text-4xl على Mobile (36px) / md:text-5xl على Desktop (48px)
   - نفس التصميم والألوان

2. **Settings Sections:**
   - Layout: space-y-4 (نفس القيمة)
   - نفس التصميم والأحجام (p-6 rounded-2xl)
   - Layout: flex items-start gap-4 (نفس القيمة)

**الأحجام:**
- Header Title: text-4xl (36px) على Mobile / md:text-5xl (48px) على Desktop

**Layout:**
- Settings Sections: space-y-4 (نفس القيمة على جميع الأحجام)
- Card Layout: flex items-start gap-4 (نفس القيمة على جميع الأحجام)

## التفاعلات - اختبار كل زر

**Settings Sections (بطاقات الإعدادات):**

- **بطاقة "الملف الشخصي":**
  - الضغط → href="/profile" → الانتقال إلى /profile → يعمل ✅
  - Hover: hover:shadow-md hover:border-primary/30 → يعمل ✅

- **بطاقة "الإشعارات":**
  - الضغط → href="#" → لا يحدث شيء (غير مطبّق بعد) → يعمل ✅
  - Hover: hover:shadow-md hover:border-primary/30 → يعمل ✅

- **بطاقة "اللغة":**
  - الضغط → href="#" → لا يحدث شيء (غير مطبّق بعد) → يعمل ✅
  - Hover: hover:shadow-md hover:border-primary/30 → يعمل ✅

- **بطاقة "الخصوصية والأمان":**
  - الضغط → href="/privacy" → الانتقال إلى /privacy → يعمل ✅
  - Hover: hover:shadow-md hover:border-primary/30 → يعمل ✅

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Loading (عند التحقق من الجلسة):**
  - يظهر إذا status === 'loading' أو !session
  - التصميم: min-h-screen bg-cream-bg/50 flex items-center justify-center
  - LoadingSpinner: message="جاري التحميل..."
  - الموقع: text-center
  - يختفي بعد تحميل الجلسة

- **Redirect Loading (عند عدم المصادقة):**
  - يظهر إذا status === 'unauthenticated'
  - التصميم: min-h-screen bg-cream-bg/50 flex items-center justify-center
  - LoadingSpinner: message="جاري التحويل..."
  - Action: router.push('/login?callbackUrl=/settings')
  - الموقع: text-center

**Empty (فارغ):**
- (لا توجد حالات Empty - الصفحة تحتوي دائماً على 4 بطاقات ثابتة)

**Error (خطأ):**
- (لا توجد حالات Error - الصفحة بسيطة بدون API calls)

---

# Route: /notifications
**النوع:** محمي  
**موجود في Audit الحالي:** لا  
**الحالة:** موثق كامل  

## Desktop View - ماذا أرى بالضبط

**الخلفية:**
- bg-cream-bg/50 (min-h-screen)
- direction: dir="rtl"
- container: max-w-4xl mx-auto px-4 py-12

**Header (القسم العلوي):**
- Layout: mb-8
- **العنوان:**
  - النص: "الإشعارات"
  - الحجم: text-4xl md:text-5xl (36px على Desktop)
  - اللون: text-brown-text (#5B4233)
  - الوزن: font-bold
  - Layout: flex items-center gap-3
  - الأيقونة: Bell (w-8 h-8)
  - Margin-bottom: mb-4 (16px)
- **الوصف:**
  - النص: "عرض جميع إشعاراتك والتحديثات"
  - الحجم: text-lg (18px)
  - اللون: text-brown-text/70

**Notifications List (قائمة الإشعارات):**
- Layout: space-y-4
- **Empty State (عند عدم وجود إشعارات):**
  - Layout: bg-white rounded-2xl p-12 shadow-sm border-2 border-brown-text/5 text-center
  - الأيقونة: Bell (w-16 h-16 text-brown-text/30 mx-auto mb-4)
  - العنوان: "لا توجد إشعارات" - text-xl font-bold text-brown-text mb-2
  - الوصف: "لم تصلك أي إشعارات بعد. سيظهر هنا أي تحديثات جديدة." - text-brown-text/60
- **Notification Card (عند وجود إشعارات):**
  - Layout: bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-brown-text/5 hover:border-primary/30
  - Content Layout: flex items-start gap-4
  - الأيقونة: flex-shrink-0 mt-1
    - CheckCircle2 (w-5 h-5 text-green-600) للـ type: 'success'
    - Info (w-5 h-5 text-blue-600) للـ type: 'info'
    - Clock (w-5 h-5 text-yellow-600) للـ type: 'pending'
  - المحتوى: flex-1
    - العنوان: text-xl font-bold text-brown-text mb-1
    - الرسالة: text-sm text-brown-text/60 mb-2
    - التاريخ: text-xs text-brown-text/40

## Mobile View - ماذا أرى بالضبط

**التغييرات الملاحظة:**

1. **Header:**
   - العنوان: text-4xl على Mobile (36px) / md:text-5xl على Desktop (48px)
   - نفس التصميم والألوان

2. **Notifications List:**
   - Layout: space-y-4 (نفس القيمة)
   - Empty State: نفس التصميم والأحجام (p-12 rounded-2xl)
   - Notification Card: نفس التصميم والأحجام (p-6 rounded-2xl)
   - Layout: flex items-start gap-4 (نفس القيمة)

**الأحجام:**
- Header Title: text-4xl (36px) على Mobile / md:text-5xl (48px) على Desktop

**Layout:**
- Notifications List: space-y-4 (نفس القيمة على جميع الأحجام)
- Card Layout: flex items-start gap-4 (نفس القيمة على جميع الأحجام)

## التفاعلات - اختبار كل زر

**Notifications List (قائمة الإشعارات):**

- **Notification Card (بطاقة الإشعار):**
  - Hover: hover:shadow-md hover:border-primary/30 → يعمل ✅
  - (لا يوجد زر ضغط - البطاقة للعرض فقط في النسخة الحالية)

## الحالات (Loading/Empty/Error)

**Loading (التحميل):**

- **Loading (عند التحقق من الجلسة):**
  - يظهر إذا status === 'loading' أو !session
  - التصميم: min-h-screen bg-cream-bg/50 flex items-center justify-center
  - LoadingSpinner: message="جاري التحميل..."
  - الموقع: text-center
  - يختفي بعد تحميل الجلسة

- **Redirect Loading (عند عدم المصادقة):**
  - يظهر إذا status === 'unauthenticated'
  - التصميم: min-h-screen bg-cream-bg/50 flex items-center justify-center
  - LoadingSpinner: message="جاري التحويل..."
  - Action: router.push('/login?callbackUrl=/notifications')
  - الموقع: text-center

**Empty (فارغ):**
- **Empty State (عند عدم وجود إشعارات):**
  - يظهر إذا notifications.length === 0
  - التصميم: bg-white rounded-2xl p-12 shadow-sm border-2 border-brown-text/5 text-center
  - الأيقونة: Bell (w-16 h-16 text-brown-text/30)
  - العنوان: "لا توجد إشعارات"
  - الوصف: "لم تصلك أي إشعارات بعد. سيظهر هنا أي تحديثات جديدة."

**Error (خطأ):**
- (لا توجد حالات Error - الصفحة بسيطة بدون API calls في النسخة الحالية)
