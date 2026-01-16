# Cross-Tab Sync User Isolation Diagnostic Report

**التاريخ:** 2026-01-16  
**المشكلة:** Cross-Tab Sync User Isolation (P0)  
**الحالة:** ⚠️ **VULNERABLE - Critical Issue Found**

---

## 📋 Diagnostic Results

### 1. Message Format Analysis

**File:** `src/hooks/useFavorites.ts`  
**Interface:** `FavoritesMessage` (Lines 14-21)

```typescript
interface FavoritesMessage {
  type: 'favorites-updated' | 'favorites-cleared'
  userId?: string  // ⚠️ OPTIONAL - Not always included
  favorites?: string[]
  action?: 'add' | 'remove' | 'migration-complete'
  perfumeId?: string
  timestamp?: number
}
```

**Message Sending (Line 124-131):**
```typescript
const message: FavoritesMessage = {
  type: 'favorites-updated',
  userId: session?.user?.id,  // ✅ Included when authenticated
  favorites,
  action,
  perfumeId
}
```

**MESSAGE FORMAT:** ✅ **Contains userId** (when authenticated)  
**Note:** `userId` is optional and may be `undefined` for guest users.

---

### 2. Receiver Logic Analysis

**File:** `src/hooks/useFavorites.ts`  
**Handler:** `handleMessage` (Lines 53-108)

**Code (Lines 71-76):**
```typescript
// Ignore messages from the same user session if authenticated
if (status === 'authenticated' && session?.user?.id) {
  // Only sync if it's for the same user
  if (message.userId && message.userId !== session.user.id) {
    return  // ✅ Rejects messages from different users
  }
  
  // Update authenticated favorites from other tabs
  // ...
}
```

**RECEIVER LOGIC:** ⚠️ **PARTIAL** - Filters by userId, but has edge cases

**Issues:**
1. **Edge Case 1:** If `message.userId` is `undefined` (guest user), the check `message.userId && message.userId !== session.user.id` will be `false`, so it won't reject the message. However, the code only processes authenticated users in this block, so this is actually safe.

2. **Edge Case 2:** If `message.userId` is `undefined` and the receiver is authenticated, the message will be processed. But wait - if the sender is a guest (no userId), and the receiver is authenticated, the message should be ignored. However, looking at the code flow:
   - Guest users send messages without `userId` (line 126: `userId: session?.user?.id` will be undefined)
   - Authenticated receivers check `if (status === 'authenticated' && session?.user?.id)` - this block only runs for authenticated users
   - Inside this block, if `message.userId` is undefined, the check `message.userId && message.userId !== session.user.id` evaluates to `false`, so it doesn't return early
   - But then it tries to update `authenticatedFavorites` with guest favorites - **THIS IS A BUG!**

**HANDLER:** ⚠️ **VULNERABLE** - Does not properly reject messages without userId when receiver is authenticated

---

### 3. StorageEvent Handler Analysis

**File:** `src/hooks/useFavorites.ts`  
**Handler:** `handleStorageChange` (Lines 370-392)

**Code:**
```typescript
const handleStorageChange = (e: StorageEvent) => {
  // Only handle our favorites storage
  if (e.key === 'guestFavorites') {
    // Handle removeItem (e.newValue === null)
    if (e.newValue === null && e.oldValue && status === 'unauthenticated') {
      // Favorites cleared (migration or manual removal)
      setStep('step1_liked', [])
      return
    }
    
    // Handle favorites update (e.newValue exists)
    if (e.newValue) {
      try {
        const newFavorites = JSON.parse(e.newValue)
        if (Array.isArray(newFavorites) && status === 'unauthenticated') {
          // Update QuizContext when localStorage changes from another tab
          setStep('step1_liked', newFavorites)
        }
      } catch (err) {
        console.error('Error parsing storage event:', err)
      }
    }
  }
}
```

**STORAGE EVENT:** ✅ **SAFE** - Only processes when `status === 'unauthenticated'`

**File:** `src/app/dashboard/page.tsx`  
**Handler:** `handleStorageChange` (Lines 150-172)

**Code:**
```typescript
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === 'guestFavorites' && !session?.user?.id) {
    // Handle removeItem (e.newValue === null)
    if (e.newValue === null && e.oldValue) {
      // Favorites cleared (migration or manual removal)
      setFavorites([])
      return
    }
    
    // Handle favorites update (e.newValue exists)
    if (e.newValue) {
      try {
        const guestFavs = JSON.parse(e.newValue)
        if (Array.isArray(guestFavs)) {
          const favPerfumes = perfumes.filter(p => guestFavs.includes(p.id))
          setFavorites(favPerfumes)
        }
      } catch (err) {
        console.error('Error parsing storage event:', err)
      }
    }
  }
}
```

**STORAGE EVENT:** ✅ **SAFE** - Only processes when `!session?.user?.id` (guest users only)

---

### 4. Critical Vulnerability Analysis

**SCENARIO: Tab1(User1) → Tab2(User2): Cross-contamination?**

#### Scenario 1: Both Users Authenticated
- **Tab1 (User1):** Adds favorite → Broadcasts with `userId: "user1-id"`
- **Tab2 (User2):** Receives message → Checks `message.userId !== session.user.id` → ✅ **Rejects correctly**

#### Scenario 2: User1 Authenticated, User2 Guest
- **Tab1 (User1):** Adds favorite → Broadcasts with `userId: "user1-id"`
- **Tab2 (User2):** Receives message → `status === 'unauthenticated'` → Goes to guest block (line 88-107) → ✅ **Processes as guest favorites (SAFE)**

#### Scenario 3: User1 Guest, User2 Authenticated ⚠️ **VULNERABLE**
- **Tab1 (User1):** Adds favorite → Broadcasts with `userId: undefined` (guest)
- **Tab2 (User2):** Receives message → `status === 'authenticated'` → Enters authenticated block (line 72)
  - Checks: `message.userId && message.userId !== session.user.id`
  - Since `message.userId` is `undefined`, the check evaluates to `false`
  - **Does NOT return early** → Continues to line 79-87
  - Updates `authenticatedFavorites` with guest favorites! ⚠️ **CROSS-CONTAMINATION!**

#### Scenario 4: StorageEvent (Both Authenticated)
- **Tab1 (User1):** Modifies `localStorage.guestFavorites` (shouldn't happen, but if it does)
- **Tab2 (User2):** Receives StorageEvent → Checks `status === 'unauthenticated'` → ✅ **Rejects (SAFE)**

---

## 🔍 Root Cause

**Vulnerability Location:** `src/hooks/useFavorites.ts` Lines 71-87

**Problem:**
The check `if (message.userId && message.userId !== session.user.id)` only rejects messages when:
1. `message.userId` exists (not undefined)
2. AND `message.userId !== session.user.id`

**Missing Check:**
When `message.userId` is `undefined` (guest user) and the receiver is authenticated, the message should be rejected, but it's not.

---

## ✅ Fix Required

**File:** `src/hooks/useFavorites.ts`  
**Location:** Lines 71-87

**Current Code:**
```typescript
// Ignore messages from the same user session if authenticated
if (status === 'authenticated' && session?.user?.id) {
  // Only sync if it's for the same user
  if (message.userId && message.userId !== session.user.id) {
    return
  }
  
  // Update authenticated favorites from other tabs
  const validatedFavorites = validateArray<string>(
    message.favorites,
    'المفضلات يجب أن تكون مصفوفة'
  )
  
  // Only update if different to avoid unnecessary re-renders
  if (JSON.stringify(validatedFavorites.sort()) !== JSON.stringify(authenticatedFavorites.sort())) {
    setAuthenticatedFavorites(validatedFavorites)
  }
}
```

**Fixed Code:**
```typescript
// Ignore messages from the same user session if authenticated
if (status === 'authenticated' && session?.user?.id) {
  // Only sync if it's for the same user
  // Reject if message has userId and it doesn't match
  if (message.userId && message.userId !== session.user.id) {
    return
  }
  
  // ✅ FIX: Reject messages without userId when receiver is authenticated
  // (Guest users should not update authenticated favorites)
  if (!message.userId) {
    return
  }
  
  // Update authenticated favorites from other tabs
  const validatedFavorites = validateArray<string>(
    message.favorites,
    'المفضلات يجب أن تكون مصفوفة'
  )
  
  // Only update if different to avoid unnecessary re-renders
  if (JSON.stringify(validatedFavorites.sort()) !== JSON.stringify(authenticatedFavorites.sort())) {
    setAuthenticatedFavorites(validatedFavorites)
  }
}
```

**Fix Explanation:**
- Added check: `if (!message.userId) { return }` after the existing userId mismatch check
- This ensures that authenticated users reject all messages from guest users
- Guest users' favorites should never contaminate authenticated users' favorites

---

## 📊 Summary

| Check | Result | Status |
|------|--------|--------|
| **MESSAGE FORMAT** | Contains userId (optional) | ✅ YES (when authenticated) |
| **RECEIVER LOGIC** | Filters by userId | ⚠️ PARTIAL (missing undefined check) |
| **HANDLER** | Checks session.user.id | ⚠️ VULNERABLE (doesn't reject undefined userId) |
| **STORAGE EVENT** | Handles userId mismatch | ✅ SAFE (only processes guests) |
| **SCENARIO** | Tab1(User1) → Tab2(User2) | ⚠️ **VULNERABLE** (guest → authenticated) |

---

## ✅ Final Status

**STATUS:** ⚠️ **VULNERABLE**

**Critical Issue:**
- Guest users' favorites can contaminate authenticated users' favorites via BroadcastChannel
- StorageEvent handlers are safe (only process guest users)
- BroadcastChannel handler needs fix to reject messages without userId when receiver is authenticated

**Priority:** 🔴 **P0 - Critical Security Issue**

**Fix Required:** Add `if (!message.userId) { return }` check in authenticated block

---

**Diagnostic Date:** 2026-01-16  
**Status:** ⚠️ **VULNERABLE - Fix Required**
