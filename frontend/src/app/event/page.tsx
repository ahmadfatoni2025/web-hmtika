"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { getEvents, getEventBySlug } from "@/lib/api"
import type { EventItem } from "@/lib/api"
import { Calendar, MapPin, X, Users, Ticket, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/Skeleton"

// ─── Status helpers ───────────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, { badge: string; dot: string }> = {
  ongoing:   { badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10", dot: "bg-emerald-400" },
  completed: { badge: "text-zinc-500 border-white/10 bg-white/5",               dot: "bg-zinc-500" },
  upcoming:  { badge: "text-amber-400 border-amber-500/30 bg-amber-500/10",      dot: "bg-amber-400" },
}

const statusStyle = (s?: string) => STATUS_STYLE[s ?? "upcoming"] ?? STATUS_STYLE.upcoming

// ─── Formatters ───────────────────────────────────────────────────────────────
const fmtLong  = (d: string) => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
const fmtShort = (d: string) => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short" })

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const st = statusStyle(event.status)

  const infoRows = [
    {
      icon: <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-500" />,
      label: "Lokasi",
      value: event.lokasi,
    },
    {
      icon: <Calendar className="h-3.5 w-3.5 shrink-0 text-zinc-500" />,
      label: "Tanggal",
      value: fmtLong(event.tanggal),
    },
    {
      icon: <Users className="h-3.5 w-3.5 shrink-0 text-zinc-500" />,
      label: "Kuota",
      value: `${event.kuota} kursi`,
    },
    {
      icon: <Ticket className="h-3.5 w-3.5 shrink-0 text-zinc-500" />,
      label: "Biaya",
      value: event.biaya === 0 ? "Gratis" : `Rp ${event.biaya.toLocaleString("id-ID")}`,
      highlight: true,
    },
    {
      icon: <Tag className="h-3.5 w-3.5 shrink-0 text-zinc-500" />,
      label: "Kategori",
      value: event.kategori || "Umum",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Close (mobile) */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 z-10 h-7 w-7 flex items-center justify-center rounded-full border border-white/10 text-zinc-500 hover:text-white transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Thumbnail */}
      {event.thumbnail && (
        <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl mb-5 border border-white/[0.06]">
          <img src={event.thumbnail} alt={event.judul} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Status + Category */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${st.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
          {event.status || "Upcoming"}
        </span>
        {event.kategori && (
          <span className="text-[10px] text-zinc-600 font-medium">{event.kategori}</span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-white leading-snug mb-4">{event.judul}</h2>

      {/* Info list */}
      <div className="space-y-3">
        {infoRows.map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            {row.icon}
            <span className="text-[11px] text-zinc-500 w-16 shrink-0">{row.label}</span>
            <span className={`text-[11px] font-semibold ${row.highlight ? "text-amber-400" : "text-zinc-200"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Description */}
      {event.deskripsi && (
        <div className="mt-4 pt-4 border-t border-white/[0.05]">
          <p className="text-xs uppercase tracking-wider text-zinc-600 mb-2 font-semibold">Deskripsi</p>
          <p className="text-xs leading-relaxed text-zinc-400 whitespace-pre-line line-clamp-5">
            {event.deskripsi}
          </p>
        </div>
      )}

      {/* Quota bar */}
      {event.registration_count !== undefined && event.kuota > 0 && (
        <div className="mt-4 pt-4 border-t border-white/[0.05]">
          <div className="flex justify-between text-[10px] text-zinc-600 mb-1.5">
            <span>Pendaftar</span>
            <span>{event.registration_count} / {event.kuota}</span>
          </div>
          <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400/70 transition-all duration-700 ease-out"
              style={{ width: `${Math.min((event.registration_count / event.kuota) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* CTA */}
      {event.status !== "completed" && (
        <a
          href="/login"
          className="mt-6 block w-full rounded-xl bg-white py-2.5 text-center text-xs font-bold text-black hover:bg-zinc-100 transition-colors"
        >
          Daftar Sekarang
        </a>
      )}
    </div>
  )
}

// ─── Event List Item ──────────────────────────────────────────────────────────
function EventListItem({ event, selected }: { event: EventItem; selected: boolean }) {
  const st = statusStyle(event.status)
  return (
    <div className="flex items-start gap-3">
      <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
        {event.thumbnail ? (
          <img src={event.thumbnail} alt={event.judul} className="w-full h-full object-cover" />
        ) : (
          <span className="text-base">🗓</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold leading-snug line-clamp-1 transition-colors ${selected ? "text-white" : "text-zinc-300"}`}>
          {event.judul}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[9px] font-bold uppercase tracking-wide ${st.badge}`}>
            <span className={`h-1 w-1 rounded-full ${st.dot}`} />
            {event.status || "upcoming"}
          </span>
          <span className="text-[10px] text-zinc-600">{fmtShort(event.tanggal)}</span>
        </div>
      </div>

      <span className={`text-[10px] font-bold shrink-0 ${event.biaya === 0 ? "text-emerald-400" : "text-amber-400"}`}>
        {event.biaya === 0 ? "Gratis" : `Rp ${(event.biaya / 1000).toFixed(0)}k`}
      </span>
    </div>
  )
}

// ─── Main content ─────────────────────────────────────────────────────────────
function EventPageContent() {
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("Semua")
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const slugParam = searchParams.get("slug")

  const statuses = ["Semua", "Upcoming", "Ongoing", "Completed"]

  useEffect(() => {
    setLoading(true)
    getEvents(1, 999)
      .then((res) => {
        if (res?.data) {
          const data = res.data as EventItem[]
          setEvents(data)
          if (data.length > 0 && !slugParam) setSelectedEvent(data[0])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // open from URL slug
  useEffect(() => {
    if (!slugParam || events.length === 0) return
    const item = events.find((e) => e.slug === slugParam)
    if (item) setSelectedEvent(item)
    else
      getEventBySlug(slugParam)
        .then((r) => r?.data && setSelectedEvent(r.data))
        .catch(() => {})
  }, [slugParam, events])

  const filtered = useMemo(() => {
    if (activeFilter === "Semua") return events
    return events.filter((e) => e.status?.toLowerCase() === activeFilter.toLowerCase())
  }, [events, activeFilter])

  return (
    <main className="min-h-screen text-zinc-100" style={{ background: "#050505" }}>
      {/* ── Header ── */}
      <header className="border-b border-white/[0.05] px-6 pt-28 pb-10 max-w-5xl mx-auto">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Agenda HMTIKA</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">Event & Kegiatan</h1>
        <p className="text-sm text-zinc-500">Seminar, workshop, dan kompetisi untuk mahasiswa Informatika.</p>
      </header>

      {/* ── Filter tabs ── */}
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => { setActiveFilter(s); setSelectedEvent(null) }}
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
              activeFilter === s
                ? "bg-white text-black"
                : "border border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
            }`}
          >
            {s}
          </button>
        ))}
        {!loading && (
          <span className="ml-auto text-[11px] text-zinc-700">{filtered.length} event</span>
        )}
      </div>

      {/* ── Split Panel ── */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex gap-5 min-h-[520px]">

          {/* LEFT — List */}
          <div className="w-full lg:w-[380px] shrink-0">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-white/5 p-3.5 flex gap-3" style={{ background: "#0d0d0d" }}>
                    <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-2.5 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-white/5 py-16 text-center" style={{ background: "#0d0d0d" }}>
                <p className="text-xs text-zinc-500">Belum ada event.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {filtered.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`rounded-xl border p-3.5 cursor-pointer transition-colors ${
                      selectedEvent?.id === event.id
                        ? "border-white/20 bg-white/10"
                        : "border-white/5 bg-[#0d0d0d] hover:border-white/15 hover:bg-white/[0.07]"
                    }`}
                  >
                    <EventListItem event={event} selected={selectedEvent?.id === event.id} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Detail */}
          <div
            className="hidden lg:block flex-1 rounded-2xl border border-white/[0.07] p-6 relative overflow-y-auto"
            style={{ background: "#0d0d0d", maxHeight: "640px" }}
          >
            {selectedEvent ? (
              <DetailPanel key={selectedEvent.id} event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-700 gap-3">
                <span className="text-3xl">🗓</span>
                <p className="text-xs">Pilih event untuk melihat detail</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Detail as bottom sheet */}
        {selectedEvent && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="relative rounded-t-2xl border-t border-white/10 p-6 overflow-y-auto max-h-[80vh]"
              style={{ background: "#0d0d0d" }}
              onClick={(e) => e.stopPropagation()}
            >
              <DetailPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function EventPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center text-zinc-700 text-xs" style={{ background: "#050505" }}>
          Memuat…
        </main>
      }
    >
      <EventPageContent />
    </Suspense>
  )
}
