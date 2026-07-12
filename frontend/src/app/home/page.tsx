"use client"

import { useState, useEffect } from "react"
import HeroLayout from "@/components/home/HeroLayout"
import Collaborators from "@/components/home/Collaborators"
import Feature from "@/components/home/Feature"
import ExtrasFeature from "@/components/home/ExtrasFeature"
import BentoDocs from "@/components/home/BentoDocs"
import FAQ from "@/components/home/FAQ"
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="w-full text-zinc-100 min-h-screen bg-[#050505] overflow-x-hidden pb-20">
        {/* ── Hero Section Skeleton ── */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-zinc-950" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          </div>
          <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 text-center min-h-screen">
            <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-8">
              <Skeleton className="h-5 w-56 rounded-full mb-6" />
              <Skeleton className="h-16 sm:h-20 md:h-24 w-3/4 max-w-3xl mb-4" />
              <Skeleton className="h-16 sm:h-20 md:h-24 w-2/3 max-w-2xl mb-6" />
              <Skeleton className="h-4 w-full max-w-md mb-2" />
              <Skeleton className="h-4 w-3/4 max-w-sm mb-10" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-44 rounded-full" />
                <Skeleton className="h-12 w-36 rounded-full" />
              </div>
            </div>
            <div className="w-full max-w-6xl mx-auto pb-8 sm:pb-12 lg:pb-16 px-6">
              <Skeleton className="h-64 sm:h-80 w-full rounded-2xl" />
            </div>
          </div>
        </section>

        {/* ── Collaborators Skeleton ── */}
        <section className="w-full relative overflow-hidden">
          <div className="relative w-full py-10 border-t border-b border-white/[0.04]">
            <div className="mx-auto w-auto max-w-7xl px-6 flex flex-col items-center gap-6">
              <Skeleton className="h-3 w-52 rounded-full" />
              <div className="w-full flex items-center justify-center gap-16">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature Section Skeleton ── */}
        <section className="w-full py-24 px-6 relative">
          <div className="mx-auto max-w-6xl flex flex-col items-center gap-16">
            <div className="text-center space-y-4 max-w-2xl">
              <Skeleton className="h-5 w-24 rounded-full mx-auto" />
              <Skeleton className="h-10 sm:h-14 w-full max-w-xl mx-auto" />
              <Skeleton className="h-4 w-full max-w-md mx-auto" />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-6 h-full">
                  <Skeleton className="h-44 w-full rounded-xl" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <SkeletonText lines={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ExtrasFeature Skeleton ── */}
        <section className="w-full px-6 py-24 relative border-t border-white/[0.03]">
          <div className="mx-auto max-w-6xl flex flex-col items-center gap-12">
            <div className="text-center space-y-4 max-w-2xl">
              <Skeleton className="h-5 w-28 rounded-full mx-auto" />
              <Skeleton className="h-10 sm:h-14 w-full max-w-xl mx-auto" />
              <Skeleton className="h-4 w-full max-w-md mx-auto" />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-center mb-8">
                <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  <Skeleton className="h-8 w-28 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
              <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.01]">
                <div className="h-10 border-b border-white/[0.06] flex items-center px-5 gap-10">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-14" />
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-13 border-b border-white/[0.03] flex items-center px-5 gap-10">
                    <Skeleton className="h-3.5 w-1/2" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BentoDocs Skeleton ── */}
        <section className="w-full py-24 px-6 relative border-t border-white/[0.03]">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center mb-16">
              <Skeleton className="h-5 w-24 rounded-full mb-5" />
              <Skeleton className="h-10 sm:h-14 w-full max-w-lg" />
              <Skeleton className="h-4 w-full max-w-md mt-4" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1fr] lg:grid-rows-[repeat(2,1fr)] gap-4">
              <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <div className="rounded-2xl border border-white/[0.06] bg-[#0f0f0f] h-full min-h-[300px] p-6 flex flex-col items-center justify-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-44" />
                  <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-5 flex flex-col items-center justify-center gap-3 min-h-[200px]">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Skeleton ── */}
        <section className="w-full px-6 py-24 relative border-t border-white/[0.03]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <Skeleton className="h-5 w-20 rounded-full mb-5" />
              <Skeleton className="h-10 sm:h-14 w-full max-w-md" />
              <Skeleton className="h-4 w-full max-w-sm mt-4" />
            </div>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
              <div className="lg:w-64 shrink-0 flex lg:flex-col gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-lg" />
                ))}
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                ))}
              </div>
            </div>
            <hr className="mt-16 border-white/[0.06]" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-10 w-40 rounded-full" />
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full text-zinc-100 overflow-x-hidden pb-20">

      <HeroLayout />

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
    </div>
  )
}