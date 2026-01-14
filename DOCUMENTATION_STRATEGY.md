# 📋 استراتيجية التوثيق والحفاظ على 100% تغطية

**آخر تحديث:** 2026-01-14  
**الحالة:** تغطية 100% — موثق 13 كامل + 2 جزئي من 15 صفحة

---

## 1️⃣ أولويات ميزات جديدة

بناءً على النواقص الجزئية الحالية (`/quiz/step2-disliked` و `/quiz/step3-allergy`) وRoute Inventory:

### الأولوية 1: إكمال التوثيق الجزئي (تحسين)

**الصفحات الجزئية الحالية:**
- `/quiz/step2-disliked`: Desktop View موثق بشكل مختصر (ملخص)، يحتاج تفاصيل كاملة مثل `/quiz/step1-favorites`
- `/quiz/step3-allergy`: Desktop View موثق بشكل مختصر (ملخص)، يحتاج تفاصيل كاملة

**المهام المقترحة:**
1. إكمال Desktop View لـ `/quiz/step2-disliked` (تفاصيل كاملة)
2. إكمال Desktop View لـ `/quiz/step3-allergy` (تفاصيل كاملة)
3. تحديث `**الحالة:**` من "موثق جزئي" إلى "موثق كامل"

**الأولوية:** منخفضة (الصفحات موثقة بشكل جيد بالفعل، لكن يمكن تحسين التفاصيل)

### الأولوية 2: ميزات جديدة محتملة (بناءً على Route Inventory)

**صفحات محتملة للإضافة:**
- `/settings` (إعدادات المستخدم)
- `/notifications` (الإشعارات)
- `/history` (سجل الاختبارات السابقة)
- `/compare` (مقارنة عطور)
- `/wishlist` (قائمة الرغبات - حالياً في dashboard)

**قاعدة عامة:**
- أي صفحة جديدة يجب توثيقها فوراً عند الإضافة
- يجب اتباع Workflow الموثق أدناه

---

## 2️⃣ Workflow لإضافة صفحة جديدة آمنة

### الخطوات الإلزامية:

#### **الخطوة 1: إنشاء Route جديد**
```bash
# مثال: إضافة صفحة جديدة /settings
src/app/settings/page.tsx
```

#### **الخطوة 2: إضافة Route إلى ROUTES_ANALYSIS.md**
```markdown
### فئة المناسبة (محمي/عام)
- /settings
```

#### **الخطوة 3: إضافة Route إلى APP_VISUAL_SOURCE_OF_TRUTH.md**
```markdown
# Route: /settings
**النوع:** محمي
**موجود في Audit الحالي:** لا
**الحالة:** غير موثق

## Desktop View - ماذا أرى بالضبط
- غير موثق بعد

## Mobile View - ماذا أرى بالضبط
- غير موثق بعد

## التفاعلات - اختبار كل زر
- غير موثق بعد

## الحالات (Loading/Empty/Error)
- غير موثق بعد
```

#### **الخطوة 4: توثيق الصفحة فوراً (قبل Merge)**
1. Desktop View: وصف كامل للعناصر والتصميم
2. Mobile View: F12 iPhone 12 Pro + وصف التغييرات
3. التفاعلات: اختبار كل زر/رابط/تفاعل
4. الحالات: Loading/Empty/Error states

#### **الخطوة 5: تحديث الحالة إلى "موثق كامل"**
```markdown
**الحالة:** موثق كامل
```

#### **الخطوة 6: التحديث التلقائي للملفات**
```bash
# أعد إنشاء DOCUMENTATION_GAPS_AND_FIXES.md
# أعد إنشاء APP_AUDIT_MASTER.md
```

### Checklist قبل Merge:

- [ ] Route جديد موجود في `src/app/[route]/page.tsx`
- [ ] Route مضاف إلى `ROUTES_ANALYSIS.md`
- [ ] Route مضاف إلى `APP_VISUAL_SOURCE_OF_TRUTH.md` (مع توثيق كامل)
- [ ] Desktop View موثق بشكل كامل
- [ ] Mobile View موثق بشكل كامل
- [ ] التفاعلات موثقة بشكل كامل
- [ ] الحالات (Loading/Empty/Error) موثقة
- [ ] `**الحالة:**` = "موثق كامل"
- [ ] `DOCUMENTATION_GAPS_AND_FIXES.md` محدث
- [ ] `APP_AUDIT_MASTER.md` محدث
- [ ] التغطية = 100% (أو تم توثيق الصفحة الجديدة)

---

## 3️⃣ Commit Strategy مع النظام

### قاعدة Commit Messages:

```
feat(route): add /settings page with full documentation

- Add /settings page (user preferences)
- Document Desktop View (settings form, avatar upload)
- Document Mobile View (responsive layout)
- Document Interactions (form submit, toggle switches)
- Document States (Loading/Empty/Error)
- Update APP_VISUAL_SOURCE_OF_TRUTH.md
- Update DOCUMENTATION_GAPS_AND_FIXES.md
- Update APP_AUDIT_MASTER.md
- Maintain 100% documentation coverage
```

### Commit Structure:

1. **Type:** `feat`, `fix`, `docs`, `refactor`, `chore`
2. **Scope:** `route`, `component`, `api`, `docs`
3. **Description:** وصف واضح للعمل
4. **Body (اختياري):** تفاصيل إضافية
5. **Footer (اختياري):** روابط Issues أو Breaking Changes

### Pre-commit Hook (مقترح):

يمكن إضافة pre-commit hook للتحقق من التوثيق:

```bash
# .husky/pre-commit
#!/bin/sh

# Check if new routes exist without documentation
NEW_ROUTES=$(git diff --cached --name-only --diff-filter=A | grep "src/app/.*/page.tsx")

if [ ! -z "$NEW_ROUTES" ]; then
  echo "⚠️  New routes detected. Please ensure:"
  echo "   1. Route added to APP_VISUAL_SOURCE_OF_TRUTH.md"
  echo "   2. Route documented (Desktop/Mobile/Interactions/States)"
  echo "   3. DOCUMENTATION_GAPS_AND_FIXES.md updated"
  echo "   4. APP_AUDIT_MASTER.md updated"
  read -p "Continue commit? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
```

### Setup Husky (إذا لم يكن موجوداً):

```bash
# Install husky
npm install --save-dev husky

# Initialize husky
npx husky init

# Create pre-commit hook
echo "#!/bin/sh
. \"\$(dirname \"\$0\")/_/husky.sh\"
# Add your pre-commit checks here" > .husky/pre-commit

chmod +x .husky/pre-commit
```

---

## 4️⃣ كيفية الحفاظ على 100% تغطية مع التوسّع

### القواعد الأساسية:

#### **قاعدة 1: لا Route جديد بدون توثيق**
- ❌ ممنوع: إضافة صفحة جديدة بدون توثيق
- ✅ مسموح: إضافة صفحة جديدة مع توثيق كامل

#### **قاعدة 2: التوثيق جزء من PR**
- يجب أن يكون التوثيق جزءاً من Pull Request
- Reviewer يتحقق من التوثيق قبل Merge
- لا يتم Merge إلا بعد التأكد من التوثيق الكامل

#### **قاعدة 3: التحديث التلقائي بعد كل تغيير**
- بعد أي تحديث على Route، يجب تحديث التوثيق
- بعد إضافة Route جديد، يجب تحديث الملفات الثلاثة:
  - `APP_VISUAL_SOURCE_OF_TRUTH.md`
  - `DOCUMENTATION_GAPS_AND_FIXES.md`
  - `APP_AUDIT_MASTER.md`

#### **قاعدة 4: المراجعة الدورية**
- مراجعة شهرية للتغطية
- التحقق من أن جميع Routes موثقة
- تحديث التوثيق إذا تغيرت الصفحات

### Workflow للحفاظ على التغطية:

```
New Route Created
    ↓
Add to APP_VISUAL_SOURCE_OF_TRUTH.md (un documented)
    ↓
Document: Desktop View + Mobile View + Interactions + States
    ↓
Update status to "موثق كامل"
    ↓
Update DOCUMENTATION_GAPS_AND_FIXES.md
    ↓
Update APP_AUDIT_MASTER.md
    ↓
Verify: Coverage = 100%
    ↓
Commit with proper message
    ↓
PR Review (check documentation)
    ↓
Merge ✅
```

### Monitoring Script (مقترح):

يمكن إنشاء script للتحقق من التغطية:

```bash
#!/bin/bash
# scripts/check-documentation-coverage.sh

TOTAL_ROUTES=15
DOCUMENTED=$(grep -c "**الحالة:** موثق كامل" APP_VISUAL_SOURCE_OF_TRUTH.md)
PARTIAL=$(grep -c "**الحالة:** موثق جزئي" APP_VISUAL_SOURCE_OF_TRUTH.md)
UNDOCUMENTED=$(grep -c "**الحالة:** غير موثق" APP_VISUAL_SOURCE_OF_TRUTH.md)

COVERAGE=$(( ($DOCUMENTED + $PARTIAL) * 100 / $TOTAL_ROUTES ))

echo "📊 Documentation Coverage: ${COVERAGE}%"
echo "✅ Fully Documented: $DOCUMENTED"
echo "⚠️  Partially Documented: $PARTIAL"
echo "❌ Undocumented: $UNDOCUMENTED"

if [ $UNDOCUMENTED -gt 0 ]; then
  echo "⚠️  WARNING: $UNDOCUMENTED routes are undocumented!"
  exit 1
fi

exit 0
```

### GitHub Actions (مقترح):

```yaml
# .github/workflows/documentation-check.yml
name: Documentation Coverage Check

on:
  pull_request:
    paths:
      - 'src/app/**/page.tsx'
      - 'APP_VISUAL_SOURCE_OF_TRUTH.md'

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check Documentation Coverage
        run: |
          bash scripts/check-documentation-coverage.sh
```

---

## 📝 ملاحظات مهمة

### ما يجب توثيقه لكل Route:

1. **Desktop View:** وصف كامل للعناصر والتصميم والأحجام
2. **Mobile View:** F12 iPhone 12 Pro + وصف التغييرات
3. **التفاعلات:** اختبار كل زر/رابط/تفاعل
4. **الحالات:** Loading/Empty/Error states

### ما لا يجب توثيقه:

- API Routes (موثقة في `docs/API.md`)
- Internal components (مكونات داخلية)
- Test routes (صفحات اختبار)

### استثناءات:

- Routes مؤقتة أو تجريبية يمكن تخطيها (بشرط توثيق السبب)
- Routes deprecated يمكن إزالتها من التوثيق (بعد إزالتها من الكود)

---

**آخر تحديث:** 2026-01-14 03:29:00  
**المسؤول:** Auto
