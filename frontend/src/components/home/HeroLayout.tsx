"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const avatars = [
  { src: "https://i.pravatar.cc/40?img=1", alt: "User 1" },
  { src: "https://i.pravatar.cc/40?img=2", alt: "User 2" },
  { src: "https://i.pravatar.cc/40?img=3", alt: "User 3" },
  { src: "https://i.pravatar.cc/40?img=4", alt: "User 4" },
  { src: "https://i.pravatar.cc/40?img=5", alt: "User 5" },
]

const graduations = [
  {
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&q=80",
    label: "Angkatan 2020",
    desc: "75 Mahasiswa",
  },
  {
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    label: "Angkatan 2021",
    desc: "82 Mahasiswa",
  },
  {
    img: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=1200&q=80",
    label: "Angkatan 2022",
    desc: "68 Mahasiswa",
  },
  {
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    label: "Angkatan 2023",
    desc: "91 Mahasiswa",
  },
  {
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=80",
    label: "Angkatan 2024",
    desc: "79 Mahasiswa",
  },
  {
    img: "https://images.unsplash.com/photo-1580974928064-f0aeef3e1e1e?w=1200&q=80",
    label: "Angkatan 2025",
    desc: "84 Mahasiswa",
  },
]

function StarRating({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function HeroLayout() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    scrollInterval.current = setInterval(() => {
      const slideWidth = el.children[0] as HTMLElement
      if (!slideWidth) return
      const scrollAmount = slideWidth.offsetWidth + 16
      const maxScroll = el.scrollWidth - el.clientWidth

      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollTo({ left: el.scrollLeft + scrollAmount, behavior: "smooth" })
      }
    }, 2000)

    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current)
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/bg_main.webm"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
      </div>

      {/* Portal glow — large radial gradient anchored to bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/25 via-sky-400/10 to-transparent rounded-[50%] blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-transparent rounded-[50%] blur-3xl translate-y-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* ─── Copy Region — 96px padding top ─── */}
        <div className="flex flex-col items-center gap-8 pt-24">

          {/* Headline — max-width 860px */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white max-w-[860px] text-center">
            Wadah Inovasi &{" "}
            <span className="font-display italic font-light text-sky-400">
              Kreativitas
            </span>{" "}
            Mahasiswa Teknik Informatika
          </h1>

          {/* Supporting paragraph */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl text-center leading-relaxed">
            Bergabunglah dengan komunitas mahasiswa Teknik Informatika STIMIK Tunas Bangsa.
            Kembangkan skill, perluas jaringan, dan raih prestasi bersama HMTIKA.
          </p>

          {/* CTA button with outer glow */}
          <div className="relative mt-2">
            <div className="absolute inset-0 -inset-x-4 -inset-y-2 bg-gradient-to-r from-sky-400/20 via-amber-400/20 to-sky-400/20 rounded-full blur-xl" />
            <Link
              href="/aspirasi"
              className="relative inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#050505] hover:bg-zinc-100 transition-all shadow-xl"
            >
              Kirim Aspirasi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ─── Graduation Photo Mockup — 44px margin top ─── */}
        <div className="mt-11 w-full pb-0">
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-xl border border-white/[0.08] overflow-hidden shadow-2xl bg-[#0a0a0a]">
              {/* Browser window chrome */}
              <div className="flex items-center gap-1.5 px-4 h-9 bg-[#0f0f0f] border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>

              {/* Graduation carousel — full images, scroll one by one */}
              <div className="relative">
                <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-3">
                  {/* <div>
                    <h3 className="text-sm font-semibold text-white">
                      Wisuda & Kelulusan
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                      Seluruh angkatan Teknik Informatika
                    </p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">6 angkatan</span> */}
                </div>
                <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 sm:px-6 pb-4 sm:pb-6">
                  <h1 className="text-sm sm:text-base text-zinc-400 max-w-2xl text-center leading-relaxed">Loading, fitur sedang dalam pengembangan</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
