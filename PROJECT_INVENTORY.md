# Project Inventory - تقرير جرد المشروع

**تاريخ الإنشاء:** 2026-01-XX  
**المسار الأساسي:** `App Files/`  
**حالة التغطية:** Initial - جميع الملفات = Not Read

---

## 📁 شجرة المجلدات والملفات

```
App Files/
├── 📄 Configuration Files
│   ├── package.json
│   ├── package-lock.json
│   ├── package-updates.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   ├── vercel.json
│   └── Desktop.ini
│
├── 📄 Root Documentation Files
│   ├── README.md
│   ├── README_HEADER_FINAL.md
│   ├── 404_DIAGNOSTIC_REPORT.md
│   ├── DATA_SOURCES_DIAGNOSTIC_REPORT.md
│   ├── DATA_SOURCES_REPORT.md
│   ├── EXAMINATION_REPORT_TIMELINE.md
│   ├── EXAMINATION_REPORT.md
│   ├── HEADER_COMPARISON.md
│   ├── HEADER_DEPLOYMENT_GUIDE.md
│   ├── HEADER_INDEX.md
│   ├── HEADER_SUMMARY.md
│   └── test-auth.ts
│
├── 📁 src/
│   ├── 📄 Root Source Files
│   │   ├── auth.ts
│   │   ├── middleware.ts
│   │   └── middleware.backup
│   │
│   ├── 📁 app/ (App Routes - Next.js App Router)
│   │   ├── 📄 Root Pages
│   │   │   ├── page.tsx (Home)
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── favicon.ico
│   │   │
│   │   ├── 📁 about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 api/ (API Routes)
│   │   │   ├── 📁 admin/
│   │   │   │   └── 📁 suggestions/
│   │   │   │       ├── route.ts
│   │   │   │       ├── 📁 [id]/
│   │   │   │       │   ├── 📁 approve/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── 📁 reject/
│   │   │   │       │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📁 [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── 📁 register/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 avatar/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── 📁 cron/
│   │   │   │   └── 📁 update-prices/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 feedback/
│   │   │   │   └── 📁 suggestions/
│   │   │   │       ├── route.ts
│   │   │   │       └── 📁 [id]/
│   │   │   │           └── 📁 vote/
│   │   │   │               └── route.ts
│   │   │   │
│   │   │   ├── 📁 match/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── 📁 perfumes/
│   │   │   │   ├── 📁 details/
│   │   │   │   │   └── 📁 [fragellaId]/
│   │   │   │   │       └── route.ts
│   │   │   │   └── 📁 search/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 prices/
│   │   │   │   └── 📁 compare/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── 📁 results/
│   │   │   │   └── 📁 favorites/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   └── 📁 user/
│   │   │       └── 📁 favorites/
│   │   │           └── route.ts
│   │   │
│   │   ├── 📁 dashboard/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 faq/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 feedback/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 notifications/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 perfume/
│   │   │   └── 📁 [id]/
│   │   │       ├── page.tsx
│   │   │       └── PerfumeDetailCTA.tsx
│   │   │
│   │   ├── 📁 perfumes/ (Legacy routes?)
│   │   │   ├── 📁 details/
│   │   │   │   └── [fragellaId].ts
│   │   │   └── 📁 search/
│   │   │       └── [fragellaId].ts
│   │   │
│   │   ├── 📁 privacy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 profile/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 quiz/
│   │   │   ├── page.tsx
│   │   │   ├── 📁 step1-favorites/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁 step2-disliked/
│   │   │   │   └── page.tsx
│   │   │   └── 📁 step3-allergy/
│   │   │       └── page.tsx
│   │   │
│   │   ├── 📁 register/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 results/
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📁 settings/
│   │   │   └── page.tsx
│   │   │
│   │   └── 📁 test-header/
│   │       └── page.tsx
│   │
│   ├── 📁 components/
│   │   ├── 📄 Core Components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── NetworkStatusToast.tsx
│   │   │   ├── PWARegister.tsx
│   │   │   ├── SessionProvider.tsx
│   │   │   ├── ConditionalLayout.tsx
│   │   │   ├── ConditionalLayout.example.tsx
│   │   │   ├── FeedbackCard.tsx
│   │   │   ├── FeedbackModal.tsx
│   │   │   └── AdminModal.tsx
│   │   │
│   │   ├── 📁 quiz/
│   │   │   ├── SymptomCard.tsx
│   │   │   └── Step3Allergy.tsx
│   │   │
│   │   └── 📁 ui/ (UI Components)
│   │       ├── avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── button.tsx
│   │       ├── CompactPerfumeCard.tsx
│   │       ├── CounterBadge.tsx
│   │       ├── CTAButton.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── EmptyState.tsx
│   │       ├── FilterTabs.tsx
│   │       ├── header.tsx
│   │       ├── MobileFilterModal.tsx
│   │       ├── PerfumeCard.tsx
│   │       ├── PerfumeGrid.tsx
│   │       ├── PerfumeSearchResult.tsx
│   │       ├── PerfumeTimeline.tsx
│   │       ├── RadarChart.tsx
│   │       ├── SearchPerfumeBar.tsx
│   │       ├── ShareButton.tsx
│   │       ├── SmartImage.tsx
│   │       ├── SpeedometerGauge.tsx
│   │       ├── StatsGrid.tsx
│   │       ├── tooltip.tsx
│   │       ├── index.ts
│   │       ├── HEADER_README.md
│   │       └── installation_instructions_v23.md
│   │
│   ├── 📁 contexts/
│   │   └── QuizContext.tsx
│   │
│   ├── 📁 hooks/
│   │   ├── useAnalytics.ts
│   │   ├── useCrossTabLogout.ts
│   │   ├── useDebounce.ts
│   │   ├── useFavorites.ts
│   │   ├── useFocusTrap.ts
│   │   ├── useNetworkStatus.ts
│   │   └── useResultsFilters.ts
│   │
│   ├── 📁 lib/
│   │   ├── 📄 Core Libraries
│   │   │   ├── auth.ts
│   │   │   ├── prisma.ts
│   │   │   ├── utils.ts
│   │   │   ├── matching.ts
│   │   │   ├── scent-analysis.ts
│   │   │   ├── rate-limit.ts
│   │   │   ├── posthog-client.ts
│   │   │   ├── clear-user-data.ts
│   │   │   └── migrate-favorites.ts
│   │   │
│   │   ├── 📁 data/
│   │   │   ├── perfumes.ts
│   │   │   └── symptoms.ts
│   │   │
│   │   ├── 📁 services/
│   │   │   └── perfume.service.ts
│   │   │
│   │   └── 📁 utils/
│   │       ├── api-helpers.ts
│   │       ├── arabicPlural.ts
│   │       └── storage.ts
│   │
│   ├── 📁 quiz/
│   │   └── 📁 symptoms-archive/
│   │       ├── 📁 step1-symptoms/
│   │       │   └── page.tsx
│   │       ├── SymptomCard.tsx
│   │       └── symptoms.ts
│   │
│   ├── 📁 types/
│   │   └── next-auth.d.ts
│   │
│   └── 📁 content/
│       └── content.json
│
├── 📁 prisma/ (Database)
│   ├── schema.prisma
│   ├── seed.ts
│   ├── check-data.ts
│   ├── fill-prices.ts
│   ├── dev.db (SQLite database file)
│   └── 📁 migrations/
│       ├── migration_lock.toml
│       ├── 📁 20260112124917_add_user_favorites/
│       │   └── migration.sql
│       ├── 📁 20260114012317_add_stores_prices/
│       │   └── migration.sql
│       ├── 📁 20260115195047_add_user_model/
│       │   └── migration.sql
│       ├── 📁 20260115195559_add_user_suggestion_relation/
│       │   └── migration.sql
│       ├── 📁 20260116131134_fragella_mvp/
│       │   └── migration.sql
│       └── 📁 20260116220124_fragella_cache/
│           └── migration.sql
│
├── 📁 public/ (Static Assets)
│   ├── manifest.json
│   ├── offline.html
│   ├── sw.js (Service Worker)
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── pwa-192.png
│   ├── pwa-512.png
│   ├── next.svg
│   ├── vercel.svg
│   ├── file.svg
│   ├── globe.svg
│   └── window.svg
│
├── 📁 docs/ (Documentation)
│   ├── 📄 Root Docs
│   │   ├── README.md
│   │   ├── CHANGELOG.md
│   │   ├── API.md
│   │   ├── PWA.md
│   │   ├── RTL.md
│   │   ├── TYPOGRAPHY_SYSTEM.md
│   │   ├── DATABASE_SETUP.md
│   │   ├── DESIGN_EXCEPTIONS.md
│   │   ├── DOCS_DIAGNOSTIC_REPORT.md
│   │   ├── FORENSIC_AUDIT_REPORT.md
│   │   ├── FOUNDATION_FRAMEWORK.md
│   │   ├── QUIZ_FLOW_DECISIONS.md
│   │   ├── 1973.md
│   │   ├── Acceptance Criteria - ask.seba Pages.md
│   │   ├── Content Specification - ask.seba.md
│   │   ├── Cursor Prompt - ask.seba Pages Implementation.md
│   │   ├── برومبت جاهز للدمج.md
│   │   └── دليل دمج ملفات الملف الشخصي (Profile V2.3) 🚀.md
│   │
│   ├── 📁 core/
│   │   ├── ENV_SETUP.md
│   │   ├── README-deploy.md
│   │   └── STRUCTURE.md
│   │
│   ├── 📁 technical/
│   │   ├── AUTH_PRODUCTION_COMPLETE.md
│   │   ├── AUTH_PRODUCTION_MIGRATION.md
│   │   ├── integration_summary.md
│   │   └── UPDATE_STORES.md
│   │
│   ├── 📁 profile-v2.3/
│   │   └── integration-guide.md
│   │
│   ├── 📁 ui/
│   │   └── USER_JOURNEY_LIVE_2026.md
│   │
│   ├── 📁 ux-audit/
│   │   ├── UX_A11Y_FIX_PROMPTS.md
│   │   └── UX_AUDIT_EXEC_REPORT.md
│   │
│   ├── 📁 reports/
│   │   ├── 📁 audits/
│   │   ├── 📁 cleanup/
│   │   │   └── PROJECT_CLEANUP_REPORT.md
│   │   ├── 📁 deployments/
│   │   │   ├── FINAL_DEPLOY_REPORT.md
│   │   │   └── FINAL_DOCUMENTATION_UPDATE_REPORT.md
│   │   ├── 📁 diagnostics/ (9 files)
│   │   └── 📁 features/
│   │       ├── UI_USER_JOURNEY_AUDIT_STATUS.md
│   │       └── USER_JOURNEY_V2.2_UPDATE_SUMMARY.md
│   │
│   └── 📁 archive/
│       ├── 📁 2026-01-audit-logs/
│       ├── 📁 2026-01-deployment-ready-snapshot/
│       ├── 📁 2026-01-dev-db-backup/
│       └── 📁 2026-01-root-cleanup/
│
├── 📁 tests/
│   └── faq.spec.ts
│
├── 📁 scratch/
│   ├── PROFILE_LINKS_TABLE.txt
│   └── ROUTE_INVENTORY.txt
│
└── 📁 ‏‏Five Phases_/ (Phase Requirements)
    ├── Desktop.ini
    │
    ├── 📁 Phase 1/
    │   ├── eu-allergens-2023.ts
    │   ├── ifra-types.ts
    │   ├── ifra.service.ts
    │   ├── note-to-ingredient-map.ts
    │   ├── PHASE1_INTEGRATION_GUIDE.md
    │   ├── README_ المرحلة 1.md
    │   ├── README.md
    │   ├── schema.prisma
    │   └── seed.ts
    │
    ├── 📁 Phase 2/
    │   ├── 📁 Phase-specific files/
    │   │   ├── ifra.service.ts
    │   │   ├── match_route.ts
    │   │   ├── perfume-bridge.service.ts
    │   │   ├── PHASE2_INTEGRATION_GUIDE.md
    │   │   ├── README.md
    │   │   ├── SafetyWarnings.tsx
    │   │   ├── seed.ts
    │   │   ├── symptom-mappings.ts
    │   │   ├── symptom.service.ts
    │   │   └── unified-perfume.ts
    │   ├── 📁 القسم 1- IFRA Database/
    │   │   ├── eu-allergens-2023.ts
    │   │   ├── ifra.service.ts
    │   │   ├── note-to-ingredient-map.ts
    │   │   ├── schema.prisma
    │   │   ├── seed.ts
    │   │   ├── symptom-mappings.ts
    │   │   └── symptom.service.ts
    │   └── 📁 القسم 2- Bridge Layer/
    │       ├── match_route.ts
    │       ├── page.tsx
    │       ├── perfume_detail_page.tsx
    │       ├── perfume-bridge.service.ts
    │       ├── perfumes.ts
    │       ├── prisma.ts
    │       ├── SafetyWarnings.tsx
    │       └── unified-perfume.ts
    │
    ├── 📁 Phase 3/
    │   ├── BlurredTeaserCard.tsx
    │   ├── cron-reset-tests.ts
    │   ├── gating.ts
    │   ├── match-route.ts
    │   ├── migrate-favorites.ts
    │   ├── migration.sql
    │   ├── PHASE3_INTEGRATION_GUIDE.md
    │   ├── price-alerts-route.ts
    │   ├── PriceAlertButton.tsx
    │   ├── PriceComparisonTable.tsx
    │   ├── PricingPage.tsx
    │   ├── README.md
    │   ├── ResultsGrid.tsx
    │   ├── schema.prisma
    │   ├── TestHistory.tsx
    │   └── UpsellCard.tsx
    │
    ├── 📁 Phase 4/
    │   ├── create-checkout-route.ts
    │   ├── cron-jobs.ts
    │   ├── email.service.ts
    │   ├── INSTALLATION.md
    │   ├── moyasar-webhook-route.ts
    │   ├── moyasar.service.ts
    │   ├── PHASE4_INTEGRATION_GUIDE.md
    │   ├── PricingPage.tsx
    │   ├── README.md
    │   └── schema.prisma
    │
    ├── 📁 Phase 5/
    │   ├── dashboard_page.tsx
    │   ├── PHASE5_INTEGRATION_GUIDE.md
    │   ├── README.md
    │   ├── results_page.tsx
    │   └── UpgradePrompt.tsx
    │
    ├── 📁 متطلبات المرحلة الاولى/
    │   ├── backup-sqlite.ts
    │   ├── migrate-sqlite-to-postgres.ts
    │   ├── package.json
    │   ├── pasted_content.txt
    │   ├── verify-setup.ts
    │   ├── دليل الإعداد - صبا (Ask Seba).md
    │   └── ملخص تنفيذ المرحلة الأولى - Phase 1.md
    │
    ├── 📁 متطلبات المرحلة الثانية/
    │   ├── 📋 متطلبات المرحلة الثانية - Bridge Layer Integration.md
    │   ├── ifra.service.ts
    │   ├── perfume-bridge.service.ts
    │   ├── route.ts
    │   ├── SafetyWarnings.tsx
    │   ├── seed.ts
    │   ├── symptom-mappings.ts
    │   ├── symptom.service.ts
    │   └── unified-perfume.ts
    │
    ├── 📁 متطلبات المرحلة الثالثة/
    │   ├── 📋 تقرير متطلبات المرحلة الثالثة - Value Ladder System.md
    │   ├── auth_config.ts
    │   ├── BlurredTeaserCard.tsx
    │   ├── fixed_cron_route.ts
    │   ├── fixed_gating_ts.ts
    │   ├── fixed_match_route.ts
    │   ├── fixed_migrate_favorites.ts
    │   ├── fixed_price_alerts_route.ts
    │   ├── implementation_guide.md
    │   ├── nextauth_types.ts
    │   ├── page.tsx
    │   ├── PriceAlertButton.tsx
    │   ├── PriceComparisonTable.tsx
    │   ├── prisma_singleton.ts
    │   ├── ResultsGrid.tsx
    │   ├── schema.prisma
    │   ├── TestHistory.tsx
    │   └── UpsellCard.tsx
    │
    ├── 📁 متطلبات المرحلة الرابعة/
    │   ├── 📁 api/
    │   │   ├── 📁 cron/
    │   │   │   └── 📁 jobs/
    │   │   │       └── route.ts
    │   │   ├── 📁 payment/
    │   │   │   └── 📁 create-checkout/
    │   │   │       └── route.ts
    │   │   └── 📁 webhooks/
    │   │       └── 📁 moyasar/
    │   │           └── route.ts
    │   ├── 📁 app/
    │   │   └── 📁 pricing/
    │   │       └── page.tsx
    │   ├── 📁 lib/
    │   │   ├── 📁 email/
    │   │   │   └── email.service.ts
    │   │   └── 📁 payment/
    │   │       └── moyasar.service.ts
    │   ├── 📁 prisma/
    │   │   └── schema.prisma
    │   ├── PHASE4_INTEGRATION_GUIDE.md
    │   └── README.md
    │
    ├── 📁 متطلبات المرحلة الخامسة/
    │   ├── 📁 app/
    │   │   ├── 📁 dashboard/
    │   │   │   └── page.tsx
    │   │   └── 📁 results/
    │   │       └── page.tsx
    │   ├── 📁 components/
    │   │   └── 📁 ui/
    │   │       └── UpgradePrompt.tsx
    │   ├── PHASE5_INTEGRATION_GUIDE.md
    │   └── README.md
    │
    └── 📁 Modify application files/
        ├── dashboard_page.tsx
        ├── page.tsx
        ├── PricingPage.tsx
        ├── results_page.tsx
        ├── route.ts
        ├── schema.prisma
        └── seed.ts
```

---

## 📊 تصنيف الملفات حسب النوع

### 🔵 App Routes / Pages (Next.js App Router)
**المسار:** `src/app/`

| الملف | المسار الكامل | ملاحظات |
|------|--------------|---------|
| page.tsx | `src/app/page.tsx` | Home page |
| layout.tsx | `src/app/layout.tsx` | Root layout |
| error.tsx | `src/app/error.tsx` | Error boundary |
| not-found.tsx | `src/app/not-found.tsx` | 404 page |
| about/page.tsx | `src/app/about/page.tsx` | About page |
| dashboard/page.tsx | `src/app/dashboard/page.tsx` | Dashboard |
| faq/page.tsx | `src/app/faq/page.tsx` | FAQ page |
| feedback/page.tsx | `src/app/feedback/page.tsx` | Feedback page |
| login/page.tsx | `src/app/login/page.tsx` | Login page |
| register/page.tsx | `src/app/register/page.tsx` | Register page |
| profile/page.tsx | `src/app/profile/page.tsx` | User profile |
| privacy/page.tsx | `src/app/privacy/page.tsx` | Privacy page |
| settings/page.tsx | `src/app/settings/page.tsx` | Settings page |
| notifications/page.tsx | `src/app/notifications/page.tsx` | Notifications |
| results/page.tsx | `src/app/results/page.tsx` | Quiz results |
| perfume/[id]/page.tsx | `src/app/perfume/[id]/page.tsx` | Perfume detail |
| quiz/page.tsx | `src/app/quiz/page.tsx` | Quiz main |
| quiz/step1-favorites/page.tsx | `src/app/quiz/step1-favorites/page.tsx` | Quiz step 1 |
| quiz/step2-disliked/page.tsx | `src/app/quiz/step2-disliked/page.tsx` | Quiz step 2 |
| quiz/step3-allergy/page.tsx | `src/app/quiz/step3-allergy/page.tsx` | Quiz step 3 |
| test-header/page.tsx | `src/app/test-header/page.tsx` | Test page |

### 🔴 API Routes
**المسار:** `src/app/api/`

| الملف | المسار الكامل | Endpoint | ملاحظات |
|------|--------------|----------|---------|
| auth/[...nextauth]/route.ts | `src/app/api/auth/[...nextauth]/route.ts` | `/api/auth/*` | NextAuth handler |
| auth/register/route.ts | `src/app/api/auth/register/route.ts` | `/api/auth/register` | Registration |
| avatar/route.ts | `src/app/api/avatar/route.ts` | `/api/avatar` | Avatar upload |
| match/route.ts | `src/app/api/match/route.ts` | `/api/match` | Matching logic |
| perfumes/search/route.ts | `src/app/api/perfumes/search/route.ts` | `/api/perfumes/search` | Perfume search |
| perfumes/details/[fragellaId]/route.ts | `src/app/api/perfumes/details/[fragellaId]/route.ts` | `/api/perfumes/details/:id` | Perfume details |
| prices/compare/route.ts | `src/app/api/prices/compare/route.ts` | `/api/prices/compare` | Price comparison |
| results/favorites/route.ts | `src/app/api/results/favorites/route.ts` | `/api/results/favorites` | Favorites |
| user/favorites/route.ts | `src/app/api/user/favorites/route.ts` | `/api/user/favorites` | User favorites |
| feedback/suggestions/route.ts | `src/app/api/feedback/suggestions/route.ts` | `/api/feedback/suggestions` | Suggestions |
| feedback/suggestions/[id]/vote/route.ts | `src/app/api/feedback/suggestions/[id]/vote/route.ts` | `/api/feedback/suggestions/:id/vote` | Vote on suggestion |
| admin/suggestions/route.ts | `src/app/api/admin/suggestions/route.ts` | `/api/admin/suggestions` | Admin suggestions |
| admin/suggestions/[id]/approve/route.ts | `src/app/api/admin/suggestions/[id]/approve/route.ts` | `/api/admin/suggestions/:id/approve` | Approve suggestion |
| admin/suggestions/[id]/reject/route.ts | `src/app/api/admin/suggestions/[id]/reject/route.ts` | `/api/admin/suggestions/:id/reject` | Reject suggestion |
| cron/update-prices/route.ts | `src/app/api/cron/update-prices/route.ts` | `/api/cron/update-prices` | Cron job |

### 🟢 UI Components
**المسار:** `src/components/`

| الملف | المسار الكامل | نوع | ملاحظات |
|------|--------------|-----|---------|
| Header.tsx | `src/components/Header.tsx` | Layout | Main header |
| Footer.tsx | `src/components/Footer.tsx` | Layout | Footer |
| ErrorBoundary.tsx | `src/components/ErrorBoundary.tsx` | Error handling | Error boundary |
| LoadingSpinner.tsx | `src/components/LoadingSpinner.tsx` | UI | Loading indicator |
| NetworkStatusToast.tsx | `src/components/NetworkStatusToast.tsx` | UI | Network status |
| PWARegister.tsx | `src/components/PWARegister.tsx` | PWA | PWA registration |
| SessionProvider.tsx | `src/components/SessionProvider.tsx` | Auth | Session provider |
| ConditionalLayout.tsx | `src/components/ConditionalLayout.tsx` | Layout | Conditional layout |
| FeedbackCard.tsx | `src/components/FeedbackCard.tsx` | Feature | Feedback card |
| FeedbackModal.tsx | `src/components/FeedbackModal.tsx` | Feature | Feedback modal |
| AdminModal.tsx | `src/components/AdminModal.tsx` | Admin | Admin modal |
| quiz/SymptomCard.tsx | `src/components/quiz/SymptomCard.tsx` | Quiz | Symptom card |
| quiz/Step3Allergy.tsx | `src/components/quiz/Step3Allergy.tsx` | Quiz | Allergy step |

**UI Components (src/components/ui/):**
- avatar.tsx, Badge.tsx, button.tsx, CompactPerfumeCard.tsx, CounterBadge.tsx, CTAButton.tsx, dropdown-menu.tsx, EmptyState.tsx, FilterTabs.tsx, header.tsx, MobileFilterModal.tsx, PerfumeCard.tsx, PerfumeGrid.tsx, PerfumeSearchResult.tsx, PerfumeTimeline.tsx, RadarChart.tsx, SearchPerfumeBar.tsx, ShareButton.tsx, SmartImage.tsx, SpeedometerGauge.tsx, StatsGrid.tsx, tooltip.tsx, index.ts

### 🟡 Services / Business Logic
**المسار:** `src/lib/`

| الملف | المسار الكامل | الوظيفة | ملاحظات |
|------|--------------|---------|---------|
| auth.ts | `src/lib/auth.ts` | Authentication | Auth utilities |
| prisma.ts | `src/lib/prisma.ts` | Database | Prisma client |
| utils.ts | `src/lib/utils.ts` | Utilities | General utilities |
| matching.ts | `src/lib/matching.ts` | Matching | Perfume matching logic |
| scent-analysis.ts | `src/lib/scent-analysis.ts` | Analysis | Scent analysis |
| rate-limit.ts | `src/lib/rate-limit.ts` | Security | Rate limiting |
| posthog-client.ts | `src/lib/posthog-client.ts` | Analytics | PostHog client |
| clear-user-data.ts | `src/lib/clear-user-data.ts` | Data | User data cleanup |
| migrate-favorites.ts | `src/lib/migrate-favorites.ts` | Migration | Favorites migration |
| data/perfumes.ts | `src/lib/data/perfumes.ts` | Data | Perfume data |
| data/symptoms.ts | `src/lib/data/symptoms.ts` | Data | Symptoms data |
| services/perfume.service.ts | `src/lib/services/perfume.service.ts` | Service | Perfume service |
| utils/api-helpers.ts | `src/lib/utils/api-helpers.ts` | API | API helpers |
| utils/arabicPlural.ts | `src/lib/utils/arabicPlural.ts` | Localization | Arabic pluralization |
| utils/storage.ts | `src/lib/utils/storage.ts` | Storage | Storage utilities |

### 🟣 Hooks
**المسار:** `src/hooks/`

| الملف | المسار الكامل | الوظيفة |
|------|--------------|---------|
| useAnalytics.ts | `src/hooks/useAnalytics.ts` | Analytics tracking |
| useCrossTabLogout.ts | `src/hooks/useCrossTabLogout.ts` | Cross-tab logout |
| useDebounce.ts | `src/hooks/useDebounce.ts` | Debounce hook |
| useFavorites.ts | `src/hooks/useFavorites.ts` | Favorites management |
| useFocusTrap.ts | `src/hooks/useFocusTrap.ts` | Focus trap (a11y) |
| useNetworkStatus.ts | `src/hooks/useNetworkStatus.ts` | Network status |
| useResultsFilters.ts | `src/hooks/useResultsFilters.ts` | Results filtering |

### 🔶 Contexts
**المسار:** `src/contexts/`

| الملف | المسار الكامل | الوظيفة |
|------|--------------|---------|
| QuizContext.tsx | `src/contexts/QuizContext.tsx` | Quiz state management |

### 🟠 Database / Prisma
**المسار:** `prisma/`

| الملف | المسار الكامل | النوع | ملاحظات |
|------|--------------|------|---------|
| schema.prisma | `prisma/schema.prisma` | Schema | Database schema |
| seed.ts | `prisma/seed.ts` | Script | Database seeding |
| check-data.ts | `prisma/check-data.ts` | Script | Data validation |
| fill-prices.ts | `prisma/fill-prices.ts` | Script | Price filling |
| dev.db | `prisma/dev.db` | Database | SQLite database file |
| migrations/* | `prisma/migrations/*` | Migrations | 6 migration folders |

### ⚪ Configuration Files
**المسار:** Root + various

| الملف | المسار الكامل | النوع |
|------|--------------|------|
| package.json | `package.json` | Dependencies |
| tsconfig.json | `tsconfig.json` | TypeScript config |
| next.config.ts | `next.config.ts` | Next.js config |
| eslint.config.mjs | `eslint.config.mjs` | ESLint config |
| tailwind.config.ts | `tailwind.config.ts` | Tailwind config |
| postcss.config.mjs | `postcss.config.mjs` | PostCSS config |
| vercel.json | `vercel.json` | Vercel deployment |
| middleware.ts | `src/middleware.ts` | Next.js middleware |

### 📚 Documentation
**المسار:** `docs/` + root

| الملف | المسار الكامل | النوع |
|------|--------------|------|
| README.md | `README.md` | Main README |
| docs/*.md | `docs/*.md` | Various docs (37+ files) |

### 🧪 Tests
**المسار:** `tests/`

| الملف | المسار الكامل | النوع |
|------|--------------|------|
| faq.spec.ts | `tests/faq.spec.ts` | E2E test (Playwright) |

### 📦 Static Assets
**المسار:** `public/`

| الملف | المسار الكامل | النوع |
|------|--------------|------|
| manifest.json | `public/manifest.json` | PWA manifest |
| sw.js | `public/sw.js` | Service Worker |
| *.png, *.svg | `public/*` | Images/icons |

### 🔵 Five Phases_ — Phase Tracks Inventory
**المسار:** `‏‏Five Phases_/`

#### Track A: Phase 1..5 (English)

| الملف | المسار الكامل داخل Five Phases_ | النوع | ملاحظات |
|------|--------------------------------|------|---------|
| eu-allergens-2023.ts | `Phase 1/eu-allergens-2023.ts` | TS | - |
| ifra-types.ts | `Phase 1/ifra-types.ts` | TS | - |
| ifra.service.ts | `Phase 1/ifra.service.ts` | TS | - |
| note-to-ingredient-map.ts | `Phase 1/note-to-ingredient-map.ts` | TS | - |
| PHASE1_INTEGRATION_GUIDE.md | `Phase 1/PHASE1_INTEGRATION_GUIDE.md` | Doc | - |
| README_ المرحلة 1.md | `Phase 1/README_ المرحلة 1.md` | Doc | - |
| README.md | `Phase 1/README.md` | Doc | - |
| schema.prisma | `Phase 1/schema.prisma` | Prisma | - |
| seed.ts | `Phase 1/seed.ts` | TS | - |
| ifra.service.ts | `Phase 2/Phase-specific files/ifra.service.ts` | TS | - |
| match_route.ts | `Phase 2/Phase-specific files/match_route.ts` | TS | - |
| perfume-bridge.service.ts | `Phase 2/Phase-specific files/perfume-bridge.service.ts` | TS | - |
| PHASE2_INTEGRATION_GUIDE.md | `Phase 2/Phase-specific files/PHASE2_INTEGRATION_GUIDE.md` | Doc | - |
| README.md | `Phase 2/Phase-specific files/README.md` | Doc | - |
| SafetyWarnings.tsx | `Phase 2/Phase-specific files/SafetyWarnings.tsx` | TSX | - |
| seed.ts | `Phase 2/Phase-specific files/seed.ts` | TS | - |
| symptom-mappings.ts | `Phase 2/Phase-specific files/symptom-mappings.ts` | TS | - |
| symptom.service.ts | `Phase 2/Phase-specific files/symptom.service.ts` | TS | - |
| unified-perfume.ts | `Phase 2/Phase-specific files/unified-perfume.ts` | TS | - |
| eu-allergens-2023.ts | `Phase 2/القسم 1- IFRA Database/eu-allergens-2023.ts` | TS | - |
| ifra.service.ts | `Phase 2/القسم 1- IFRA Database/ifra.service.ts` | TS | - |
| note-to-ingredient-map.ts | `Phase 2/القسم 1- IFRA Database/note-to-ingredient-map.ts` | TS | - |
| schema.prisma | `Phase 2/القسم 1- IFRA Database/schema.prisma` | Prisma | - |
| seed.ts | `Phase 2/القسم 1- IFRA Database/seed.ts` | TS | - |
| symptom-mappings.ts | `Phase 2/القسم 1- IFRA Database/symptom-mappings.ts` | TS | - |
| symptom.service.ts | `Phase 2/القسم 1- IFRA Database/symptom.service.ts` | TS | - |
| match_route.ts | `Phase 2/القسم 2- Bridge Layer/match_route.ts` | TS | - |
| page.tsx | `Phase 2/القسم 2- Bridge Layer/page.tsx` | TSX | - |
| perfume_detail_page.tsx | `Phase 2/القسم 2- Bridge Layer/perfume_detail_page.tsx` | TSX | - |
| perfume-bridge.service.ts | `Phase 2/القسم 2- Bridge Layer/perfume-bridge.service.ts` | TS | - |
| perfumes.ts | `Phase 2/القسم 2- Bridge Layer/perfumes.ts` | TS | - |
| prisma.ts | `Phase 2/القسم 2- Bridge Layer/prisma.ts` | TS | - |
| SafetyWarnings.tsx | `Phase 2/القسم 2- Bridge Layer/SafetyWarnings.tsx` | TSX | - |
| unified-perfume.ts | `Phase 2/القسم 2- Bridge Layer/unified-perfume.ts` | TS | - |
| BlurredTeaserCard.tsx | `Phase 3/BlurredTeaserCard.tsx` | TSX | - |
| cron-reset-tests.ts | `Phase 3/cron-reset-tests.ts` | TS | - |
| gating.ts | `Phase 3/gating.ts` | TS | - |
| match-route.ts | `Phase 3/match-route.ts` | TS | - |
| migrate-favorites.ts | `Phase 3/migrate-favorites.ts` | TS | - |
| migration.sql | `Phase 3/migration.sql` | SQL | - |
| PHASE3_INTEGRATION_GUIDE.md | `Phase 3/PHASE3_INTEGRATION_GUIDE.md` | Doc | - |
| price-alerts-route.ts | `Phase 3/price-alerts-route.ts` | TS | - |
| PriceAlertButton.tsx | `Phase 3/PriceAlertButton.tsx` | TSX | - |
| PriceComparisonTable.tsx | `Phase 3/PriceComparisonTable.tsx` | TSX | - |
| PricingPage.tsx | `Phase 3/PricingPage.tsx` | TSX | - |
| README.md | `Phase 3/README.md` | Doc | - |
| ResultsGrid.tsx | `Phase 3/ResultsGrid.tsx` | TSX | - |
| schema.prisma | `Phase 3/schema.prisma` | Prisma | - |
| TestHistory.tsx | `Phase 3/TestHistory.tsx` | TSX | - |
| UpsellCard.tsx | `Phase 3/UpsellCard.tsx` | TSX | - |
| create-checkout-route.ts | `Phase 4/create-checkout-route.ts` | TS | - |
| cron-jobs.ts | `Phase 4/cron-jobs.ts` | TS | - |
| email.service.ts | `Phase 4/email.service.ts` | TS | - |
| INSTALLATION.md | `Phase 4/INSTALLATION.md` | Doc | - |
| moyasar-webhook-route.ts | `Phase 4/moyasar-webhook-route.ts` | TS | - |
| moyasar.service.ts | `Phase 4/moyasar.service.ts` | TS | - |
| PHASE4_INTEGRATION_GUIDE.md | `Phase 4/PHASE4_INTEGRATION_GUIDE.md` | Doc | - |
| PricingPage.tsx | `Phase 4/PricingPage.tsx` | TSX | - |
| README.md | `Phase 4/README.md` | Doc | - |
| schema.prisma | `Phase 4/schema.prisma` | Prisma | - |
| dashboard_page.tsx | `Phase 5/dashboard_page.tsx` | TSX | - |
| PHASE5_INTEGRATION_GUIDE.md | `Phase 5/PHASE5_INTEGRATION_GUIDE.md` | Doc | - |
| README.md | `Phase 5/README.md` | Doc | - |
| results_page.tsx | `Phase 5/results_page.tsx` | TSX | - |
| UpgradePrompt.tsx | `Phase 5/UpgradePrompt.tsx` | TSX | - |

#### Track B: متطلبات المرحلة 1..5 (Arabic)

| الملف | المسار الكامل داخل Five Phases_ | النوع | ملاحظات |
|------|--------------------------------|------|---------|
| backup-sqlite.ts | `متطلبات المرحلة الاولى/backup-sqlite.ts` | TS | - |
| migrate-sqlite-to-postgres.ts | `متطلبات المرحلة الاولى/migrate-sqlite-to-postgres.ts` | TS | - |
| package.json | `متطلبات المرحلة الاولى/package.json` | JSON | - |
| pasted_content.txt | `متطلبات المرحلة الاولى/pasted_content.txt` | Other | - |
| verify-setup.ts | `متطلبات المرحلة الاولى/verify-setup.ts` | TS | - |
| دليل الإعداد - صبا (Ask Seba).md | `متطلبات المرحلة الاولى/دليل الإعداد - صبا (Ask Seba).md` | Doc | - |
| ملخص تنفيذ المرحلة الأولى - Phase 1.md | `متطلبات المرحلة الاولى/ملخص تنفيذ المرحلة الأولى - Phase 1.md` | Doc | - |
| 📋 متطلبات المرحلة الثانية - Bridge Layer Integration.md | `متطلبات المرحلة الثانية/📋 متطلبات المرحلة الثانية - Bridge Layer Integration.md` | Doc | - |
| ifra.service.ts | `متطلبات المرحلة الثانية/ifra.service.ts` | TS | - |
| perfume-bridge.service.ts | `متطلبات المرحلة الثانية/perfume-bridge.service.ts` | TS | - |
| route.ts | `متطلبات المرحلة الثانية/route.ts` | TS | - |
| SafetyWarnings.tsx | `متطلبات المرحلة الثانية/SafetyWarnings.tsx` | TSX | - |
| seed.ts | `متطلبات المرحلة الثانية/seed.ts` | TS | - |
| symptom-mappings.ts | `متطلبات المرحلة الثانية/symptom-mappings.ts` | TS | - |
| symptom.service.ts | `متطلبات المرحلة الثانية/symptom.service.ts` | TS | - |
| unified-perfume.ts | `متطلبات المرحلة الثانية/unified-perfume.ts` | TS | - |
| 📋 تقرير متطلبات المرحلة الثالثة - Value Ladder System.md | `متطلبات المرحلة الثالثة/📋 تقرير متطلبات المرحلة الثالثة - Value Ladder System.md` | Doc | - |
| auth_config.ts | `متطلبات المرحلة الثالثة/auth_config.ts` | TS | - |
| BlurredTeaserCard.tsx | `متطلبات المرحلة الثالثة/BlurredTeaserCard.tsx` | TSX | - |
| fixed_cron_route.ts | `متطلبات المرحلة الثالثة/fixed_cron_route.ts` | TS | - |
| fixed_gating_ts.ts | `متطلبات المرحلة الثالثة/fixed_gating_ts.ts` | TS | - |
| fixed_match_route.ts | `متطلبات المرحلة الثالثة/fixed_match_route.ts` | TS | - |
| fixed_migrate_favorites.ts | `متطلبات المرحلة الثالثة/fixed_migrate_favorites.ts` | TS | - |
| fixed_price_alerts_route.ts | `متطلبات المرحلة الثالثة/fixed_price_alerts_route.ts` | TS | - |
| implementation_guide.md | `متطلبات المرحلة الثالثة/implementation_guide.md` | Doc | - |
| nextauth_types.ts | `متطلبات المرحلة الثالثة/nextauth_types.ts` | TS | - |
| page.tsx | `متطلبات المرحلة الثالثة/page.tsx` | TSX | - |
| PriceAlertButton.tsx | `متطلبات المرحلة الثالثة/PriceAlertButton.tsx` | TSX | - |
| PriceComparisonTable.tsx | `متطلبات المرحلة الثالثة/PriceComparisonTable.tsx` | TSX | - |
| prisma_singleton.ts | `متطلبات المرحلة الثالثة/prisma_singleton.ts` | TS | - |
| ResultsGrid.tsx | `متطلبات المرحلة الثالثة/ResultsGrid.tsx` | TSX | - |
| schema.prisma | `متطلبات المرحلة الثالثة/schema.prisma` | Prisma | - |
| TestHistory.tsx | `متطلبات المرحلة الثالثة/TestHistory.tsx` | TSX | - |
| UpsellCard.tsx | `متطلبات المرحلة الثالثة/UpsellCard.tsx` | TSX | - |
| api/cron/jobs/route.ts | `متطلبات المرحلة الرابعة/api/cron/jobs/route.ts` | TS | - |
| api/payment/create-checkout/route.ts | `متطلبات المرحلة الرابعة/api/payment/create-checkout/route.ts` | TS | - |
| api/webhooks/moyasar/route.ts | `متطلبات المرحلة الرابعة/api/webhooks/moyasar/route.ts` | TS | - |
| app/pricing/page.tsx | `متطلبات المرحلة الرابعة/app/pricing/page.tsx` | TSX | - |
| lib/email/email.service.ts | `متطلبات المرحلة الرابعة/lib/email/email.service.ts` | TS | - |
| lib/payment/moyasar.service.ts | `متطلبات المرحلة الرابعة/lib/payment/moyasar.service.ts` | TS | - |
| prisma/schema.prisma | `متطلبات المرحلة الرابعة/prisma/schema.prisma` | Prisma | - |
| PHASE4_INTEGRATION_GUIDE.md | `متطلبات المرحلة الرابعة/PHASE4_INTEGRATION_GUIDE.md` | Doc | - |
| README.md | `متطلبات المرحلة الرابعة/README.md` | Doc | - |
| app/dashboard/page.tsx | `متطلبات المرحلة الخامسة/app/dashboard/page.tsx` | TSX | - |
| app/results/page.tsx | `متطلبات المرحلة الخامسة/app/results/page.tsx` | TSX | - |
| components/ui/UpgradePrompt.tsx | `متطلبات المرحلة الخامسة/components/ui/UpgradePrompt.tsx` | TSX | - |
| PHASE5_INTEGRATION_GUIDE.md | `متطلبات المرحلة الخامسة/PHASE5_INTEGRATION_GUIDE.md` | Doc | - |
| README.md | `متطلبات المرحلة الخامسة/README.md` | Doc | - |

#### Track C: Modify application files

| الملف | المسار الكامل داخل Five Phases_ | النوع | ملاحظات |
|------|--------------------------------|------|---------|
| dashboard_page.tsx | `Modify application files/dashboard_page.tsx` | TSX | - |
| page.tsx | `Modify application files/page.tsx` | TSX | - |
| PricingPage.tsx | `Modify application files/PricingPage.tsx` | TSX | - |
| results_page.tsx | `Modify application files/results_page.tsx` | TSX | - |
| route.ts | `Modify application files/route.ts` | TS | - |
| schema.prisma | `Modify application files/schema.prisma` | Prisma | - |
| seed.ts | `Modify application files/seed.ts` | TS | - |

---

## ⚠️ ملفات كبيرة/طويلة محتملة

**ملاحظة:** التقديرات بناءً على البنية والأنماط المعتادة. سيتم التحقق الفعلي عند القراءة.

### ملفات محتملة أن تكون كبيرة:

1. **`src/lib/data/perfumes.ts`** - قد يحتوي على بيانات عطور كبيرة
2. **`src/lib/data/symptoms.ts`** - قد يحتوي على بيانات أعراض كبيرة
3. **`src/lib/matching.ts`** - قد يحتوي على منطق مطابقة معقد
4. **`src/lib/scent-analysis.ts`** - قد يحتوي على تحليل معقد
5. **`src/app/results/page.tsx`** - صفحة نتائج قد تكون معقدة
6. **`src/app/quiz/page.tsx`** - صفحة كويز رئيسية قد تكون معقدة
7. **`src/components/Header.tsx`** - قد يكون معقدًا
8. **`prisma/schema.prisma`** - قد يكون كبيرًا
9. **`src/middleware.ts`** - قد يحتوي على منطق معقد
10. **`src/app/layout.tsx`** - Layout رئيسي قد يكون معقدًا
11. **`‏‏Five Phases_/متطلبات المرحلة الرابعة/PHASE4_INTEGRATION_GUIDE.md`** - دليل تكامل طويل (353 سطر)
12. **`‏‏Five Phases_/متطلبات المرحلة الخامسة/PHASE5_INTEGRATION_GUIDE.md`** - دليل تكامل طويل (344 سطر)
13. **`‏‏Five Phases_/متطلبات المرحلة الرابعة/lib/email/email.service.ts`** - قد يحتوي على منطق إرسال إيميلات معقد
14. **`‏‏Five Phases_/متطلبات المرحلة الرابعة/lib/payment/moyasar.service.ts`** - قد يحتوي على منطق دفع معقد

### ملفات قد لا أتمكن من فتحها كاملة:

- **`prisma/dev.db`** - ملف قاعدة بيانات SQLite (binary)
- ملفات في `docs/archive/` - قد تكون كبيرة جدًا
- ملفات في `public/` - ملفات ثنائية (صور)

---

## 📋 Coverage Log (Initial)

**حالة:** جميع الملفات = **Not Read**

### Configuration Files
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| package.json | `package.json` | Not Read | - |
| package-lock.json | `package-lock.json` | Not Read | - |
| tsconfig.json | `tsconfig.json` | Not Read | - |
| next.config.ts | `next.config.ts` | Not Read | - |
| eslint.config.mjs | `eslint.config.mjs` | Not Read | - |
| tailwind.config.ts | `tailwind.config.ts` | Not Read | - |
| postcss.config.mjs | `postcss.config.mjs` | Not Read | - |
| vercel.json | `vercel.json` | Not Read | - |

### App Routes / Pages
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| page.tsx | `src/app/page.tsx` | Not Read | - |
| layout.tsx | `src/app/layout.tsx` | Not Read | - |
| error.tsx | `src/app/error.tsx` | Not Read | - |
| not-found.tsx | `src/app/not-found.tsx` | Not Read | - |
| about/page.tsx | `src/app/about/page.tsx` | Not Read | - |
| dashboard/page.tsx | `src/app/dashboard/page.tsx` | Not Read | - |
| faq/page.tsx | `src/app/faq/page.tsx` | Not Read | - |
| feedback/page.tsx | `src/app/feedback/page.tsx` | Not Read | - |
| login/page.tsx | `src/app/login/page.tsx` | Not Read | - |
| register/page.tsx | `src/app/register/page.tsx` | Not Read | - |
| profile/page.tsx | `src/app/profile/page.tsx` | Not Read | - |
| privacy/page.tsx | `src/app/privacy/page.tsx` | Not Read | - |
| settings/page.tsx | `src/app/settings/page.tsx` | Not Read | - |
| notifications/page.tsx | `src/app/notifications/page.tsx` | Not Read | - |
| results/page.tsx | `src/app/results/page.tsx` | Not Read | - |
| perfume/[id]/page.tsx | `src/app/perfume/[id]/page.tsx` | Not Read | - |
| quiz/page.tsx | `src/app/quiz/page.tsx` | Not Read | - |
| quiz/step1-favorites/page.tsx | `src/app/quiz/step1-favorites/page.tsx` | Not Read | - |
| quiz/step2-disliked/page.tsx | `src/app/quiz/step2-disliked/page.tsx` | Not Read | - |
| quiz/step3-allergy/page.tsx | `src/app/quiz/step3-allergy/page.tsx` | Not Read | - |
| test-header/page.tsx | `src/app/test-header/page.tsx` | Not Read | - |

### API Routes
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| auth/[...nextauth]/route.ts | `src/app/api/auth/[...nextauth]/route.ts` | Not Read | - |
| auth/register/route.ts | `src/app/api/auth/register/route.ts` | Not Read | - |
| avatar/route.ts | `src/app/api/avatar/route.ts` | Not Read | - |
| match/route.ts | `src/app/api/match/route.ts` | Not Read | - |
| perfumes/search/route.ts | `src/app/api/perfumes/search/route.ts` | Not Read | - |
| perfumes/details/[fragellaId]/route.ts | `src/app/api/perfumes/details/[fragellaId]/route.ts` | Not Read | - |
| prices/compare/route.ts | `src/app/api/prices/compare/route.ts` | Not Read | - |
| results/favorites/route.ts | `src/app/api/results/favorites/route.ts` | Not Read | - |
| user/favorites/route.ts | `src/app/api/user/favorites/route.ts` | Not Read | - |
| feedback/suggestions/route.ts | `src/app/api/feedback/suggestions/route.ts` | Not Read | - |
| feedback/suggestions/[id]/vote/route.ts | `src/app/api/feedback/suggestions/[id]/vote/route.ts` | Not Read | - |
| admin/suggestions/route.ts | `src/app/api/admin/suggestions/route.ts` | Not Read | - |
| admin/suggestions/[id]/approve/route.ts | `src/app/api/admin/suggestions/[id]/approve/route.ts` | Not Read | - |
| admin/suggestions/[id]/reject/route.ts | `src/app/api/admin/suggestions/[id]/reject/route.ts` | Not Read | - |
| cron/update-prices/route.ts | `src/app/api/cron/update-prices/route.ts` | Not Read | - |

### Components
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| Header.tsx | `src/components/Header.tsx` | Not Read | - |
| Footer.tsx | `src/components/Footer.tsx` | Not Read | - |
| ErrorBoundary.tsx | `src/components/ErrorBoundary.tsx` | Not Read | - |
| LoadingSpinner.tsx | `src/components/LoadingSpinner.tsx` | Not Read | - |
| NetworkStatusToast.tsx | `src/components/NetworkStatusToast.tsx` | Not Read | - |
| PWARegister.tsx | `src/components/PWARegister.tsx` | Not Read | - |
| SessionProvider.tsx | `src/components/SessionProvider.tsx` | Not Read | - |
| ConditionalLayout.tsx | `src/components/ConditionalLayout.tsx` | Not Read | - |
| FeedbackCard.tsx | `src/components/FeedbackCard.tsx` | Not Read | - |
| FeedbackModal.tsx | `src/components/FeedbackModal.tsx` | Not Read | - |
| AdminModal.tsx | `src/components/AdminModal.tsx` | Not Read | - |
| (جميع ملفات ui/) | `src/components/ui/*` | Not Read | - |
| (ملفات quiz/) | `src/components/quiz/*` | Not Read | - |

### Services / Libraries
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| auth.ts | `src/lib/auth.ts` | Not Read | - |
| prisma.ts | `src/lib/prisma.ts` | Not Read | - |
| utils.ts | `src/lib/utils.ts` | Not Read | - |
| matching.ts | `src/lib/matching.ts` | Not Read | - |
| scent-analysis.ts | `src/lib/scent-analysis.ts` | Not Read | - |
| rate-limit.ts | `src/lib/rate-limit.ts` | Not Read | - |
| posthog-client.ts | `src/lib/posthog-client.ts` | Not Read | - |
| clear-user-data.ts | `src/lib/clear-user-data.ts` | Not Read | - |
| migrate-favorites.ts | `src/lib/migrate-favorites.ts` | Not Read | - |
| data/perfumes.ts | `src/lib/data/perfumes.ts` | Not Read | - |
| data/symptoms.ts | `src/lib/data/symptoms.ts` | Not Read | - |
| services/perfume.service.ts | `src/lib/services/perfume.service.ts` | Not Read | - |
| utils/api-helpers.ts | `src/lib/utils/api-helpers.ts` | Not Read | - |
| utils/arabicPlural.ts | `src/lib/utils/arabicPlural.ts` | Not Read | - |
| utils/storage.ts | `src/lib/utils/storage.ts` | Not Read | - |

### Hooks
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| useAnalytics.ts | `src/hooks/useAnalytics.ts` | Not Read | - |
| useCrossTabLogout.ts | `src/hooks/useCrossTabLogout.ts` | Not Read | - |
| useDebounce.ts | `src/hooks/useDebounce.ts` | Not Read | - |
| useFavorites.ts | `src/hooks/useFavorites.ts` | Not Read | - |
| useFocusTrap.ts | `src/hooks/useFocusTrap.ts` | Not Read | - |
| useNetworkStatus.ts | `src/hooks/useNetworkStatus.ts` | Not Read | - |
| useResultsFilters.ts | `src/hooks/useResultsFilters.ts` | Not Read | - |

### Contexts
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| QuizContext.tsx | `src/contexts/QuizContext.tsx` | Not Read | - |

### Database / Prisma
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| schema.prisma | `prisma/schema.prisma` | Not Read | - |
| seed.ts | `prisma/seed.ts` | Not Read | - |
| check-data.ts | `prisma/check-data.ts` | Not Read | - |
| fill-prices.ts | `prisma/fill-prices.ts` | Not Read | - |
| dev.db | `prisma/dev.db` | Not Read | Binary file - قد لا يُقرأ |
| migrations/* | `prisma/migrations/*` | Not Read | - |

### Core Files
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| middleware.ts | `src/middleware.ts` | Not Read | - |
| middleware.backup | `src/middleware.backup` | Not Read | - |
| auth.ts | `src/auth.ts` | Not Read | - |
| types/next-auth.d.ts | `src/types/next-auth.d.ts` | Not Read | - |
| content/content.json | `src/content/content.json` | Not Read | - |

### Documentation
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| README.md | `README.md` | Not Read | - |
| (جميع ملفات docs/) | `docs/*.md` | Not Read | 37+ ملفات |

### Tests
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| faq.spec.ts | `tests/faq.spec.ts` | Not Read | - |
| test-auth.ts | `test-auth.ts` | Not Read | - |

### Static Assets
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| manifest.json | `public/manifest.json` | Not Read | - |
| sw.js | `public/sw.js` | Not Read | - |
| offline.html | `public/offline.html` | Not Read | - |
| (ملفات صور) | `public/*.png, *.svg` | Not Read | Binary files |

### Other Files
| الملف | المسار | الحالة | ملاحظات |
|------|--------|--------|---------|
| scratch/* | `scratch/*` | Not Read | - |

### Coverage Log — Five Phases_
**حالة:** جميع الملفات = **Not Read**

#### Track A: Phase 1..5 (English)
| الملف | المسار داخل Five Phases_ | الحالة | ملاحظات |
|------|-------------------------|--------|---------|
| eu-allergens-2023.ts | `Phase 1/eu-allergens-2023.ts` | Not Read | - |
| ifra-types.ts | `Phase 1/ifra-types.ts` | Not Read | - |
| ifra.service.ts | `Phase 1/ifra.service.ts` | Not Read | - |
| note-to-ingredient-map.ts | `Phase 1/note-to-ingredient-map.ts` | Not Read | - |
| PHASE1_INTEGRATION_GUIDE.md | `Phase 1/PHASE1_INTEGRATION_GUIDE.md` | Not Read | - |
| README_ المرحلة 1.md | `Phase 1/README_ المرحلة 1.md` | Not Read | - |
| README.md | `Phase 1/README.md` | Not Read | - |
| schema.prisma | `Phase 1/schema.prisma` | Not Read | - |
| seed.ts | `Phase 1/seed.ts` | Not Read | - |
| ifra.service.ts | `Phase 2/Phase-specific files/ifra.service.ts` | Not Read | - |
| match_route.ts | `Phase 2/Phase-specific files/match_route.ts` | Not Read | - |
| perfume-bridge.service.ts | `Phase 2/Phase-specific files/perfume-bridge.service.ts` | Not Read | - |
| PHASE2_INTEGRATION_GUIDE.md | `Phase 2/Phase-specific files/PHASE2_INTEGRATION_GUIDE.md` | Not Read | - |
| README.md | `Phase 2/Phase-specific files/README.md` | Not Read | - |
| SafetyWarnings.tsx | `Phase 2/Phase-specific files/SafetyWarnings.tsx` | Not Read | - |
| seed.ts | `Phase 2/Phase-specific files/seed.ts` | Not Read | - |
| symptom-mappings.ts | `Phase 2/Phase-specific files/symptom-mappings.ts` | Not Read | - |
| symptom.service.ts | `Phase 2/Phase-specific files/symptom.service.ts` | Not Read | - |
| unified-perfume.ts | `Phase 2/Phase-specific files/unified-perfume.ts` | Not Read | - |
| eu-allergens-2023.ts | `Phase 2/القسم 1- IFRA Database/eu-allergens-2023.ts` | Not Read | - |
| ifra.service.ts | `Phase 2/القسم 1- IFRA Database/ifra.service.ts` | Not Read | - |
| note-to-ingredient-map.ts | `Phase 2/القسم 1- IFRA Database/note-to-ingredient-map.ts` | Not Read | - |
| schema.prisma | `Phase 2/القسم 1- IFRA Database/schema.prisma` | Not Read | - |
| seed.ts | `Phase 2/القسم 1- IFRA Database/seed.ts` | Not Read | - |
| symptom-mappings.ts | `Phase 2/القسم 1- IFRA Database/symptom-mappings.ts` | Not Read | - |
| symptom.service.ts | `Phase 2/القسم 1- IFRA Database/symptom.service.ts` | Not Read | - |
| match_route.ts | `Phase 2/القسم 2- Bridge Layer/match_route.ts` | Not Read | - |
| page.tsx | `Phase 2/القسم 2- Bridge Layer/page.tsx` | Not Read | - |
| perfume_detail_page.tsx | `Phase 2/القسم 2- Bridge Layer/perfume_detail_page.tsx` | Not Read | - |
| perfume-bridge.service.ts | `Phase 2/القسم 2- Bridge Layer/perfume-bridge.service.ts` | Not Read | - |
| perfumes.ts | `Phase 2/القسم 2- Bridge Layer/perfumes.ts` | Not Read | - |
| prisma.ts | `Phase 2/القسم 2- Bridge Layer/prisma.ts` | Not Read | - |
| SafetyWarnings.tsx | `Phase 2/القسم 2- Bridge Layer/SafetyWarnings.tsx` | Not Read | - |
| unified-perfume.ts | `Phase 2/القسم 2- Bridge Layer/unified-perfume.ts` | Not Read | - |
| BlurredTeaserCard.tsx | `Phase 3/BlurredTeaserCard.tsx` | Not Read | - |
| cron-reset-tests.ts | `Phase 3/cron-reset-tests.ts` | Not Read | - |
| gating.ts | `Phase 3/gating.ts` | Not Read | - |
| match-route.ts | `Phase 3/match-route.ts` | Not Read | - |
| migrate-favorites.ts | `Phase 3/migrate-favorites.ts` | Not Read | - |
| migration.sql | `Phase 3/migration.sql` | Not Read | - |
| PHASE3_INTEGRATION_GUIDE.md | `Phase 3/PHASE3_INTEGRATION_GUIDE.md` | Not Read | - |
| price-alerts-route.ts | `Phase 3/price-alerts-route.ts` | Not Read | - |
| PriceAlertButton.tsx | `Phase 3/PriceAlertButton.tsx` | Not Read | - |
| PriceComparisonTable.tsx | `Phase 3/PriceComparisonTable.tsx` | Not Read | - |
| PricingPage.tsx | `Phase 3/PricingPage.tsx` | Not Read | - |
| README.md | `Phase 3/README.md` | Not Read | - |
| ResultsGrid.tsx | `Phase 3/ResultsGrid.tsx` | Not Read | - |
| schema.prisma | `Phase 3/schema.prisma` | Not Read | - |
| TestHistory.tsx | `Phase 3/TestHistory.tsx` | Not Read | - |
| UpsellCard.tsx | `Phase 3/UpsellCard.tsx` | Not Read | - |
| create-checkout-route.ts | `Phase 4/create-checkout-route.ts` | Not Read | - |
| cron-jobs.ts | `Phase 4/cron-jobs.ts` | Not Read | - |
| email.service.ts | `Phase 4/email.service.ts` | Not Read | - |
| INSTALLATION.md | `Phase 4/INSTALLATION.md` | Not Read | - |
| moyasar-webhook-route.ts | `Phase 4/moyasar-webhook-route.ts` | Not Read | - |
| moyasar.service.ts | `Phase 4/moyasar.service.ts` | Not Read | - |
| PHASE4_INTEGRATION_GUIDE.md | `Phase 4/PHASE4_INTEGRATION_GUIDE.md` | Not Read | - |
| PricingPage.tsx | `Phase 4/PricingPage.tsx` | Not Read | - |
| README.md | `Phase 4/README.md` | Not Read | - |
| schema.prisma | `Phase 4/schema.prisma` | Not Read | - |
| dashboard_page.tsx | `Phase 5/dashboard_page.tsx` | Not Read | - |
| PHASE5_INTEGRATION_GUIDE.md | `Phase 5/PHASE5_INTEGRATION_GUIDE.md` | Not Read | - |
| README.md | `Phase 5/README.md` | Not Read | - |
| results_page.tsx | `Phase 5/results_page.tsx` | Not Read | - |
| UpgradePrompt.tsx | `Phase 5/UpgradePrompt.tsx` | Not Read | - |

#### Track B: متطلبات المرحلة 1..5 (Arabic)
| الملف | المسار داخل Five Phases_ | الحالة | ملاحظات |
|------|-------------------------|--------|---------|
| backup-sqlite.ts | `متطلبات المرحلة الاولى/backup-sqlite.ts` | Not Read | - |
| migrate-sqlite-to-postgres.ts | `متطلبات المرحلة الاولى/migrate-sqlite-to-postgres.ts` | Not Read | - |
| package.json | `متطلبات المرحلة الاولى/package.json` | Not Read | - |
| pasted_content.txt | `متطلبات المرحلة الاولى/pasted_content.txt` | Not Read | - |
| verify-setup.ts | `متطلبات المرحلة الاولى/verify-setup.ts` | Not Read | - |
| دليل الإعداد - صبا (Ask Seba).md | `متطلبات المرحلة الاولى/دليل الإعداد - صبا (Ask Seba).md` | Not Read | - |
| ملخص تنفيذ المرحلة الأولى - Phase 1.md | `متطلبات المرحلة الاولى/ملخص تنفيذ المرحلة الأولى - Phase 1.md` | Not Read | - |
| 📋 متطلبات المرحلة الثانية - Bridge Layer Integration.md | `متطلبات المرحلة الثانية/📋 متطلبات المرحلة الثانية - Bridge Layer Integration.md` | Not Read | - |
| ifra.service.ts | `متطلبات المرحلة الثانية/ifra.service.ts` | Not Read | - |
| perfume-bridge.service.ts | `متطلبات المرحلة الثانية/perfume-bridge.service.ts` | Not Read | - |
| route.ts | `متطلبات المرحلة الثانية/route.ts` | Not Read | - |
| SafetyWarnings.tsx | `متطلبات المرحلة الثانية/SafetyWarnings.tsx` | Not Read | - |
| seed.ts | `متطلبات المرحلة الثانية/seed.ts` | Not Read | - |
| symptom-mappings.ts | `متطلبات المرحلة الثانية/symptom-mappings.ts` | Not Read | - |
| symptom.service.ts | `متطلبات المرحلة الثانية/symptom.service.ts` | Not Read | - |
| unified-perfume.ts | `متطلبات المرحلة الثانية/unified-perfume.ts` | Not Read | - |
| 📋 تقرير متطلبات المرحلة الثالثة - Value Ladder System.md | `متطلبات المرحلة الثالثة/📋 تقرير متطلبات المرحلة الثالثة - Value Ladder System.md` | Not Read | - |
| auth_config.ts | `متطلبات المرحلة الثالثة/auth_config.ts` | Not Read | - |
| BlurredTeaserCard.tsx | `متطلبات المرحلة الثالثة/BlurredTeaserCard.tsx` | Not Read | - |
| fixed_cron_route.ts | `متطلبات المرحلة الثالثة/fixed_cron_route.ts` | Not Read | - |
| fixed_gating_ts.ts | `متطلبات المرحلة الثالثة/fixed_gating_ts.ts` | Not Read | - |
| fixed_match_route.ts | `متطلبات المرحلة الثالثة/fixed_match_route.ts` | Not Read | - |
| fixed_migrate_favorites.ts | `متطلبات المرحلة الثالثة/fixed_migrate_favorites.ts` | Not Read | - |
| fixed_price_alerts_route.ts | `متطلبات المرحلة الثالثة/fixed_price_alerts_route.ts` | Not Read | - |
| implementation_guide.md | `متطلبات المرحلة الثالثة/implementation_guide.md` | Not Read | - |
| nextauth_types.ts | `متطلبات المرحلة الثالثة/nextauth_types.ts` | Not Read | - |
| page.tsx | `متطلبات المرحلة الثالثة/page.tsx` | Not Read | - |
| PriceAlertButton.tsx | `متطلبات المرحلة الثالثة/PriceAlertButton.tsx` | Not Read | - |
| PriceComparisonTable.tsx | `متطلبات المرحلة الثالثة/PriceComparisonTable.tsx` | Not Read | - |
| prisma_singleton.ts | `متطلبات المرحلة الثالثة/prisma_singleton.ts` | Not Read | - |
| ResultsGrid.tsx | `متطلبات المرحلة الثالثة/ResultsGrid.tsx` | Not Read | - |
| schema.prisma | `متطلبات المرحلة الثالثة/schema.prisma` | Not Read | - |
| TestHistory.tsx | `متطلبات المرحلة الثالثة/TestHistory.tsx` | Not Read | - |
| UpsellCard.tsx | `متطلبات المرحلة الثالثة/UpsellCard.tsx` | Not Read | - |
| api/cron/jobs/route.ts | `متطلبات المرحلة الرابعة/api/cron/jobs/route.ts` | Not Read | - |
| api/payment/create-checkout/route.ts | `متطلبات المرحلة الرابعة/api/payment/create-checkout/route.ts` | Not Read | - |
| api/webhooks/moyasar/route.ts | `متطلبات المرحلة الرابعة/api/webhooks/moyasar/route.ts` | Not Read | - |
| app/pricing/page.tsx | `متطلبات المرحلة الرابعة/app/pricing/page.tsx` | Not Read | - |
| lib/email/email.service.ts | `متطلبات المرحلة الرابعة/lib/email/email.service.ts` | Not Read | - |
| lib/payment/moyasar.service.ts | `متطلبات المرحلة الرابعة/lib/payment/moyasar.service.ts` | Not Read | - |
| prisma/schema.prisma | `متطلبات المرحلة الرابعة/prisma/schema.prisma` | Not Read | - |
| PHASE4_INTEGRATION_GUIDE.md | `متطلبات المرحلة الرابعة/PHASE4_INTEGRATION_GUIDE.md` | Not Read | - |
| README.md | `متطلبات المرحلة الرابعة/README.md` | Not Read | - |
| app/dashboard/page.tsx | `متطلبات المرحلة الخامسة/app/dashboard/page.tsx` | Not Read | - |
| app/results/page.tsx | `متطلبات المرحلة الخامسة/app/results/page.tsx` | Not Read | - |
| components/ui/UpgradePrompt.tsx | `متطلبات المرحلة الخامسة/components/ui/UpgradePrompt.tsx` | Not Read | - |
| PHASE5_INTEGRATION_GUIDE.md | `متطلبات المرحلة الخامسة/PHASE5_INTEGRATION_GUIDE.md` | Not Read | - |
| README.md | `متطلبات المرحلة الخامسة/README.md` | Not Read | - |

#### Track C: Modify application files
| الملف | المسار داخل Five Phases_ | الحالة | ملاحظات |
|------|-------------------------|--------|---------|
| dashboard_page.tsx | `Modify application files/dashboard_page.tsx` | Not Read | - |
| page.tsx | `Modify application files/page.tsx` | Not Read | - |
| PricingPage.tsx | `Modify application files/PricingPage.tsx` | Not Read | - |
| results_page.tsx | `Modify application files/results_page.tsx` | Not Read | - |
| route.ts | `Modify application files/route.ts` | Not Read | - |
| schema.prisma | `Modify application files/schema.prisma` | Not Read | - |
| seed.ts | `Modify application files/seed.ts` | Not Read | - |

#### Root Files
| الملف | المسار داخل Five Phases_ | الحالة | ملاحظات |
|------|-------------------------|--------|---------|
| Desktop.ini | `‏‏Five Phases_/Desktop.ini` | Not Read | - |

---

## 🔍 Visibility Limits - حدود الرؤية

### ملفات/مجلدات لم أتمكن من فحصها بالكامل:

1. **`docs/archive/`** - يحتوي على مجلدات فرعية قد تحتوي على ملفات كثيرة:
   - `2026-01-audit-logs/`
   - `2026-01-deployment-ready-snapshot/`
   - `2026-01-dev-db-backup/`
   - `2026-01-root-cleanup/`
   - **ملاحظة:** لم أفحص محتوياتها بالكامل

2. **`docs/reports/audits/`** - مجلد فارغ أو يحتوي على ملفات غير مرئية

3. **`docs/reports/fixes/`** - قد يحتوي على ملفات إضافية

4. **ملفات ثنائية:**
   - `prisma/dev.db` - ملف قاعدة بيانات SQLite (binary)
   - جميع ملفات الصور في `public/` (`.png`, `.svg`)
   - ملفات `.ico`

5. **ملفات قد تكون كبيرة جدًا:**
   - ملفات في `docs/archive/` قد تكون كبيرة
   - ملفات التوثيق الكبيرة في `docs/`

6. **`‏‏Five Phases_/` - تم فحصه بالكامل:**
   - جميع المجلدات والملفات داخل `‏‏Five Phases_/` تم فحصها
   - لا توجد قيود رؤية معروفة
   - **ملاحظة:** بعض الملفات قد تحتوي على محتوى كبير (مثل Integration Guides)

### ملفات غير مرئية (قد تكون مخفية أو في .gitignore):

- ملفات `.env*` (عادة مخفية)
- `node_modules/` (غير موجود في القائمة)
- `.next/` (غير موجود في القائمة)
- ملفات أخرى قد تكون في `.gitignore`

---

## 📊 إحصائيات أولية

- **إجمالي الملفات المكتشفة:** ~334+ ملف
- **ملفات TypeScript/TSX:** ~200+ ملف
- **ملفات API Routes:** 18 ملف (15 موجودة + 3 جديدة من Phase 4)
- **ملفات Pages:** ~22 ملف (20 موجودة + 2 جديدة من Phase 5)
- **ملفات Components:** ~41+ ملف (40 موجودة + 1 جديد من Phase 5)
- **ملفات Documentation:** 50+ ملف (37 موجودة + 13+ من Five Phases_)
- **ملفات Database/Migrations:** 7+ ملفات SQL
- **ملفات Configuration:** 8+ ملفات
- **Files under Five Phases_:** ~120 ملف (Phase 1-5 + متطلبات المراحل + Modify application files)

---

## ✅ حالة Inventory

**تم إكمال:** ✅ Project Inventory  
**تم إكمال:** ✅ Coverage Log (Initial)  
**تم إكمال:** ✅ تصنيف الملفات  
**تم إكمال:** ✅ تحديد الملفات الكبيرة المحتملة  
**تم إكمال:** ✅ Visibility Limits  

---

**ملاحظة نهائية:** هذه هي الملفات التي أستطيع رؤيتها ضمن السياق الحالي. قد تكون هناك ملفات إضافية في مجلدات الأرشيف أو ملفات مخفية لم يتم اكتشافها بعد.

---

## ❓ السؤال التالي

**هل تريد التشريح حسب المجلدات أم حسب الموضوع؟ وما هي أولويات P0؟**
