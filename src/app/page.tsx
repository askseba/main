"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { CTAButton } from "@/components/ui/CTAButton"
import { PerfumeCard } from "@/components/ui/PerfumeCard"
import { getFeaturedPerfumes } from "@/lib/data/perfumes"

export default function Home() {
  const featuredPerfumes = getFeaturedPerfumes(3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    },
  }

  return (
    <div className="min-h-screen bg-cream-bg overflow-hidden" dir="rtl">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-12">
              <h1 className="font-serif italic text-6xl md:text-7xl font-black text-brown-text leading-none">
                ask.seba
              </h1>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-brown-text mb-6 leading-tight"
            >
              اكتشف عطرك المثالي
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-brown-text/70 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              اختبار ذكي يطابق شخصيتك مع آلاف العطور العالمية في 3 دقائق
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants}>
              <CTAButton 
                variant="primary" 
                size="lg" 
                href="/quiz/step1-symptoms"
                className="text-lg px-12 py-6 mb-8 mx-auto block"
              >
                ابدأ الاختبار المجاني
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h3 className="text-4xl font-bold text-brown-text mb-4">
              أفضل العطور المُوصى بها
            </h3>
            <p className="text-lg text-brown-text/60">
              ابدأ رحلتك مع هذه التحف الفاخرة
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredPerfumes.map((perfume) => (
              <motion.div
                key={perfume.id}
                variants={itemVariants}
              >
                <Link href={`/perfume/${perfume.id}`}>
                  <PerfumeCard
                    variant={perfume.variant || 'bestseller'}
                    title={perfume.name}
                    brand={perfume.brand}
                    matchPercentage={perfume.matchPercentage || perfume.score || 0}
                    price={perfume.price}
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
