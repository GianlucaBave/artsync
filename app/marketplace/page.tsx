'use client'

import { useState } from 'react'
import MarketplaceGrid from '@/components/MarketplaceGrid'
import ArtistDetailModal from '@/components/ArtistDetailModal'
import CommissionWizard from '@/components/CommissionWizard'
import { artists } from '@/data/mockData'
import type { Artist } from '@/types'

export default function MarketplacePage() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [showCommissionWizard, setShowCommissionWizard] = useState(false)
  const [commissionArtist, setCommissionArtist] = useState<Artist | null>(null)

  const handleArtistClick = (artist: Artist) => {
    setSelectedArtist(artist)
  }

  const handleStartCommission = (artist: Artist) => {
    setCommissionArtist(artist)
    setShowCommissionWizard(true)
    setSelectedArtist(null)
  }

  const handleCloseDetail = () => {
    setSelectedArtist(null)
  }

  const handleCloseWizard = () => {
    setShowCommissionWizard(false)
    setCommissionArtist(null)
  }

  return (
    <main className="min-h-screen bg-white">
      <MarketplaceGrid 
        artists={artists} 
        onArtistClick={handleArtistClick}
      />
      
      {selectedArtist && (
        <ArtistDetailModal
          artist={selectedArtist}
          onClose={handleCloseDetail}
          onStartCommission={handleStartCommission}
        />
      )}

      {showCommissionWizard && commissionArtist && (
        <CommissionWizard
          artist={commissionArtist}
          onClose={handleCloseWizard}
        />
      )}
    </main>
  )
}
