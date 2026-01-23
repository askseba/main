# المرحلة الرابعة - Payment Integration (Moyasar + Email)

## 📦 الملفات المرفقة (9 ملفات):

### 1️⃣ للاستبدال (3 ملفات):
- `schema.prisma` → `App Files/prisma/schema.prisma` (استبدال)
- `PricingPage.tsx` → `App Files/src/app/pricing/page.tsx` (استبدال)
- `cron-jobs.ts` → `App Files/src/app/api/cron/jobs/route.ts` (جديد)

### 2️⃣ للإضافة - Payment (3 ملفات):
- `moyasar.service.ts` → `App Files/src/lib/payment/moyasar.service.ts`
- `create-checkout-route.ts` → `App Files/src/app/api/payment/create-checkout/route.ts`
- `moyasar-webhook-route.ts` → `App Files/src/app/api/webhooks/moyasar/route.ts`

### 3️⃣ للإضافة - Email (1 ملف):
- `email.service.ts` → `App Files/src/lib/email/email.service.ts`

### 4️⃣ الأدلة:
- `INSTALLATION.md` → دليل مفصل من المصدر
- `PHASE4_INTEGRATION_GUIDE.md` → دليلي المبسط

---

## 🚨 **تغييرات Schema:**

### **5 حقول جديدة في Subscription:**
```prisma
moyasarPaymentId   String?  @unique
moyasarCustomerId  String?
moyasarSourceId    String?
lastPaymentDate    DateTime?
nextBillingDate    DateTime?
```

---

## 🚀 البداية السريعة:

```bash
# Step 1: تثبيت Dependencies
npm install resend

# Step 2: Environment Variables
cat >> .env.local << 'EOV'
MOYASAR_API_KEY="sk_test_..."
MOYASAR_PUBLISHABLE_KEY="pk_test_..."
MOYASAR_WEBHOOK_SECRET="..."
RESEND_API_KEY="re_..."
NEXT_PUBLIC_APP_URL="https://askseba.com"
EOV

# Step 3: إنشاء المجلدات
mkdir -p src/lib/payment src/lib/email
mkdir -p src/app/api/payment/create-checkout
mkdir -p src/app/api/webhooks/moyasar
mkdir -p src/app/api/cron/jobs

# Step 4: نسخ جميع الملفات (اتبع الدليل)

# Step 5: Migration
npx prisma generate
npx prisma migrate dev --name add_moyasar_email

# Step 6: Test
npm run type-check
npm run build
npm run dev
```

---

## ✅ النتيجة:

- ✅ **Moyasar Payment** متكامل بالكامل
- ✅ **Email Service** جاهز (Resend)
- ✅ **Webhook Handler** يعالج الدفعات تلقائياً
- ✅ **Cron Jobs** 3 مهام مجدولة
- ✅ **Subscription Flow** كامل

---

## 📋 الميزات الجديدة:

### **1. Payment:**
- Checkout page مع Moyasar
- دعم البطاقات السعودية
- Webhook تلقائي

### **2. Email:**
- Welcome email
- Payment receipt
- Price alerts
- Renewal reminders

### **3. Cron Jobs:**
```
Reset Tests:     Monthly (1st of month)
Check Prices:    Every 6 hours
Check Renewals:  Daily
```

---

## 🔧 Required Setup:

### **Moyasar:**
1. إنشاء حساب على https://moyasar.com
2. احصل على API keys (Test Mode)
3. أضف Webhook URL

### **Resend:**
1. إنشاء حساب على https://resend.com
2. احصل على API key
3. فعّل domain (اختياري)

### **Vercel Cron:**
```json
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

## 🧪 Testing:

### **Test Card:**
```
Number: 4111 1111 1111 1111
CVV: 123
Expiry: أي تاريخ مستقبلي
```

### **Test Flow:**
1. اذهب إلى `/pricing`
2. اضغط "اشترك الآن"
3. املأ بيانات الدفع
4. تحقق من:
   - ✅ Payment successful
   - ✅ Email received
   - ✅ User tier = PREMIUM

---

## 📊 ملخص الملفات:

| المجموعة | العدد | الإجراء |
|----------|-------|---------|
| استبدال | 3 | schema, pricing, cron |
| Payment جديد | 3 | service, checkout, webhook |
| Email جديد | 1 | email service |
| أدلة | 2 | README, GUIDE |

---

**⚠️ اقرأ PHASE4_INTEGRATION_GUIDE.md للتعليمات المفصلة!**

**بعد تطبيق المرحلة الرابعة بنجاح، أخبرني لننتقل للمرحلة الخامسة! 🚀**
