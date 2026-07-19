"use client"

import { useEffect, useState } from "react"
import { getNewsBySlug } from "@/lib/api"
import type { NewsItem } from "@/lib/api"
import { Calendar, ArrowLeft, ImageIcon, Tag, User, Mail, BookOpen, Check } from "lucide-react"
import Link from "next/link"

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function NewsDetail({ slug }: { slug: string }) {
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await getNewsBySlug(slug)
        if (res?.data) {
          setNews(res.data)
        } else {
          setError("Berita tidak ditemukan")
        }
      } catch {
        setError("Gagal memuat berita")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-bg-dark text-zinc-100 font-sans">
        <div className="mx-auto max-w-3xl px-6 pt-28">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-white/5 rounded" />
            <div className="h-64 w-full bg-white/5 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-8 w-3/4 bg-white/5 rounded" />
              <div className="h-4 w-1/2 bg-white/5 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-5/6 bg-white/5 rounded" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !news) {
    return (
      <main className="min-h-screen bg-bg-dark text-zinc-100 flex items-center justify-center font-sans">
        <div className="text-center space-y-4 px-6 max-w-md">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
            <ImageIcon className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">{error || "Berita tidak ditemukan"}</h1>
          <p className="text-zinc-400 text-sm">Berita yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded bg-amber-gold text-black hover:bg-amber-gold-light transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Berita
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg-dark text-zinc-100 font-sans pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 pt-28 relative z-10">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-gold transition-colors mb-6 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Kembali ke Berita
        </Link>

        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-extrabold tracking-widest text-amber-gold uppercase">
            {news.kategori}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
          {news.judul}
        </h1>

        {/* Author / Date info */}
        <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 py-3 border-t border-b border-white/[0.08] mb-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">Oleh {news.author?.nama || "HMTIKA Editor"}</span>
            <span className="text-zinc-650">•</span>
            <span>{formatDate(news.tglPublish) || "Draft"}</span>
          </div>
          <div className="text-[10px] uppercase font-mono tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-400 px-2 py-0.5 rounded">
            HMTIKA Editorial
          </div>
        </div>

        {/* Image */}
        {news.thumbnail ? (
          <div className="relative w-full h-80 sm:h-96 overflow-hidden rounded-2xl border border-white/[0.08] mb-8 bg-zinc-950">
            <img
              src={news.thumbnail}
              alt={news.judul}
              className="object-cover w-full h-full"
            />
            <div className="text-[10px] text-zinc-500 italic mt-2 text-right">
              Dokumentasi HMTIKA.
            </div>
          </div>
        ) : (
          <div className="relative w-full h-48 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center mb-8">
            <ImageIcon className="h-12 w-12 text-zinc-600" />
          </div>
        )}

        {/* Article Body */}
        <div className="prose max-w-none font-sans text-lg text-zinc-300 leading-relaxed space-y-6 mb-16 whitespace-pre-line">
          {news.konten}
        </div>

        {/* ─── Quartz Membership Box (Matches Image 2 exactly, Dark styled) ─────────────────────────── */}
        <div className="border-t border-white/[0.08] pt-12 mt-12 max-w-2xl mx-auto space-y-6 text-center">
          <div className="text-xs text-zinc-400 font-semibold">
            Sudah memiliki akun mahasiswa? <Link href="/login" className="text-amber-gold hover:underline">Masuk</Link>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dukung Kegiatan Mahasiswa & Dapatkan Info Terkini
          </h2>

          <p className="text-sm text-zinc-400">
            Mari bergabung menjadi anggota hari ini.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            {/* Monthly Plan */}
            <div className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-5 relative text-center flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-gold text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-full">
                ANGGOTA AKTIF
              </span>
              <div className="pt-2">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Bulanan</h4>
                <p className="font-sans text-xl font-bold mt-2 text-white">Rp 10.000 <span className="text-xs text-zinc-500 font-sans">/ bulan</span></p>
              </div>
              <button 
                onClick={() => window.location.href = "/login"}
                className="mt-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-1.5 px-4 rounded w-full transition-colors border border-white/10"
              >
                Pilih
              </button>
            </div>

            {/* Annual Plan */}
            <div className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-5 text-center flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Tahunan</h4>
                <p className="font-sans text-xl font-bold mt-2 text-white">
                  <span className="line-through text-xs text-zinc-500 font-sans mr-1">Rp 99.000</span> 
                  Rp 79.999 <span className="text-xs text-zinc-500 font-sans">/ tahun</span>
                </p>
              </div>
              <button 
                onClick={() => window.location.href = "/login"}
                className="mt-4 bg-amber-gold text-black hover:bg-amber-gold-light font-bold text-xs py-1.5 px-4 rounded w-full transition-colors"
              >
                Pilih
              </button>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 italic">
            Diskon 20% telah diterapkan untuk paket keanggotaan tahunan
          </p>

          <div className="border-t border-white/[0.08] pt-8 mt-8 text-left max-w-lg mx-auto">
            <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-amber-gold mb-4">
              BENEFIT KEANGGOTAAN:
            </h5>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="bg-amber-gold/10 text-amber-gold p-2 rounded-lg border border-amber-gold/20">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h6 className="text-xs font-extrabold text-white">Buletin Mingguan Eksklusif</h6>
                  <p className="text-xs text-zinc-400 mt-0.5">Informasi ringkas seputar tips pemrograman, lowongan magang, dan agenda akademik terupdate di STMIK Tunas Bangsa.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-amber-gold/10 text-amber-gold p-2 rounded-lg border border-amber-gold/20">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h6 className="text-xs font-extrabold text-white">Dukung Ekosistem Belajar Terbuka</h6>
                  <p className="text-xs text-zinc-400 mt-0.5">Kontribusi Anda membantu kami menyelenggarakan kelas programming gratis dan workshop teknologi secara berkelanjutan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="flex justify-center pt-12 border-t border-white/[0.08] mt-12">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs rounded-full font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 text-zinc-300 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Berita
          </Link>
        </div>
      </div>
    </main>
  )
}


