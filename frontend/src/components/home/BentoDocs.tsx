"use client"

import { ArrowRight, Check, Code2, Palette, GraduationCap, Trophy } from "lucide-react"
import { ParticleCard } from "./MagicBento"
import "@/styles/magic-bento.css"

const featuredData = {
  icon: Code2,
  title: "Tentang HMTIKA",
  scopes: [
    "Pengembangan Web",
    "Desain UI/UX",
    "Workshop & Pelatihan",
    "Kompetisi & Hackathon",
    "Penelitian & Inovasi",
    "Pengabdian Masyarakat",
  ],
}

const smallCards = [
  {
    icon: Code2,
    title: "Pengembangan Web",
    description: "Solusi website modern berbasis teknologi terkini untuk berbagai kebutuhan organisasi dan mitra.",
    linkLabel: "Selengkapnya",
    href: "/web",
  },
  {
    icon: Palette,
    title: "Desain & Kreatif",
    description: "Desain UI/UX, identitas visual, dan aset kreatif berkualitas tinggi untuk berbagai platform.",
    linkLabel: "Selengkapnya",
    href: "/design",
  },
  {
    icon: GraduationCap,
    title: "Workshop & Seminar",
    description: "Pelatihan rutin untuk meningkatkan kompetensi anggota dan masyarakat umum di bidang teknologi.",
    linkLabel: "Lihat Jadwal",
    href: "/workshop",
  },
  {
    icon: Trophy,
    title: "Kompetisi & Hackathon",
    description: "Ajang adu kreativitas dan inovasi teknologi tingkat mahasiswa yang diadakan secara berkala.",
    linkLabel: "Ikuti Lomba",
    href: "/kompetisi",
  },
]

export default function BentoDocs() {
  const glowColor = "56, 189, 248"
  const cardClass = "magic-bento-card magic-bento-card--border-glow aspect-auto min-h-[220px]"
  const particleProps = {
    glowColor,
    particleCount: 12,
    enableTilt: true,
    clickEffect: true,
    enableMagnetism: true,
  }

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden border-t border-white/[0.03]">
      <div className="mx-auto max-w-6xl">
        {/* ─── Header block ─── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-5">
            ◎ Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-white">
            Program{" "}
            <span className="font-display italic font-light text-sky-400">
              HMTIKA
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Berbagai program dan kegiatan yang diselenggarakan oleh HMTIKA untuk mengembangkan potensi mahasiswa.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a
              href="/program"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Lihat Semua Program
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/daftar"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Daftar Sekarang
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ─── Bento Grid ─── */}
        <div className="bento-section">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1fr] lg:grid-rows-[repeat(2, 1fr)] gap-4">
            {/* Featured card — center, spans 2 rows */}
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <ParticleCard className={cardClass} {...particleProps}>
                <div className="absolute inset-0 bg-gradient-to-br from-sky-950/30 via-zinc-900 to-zinc-950" />
                <div className="relative z-10 flex flex-col h-full p-6">
                  <div className="flex justify-center mb-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = featuredData.icon
                        return <Icon className="w-5 h-5 text-sky-400" />
                      })()}
                    </div>
                  </div>
                  <h3 className="text-center text-white font-semibold text-lg">{featuredData.title}</h3>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-5">
                    {featuredData.scopes.map((scope) => (
                      <div key={scope} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="text-xs text-zinc-300">{scope}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/[0.06]">
                    <a
                      href="/tentang"
                      className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                      Pelajari Lebih Lanjut
                      <ArrowRight className="w-3 h-3" />
                    </a>
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-lg hover:bg-sky-400 transition-colors">
                      <ArrowRight className="w-3 h-3" />
                      Gabung Sekarang
                    </button>
                  </div>
                </div>
              </ParticleCard>
            </div>

            {smallCards.map((card, index) => {
              const gridPos = [
                "lg:col-start-1 lg:row-start-1",
                "lg:col-start-1 lg:row-start-2",
                "lg:col-start-3 lg:row-start-1",
                "lg:col-start-3 lg:row-start-2",
              ][index]
              const Icon = card.icon
              return (
                <div key={card.title} className={gridPos}>
                  <ParticleCard className={cardClass} {...particleProps}>
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
                    <div className="relative z-10 flex flex-col items-center justify-between h-full p-5">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center mb-3">
                          <Icon className="w-4 h-4 text-zinc-300" />
                        </div>
                        <h3 className="text-center text-white font-medium text-sm">{card.title}</h3>
                        <p className="text-center text-zinc-400 text-xs mt-1.5 leading-relaxed max-w-[200px]">
                          {card.description}
                        </p>
                      </div>
                      <a
                        href={card.href}
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors mt-3"
                      >
                        {card.linkLabel}
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </ParticleCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
