# 🚀 دليل الإعداد - صبا (Ask Seba)

**التاريخ:** 22 يناير 2026  
**الإصدار:** Phase 1 - PostgreSQL Migration & Setup

---

## 📋 جدول المحتويات

1. [المتطلبات](#المتطلبات)
2. [تثبيت PostgreSQL](#تثبيت-postgresql)
3. [إعداد قاعدة البيانات](#إعداد-قاعدة-البيانات)
4. [تحديث متغيرات البيئة](#تحديث-متغيرات-البيئة)
5. [تطبيق المرحلة الأولى](#تطبيق-المرحلة-الأولى)
6. [ترحيل البيانات](#ترحيل-البيانات)
7. [التحقق من الإعداد](#التحقق-من-الإعداد)
8. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## المتطلبات

### البرامج المطلوبة:
- **Node.js** 18+ ([تحميل](https://nodejs.org/))
- **PostgreSQL** 13+ ([تحميل](https://www.postgresql.org/download/))
- **npm** أو **yarn** أو **pnpm**
- **Git** (اختياري)

### التحقق من الإصدارات:
```bash
node --version      # v18.0.0 أو أحدث
npm --version       # 9.0.0 أو أحدث
psql --version      # PostgreSQL 13 أو أحدث
```

---

## تثبيت PostgreSQL

### على Windows:

1. **تحميل المثبت:**
   - اذهب إلى [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - حمّل أحدث إصدار

2. **التثبيت:**
   - قم بتشغيل المثبت
   - اختر المجلد المطلوب (مثلاً `C:\Program Files\PostgreSQL`)
   - اختر كلمة مرور للمستخدم `postgres` (تذكرها!)
   - اترك المنفذ كـ `5432`
   - أكمل التثبيت

3. **التحقق:**
   ```bash
   psql --version
   ```

### على macOS:

**الطريقة 1: استخدام Homebrew (الأسهل):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**الطريقة 2: تحميل المثبت:**
- اذهب إلى [postgresql.org/download/macosx](https://www.postgresql.org/download/macosx/)
- حمّل وثبّت

**التحقق:**
```bash
psql --version
```

### على Linux (Ubuntu/Debian):

```bash
# تحديث قائمة الحزم
sudo apt update

# تثبيت PostgreSQL
sudo apt install postgresql postgresql-contrib

# بدء الخدمة
sudo systemctl start postgresql
sudo systemctl enable postgresql

# التحقق
psql --version
```

---

## إعداد قاعدة البيانات

### 1. الاتصال بـ PostgreSQL:

```bash
# على Windows/Mac/Linux
psql -U postgres
```

سيطلب منك كلمة المرور (التي أدخلتها أثناء التثبيت)

### 2. إنشاء قاعدة بيانات جديدة:

```sql
-- داخل psql
CREATE DATABASE perfume_dev OWNER postgres;

-- التحقق
\l

-- الخروج
\q
```

### 3. التحقق من الاتصال:

```bash
psql -U postgres -d perfume_dev -c "SELECT 1"
```

يجب أن ترى:
```
 ?column?
----------
        1
```

---

## تحديث متغيرات البيئة

### 1. نسخ ملف البيئة:

```bash
cp .env.example .env.local
```

### 2. تحديث DATABASE_URL:

افتح `.env.local` وحدّث:

```env
# قبل:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/perfume_dev"

# بعد (استبدل كلمة المرور):
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/perfume_dev"
```

### 3. إضافة NEXTAUTH_SECRET:

```bash
# توليد مفتاح عشوائي
openssl rand -base64 32

# انسخ الناتج وأضفه إلى .env.local:
NEXTAUTH_SECRET="الناتج-من-openssl"
```

### 4. ملفات البيئة النهائية:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/perfume_dev"

# Authentication
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## تطبيق المرحلة الأولى

### 1. تثبيت المكتبات:

```bash
npm install
```

### 2. إنشاء نسخة احتياطية من SQLite (اختياري لكن موصى به):

```bash
npm run db:backup
```

**الناتج:**
```
✓ تم إنشاء النسخة الاحتياطية
  المسار: backups/sqlite/dev.db.2026-01-22T...backup
  الحجم: 1.2 MB
```

### 3. تحديث Schema (إضافة جداول IFRA):

```bash
# انسخ schema.prisma الجديد من المرفقات
cp ../Modify\ application\ files/schema.prisma prisma/schema.prisma
```

### 4. تشغيل Migration:

```bash
npx prisma migrate dev --name add_ifra_tables
```

**الناتج المتوقع:**
```
✓ Migration created
✓ Database schema updated
✓ 3 new tables created: IfraMaterial, SymptomIngredientMapping, PerfumeIngredient
```

### 5. تحميل بيانات IFRA:

```bash
npm run db:setup
```

**الناتج المتوقع:**
```
🌱 Starting database seeding...
📦 Seeding IFRA materials...
✅ IFRA materials: 81 added
📊 Seeding symptom mappings...
✅ Symptom mappings: 30+ added
✨ Seeding completed successfully!
```

### 6. فتح Prisma Studio للتحقق:

```bash
npx prisma studio
```

سيفتح متصفح على `http://localhost:5555`

تحقق من:
- جدول `IfraMaterial` - يجب أن يحتوي على 81 مادة
- جدول `SymptomIngredientMapping` - يجب أن يحتوي على 30+ ربط

---

## ترحيل البيانات

### إذا كان لديك بيانات في SQLite:

#### 1. معاينة الترحيل (Dry Run):

```bash
npm run db:migrate:dry
```

**الناتج:**
```
🔍 وضع Dry Run - لن يتم حفظ أي بيانات
👥 ترحيل جدول المستخدمين
  سيتم ترحيل 5 مستخدم
🔐 ترحيل جدول الحسابات
  سيتم ترحيل 3 حسابات
...
```

#### 2. تنفيذ الترحيل الفعلي:

```bash
npm run db:migrate
```

**الناتج:**
```
✓ تم ترحيل 5 مستخدم
✓ تم ترحيل 3 حسابات
✓ تم ترحيل 8 جلسات
✓ تم ترحيل 12 مفضلة

📊 ملخص الترحيل
  الإجمالي: 28 سجل
  الأخطاء: 0
```

---

## التحقق من الإعداد

### تشغيل سكريبت التحقق:

```bash
npm run db:verify
```

**الناتج المتوقع:**
```
🔍 بدء التحقق من الإعداد

🔧 التحقق من متغيرات البيئة
  ✓ DATABASE_URL: postgresql://***@localhost:5432/perfume_dev
  ✓ NEXTAUTH_SECRET: محدد
  NODE_ENV: development

🗄️ التحقق من قاعدة البيانات
  ✓ اتصال قاعدة البيانات سليم
  نوع قاعدة البيانات: PostgreSQL
  الإصدار: PostgreSQL 15.1

📋 التحقق من الجداول
  ✓ users: 5 سجل
  ✓ accounts: 3 سجل
  ✓ sessions: 8 سجل
  ✓ favorites: 12 سجل
  ✓ ifraMaterial: 81 مادة
  ✓ symptomIngredientMapping: 30 ربط

📊 التحقق من البيانات
  ✓ مستخدمون: 5 مستخدم
  ✓ بيانات IFRA: 81 مادة
  ✓ Symptom Mappings: 30 ربط

📋 تقرير حالة الإعداد
  الحالة الإجمالية: ✓ جاهز للاستخدام
```

---

## تشغيل التطبيق

### بدء خادم التطوير:

```bash
npm run dev
```

**الناتج:**
```
> next dev
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

افتح المتصفح على `http://localhost:3000`

---

## استكشاف الأخطاء

### مشكلة: فشل الاتصال بـ PostgreSQL

**الأعراض:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**الحل:**
```bash
# تحقق من أن PostgreSQL يعمل
# على Windows:
pg_isready

# على Mac/Linux:
sudo systemctl status postgresql

# إذا لم يكن يعمل، ابدأه:
# على Mac:
brew services start postgresql@15

# على Linux:
sudo systemctl start postgresql
```

### مشكلة: خطأ في كلمة المرور

**الأعراض:**
```
Error: password authentication failed for user "postgres"
```

**الحل:**
```bash
# تحقق من DATABASE_URL في .env.local
# تأكد من أن كلمة المرور صحيحة

# إذا نسيت كلمة المرور، يمكنك إعادة تعيينها:
# على Windows (في Command Prompt كـ Admin):
psql -U postgres

# ثم في psql:
ALTER USER postgres WITH PASSWORD 'new_password';
```

### مشكلة: جدول موجود بالفعل

**الأعراض:**
```
Error: relation "users" already exists
```

**الحل:**
```bash
# إعادة تعيين قاعدة البيانات (حذف جميع البيانات):
npm run db:reset

# أو يدويًا:
npx prisma migrate reset --force
```

### مشكلة: خطأ في Prisma

**الأعراض:**
```
Error: @prisma/client did not initialize yet
```

**الحل:**
```bash
# أعد بناء Prisma Client
npx prisma generate

# ثم شغّل التطبيق:
npm run dev
```

---

## الخطوات التالية

بعد إكمال المرحلة الأولى:

1. ✅ **قاعدة بيانات PostgreSQL** - جاهزة
2. ✅ **بيانات IFRA** - محملة (81 مادة)
3. ✅ **Symptom Mappings** - محملة (30+)

### المرحلة الثانية (Bridge Layer):
```bash
# سيتم تطبيقها لاحقاً
# تتضمن: perfume-bridge.service.ts, symptom.service.ts
```

### المرحلة الثالثة (Value Ladder):
```bash
# تتضمن: نظام الاشتراكات والتحكم بالوصول
```

---

## الملفات المهمة

| الملف | الغرض |
|------|-------|
| `.env.local` | متغيرات البيئة (لا تشاركها) |
| `prisma/schema.prisma` | مخطط قاعدة البيانات |
| `prisma/migrations/` | سجل التغييرات |
| `scripts/backup-sqlite.ts` | نسخ احتياطي من SQLite |
| `scripts/migrate-sqlite-to-postgres.ts` | ترحيل البيانات |
| `scripts/verify-setup.ts` | التحقق من الإعداد |

---

## الأوامر المفيدة

```bash
# إعداد قاعدة البيانات
npm run db:setup          # إنشاء جداول وتحميل البيانات
npm run db:reset          # إعادة تعيين كاملة
npm run db:backup         # نسخ احتياطي من SQLite
npm run db:migrate        # ترحيل من SQLite إلى PostgreSQL
npm run db:migrate:dry    # معاينة الترحيل
npm run db:verify         # التحقق من الإعداد

# التطوير
npm run dev               # بدء خادم التطوير
npm run build             # بناء للإنتاج
npm run start             # تشغيل النسخة المبنية

# الاختبار
npm run type-check        # فحص أنواع TypeScript
npm run lint              # فحص الكود
```

---

## الدعم والمساعدة

إذا واجهت مشكلة:

1. تحقق من [استكشاف الأخطاء](#استكشاف-الأخطاء)
2. تأكد من أن جميع المتطلبات مثبتة
3. جرّب `npm run db:verify`
4. تحقق من ملفات السجل في `logs/`

---

**آخر تحديث:** 22 يناير 2026  
**الحالة:** جاهز للاستخدام
