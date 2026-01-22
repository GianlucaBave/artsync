import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Legal & Privacy | ArtSync',
    description: 'Terms of Service, Privacy Policy, and Contact Information for ArtSync.',
}

export default function LegalPage() {
    return (
        <main className="bg-white min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-24">
            <div className="max-w-3xl mx-auto space-y-24">

                {/* Header */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold">Legal Center</h1>
                    <p className="text-lg text-gray-600">
                        Transparency is key to our community. Here you will find our policies regarding privacy,
                        service usage, and how to get in touch.
                    </p>
                    <div className="flex gap-4 text-sm font-semibold uppercase tracking-widest text-black/60 pt-4">
                        <a href="#privacy" className="hover:text-black transition-colors">Privacy</a>
                        <span>·</span>
                        <a href="#terms" className="hover:text-black transition-colors">Terms</a>
                        <span>·</span>
                        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-neutral-200" />

                {/* Privacy Policy */}
                <section id="privacy" className="scroll-mt-32 space-y-6">
                    <h2 className="text-2xl font-serif font-bold">Privacy Policy</h2>
                    <div className="prose prose-neutral text-gray-600">
                        <p>
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                        <p>
                            At ArtSync, we take your privacy seriously. This policy describes how we collect, use, and handle your information when you use our services.
                        </p>
                        <h3 className="text-black font-semibold mt-6 mb-2">Information We Collect</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Account Information:</strong> When you sign up, we collect your name, email address, and payment information.
                            </li>
                            <li>
                                <strong>Commission Data:</strong> Images, prompts, and descriptions you provide for art commissions.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> Information about how you navigate and interact with our marketplace.
                            </li>
                        </ul>
                        <h3 className="text-black font-semibold mt-6 mb-2">How We Use Your Data</h3>
                        <p>
                            We use your information to facilitate commissions, process payments via escrow, and improve our AI-assisted prompting tools.
                            We do not sell your personal data to third parties.
                        </p>
                        <h3 className="text-black font-semibold mt-6 mb-2">User-to-User Sharing</h3>
                        <p>
                            When you enter a commission agreement, necessary contact details may be shared between Client and Artist solely for the purpose of fulfilling the project.
                        </p>
                    </div>
                </section>

                {/* Separator */}
                <div className="h-px bg-neutral-200" />

                {/* Terms of Service */}
                <section id="terms" className="scroll-mt-32 space-y-6">
                    <h2 className="text-2xl font-serif font-bold">Terms of Service</h2>
                    <div className="prose prose-neutral text-gray-600">
                        <p>
                            By accessing or using ArtSync, you agree to be bound by these Terms.
                        </p>

                        <h3 className="text-black font-semibold mt-6 mb-2">Beta Disclaimer</h3>
                        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm text-sm">
                            ArtSync is currently in <strong>Beta</strong>. features may change without notice. While we strive for stability, occasional interruptions may occur.
                            Escrow services are provided "as is" to ensure fair exchange between parties.
                        </div>

                        <h3 className="text-black font-semibold mt-6 mb-2">Commission Agreement</h3>
                        <p>
                            ArtSync acts as a venue. The contract for art creation is directly between the Client and the Artist.
                            ArtSync facilitates the transaction and holds funds in escrow until the work is approved.
                        </p>

                        <h3 className="text-black font-semibold mt-6 mb-2">Content Guidelines</h3>
                        <p>
                            You may not request or upload content that is illegal, hateful, or violates intellectual property rights.
                            We reserve the right to ban users who violate these guidelines.
                        </p>
                    </div>
                </section>

                {/* Separator */}
                <div className="h-px bg-neutral-200" />

                {/* Contact */}
                <section id="contact" className="scroll-mt-32 space-y-6">
                    <h2 className="text-2xl font-serif font-bold">Contact Us</h2>
                    <div className="prose prose-neutral text-gray-600">
                        <p>
                            Have questions, feedback, or need support? We're here to help.
                        </p>
                        <div className="bg-black text-white p-8 rounded-sm mt-6">
                            <h3 className="text-lg font-bold mb-4 text-white">Get in touch</h3>
                            <p className="mb-2">
                                <span className="opacity-60 block text-xs uppercase tracking-widest mb-1">General Inquiries</span>
                                <a href="mailto:hello@artsync.com" className="hover:underline">hello@artsync.com</a>
                            </p>
                            <p className="mt-6">
                                <span className="opacity-60 block text-xs uppercase tracking-widest mb-1">Support</span>
                                <a href="mailto:support@artsync.com" className="hover:underline">support@artsync.com</a>
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    )
}
