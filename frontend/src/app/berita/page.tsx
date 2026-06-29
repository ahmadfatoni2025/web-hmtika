"use client"

import { useState, useEffect } from "react"
import { getNews, getNewsBySlug } from "@/lib/api"
import type { NewsItem } from "@/lib/api"
import {
  Calendar,
  ImageIcon,
  ArrowRight,
  Search,
  X,
} from "lucide-react"

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  const categories = ["Semua", "Kegiatan", "Pengumuman", "Akademik", "Umum"]

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      try {
        const categoryQuery = selectedCategory === "Semua" ? undefined : selectedCategory
        const res = await getNews(page, 9, categoryQuery)
        if (res && res.data) {
          setNews(res.data)
          if (res.total) {
            setTotalPage(Math.ceil(res.total / 9))
          }
        }
      } catch (err) {
        console.error("Failed to load news:", err)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [selectedCategory, page])

  const filteredNews = news.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase()) ||
    item.ringkasan.toLowerCase().includes(search.toLowerCase())
  )

  const openNewsDetail = async (slug: string) => {
    setModalLoading(true)
    try {
      const res = await getNewsBySlug(slug)
      if (res && res.data) {
        setSelectedNews(res.data)
      } else {
        const item = news.find(n => n.slug === slug)
        if (item) setSelectedNews(item)
      }
    } catch {
      const item = news.find(n => n.slug === slug)
      if (item) setSelectedNews(item)
    } finally {
      setModalLoading(false)
    }
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <main className="relative min-h-screen bg-bg-dark text-zinc-100 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-gold/20 bg-amber-gold/10 px-4 py-1 text-xs font-semibold text-amber-gold mb-5">
            Newsroom HMTIKA
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Pusat Informasi & Kabar Terbaru
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            Dapatkan berita resmi, pengumuman akademik, dan rangkuman kegiatan dari
            Himpunan Mahasiswa Teknik Informatika secara transparan dan berkala.
          </p>
        </div>

        {/* ─── Filters ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 pb-6 border-b border-white/[0.06]">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setPage(1)
                }}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-amber-gold text-black shadow-md shadow-amber-gold/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-500 focus:outline-none focus:border-amber-gold/30 focus:bg-white/[0.04] transition-all"
            />
          </div>
        </div>

        {/* ─── News Grid ──────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[420px] rounded-2xl glass-card-glowing animate-pulse" />
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 glass-card-glowing rounded-2xl border border-white/5">
            <p className="mt-4 text-sm font-bold text-zinc-300">Tidak ada berita ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="group glass-card-glowing rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
              >
                {/* Image placeholder */}
                <div
                  onClick={() => openNewsDetail(item.slug)}
                  className="relative h-48 w-full bg-gradient-to-br from-amber-gold/10 via-zinc-900 to-zinc-950 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-zinc-600/50" />
                  )}
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/50 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold text-amber-gold border border-white/10 uppercase tracking-widest">
                    {item.kategori}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Headline */}
                  <h2
                    onClick={() => openNewsDetail(item.slug)}
                    className="text-base font-bold text-white leading-snug group-hover:text-amber-gold transition-colors line-clamp-2 cursor-pointer"
                  >
                    {item.judul}
                  </h2>

                  {/* Author row */}
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      {item.author?.foto ? (
                        <img
                          src={item.author.foto}
                          alt={item.author.nama}
                          className="w-5 h-5 rounded-full border border-white/10 object-cover"
                        />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 text-[9px]">👤</span>
                      )}
                      <span className="font-semibold text-zinc-400 line-clamp-1">
                        {item.author?.nama || "Admin HMTIKA"}
                      </span>
                    </div>
                    <span className="text-zinc-600">|</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(item.tglPublish) || "Draft"}</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                    {item.ringkasan}
                  </p>

                  {/* Read more */}
                  <button
                    onClick={() => openNewsDetail(item.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-gold hover:text-amber-gold-light transition-colors mt-auto pt-2 border-t border-white/[0.04]"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    Baca Selengkapnya
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
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-premium rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-amber-gold/10 px-2.5 py-0.5 text-[9px] font-bold text-amber-gold border border-amber-gold/20 uppercase tracking-widest">
                {selectedNews.kategori}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {selectedNews.judul}
              </h2>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(selectedNews.tglPublish) || "Draft"}</span>
                </div>
                <span>•</span>
                <span>
                  {selectedNews.author?.nama || "Admin HMTIKA"}
                </span>
              </div>
            </div>

            {selectedNews.thumbnail && (
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6 border border-white/5">
                <img src={selectedNews.thumbnail} alt={selectedNews.judul} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="text-zinc-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {selectedNews.konten || selectedNews.ringkasan}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 text-xs font-semibold rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal loading overlay */}
      {modalLoading && selectedNews && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-premium rounded-2xl p-8">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <div className="h-5 w-5 border-2 border-amber-gold/30 border-t-amber-gold rounded-full animate-spin" />
              Memuat...
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
