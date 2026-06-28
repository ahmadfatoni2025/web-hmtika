"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { getEvents, getEventBySlug } from "@/lib/api"
import type { EventItem } from "@/lib/api"
import {
  Calendar,
  ImageIcon,
  ArrowRight,
  MapPin,
  X,
} from "lucide-react"

export default function EventPage() {
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [regModalOpen, setRegModalOpen] = useState(false)

  const statuses = ["Semua", "Upcoming", "Ongoing", "Completed"]

  useEffect(() => {
    async function loadEvents() {
      setLoading(true)
      try {
        const apiStatus = selectedStatus === "Semua" ? undefined : selectedStatus.toLowerCase()
        const res = await getEvents(page, 9, apiStatus)
        if (res && res.data) {
          setEvents(res.data)
          if (res.total) {
            setTotalPage(Math.ceil(res.total / 9))
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

  useEffect(() => {
    const slug = searchParams.get("slug")
    if (slug && events.length > 0) {
      openEventDetail(slug)
    }
  }, [searchParams, events])

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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  const formatShortDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    })

  const statusColors: Record<string, string> = {
    ongoing: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    completed: "bg-zinc-800/80 border-white/10 text-zinc-400",
    upcoming: "bg-amber-gold/10 border-amber-gold/30 text-amber-gold",
  }

  return (
    <main className="relative min-h-screen bg-bg-dark text-zinc-100 pb-24 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-gold/20 bg-amber-gold/10 px-4 py-1 text-xs font-semibold text-amber-gold mb-5">
            Agenda Organisasi
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Kalender Event & Kegiatan Mahasiswa
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            Daftarkan diri Anda pada program kerja, seminar nasional, workshop pemrograman,
            dan kompetisi internal yang diselenggarakan oleh HMTIKA.
          </p>
        </div>

        {/* ─── Filters ────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/[0.06]">
          <div className="flex flex-wrap gap-2 justify-center w-full">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status)
                  setPage(1)
                }}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${selectedStatus === status
                  ? "bg-amber-gold text-black shadow-md shadow-amber-gold/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Events Grid ────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[420px] rounded-2xl glass-card-glowing animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 glass-card-glowing rounded-2xl border border-white/5">
            <p className="mt-4 text-sm font-bold text-zinc-300">Tidak ada event ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Belum ada agenda terdaftar untuk status ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article
                key={event.id}
                className="group glass-card-glowing rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
              >
                {/* Image placeholder */}
                <div
                  onClick={() => openEventDetail(event.slug)}
                  className="relative h-48 w-full bg-gradient-to-br from-amber-gold/10 via-zinc-900 to-zinc-950 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt={event.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-zinc-600/50" />
                  )}
                  <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border backdrop-blur-md uppercase tracking-widest ${statusColors[event.status || "upcoming"] || statusColors.upcoming}`}>
                    {event.status || "Upcoming"}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Headline */}
                  <h2
                    onClick={() => openEventDetail(event.slug)}
                    className="text-base font-bold text-white leading-snug group-hover:text-amber-gold transition-colors line-clamp-2 cursor-pointer"
                  >
                    {event.judul}
                  </h2>

                  {/* Info row: location + date */}
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{event.lokasi}</span>
                    </div>
                    <span className="text-zinc-600">|</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>{formatShortDate(event.tanggal)}</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                    {event.deskripsi || "Tidak ada deskripsi detail untuk event ini."}
                  </p>

                  {/* Quota + Cost row */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                    <span>
                      Kuota: {event.kuota} kursi
                    </span>
                    <span className="font-bold text-amber-gold">
                      {event.biaya === 0 ? "Gratis" : `Rp ${event.biaya.toLocaleString("id-ID")}`}
                    </span>
                  </div>

                  {/* Quota progress bar */}
                  {event.registration_count !== undefined && event.kuota > 0 && (
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-gold rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((event.registration_count / event.kuota) * 100, 100)}%` }}
                      />
                    </div>
                  )}

                  {/* Read more */}
                  <button
                    onClick={() => openEventDetail(event.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-gold hover:text-amber-gold-light transition-colors mt-auto pt-2 border-t border-white/[0.04]"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    Lihat Detail
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ─── Pagination ─────────────────────────────────────── */}
        {totalPage > 1 && (
          <div className="flex items-center justify-center gap-4 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-xs rounded-full border border-white/10 bg-white/5 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 text-white transition-all"
            >
              Sebelumnya
            </button>
            <span className="text-xs text-zinc-400">Halaman {page} dari {totalPage}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
              disabled={page === totalPage}
              className="px-4 py-2 text-xs rounded-full border border-white/10 bg-white/5 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 text-white transition-all"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>

      {/* ─── Detail Modal ─────────────────────────────────────── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-premium rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-amber-gold/10 px-2.5 py-0.5 text-[9px] font-bold text-amber-gold border border-amber-gold/20 uppercase tracking-widest">
                {selectedEvent.kategori || "Kegiatan"}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {selectedEvent.judul}
              </h2>
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>Lokasi: <span className="text-white font-semibold">{selectedEvent.lokasi}</span></span>
                </div>
                <div>💰 Biaya: <span className="text-amber-gold font-bold">{selectedEvent.biaya === 0 ? "Gratis" : `Rp ${selectedEvent.biaya.toLocaleString("id-ID")}`}</span></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>Waktu: <span className="text-white">{formatDate(selectedEvent.tanggal)}</span></span>
                </div>
                <div>👥 Kuota: <span className="text-white">{selectedEvent.kuota} kursi</span></div>
              </div>
            </div>

            {selectedEvent.thumbnail && (
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6 border border-white/5">
                <img src={selectedEvent.thumbnail} alt={selectedEvent.judul} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Deskripsi Event:</h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedEvent.deskripsi || "Tidak ada deskripsi detail untuk event ini."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 text-xs font-semibold rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
              >
                Tutup
              </button>
              {selectedEvent.status !== "completed" && (
                <button
                  onClick={() => setRegModalOpen(true)}
                  className="px-6 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-amber-gold to-amber-gold-dark text-black hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-sm glass-card-glowing border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-base font-bold text-white">Pendaftaran Event</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Untuk melakukan pendaftaran event, silakan masuk ke dashboard akun mahasiswa Anda.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setRegModalOpen(false)}
                className="px-4 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-all"
              >
                Kembali
              </button>
              <a
                href="/login"
                className="px-5 py-1.5 text-xs font-bold rounded-full bg-amber-gold text-black hover:bg-amber-gold-light transition-all inline-block"
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
