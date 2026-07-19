"use client"

import HeroLayout from "@/components/home/HeroLayout"
import Collaborators from "@/components/home/Collaborators"
import Feature from "@/components/home/Feature"
import ExtrasFeature from "@/components/home/ExtrasFeature"
import BentoDocs from "@/components/home/BentoDocs"
import FAQ from "@/components/home/FAQ"

export default function Home() {
  return (
    <div className="w-full text-zinc-100 overflow-x-hidden pb-20">

      <div className="-mt-[128px] pt-[32px]">
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