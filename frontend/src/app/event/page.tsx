"use client"

import { useState, useEffect } from "react"
import { getEvents, getEventBySlug } from "@/lib/api"
import type { EventItem } from "@/lib/api"

export default function EventPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [regModalOpen, setRegModalOpen] = useState(false)

  // Status mapping
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

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12">
        {/* Header */}
        <div className="space-y-4 mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Agenda Organisasi
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white">
            Kalender Event & <span className="font-display italic font-light text-zinc-300">Kegiatan Mahasiswa</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Daftarkan diri Anda pada program kerja, seminar nasional, workshop pemrograman, dan kompetisi internal yang diselenggarakan oleh HMTIKA.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/[0.06]">
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status)
                  setPage(1)
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${selectedStatus === status
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(212,168,83,0.15)]"
                    : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-white/[0.01] border border-white/[0.05] animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 glass-card-glowing rounded-2xl border border-white/5">
            <span className="text-4xl">📅</span>
            <p className="mt-4 text-sm font-bold text-zinc-300">Tidak ada event ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Belum ada agenda terdaftar untuk status ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => {
              const regCount = event.registration_count || 0
              const percentage = Math.min(Math.round((regCount / (event.kuota || 100)) * 100), 100)

              return (
                <article
                  key={event.id}
                  onClick={() => openEventDetail(event.slug)}
                  className="group cursor-pointer glass-card-glowing border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[420px]"
                >
                  {/* Thumbnail / Header */}
                  <div className="relative h-44 w-full bg-zinc-950 overflow-hidden border-b border-white/[0.05]">
                    {event.thumbnail ? (
                      <img
                        src={event.thumbnail}
                        alt={event.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 flex items-center justify-center relative">
                        <span className="text-3xl opacity-20">🎯</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <span className={`absolute top-4 left-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border backdrop-blur-md uppercase tracking-widest ${event.status === "ongoing"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : event.status === "completed"
                          ? "bg-zinc-800/80 border-white/10 text-zinc-400"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      }`}>
                      {event.status || "Upcoming"}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>📍 {event.lokasi}</span>
                        <span>{event.kategori || "Kegiatan"}</span>
                      </div>
                      <h2 className="text-base font-bold text-white leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
                        {event.judul}
                      </h2>
                      <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {event.deskripsi || "Tidak ada deskripsi detail untuk event ini."}
                      </p>
                    </div>

                    {/* Progress Quota & Bottom details */}
                    <div className="space-y-3">
                      {/* Quota slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-zinc-500">
                          <span>Terdaftar: {regCount} Peserta</span>
                          <span>Kuota: {event.kuota}</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-950 rounded-full relative overflow-hidden">
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Date & Cost footer */}
                      <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
                        <span className="text-zinc-500">
                          📅 {new Date(event.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        <span className="font-bold text-amber-400">
                          {event.biaya === 0 ? "Gratis" : `Rp ${event.biaya.toLocaleString("id-ID")}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
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

      {/* Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card-glowing border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="space-y-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/20 uppercase tracking-widest">
                {selectedEvent.kategori || "Kegiatan"}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {selectedEvent.judul}
              </h2>
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-zinc-400">
                <div>📍 Lokasi: <span className="text-white font-semibold">{selectedEvent.lokasi}</span></div>
                <div>💰 Biaya: <span className="text-amber-400 font-bold">{selectedEvent.biaya === 0 ? "Gratis" : `Rp ${selectedEvent.biaya.toLocaleString("id-ID")}`}</span></div>
                <div>📅 Waktu: <span className="text-white">
                  {new Date(selectedEvent.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span></div>
                <div>👥 Kuota: <span className="text-white">{selectedEvent.kuota} kursi</span></div>
              </div>
            </div>

            {/* Thumbnail */}
            {selectedEvent.thumbnail && (
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6 border border-white/5">
                <img src={selectedEvent.thumbnail} alt={selectedEvent.judul} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Deskripsi */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Deskripsi Event:</h3>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedEvent.deskripsi || "Tidak ada deskripsi detail untuk event ini."}
              </p>
            </div>

            {/* Modal Footer & Registration CTA */}
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
                  className="px-6 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all"
                >
                  Daftar Sekarang
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mini Reg Modal */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-sm glass-card-glowing border border-white/10 rounded-2xl p-6 text-center space-y-4">
            <span className="text-4xl">🔐</span>
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
                className="px-5 py-1.5 text-xs font-bold rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-all inline-block"
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