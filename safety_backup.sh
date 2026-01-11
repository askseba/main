#!/bin/bash
# 🛡️ Pre-Fix Safety Script
# نفذ هذا السكريبت قبل البدء بأي تعديل

echo "🔍 Step 1: Checking current branch..."
current_branch=$(git branch --show-current)
echo "Current branch: $current_branch"

echo ""
echo "💾 Step 2: Creating safety backup..."
git tag "backup-before-ui-fixes-$(date +%Y%m%d-%H%M%S)"
echo "✅ Backup tag created"

echo ""
echo "📸 Step 3: Taking snapshot of current state..."
git stash push -m "Snapshot before UI fixes"
echo "✅ Snapshot saved (run 'git stash pop' to restore)"

echo ""
echo "🧪 Step 4: Testing current build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Current build is working"
else
    echo "⚠️  Warning: Current build has issues"
fi

echo ""
echo "🎯 Step 5: Creating fix branches..."
git checkout -b fix/phase-1-accessibility 2>/dev/null || git checkout fix/phase-1-accessibility
echo "✅ Branch 'fix/phase-1-accessibility' ready"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Safety measures complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📌 Quick Reference:"
echo "   • Restore snapshot: git stash pop"
echo "   • Rollback completely: git reset --hard backup-before-ui-fixes-*"
echo "   • Return to main: git checkout main"
echo ""