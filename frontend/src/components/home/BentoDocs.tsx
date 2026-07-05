"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import MagicBento from "./MagicBento"
import { getImages } from "@/lib/api/images"
import type { ImageItem } from "@/lib/api/images"

const defaultCategories = [
    { label: "Dokumentasi" },
    { label: "Workshop" },
    { label: "Kompetisi" },
    { label: "Kolaborasi" },
    { label: "Sosial" },
    { label: "Prestasi" },
]

export default function BentoDocs() {
    const [images, setImages] = useState<ImageItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getImages(1, 6)
            .then((res) => setImages(res.data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const cards = loading
        ? undefined
        : images.map((img, i) => ({
            image: img.image_url,
            label: defaultCategories[i]?.label ?? "Dokumentasi",
            title: img.title,
            description: img.description ?? "",
        }))

    return (
        <section className="w-full py-24 px-6 relative overflow-hidden border-t border-white/[0.03]">
            <div className="mx-auto max-w-6xl">
                {/* ─── Header block ─── */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-5">
                        ◎ Dokumentasi
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-white">
                        Galeri Kegiatan{" "}
                        <span className="font-display italic font-light text-sky-400">
                            HMTIKA
                        </span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                        Dokumentasi foto dan video dari setiap acara, seminar, dan workshop yang pernah diselenggarakan HMTIKA.
                    </p>
                    {/* Text links row */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <a
                            href="/galery"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                        >
                            Lihat Semua Gallery
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href="/event"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                        >
                            Event Mendatang
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

                {/* MagicBento card grid */}
                <div className="w-full flex justify-center">
                    <MagicBento
                        cards={cards}
                        textAutoHide={true}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={300}
                        particleCount={12}
                        glowColor="56, 189, 248"
                    />
                </div>
            </div>
        </section>
    )
}
