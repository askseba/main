# 🎯 المرحلة الرابعة - دليل التطبيق
## Payment Integration (Moyasar + Email) - Phase 4

**التاريخ:** 21 يناير 2026  
**الحالة:** ✅ جاهز للتطبيق  
**المدة المتوقعة:** 45-60 دقيقة  
**المتطلبات:** يجب أن تكون المرحلة الثالثة مطبّقة بنجاح

---

## 📋 **ملخص التغييرات**

### **ما تم إضافته:**
1. ✅ **Moyasar Payment Integration** (بوابة الدفع السعودية)
2. ✅ **Email Service** (إرسال الفواتير والإشعارات)
3. ✅ **Webhook Handler** (استقبال تأكيدات الدفع)
4. ✅ **Cron Jobs** محدّثة (فحص الأسعار + التجديد التلقائي)
5. ✅ **5 Moyasar fields** في Subscription model

### **ما تم تعديله:**
- ✅ `prisma/schema.prisma` (إضافة Moyasar fields)
- ✅ `src/app/pricing/page.tsx` (إضافة Moyasar checkout)
- ✅ `src/app/api/cron/.../route.ts` (توسيع المهام)

---

## 🚀 **خطوات التطبيق**

### **Step 1: Backup (إلزامي)**

```bash
# Backup
cp prisma/schema.prisma prisma/schema.prisma.phase4-backup
cp src/app/pricing/page.tsx src/app/pricing/page.tsx.phase4-backup

# Git commit
git add .
git commit -m "Backup before Phase 4 - Payment Integration"
```

---

### **Step 2: تثبيت Dependencies**

```bash
# تثبيت Resend للإيميلات
npm install resend

# التحقق
npm list resend
```

---

### **Step 3: إضافة Environment Variables**

```bash
# أضف إلى .env.local:

# Moyasar (من dashboard.moyasar.com)
MOYASAR_API_KEY="sk_test_..."
MOYASAR_PUBLISHABLE_KEY="pk_test_..."
MOYASAR_WEBHOOK_SECRET="..."

# Resend (من resend.com)
RESEND_API_KEY="re_..."

# App URL
NEXT_PUBLIC_APP_URL="https://askseba.com"

# Cron (موجود من قبل)
CRON_SECRET="..."
```

**⚠️ مهم:** 
- احصل على Moyasar keys من: https://dashboard.moyasar.com
- احصل على Resend API key من: https://resend.com

---

### **Step 4: إنشاء هيكل المجلدات**

```bash
# إنشاء المجلدات المطلوبة
mkdir -p src/lib/payment
mkdir -p src/lib/email
mkdir -p src/app/api/payment/create-checkout
mkdir -p src/app/api/webhooks/moyasar

# التحقق
ls -la src/lib/payment/
ls -la src/lib/email/
```

---

### **Step 5: نسخ الملفات الجديدة (4 ملفات)**

```bash
# ✅ 1. Moyasar Service
# من: moyasar.service.ts
# إلى: src/lib/payment/moyasar.service.ts

# ✅ 2. Email Service
# من: email.service.ts
# إلى: src/lib/email/email.service.ts

# ✅ 3. Create Checkout API
# من: create-checkout-route.ts
# إلى: src/app/api/payment/create-checkout/route.ts

# ✅ 4. Moyasar Webhook
# من: moyasar-webhook-route.ts
# إلى: src/app/api/webhooks/moyasar/route.ts
```

---

### **Step 6: استبدال الملفات المعدلة (3 ملفات)**

```bash
# ⚠️ 1. Schema (إضافة Moyasar fields)
# من: schema.prisma
# إلى: prisma/schema.prisma (استبدال)

# ⚠️ 2. Pricing Page (إضافة Moyasar checkout)
# من: PricingPage.tsx
# إلى: src/app/pricing/page.tsx (استبدال)

# ⚠️ 3. Cron Jobs (توسيع)
# من: cron-jobs.ts
# إلى: src/app/api/cron/jobs/route.ts (ملف جديد)
```

---

### **Step 7: Migration**

```bash
# Format & Validate
npx prisma format
npx prisma validate

# Generate Client
npx prisma generate

# Create Migration
npx prisma migrate dev --name add_moyasar_email

# يجب أن ترى:
# ✅ Migration created
# ✅ 5 new fields added to Subscription
```

---

### **Step 8: Type Check**

```bash
# Type check
npm run type-check
# يجب أن لا يكون هناك أخطاء ✅

# Build
npm run build
# يجب أن ينجح ✅
```

---

### **Step 9: إعداد Moyasar**

1. **إنشاء حساب على Moyasar:**
   - اذهب إلى: https://moyasar.com
   - سجّل حساب جديد
   - فعّل Test Mode

2. **احصل على API Keys:**
   - Dashboard → Settings → API Keys
   - انسخ: `Publishable Key` و `Secret Key`

3. **إعداد Webhook:**
   - Dashboard → Webhooks → Add Webhook
   - URL: `https://yourdomain.com/api/webhooks/moyasar`
   - Events: اختر `payment.paid`
   - انسخ `Webhook Secret`

---

### **Step 10: إعداد Resend**

1. **إنشاء حساب على Resend:**
   - اذهب إلى: https://resend.com
   - سجّل حساب جديد (مجاني حتى 3000 إيميل/شهر)

2. **احصل على API Key:**
   - Dashboard → API Keys → Create API Key
   - انسخ الـ key

3. **إضافة Domain (اختياري):**
   - Dashboard → Domains → Add Domain
   - اتبع التعليمات للتحقق

---

### **Step 11: إعداد Vercel Cron Jobs**

```json
// في vercel.json:
{
  "crons": [
    {
      "path": "/api/cron/jobs?action=reset-tests",
      "schedule": "0 0 1 * *"
    },
    {
      "path": "/api/cron/jobs?action=check-prices",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/jobs?action=check-renewals",
      "schedule": "0 0 * * *"
    }
  ]
}
```

---

### **Step 12: اختبار Payment Flow**

```bash
# 1. افتح التطبيق
npm run dev

# 2. اذهب إلى /pricing

# 3. اضغط على "اشترك الآن"

# 4. املأ بيانات الدفع (Test Mode):
# Card: 4111111111111111
# CVV: 123
# Expiry: أي تاريخ مستقبلي

# 5. يجب أن ترى:
# ✅ Checkout page يفتح
# ✅ Payment successful message
# ✅ إيميل تأكيد يُرسل
# ✅ User tier يتغير إلى PREMIUM
```

---

## ✅ **Checklist النهائي**

- [ ] ✅ Dependencies مثبتة (resend)
- [ ] ✅ Environment variables مضافة (6 متغيرات)
- [ ] ✅ 4 ملفات جديدة منسوخة
- [ ] ✅ 3 ملفات معدلة مستبدلة
- [ ] ✅ Migration نجح
- [ ] ✅ Moyasar account جاهز
- [ ] ✅ Resend account جاهز
- [ ] ✅ Webhook URL مضاف في Moyasar
- [ ] ✅ Vercel cron jobs مضافة
- [ ] ✅ `npm run type-check` بدون أخطاء
- [ ] ✅ `npm run build` ينجح
- [ ] ✅ Payment flow يعمل

---

## 🔧 **Troubleshooting**

### **مشكلة: Moyasar checkout لا يفتح**
```bash
# تحقق من:
# 1. MOYASAR_PUBLISHABLE_KEY في .env.local
# 2. Console errors في المتصفح
# 3. Network tab في DevTools
```

### **مشكلة: Webhook لا يعمل**
```bash
# تحقق من:
# 1. MOYASAR_WEBHOOK_SECRET صحيح
# 2. URL متاح (استخدم ngrok للتطوير)
# 3. Moyasar dashboard → Webhooks logs
```

### **مشكلة: Email لا يُرسل**
```bash
# تحقق من:
# 1. RESEND_API_KEY صحيح
# 2. From email مُفعّل في Resend
# 3. Resend dashboard → Logs
```

---

## 📊 **ما بعد المرحلة الرابعة**

### **الميزات الجديدة المتاحة:**

1. **Moyasar Integration:**
   - `moyasarService.createCheckout()` - إنشاء checkout
   - `moyasarService.verifyPayment()` - التحقق من الدفع
   - Webhook handler تلقائي

2. **Email Service:**
   - `sendWelcomeEmail()` - إيميل ترحيب
   - `sendPaymentReceiptEmail()` - فاتورة
   - `sendPriceAlertEmail()` - تنبيه سعر
   - `sendRenewalReminderEmail()` - تذكير تجديد

3. **Cron Jobs:**
   - Reset tests monthly
   - Check prices every 6 hours
   - Check renewals daily

---

## 🎯 **النتيجة**

بعد تطبيق المرحلة الرابعة:
- ✅ **Payment Integration** كامل (Moyasar)
- ✅ **Email Service** جاهز (Resend)
- ✅ **Webhook Handler** يعمل تلقائياً
- ✅ **Cron Jobs** 3 مهام مجدولة
- ✅ **Subscription Flow** من البداية للنهاية
- ✅ التطبيق جاهز للإطلاق

**جاهز للمرحلة الخامسة (UI Final Polish)! 🚀**

---

## 📝 **ملاحظات مهمة**

### **1. Test Mode:**
- استخدم Test keys أثناء التطوير
- بطاقة اختبار: `4111111111111111`
- لا تُرسل إيميلات حقيقية في Test mode

### **2. Production:**
- استبدل Test keys بـ Live keys
- فعّل Domain verification في Resend
- اختبر Webhook على domain حقيقي

### **3. Security:**
- لا تشارك API keys أبداً
- استخدم MOYASAR_WEBHOOK_SECRET للتحقق
- CRON_SECRET للحماية

**وقت التطبيق الفعلي: 40-50 دقيقة** ⏱️
