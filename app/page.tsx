'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { artists } from '@/data/mockData'
import FallenLetters from '@/components/FallenLetters'

export default function LandingPage() {
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)

  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Get featured artworks for marquee
  const featuredArtworks = artists.flatMap(artist => artist.portfolio).slice(0, 8)
  const featuredArtist = artists[0]

  return (
    <main className="bg-[#f3eee8] text-black overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-[calc(100vh-4rem)] min-h-[720px] flex items-start justify-start pt-24 lg:pt-32 px-6 md:px-16 lg:px-24 overflow-hidden"
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
              <div className="lg:col-span-7">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-black/70">
                    (WE ARE)
                  </span>
                  <span className="h-px flex-1 bg-black/10" />
                </div>

                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-[1.1] text-black"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.1 }}
                >
                  A commission marketplace
                  <br />
                  with <span className="italic">instant AI concepts</span>.
                </motion.h1>

                <motion.p
                  className="mt-4 text-sm sm:text-base md:text-lg text-black/70 max-w-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                >
                  Find an artist, generate a concept in their style, and send a request they can accept.
                  Escrow holds payment until delivery.
                </motion.p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
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

      {/* Featured Art Marquee */}
      <section className="py-20 bg-white">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -50 * featuredArtworks.length * 2],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...featuredArtworks, ...featuredArtworks].map((artwork, idx) => (
              <motion.div
                key={`${artwork.id}-${idx}`}
                className="flex-shrink-0 w-64 md:w-80 h-96 relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-20 text-center">
            How It Works
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent pointer-events-none" />
            <div className="grid gap-10 md:gap-10 grid-cols-1 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Find an artist',
                  desc: 'Browse the marketplace and filter by style, price, and availability until you find a portfolio you love.',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="3.2" />
                      <path d="M5 20c.8-4 4-6 7-6s6.2 2 7 6" />
                    </svg>
                  ),
                },
                {
                  step: '02',
                  title: 'Prompt your idea (AI)',
                  desc: 'Describe what you want. AI generates a concept in the artist’s style — or upload an image you already have.',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l1.8 5.4L19 9.2l-4.8 1.6L12 16l-2.2-5.2L5 9.2l5.2-1.8L12 2Z" />
                      <path d="M4 18h7" />
                      <path d="M4 21h10" />
                    </svg>
                  ),
                },
                {
                  step: '03',
                  title: 'Send & get it delivered',
                  desc: 'Send the request. If accepted, the artist creates the piece and ships it to you — payment releases on approval.',
                  icon: (
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7h11v10H3V7Z" />
                      <path d="M14 10h4l3 3v4h-7v-7Z" />
                      <circle cx="7" cy="18" r="1.6" />
                      <circle cx="18" cy="18" r="1.6" />
                      <path d="M10 11h2" />
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  className="flex flex-col gap-4 pt-4 md:pt-12"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white text-[10px] font-semibold tracking-widest uppercase">
                      {item.step}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 text-black">
                      {item.icon}
                    </div>
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

      {/* Spotlight Section */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative h-[600px] md:h-[800px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={featuredArtist.portfolio[0]?.image || featuredArtworks[0]?.image}
              alt={featuredArtist.name}
              fill
              className="object-cover rounded-sm"
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-sm font-mono tracking-widest uppercase text-gray-500">
              Featured Artist
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              {featuredArtist.name}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {featuredArtist.bio}
            </p>
            <div className="flex gap-4 flex-wrap">
              {featuredArtist.style.map(s => (
                <span
                  key={s}
                  className="px-4 py-2 border border-black text-sm uppercase tracking-widest"
                >
                  {s}
                </span>
              ))}
            </div>
            <MagneticButton href="/marketplace" variant="outline">
              Meet the Artist
            </MagneticButton>
          </motion.div>
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

