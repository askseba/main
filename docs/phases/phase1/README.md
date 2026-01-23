# المرحلة الأولى - ملفات التطبيق الكاملة

## 📦 الملفات المرفقة (7 ملفات):

### 1️⃣ للاستبدال:
- `schema.prisma` → `App Files/prisma/schema.prisma`
- `seed.ts` → `App Files/prisma/seed.ts`

### 2️⃣ للإضافة (ملفات جديدة):
- `eu-allergens-2023.ts` → `App Files/src/data/ifra/eu-allergens-2023.ts`
- `note-to-ingredient-map.ts` → `App Files/src/data/note-to-ingredient-map.ts`
- `ifra.service.ts` → `App Files/src/lib/services/ifra.service.ts`
- `ifra-types.ts` → `App Files/src/types/ifra.ts`

### 3️⃣ الدليل:
- `PHASE1_INTEGRATION_GUIDE.md` → اقرأه أولاً!

## 🚀 البداية السريعة:

```bash
# 1. Backup
cp prisma/dev.db prisma/dev.db.backup
cp prisma/schema.prisma prisma/schema.prisma.backup

# 2. استبدل الملفات
# نسخ schema.prisma و seed.ts

# 3. أنشئ المجلدات
mkdir -p src/data/ifra
mkdir -p src/lib/services
mkdir -p src/types

# 4. انسخ الملفات الجديدة
# eu-allergens-2023.ts, note-to-ingredient-map.ts, ifra.service.ts, ifra-types.ts

# 5. Migration
npx prisma format
npx prisma generate
npx prisma migrate dev --name add_ifra_tables

# 6. Seed
npx prisma db seed

# 7. Test
npm run type-check
npm run build
npm run dev
```

## ✅ النتيجة:
- 81 مادة IFRA في قاعدة البيانات
- 30+ symptom mapping
- خدمة IFRA كاملة جاهزة
- لا breaking changes
