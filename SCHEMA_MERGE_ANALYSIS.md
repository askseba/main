# Prisma Schema Merge Analysis

## Missing Components in Current Schema

### Enums (All Missing)
1. **SubscriptionTier** (Phase 3) - `GUEST`, `FREE`, `PREMIUM`
2. **SubscriptionStatus** (Phase 3) - `ACTIVE`, `CANCELED`, `EXPIRED`, `TRIAL`
3. **PaymentProvider** (Phase 3) - `STRIPE`, `PADDLE`, `MANUAL`

### Models (Missing)
**Phase 1:**
1. **IfraMaterial** - IFRA allergen/sensitizer database
2. **SymptomIngredientMapping** - Maps symptoms to ingredients
3. **PerfumeIngredient** - Links perfumes to IFRA ingredients

**Phase 3:**
4. **Account** - NextAuth account model
5. **Session** - NextAuth session model
6. **VerificationToken** - NextAuth verification token
7. **PriceAlert** - User price alerts
8. **Subscription** - User subscriptions
9. **TestHistory** - User test history
10. **ConversionEvent** - Analytics events

### User Model Extensions (Missing Fields)
- `subscriptionTier` (SubscriptionTier enum, default: FREE)
- `monthlyTestCount` (Int, default: 0)
- `lastTestReset` (DateTime, default: now())
- Relations: `priceAlerts`, `testHistory`, `subscriptions`

### Subscription Model Extensions (Phase 4 - Moyasar)
- `moyasarPaymentId` (String?, unique)
- `moyasarCustomerId` (String?)
- `moyasarSourceId` (String?)
- `lastPaymentDate` (DateTime?)
- `nextBillingDate` (DateTime?)

### Conflicts to Resolve
1. **User.password** - Current schema has it, Phase 3 doesn't. **KEEP** (needed for auth)
2. **Price model** - Current uses Int id, Phase 3 uses String id. **KEEP CURRENT** (Int id)
3. **UserFavorite vs Favorite** - Current has UserFavorite. **KEEP CURRENT** UserFavorite model
4. **Datasource** - Current uses SQLite, Phase 3 uses PostgreSQL. **KEEP CURRENT** (SQLite)
