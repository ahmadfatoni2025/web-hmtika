"use client"

import { useState } from "react"

export default function AspirationTracker() {
  const [activeTab, setActiveTab] = useState<"tracking" | "schedules">("tracking")
  const [aspirationId, setAspirationId] = useState("")

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-6 text-white backdrop-blur-xl ring-1 ring-white/10 shadow-2xl">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-800/60 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab("tracking")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "tracking"
              ? "bg-slate-700 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Lacak Aspirasi
        </button>
        <button
          onClick={() => setActiveTab("schedules")}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "schedules"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Jadwal Kegiatan
        </button>
      </div>

      {activeTab === "tracking" ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Kode Tiket Aspirasi</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Contoh: ASP-2026-XXXX"
                value={aspirationId}
                onChange={(e) => setAspirationId(e.target.value)}
                className="w-full rounded-xl bg-slate-800/80 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Kategori Kampus</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <select className="w-full rounded-xl bg-slate-800/80 border border-slate-700 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none">
                <option>Fasilitas & Sarana Prasarana</option>
                <option>Kurikulum & Akademik</option>
                <option>Kemahasiswaan & UKM</option>
                <option>Lain-lain</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          <button className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-4 shadow-lg shadow-orange-600/35 transition-all">
            Lacak Status Aspirasi
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <p className="text-xs font-semibold text-amber-500">28 Juni 2026</p>
                <h4 className="text-sm font-bold text-white">Workshop Modern Web Development</h4>
                <p className="text-xs text-slate-400">Lab Komputer Utama • 09:00 WIB</p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">Buka</span>
            </div>
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <p className="text-xs font-semibold text-amber-500">05 Juli 2026</p>
                <h4 className="text-sm font-bold text-white">Rapat Pleno HMTIKA Periode II</h4>
                <p className="text-xs text-slate-400">Ruang Aula STIMIK • 13:00 WIB</p>
              </div>
              <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded font-medium">Internal</span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500">12 Juli 2026</p>
                <h4 className="text-sm font-bold text-slate-300">Hackathon Tunas Bangsa 2026</h4>
                <p className="text-xs text-slate-500">Gedung Serbaguna • 08:00 WIB</p>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-medium">Segera</span>
            </div>
          </div>

          <button className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 transition-all">
            Lihat Semua Jadwal
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
