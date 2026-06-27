"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    // PERUBAHAN DI SINI: fixed -> sticky, ditambah background, blur, dan border-bottom
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center backdrop-blur-md border-b border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6">

        {/* Left Side: Logo & Icon */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Geometric Hexagon Logo */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-lg shadow-black/50">
            <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
          </div>
          <span className="font-sans font-bold tracking-tight text-white text-base">
            Crypture
          </span>
        </Link>

        {/* Center: Navigation Pill Container (Desktop) */}
        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-6 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-1.5 shadow-inner backdrop-blur-md">
            <Link href="/" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              Home
            </Link>
            <Link href="/berita" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              Berita
            </Link>
            <Link href="/event" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              Event
            </Link>
            <Link href="/aspirasi" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              Aspirasi
            </Link>
            <Link href="/dashboard" className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden rounded-full border border-white/15 bg-white/[0.04] px-5 py-1.5 text-xs font-semibold text-white tracking-wide transition-all hover:bg-white/10 hover:border-white/30 md:inline-block"
          >
            Login/Register
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 md:hidden hover:text-white transition-colors focus:outline-none"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full border-b border-white/10 bg-[#050505]/95 px-6 py-6 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-400 hover:text-white py-1 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/berita"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-400 hover:text-white py-1 transition-colors"
            >
              Berita
            </Link>
            <Link
              href="/event"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-400 hover:text-white py-1 transition-colors"
            >
              Event
            </Link>
            <Link
              href="/aspirasi"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-400 hover:text-white py-1 transition-colors"
            >
              Aspirasi
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-400 hover:text-white py-1 transition-colors"
            >
              Dashboard
            </Link>
            <hr className="border-white/10 my-1" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="inline-flex justify-center items-center rounded-full border border-white/15 bg-white/[0.04] py-2 px-4 text-xs font-semibold text-white tracking-wide transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}