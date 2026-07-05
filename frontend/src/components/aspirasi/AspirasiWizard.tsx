"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Send, Loader2, MessageSquare, ChevronLeft, ChevronRight, Lock } from "lucide-react"
import { fetchAPI } from "@/lib/api/client"

// ─── Types ───

interface AspirationUser {
  nama: string
  email: string
  angkatan: string
}

interface AspirationItem {
  id: string
  kategori: string
  isiAspirasi: string
  isAnonymous: boolean
  status: string
  responAdmin?: string | null
  createdAt: string
  user?: AspirationUser | null
}

interface Meta {
  total: number
  page: number
  limit: number
}

interface AspirationListResponse {
  success: boolean
  data: AspirationItem[]
  meta: Meta
}

interface CreateResponse {
  success: boolean
  message: string
  data?: { id: string }
}

// ─── Constants ───

const categories = ["Akademik", "Kegiatan", "Fasilitas", "Lainnya"]
const filterCategories = ["Semua", ...categories]
const FEED_LIMIT = 6

// ─── Stat Card ───

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02] pointer-events-none" />
      <p className={cn("relative text-[11px] font-bold uppercase tracking-widest", color)}>{label}</p>
      <p className="relative text-3xl font-black text-white mt-1.5 tabular-nums">{value}</p>
    </div>
  )
}

// ─── Status Badge ───

function StatusBadge({ status }: { status: string }) {
  const s = (status || "").toLowerCase()
  return (
    <span
      className={cn(
        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
        s === "resolved"
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          : s === "reviewed"
            ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
            : "bg-amber-500/10 border-amber-500/20 text-amber-400",
      )}
    >
      {status}
    </span>
  )
}

// ─── Loading Skeleton ───

function FeedSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 rounded-xl bg-white/[0.02] animate-pulse" />
      ))}
    </div>
  )
}

// ─── Feed Item ───

function FeedItem({ item }: { item: AspirationItem }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 space-y-3 transition-colors hover:border-white/[0.1]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
          {item.kategori}
        </span>
        <StatusBadge status={item.status} />
      </div>
      <p className="text-sm text-zinc-300 leading-relaxed">&ldquo;{item.isiAspirasi}&rdquo;</p>
      <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.03]">
        <span>
          Oleh: {item.isAnonymous ? "Mahasiswa Anonim" : item.user?.nama || "Mahasiswa"}
        </span>
        <span>
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      {item.responAdmin && (
        <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.04] space-y-1">
          <span className="text-[10px] font-bold text-zinc-400">Respon Pengurus:</span>
          <p className="text-xs text-zinc-400 leading-relaxed">{item.responAdmin}</p>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───

export default function AspirasiWizard() {
  const [aspirations, setAspirations] = useState<AspirationItem[]>([])
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, limit: FEED_LIMIT })
  const [statsAll, setStatsAll] = useState<AspirationItem[]>([])
  const [loading, setLoading] = useState(true)

  const [kategori, setKategori] = useState("Akademik")
  const [isiAspirasi, setIsiAspirasi] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [filterCategory, setFilterCategory] = useState("Semua")
  const [page, setPage] = useState(1)

  const totalPage = Math.max(1, Math.ceil(meta.total / FEED_LIMIT))

  const stats = {
    total: statsAll.length || meta.total,
    pending: statsAll.filter((a) => a.status === "pending").length,
    reviewed: statsAll.filter((a) => a.status === "reviewed").length,
    resolved: statsAll.filter((a) => a.status === "resolved").length,
  }

  const loadFeed = async (p: number, cat: string) => {
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(FEED_LIMIT) })
      if (cat !== "Semua") params.set("kategori", cat)
      const res = await fetchAPI<AspirationListResponse>(`/aspirations?${params}`)
      if (res.success) {
        setAspirations(res.data)
        setMeta(res.meta)
      }
    } catch {
      setAspirations([])
    }
  }

  const loadStats = async () => {
    try {
      const res = await fetchAPI<AspirationListResponse>("/aspirations?page=1&limit=100")
      if (res.success) setStatsAll(res.data)
    } catch {
      setStatsAll([])
    }
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([loadFeed(page, filterCategory), loadStats()]).finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadFeed(page, filterCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterCategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isiAspirasi.trim()) return
    setSubmitting(true)
    setMsg(null)
    try {
      const res = await fetchAPI<CreateResponse>("/aspirations", {
        method: "POST",
        body: JSON.stringify({ kategori, isiAspirasi, isAnonymous }),
      })
      if (res.success) {
        setMsg({ type: "success", text: "Aspirasi berhasil dikirim!" })
        setIsiAspirasi("")
        setPage(1)
        Promise.all([loadFeed(1, filterCategory), loadStats()])
      } else {
        setMsg({ type: "error", text: res.message || "Gagal mengirim." })
      }
    } catch {
      setMsg({ type: "error", text: "Gagal mengirim. Coba lagi." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="w-full relative overflow-hidden">
      {/* Inline ambient glow */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/3 blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-28">
        {/* ─── Hero Header ─── */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1 text-[10px] uppercase font-bold tracking-[0.15em] text-zinc-400 mb-6">
            ◎ Aspirasi Mahasiswa
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white">
            Suara{" "}
            <span className="font-display italic font-light text-amber-gold">
              Mahasiswa
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Kritik, saran, dan aspirasi Anda adalah instrumen penting bagi kemajuan HMTIKA dan peningkatan kualitas
            akademik.
          </p>
        </div>

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 mb-12">
          <StatCard label="Total Aspirasi" value={stats.total} color="text-zinc-400" />
          <StatCard label="Pending" value={stats.pending} color="text-amber-400" />
          <StatCard label="Direview" value={stats.reviewed} color="text-sky-400" />
          <StatCard label="Terselesaikan" value={stats.resolved} color="text-emerald-400" />
        </div>

        {/* ─── Two-Panel ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 mb-10">
          {/* ─── Left: Form ─── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 h-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="text-base font-semibold text-white">Kirim Aspirasi</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Privasi dan anonimitas Anda terjamin sepenuhnya.
                  </p>
                </div>

                {msg && (
                  <div
                    className={cn(
                      "p-3.5 rounded-xl text-xs border leading-relaxed",
                      msg.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400",
                    )}
                  >
                    {msg.text}
                  </div>
                )}

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kategori</p>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="kategori"
                        value={cat}
                        checked={kategori === cat}
                        onChange={(e) => setKategori(e.target.value)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                          kategori === cat
                            ? "border-amber-gold"
                            : "border-white/[0.2] group-hover:border-amber-gold/50",
                        )}
                      >
                        {kategori === cat && <span className="w-2 h-2 rounded-full bg-amber-gold" />}
                      </span>
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Isi Aspirasi</p>
                  <textarea
                    rows={5}
                    value={isiAspirasi}
                    onChange={(e) => setIsiAspirasi(e.target.value)}
                    placeholder="Tulis kritik, saran, atau aspirasi Anda..."
                    className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-950 border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-amber-gold/30 resize-none leading-relaxed"
                  />
                </div>

                <label className="flex items-center justify-between cursor-pointer gap-4">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">Kirim secara Anonim</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Nama Anda tidak akan ditampilkan ke publik.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={cn(
                      "relative inline-flex h-5 w-10 items-center rounded-full transition-colors shrink-0",
                      isAnonymous ? "bg-amber-gold" : "bg-zinc-800",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                        isAnonymous ? "translate-x-[22px]" : "translate-x-1",
                      )}
                    />
                  </button>
                </label>

                <Button
                  type="submit"
                  variant="default"
                  disabled={submitting || !isiAspirasi.trim()}
                  className="px-6 py-[10px] h-auto text-sm font-medium w-full inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? "Mengirim..." : "Kirim Aspirasi"}
                </Button>
              </form>
            </div>
          </div>

          {/* ─── Right: Feed ─── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-base font-semibold text-white">Linimasa Aspirasi</p>
                  <select
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value)
                      setPage(1)
                    }}
                    className="px-3 py-1.5 text-[11px] rounded-lg bg-zinc-950 border border-white/[0.08] text-zinc-400 focus:outline-none focus:border-amber-gold/30"
                  >
                    {filterCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 space-y-4 min-h-[300px]">
                  {loading ? (
                    <FeedSkeleton />
                  ) : aspirations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <MessageSquare className="w-10 h-10 text-zinc-600 mb-3" />
                      <p className="text-sm text-zinc-500">Belum ada aspirasi.</p>
                      <p className="text-xs text-zinc-600 mt-1">Jadilah yang pertama menyuarakan pendapat.</p>
                    </div>
                  ) : (
                    aspirations.map((item) => <FeedItem key={item.id} item={item} />)
                  )}
                </div>

                {/* Pagination */}
                {totalPage > 1 && (
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.05]">
                    <p className="text-[11px] text-zinc-500">
                      {meta.total} aspirasi &middot; Halaman {page} dari {totalPage}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] disabled:opacity-30 disabled:pointer-events-none hover:bg-white/[0.06] text-zinc-400 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] text-zinc-400 font-medium tabular-nums min-w-[3ch] text-center">
                        {page}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                        disabled={page === totalPage}
                        className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] disabled:opacity-30 disabled:pointer-events-none hover:bg-white/[0.06] text-zinc-400 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Footer Alert ─── */}
        <div className="rounded-2xl border border-amber-gold/10 bg-amber-gold/[0.04] p-5 md:p-6 flex items-start gap-3 md:gap-4">
          <div className="w-6 h-6 rounded-full bg-amber-gold/10 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-3 h-3 text-amber-gold" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-gold">Privasi Terjamin</p>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Setiap aspirasi yang masuk akan ditindaklanjuti oleh pengurus HMTIKA dalam waktu 3&times;24 jam. Identitas
              Anda akan tetap anonim sesuai pilihan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
