# 🚨 Diagnostic Report: Ask Seba Price Comparison Readiness

**Date:** 2026-01-14  
**Status:** PARTIAL IMPLEMENTATION

---

## 📊 EXECUTIVE SUMMARY

Ask Seba has **PARTIAL** price comparison functionality:
- ✅ **UI Component exists** (`PerfumeDetailCTA.tsx`) with store links
- ✅ **Database schema** has `price` field in `Perfume` model
- ⚠️ **Prices are MOCK/HARDCODED** (not real-time)
- ❌ **No API routes** for price comparison
- ❌ **No web scraping** infrastructure
- ❌ **No Store/Price models** in database

---

## 1️⃣ DB MODELS

### Current Schema (prisma/schema.prisma):

```
✅ Perfume {
  id: String
  name: String
  brand: String
  image: String
  description: String?
  price: Float?                    ← EXISTS but nullable
  baseScore: Int
  ...
}

❌ Store { }                       ← MISSING
❌ Price { }                       ← MISSING
❌ PriceHistory { }                ← MISSING
❌ StorePrice { }                  ← MISSING
```

### Database Status:
- **Provider:** SQLite (dev.db)
- **Models:** 5 total (Suggestion, Vote, Perfume, UserPreference, UserFavorite)
- **Price Field:** ✅ EXISTS (`price Float?`) but nullable
- **Store Models:** ❌ NOT FOUND
- **Price Tracking:** ❌ NOT FOUND

---

## 2️⃣ API ROUTES

### Current API Structure:
```
src/app/api/
├── auth/[...nextauth]/route.ts          ✅ Auth
├── avatar/route.ts                      ✅ Avatar upload
├── feedback/
│   ├── suggestions/route.ts             ✅ Feedback
│   └── suggestions/[id]/vote/route.ts   ✅ Voting
├── match/route.ts                       ✅ Matching
├── perfumes/
│   └── search/route.ts                  ✅ Search
├── results/
│   └── favorites/route.ts               ✅ Favorites
└── user/
    └── favorites/route.ts               ✅ User favorites
```

### Missing API Routes:
```
❌ /api/prices/
   ├── compare?perfumeId=xxx
   ├── stores
   └── update

❌ /api/stores/
   ├── list
   ├── [storeId]/prices
   └── sync

❌ /api/scraping/
   └── update-prices
```

---

## 3️⃣ UI COMPONENTS

### Existing Components:

✅ **PerfumeDetailCTA.tsx** (src/app/perfume/[id]/PerfumeDetailCTA.tsx)
- **Status:** ✅ FULLY IMPLEMENTED
- **Features:**
  - "قارن الأسعار" button with dropdown
  - 3 store links: Noon, Namshi, 6thStreet
  - Price display (SAR)
  - Store-specific search URLs
- **Prices:** MOCK (hardcoded logic: `basePrice`, `noonPrice`, `namshiPrice = basePrice - 15`)
- **Limitations:**
  - Prices are not real-time
  - No price tracking/history
  - No store availability status
  - No price alerts

✅ **PerfumeCard.tsx** (src/components/ui/PerfumeCard.tsx)
- **Status:** ❌ NO PRICE DISPLAY
- **Features:**
  - Image, brand, name, match percentage
  - Safety badges
  - Selection logic
- **Missing:** Price field not displayed

### Component Structure:
```
src/components/ui/
├── PerfumeCard.tsx                    ✅ (no price display)
├── CompactPerfumeCard.tsx             ❓ (need to check)
├── PerfumeGrid.tsx                    ✅
└── ...
```

---

## 4️⃣ DEPENDENCIES

### Current Package.json:
```json
{
  "dependencies": {
    "@prisma/client": "^6.19.1",      ✅ Database ORM
    "next": "16.1.1",                  ✅ Framework
    "react": "19.2.3",                 ✅ UI Library
    ...
  },
  "devDependencies": {
    "prisma": "^6.19.1",               ✅ Schema management
    ...
  }
}
```

### Missing Dependencies:
```
❌ axios                          (for HTTP requests to store APIs)
❌ cheerio                        (for HTML parsing/web scraping)
❌ puppeteer                      (for dynamic page scraping)
❌ node-cron / cron               (for scheduled price updates)
❌ @types/node-cron               (TypeScript types)
```

### Installed Packages:
```bash
npm ls | grep -E "axios|cheerio|puppeteer|prisma|@prisma"
# Output:
# +-- @prisma/client@6.19.1      ✅
# +-- prisma@6.19.1              ✅
```

---

## 5️⃣ CURRENT IMPLEMENTATION DETAILS

### Price Comparison Component (`PerfumeDetailCTA.tsx`):

**Stores Integrated:**
1. **Noon** - `https://www.noon.com/saudi-en/search?q={brand} {name}&o=askseba`
2. **Namshi** - `https://www.namshi.com/sa-ar/search?q={brand} {name}`
3. **6thStreet** - `https://sa-en.6thstreet.com/search?q={brand} {name}`

**Price Logic (MOCK):**
```typescript
const basePrice = perfume.price || 299  // Fallback to 299 if null
const noonPrice = basePrice             // Same as base
const namshiPrice = basePrice > 15 ? basePrice - 15 : basePrice  // -15 SAR
```

**UI Flow:**
1. User clicks "قارن الأسعار" button
2. Dropdown shows 3 store links with prices
3. Links open external stores in new tab
4. Prices are static (not fetched from stores)

---

## 6️⃣ GAPS ANALYSIS

### Critical Gaps:

1. **❌ No Real-Time Price Data**
   - Prices are hardcoded/mock
   - No API integration with stores
   - No web scraping infrastructure

2. **❌ No Database Models for Stores/Prices**
   - Missing `Store` model
   - Missing `Price` or `StorePrice` model
   - Missing `PriceHistory` for tracking

3. **❌ No Price Update System**
   - No scheduled jobs (cron)
   - No background workers
   - No price tracking/history

4. **❌ No API Endpoints**
   - No `/api/prices/compare`
   - No `/api/stores/` endpoints
   - No price sync endpoints

5. **⚠️ Limited UI Integration**
   - Price comparison only in `PerfumeDetailCTA`
   - No price display in `PerfumeCard`
   - No price alerts/notifications

6. **❌ No Store Integration**
   - No affiliate links/API keys
   - No store availability checks
   - No store ratings/reviews

---

## 7️⃣ READY ASSESSMENT

### ✅ What's Ready:

1. **Database Schema Foundation**
   - `Perfume.price` field exists (nullable Float)
   - Prisma ORM configured
   - Database connection working

2. **UI Component**
   - `PerfumeDetailCTA` component fully functional
   - Store links working
   - Price display UI implemented

3. **Store Links**
   - 3 major stores integrated (Noon, Namshi, 6thStreet)
   - Search URLs formatted correctly
   - External links working

### ❌ What's Missing:

1. **Real-Time Price Data**
   - No scraping infrastructure
   - No API integrations
   - No price update system

2. **Database Models**
   - No Store model
   - No Price tracking model
   - No price history

3. **Backend Infrastructure**
   - No price comparison API
   - No scheduled jobs
   - No background workers

4. **Advanced Features**
   - No price alerts
   - No price history graphs
   - No store availability status
   - No affiliate tracking

---

## 8️⃣ RECOMMENDATIONS

### Phase 1: Basic Real-Time Prices (MVP)
1. ✅ Create `Store` and `Price` models in Prisma
2. ✅ Set up web scraping for 3 stores (or API if available)
3. ✅ Create `/api/prices/compare` endpoint
4. ✅ Update `PerfumeDetailCTA` to fetch real prices
5. ✅ Add scheduled job for daily price updates

### Phase 2: Enhanced Features
1. ⚠️ Add price history tracking
2. ⚠️ Add price alerts for users
3. ⚠️ Display prices in `PerfumeCard`
4. ⚠️ Add store availability status
5. ⚠️ Add affiliate link tracking

### Phase 3: Advanced Features
1. 🔮 Price trends/graphs
2. 🔮 Multi-store comparison table
3. 🔮 Price drop notifications
4. 🔮 Store reviews/ratings
5. 🔮 Price prediction ML model

---

## 📋 OUTPUT FORMAT

```
DB MODELS: 
✅ Perfume.price (Float?, nullable)
❌ Store (missing)
❌ Price/StorePrice (missing)
❌ PriceHistory (missing)

API ROUTES: 
✅ /api/perfumes/search
❌ /api/prices/compare (missing)
❌ /api/stores/ (missing)
❌ /api/scraping/update-prices (missing)

UI COMPONENTS: 
✅ PerfumeDetailCTA.tsx (full implementation with 3 stores)
❌ PerfumeCard.tsx (no price display)
✅ Store links working (Noon, Namshi, 6thStreet)

DEPENDENCIES: 
✅ @prisma/client@6.19.1
✅ prisma@6.19.1
❌ axios (missing)
❌ cheerio (missing)
❌ puppeteer (missing)
❌ node-cron (missing)

READY: 
PARTIAL - UI component exists and works, but prices are MOCK/HARDCODED.
Real-time price comparison requires:
- Database models (Store, Price)
- Web scraping infrastructure
- API endpoints
- Scheduled price updates

GAPS: 
1. No real-time price data (hardcoded prices)
2. No Store/Price models in database
3. No price comparison API endpoints
4. No web scraping dependencies
5. No scheduled price update system
6. No price display in PerfumeCard component
7. No price history tracking
8. No price alerts/notifications
```

---

**Last Updated:** 2026-01-14  
**Diagnostic Mode:** Price Comparison Readiness
