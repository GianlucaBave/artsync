'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isArtistMode, setIsArtistMode] = useState(pathname === '/dashboard')
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    setIsArtistMode(pathname === '/dashboard')
  }, [pathname])

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])

  const timeLabel = useMemo(() => {
    // simple local time label; can be swapped to timezone-aware later
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }, [now])

  const toggleArtistMode = () => {
    if (pathname === '/dashboard') {
      router.push('/')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <nav className="bg-[#f3eee8] border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left */}
          <Link href="/" className="flex items-center">
            <span className="text-lg sm:text-xl font-black tracking-tight text-black">ArtSync</span>
          </Link>

          {/* Center (desktop nav) */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className="text-[11px] font-semibold tracking-widest uppercase text-black/80 hover:text-black"
            >
              Marketplace
            </Link>
            <Link
              href="/artists"
              className="text-[11px] font-semibold tracking-widest uppercase text-black/80 hover:text-black"
            >
              Are you an artist?
            </Link>
            <button
              onClick={toggleArtistMode}
              className={`text-[11px] font-semibold tracking-widest uppercase transition-colors ${
                isArtistMode ? 'text-black' : 'text-black/80 hover:text-black'
              }`}
            >
              {isArtistMode ? 'Client Mode' : 'Artist Mode'}
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Mobile quick links */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                href="/marketplace"
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-black/15 bg-[#f3eee8] text-black hover:bg-black/5 transition-colors"
              >
                Marketplace
              </Link>
              <button
                onClick={toggleArtistMode}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-black/15 bg-[#f3eee8] text-black hover:bg-black/5 transition-colors"
              >
                {isArtistMode ? 'Client' : 'Artist'}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-black/70">
              <span>NYC</span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/70" />
              <span>{timeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
