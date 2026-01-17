# Logout Race Condition Diagnostic Report

**التاريخ:** 2026-01-16  
**المشكلة:** P1 Diagnostic: Logout Race Condition (#15)  
**الحالة:** ⚠️ **NEEDS_FIX**

---

## 📋 Diagnostic Results

### 1. Logout Handlers Found ✅

**Profile Logout:**
- **File:** `src/app/profile/page.tsx`
- **Location:** Lines 267-273
- **Handler:** `onClick` async function

**Header Logout:**
- **File:** `src/components/Header.tsx`
- **Location:** Lines 85-89
- **Handler:** `onSelect` async function

---

### 2. Profile Logout Implementation

**Code (Lines 267-273):**
```typescript
onClick={async () => {
  // Clear all user data before signOut
  clearQuiz()
  clearAllUserData()
  await signOut({ callbackUrl: '/' })
  router.push('/')  // ⚠️ RACE CONDITION
}}
```

**Issues:**
- ✅ `await signOut({ callbackUrl: '/' })` - Correctly awaited
- ❌ `router.push('/')` after signOut - **REDUNDANT & RACE CONDITION**
- ⚠️ `signOut({ callbackUrl: '/' })` already redirects to '/'
- ⚠️ Double navigation can cause race condition

---

### 3. Header Logout Implementation

**Code (Lines 85-89):**
```typescript
onSelect={async () => {
  // Clear all user data before signOut
  clearQuiz()
  clearAllUserData()
  await signOut({ callbackUrl: '/' })  // ✅ CORRECT
}}
```

**Status:**
- ✅ `await signOut({ callbackUrl: '/' })` - Correctly awaited
- ✅ No redundant `router.push('/')` - **CORRECT**
- ✅ Single redirect via `callbackUrl`

---

## 🔍 Analysis

### Race Condition Details:

**Profile Logout:**
1. `clearQuiz()` - Synchronous ✅
2. `clearAllUserData()` - Synchronous ✅
3. `await signOut({ callbackUrl: '/' })` - Async, redirects to '/' ✅
4. `router.push('/')` - **REDUNDANT** - Tries to navigate again ⚠️

**Problem:**
- `signOut({ callbackUrl: '/' })` already performs redirect
- `router.push('/')` executes immediately after (even with await)
- Can cause double navigation or race condition
- Auth state might be visible briefly after logout click

**Header Logout:**
- ✅ No race condition - Only uses `signOut({ callbackUrl: '/' })`
- ✅ Single redirect path

---

## 📊 Output Format

```
HANDLERS: Profile + Header found? YES
  - Profile: src/app/profile/page.tsx (Line 267-273)
  - Header: src/components/Header.tsx (Line 85-89)

PROFILE: await signOut({ redirect: false })? NO
  - Uses: await signOut({ callbackUrl: '/' })
  - Issue: router.push('/') after signOut (redundant)

HEADER: await signOut? YES
  - Uses: await signOut({ callbackUrl: '/' })
  - Status: ✅ CORRECT (no redundant router.push)

RACE CONDITION: router.push before signOut complete? YES
  - Profile: router.push('/') after await signOut (redundant double redirect)
  - Header: No router.push (safe)

UX IMPACT: Auth state visible after logout click? YES
  - Profile: Possible brief auth state flash due to double navigation
  - Header: Minimal (single redirect)

STATUS: NEEDS_FIX
  - Profile logout needs router.push('/') removed
  - Header logout is correct
```

---

## ✅ Recommended Fix

**File:** `src/app/profile/page.tsx`  
**Location:** Line 272

**Before:**
```typescript
onClick={async () => {
  // Clear all user data before signOut
  clearQuiz()
  clearAllUserData()
  await signOut({ callbackUrl: '/' })
  router.push('/')  // ❌ REMOVE THIS
}}
```

**After:**
```typescript
onClick={async () => {
  // Clear all user data before signOut
  clearQuiz()
  clearAllUserData()
  await signOut({ callbackUrl: '/' })  // ✅ Already redirects to '/'
  // router.push('/') removed - signOut handles redirect
}}
```

**Alternative (if redirect: false needed):**
```typescript
onClick={async () => {
  // Clear all user data before signOut
  clearQuiz()
  clearAllUserData()
  await signOut({ redirect: false })  // Don't auto-redirect
  router.push('/')  // Manual redirect after signOut completes
}}
```

**Recommendation:** Use first option (remove router.push) to match Header implementation.

---

## 📊 Summary

| Handler | await signOut | router.push | Status | Issue |
|---------|---------------|-------------|--------|-------|
| **Profile** | ✅ Yes | ❌ Yes (redundant) | ⚠️ **NEEDS_FIX** | Double redirect |
| **Header** | ✅ Yes | ✅ No | ✅ **SAFE** | Single redirect |

---

## ✅ Final Status

**HANDLERS:** ✅ **Profile + Header found**  
**PROFILE:** ⚠️ **await signOut + redundant router.push**  
**HEADER:** ✅ **await signOut only (correct)**  
**RACE CONDITION:** ⚠️ **YES (Profile only)**  
**UX IMPACT:** ⚠️ **Possible brief auth state flash**  
**STATUS:** ⚠️ **NEEDS_FIX**

**Priority:** P1 (UX issue - double navigation)

---

**Diagnostic Date:** 2026-01-16  
**Status:** ⚠️ **Race Condition Detected - Fix Required**
