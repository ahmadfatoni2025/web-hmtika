"use client"

import { useState, useEffect } from "react"
import { getAspirations } from "@/lib/api"
import type { AspirationItem } from "@/lib/api"

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

export default function AspirationTracker() {
  const [aspirations, setAspirations] = useState<AspirationItem[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await getAspirations(1, 7)
        if (res?.data) setAspirations(res.data)
      } catch {
        // silent
      }
    }
    load()
  }, [])

  return (
    <section className="w-full">
      <div className="space-y-6 lg:space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white lg:text-2xl">
            7 Aspirasi Terbaru
          </h2>
          <span className="text-[10px] text-zinc-500 font-mono">
            Total: {aspirations.length}
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="h-10 border-b border-white/[0.06] text-left text-[11px] text-zinc-500 uppercase tracking-wider font-bold">
                <th className="font-semibold w-[52%]">Aspirasi</th>
                <th className="font-semibold w-[18%]">Kategori</th>
                <th className="font-semibold w-[14%]">Status</th>
                <th className="text-right font-semibold w-[16%]">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {aspirations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-xs text-zinc-500">
                    Belum ada aspirasi
                  </td>
                </tr>
              ) : (
                aspirations.map((item) => (
                  <tr
                    key={item.id}
                    className="h-16 border-b border-white/[0.04] text-left text-sm text-zinc-400 transition-colors hover:bg-white/[0.01]"
                  >
                    <td className="text-sm text-white leading-snug pr-4">
                      <span className="line-clamp-2">{item.isiAspirasi}</span>
                    </td>
                    <td className="text-xs text-zinc-400">{item.kategori}</td>
                    <td>
                      <span className={`text-xs font-semibold ${statusColor[item.status] || "text-zinc-400"}`}>
                        {statusLabel[item.status] || item.status}
                      </span>
                    </td>
                    <td className="text-right text-xs text-zinc-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-white/[0.04] text-right">
          <a
            href="/aspirasi"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-gold hover:text-amber-gold-light transition-colors"
          >
            Lihat Semua Aspirasi
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
