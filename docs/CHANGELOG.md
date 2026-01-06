# Changelog

جميع التغييرات المهمة في هذا المشروع موثقة في هذا الملف.

يتبع هذا الملف تنسيق [Keep a Changelog](https://keepachangelog.com/ar/1.0.0/).

## [Unreleased]

### Added
- إضافة معالجة أخطاء محلية في صفحات الاختبار (quiz pages)
- إضافة مؤشرات التركيز (focus indicators) و ARIA attributes لتحسين إمكانية الوصول
- تطبيق نظام "Search-First UX" في صفحات الاختبار
- إنشاء مكون `CompactPerfumeCard` للنتائج المضغوطة

### Changed
- استبدال متغير `skip` بـ `tertiary` في `CTAButton`
- تحسين حجم أهداف اللمس (touch targets) للأزرار الصغيرة
- توحيد فجوات الشبكة (grid gaps) في جميع الصفحات
- استبدال الألوان المباشرة (hardcoded colors) بمتغيرات Tailwind

### Fixed
- إصلاح مشكلة تعريف الخطوط في `globals.css`
- توحيد متغيرات الخطوط بين Next.js Font و Tailwind
- إصلاح دعم RTL باستخدام logical properties و `rtl:rotate-180` للأيقونات

## [2026-01-06]

### Changed
- تحويل صفحة تفاصيل العطر (`perfume/[id]/page.tsx`) إلى Server Component
- إزالة جميع الإشارات إلى `bestseller` variant من الكود والبيانات
- تحديث نظام الألوان لاستخدام متغيرات Tailwind الموحدة

### Fixed
- إصلاح مشكلة النص الطويل في `PerfumeCard` باستخدام `line-clamp-2`
- تحسين التباين اللوني للزر الأساسي بإضافة `font-bold`
- إضافة `aria-label` لحقل البحث في صفحة النتائج
