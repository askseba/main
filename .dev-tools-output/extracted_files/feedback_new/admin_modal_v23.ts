import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface PendingSuggestion {
  id: string
  title: string
  description: string
  category: string
  userName?: string
  createdAt: string
}

interface AdminModalProps {
  onClose: () => void
  onRefresh?: () => void
}

export default function AdminModal({ onClose, onRefresh }: AdminModalProps) {
  const [pendingSuggestions, setPendingSuggestions] = useState<PendingSuggestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPendingSuggestions()
  }, [])

  const fetchPendingSuggestions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/suggestions')
      if (response.ok) {
        const data = await response.json()
        setPendingSuggestions(data.pendingSuggestions)
      } else {
        console.error('Failed to fetch pending suggestions:', response.statusText)
        toast.error('فشل تحميل الاقتراحات المعلقة')
      }
    } catch (error) {
      console.error('Error fetching pending suggestions:', error)
      toast.error('حدث خطأ في التحميل')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/suggestions/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        console.log('Suggestion approved:', id)
        toast.success('تمت الموافقة على الاقتراح ✅')
        setPendingSuggestions((prev) => prev.filter((s) => s.id !== id))
        onRefresh?.()
      } else {
        console.error('Failed to approve suggestion:', response.statusText)
        toast.error('فشلت الموافقة')
      }
    } catch (error) {
      console.error('Error approving suggestion:', error)
      toast.error('حدث خطأ')
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/suggestions/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        console.log('Suggestion rejected:', id)
        toast.success('تم رفض الاقتراح')
        setPendingSuggestions((prev) => prev.filter((s) => s.id !== id))
      } else {
        console.error('Failed to reject suggestion:', response.statusText)
        toast.error('فشل الرفض')
      }
    } catch (error) {
      console.error('Error rejecting suggestion:', error)
      toast.error('حدث خطأ')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold text-[#5B4233] mb-6">لوحة إدارة الاقتراحات</h2>

        {loading ? (
          <div className="text-center py-8 text-[#5B4233]/60">جاري التحميل...</div>
        ) : (
          <>
            {/* Pending Suggestions */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-[#5B4233]/80 mb-3">
                قيد المراجعة ({pendingSuggestions.length})
              </h3>

              {pendingSuggestions.length === 0 ? (
                <div className="text-center py-8 text-[#5B4233]/60">
                  لا توجد اقتراحات قيد المراجعة
                </div>
              ) : (
                pendingSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="bg-yellow-50 p-4 rounded-xl border border-yellow-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-[#5B4233]">{suggestion.title}</h4>
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        {suggestion.category}
                      </span>
                    </div>
                    <p className="text-sm text-[#5B4233]/70 mb-2">{suggestion.description}</p>
                    {suggestion.userName && (
                      <p className="text-xs text-[#5B4233]/50 mb-3">
                        من: {suggestion.userName}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(suggestion.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                        size="sm"
                      >
                        ✓ موافقة
                      </Button>
                      <Button
                        onClick={() => handleReject(suggestion.id)}
                        variant="destructive"
                        size="sm"
                      >
                        ✗ رفض
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              إغلاق
            </Button>
          </>
        )}
      </div>
    </div>
  )
}