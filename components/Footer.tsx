'use client'

import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-black text-white pt-12 pb-8 md:pt-20 md:pb-10 px-6 md:px-16 lg:px-24 border-t border-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
                {/* Brand */}
                <div className="space-y-4 md:space-y-6 md:col-span-2">
                    <Link href="/" className="inline-block">
                        <span className="text-2xl font-serif font-bold tracking-tight">ArtSync</span>
                    </Link>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                        Connecting visionaries with master artists.
                        Commission specialized art with confidence,
                        backed by AI ideation and secure escrow.
                    </p>
                </div>

                {/* Explore */}
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-3 md:mb-6">
                        Explore
                    </h4>
                    <ul className="space-y-2 md:space-y-4 text-sm font-medium">
                        <li>
                            <Link href="/marketplace" className="hover:text-white/70 transition-colors">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link href="/artists" className="hover:text-white/70 transition-colors">
                                For Artists
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard" className="hover:text-white/70 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-3 md:mb-6">
                        Legal
                    </h4>
                    <ul className="space-y-2 md:space-y-4 text-sm font-medium">
                        <li>
                            <Link href="/legal#privacy" className="hover:text-white/70 transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal#terms" className="hover:text-white/70 transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal#contact" className="hover:text-white/70 transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                <p>&copy; {currentYear} ArtSync. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}
