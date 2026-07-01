"use client"

import { useState, useEffect } from "react"
import { submitAspiration, getAspirations } from "@/lib/api"
import type { AspirationItem } from "@/lib/api"

export default function PpkkmPage() {
  const [kategori, setKategori] = useState("Fasilitas")
  const [isiAspirasi, setIsiAspirasi] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [aspirations, setAspirations] = useState<AspirationItem[]>([])
  const [loadingList, setLoadingList] = useState(true)

  const categories = ["Fasilitas", "Akademik", "Kurikulum", "Keorganisasian", "Lainnya"]

  const loadAspirations = async () => {
    setLoadingList(true)
    try {
      const res = await getAspirations(1, 5)
      if (res?.data) setAspirations(res.data)
    } catch {
      // silent
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    loadAspirations()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isiAspirasi.trim()) {
      setMsg({ type: "error", text: "Silakan tuliskan aspirasi Anda terlebih dahulu." })
      return
    }
    setSubmitting(true)
    setMsg(null)
    try {
      const res = await submitAspiration({ kategori, isiAspirasi, isAnonymous })
      if (res?.success) {
        setMsg({ type: "success", text: "Aspirasi Anda berhasil dikirim secara aman!" })
        setIsiAspirasi("")
        loadAspirations()
      } else {
        setMsg({ type: "error", text: "Gagal mengirim aspirasi. Silakan coba lagi." })
      }
    } catch {
      setMsg({ type: "error", text: "Gagal mengirim aspirasi. Silakan coba lagi." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ PPPKM
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white mt-4">
            Pusat Pengaduan & <span className="font-display italic font-light text-zinc-300">Keluhan Kampus</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Saluran resmi untuk menyampaikan kritik, keluhan, dan saran terkait fasilitas, kurikulum, dan pelayanan kampus secara aman dan rahasia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 glass-card-glowing border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Sampaikan Keluhan</h2>
              <p className="text-[11px] text-zinc-500">Privasi dan anonimitas Anda terjamin sepenuhnya.</p>
            </div>

            {msg && (
              <div className={`p-4 rounded-xl text-xs border ${
                msg.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                {msg.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Kategori</label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-zinc-950 border border-white/[0.08] text-white focus:outline-none focus:border-amber-500/30"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Isi Keluhan</label>
                <textarea
                  rows={6}
                  value={isiAspirasi}
                  onChange={(e) => setIsiAspirasi(e.target.value)}
                  placeholder="Tulis kritik, keluhan, atau saran konstruktif Anda di sini..."
                  className="w-full px-4 py-3 text-xs rounded-xl bg-zinc-950 border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/30 resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-b border-white/[0.04]">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white">Kirim secara Anonim</span>
                  <p className="text-[10px] text-zinc-500">Nama Anda tidak akan ditampilkan ke publik.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                    isAnonymous ? "bg-amber-500" : "bg-zinc-800"
                  }`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    isAnonymous ? "translate-x-5.5" : "translate-x-1"
                  }`} />
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs hover:shadow-[0_0_20px_rgba(212,168,83,0.25)] transition-all disabled:opacity-40"
              >
                {submitting ? "Mengirim..." : "Kirim Keluhan"}
              </button>
            </form>
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="glass-card-glowing border border-white/5 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span>🕊️</span> Keluhan Terbaru
              </h3>
              {loadingList ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-2xl bg-white/[0.01] border border-white/[0.05] animate-pulse" />
                  ))}
                </div>
              ) : aspirations.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-8">Belum ada keluhan yang masuk.</p>
              ) : (
                <div className="space-y-4">
                  {aspirations.map((item) => (
                    <div key={item.id} className="glass-card-glowing border border-white/5 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {item.kategori}
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          item.status === "resolved"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : item.status === "reviewed"
                            ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {item.status || "Pending"}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed italic">"{item.isiAspirasi}"</p>
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.03]">
                        <span>Oleh: {item.isAnonymous ? "Anonim" : item.user?.nama || "Mahasiswa"}</span>
                        <span>#{item.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
