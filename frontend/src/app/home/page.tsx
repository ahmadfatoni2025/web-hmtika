"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getNews, getEvents, getAspirations } from "@/lib/api"
import type { NewsItem, EventItem, AspirationItem } from "@/lib/api"
import HeroSection from "@/components/home/HeroSection"

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
  const latestNewsItem = news[0] || {
    id: 1,
    judul: "Workshop Modern Web Development 2026",
    kategori: "Kegiatan",
    ringkasan: "Membangun aplikasi Next.js dengan arsitektur modern.",
    tglPublish: new Date().toLocaleDateString("id-ID"),
  }

  const latestAspirationItem = aspirations[0] || {
    id: 1,
    kategori: "Fasilitas",
    isiAspirasi: "Perluasan kapasitas AC di laboratorium komputer utama kampus.",
    status: "reviewed",
  }

  const latestEventItem = events[0] || {
    id: 1,
    judul: "Hackathon Tunas Bangsa 2026",
    lokasi: "Gedung Serbaguna",
    tanggal: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    kuota: 100,
    biaya: 0,
  }

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
          <div className="relative w-full max-w-4xl min-h-[380px] md:min-h-[460px] mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 z-10 px-4">

            {/* Left Card: News Feed */}
            <div className="w-full max-w-[270px] glass-card-glowing rounded-2xl p-5 md:-rotate-3 md:translate-y-12 md:-mr-6 z-10 self-center border border-white/5 animate-float">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 border border-white/10 text-xs font-bold text-zinc-400">📰</span>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-none">Berita HMTIKA</h3>
                    <span className="text-[10px] text-zinc-500">NEWS FEED</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                  Terbaru
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-[13px] font-bold text-white leading-snug line-clamp-2">{latestNewsItem.judul}</p>
                <p className="text-[10px] text-zinc-500">Kategori: {latestNewsItem.kategori}</p>
              </div>
              {/* Fake Chart sparkline showing activity */}
              <div className="h-10 w-full flex items-end gap-1.5 pt-2">
                {[35, 48, 55, 60, 42, 68, 50, 75, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-amber-500/10 to-amber-500/50"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Middle Prominent Card: Aspirasi Mahasiswa */}
            <div className="w-full max-w-[310px] glass-card-glowing border border-white/10 rounded-2xl p-6 shadow-2xl md:-translate-y-2 z-20 self-center hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500">💬</span>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-none">Aspirasi Masuk</h3>
                    <span className="text-[10px] text-zinc-500">STUDENT VOICE</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                  {resolvedPercentage}% Resolved
                </span>
              </div>
              <div className="space-y-1 mb-6">
                <p className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {totalAspirations || 48} Aspirasi
                </p>
                <p className="text-xs text-zinc-500 line-clamp-1">Kategori: {latestAspirationItem.kategori}</p>
              </div>

              {/* Resolution percentage slider */}
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${resolvedPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500">
                  <span>Pending: {totalAspirations - resolvedCount || 12}</span>
                  <span>Resolved: {resolvedCount || 36}</span>
                </div>
              </div>
            </div>

            {/* Right Card: E-Sertifikat */}
            <div className="w-full max-w-[270px] glass-card-glowing rounded-2xl p-5 md:rotate-3 md:translate-y-12 md:-ml-6 z-10 self-center border border-white/5 animate-float-delayed">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 border border-white/10 text-xs font-bold text-zinc-400">🎓</span>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-none">E-Sertifikat</h3>
                    <span className="text-[10px] text-zinc-500">VERIFICATION</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                  100% Sah
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-[13px] font-bold text-white leading-snug">Kode Digital Autentik</p>
                <p className="text-[10px] font-mono text-zinc-500">HMTIKA/2026/D3B92A7C</p>
              </div>
              <p className="text-[10px] text-zinc-400 leading-normal">
                Verifikasi keaslian sertifikat kegiatan Anda langsung secara online.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ── TRUSTED BY / PARTNERS SECTION ── */}
      <section className="relative w-full py-10 overflow-hidden border-t border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 text-center">
            Kolaborasi & Kemitraan Strategis
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-35 hover:opacity-70 transition-opacity duration-300">
            <span className="text-base font-semibold tracking-tight text-white">Google Developer Groups</span>
            <span className="text-base font-serif font-bold italic tracking-wide text-white">GitHub Campus</span>
            <span className="text-base font-sans font-black text-white">Dicoding Academy</span>
            <span className="text-base font-sans font-light tracking-widest uppercase text-white">Microsoft Learn</span>
            <span className="text-base font-serif font-semibold text-white">STIMIK Tunas Bangsa</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID SECTION (Populated from API) ── */}
      <section id="enterprise" className="w-full py-24 px-6 relative overflow-hidden">

        <div className="mx-auto max-w-5xl flex flex-col items-center gap-16">

          {/* Section Header */}
          <div className="text-center space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              ◎ Layanan
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white">
              Sinergi Teknologi <span className="font-display italic font-light text-zinc-100">untuk Mahasiswa IT</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Portal HMTIKA mengintegrasikan sistem informasi organisasi, kalender pendaftaran event, dan kotak aspirasi ke dalam satu portal digital yang aman.
            </p>
          </div>

          {/* 3 Column Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

            {/* Card 1: Newsroom */}
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-6">
              {/* Graphic Mockup */}
              <div className="h-44 w-full rounded-xl bg-zinc-950/80 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-[10px] font-bold text-zinc-500">Newsroom Feed</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <div className="my-auto space-y-1">
                  <p className="text-[11px] font-bold text-white line-clamp-2 leading-snug">
                    {latestNewsItem.judul}
                  </p>
                  <p className="text-[10px] text-zinc-500 line-clamp-1">{latestNewsItem.ringkasan}</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[9px] text-zinc-400">
                  <span className="text-amber-500">●</span>
                  <span>{totalNews || 12} Berita Terbit</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📊</span> Pusat Informasi & Newsroom
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Akses berita resmi, pengumuman akademik, dan rilis darurat organisasi secara real-time dan terpusat.
                </p>
              </div>
            </div>

            {/* Card 2: Aspirations */}
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-6">
              {/* Graphic Mockup */}
              <div className="h-44 w-full rounded-xl bg-zinc-950/80 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] font-bold text-zinc-500">Aspirasi Terkini</span>
                  <span className="text-[9px] text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                    {latestAspirationItem.status.toUpperCase()}
                  </span>
                </div>
                <div className="my-auto space-y-1">
                  <p className="text-[10px] text-zinc-400 italic line-clamp-3">
                    "{latestAspirationItem.isiAspirasi}"
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[9px] text-zinc-400 justify-between">
                  <span>Anonimitas Terjamin</span>
                  <span className="text-zinc-500">ID: {latestAspirationItem.id}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🛡️</span> Kotak Aspirasi Anonim Riil
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sampaikan kritik, keluhan, dan saran terkait fasilitas maupun kurikulum kampus secara aman dan rahasia.
                </p>
              </div>
            </div>

            {/* Card 3: Events */}
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-6">
              {/* Graphic Mockup */}
              <div className="h-44 w-full rounded-xl bg-zinc-950/80 border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-[10px] font-bold text-zinc-500">Event Terdekat</span>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">Aktif</span>
                </div>
                <div className="my-auto space-y-1">
                  <p className="text-[11px] font-bold text-white line-clamp-1">{latestEventItem.judul}</p>
                  <p className="text-[9px] text-zinc-500">📍 {latestEventItem.lokasi}</p>
                  <p className="text-[9px] text-zinc-500">
                    📅 {new Date(latestEventItem.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] text-zinc-400">
                  <span>Biaya: {latestEventItem.biaya === 0 ? "Gratis" : `Rp ${latestEventItem.biaya}`}</span>
                  <span>Kuota: {latestEventItem.kuota} Kursi</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📅</span> Kalender & Pendaftaran Event
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pantau program kerja, workshop teknologi, seminar, dan rapat umum. Daftarkan diri secara instan.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

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