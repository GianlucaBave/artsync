export interface Artist {
  id: string
  name: string
  avatar: string
  bio: string
  style: string[]
  rating: number
  reviewCount: number
  priceRange: {
    min: number
    max: number
  }
  availability: 'available' | 'busy' | 'unavailable'
  portfolio: Artwork[]
  reviews: Review[]
}

export interface Artwork {
  id: string
  title: string
  image: string
  style: string
  year: number
}

export interface Review {
  id: string
  clientName: string
  rating: number
  comment: string
  date: string
}

export interface CommissionRequest {
  id: string
  artistId: string
  artistName: string
  size: string
  budget: number
  deadline: string
  conceptImage?: string
  description?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}
