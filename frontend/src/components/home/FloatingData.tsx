import { useState, useEffect } from "react"
import { getImages } from "@/lib/api/images"
import type { ImageItem } from "@/lib/api/images"

function SkeletonCard({ isDesktop = false }: { isDesktop?: boolean }) {
    return (
        <div className={`glass-card-glowing rounded-2xl overflow-hidden border border-white/5 animate-pulse ${isDesktop ? "" : "min-w-[280px] w-[80vw] shrink-0 snap-center"}`}>
            <div className={`w-full bg-white/5 ${isDesktop ? "h-48 md:h-52" : "h-44"}`} />
            <div className="p-4 space-y-2">
                <div className="h-2.5 w-3/4 rounded bg-white/5" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-2/3 rounded bg-white/5" />
            </div>
        </div>
    )
}

export default function FloatingData() {
    const [images, setImages] = useState<ImageItem[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getImages(1, 4)
            .then((res) => setImages(res.data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])
    return (
        <>
            <div className="relative w-full max-w-5xl mt-10 sm:mt-12 z-10 px-4">
                {/* Mobile: horizontal scroll */}
                <div className="flex sm:hidden overflow-x-auto gap-4 pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                        : images.map((card, i) => (
                            <div
                                key={i}
                                className="min-w-[280px] w-[80vw] shrink-0 snap-center glass-card-glowing rounded-2xl overflow-hidden border border-white/5 group"
                            >
                                <div className="relative h-44 w-full overflow-hidden">
                                    <img
                                        src={card.image_url}
                                        alt={card.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-3">
                                    <p className="text-[10px] text-zinc-400 font-medium mb-1 line-clamp-1">{card.description}</p>
                                    <p className="text-xs font-bold text-white leading-snug line-clamp-2">{card.title}</p>
                                </div>
                            </div>
                        ))}
                </div>
                {/* Desktop: grid */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-4 items-start">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} isDesktop />)
                        : images.map((card, i) => (
                            <div
                                key={i}
                                className={`glass-card-glowing rounded-2xl overflow-hidden border border-white/5 hover:scale-[1.03] transition-all duration-300 group ${i === 0 || i === images.length - 1
                                        ? "lg:-translate-y-6 xl:-translate-y-8"
                                        : "lg:translate-y-4 xl:translate-y-6"
                                    }`}
                            >
                                <div className="relative h-48 md:h-52 w-full overflow-hidden">
                                    <img
                                        src={card.image_url}
                                        alt={card.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-[11px] text-zinc-400 font-medium mb-1 line-clamp-1">{card.description}</p>
                                    <p className="text-sm font-bold text-white leading-snug line-clamp-2">{card.title}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}
