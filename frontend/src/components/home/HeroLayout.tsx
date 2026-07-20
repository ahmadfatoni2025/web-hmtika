"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Zap, ArrowUpRight, Image as ImageIcon, MessageSquare } from "lucide-react"
import Mockup from "./Mockup"
import LineWaves from "./LineWaves"
import BorderGlow from "@/components/ui/BorderGlow"

export default function HeroLayout() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    requestAnimationFrame(() => {
      el.style.transition =
        "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#050505", minHeight: "100vh" }}
    >
      {/* Full-Screen Wave Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LineWaves
          speed={0.2}
          innerLineCount={24}
          outerLineCount={28}
          warpIntensity={0.8}
          rotation={-30}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.5}
          brightness={0.15}
          color1="#d4a853"
          color2="#ffffff"
          color3="#129194"
          enableMouseInteraction={true}
          mouseInfluence={1.5}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-4 mt-20 sm:px-6 lg:px-8 text-center min-h-screen">
        <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-nice-black/50 backdrop-blur-sm px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-300 mb-6">
            <span>Official Website</span>
            <span className="text-amber-gold">HMTIKA STB</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-zinc-100 max-w-4xl mx-auto mb-6 backdrop:to-black">
            Jangan lupa titik koma.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-200 max-w-lg mx-auto mb-10 leading-relaxed">
            Tinggalkan sistem yang rumit dan semrawut,{" "}
            sambut HMTIKA sebagai ruang kolaborasi, inovasi, dan teknologi masa depan.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4">
            {/* Tombol Devcamp */}
            <a
              href="https://devcamp-hmtika-web-id.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <BorderGlow
                glowColor="40 80 80"
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                glowIntensity={1.0}
                fillOpacity={0.5}
                borderRadius={40}
                rotateSpeed={0.21}
              >
                <span className="font-bold px-8 py-4 text-white inline-flex items-center gap-2.5">
                  <Zap className="size-4.5 transition-all duration-500 ease-out group-hover:rotate-[12deg] group-hover:scale-110" />
                  Devcamp
                </span>
              </BorderGlow>
            </a>

            {/* Tombol Gallery */}
            <a
              href="https://devcamp-hmtika-web-id.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <BorderGlow
                glowColor="45 90 60"
                backgroundColor="#1a1500"
                colors={['#FFD700', '#FFA500', '#FF8C00']}
                glowIntensity={1.2}
                fillOpacity={0.6}
                borderRadius={40}
                rotateSpeed={0.2}
              >
                <span className="font-bold px-8 py-4 inline-flex items-center gap-2.5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
                  <ImageIcon className="text-amber-gold size-4.5 transition-all duration-500 ease-out group-hover:rotate-[12deg] group-hover:scale-110" />
                  Gallery
                </span>
              </BorderGlow>
            </a>
          </div>
        </div>

        {/* Mock Dashboard Card */}
        <div className="w-full max-w-6xl mx-auto pb-8 sm:pb-12 lg:pb-16">
          <Mockup />
        </div>
      </div>
    </section >
  )
}
