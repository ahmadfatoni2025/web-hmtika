"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { MdMenuOpen } from "react-icons/md"
import LineSidebar from "./LineSidebar"

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Event", href: "/event/" },
  { label: "Berita", href: "/berita/" },
  { label: "Galeri", href: "/galery/" },
  { label: "Devisi", href: "/devisi/" },
  { label: "Aspirasi", href: "/aspirasi/" },
  { label: "Sertifikat", href: "/sertifikat/" },
]

export default function Navbar() {
  const router = useRouter()
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
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-b from-black/60 to-transparent">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-6 flex items-center justify-between">

        {/* ─── Logo ─── */}
        <Link
          href="/"
          className="flex gap-2 items-center tracking-wide text-white drop-shadow-sm hover:opacity-90 transition-opacity"
        >
          <Image
            src="/logo/logo.webp"
            alt="Logo_HMTIKA"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* ─── Menu Toggle Button ─── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 group text-zinc-300 hover:text-white transition-colors focus:outline-none"
          aria-label="Buka menu"
        >
          <MdMenuOpen className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
        </button>
      </div>

      {/* ─── Backdrop overlay ─── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 z-30 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* ─── Sidebar Menu Panel (Menggunakan LineSidebar) ─── */}
      <div
        className={`fixed top-0 bottom-0 right-0 left-auto w-full sm:w-[380px] md:w-[420px] h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-40 border-l border-white/10 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          background: "radial-gradient(circle at right center, #181922 0%, #050508 100%)",
        }}
      >
        {/* Close Button X */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors p-2 focus:outline-none flex items-center gap-2 text-[10px] font-mono tracking-wider z-50"
          aria-label="Tutup menu"
        >
          <span>CLOSE (ESC)</span>
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col justify-between h-full px-8 py-20 relative">

          {/* Main Links Container */}
          <div className="flex-1 flex flex-col justify-center mt-8 relative">
            <p
              className={`text-zinc-500 text-[10px] tracking-widest uppercase font-mono mb-4 transition-all duration-500 delay-100 transform ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
            >
              Navigasi Menu
            </p>

            <div
              className={`flex-1 w-full transition-all duration-700 transform ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                }`}
              style={{ transitionDelay: "150ms" }}
            >
              <LineSidebar
                items={navLinks.map((l) => l.label)}
                accentColor="#d4a853"
                textColor="#52525b"
                markerColor="#3f3f46"
                showIndex
                showMarker
                proximityRadius={120}
                maxShift={25}
                falloff="smooth"
                markerLength={50}
                markerGap={16}
                tickScale={0.4}
                scaleTick
                itemGap={12}
                fontSize={1.75}
                smoothing={120}
                onItemClick={(index) => {
                  setTimeout(() => {
                    router.push(navLinks[index].href)
                    setMenuOpen(false)
                  }, 300)
                }}
              />
            </div>
          </div>

          {/* Bottom Footer Info inside Menu */}
          <div
            className={`border-t border-zinc-800/60 pt-6 flex flex-col gap-4 text-zinc-500 text-[10px] font-mono transition-all duration-700 delay-400 transform ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
          >
            <div>
              <p className="text-zinc-400 font-semibold mb-0.5">HMTIKA STMIK Tunas Bangsa</p>
              <p>Wadah Inovasi & Kreativitas Mahasiswa</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/hmtika.sttb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}
