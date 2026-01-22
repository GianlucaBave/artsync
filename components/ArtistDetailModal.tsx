'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { Artist } from '@/types'

interface ArtistDetailModalProps {
  artist: Artist
  onClose: () => void
  onStartCommission: (artist: Artist) => void
}

type Tab = 'works' | 'about' | 'reviews'

export default function ArtistDetailModal({
  artist,
  onClose,
  onStartCommission,
}: ArtistDetailModalProps) {
  const [tab, setTab] = useState<Tab>('works')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? 'text-black' : 'text-neutral-300'}
      >
        ★
      </span>
    ))
  }

  const stats = useMemo(() => {
    const works = artist.portfolio.length
    const commissions = Math.max(6, Math.min(artist.reviewCount, 48))
    const rating = artist.rating.toFixed(1)
    return { works, commissions, rating }
  }, [artist.portfolio.length, artist.rating, artist.reviewCount])

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-sm max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-neutral-200 px-4 sm:px-8 py-4 sm:py-6 z-10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-black hover:bg-neutral-50 shrink-0 z-20"
            aria-label="Close"
          >
            ×
          </button>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 pr-12 md:pr-16">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                Artist Profile
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-[0.95] break-words">
                {artist.name}
              </h2>

              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-y-2 text-xs sm:text-sm">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold tracking-widest text-neutral-500 uppercase">Works</span>
                  <span className="font-bold text-black">{stats.works}</span>
                </div>
                <div className="mx-3 sm:mx-4 h-3 sm:h-4 w-px bg-neutral-200" />
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold tracking-widest text-neutral-500 uppercase">Commissions</span>
                  <span className="font-bold text-black">{stats.commissions}</span>
                </div>
                <div className="mx-3 sm:mx-4 h-3 sm:h-4 w-px bg-neutral-200" />
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold tracking-widest text-neutral-500 uppercase">Rating</span>
                  <span className="font-bold text-black">{stats.rating}</span>
                </div>
                <div className="mx-3 sm:mx-4 h-3 sm:h-4 w-px bg-neutral-200" />
                <div className="flex items-center gap-2">
                  <div className="flex leading-none scale-75 sm:scale-100 origin-left">{renderStars(artist.rating)}</div>
                  <span className="font-semibold tracking-widest text-neutral-500 uppercase">
                    {artist.reviewCount} reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto mt-2 md:mt-0">
              <button onClick={() => onStartCommission(artist)} className="btn-primary w-full md:w-auto text-center justify-center">
                Start Commission
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex items-center gap-8 border-t border-neutral-200 pt-4">
            {(['works', 'about', 'reviews'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors ${tab === t ? 'text-black' : 'text-neutral-500 hover:text-black'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-8">
          {tab === 'works' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {artist.portfolio.map((artwork) => (
                <div key={artwork.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden rounded-sm shadow-sm transition-shadow duration-200 group-hover:shadow-lg">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="pt-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-bold text-black truncate">{artwork.title}</p>
                      <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase whitespace-nowrap">
                        {artwork.style}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'about' && (
            <div className="max-w-2xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative w-20 h-20 overflow-hidden rounded-sm border border-neutral-200 shrink-0">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover" unoptimized />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                    About
                  </p>
                  <p className="text-neutral-800 leading-relaxed">{artist.bio}</p>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
                  Styles
                </p>
                <div className="flex flex-wrap gap-2">
                  {artist.style.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold tracking-widest uppercase text-black"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6 mt-6">
                <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
                  Pricing
                </p>
                <p className="text-black font-bold">
                  ${artist.priceRange.min} – ${artist.priceRange.max}
                </p>
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="max-w-3xl space-y-6">
              {artist.reviews.map((review) => (
                <div key={review.id} className="border-b border-neutral-200 pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-black">{review.clientName}</p>
                      <div className="mt-1 flex items-center gap-3">
                        <div className="flex leading-none">{renderStars(review.rating)}</div>
                        <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-neutral-800 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
