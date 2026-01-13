'use client'

import Link from 'next/link'
import { useState } from 'react'
import content from '@/content/content.json'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowLeft, Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FAQPage() {
  const data = content.faq
  const [searchTerm, setSearchTerm] = useState('')

  // Filter categories and questions based on search term
  const filteredCategories = data.categories
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(q =>
        q.question.includes(searchTerm) || q.answer.includes(searchTerm)
      )
    }))
    .filter(cat => cat.questions.length > 0)

  return (
    <div dir="rtl" className="min-h-screen bg-[#F2F0EB] text-[#5B4233]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link 
          href="/profile" 
          className="flex items-center gap-2 text-[#5B4233] mb-6 hover:text-[#c0841a] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>الرجوع للملف الشخصي</span>
        </Link>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F2F0EB] py-12 px-6 text-center mb-8"
        >
          <h1 className="text-[33.6px] font-bold mb-4 text-[#5B4233]">
            {data.hero.title}
          </h1>
          <p className="text-xl font-bold text-[#5B4233]/80">
            {data.hero.subtitle}
          </p>
        </motion.section>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5B4233]/40" />
            <input
              type="search"
              placeholder="ابحث في الأسئلة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-3xl border border-[#5B4233]/20 bg-white/90 backdrop-blur-sm shadow-lg text-base text-[#5B4233] focus:outline-none focus:ring-2 focus:ring-[#c0841a]/50"
            />
          </div>
        </motion.div>

        {/* Accordion Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-xl font-bold mb-4 text-[#5B4233]">
                {category.name}
              </h2>
              <Accordion.Root type="single" collapsible className="space-y-2">
                {category.questions.map((question) => (
                  <Accordion.Item
                    key={question.id}
                    value={question.id}
                    className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl border border-[#5B4233]/20 mb-2 overflow-hidden"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full px-6 py-4 flex flex-row-reverse justify-between items-center text-base font-bold text-[#5B4233] hover:bg-[#c0841a]/50 transition-colors text-right">
                        <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
                        <span>{question.question}</span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-6 pb-4 text-base text-[#5B4233]/80 overflow-hidden">
                      <div className="py-2">
                        <p className="whitespace-pre-line">{question.answer}</p>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </motion.section>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCategories.length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-base text-[#5B4233]/60">
              لم يتم العثور على أسئلة تطابق "{searchTerm}"
            </p>
          </motion.div>
        )}
      </div>

    </div>
  )
}
