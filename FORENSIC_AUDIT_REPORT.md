# 🔍 FORENSIC CODE AUDIT REPORT
## "Ask Seba" Perfume Recommendation PWA

**Date:** 2026-01-XX  
**Auditor:** Senior Forensic Code Auditor  
**Methodology:** Evidence-based code inspection, no assumptions

---

## PHASE 1: THE TRUTH BEHIND THE SCENES (Infrastructure)

### 1. Data Layer Reality

#### Database Schema
**VERDICT:** ❌ **MISSING**

**Evidence:**
- No `schema.prisma` file found
- No SQL files found
- No Mongoose models found
- No TypeORM entities found
- No Drizzle schema found
- No database connection strings in environment files

**File Checked:**
- `package.json`: No database dependencies (Prisma, Mongoose, TypeORM, Drizzle, etc.)

#### Fragrance Model
**VERDICT:** ❌ **MISSING - Hardcoded JSON Only**

**Evidence:**
- **Location:** `src/lib/data/perfumes.ts`
- **Structure Found:**
  ```typescript
  interface Perfume {
    id: string
    name: string
    brand: string
    image: string
    score?: number
    matchPercentage?: number
    status?: 'safe' | 'warning' | 'danger'
    price?: number
    originalPrice?: number | null
    description?: string
    isSafe?: boolean
    variant?: 'on-sale' | 'just-arrived'
  }
  ```

**MISSING Fields:**
- ❌ `scent_pyramid` - NOT FOUND
- ❌ `ingredients` - NOT FOUND
- ❌ `top_notes` - NOT FOUND
- ❌ `heart_notes` - NOT FOUND
- ❌ `base_notes` - NOT FOUND
- ❌ `safety_score` - NOT FOUND
- ❌ `allergen_list` - NOT FOUND

**Data Source:**
- Hardcoded array of 19 perfumes in `src/lib/data/perfumes.ts`
- All match percentages are **static values** (e.g., `matchPercentage: 92`)

#### User Preference Model
**VERDICT:** ⚠️ **SessionStorage Only - No Database**

**Evidence:**
- **Location:** `src/contexts/QuizContext.tsx`
- **Storage Method:** `sessionStorage` (lines 38-64)
- **Data Structure:**
  ```typescript
  interface QuizData {
    step1_liked: string[]  // Array of perfume IDs
    step2_disliked: string[]
    step3_allergy: {
      symptoms: string[]
      families: string[]
      ingredients: string[]
    }
  }
  ```
- **Persistence:** Data is lost when browser tab closes
- **No Backend API:** No POST/GET endpoints to save/load user preferences

---

### 2. The "Matching" Engine

#### Match Score Calculation
**VERDICT:** ❌ **FAKE - No Formula Implementation**

**Evidence:**

**Claimed Formula:** `(Taste*0.5 + Safety*0.3 + Stage*0.2)`

**Reality:**
1. **No Formula Found:** Searched entire codebase for `Taste.*0.5`, `Safety.*0.3`, `Stage.*0.2` - **ZERO MATCHES**

2. **Actual Implementation:**
   - **Location:** `src/lib/data/perfumes.ts`
   - **Method:** Hardcoded `matchPercentage` values in JSON:
     ```typescript
     {
       id: '1',
       name: 'Bleu de Chanel',
       matchPercentage: 92,  // ← STATIC VALUE
       score: 92
     }
     ```

3. **Only "Personalization" Logic:**
   - **Location:** `src/app/results/page.tsx` (lines 54-65)
   - **Logic:** Simple +20% boost for liked perfumes:
     ```typescript
     let personalizedMatch = perfume.matchPercentage ?? perfume.score ?? 0
     if (quizData.step1_liked.includes(perfume.id)) {
       personalizedMatch = Math.min(100, personalizedMatch + 20)
     }
     ```
   - **This is NOT a matching algorithm** - it's just a static boost

4. **Scent Profile Calculation:**
   - **Location:** `src/lib/scent-analysis.ts`
   - **Method:** Counts occurrences of scent families in liked perfumes
   - **NOT a match score** - just calculates radar chart percentages
   - Uses hardcoded `PERFUME_FAMILIES_MAP` (lines 48-87)

**Conclusion:** The "90% Match" is a **static string/number**, not a calculated value.

---

## PHASE 2: THE USER JOURNEY REALITY (Frontend Flow)

### 1. Input Integrity

#### Preferred Scents Step (Step 1)
**VERDICT:** ✅ **WORKS - But Limited to Hardcoded Data**

**Evidence:**
- **Location:** `src/app/quiz/step1-favorites/page.tsx`
- **Search Implementation:**
  ```typescript
  // Lines 79-94
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return []
    return perfumes.filter(p =>
      (p.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
       p.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
      !selectedPerfumes.includes(p.id)
    )
  }, [debouncedSearchTerm, selectedPerfumes])
  ```

**What Works:**
- ✅ Search bar filters hardcoded `perfumes` array
- ✅ Users can select from search results
- ✅ Selection is saved to `sessionStorage`

**What Doesn't Work:**
- ❌ No API call to external perfume database
- ❌ Limited to 19 hardcoded perfumes
- ❌ No category icons (Woody/Floral) - only text search
- ❌ No autocomplete or suggestions

**Submission Logic:**
- **Location:** `src/app/quiz/step1-favorites/page.tsx` (lines 114-119)
- **Action:** Saves to `sessionStorage` and navigates to next step
- **No Backend:** No API call to save preferences

---

### 2. Safety Logic Gap

#### Allergy Step (Step 3)
**VERDICT:** ⚠️ **PARTIALLY CONNECTED - Basic String Matching**

**Evidence:**
- **Location:** `src/app/quiz/step3-allergy/page.tsx`
- **State Management:** ✅ Connected to `QuizContext` (lines 26-34)
- **Filtering Logic:**
  - **Location:** `src/app/results/page.tsx` (lines 73-82)
  ```typescript
  const hasAllergyIngredient = quizData.step3_allergy.ingredients.some(ingId => {
    const searchTerms = allergyIngredientMap[ingId] || [ingId]
    return searchTerms.some(term => description.includes(term.toLowerCase()))
  })
  if (hasAllergyIngredient) {
    return false  // Exclude perfume
  }
  ```

**What Works:**
- ✅ Allergy selections are saved to context
- ✅ Results page filters out perfumes containing allergy ingredients
- ✅ Uses string matching on `description` field

**What Doesn't Work:**
- ❌ **No actual ingredient database** - relies on description text matching
- ❌ **Very basic logic** - just checks if description contains keyword
- ❌ **No safety scoring** - binary exclude/include only
- ❌ **No symptom-based filtering** - symptoms are collected but not used

**Dead UI Check:**
- **Symptoms (Level 1):** ✅ Saved to state, but ❌ **NOT USED** in filtering
- **Families (Level 2):** ✅ Saved to state, but ❌ **NOT USED** in filtering
- **Ingredients (Level 3):** ✅ Saved to state, ✅ **USED** in filtering (basic string match)

---

### 3. Result Page Authenticity

#### PerfumeCard Component
**VERDICT:** ❌ **NO Top/Heart/Base Notes - Static Match Only**

**Evidence:**
- **Location:** `src/components/ui/PerfumeCard.tsx`
- **Props Interface:**
  ```typescript
  interface PerfumeCardProps {
    variant?: 'on-sale' | 'just-arrived'
    title?: string
    brand?: string
    matchPercentage?: number  // ← Static prop
    imageUrl?: string
    description?: string
    isSafe?: boolean
    // ❌ NO top_notes, heart_notes, base_notes
  }
  ```

**What's Displayed:**
- ✅ Match percentage (static value)
- ✅ Brand name
- ✅ Description (generic text)
- ✅ Image
- ✅ Safety badge (based on matchPercentage threshold)

**What's Missing:**
- ❌ Top notes - NOT IN DATA MODEL
- ❌ Heart notes - NOT IN DATA MODEL
- ❌ Base notes - NOT IN DATA MODEL
- ❌ Ingredient list - NOT IN DATA MODEL
- ❌ Scent pyramid visualization - NOT IMPLEMENTED

**Match Percentage Source:**
- **Static prop** passed from parent
- **No calculation** - just displays the number
- **Location:** `src/app/results/page.tsx` (line 346):
  ```typescript
  matchPercentage={perfume.personalizedMatch ?? perfume.matchPercentage ?? perfume.score ?? 0}
  ```

#### Radar Chart
**VERDICT:** ✅ **REAL SVG Implementation - But Data is Calculated from Hardcoded Mappings**

**Evidence:**
- **Location:** `src/components/ui/RadarChart.tsx`
- **Implementation:** Custom SVG with `framer-motion` animations
- **NOT a library:** No Recharts, Chart.js, or other charting library
- **Data Source:** `calculateScentProfile()` from `src/lib/scent-analysis.ts`
- **Calculation Method:**
  - Counts scent family occurrences in liked perfumes
  - Uses hardcoded `PERFUME_FAMILIES_MAP` (not real ingredient analysis)
  - Normalizes to 30-100% range for visualization

**What Works:**
- ✅ SVG rendering
- ✅ Animations
- ✅ Responsive design
- ✅ Accessibility (aria-label, desc)

**What Doesn't Work:**
- ❌ Data is not from real ingredient analysis
- ❌ Uses hardcoded family mappings per perfume ID
- ❌ No connection to actual fragrance notes database

---

## OUTPUT FORMAT (STRICT)

### 1. Infrastructure Verdict

**VERDICT:** 🎭 **MOCKED SHELL**

**Reasoning:**
- No database (Prisma/SQL/Mongoose)
- All data is hardcoded JSON
- No backend API for data persistence
- Match percentages are static values, not calculated
- User preferences stored only in sessionStorage (lost on tab close)

**Evidence Files:**
- `src/lib/data/perfumes.ts` - Hardcoded 19 perfumes
- `src/contexts/QuizContext.tsx` - sessionStorage only
- `package.json` - No database dependencies

---

### 2. The "Dead UI" List

#### Fully Dead (No Logic Connected):
1. **PerfumeCard "أضف للتحليل" Button**
   - **Location:** `src/components/ui/PerfumeCard.tsx` (line 188-192)
   - **Status:** ❌ **DEAD** - No `onClick` handler, no functionality
   - **Evidence:** Button exists but does nothing when clicked

2. **Allergy Symptoms (Level 1)**
   - **Location:** `src/components/quiz/Step3Allergy.tsx`
   - **Status:** ❌ **DEAD** - Saved to state but never used in filtering
   - **Evidence:** `src/app/results/page.tsx` only uses `ingredients`, not `symptoms`

3. **Allergy Families (Level 2)**
   - **Location:** `src/components/quiz/Step3Allergy.tsx`
   - **Status:** ❌ **DEAD** - Saved to state but never used in filtering
   - **Evidence:** `src/app/results/page.tsx` only uses `ingredients`, not `families`

#### Partially Dead (Limited Functionality):
4. **Search API Endpoint**
   - **Location:** `src/app/api/perfumes/search/route.ts`
   - **Status:** ⚠️ **PARTIALLY DEAD** - Returns hardcoded array, not real database query
   - **Evidence:** Filters static `perfumes` array, no database connection

5. **Dashboard Stats**
   - **Location:** `src/app/dashboard/page.tsx` (lines 118-123)
   - **Status:** ⚠️ **PARTIALLY DEAD** - Uses `defaultUserStats` constant, not real user data
   - **Evidence:** `src/lib/data/perfumes.ts` (lines 320-325) - hardcoded stats

---

### 3. Data Disconnects

#### Frontend Expects, Backend Doesn't Provide:

1. **Scent Pyramid Data**
   - **Frontend Expects:** Top/Heart/Base notes for visualization
   - **Backend Provides:** ❌ NOTHING - No fields in data model
   - **Impact:** Cannot display scent timeline or pyramid

2. **Ingredient List**
   - **Frontend Expects:** Detailed ingredient list for safety analysis
   - **Backend Provides:** ❌ NOTHING - Only generic `description` text
   - **Impact:** Allergy filtering uses basic string matching, not real ingredient analysis

3. **Safety Score**
   - **Frontend Expects:** Calculated safety score based on allergens
   - **Backend Provides:** ❌ NOTHING - Only binary `isSafe` boolean
   - **Impact:** Safety badge is based on matchPercentage threshold, not real safety data

4. **Match Calculation Formula**
   - **Frontend Expects:** `(Taste*0.5 + Safety*0.3 + Stage*0.2)` calculation
   - **Backend Provides:** ❌ NOTHING - Static `matchPercentage` values
   - **Impact:** All match percentages are fake/hardcoded

5. **User Preference Persistence**
   - **Frontend Expects:** Save/load user preferences from database
   - **Backend Provides:** ❌ NOTHING - Only sessionStorage (lost on tab close)
   - **Impact:** No user accounts, no saved preferences, no history

6. **Real-Time Search**
   - **Frontend Expects:** Search external perfume database
   - **Backend Provides:** ❌ NOTHING - Only 19 hardcoded perfumes
   - **Impact:** Limited to 19 perfumes, no real search capability

---

## SUMMARY

### What Actually Works:
- ✅ UI/UX flow (quiz steps, navigation)
- ✅ Search within hardcoded 19 perfumes
- ✅ Selection and state management (sessionStorage)
- ✅ Basic allergy filtering (string matching on descriptions)
- ✅ Radar chart visualization (calculated from hardcoded mappings)
- ✅ Responsive design and animations

### What's Fake/Broken:
- ❌ Match percentage calculation (all static values)
- ❌ Database and data persistence
- ❌ Real ingredient/safety analysis
- ❌ Scent pyramid/notes data
- ❌ User account system
- ❌ External perfume database search
- ❌ Symptom/family-based allergy filtering

### Critical Missing Features:
1. **Database:** No Prisma/SQL/Mongoose schema
2. **Match Algorithm:** No `(Taste*0.5 + Safety*0.3 + Stage*0.2)` formula
3. **Fragrance Model:** No `scent_pyramid`, `ingredients`, `top_notes`, etc.
4. **User Persistence:** No database storage, only sessionStorage
5. **Real Search:** Limited to 19 hardcoded perfumes

---

**FINAL VERDICT:** This is a **UI Prototype/Mockup**, not a production-ready application. The matching engine is completely fake, and all data is hardcoded. It demonstrates the UI flow but has no real backend logic.
