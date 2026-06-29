"use client"

import Link from "next/link"
import { useState } from "react"

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}


function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM19 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M5 17V3h12v14M9 17h7" />
      <path d="M17 7h3l3 4v4h-3" />
    </svg>
  )
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h-1a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1" />
      <path d="M20 14h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1" />
      <path d="M22 14v-2A10 10 0 0 0 2 12v2" />
      <path d="M6 14h.01M18 14h.01" />
      <path d="M6 18h.01M18 18h.01" />
    </svg>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/event", label: "Event" },
    { href: "/galery", label: "Galeri" },
    { href: "/berita", label: "Berita" },
    { href: "/aspirasi", label: "Aspirasi" },
    { href: "/sertifikat", label: "Sertifikat" },
    { href: "/devisi", label: "Devisi" },
    // { href: "/tentang", label: "Tentang" },

  ]

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* ─── Tier 1: Announcement Bar ─────────────────────────────── */}
      <div className={`bg-blue-900 transition-all duration-500 ease-in-out ${showAnnouncement ? "max-h-16 opacity-100" : "max-h-0 opacity-0 overflow-hidden py-0 border-transparent"
        }`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 px-4 py-[10px]">
          <svg className="h-[18px] w-[18px] shrink-0 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
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

      {/* ─── Tier 2: Main Bar ─────────────────────────────────────── */}
      <div className="bg-black/70 backdrop-blur-3xl">
        <div className="mx-auto flex max-w-[1280px] items-cene_certificatester justify-between px-4 py-4">
          {/* Brand */}
          <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <div className="relative flex h-8 w-8 text-sm">
              <img src="#" alt="logo_hmtika" />
              <div className="absolute inset-0 bg-amber-gold/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
            </div>
            <span className="font-heading font-semibold tracking-tight text-white text-base">HMTIKA</span>
          </Link>

          {/* Desktop Nav Links (hidden below lg) */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-heading flex items-center gap-1 text-sm font-semibold text-slate-200 hover:text-amber-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-px h-6 bg-white/10" />

            <Link
              href="/login"
              className="font-heading hidden lg:inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-1.5 text-xs font-semibold text-white tracking-wide transition-all hover:bg-white/20 hover:border-white/30"
            >
              Masuk
            </Link>

            {/* Hamburger - only below 768px */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hidden max-md:inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/20 bg-white/10 text-zinc-300 hover:text-white transition-colors focus:outline-none"
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Drawer ────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="w-full bg-bg-dark/95 px-4 py-6 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading flex items-center gap-1 text-zinc-400 hover:text-amber-gold py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-1" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="font-heading inline-flex justify-center items-center rounded-full border border-white/15 bg-white/10 py-2 px-4 text-xs font-semibold text-white tracking-wide transition-all"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
