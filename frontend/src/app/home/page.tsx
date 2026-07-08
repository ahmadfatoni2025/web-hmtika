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
        {/* Hero Section Skeleton */}
        <div className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-end p-6 md:p-12 border-b border-white/[0.04]">
          <div className="max-w-2xl space-y-6">
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <SkeletonText lines={3} className="max-w-lg" />
            <Skeleton className="h-12 w-full max-w-md rounded-full" />
          </div>
        </div>

        {/* Collaborators Skeleton */}
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap gap-8 items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-8">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
          <div className="space-y-3 text-center">
            <Skeleton className="h-4 w-28 mx-auto rounded-full" />
            <Skeleton className="h-10 w-2/3 max-w-md mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card-glowing border border-white/5 rounded-2xl p-6 space-y-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-1/2" />
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-zinc-100 overflow-x-hidden pb-20">

      <div>
        <HeroLayout />
      </div>

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