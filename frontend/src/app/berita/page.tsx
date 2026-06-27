"use client"

import { useState, useEffect } from "react"
import { getNews, getNewsBySlug } from "@/lib/api"
import type { NewsItem } from "@/lib/api"

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Categories list
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

  // Client side search filter
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
        // Fallback to current item if API details structure is nested differently
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

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12">
        {/* Header */}
        <div className="space-y-4 mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Newsroom HMTIKA
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white">
            Pusat Informasi & <span className="font-display italic font-light text-zinc-300">Kabar Terbaru</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Dapatkan berita resmi, pengumuman akademik, dan rangkuman kegiatan dari Himpunan Mahasiswa Teknik Informatika secara transparan dan berkala.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-white/[0.06]">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setPage(1)
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${selectedCategory === cat
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(212,168,83,0.15)]"
                    : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-500 text-xs pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.04] transition-all"
            />
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[380px] rounded-2xl bg-white/[0.01] border border-white/[0.05] animate-pulse" />
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 glass-card-glowing rounded-2xl border border-white/5">
            <span className="text-4xl">📭</span>
            <p className="mt-4 text-sm font-bold text-zinc-300">Tidak ada berita ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                onClick={() => openNewsDetail(item.slug)}
                className="group cursor-pointer glass-card-glowing border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[380px]"
              >
                {/* News Image/Gradient Fallback */}
                <div className="relative h-44 w-full bg-zinc-950 overflow-hidden border-b border-white/[0.05]">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 flex items-center justify-center relative">
                      <span className="text-3xl opacity-20">📰</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                  )}
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-black/50 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold text-amber-400 border border-white/10 uppercase tracking-widest">
                    {item.kategori}
                  </span>
                </div>

                {/* News Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono text-zinc-500">
                      {item.tglPublish
                        ? new Date(item.tglPublish).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        : "Draft"}
                    </p>
                    <h2 className="text-base font-bold text-white leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
                      {item.judul}
                    </h2>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>

                  {/* Author / Read More link */}
                  <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
                    <div className="flex items-center gap-2">
                      {item.author?.foto ? (
                        <img src={item.author.foto} alt={item.author.nama} className="w-5 h-5 rounded-full border border-white/10" />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 text-[9px]">👤</span>
                      )}
                      <span className="font-semibold text-zinc-400 line-clamp-1">{item.author?.nama || "Admin HMTIKA"}</span>
                    </div>
                    <span className="group-hover:text-white transition-colors flex items-center gap-1">
                      Baca Selengkapnya <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
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

      {/* Details Slide-over Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card-glowing border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="space-y-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/20 uppercase tracking-widest">
                {selectedNews.kategori}
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {selectedNews.judul}
              </h2>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>
                  📅 {selectedNews.tglPublish
                    ? new Date(selectedNews.tglPublish).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    : "Draft"}
                </span>
                <span>•</span>
                <span>✍️ {selectedNews.author?.nama || "Admin HMTIKA"}</span>
              </div>
            </div>

            {/* Thumbnail */}
            {selectedNews.thumbnail && (
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6 border border-white/5">
                <img src={selectedNews.thumbnail} alt={selectedNews.judul} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Content Body */}
            <div className="text-zinc-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {selectedNews.konten || selectedNews.ringkasan}
            </div>

            {/* Modal Footer */}
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
    </main>
  )
}