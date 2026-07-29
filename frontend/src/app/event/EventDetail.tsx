"use client"

import { useEffect, useState } from "react"
import { getEventBySlug } from "@/lib/api"
import type { EventItem } from "@/lib/api"
import { Calendar, MapPin, Users, DollarSign, ArrowLeft, ImageIcon, Tag, Clock, Mail, BookOpen, Check } from "lucide-react"
import Link from "next/link"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function EventDetail({ slug }: { slug: string }) {
  const [event, setEvent] = useState<EventItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await getEventBySlug(slug)
        if (res?.data) {
          setEvent(res.data)
        } else {
          setError("Event tidak ditemukan")
        }
      } catch {
        setError("Gagal memuat detail event")
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
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-white/5 rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-bg-dark text-zinc-100 flex items-center justify-center font-sans">
        <div className="text-center space-y-4 px-6 max-w-md">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
            <ImageIcon className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">{error || "Event tidak ditemukan"}</h1>
          <p className="text-zinc-400 text-sm">Event yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
          <Link
            href="/event"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded bg-amber-gold text-black hover:bg-amber-gold-light transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Event
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg-dark text-zinc-100 font-sans pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 pt-28 relative z-10">
        <Link
          href="/event"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-gold transition-colors mb-6 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Kembali ke Agenda Event
        </Link>

        {/* Category / Status */}
        <div className="flex gap-2 items-center mb-2">
          <span className="text-xs font-extrabold tracking-widest text-amber-gold uppercase">
            {event.status || "Upcoming"}
          </span>
          {event.kategori && (
            <>
              <span className="text-zinc-650">•</span>
              <span className="text-xs text-zinc-500 uppercase font-semibold">{event.kategori}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8">
          {event.judul}
        </h1>

        {/* Info Grid (Styled as clean Quartz Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="border border-white/[0.08] p-4 rounded-xl flex items-start gap-3 bg-white/[0.02]">
            <Calendar className="h-5 w-5 text-amber-gold mt-0.5" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider">Tanggal & Waktu</p>
              <p className="text-sm font-bold text-white mt-0.5">{formatDate(event.tanggal)}</p>
              <p className="text-xs text-zinc-450 mt-0.5">{formatTime(event.tanggal)}</p>
            </div>
          </div>

          <div className="border border-white/[0.08] p-4 rounded-xl flex items-start gap-3 bg-white/[0.02]">
            <MapPin className="h-5 w-5 text-amber-gold mt-0.5" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider">Tempat / Lokasi</p>
              <p className="text-sm font-bold text-white mt-0.5">{event.lokasi}</p>
            </div>
          </div>

          <div className="border border-white/[0.08] p-4 rounded-xl flex items-start gap-3 bg-white/[0.02]">
            <Users className="h-5 w-5 text-amber-gold mt-0.5" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider">Kapasitas</p>
              <p className="text-sm font-bold text-white mt-0.5">
                {event.registration_count !== undefined
                  ? `${event.registration_count} / ${event.kuota} terdaftar`
                  : `${event.kuota} kursi tersedia`}
              </p>
            </div>
          </div>

          <div className="border border-white/[0.08] p-4 rounded-xl flex items-start gap-3 bg-white/[0.02]">
            <DollarSign className="h-5 w-5 text-amber-gold mt-0.5" />
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider">Biaya Pendaftaran</p>
              <p className="text-sm font-bold text-amber-gold mt-0.5">
                {Number(event.biaya) === 0 ? "Gratis" : `Rp ${Number(event.biaya).toLocaleString("id-ID")}`}
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        {event.thumbnail ? (
          <div className="relative w-full h-80 sm:h-96 overflow-hidden rounded-2xl border border-white/[0.08] mb-8 bg-zinc-950">
            <img
              src={event.thumbnail}
              alt={event.judul}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="relative w-full h-48 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center mb-8">
            <ImageIcon className="h-12 w-12 text-zinc-650" />
          </div>
        )}

        {/* Event Description */}
        <div className="prose max-w-none font-sans text-lg text-zinc-300 leading-relaxed space-y-6 mb-16 whitespace-pre-line">
          {event.deskripsi}
        </div>

        {/* ─── Quartz Membership/Booking Box (Matches Image 2 layout, Dark styled) ─────────────────────────── */}
        <div className="border-t border-white/[0.08] pt-12 mt-12 max-w-2xl mx-auto space-y-6 text-center">
          <div className="text-xs text-zinc-400 font-semibold">
            Sudah memiliki akun mahasiswa? <Link href="/login" className="text-amber-gold hover:underline">Masuk</Link>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Amankan Kursi Anda untuk Event HMTIKA Ini
          </h2>

          <p className="text-sm text-zinc-400">
            Daftarkan diri Anda sekarang untuk mengunci kuota pendaftaran.
          </p>

          <div className="max-w-xs mx-auto pt-2">
            {/* Standard Event Admission Card */}
            <div className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-5 relative text-center flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-gold text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-full">
                PENDAFTARAN AKTIF
              </span>
              <div className="pt-2">
                <h4 className="text-xs font-bold text-zinc-500 tracking-wider uppercase">Tiket Masuk</h4>
                <p className="font-sans text-xl font-bold mt-2 text-white">
                  {Number(event.biaya) === 0 ? "Gratis" : `Rp ${Number(event.biaya).toLocaleString("id-ID")}`}
                </p>
              </div>
              <button 
                onClick={() => window.location.href = "/login"}
                disabled={event.status === "selesai"}
                className="mt-4 bg-amber-gold text-black hover:bg-amber-gold-light disabled:bg-white/5 disabled:text-zinc-500 font-bold text-xs py-1.5 px-4 rounded w-full transition-colors uppercase tracking-wider"
              >
                {event.status === "selesai" ? "Event Selesai" : "Daftar Sekarang"}
              </button>
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-8 mt-8 text-left max-w-lg mx-auto">
            <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-amber-gold mb-4">
              PENDAFTARAN SUDAH TERMASUK:
            </h5>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="bg-amber-gold/10 text-amber-gold p-2 rounded-lg border border-amber-gold/20">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h6 className="text-xs font-extrabold text-white">Akses Masuk Penuh</h6>
                  <p className="text-xs text-zinc-400 mt-0.5">Dapatkan akses langsung ke lokasi acara dan kesempatan bertanya jawab dengan para pemateri/mentor teknologi.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-amber-gold/10 text-amber-gold p-2 rounded-lg border border-amber-gold/20">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h6 className="text-xs font-extrabold text-white">Materi Belajar & Sertifikat</h6>
                  <p className="text-xs text-zinc-400 mt-0.5">Menerima materi presentasi resmi dari pembicara, repositori kode proyek, dan e-sertifikat keikutsertaan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="flex justify-center pt-12 border-t border-white/[0.08] mt-12">
          <Link
            href="/event"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs rounded-full font-bold uppercase tracking-wider border border-white/10 hover:bg-white/5 text-zinc-300 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Event
          </Link>
        </div>
      </div>
    </main>
  )
}


