'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import FeedbackCard from '@/components/FeedbackCard'
import FeedbackModal from '@/components/FeedbackModal'
import AdminModal from '@/components/AdminModal'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Suggestion {
  id: string
  title: string
  description: string
  publicStatus: 'planned' | 'in_progress' | 'under_review' | 'done'
  votes: number
  hasVoted: boolean
  userId: string
  isMine: boolean
  category: string
}

interface FeedbackResponse {
  suggestions: Suggestion[]
  doneCount: number
}

export default function FeedbackPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [doneCount, setDoneCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  // 1. NextAuth middleware → redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 2. Fetch suggestions
  useEffect(() => {
    if (status === 'authenticated') {
      fetchSuggestions()
    }
  }, [status])

  const fetchSuggestions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/feedback/suggestions')
      if (response.ok) {
        const data: FeedbackResponse = await response.json()
        setSuggestions(data.suggestions)
        setDoneCount(data.doneCount)
      } else {
        console.error('Failed to fetch suggestions:', response.statusText)
        toast.error('واجهنا مشكلة في تحميل الاقتراحات')
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      toast.error('تأكد من اتصالك بالإنترنت')
    } finally {
      setLoading(false)
    }
  }

  // Handle vote from child component
  const handleVoteUpdate = (data: { votes: number; hasVoted: boolean; suggestionId: string }) => {
    setSuggestions(prev =>
      prev.map(s =>
        s.id === data.suggestionId
          ? { ...s, votes: data.votes, hasVoted: data.hasVoted }
          : s
      )
    )
  }

  // Handle add suggestion
  const handleAddSuggestion = async (title: string, description: string, category: string) => {
    try {
      const response = await fetch('/api/feedback/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Suggestion added:', data)
        toast.success('تم إرسال اقتراحك بنجاح! سيتم مراجعته قريباً 🎉')
        setShowAddModal(false)
        fetchSuggestions()
      } else {
        console.error('Failed to add suggestion:', response.statusText)
        toast.error('واجهنا مشكلة في حفظ اقتراحك')
      }
    } catch (error) {
      console.error('Error adding suggestion:', error)
      toast.error('تأكد من اتصالك بالإنترنت')
    }
  }

  const isAdmin = session?.user?.role === 'admin'

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#F2F0EB] flex items-center justify-center">
        <div className="text-[#5B4233] text-xl">جاري التحميل...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F2F0EB] p-6" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#5B4233] mb-3 leading-tight">
            ساعدنا نكون أفضل لأجلك
          </h1>

          {/* Done Count Stat */}
          <AnimatePresence mode="wait">
            <motion.div
              key={doneCount}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-400/10 to-emerald-400/10 
                         text-green-700 border-2 border-green-200/50 px-6 py-3 rounded-2xl w-fit mx-auto shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-lg font-bold">
                {doneCount > 0
                  ? `بفضلكم.. ${doneCount} فكرة منكم أصبحت واقعاً! 🏆`
                  : 'لم ننفّذ اقتراحات بعد... كن الأول 💡'}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button
              size="lg"
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto shadow-lg bg-[#c0841a] hover:bg-[#a0701a] text-white"
            >
              وش ناقصنا؟ 💡
            </Button>
            {isAdmin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setShowAdminModal(true)}
                      className="shadow-sm w-full sm:w-auto"
                    >
                      👤 Admin [📋]
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>لوحة المراجعة (للإدارة فقط)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Suggestions List */}
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-[#5B4233]/60"
            >
              لا توجد اقتراحات حالياً. كن أول من يقترح تحسينًا!
            </motion.div>
          ) : (
            suggestions.map((suggestion, index) => (
              <FeedbackCard
                key={suggestion.id}
                suggestion={suggestion}
                isTopVoted={index === 0 && suggestion.votes > 0}
                onVote={handleVoteUpdate}
              />
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <FeedbackModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSuggestion}
        />
      )}

      {showAdminModal && isAdmin && (
        <AdminModal
          onClose={() => setShowAdminModal(false)}
          onRefresh={fetchSuggestions}
        />
      )}
    </div>
  )
}
