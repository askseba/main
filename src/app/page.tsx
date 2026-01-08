"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { CTAButton } from "@/components/ui/CTAButton"
import { PerfumeCard } from "@/components/ui/PerfumeCard"
import { getFeaturedPerfumes } from "@/lib/data/perfumes"

export default function Home() {
  const featuredPerfumes = getFeaturedPerfumes(3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen bg-cream-bg" dir="rtl">
      {/* HERO - Artboard 1 */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-8 md:mb-12">
              <h1 className="font-serif italic text-5xl md:text-[72px] font-black text-brown-text leading-none tracking-tight">
                ask.seba
              </h1>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              variants={itemVariants}
              className="font-bold text-4xl md:text-[48px] text-brown-text mb-6 md:mb-8 leading-tight"
            >
              اكتشف عطرك المثالي في ٣ دقائق
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-brown-text/70 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              اختبار علمي ذكي يحلل شخصيتك ويفضل لك العطور المثالية من آلاف الخيارات العالمية
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mb-12">
              <CTAButton 
                variant="primary" 
                size="lg" 
                href="/quiz"
                className="text-base md:text-lg px-12 md:px-16 py-6 mx-auto shadow-button"
              >
                ابدأ الاختبار المجاني
              </CTAButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-brown-text/60"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-safe-green rounded-full" />
                <span>دقة ٩٢٪</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 bg-warning-orange rounded-full" />
                <span>١٠٠٠٠+ مستخدم</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PERFUMES */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h3 className="font-bold text-3xl md:text-4xl text-brown-text mb-4">
              أفضل العطور المُوصى بها
            </h3>
            <p className="text-lg text-brown-text/60 max-w-2xl mx-auto">
              ابدأ رحلتك مع هذه التحف الفاخرة المختارة خصيصًا
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {featuredPerfumes.map((perfume) => (
              <motion.div
                key={perfume.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/perfume/${perfume.id}`}>
                  <PerfumeCard
                    id={perfume.id}
                    variant={perfume.variant || 'on-sale'}
                    title={perfume.name}
                    brand={perfume.brand}
                    matchPercentage={perfume.matchPercentage || perfume.score || 0}
                    imageUrl={perfume.image}
                    isSafe={perfume.isSafe ?? (perfume.matchPercentage || perfume.score || 0) >= 80}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
