"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getNews, getEvents, getAspirations } from "@/lib/api"
import type { NewsItem, EventItem, AspirationItem } from "@/lib/api"
import HeroSection from "@/components/home/HeroSection"
import FloatingData from "@/components/home/FloatingData"
import Collaborators from "@/components/home/Collaborators"
import Feature from "@/components/home/Feature"
import ExtrasFeature from "@/components/home/ExtrasFeature"
import BentoDocs from "@/components/home/BentoDocs"
import FAQ from "@/components/home/FAQ"

export default function Home() {
  // API states
  const [news, setNews] = useState<NewsItem[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [aspirations, setAspirations] = useState<AspirationItem[]>([])

  const [totalNews, setTotalNews] = useState(0)
  const [totalEvents, setTotalEvents] = useState(0)
  const [totalAspirations, setTotalAspirations] = useState(0)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [newsRes, eventsRes, aspirationsRes] = await Promise.all([
          getNews(1, 5).catch(() => null),
          getEvents(1, 5).catch(() => null),
          getAspirations(1, 5).catch(() => null),
        ])

        if (newsRes && newsRes.data) {
          setNews(newsRes.data)
          setTotalNews(newsRes.total || newsRes.data.length)
        }

        if (eventsRes && eventsRes.data) {
          setEvents(eventsRes.data)
          setTotalEvents(eventsRes.total || eventsRes.data.length)
        }

        if (aspirationsRes && aspirationsRes.data) {
          setAspirations(aspirationsRes.data)
          setTotalAspirations(aspirationsRes.total || aspirationsRes.data.length)
        }
      } catch (err) {
        console.error("Error loading home page API data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Dynamic values or fallback

  // Count resolved/pending aspirations for the middle card slider
  const resolvedCount = aspirations.filter(a => a.status === "resolved").length || 8
  const pendingCount = aspirations.filter(a => a.status === "pending").length || 3
  const resolvedPercentage = Math.round((resolvedCount / (resolvedCount + pendingCount)) * 100) || 72

  return (
    <main className="w-full min-h-auto text-zinc-100 overflow-x-hidden pb-20">

      {/* ── HERO SECTION ── */}
      <section className="relative w-full flex flex-col items-center justify-center pb-24 overflow-hidden">

        {/* Background Video Player */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
          {/* Dark Overlay - Memperbaiki bagian atas agar tidak ada warna hitam */}
          <div className="absolute inset-0 z-0">
            {/* Gradient overlay yang lebih smooth dari atas ke bawah */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />

            {/* Overlay tambahan untuk bagian bawah agar lebih gelap */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>
        </div>

        {/* Ambient top light beam line - Dibiarkan */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[550px] bg-gradient-to-b from-white/10 via-amber-500/20 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 mx-auto w-full max-w-5xl flex flex-col items-center gap-10">

          {/* Hero section */}
          <HeroSection />

          {/* ── THREE FLOATING STAT/DATA CARDS (API Integration) ── */}
          <FloatingData />
        </div>
      </section>

      {/* Kolaborasi */}
      <Collaborators />

      {/* ── FEATURES GRID SECTION (Populated from API) ── */}
      <Feature />

      {/* ── EXTRAS / BENCHMARKS SECTION ── */}
      <ExtrasFeature />

      {/* Bento card */}
      <BentoDocs />

      {/* FAQ */}
      <FAQ />
    </main>
  )
}