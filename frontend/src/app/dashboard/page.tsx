"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Mail, GraduationCap, Calendar, Award, Bell } from "lucide-react"
import { getMe } from "@/lib/api/users"
import { getEvents } from "@/lib/api/events"
import { getNews } from "@/lib/api/news"
import { Skeleton } from "@/components/ui/Skeleton"
import type { User as UserType } from "@/lib/api/users"
import type { EventItem } from "@/lib/api/events"
import type { NewsItem } from "@/lib/api/news"

export default function DashboardPage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserType | null>(null)
  const [events, setEvents] = useState<EventItem[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem("token")
    if (!t) {
      router.replace("/login")
      return
    }
    setToken(t)

    Promise.all([
      getMe(t).then((r) => r?.data && setUser(r.data)),
      getEvents(1, 5).then((r) => r?.data && setEvents(r.data)),
      getNews(1, 5).then((r) => r?.data && setNews(r.data)),
    ]).catch(() => {
      localStorage.removeItem("token")
      router.replace("/login")
    }).finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  if (loading) {
    return (
      <div className="w-full text-zinc-100 min-h-screen bg-[#050505] p-6 md:p-12 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-4.5 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3.5 w-32" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-6">
          <Skeleton className="h-6 w-36" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-3.5 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-zinc-100 min-h-screen bg-[#050505] p-6 md:p-12 space-y-8">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Selamat datang kembali{user?.nama ? `, ${user.nama}` : ""}!
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <LogOut className="size-3.5" />
          Keluar
        </button>
      </div>

      {/* ── Profile Card ── */}
      {user && (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="size-16 rounded-full bg-amber-gold/10 border border-amber-gold/20 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-amber-gold">
                {user.nama?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h2 className="text-lg font-semibold text-white">{user.nama}</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="size-3" />
                  {user.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="size-3" />
                  Angkatan {user.angkatan}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="size-3" />
                  {user.role || "Member"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Event</span>
            <Calendar className="size-4 text-amber-gold" />
          </div>
          <p className="text-2xl font-bold text-white">{events.length}</p>
          <p className="text-[11px] text-zinc-600">Event terbaru</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Berita</span>
            <Award className="size-4 text-amber-gold" />
          </div>
          <p className="text-2xl font-bold text-white">{news.length}</p>
          <p className="text-[11px] text-zinc-600">Berita terbaru</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Notifikasi</span>
            <Bell className="size-4 text-amber-gold" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-[11px] text-zinc-600">Belum ada notifikasi</p>
        </div>
      </div>

      {/* ── Recent Events ── */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
        <h2 className="text-base font-semibold text-white">Event Terbaru</h2>
        {events.length === 0 ? (
          <p className="text-sm text-zinc-600">Belum ada event.</p>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{ev.judul}</p>
                  <p className="text-xs text-zinc-500">{new Date(ev.tanggal).toLocaleDateString("id-ID")}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  ev.status === "ongoing"
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    : ev.status === "completed"
                    ? "text-zinc-500 border-white/10 bg-white/5"
                    : "text-amber-400 border-amber-500/30 bg-amber-500/10"
                }`}>
                  {ev.status || "upcoming"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Recent News ── */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5">
        <h2 className="text-base font-semibold text-white">Berita Terbaru</h2>
        {news.length === 0 ? (
          <p className="text-sm text-zinc-600">Belum ada berita.</p>
        ) : (
          <div className="space-y-3">
            {news.map((n) => (
              <div key={n.id} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{n.judul}</p>
                  <p className="text-xs text-zinc-500 line-clamp-1">{n.ringkasan}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
