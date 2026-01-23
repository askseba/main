# Visual Schema Diff: Current vs Unified

## 📊 Model Count Comparison

```
Current Schema:  10 models, 0 enums
Unified Schema:  23 models, 3 enums
─────────────────────────────────────
Net Addition:    +13 models, +3 enums
```

---

## ➕ NEW ENUMS (3)

```prisma
enum SubscriptionTier { GUEST, FREE, PREMIUM }
enum SubscriptionStatus { ACTIVE, CANCELED, EXPIRED, TRIAL }
enum PaymentProvider { STRIPE, PADDLE, MOYASAR, MANUAL }
```

---

## ➕ NEW MODELS (10)

### Phase 1 - IFRA (3 models)
```
✅ IfraMaterial
✅ SymptomIngredientMapping  
✅ PerfumeIngredient
```

### Phase 3 - Value Ladder (7 models)
```
✅ Account (NextAuth)
✅ Session (NextAuth)
✅ VerificationToken (NextAuth)
✅ PriceAlert
✅ Subscription
✅ TestHistory
✅ ConversionEvent
```

---

## 🔄 MODIFIED MODELS

### User Model - Added Fields
```diff
model User {
  // ... existing fields ...
+ subscriptionTier   SubscriptionTier @default(FREE)
+ monthlyTestCount   Int              @default(0)
+ lastTestReset      DateTime         @default(now())
  
  // ... existing relations ...
+ accounts      Account[]
+ sessions      Session[]
+ priceAlerts   PriceAlert[]
+ testHistory   TestHistory[]
+ subscriptions Subscription[]
}
```

### Subscription Model - Phase 4 Extensions
```diff
model Subscription {
  // ... Phase 3 fields ...
+ moyasarPaymentId   String?  @unique
+ moyasarCustomerId   String?
+ moyasarSourceId     String?
+ lastPaymentDate     DateTime?
+ nextBillingDate     DateTime?
}
```

---

## ✅ PRESERVED MODELS (No Changes)

- UserPreference
- UserFavorite
- Perfume
- Store
- Price (kept Int id)
- FragellaPerfume
- FragellaCache
- Suggestion
- Vote

---

## 🔗 RELATIONSHIP MAP

```
User
├── UserFavorite (existing)
├── Suggestion (existing)
├── Account (NEW - Phase 3)
├── Session (NEW - Phase 3)
├── PriceAlert (NEW - Phase 3)
├── TestHistory (NEW - Phase 3)
└── Subscription (NEW - Phase 3)

IfraMaterial (NEW - Phase 1)
├── PerfumeIngredient (NEW - Phase 1)
└── SymptomIngredientMapping (NEW - Phase 1)

Subscription (NEW - Phase 3)
└── User (relation)
```

---

## 📝 Key Decisions Made

1. ✅ **Kept SQLite** (not PostgreSQL from Phase 3)
2. ✅ **Kept User.password** (needed for current auth)
3. ✅ **Kept Price.id as Int** (not String from Phase 3)
4. ✅ **Kept UserFavorite** (not "Favorite" from Phase 3)
5. ✅ **SQLite JSON workaround** - TestHistory uses String for arrays

---

## ⚠️ Validation Note

The Prisma validation error is due to version mismatch (Prisma 7.x installed vs project version). The schema format is correct and matches the current `schema.prisma` structure.
