"use client"

import { useState, useEffect } from "react"
import { getNews } from "@/lib/api"
import type { NewsItem } from "@/lib/api"
import {
  Calendar,
  ImageIcon,
  ArrowRight,
  Search,
  ChevronRight,
} from "lucide-react"

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const categories = ["Semua", "Kegiatan", "Pengumuman", "Akademik", "Umum"]

  useEffect(() => {
    async function loadNews() {
      setLoading(true)
      try {
        const categoryQuery = selectedCategory === "Semua" ? undefined : selectedCategory
        const res = await getNews(page, 15, categoryQuery) // Fetch more items to distribute across columns
        if (res && res.data) {
          setNews(res.data)
          if (res.meta.total) {
            setTotalPage(Math.ceil(res.meta.total / 15))
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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const openDetailTab = (slug: string) => {
    window.open(`/berita/${slug}`, "_blank")
  }

  // Distribute news items to different sections of the Quartz layout
  const heroNews = filteredNews[0]
  const leftSidebarNews = filteredNews.slice(1, 4)
  const needToKnowNews = filteredNews.slice(4, 8)
  const popularNews = filteredNews.slice(8, 13)
  const featuredProjectNews = filteredNews[13] || filteredNews[0]

  return (
    <main className="min-h-screen bg-bg-dark text-zinc-100 font-sans pb-24 relative overflow-hidden">
      {/* Background glow effects matching other code */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      {/* Spacing for fixed Navbar */}
      <div className="pt-28 max-w-7xl mx-auto px-4 lg:px-8">

        {/* ─── Search & Categories Filter bar (Quartz style, dark theme) ─── */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setPage(1)
                }}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${selectedCategory === cat
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
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-500 focus:outline-none focus:border-amber-gold/30 focus:bg-white/[0.04] transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            <div className="lg:col-span-3 space-y-6">
              <div className="h-64 bg-white/5 rounded-2xl" />
            </div>
            <div className="lg:col-span-6 space-y-6">
              <div className="h-96 bg-white/5 rounded-2xl" />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div className="h-80 bg-white/5 rounded-2xl" />
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/[0.08] rounded-2xl max-w-md mx-auto">
            <p className="text-sm font-bold text-zinc-300">Tidak ada berita ditemukan</p>
            <p className="text-xs text-zinc-500 mt-1">Coba pilih kategori lain atau gunakan kata kunci pencarian berbeda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ─── Left Sidebar (Quartz style, dark theme) ─────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white/[0.02] border border-white/[0.08] p-4 border-t-2 border-amber-gold rounded-xl">
                <h3 className="text-[11px] font-bold tracking-wider uppercase text-amber-gold mb-2">
                  HMTIKA MEMBER UPDATES
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Dapatkan rangkuman informasi akademik, kegiatan terbaru, dan pengumuman himpunan langsung di dashboard Anda.
                </p>
                <button
                  onClick={() => window.location.href = "/login"}
                  className="text-xs text-amber-gold hover:underline font-semibold"
                >
                  Masuk ke dashboard mahasiswa.
                </button>
              </div>

              {leftSidebarNews.map((item, idx) => (
                <div key={item.id} className="border-b border-white/[0.08] pb-4 last:border-0 cursor-pointer group" onClick={() => openDetailTab(item.slug)}>
                  {idx === 0 && item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-36 object-cover mb-3 rounded-lg border border-white/[0.08]"
                    />
                  )}
                  <div className="flex gap-3">
                    {idx > 0 && item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-16 h-16 object-cover flex-shrink-0 rounded-lg border border-white/[0.08]"
                      />
                    )}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold tracking-wider text-amber-gold uppercase">
                        {item.kategori}
                      </span>
                      <h4 className="text-sm font-bold leading-snug text-white group-hover:text-amber-gold transition-colors">
                        ✦ {item.judul}
                      </h4>
                      <p className="text-[10px] text-zinc-500">{formatDate(item.tglPublish)}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t border-white/[0.08] pt-3 flex items-center justify-between text-xs font-bold text-zinc-300 cursor-pointer hover:text-amber-gold" onClick={() => setSelectedCategory("Semua")}>
                <span>Lihat semua pembaruan</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* ─── Center Main Column ─────────────────────────────────────────── */}
            <div className="lg:col-span-6 lg:border-l lg:border-r lg:border-white/[0.08] lg:px-6 space-y-8">
              <div>
                <h2 className="font-sans text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2">
                  Kabar Terbaru.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Ikuti terus perkembangan seputar dunia Teknik Informatika, inovasi teknologi mahasiswa, dan informasi resmi dari HMTIKA STMIK Tunas Bangsa.
                </p>
              </div>

              {heroNews && (
                <article className="space-y-3 cursor-pointer group" onClick={() => openDetailTab(heroNews.slug)}>
                  {heroNews.thumbnail && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
                      <img
                        src={heroNews.thumbnail}
                        alt={heroNews.judul}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-[9px] text-white px-2 py-0.5 font-mono uppercase rounded">
                        DOKUMENTASI/HMTIKA
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-sans text-2xl font-extrabold text-white group-hover:text-amber-gold transition-colors leading-tight">
                      {heroNews.judul}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Oleh <span className="font-semibold text-zinc-400">{heroNews.author?.nama || "HMTIKA Editor"}</span> • {formatDate(heroNews.tglPublish)}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line line-clamp-3">
                      {heroNews.ringkasan}
                    </p>
                  </div>
                </article>
              )}

              {/* Need to know section */}
              <div className="border-t-2 border-white/[0.08] pt-4">
                <h3 className="text-xs font-extrabold tracking-wider uppercase text-amber-gold mb-4">
                  BACA JUGA INFO PENTING INI
                </h3>
                <div className="space-y-6">
                  {needToKnowNews.map((item) => (
                    <div key={item.id} className="space-y-1 cursor-pointer group" onClick={() => openDetailTab(item.slug)}>
                      <h4 className="text-base font-extrabold leading-tight text-white group-hover:text-amber-gold transition-colors">
                        {item.judul}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {item.ringkasan}
                      </p>
                      <p className="text-[10px] text-zinc-500">{formatDate(item.tglPublish)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Right Sidebar ─────────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Popular Stories */}
              <div className="bg-white/[0.02] border border-white/[0.08] p-4 border-t-2 border-amber-gold rounded-xl space-y-4">
                <h3 className="text-[11px] font-bold tracking-wider uppercase text-amber-gold">
                  BERITA POPULER HMTIKA
                </h3>
                <div className="space-y-4">
                  {popularNews.map((item) => (
                    <div key={item.id} className="space-y-1 cursor-pointer group" onClick={() => openDetailTab(item.slug)}>
                      <h4 className="text-sm font-bold leading-snug text-white group-hover:text-amber-gold transition-colors">
                        {item.judul}
                      </h4>
                      <p className="text-[10px] text-zinc-550 uppercase tracking-widest">
                        {item.kategori} • {formatDate(item.tglPublish)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.08] pt-3 flex items-center justify-between text-xs font-bold text-zinc-300 cursor-pointer hover:text-amber-gold" onClick={() => setSelectedCategory("Semua")}>
                  <span>Semua berita populer</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              {/* Featured Project */}
              {featuredProjectNews && (
                <div className="bg-white/[0.01] border border-white/[0.08] p-4 rounded-xl space-y-3">
                  <h3 className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-500">
                    SOROTAN UTAMA
                  </h3>
                  <div className="flex gap-3 items-start cursor-pointer" onClick={() => openDetailTab(featuredProjectNews.slug)}>
                    {featuredProjectNews.thumbnail ? (
                      <img
                        src={featuredProjectNews.thumbnail}
                        alt={featuredProjectNews.judul}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-white/[0.08]"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center font-bold text-zinc-400 text-xs">
                        HMT
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold leading-snug text-white hover:text-amber-gold">
                        {featuredProjectNews.judul}
                      </h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-3 mt-1">
                        {featuredProjectNews.ringkasan}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.08] pt-2 flex items-center justify-between text-[11px] font-bold text-zinc-300 cursor-pointer hover:text-amber-gold" onClick={() => openDetailTab(featuredProjectNews.slug)}>
                    <span>Selengkapnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ─── Pagination ─────────────────────────────────────── */}
        {totalPage > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12 border-t border-white/[0.08] pt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 text-white font-bold"
            >
              SEBELUMNYA
            </button>
            <span className="text-xs text-zinc-400 font-semibold">Halaman {page} dari {totalPage}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
              disabled={page === totalPage}
              className="px-4 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 disabled:opacity-40 disabled:pointer-events-none hover:bg-white/10 text-white font-bold"
            >
              SELANJUTNYA
            </button>
          </div>
        )}
      </div>
    </main>
  )
}


