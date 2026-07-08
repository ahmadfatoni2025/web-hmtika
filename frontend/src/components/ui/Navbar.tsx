"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowUpRight } from "lucide-react"
import { MdMenuOpen } from "react-icons/md"

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Event", href: "/event" },
  { label: "Galeri", href: "/galery" },
  { label: "Devisi", href: "/devisi" },
  { label: "Aspirasi", href: "/aspirasi" },
  { label: "Sertifikat", href: "/sertifikat" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Listen for ESC key to close the menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown)
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-b from-black/50 to-transparent">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-6 flex items-center justify-between">

        {/* ─── Logo (Serif Elegant style) ─── */}
        <Link href="/" className="flex gap-2 items-center tracking-wide text-white drop-shadow-sm hover:opacity-85 transition-opacity">
          <img src="/logo/logo.webp" alt="Logo_HMTIKA" className="h-10 w-auto" />
        </Link>

        {/* ─── Menu Toggle Button ─── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 group text-white font-sans text-[13px] tracking-wider uppercase font-medium focus:outline-none"
        >
          <MdMenuOpen className="h-7 w-7" />
        </button>
      </div>

      {/* ─── Backdrop overlay (click to close) ─── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-500 z-30 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* ─── 1/4 Screen Width Sidebar Menu Panel (Desktop: 1/4, Mobile: Full) ─── */}
      <div
        className={`fixed top-0 bottom-0 right-0 left-auto w-full sm:w-[350px] md:w-1/4 h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-40 border-l border-white/10 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{
          background: "radial-gradient(circle at right center, #181922 0%, #050508 100%)"
        }}
      >
        {/* Close Button X (supporting ESC) */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors p-2 focus:outline-none flex items-center gap-2 text-[10px] font-mono tracking-wider"
          aria-label="Tutup menu"
        >
          <span>CLOSE (ESC)</span>
          <X className="w-4.5 h-4.5" />
        </button>

        <div className="flex flex-col justify-between h-full px-8 py-20">

          {/* Main Links (Sliding from Right to Left when Menu opens) */}
          <div className="flex flex-col gap-5 mt-16 overflow-hidden">
            <p className={`text-zinc-500 text-[10px] tracking-widest uppercase font-mono transition-all duration-500 delay-100 transform ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}>
              Navigasi
            </p>

            {navLinks.map((link, index) => {
              const translateClass = menuOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-20 opacity-0'

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center gap-3 text-2xl md:text-3xl font-light text-zinc-300 hover:text-white w-fit transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform ${translateClass}`}
                  style={{ transitionDelay: `${150 + index * 40}ms` }}
                >
                  <span className="font-serif italic text-lg md:text-xl text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="tracking-tight">{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-zinc-400" />
                </Link>
              )
            })}
          </div>

          {/* Bottom Footer Info inside Menu */}
          <div className={`border-t border-zinc-800/60 pt-6 flex flex-col gap-4 text-zinc-500 text-[10px] font-mono transition-all duration-700 delay-400 transform ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}>
            <div>
              <p className="text-zinc-400 font-semibold mb-0.5">HMTIKA STMIK Tunas Bangsa</p>
              <p>Wadah Inovasi & Kreativitas Mahasiswa</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/hmtika.sttb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}
