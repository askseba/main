# صبا - بصمتك العطرية

تطبيق تحليلي ذكي لمساعدة المستخدمين في اكتشاف العطور المناسبة لهم بناءً على تفضيلاتهم وحساسياتهم.

## 🎯 عن التطبيق

**صبا** هو تطبيق تحليلي (ليس متجر) يساعد المستخدمين في:
- تحديد العطور المناسبة بناءً على تفضيلاتهم
- تجنب العطور التي قد تسبب حساسية
- الحصول على توصيات مخصصة بناءً على تحليل دقيق

## 🚀 البدء السريع

### المتطلبات
- Node.js 18+ 
- npm أو yarn أو pnpm

### التثبيت والتشغيل

```bash
# تثبيت المكتبات
npm install

# تشغيل خادم التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## 📚 الوثائق

- **[دليل الوثائق](./docs/README.md)** - فهرس شامل لجميع الوثائق
- **[API Documentation](./docs/API.md)** - توثيق واجهات برمجة التطبيق
- **[Changelog](./docs/CHANGELOG.md)** - سجل التغييرات
- **[UX Audit Reports](./docs/ux-audit/)** - تقارير فحص تجربة المستخدم
- **[RTL Support](./docs/RTL.md)** - دعم اللغة العربية واتجاه RTL
- **[PWA Features](./docs/PWA.md)** - ميزات التطبيق التقدمي

## 🛡️ Authentication

### Demo Login
- **Email:** demo@askseba.com
- **Password:** 123456
- → Redirects to `/dashboard`

### Production Setup
1. **Google OAuth:** Get credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. **.env.local:** Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
3. **Database Integration:** Prisma integration (Phase 2)

### Protected Routes
- `/dashboard/**` - Protected by middleware + client-side checks
- Unauthenticated users are redirected to `/login`

### Testing Authentication
```bash
# Test auth configuration
npm run test:auth

# Run dev server with auth URL
npm run dev:auth
```

## 🛠️ التقنيات المستخدمة

- **Next.js 16** - إطار عمل React
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - تصميم الواجهة
- **NextAuth.js v5** - المصادقة
- **Noto Sans Arabic** - خط عربي محسّن

## 📝 ملاحظات

- التطبيق حالياً في مرحلة التطوير
- البيانات محلية (local data) وليست من API خارجي
- التطبيق يدعم اللغة العربية بالكامل مع RTL

---

**آخر تحديث:** 6 يناير 2026
