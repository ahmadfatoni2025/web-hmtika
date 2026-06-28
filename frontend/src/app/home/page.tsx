"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getNews, getEvents, getAspirations } from "@/lib/api"
import type { NewsItem, EventItem, AspirationItem } from "@/lib/api"
import HeroSection from "@/components/home/HeroSection"
import FloatingData from "@/components/home/FloatingData"
import Collaborators from "@/components/home/Collaborators"
import Feature from "@/components/home/Feature"

export default function Home() {
  // API states
  const [news, setNews] = useState<NewsItem[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [aspirations, setAspirations] = useState<AspirationItem[]>([])

  const [totalNews, setTotalNews] = useState(0)
  const [totalEvents, setTotalEvents] = useState(0)
  const [totalAspirations, setTotalAspirations] = useState(0)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [newsRes, eventsRes, aspirationsRes] = await Promise.all([
          getNews(1, 5).catch(() => null),
          getEvents(1, 5).catch(() => null),
          getAspirations(1, 5).catch(() => null),
        ])

        if (newsRes && newsRes.data) {
          setNews(newsRes.data)
          setTotalNews(newsRes.total || newsRes.data.length)
        }

        if (eventsRes && eventsRes.data) {
          setEvents(eventsRes.data)
          setTotalEvents(eventsRes.total || eventsRes.data.length)
        }

        if (aspirationsRes && aspirationsRes.data) {
          setAspirations(aspirationsRes.data)
          setTotalAspirations(aspirationsRes.total || aspirationsRes.data.length)
        }
      } catch (err) {
        console.error("Error loading home page API data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Dynamic values or fallback

  // Count resolved/pending aspirations for the middle card slider
  const resolvedCount = aspirations.filter(a => a.status === "resolved").length || 8
  const pendingCount = aspirations.filter(a => a.status === "pending").length || 3
  const resolvedPercentage = Math.round((resolvedCount / (resolvedCount + pendingCount)) * 100) || 72

  return (
    <main className="w-full min-h-auto text-zinc-100 overflow-x-hidden pb-20">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full flex flex-col items-center justify-center pb-24 overflow-hidden">

        {/* Background Video Player */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
          {/* Dark Overlay - Memperbaiki bagian atas agar tidak ada warna hitam */}
          <div className="absolute inset-0 z-0">
            {/* Gradient overlay yang lebih smooth dari atas ke bawah */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />

            {/* Overlay tambahan untuk bagian bawah agar lebih gelap */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>
        </div>

        {/* Ambient top light beam line - Dibiarkan */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[550px] bg-gradient-to-b from-white/10 via-amber-500/20 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 mx-auto w-full max-w-5xl flex flex-col items-center gap-10">

          {/* Hero section */}
          <HeroSection />

          {/* ── THREE FLOATING STAT/DATA CARDS (API Integration) ── */}
          <FloatingData />
        </div>
      </section>

      {/* Kolaborasi */}
      <Collaborators />

      {/* ── FEATURES GRID SECTION (Populated from API) ── */}
      <Feature />

      {/* ── EXTRAS / BENCHMARKS SECTION ── */}
      <section id="approach" className="w-full py-24 px-6 relative border-t border-white/[0.03]">

        <div className="mx-auto max-w-5xl flex flex-col items-center gap-16">

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              ◎ Benchmarks
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white">
              Semua Layanan dalam <span className="font-display italic font-light text-zinc-100">Satu Platform</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Website ini dioptimalkan khusus untuk memberikan performa terbaik dalam pemenuhan administrasi kemahasiswaan.
            </p>
          </div>

          {/* 3 Columns details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

            {/* Column 1 */}
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-base">⚡</span>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">Ringan & Mobile-First</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Dioptimalkan untuk browser ponsel dengan ukuran halaman minimalis untuk loading super cepat di bawah 2 detik.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-base">🎓</span>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">Klaim Sertifikat Digital</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Peserta kegiatan yang hadir dapat mengunduh E-Sertifikat resmi berformat PDF secara langsung dari dashboard akun.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 text-base">🔔</span>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">Notifikasi Real-time</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Mendapatkan pembaruan status tindak lanjut aspirasi secara instan dari pengurus/admin HMTIKA.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  )
}