import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: {
    default: 'ArtSync - Commission Marketplace with AI Concepts',
    template: '%s | ArtSync'
  },
  description: 'Connect with world-class artists for custom commissions. Generate concepts with AI, request art, and pay securely via escrow.',
  keywords: ['art commission', 'marketplace', 'ai art concept', 'custom art', 'escrow payment', 'digital art', 'oil painting'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://artsync.com',
    siteName: 'ArtSync',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'ArtSync Marketplace',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable} flex flex-col min-h-screen`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
