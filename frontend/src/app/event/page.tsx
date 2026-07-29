"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { getEvents, getEventBySlug } from "@/lib/api"
import type { EventItem } from "@/lib/api"
import {
  Calendar,
  ImageIcon,
  ArrowRight,
  MapPin,
  X,
  ChevronRight,
  DollarSign,
  Users,
  Search,
} from "lucide-react"

function EventPageContent() {
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [regModalOpen, setRegModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const statuses = ["Semua", "Upcoming", "Ongoing", "Completed"]
  const openedFromUrl = useRef(false)
  const slugParam = searchParams.get("slug")

  useEffect(() => {
    async function loadEvents() {
      setLoading(true)
      try {
        const statusMap: Record<string, string | undefined> = {
          Semua: undefined,
          Upcoming: "akan_datang",
          Ongoing: "berlangsung",
          Completed: "selesai",
        }
        const apiStatus = statusMap[selectedStatus]
        const res = await getEvents(page, 15, apiStatus) // Fetch more for Quartz layout
        if (res && res.data) {
          setEvents(res.data)
          if (res.meta.total) {
            setTotalPage(Math.ceil(res.meta.total / 15))
          }
        }
      } catch (err) {
        console.error("Failed to load events:", err)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [selectedStatus, page])

  const openEventDetail = async (slug: string) => {
    try {
      const res = await getEventBySlug(slug)
      if (res && res.data) {
        setSelectedEvent(res.data)
      } else {
        const item = events.find(e => e.slug === slug)
        if (item) setSelectedEvent(item)
      }
    } catch {
      const item = events.find(e => e.slug === slug)
      if (item) setSelectedEvent(item)
    }
  }

  useEffect(() => {
    if (slugParam && events.length > 0 && !openedFromUrl.current) {
      openedFromUrl.current = true
      openEventDetail(slugParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugParam, events])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  const filteredEvents = events.filter((e) =>
    e.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Distribute items for Quartz layout
  const heroEvent = filteredEvents[0]
  const leftSidebarEvents = filteredEvents.slice(1, 4)
  const needToKnowEvents = filteredEvents.slice(4, 8)
  const popularEvents = filteredEvents.slice(8, 13)
  const featuredEvent = filteredEvents[13] || filteredEvents[0]

  return (
    <main className="min-h-screen bg-bg-dark text-zinc-100 font-sans pb-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      {/* Spacing for fixed Navbar */}
      <div className="pt-28 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* ─── Search & Status Filter bar ─── */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status)
                  setPage(1)
                }}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  selectedStatus === status
                    ? "bg-amber-gold text-black shadow-md shadow-amber-gold/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-500 focus:outline-none focus:border-amber-gold/30 focus:bg-white/[0.04] transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            <div className="lg:col-span-3 space-y-6">
              <div className="h-64 bg-white/5 rounded-2xl" />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <div className="h-96 bg-white/5 rounded-2xl" />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div className="h-80 bg-white/5 rounded-2xl" />
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/[0.08] rounded-2xl max-w-md mx-auto">
            <p className="text-sm font-bold text-zinc-300">Tidak ada event ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Belum ada agenda terdaftar untuk status ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ─── Left Sidebar ─────────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white/[0.02] border border-white/[0.08] p-4 border-t-2 border-amber-gold rounded-xl">
                <h3 className="text-[11px] font-bold tracking-wider uppercase text-amber-gold mb-2">
                  PENDAFTARAN EVENT HMTIKA
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Dapatkan akses ke workshop, seminar nasional, dan bootcamp coding eksklusif. Amankan kursi Anda sekarang.
                </p>
                <button 
                  onClick={() => window.location.href = "/login"}
                  className="text-xs text-amber-gold hover:underline font-semibold"
                >
                  Masuk untuk mendaftar event.
                </button>
              </div>

              {leftSidebarEvents.map((item, idx) => (
                <div key={item.id} className="border-b border-white/[0.08] pb-4 last:border-0 cursor-pointer group" onClick={() => openEventDetail(item.slug)}>
                  {idx === 0 && item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-36 object-cover mb-3 rounded-lg border border-white/[0.08]"
                    />
                  )}
                  <div className="flex gap-3">
                    {idx > 0 && item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-16 h-16 object-cover flex-shrink-0 rounded-lg border border-white/[0.08]"
                      />
                    )}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold tracking-wider text-amber-gold uppercase">
                        {item.status || "Upcoming"}
                      </span>
                      <h4 className="text-sm font-bold leading-snug text-white group-hover:text-amber-gold transition-colors">
                        ✦ {item.judul}
                      </h4>
                      <p className="text-[10px] text-zinc-500">{formatDate(item.tanggal)}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-white/[0.08] pt-3 flex items-center justify-between text-xs font-bold text-zinc-300 cursor-pointer hover:text-amber-gold" onClick={() => setSelectedStatus("Semua")}>
                <span>Lihat semua event</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* ─── Center Column ─────────────────────────────────────────── */}
            <div className="lg:col-span-6 lg:border-l lg:border-r lg:border-white/[0.08] lg:px-6 space-y-8">
              <div>
                <h2 className="font-sans text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2">
                  Agenda Organisasi.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Tingkatkan skill, perluas jaringan, dan ikuti berbagai kegiatan menarik yang diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika.
                </p>
              </div>

              {heroEvent && (
                <article className="space-y-3 cursor-pointer group" onClick={() => window.location.href = `/event/${heroEvent.slug}`}>
                  {heroEvent.thumbnail && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
                      <img
                        src={heroEvent.thumbnail}
                        alt={heroEvent.judul}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-[9px] text-white px-2 py-0.5 font-mono uppercase rounded">
                        {heroEvent.status || "Upcoming"}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-sans text-2xl font-extrabold text-white group-hover:text-amber-gold transition-colors leading-tight">
                      {heroEvent.judul}
                    </h3>
                    <div className="flex gap-4 text-xs text-zinc-550">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {heroEvent.lokasi}</span>
                      <span>•</span>
                      <span>{formatDate(heroEvent.tanggal)}</span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line line-clamp-3">
                      {heroEvent.deskripsi}
                    </p>
                  </div>
                </article>
              )}

              {/* Need to know section */}
              <div className="border-t-2 border-white/[0.08] pt-4">
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-amber-gold mb-4">
                  SOROTAN JADWAL TERDEKAT
                </h3>
                <div className="space-y-6">
                  {needToKnowEvents.map((item) => (
                    <div key={item.id} className="space-y-1 cursor-pointer group" onClick={() => window.location.href = `/event/${item.slug}`}>
                      <h4 className="text-base font-extrabold leading-tight text-white group-hover:text-amber-gold transition-colors">
                        {item.judul}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {item.deskripsi || "Tidak ada deskripsi singkat."}
                      </p>
                      <div className="flex gap-3 text-[10px] text-zinc-500 pt-0.5">
                        <span>{formatDate(item.tanggal)}</span>
                        <span>•</span>
                        <span>{item.lokasi}</span>
                        <span>•</span>
                        <span className="font-bold text-amber-gold">{Number(item.biaya) === 0 ? "Gratis" : `Rp ${Number(item.biaya).toLocaleString("id-ID")}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Right Sidebar ─────────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Popular Events */}
              <div className="bg-white/[0.02] border border-white/[0.08] p-4 border-t-2 border-amber-gold rounded-xl space-y-4">
                <h3 className="text-[11px] font-bold tracking-wider uppercase text-amber-gold">
                  EVENT TERPOPULER
                </h3>
                <div className="space-y-4">
                  {popularEvents.map((item) => (
                    <div key={item.id} className="space-y-1 cursor-pointer group" onClick={() => window.location.href = `/event/${item.slug}`}>
                      <h4 className="text-sm font-bold leading-snug text-white group-hover:text-amber-gold transition-colors">
                        {item.judul}
                      </h4>
                      <p className="text-[10px] text-zinc-550 uppercase tracking-widest">
                        {item.status || "Upcoming"} • {formatDate(item.tanggal)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.08] pt-3 flex items-center justify-between text-xs font-bold text-zinc-300 cursor-pointer hover:text-amber-gold" onClick={() => setSelectedStatus("Semua")}>
                  <span>Semua agenda populer</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              {/* Featured Event Card */}
              {featuredEvent && (
                <div className="bg-white/[0.01] border border-white/[0.08] p-4 rounded-xl space-y-3">
                  <h3 className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-500">
                    EVENT UNGGULAN
                  </h3>
                  <div className="flex gap-3 items-start cursor-pointer" onClick={() => window.location.href = `/event/${featuredEvent.slug}`}>
                    {featuredEvent.thumbnail ? (
                      <img
                        src={featuredEvent.thumbnail}
                        alt={featuredEvent.judul}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-white/[0.08]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center font-bold text-zinc-400 text-xs">
                        HMT
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold leading-snug text-white hover:text-amber-gold">
                        {featuredEvent.judul}
                      </h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-3 mt-1">
                        {featuredEvent.deskripsi}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.08] pt-2 flex items-center justify-between text-[11px] font-bold text-zinc-300 cursor-pointer hover:text-amber-gold" onClick={() => window.location.href = `/event/${featuredEvent.slug}`}>
                    <span>Selengkapnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ─── Pagination ─────────────────────────────────────── */}
        {totalPage > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 border-t border-white/[0.08] pt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 text-white font-bold"
            >
              SEBELUMNYA
            </button>
            <span className="text-xs text-zinc-400 font-semibold">Halaman {page} dari {totalPage}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
              disabled={page === totalPage}
              className="px-4 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 text-white font-bold"
            >
              SELANJUTNYA
            </button>
          </div>
        )}
      </div>

      {/* ─── Detail Modal (Quartz Dark Styled) ─────────────────────────────────────── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-zinc-900 border border-white/[0.08] shadow-2xl p-6 md:p-8 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-all rounded-full"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-extrabold tracking-widest text-amber-gold uppercase">
                {selectedEvent.status || "Upcoming"}
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {selectedEvent.judul}
              </h2>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-b border-white/[0.08] py-3 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>Lokasi: <span className="font-semibold text-white">{selectedEvent.lokasi}</span></span>
                </div>
                <div>💰 Biaya: <span className="text-amber-gold font-bold">{Number(selectedEvent.biaya) === 0 ? "Gratis" : `Rp ${Number(selectedEvent.biaya).toLocaleString("id-ID")}`}</span></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>Tanggal: <span className="text-white">{formatDate(selectedEvent.tanggal)}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>Kuota: <span className="text-white">{selectedEvent.kuota} kursi</span></span>
                </div>
              </div>
            </div>

            {selectedEvent.thumbnail && (
              <div className="relative w-full h-48 overflow-hidden mb-6 bg-zinc-950 rounded-xl border border-white/[0.08]">
                <img
                  src={selectedEvent.thumbnail}
                  alt={selectedEvent.judul}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-500">Deskripsi Event</h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedEvent.deskripsi || "Tidak ada deskripsi detail untuk event ini."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 text-zinc-400"
              >
                Tutup
              </button>
              {selectedEvent.status !== "completed" && (
                <button
                  onClick={() => setRegModalOpen(true)}
                  className="bg-amber-gold text-black px-5 py-2 font-bold hover:bg-amber-gold-light transition-colors text-xs uppercase tracking-wider rounded"
                >
                  Daftar Sekarang
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Mini Reg Modal ───────────────────────────────────── */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-zinc-900 border border-white/[0.08] p-6 text-center space-y-4 shadow-xl rounded-2xl">
            <h3 className="font-sans text-lg font-bold text-white">Pendaftaran Event</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Untuk mendaftar event, silakan masuk ke dashboard mahasiswa Anda.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setRegModalOpen(false)}
                className="px-4 py-1.5 text-xs border border-white/10 text-zinc-400 hover:bg-white/5 font-bold rounded"
              >
                Batal
              </button>
              <a
                href="/login"
                className="px-5 py-1.5 text-xs font-bold bg-amber-gold text-black hover:bg-amber-gold-light transition-colors inline-block rounded"
              >
                Login / Register
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function EventPage() {
  return (
    <Suspense fallback={null}>
      <EventPageContent />
    </Suspense>
  )
}


