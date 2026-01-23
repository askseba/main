# المرحلة الثالثة - Value Ladder System

## 📦 الملفات المرفقة (15 ملف):

### 1️⃣ للاستبدال (2 ملف):
- `schema.prisma` → `App Files/prisma/schema.prisma` (⚠️ استبدال كامل)
- `match-route.ts` → `App Files/src/app/api/match/route.ts` (استبدال)

### 2️⃣ للإضافة - Backend (2 ملف):
- `gating.ts` → `App Files/src/lib/gating.ts`
- `price-alerts-route.ts` → `App Files/src/app/api/price-alerts/route.ts`

### 3️⃣ للإضافة - Components (7 ملفات):
- `BlurredTeaserCard.tsx` → `App Files/src/components/ui/BlurredTeaserCard.tsx`
- `UpsellCard.tsx` → `App Files/src/components/ui/UpsellCard.tsx`
- `PriceComparisonTable.tsx` → `App Files/src/components/ui/PriceComparisonTable.tsx`
- `PriceAlertButton.tsx` → `App Files/src/components/ui/PriceAlertButton.tsx`
- `ResultsGrid.tsx` → دمج مع `App Files/src/app/results/page.tsx`
- `TestHistory.tsx` → `App Files/src/components/dashboard/TestHistory.tsx`
- `PricingPage.tsx` → `App Files/src/app/pricing/page.tsx`

### 4️⃣ للإضافة - Integration (2 ملف):
- `migrate-favorites.ts` → `App Files/src/lib/migrate-favorites.ts`
- `cron-reset-tests.ts` → `App Files/src/app/api/cron/reset-tests/route.ts`

### 5️⃣ للمرجع:
- `migration.sql` → ملف Migration (للمرجع فقط)
- `PHASE3_INTEGRATION_GUIDE.md` → اقرأه أولاً!

---

## 🚨 **تحذير حاسم:**

### **هذه المرحلة تتطلب الترحيل إلى PostgreSQL**

```
قبل: SQLite ❌
بعد: PostgreSQL ✅
```

**لا يمكن البقاء على SQLite!**

---

## 🚀 البداية السريعة:

```bash
# ⚠️ Step 0: تحضير PostgreSQL
# احصل على DATABASE_URL من Manus/Supabase/Local

# Step 1: Backup كامل
cp prisma/dev.db prisma/dev.db.phase3-backup
cp prisma/schema.prisma prisma/schema.prisma.phase3-backup

# Step 2: تحديث .env.local
echo 'DATABASE_URL="postgresql://..."' >> .env.local

# Step 3: استبدل schema.prisma
# انسخ schema.prisma الجديد (يدمج المراحل 1+2+3)

# Step 4: أنشئ المجلدات
mkdir -p src/lib src/app/api/price-alerts
mkdir -p src/app/api/cron/reset-tests
mkdir -p src/app/pricing
mkdir -p src/components/ui src/components/dashboard

# Step 5: انسخ جميع الملفات (اتبع الدليل)

# Step 6: Migration
npx prisma generate
npx prisma migrate dev --name add_value_ladder

# Step 7: Test
npm run type-check
npm run build
npm run dev
```

---

## ✅ النتيجة:

- ✅ **PostgreSQL** قاعدة البيانات الرئيسية
- ✅ **5 Models جديدة** (PriceAlert, Subscription, TestHistory, Price, ConversionEvent)
- ✅ **3 Enums** (SubscriptionTier, SubscriptionStatus, PaymentProvider)
- ✅ **Gating System** كامل
- ✅ **7 Components** جاهزة
- ✅ **3 API Routes** جديدة
- ✅ **Subscription UI** كاملة

---

## 📋 الميزات الجديدة:

### **1. Tiers System:**
```
GUEST:   10 tests/month
FREE:    80 tests/month  
PREMIUM: Unlimited tests
```

### **2. Gating:**
- يحدّ الوصول بناءً على الاشتراك
- يعرض BlurredTeaserCard للنتائج المحجوبة
- يعرض UpsellCard للترقية

### **3. Price Alerts:**
- تنبيهات عند انخفاض الأسعار
- PriceAlertButton في صفحة التفاصيل
- PriceComparisonTable لمقارنة الأسعار

### **4. Test History:**
- تسجيل تلقائي لجميع الاختبارات
- TestHistory component للعرض
- Scent DNA snapshots

---

## 🔧 Troubleshooting:

### مشكلة: Migration فشل
```bash
npx prisma migrate reset
npx prisma migrate dev --name add_value_ladder
```

### مشكلة: PostgreSQL connection
```bash
# تحقق من DATABASE_URL
cat .env.local | grep DATABASE_URL

# اختبر:
npx prisma db pull
```

### مشكلة: Type errors
```bash
npm install
npx prisma generate
npm run type-check
```

---

## 📊 ملخص الملفات:

| المجموعة | عدد الملفات | الإجراء |
|----------|-------------|---------|
| استبدال | 2 | schema, match-route |
| Backend جديد | 2 | gating, price-alerts |
| Components جديد | 7 | UI + Dashboard |
| Integration | 2 | migrate, cron |
| أدلة | 2 | README, GUIDE |

---

**⚠️ اقرأ PHASE3_INTEGRATION_GUIDE.md للتعليمات المفصلة!**

**بعد تطبيق المرحلة الثالثة بنجاح، أخبرني لننتقل للمرحلة الرابعة! 🚀**
