'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { artists } from '@/data/mockData'

export default function ArtistsLandingPage() {
  const sampleArtist = artists[0]

  return (
    <main className="bg-white text-black">
      {/* Hero for artists */}
      <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">
              For artists
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Turn your art into
              <br />
              predictable commissions.
            </h1>
            <p className="text-base md:text-lg text-neutral-700 mb-8 max-w-xl">
              ArtSync gives you a focused place to show your work, receive high‑intent commission
              requests, and get paid safely when your artwork arrives.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/dashboard" className="btn-primary">
                View your dashboard
              </Link>
              <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
                No subscriptions. You only earn when you sell.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative h-72 md:h-96 lg:h-[420px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="absolute inset-0 rounded-sm overflow-hidden border border-neutral-200 shadow-lg">
              <Image
                src={sampleArtist.portfolio[0]?.image}
                alt={sampleArtist.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white px-4 py-3 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold tracking-widest uppercase">Sample artist profile</p>
                <p className="text-[11px] text-white/80">
                  Portfolio, styles, pricing and reviews in one sharable page.
                </p>
              </div>
              <span className="hidden sm:inline-flex text-[11px] font-semibold tracking-widest uppercase">
                sharable link →
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits for artists */}
      <section className="py-20 px-6 md:px-16 lg:px-24 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
              Why ArtSync
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Designed for working artists, not social media.
            </h2>
            <p className="text-neutral-700 text-sm md:text-base">
              Clients see your work, your categories, and your availability – then send a structured
              request you can accept or decline.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
                01 · Showcase your work
              </p>
              <p className="text-sm md:text-base text-neutral-700">
                Upload your best pieces, group them by style, and add descriptions that explain your
                process and what you offer.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
                02 · Get qualified requests
              </p>
              <p className="text-sm md:text-base text-neutral-700">
                Every commission request arrives with a visual concept, client budget, and deadline,
                so you can quickly decide if it’s a fit.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
                03 · You stay in control
              </p>
              <p className="text-sm md:text-base text-neutral-700">
                Accept or decline any request. When you accept, funds are held in escrow and
                released to you once the artwork is delivered.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
                04 · Simple payout flow
              </p>
              <p className="text-sm md:text-base text-neutral-700">
                No chasing invoices. Completed, approved commissions are paid out to you through a
                single, transparent pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sharable profiles */}
      <section className="py-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.4fr,1fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">
              Shareable by design
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Your ArtSync profile is a portfolio link you can share anywhere.
            </h2>
            <p className="text-neutral-700 text-sm md:text-base mb-5">
              Use it in your Instagram bio, email signature, or portfolio site. One link that always
              points clients to your latest work and commission options.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-neutral-700">
              <li>— Clean, mobile‑first layout for your artworks and descriptions.</li>
              <li>— Clear categories and tags so clients know how to find you.</li>
              <li>— A single call to action: “Request a commission”.</li>
            </ul>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Artist Profile Preview */}
            <div className="bg-white border border-neutral-200 rounded-sm shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                    <Image
                      src={sampleArtist.avatar}
                      alt={sampleArtist.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-black tracking-tight text-black mb-1">
                      {sampleArtist.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                        ★ {sampleArtist.rating}
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-xs text-neutral-600">
                        {sampleArtist.reviewCount} reviews
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sampleArtist.style.slice(0, 3).map((style) => (
                        <span
                          key={style}
                          className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-semibold tracking-widest uppercase"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">
                      Price Range
                    </p>
                    <p className="text-sm font-bold text-black">
                      ${sampleArtist.priceRange.min} - ${sampleArtist.priceRange.max}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-1">
                      Status
                    </p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-[10px] font-semibold tracking-widest uppercase">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Gallery Preview */}
              <div className="p-6">
                <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
                  Portfolio
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {sampleArtist.portfolio.slice(0, 3).map((artwork) => (
                    <div
                      key={artwork.id}
                      className="relative aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden"
                    >
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
                <button className="w-full px-4 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-neutral-800 transition-colors">
                  Request a Commission
                </button>
              </div>

              {/* URL Badge */}
              <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200">
                <p className="text-[10px] font-mono text-neutral-500 truncate">
                  artsync.com/artists/{sampleArtist.name.toLowerCase().replace(/\s+/g, '-')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

