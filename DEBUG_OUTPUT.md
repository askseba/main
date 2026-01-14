# 🔥 DEBUG OUTPUT: Price Comparison MVP

## 📊 DATA CHECK RESULTS

### ✅ STORES: 7 records
```
🏪 STORES: 7 active stores
   - FACES وجوه (faces)
   - Nice One نايس ون (niceone)
   - Golden Scent قولدن سنت (goldenscent)
   - السلطان للعطور (sultan)
   - لوجا ستور (lojastore)
   - فانيلا للعطور (vanilla)
   - أوناس السعودية (ounass-sa)
```

### ✅ PRICES: 21 records
```
💰 PRICES: 21 total prices
(3 perfumes × 7 stores = 21 prices)
```

### ✅ PERFUMES: Found
```
🌸 PERFUMES: 3 found (showing first 3)
   - ID: 1 | Bleu de Chanel (Chanel)
   - ID: 10 | Santal 33 (Le Labo)
   - ID: 11 | Creed Aventus (Creed)
```

**First perfume ID:** `1`

---

## 🔌 API TEST

### Test URL:
```
http://localhost:3000/api/prices/compare?perfumeId=1
```

### Expected Response:
```json
[
  {
    "id": 1,
    "perfumeId": "1",
    "storeId": 1,
    "price": 450,
    "currency": "SAR",
    "updatedAt": "2026-01-14T...",
    "store": {
      "id": 1,
      "name": "FACES وجوه",
      "slug": "faces",
      "affiliateUrl": "https://www.faces.sa/?utm_source=askseba",
      "commission": 8.0,
      "isActive": true
    }
  },
  {
    "id": 2,
    "perfumeId": "1",
    "storeId": 2,
    "price": 470,
    "currency": "SAR",
    "store": {
      "id": 2,
      "name": "Nice One نايس ون",
      ...
    }
  },
  ... (7 stores total, ordered by price ASC)
]
```

---

## 📍 COMPONENT LOCATION

**Component File:** `src/app/perfume/[id]/PerfumeDetailCTA.tsx`
- **Line 29:** `export function PerfumeDetailCTA({ perfume }: PerfumeDetailCTAProps)`
- **Line 36-50:** `useEffect` hook that fetches prices when dropdown opens
- **Line 39:** API call: `fetch(/api/prices/compare?perfumeId=${perfume.id})`
- **Line 69-77:** `getStoreUrl` function (handles both `{query}` and direct URLs)
- **Line 115-125:** Price rendering in dropdown

**Used in:** `src/app/perfume/[id]/page.tsx`
- **Line 7:** `import { PerfumeDetailCTA } from './PerfumeDetailCTA'`
- **Line 77:** `<PerfumeDetailCTA perfume={perfume} />`

---

## 🗺️ ROUTES MAP

### Perfume Detail Route:
- **Path:** `/perfume/[id]`
- **File:** `src/app/perfume/[id]/page.tsx`
- **Component:** Renders `PerfumeDetailCTA` at line 77

### API Route:
- **Path:** `/api/prices/compare`
- **File:** `src/app/api/prices/compare/route.ts`
- **Method:** GET
- **Query Param:** `perfumeId` (string, required)

### Other Routes:
```
src/app/
├── perfume/[id]/          ← Perfume detail page
├── results/               ← Results page
├── quiz/                  ← Quiz pages
└── api/
    └── prices/compare/    ← Price comparison API
```

---

## 🚨 POTENTIAL ERRORS & SOLUTIONS

### Error 1: Empty API Response `[]`
**Cause:** No prices in database for this perfumeId
**Solution:**
```bash
npm run db:fill-prices
```

### Error 2: "perfumeId mismatch"
**Cause:** Static `perfumes.ts` ID might not match DB ID
**Check:** 
- Static data uses: `id: '1'` (string)
- DB uses: `id: '1'` (string from seed)
- ✅ They match!

### Error 3: Component not fetching
**Check:**
1. Browser Console (F12) → Check for errors
2. Network tab → Filter "prices/compare" → Check request/response
3. Verify `perfume.id` is passed correctly

### Error 4: Dropdown shows "لا توجد أسعار"
**Cause:** API returned empty array or error
**Solution:**
1. Check API response in Network tab
2. Verify perfumeId exists in DB
3. Run `npm run db:fill-prices` if needed

---

## ✅ TEST STEPS

### 1. Start Dev Server:
```bash
npm run dev
```

### 2. Test API Directly:
Open browser:
```
http://localhost:3000/api/prices/compare?perfumeId=1
```

Should return JSON array with 7 prices.

### 3. Test Component:
Open:
```
http://localhost:3000/perfume/1
```

1. Scroll to bottom
2. Click "قارن الأسعار" button
3. Should see dropdown with 7 stores and prices
4. Check Network tab for API call

### 4. Verify in Console:
Open DevTools (F12):
- **Console tab:** Should see no errors
- **Network tab:** Filter "prices/compare" → Should see 200 OK response

---

## 🔧 QUICK FIX COMMANDS

### If no prices exist:
```bash
npm run db:fill-prices
```

### If no stores exist:
```bash
npm run db:seed
```

### Verify data:
```bash
npx tsx prisma/check-data.ts
```

---

## 📋 SUMMARY

✅ **STORES:** 7 active stores (ready)
✅ **PRICES:** 21 prices (3 perfumes × 7 stores)
✅ **API:** `/api/prices/compare?perfumeId=1` (ready)
✅ **COMPONENT:** `src/app/perfume/[id]/PerfumeDetailCTA.tsx` (ready)
✅ **ROUTE:** `/perfume/[id]` (ready)

**TEST URL:** `http://localhost:3000/perfume/1`

**SOLUTION:** All systems ready! Just test the component:
1. Run `npm run dev`
2. Visit `http://localhost:3000/perfume/1`
3. Click "قارن الأسعار"
4. Should see 7 stores with prices

---

**Last Updated:** 2026-01-14
