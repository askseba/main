# 📘 دليل تثبيت Moyasar + Email Notifications

**الإصدار:** 1.0.0  
**التاريخ:** 21 يناير 2026

---

## 📦 **محتويات الحزمة**

```
MOYASAR_EMAIL_ADDON/
├── new_files/              (4 ملفات جديدة)
│   ├── payment/
│   │   ├── moyasar.service.ts
│   │   └── create-checkout-route.ts
│   ├── webhooks/
│   │   └── moyasar-webhook-route.ts
│   └── email/
│       └── email.service.ts
│
├── modified_files/         (3 ملفات معدلة)
│   ├── PricingPage-MODIFIED.tsx
│   ├── schema-MODIFIED.prisma
│   └── cron-jobs-MODIFIED.ts
│
└── docs/
    └── INSTALLATION.md     (هذا الملف)
```

---

## 🎯 **الميزات الجديدة**

### **1️⃣ بوابة الدفع Moyasar**
- ✅ دعم مدى / Visa / Mastercard / Apple Pay / STC Pay
- ✅ اشتراكات شهرية وسنوية
- ✅ Webhooks تلقائية
- ✅ طبقة Modular قابلة للتغيير

### **2️⃣ مراقبة الأسعار + التنبيهات**
- ✅ تنبيه عند انخفاض السعر
- ✅ إيميلات تلقائية للمستخدمين
- ✅ إيميلات نجاح/فشل الدفع
- ✅ تنبيهات تجديد الاشتراك

---

## 🚀 **التثبيت (خطوة بخطوة)**

### **الخطوة 1: Dependencies**

```bash
# Install Resend for emails
npm install resend

# تحديث Prisma (إذا لزم الأمر)
npm install @prisma/client@latest
```

---

### **الخطوة 2: Environment Variables**

أضف إلى `.env.local`:

```bash
# Moyasar API Keys (من لوحة تحكم Moyasar)
MOYASAR_API_KEY=your_secret_key_here
MOYASAR_PUBLISHABLE_KEY=your_publishable_key_here
MOYASAR_WEBHOOK_SECRET=your_webhook_secret_here

# Resend API Key (من resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# App URLs
NEXT_PUBLIC_APP_URL=https://askseba.com
# أو في التطوير:
# NEXT_PUBLIC_APP_URL=http://localhost:3000

# Existing secrets (keep them)
CRON_SECRET=your_existing_cron_secret
ADMIN_SECRET=your_existing_admin_secret
```

---

### **الخطوة 3: الملفات الجديدة**

#### **3.1 Payment Service**
```bash
mkdir -p src/lib/payment
cp new_files/payment/moyasar.service.ts src/lib/payment/
```

#### **3.2 Checkout API**
```bash
mkdir -p src/app/api/payment/create-checkout
cp new_files/payment/create-checkout-route.ts src/app/api/payment/create-checkout/route.ts
```

#### **3.3 Webhook Handler**
```bash
mkdir -p src/app/api/webhooks/moyasar
cp new_files/webhooks/moyasar-webhook-route.ts src/app/api/webhooks/moyasar/route.ts
```

#### **3.4 Email Service**
```bash
mkdir -p src/lib/email
cp new_files/email/email.service.ts src/lib/email/
```

---

### **الخطوة 4: الملفات المعدلة**

#### **4.1 Pricing Page**
```bash
# ⚠️ استبدل الملف الحالي
cp modified_files/PricingPage-MODIFIED.tsx src/app/pricing/page.tsx
```

#### **4.2 Prisma Schema**
```bash
# ⚠️ احتفظ بنسخة احتياطية أولاً!
cp prisma/schema.prisma prisma/schema.prisma.backup

# استبدل بالنسخة المعدلة
cp modified_files/schema-MODIFIED.prisma prisma/schema.prisma

# شغّل Migration
npx prisma generate
npx prisma migrate dev --name add_moyasar_email
```

#### **4.3 Cron Jobs**
```bash
# ⚠️ استبدل الملف الحالي
cp modified_files/cron-jobs-MODIFIED.ts src/app/api/cron/jobs/route.ts
```

---

### **الخطوة 5: Moyasar Setup**

#### **5.1 إنشاء حساب Moyasar**
1. اذهب إلى https://moyasar.com
2. سجّل حساب جديد
3. فعّل حسابك
4. احصل على API Keys من Dashboard

#### **5.2 إعداد Webhook**
1. في لوحة تحكم Moyasar → Settings → Webhooks
2. أضف webhook URL:
   ```
   https://yourdomain.com/api/webhooks/moyasar
   ```
3. فعّل الأحداث:
   - `payment.paid`
   - `payment.failed`
   - `payment.refunded`
4. انسخ Webhook Secret وضعه في `.env.local`

---

### **الخطوة 6: Resend Setup**

#### **6.1 إنشاء حساب Resend**
1. اذهب إلى https://resend.com
2. سجّل حساب جديد (مجاني حتى 3000 إيميل/شهر)
3. احصل على API Key من Dashboard

#### **6.2 إضافة Domain (اختياري)**
1. في Resend → Domains
2. أضف domain الخاص بك (askseba.com)
3. اضبط DNS records
4. تحقق من Domain

**ملاحظة:** يمكنك استخدام onboarding@resend.dev للتجربة

---

### **الخطوة 7: Vercel Cron Jobs**

#### **7.1 إضافة Cron Jobs**

في Vercel → Project Settings → Cron Jobs:

**Job 1: Monthly Test Reset**
```
Name: Reset Monthly Tests
Schedule: 0 0 1 * *  (1st of month at midnight)
Path: /api/cron/jobs?action=reset-tests
Auth: Bearer YOUR_CRON_SECRET
```

**Job 2: Price Monitoring** ⭐ جديد
```
Name: Check Price Drops
Schedule: 0 */6 * * *  (Every 6 hours)
Path: /api/cron/jobs?action=check-prices
Auth: Bearer YOUR_CRON_SECRET
```

**Job 3: Renewal Reminders** ⭐ جديد
```
Name: Subscription Renewals
Schedule: 0 9 * * *  (Daily at 9 AM)
Path: /api/cron/jobs?action=check-renewals
Auth: Bearer YOUR_CRON_SECRET
```

---

## ✅ **التحقق من التثبيت**

### **Test 1: TypeScript**
```bash
npm run type-check
# يجب أن يمر بدون أخطاء ✅
```

### **Test 2: Build**
```bash
npm run build
# يجب أن ينجح ✅
```

### **Test 3: Payment Flow (Development)**
```bash
npm run dev

# 1. افتح http://localhost:3000/pricing
# 2. اضغط "اشترك الآن"
# 3. يجب أن يوجهك لصفحة Moyasar
# 4. استخدم test card:
#    Card: 4111 1111 1111 1111
#    Expiry: 12/25
#    CVC: 123
```

### **Test 4: Webhook (Manual)**
```bash
# استخدم Moyasar Test Mode
# أكمل دفعة تجريبية
# تحقق من logs:
# - User tier upgraded to PREMIUM
# - Email sent to user
```

### **Test 5: Price Alert**
```bash
# في المتصفح:
# 1. أضف price alert لعطر
# 2. شغّل cron manually:
curl -X POST http://localhost:3000/api/cron/jobs \
  -H "Content-Type: application/json" \
  -d '{"adminSecret": "YOUR_ADMIN_SECRET", "action": "check-prices"}'

# 3. تحقق من console logs
```

---

## 📊 **خريطة الملفات النهائية**

| الملف | المسار | النوع |
|:---|:---|:---:|
| moyasar.service.ts | `src/lib/payment/moyasar.service.ts` | ✅ جديد |
| create-checkout | `src/app/api/payment/create-checkout/route.ts` | ✅ جديد |
| moyasar webhook | `src/app/api/webhooks/moyasar/route.ts` | ✅ جديد |
| email.service.ts | `src/lib/email/email.service.ts` | ✅ جديد |
| PricingPage | `src/app/pricing/page.tsx` | 🔄 معدل |
| schema.prisma | `prisma/schema.prisma` | 🔄 معدل |
| cron jobs | `src/app/api/cron/jobs/route.ts` | 🔄 معدل |

---

## 🔧 **حل المشاكل**

### **خطأ: MOYASAR_API_KEY not configured**
```bash
# تأكد من إضافة جميع environment variables
# أعد تشغيل dev server بعد التعديل
```

### **خطأ: Webhook signature invalid**
```bash
# تأكد من MOYASAR_WEBHOOK_SECRET صحيح
# تحقق من webhook URL في لوحة Moyasar
```

### **خطأ: Email not sending**
```bash
# تحقق من RESEND_API_KEY
# تحقق من domain verification
# راجع Resend logs: resend.com/logs
```

### **خطأ: Prisma Migration**
```bash
# إذا فشل migration:
npx prisma migrate reset  # ⚠️ DEV ONLY
npx prisma migrate dev --name add_moyasar_email
```

---

## 💡 **أمثلة الاستخدام**

### **تجربة الدفع**

```typescript
// في PricingPage، عند الضغط على "اشترك الآن":
1. User clicks "Subscribe Monthly"
2. API creates checkout session with Moyasar
3. User redirects to Moyasar payment page
4. User completes payment
5. Moyasar sends webhook to /api/webhooks/moyasar
6. Webhook updates user tier to PREMIUM
7. Email sent to user (payment success)
8. User redirected back to dashboard
```

### **تنبيه السعر**

```typescript
// User adds price alert for perfume
1. User sets target price: 400 SAR
2. PriceAlert created in database
3. Cron job runs every 6 hours
4. Current price checked: 380 SAR (dropped!)
5. Email sent to user
6. Alert marked as notified
```

---

## 📝 **ملاحظات مهمة**

### **الأمان**
- ✅ جميع API keys في `.env.local` فقط
- ✅ Webhook signature verification مفعّل
- ✅ لا تشارك CRON_SECRET مع أحد

### **الأداء**
- Price monitoring يعمل كل 6 ساعات (قابل للتعديل)
- Emails asynchronous (لا تبطئ الـ API)
- Moyasar checkout يحمل في نافذة جديدة

### **التكاليف**
- Moyasar: 2.9% + 1 SAR لكل معاملة
- Resend: مجاني حتى 3000 email/month
- Vercel Cron: مجاني (في Pro plan)

---

## 🎉 **انتهى التثبيت!**

**الميزات المفعلة:**
- ✅ Moyasar payment gateway
- ✅ Automated emails
- ✅ Price drop alerts
- ✅ Subscription renewals

**الخطوات التالية:**
1. اختبر جميع الـ flows
2. فعّل Test Mode في Moyasar
3. راقب الـ logs
4. انتقل لـ Live Mode بعد التأكد

---

**أي استفسارات؟** راجع التوثيق أو افتح issue! 🚀
