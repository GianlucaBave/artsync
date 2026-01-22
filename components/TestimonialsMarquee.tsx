'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
    {
        text: "Got a portrait of my parents for their 50th anniversary. Seeing my mom cry happy tears was priceless. The artist captured them perfectly.",
        author: "Elena R.",
        role: "Collector",
        rating: 5
    },
    {
        text: "My dog Buster passed away last year, and I wanted a painting of him to remember him by. It's beautiful, thank you so much.",
        author: "Mark S.",
        role: "Collector",
        rating: 5
    },
    {
        text: "Commissioned a superhero version of my husband for his birthday. He absolutely loved it! Best gift I've ever given.",
        author: "Sarah J.",
        role: "Collector",
        rating: 5
    },
    {
        text: "Wanted a unique wedding gift for my best friend. The artist turned their favorite photo into a stunning watercolor. Highly recommend!",
        author: "David L.",
        role: "Collector",
        rating: 5
    },
    {
        text: "I was struggling to find a personal gift for my sister. The AI concept helped me visualize the idea, and the final result was even better.",
        author: "Jessica T.",
        role: "Collector",
        rating: 4
    },
    {
        text: "Amazing work! Turned a blurry old photo of my grandfather into a masterpiece. My dad was speechless when he saw it.",
        author: "Tom H.",
        role: "Collector",
        rating: 5
    }
]

export default function TestimonialsMarquee() {
    return (
        <section className="py-20 bg-white border-b border-neutral-100 overflow-hidden">
            <div className="flex overflow-hidden">
                <motion.div
                    className="flex gap-8 px-8"
                    animate={{
                        x: [0, -400 * TESTIMONIALS.length],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {/* Repeat list twice for seamless loop */}
                    {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((review, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[400px] p-8 bg-[#f9f9f9] rounded-lg border border-neutral-100"
                        >
                            <div className="flex gap-1 mb-4 text-black">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`w-4 h-4 ${star <= review.rating ? 'fill-black' : 'fill-gray-300'}`}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-lg font-medium text-black mb-6 leading-relaxed">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-bold font-mono">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-black">{review.author}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
