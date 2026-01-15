# Profile Page Links Documentation

## قسم "المعلومات والدعم" (Support & Information Section)

| Label | href/target | preventDefault؟ | File:Line |
|-------|-------------|-----------------|-----------|
| قصتنا (عن صبا) | `/about` | نعم (شرطي) | src/app/profile/page.tsx:176-182 |
| تساؤلات تهمك | `/faq` | نعم (شرطي) | src/app/profile/page.tsx:176-182 |
| الخصوصية والأمان | `/privacy` | نعم (شرطي) | src/app/profile/page.tsx:176-182 |

## تفاصيل الكود

### تعريف menuItems (Lines 37-41)
```typescript
const menuItems = [
  { id: 'about', label: 'قصتنا (عن صبا)', icon: <Sparkles className="w-5 h-5 text-amber-500" />, href: '/about' },
  { id: 'faq', label: 'تساؤلات تهمك', icon: <HelpCircle className="w-5 h-5 text-blue-500" />, href: '/faq' },
  { id: 'privacy', label: 'الخصوصية والأمان', icon: <ShieldCheck className="w-5 h-5 text-green-500" />, href: '/privacy' },
];
```

### عرض الروابط (Lines 168-198)
```tsx
{menuItems.map((item, index) => (
  <a
    key={item.id}
    href={item.href}
    className={cn(
      "flex items-center justify-between p-5 hover:bg-amber-50/50 transition-all group relative group",
      index !== menuItems.length - 1 && "border-b border-brown/5"
    )}
    onClick={(e) => {
      // Modal fallback إذا الصفحة غير موجودة
      if (!window.location.pathname.includes(item.href)) {
        e.preventDefault();
        // افتح modal أو toast "قريباً..."
      }
    }}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brown/5 hover:bg-primary/10 group-hover:bg-primary/20 rounded-2xl transition-all w-12 h-12 flex items-center justify-center">
        {item.icon}
      </div>
      <span className="text-base font-semibold text-brown leading-tight">{item.label}</span>
    </div>
    <motion.div
      initial={{ x: 4 }}
      animate={{ x: 0 }}
      className="text-brown/40 group-hover:text-brown transition-transform"
    >
      <ChevronLeft size={20} />
    </motion.div>
  </a>
))}
```

## ملاحظات

- **preventDefault شرطي**: يتم استدعاء `e.preventDefault()` فقط إذا كان `window.location.pathname` لا يحتوي على `item.href`
- **السلوك**: إذا كانت الصفحة موجودة في المسار الحالي، يتم السماح بالتنقل الطبيعي. وإلا، يتم منع التنقل (ربما لعرض modal أو toast)
- **جميع الروابط الثلاثة** تستخدم نفس onClick handler
