# المرحلة الثانية - ملفات التطبيق الكاملة

## 📦 الملفات المرفقة (9 ملفات):

### 1️⃣ للاستبدال (3 ملفات):
- `ifra.service.ts` → `App Files/src/lib/services/ifra.service.ts` (استبدل)
- `match_route.ts` → `App Files/src/app/api/match/route.ts` (استبدل)
- `seed.ts` → `App Files/prisma/seed.ts` (استبدل)

### 2️⃣ للإضافة (5 ملفات جديدة):
- `perfume-bridge.service.ts` → `App Files/src/lib/services/perfume-bridge.service.ts`
- `symptom.service.ts` → `App Files/src/lib/services/symptom.service.ts`
- `unified-perfume.ts` → `App Files/src/types/unified-perfume.ts`
- `SafetyWarnings.tsx` → `App Files/src/components/SafetyWarnings.tsx`
- `symptom-mappings.ts` → `App Files/src/data/symptom-mappings.ts`

### 3️⃣ الدليل:
- `PHASE2_INTEGRATION_GUIDE.md` → اقرأه أولاً!

## 🚀 البداية السريعة:

```bash
# 1. Backup
cp prisma/dev.db prisma/dev.db.phase2-backup
cp src/app/api/match/route.ts src/app/api/match/route.ts.backup
cp prisma/seed.ts prisma/seed.ts.backup

# 2. أنشئ المجلدات
mkdir -p src/lib/services
mkdir -p src/types
mkdir -p src/components
mkdir -p src/data

# 3. استبدل الملفات الثلاثة
# ifra.service.ts, match_route.ts, seed.ts

# 4. انسخ الملفات الجديدة الخمسة
# perfume-bridge.service.ts, symptom.service.ts, unified-perfume.ts,
# SafetyWarnings.tsx, symptom-mappings.ts

# 5. Re-seed
npx prisma db seed

# 6. Test
npm run type-check
npm run build
npm run dev
```

## ✅ النتيجة:
- Bridge Layer موحد (Local + Fragella)
- 3 خدمات جديدة
- مكون SafetyWarnings
- symptom-mappings كامل
- API محدّث
- لا breaking changes

## 📋 الملفات بالتفصيل:

| الملف | الحجم | الوصف |
|------|------|--------|
| ifra.service.ts | 9KB | خدمة IFRA محدّثة |
| perfume-bridge.service.ts | 14KB | طبقة الربط الموحدة |
| symptom.service.ts | 3KB | خدمة تحليل الأعراض |
| symptom-mappings.ts | 4KB | قاعدة بيانات الأعراض |
| unified-perfume.ts | 6KB | Types موحدة |
| SafetyWarnings.tsx | 8KB | مكون التحذيرات |
| match_route.ts | 10KB | API محدّث |
| seed.ts | 6KB | Seed محدّث |
