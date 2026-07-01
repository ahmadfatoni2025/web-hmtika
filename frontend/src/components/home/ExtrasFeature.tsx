"use client"

import { useState, useEffect } from "react"
import { getEvents, getAspirations } from "@/lib/api"
import type { EventItem, AspirationItem } from "@/lib/api"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MessageSquare, Calendar } from "lucide-react"

const statusLabel: Record<string, string> = {
  pending: "Pending",
  reviewed: "Ditinjau",
  resolved: "Selesai",
}

const statusColor: Record<string, string> = {
  pending: "text-amber-400",
  reviewed: "text-sky-400",
  resolved: "text-emerald-400",
}

export default function ExtrasFeature() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [aspirations, setAspirations] = useState<AspirationItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [eventsRes, aspirationsRes] = await Promise.all([
          getEvents(1, 7).catch(() => null),
          getAspirations(1, 7).catch(() => null),
        ])
        if (eventsRes?.data) setEvents(eventsRes.data)
        if (aspirationsRes?.data) setAspirations(aspirationsRes.data)
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })

  return (
    <section id="approach" className="w-full px-6 relative border-t border-white/[0.03]">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-12">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Data Terkini
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white">
            Pantau Perkembangan <span className="font-display italic font-light text-zinc-100">Kampus secara Real-time</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Lihat data aspirasi mahasiswa dan jadwal event HMTIKA dalam satu tampilan terintegrasi.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="aspirasi" className="w-full">
          <div className="flex items-center justify-center">
            <TabsList>
              <TabsTrigger value="aspirasi" className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Aspirasi
              </TabsTrigger>
              <TabsTrigger value="event" className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Event
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── Aspirasi Tab ── */}
          <TabsContent value="aspirasi">
            <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-slate-100/5">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="h-10 border-b border-white/[0.06]">
                    <th className="px-5 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[52%]">
                      Aspirasi
                    </th>
                    <th className="px-5 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[18%]">
                      Kategori
                    </th>
                    <th className="px-5 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[14%]">
                      Status
                    </th>
                    <th className="px-5 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[16%]">
                      Tanggal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="h-13 border-b border-white/[0.03]">
                        <td className="px-5 py-3">
                          <div className="h-3.5 w-full rounded bg-white/[0.06] animate-pulse" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="h-3 w-20 rounded bg-white/[0.06] animate-pulse" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="h-3 w-14 rounded bg-white/[0.06] animate-pulse" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="h-3 w-24 rounded bg-white/[0.06] animate-pulse ml-auto" />
                        </td>
                      </tr>
                    ))
                  ) : aspirations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-16 text-center text-xs text-zinc-500">
                        Belum ada aspirasi
                      </td>
                    </tr>
                  ) : (
                    aspirations.map((item) => (
                      <tr
                        key={item.id}
                        className="h-13 border-b border-white/[0.03] transition-colors hover:bg-white/[0.03]"
                      >
                        <td className="px-5 py-3 text-sm text-white leading-snug">
                          <span className="line-clamp-2">{item.isiAspirasi}</span>
                        </td>
                        <td className="px-5 py-3 text-xs text-zinc-400">
                          {item.kategori}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold ${statusColor[item.status] || "text-zinc-400"}`}>
                            {statusLabel[item.status] || item.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-xs text-zinc-500 whitespace-nowrap">
                          {formatDate(item.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-zinc-600">
                Total: {aspirations.length} aspirasi
              </span>
              <a
                href="/aspirasi"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-gold hover:text-amber-gold-light transition-colors"
              >
                Lihat Semua
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </TabsContent>

          {/* ── Event Tab ── */}
          <TabsContent value="event">
            <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="h-10 border-b border-white/[0.06]">
                    <th className="px-5 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[40%]">
                      Event
                    </th>
                    <th className="px-5 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[22%]">
                      Lokasi
                    </th>
                    <th className="px-5 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[20%]">
                      Tanggal
                    </th>
                    <th className="px-5 text-right text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[18%]">
                      Biaya
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="h-13 border-b border-white/[0.03]">
                        <td className="px-5 py-3">
                          <div className="h-3.5 w-48 rounded bg-white/[0.06] animate-pulse" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="h-3 w-28 rounded bg-white/[0.06] animate-pulse" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="h-3 w-24 rounded bg-white/[0.06] animate-pulse" />
                        </td>
                        <td className="px-5 py-3">
                          <div className="h-3 w-16 rounded bg-white/[0.06] animate-pulse ml-auto" />
                        </td>
                      </tr>
                    ))
                  ) : events.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-16 text-center text-xs text-zinc-500">
                        Belum ada event
                      </td>
                    </tr>
                  ) : (
                    events.slice(0, 7).map((item) => (
                      <tr
                        key={item.id}
                        className="h-13 border-b border-white/[0.03] transition-colors hover:bg-white/[0.03]"
                      >
                        <td className="px-5 py-3 text-sm text-white leading-snug">
                          <span className="line-clamp-1">{item.judul}</span>
                        </td>
                        <td className="px-5 py-3 text-xs text-zinc-400">
                          {item.lokasi}
                        </td>
                        <td className="px-5 py-3 text-xs text-zinc-500">
                          {formatDate(item.tanggal)}
                        </td>
                        <td className="px-5 py-3 text-right text-xs font-semibold text-amber-gold">
                          {item.biaya === 0 ? "Gratis" : `Rp${item.biaya.toLocaleString("id-ID")}`}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-zinc-600">
                Total: {events.length} event
              </span>
              <a
                href="/event"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-gold hover:text-amber-gold-light transition-colors"
              >
                Lihat Semua
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  )
}
