'use client'

import Link from 'next/link'
import { useState } from 'react'
import content from '@/content/content.json'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ArrowLeft, Mail, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const data = content.privacy
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div dir="rtl" className="min-h-screen bg-[#F2F0EB] text-[#5B4233]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
          <p className="text-xl font-bold mb-2 text-[#5B4233]/80">
            {data.hero.subtitle}
          </p>
          <p className="text-sm text-[#5B4233]/60">
            آخر تحديث: {data.hero.last_updated}
          </p>
        </motion.section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* TOC Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-8 bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20"
            >
              <h3 className="text-lg font-bold mb-4 text-[#5B4233]">جدول المحتويات</h3>
              <nav className="space-y-2">
                {data.sections.map((section, idx) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    className={`w-full text-right px-4 py-2 rounded-xl text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#c0841a]/20 text-[#c0841a] font-bold'
                        : 'text-[#5B4233]/70 hover:bg-[#c0841a]/10 hover:text-[#5B4233]'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-2">

        {/* Quick Summary - 5 points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#c0841a]/10 border-2 border-[#c0841a] rounded-3xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4 text-[#5B4233]">ملخص سريع</h3>
          {data.summaryBullets.map((bullet, idx) => (
            <div key={idx} className="flex gap-3 items-start mb-4 last:mb-0">
              <Shield className="w-5 h-5 text-[#c0841a] mt-1 flex-shrink-0" />
              <p className="text-base">{bullet}</p>
            </div>
          ))}
        </motion.div>

        {/* Numbered Sections Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Accordion.Root 
            type="single" 
            collapsible 
            className="space-y-2"
            value={activeSection || undefined}
            onValueChange={(value) => setActiveSection(value)}
          >
            {data.sections.map((section, idx) => (
              <Accordion.Item
                key={section.id}
                value={section.id}
                className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl border border-[#5B4233]/20 mb-2 overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center text-base font-bold text-[#5B4233] hover:bg-[#c0841a]/50 transition-colors text-right">
                    <span>{section.title}</span>
                    <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-4 text-base text-[#5B4233]/80 overflow-hidden text-right">
                  <div className="py-2 space-y-2">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-6 border border-[#5B4233]/20 mb-8"
        >
          <div className="flex gap-3 items-center mb-3">
            <Mail className="w-6 h-6 text-[#c0841a]" />
            <h3 className="text-lg font-bold">للتواصل</h3>
          </div>
          <a 
            href={`mailto:${data.contact.email}`} 
            className="text-[#c0841a] hover:underline text-base block mb-1"
          >
            {data.contact.email}
          </a>
          <p className="text-sm text-[#5B4233]/60">{data.contact.response_time}</p>
        </motion.div>

        {/* Compliance Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-green-50/10 border-2 border-green-200 rounded-3xl p-6 text-center"
        >
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">{data.compliance.title}</h3>
          <div className="flex gap-2 justify-center mb-3 flex-wrap">
            {data.compliance.standards.map((standard, idx) => (
              <span 
                key={idx} 
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {standard}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#5B4233]/60">{data.compliance.note}</p>
        </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
