'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { artists } from '@/data/mockData'
import FallenLetters from '@/components/FallenLetters'
import TestimonialsMarquee from '@/components/TestimonialsMarquee'

export default function LandingPage() {
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)

  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Carousel state
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0)
  const featuredArtist = artists[currentArtistIndex]

  const nextArtist = () => {
    setCurrentArtistIndex((prev) => (prev + 1) % artists.length)
  }

  const prevArtist = () => {
    setCurrentArtistIndex((prev) => (prev - 1 + artists.length) % artists.length)
  }

  return (
    <main className="bg-[#f3eee8] text-black overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-[calc(100vh-4rem)] flex items-start justify-start pt-24 lg:pt-32 px-6 md:px-16 lg:px-24 overflow-hidden"
        style={{ y }}
      >
        {/* Fallen background letters (interactive) */}
        <FallenLetters />

        {/* Hero Content */}
        <motion.div
          className="relative z-20 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ opacity }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 items-start">
              <div className="lg:col-span-5" />
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-3 mb-4 w-full justify-center lg:justify-start">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-black/70">
                    (WE ARE)
                  </span>
                  <span className="hidden lg:block h-px flex-1 bg-black/10" />
                </div>

                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-[1.1] text-black w-full"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.1 }}
                >
                  A commission marketplace
                  <br />
                  with <span className="italic">instant AI concepts</span>.
                </motion.h1>

                <motion.p
                  className="mt-4 text-sm sm:text-base md:text-lg text-black/70 max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                >
                  Find an artist, generate a concept in their style, and send a request they can accept.
                  Escrow holds payment until delivery.
                </motion.p>

                <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
                  <MagneticButton href="/marketplace">
                    Enter Marketplace
                  </MagneticButton>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-black/60">
                    Browse · Prompt · Send · Delivered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-black/20 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-black/40 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Testimonials Marquee */}
      <TestimonialsMarquee />

      {/* Process Section */}
      <section className="pt-16 pb-20 md:pt-28 md:pb-24 px-4 md:px-16 lg:px-24 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-10 md:mb-20 text-center">
            How It Works
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent pointer-events-none" />
            <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-3">
              {[
                {
                  emoji: '🧑‍🎨',
                  title: 'Find an artist',
                  desc: 'Browse the marketplace and filter by style, price, and availability until you find a portfolio you love.',
                },
                {
                  emoji: '✨',
                  title: 'Prompt your idea (AI)',
                  desc: 'Describe what you want. AI generates a concept in the artist’s style — or upload an image you already have.',
                },
                {
                  emoji: '📦',
                  title: 'Send & get it delivered',
                  desc: 'Send the request. If accepted, the artist creates the piece and ships it to you — payment releases on approval.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col gap-4 pt-4 md:pt-12 text-center md:text-left"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div className="text-5xl md:text-6xl mb-4 transform hover:scale-110 transition-transform duration-300 inline-block cursor-default">
                    {item.emoji}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-serif font-bold">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Spotlight Section - Carousel */}
      <section className="pt-8 pb-24 md:pt-16 md:pb-32 px-8 md:px-16 lg:px-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Header placed above */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-center md:text-left flex-1">
              <div className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-2">
                Featured Artists
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold leading-tight whitespace-nowrap">
                {featuredArtist.name}
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex gap-2">
              <button
                onClick={prevArtist}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all"
                aria-label="Previous artist"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextArtist}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all"
                aria-label="Next artist"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[600px] md:min-h-[600px]">
            {/* Key changes to force animation re-render when index changes */}
            <motion.div
              key={currentArtistIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8 md:gap-16 items-start"
            >
              <div className="relative h-[280px] md:h-[600px] w-full">
                <Image
                  src={featuredArtist.portfolio[0]?.image}
                  alt={featuredArtist.name}
                  fill
                  className="object-cover rounded-sm"
                />
              </div>

              <div className="space-y-6 md:space-y-8 text-center md:text-left">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {featuredArtist.bio}
                </p>
                <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                  {featuredArtist.style.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1.5 md:px-4 md:py-2 border border-black text-xs md:text-sm uppercase tracking-widest"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center md:justify-start">
                  <MagneticButton href="/marketplace" variant="outline">
                    View Portfolio
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

// Magnetic Button Component
function MagneticButton({
  href,
  children,
  variant = 'dark'
}: {
  href: string
  children: React.ReactNode
  variant?: 'dark' | 'outline' | 'light'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) * 0.2)
    mouseY.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const baseStyles = 'inline-block px-12 py-4 text-lg font-medium transition-all duration-300 relative z-10'
  const variants = {
    dark: 'bg-black text-white hover:bg-gray-900',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
    light: 'bg-white text-black hover:bg-gray-100',
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${baseStyles} ${variants[variant]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}

