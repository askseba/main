# 🔥 DEBUG & TEST: Price Comparison MVP

## 📊 DATA CHECK

### Run Database Check:
```bash
npx tsx prisma/check-data.ts
```

**Expected Output:**
```
📊 Database Check:

🏪 STORES: 7 active stores
   - FACES وجوه (faces)
   - Nice One نايس ون (niceone)
   - Golden Scent قولدن سنت (goldenscent)
   - السلطان للعطور (sultan)
   - لوجا ستور (lojastore)
   - فانيلا للعطور (vanilla)
   - أوناس السعودية (ounass-sa)

💰 PRICES: 21 total prices (3 perfumes × 7 stores)

🌸 PERFUMES: 3 found
   - ID: 1 | Bleu de Chanel (Chanel)
   - ID: 2 | Aventus (Creed)
   - ID: 3 | Oud Wood (Tom Ford)

✅ First perfume ID: 1
🔗 Test API: http://localhost:3000/api/prices/compare?perfumeId=1
```

---

## 🔌 API TEST

### Test API Endpoint:
```bash
# Using curl
curl "http://localhost:3000/api/prices/compare?perfumeId=1"

# Or in browser
http://localhost:3000/api/prices/compare?perfumeId=1
```

**Expected Response:**
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
  ...
]
```

---

## 📍 COMPONENT LOCATION

**Component:** `src/app/perfume/[id]/PerfumeDetailCTA.tsx`
- **Line 29:** `export function PerfumeDetailCTA`
- **Line 39:** API call: `fetch(/api/prices/compare?perfumeId=${perfume.id})`
- **Line 69:** `getStoreUrl` function
- **Line 115:** Price rendering in dropdown

**Used in:** `src/app/perfume/[id]/page.tsx`
- **Line 7:** Import statement
- **Line 77:** Component usage: `<PerfumeDetailCTA perfume={perfume} />`

---

## 🗺️ ROUTES MAP

**Perfume Detail Route:** `/perfume/[id]`
- **File:** `src/app/perfume/[id]/page.tsx`
- **Component:** `PerfumeDetailCTA` is rendered here

**API Route:** `/api/prices/compare`
- **File:** `src/app/api/prices/compare/route.ts`
- **Method:** GET
- **Query Param:** `perfumeId` (required)

---

## 🚨 COMMON ERRORS & SOLUTIONS

### Error 1: "No perfumes found"
**Solution:**
```bash
npm run db:seed
```

### Error 2: "No active stores found"
**Solution:**
```bash
npm run db:seed
```

### Error 3: "No prices found" (API returns empty array)
**Solution:**
```bash
npm run db:fill-prices
```

### Error 4: "perfumeId mismatch" (perfume.id from static data ≠ DB id)
**Problem:** Static `perfumes.ts` uses IDs like `'1'`, but DB might use different IDs.

**Solution:** Ensure seed uses same IDs, or update `getPerfumeById` to match DB.

---

## ✅ TEST URLS

### 1. Test API Directly:
```
http://localhost:3000/api/prices/compare?perfumeId=1
```

### 2. Test Component:
```
http://localhost:3000/perfume/1
```
Then click "قارن الأسعار" button.

### 3. Check Network Tab:
- Open DevTools (F12)
- Go to Network tab
- Filter: "prices/compare"
- Click "قارن الأسعار" button
- Check request/response

---

## 🔧 QUICK FIXES

### If no data exists:
```bash
# 1. Seed stores and perfumes
npm run db:seed

# 2. Fill prices
npm run db:fill-prices

# 3. Verify
npx tsx prisma/check-data.ts
```

### If API returns empty:
1. Check perfume ID matches between static data and DB
2. Run `npm run db:fill-prices` to add prices
3. Verify stores are active: `isActive: true`

### If component doesn't show prices:
1. Check browser console for errors
2. Verify API call in Network tab
3. Check `perfume.id` matches DB perfume ID

---

**Last Updated:** 2026-01-14
