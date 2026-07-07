"use client"

import { useState } from "react"
import Link from "next/link"
import CardNav from "./CardNav"
import type { CardNavItem } from "./CardNav"

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Navbar() {
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  const cardItems: CardNavItem[] = [
    {
      label: "Beranda",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [{ label: "Home", href: "/", ariaLabel: "Home" }],
    },
    {
      label: "Informasi",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Event", href: "/event", ariaLabel: "Event HMTIKA" },
        { label: "Galeri", href: "/galery", ariaLabel: "Galeri HMTIKA" },
        { label: "Berita", href: "/berita", ariaLabel: "Berita HMTIKA" },
      ],
    },
    {
      label: "Layanan",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Aspirasi", href: "/aspirasi", ariaLabel: "Aspirasi" },
        { label: "Sertifikat", href: "/sertifikat", ariaLabel: "Sertifikat" },
        { label: "Devisi", href: "/devisi", ariaLabel: "Devisi HMTIKA" },
      ],
    },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* ─── Announcement Bar ──────────────────────────────────────── */}
      <div className={`bg-blue-900 transition-all duration-500 ease-in-out ${showAnnouncement ? "max-h-16 opacity-100" : "max-h-0 opacity-0 overflow-hidden py-0 border-transparent"
        }`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 px-4 py-[10px]">
          <span className="font-heading text-sm text-slate-300">
            Jangan lupa follow media sosial <span className="font-semibold text-slate-200">HMTIKA</span> Karena banyak hal yang seru !
          </span>
          <Link href="https://www.instagram.com/hmtika.sttb" className="group inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-slate-200 hover:text-slate-200/80 transition-colors shrink-0 underline">
            Instagram
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-200 hover:text-slate-200/60 hover:bg-slate-200/10 transition-colors shrink-0"
            aria-label="Tutup pengumuman"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── CardNav ──────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-4 py-3">
        <CardNav
          logo="/logo/logo.webp"
          logoAlt="HMTIKA"
          items={cardItems}
          baseColor="#303030"
          menuColor="#fff"
          buttonBgColor="#fff"
          buttonTextColor="#111"
          ctaLabel="Masuk"
          ctaHref="/login"
          ease="power3.out"
        />
      </div>
    </nav>
  )
}
