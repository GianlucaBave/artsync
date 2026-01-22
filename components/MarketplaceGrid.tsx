'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Artist } from '@/types'

interface MarketplaceGridProps {
  artists: Artist[]
  onArtistClick: (artist: Artist) => void
}

export default function MarketplaceGrid({ artists, onArtistClick }: MarketplaceGridProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [availability, setAvailability] = useState<string>('all')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const styles = ['Digital', 'Oil', 'Watercolor', 'Mixed Media', 'Character Design', 'Portrait', 'Landscape', 'Botanical', 'Abstract', 'Still Life', 'Fantasy', 'Contemporary']

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      // Style filter
      if (selectedStyles.length > 0) {
        const hasStyle = selectedStyles.some(style => 
          artist.style.some(s => s.toLowerCase().includes(style.toLowerCase()))
        )
        if (!hasStyle) return false
      }

      // Price range filter
      if (artist.priceRange.max < priceRange[0] || artist.priceRange.min > priceRange[1]) {
        return false
      }

      // Availability filter
      if (availability !== 'all' && artist.availability !== availability) {
        return false
      }

      return true
    })
  }, [artists, selectedStyles, priceRange, availability])

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  const clearAllFilters = () => {
    setSelectedStyles([])
    setPriceRange([0, 3000])
    setAvailability('all')
  }

  const getFeaturedArtwork = (artist: Artist) => {
    return artist.portfolio[0] || null
  }

  const activeFilterCount =
    (selectedStyles.length > 0 ? 1 : 0) +
    (availability !== 'all' ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 3000 ? 1 : 0)

  const FiltersContent = (
    <div className="bg-white">
      <div className="border-b border-neutral-200 pb-4 mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">Filters</h2>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs font-semibold tracking-widest uppercase text-neutral-500 hover:text-black"
        >
          Clear
        </button>
      </div>

      {/* Style Filter */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">Style</h3>
        <div className="space-y-2 max-h-72 overflow-auto pr-1">
          {styles.map(style => (
            <label key={style} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => toggleStyle(style)}
                className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black/20"
              />
              <span className="text-sm text-neutral-800">{style}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500">$</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Min"
              inputMode="numeric"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neutral-500">$</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Max"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">Availability</h3>
        <div className="space-y-2">
          {['all', 'available', 'busy', 'unavailable'].map(avail => (
            <label key={avail} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                checked={availability === avail}
                onChange={() => setAvailability(avail)}
                className="w-4 h-4 text-black focus:ring-black/20"
              />
              <span className="text-sm text-neutral-800 capitalize">{avail}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex gap-10">
        {/* Sidebar Filters (desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-6">{FiltersContent}</div>
        </aside>

        {/* Artwork Grid */}
        <div className="flex-1">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black mb-3 sm:mb-4">Marketplace</h1>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                {filteredArtists.length} {filteredArtists.length === 1 ? 'artist' : 'artists'} found
              </p>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold tracking-widest uppercase text-black hover:bg-neutral-50"
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Desktop subtitle */}
            <div className="hidden lg:block">
              <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                {filteredArtists.length} {filteredArtists.length === 1 ? 'artist' : 'artists'} found
              </p>
            </div>

            {/* Active filter chips (mobile + desktop) */}
            {(selectedStyles.length > 0 || availability !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 3000) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedStyles.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-neutral-800"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => toggleStyle(s)}
                      className="text-neutral-500 hover:text-black"
                      aria-label={`Remove ${s}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedStyles.length > 3 && (
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-500">
                    +{selectedStyles.length - 3} more
                  </span>
                )}
                {availability !== 'all' && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-neutral-800">
                    {availability}
                    <button
                      type="button"
                      onClick={() => setAvailability('all')}
                      className="text-neutral-500 hover:text-black"
                      aria-label="Clear availability"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 3000) && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-neutral-800">
                    ${priceRange[0]}–${priceRange[1]}
                    <button
                      type="button"
                      onClick={() => setPriceRange([0, 3000])}
                      className="text-neutral-500 hover:text-black"
                      aria-label="Clear price"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredArtists.map(artist => {
              const featuredArtwork = getFeaturedArtwork(artist)
              if (!featuredArtwork) return null

              return (
                <div
                  key={artist.id}
                  className="group cursor-pointer"
                  onClick={() => onArtistClick(artist)}
                >
                  <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden rounded-sm shadow-sm transition-shadow duration-200 group-hover:shadow-lg">
                    <Image
                      src={featuredArtwork.image}
                      alt={featuredArtwork.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="pt-3">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-bold text-black truncate text-sm sm:text-base">{featuredArtwork.title}</p>
                          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase truncate">
                            {artist.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {artist.style.slice(0, 2).map((style) => (
                          <span
                            key={style}
                            className="text-[10px] font-semibold tracking-widest text-neutral-600 uppercase px-2 py-0.5 bg-neutral-100"
                          >
                            {style}
                          </span>
                        ))}
                        {artist.style.length > 2 && (
                          <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
                            +{artist.style.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-black hover:bg-neutral-50 text-2xl"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>

            <div className="px-4 py-5">{FiltersContent}</div>

            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-4 py-4">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="btn-primary w-full"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
