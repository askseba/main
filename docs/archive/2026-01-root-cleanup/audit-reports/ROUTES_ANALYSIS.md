# تحليل Routes - تصنيف وترتيب

## 1. Routes النهائية (مصنفة في 5 مجموعات)

### عامة (Public)
- `/`
- `/about`
- `/faq`
- `/privacy`
- `/feedback`

### محمية (Protected)
- `/login`
- `/register`
- `/dashboard`
- `/profile`
- `/settings`
- `/results`
- `/quiz`
- `/quiz/step1-favorites`
- `/quiz/step2-disliked`
- `/quiz/step3-allergy`
- `/perfume/[id]`

### اختبار (Test)
- (لا توجد routes للاختبار في القائمة الحالية)

### ديناميكية (Dynamic)
- `/perfume/[id]`
- `/quiz/step1-favorites`
- `/quiz/step2-disliked`
- `/quiz/step3-allergy`

### API
- `/api/auth/[...nextauth]`
- `/api/avatar`
- `/api/feedback/suggestions`
- `/api/feedback/suggestions/[id]/vote`
- `/api/match`
- `/api/perfumes/search`
- `/api/results/favorites`
- `/api/user/favorites`

---

## 2. Pages To Document (صفحات فقط - بدون API)

### Happy Path (مسار المستخدم الأساسي)
- `/`
- `/quiz`
- `/quiz/step1-favorites`
- `/quiz/step2-disliked`
- `/quiz/step3-allergy`
- `/results`
- `/perfume/[id]`

### المصادقة والجلسة
- `/login`
- `/register`
- `/dashboard`
- `/profile`
- `/settings`
- `/notifications`

### صفحات الثقة والمعلومات
- `/privacy`
- `/about`
- `/faq`
- `/feedback`
