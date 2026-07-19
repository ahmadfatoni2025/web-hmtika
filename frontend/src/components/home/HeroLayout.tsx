"use client"

import { useEffect, useRef } from "react"
import Mockup from "./Mockup"
import TombolActionHome from "./TombolActionHome"
import LineWaves from "./LineWaves"

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
          color3="#a3a3a3"
          enableMouseInteraction={true}
          mouseInfluence={1.5}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 text-center min-h-screen">
        <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-nice-black/50 backdrop-blur-sm px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-300 mb-6">
            <span>Official Website</span>
            <span className="text-amber-gold">HMTIKA STB</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-zinc-100 max-w-4xl mx-auto mb-6">
            Jangan lupa titik koma.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-200 max-w-lg mx-auto mb-10 leading-relaxed">
            Tinggalkan sistem yang rumit dan semrawut,{" "}
            sambut HMTIKA sebagai ruang kolaborasi, inovasi, dan teknologi masa depan.
          </p>

          {/* CTA Buttons */}
          <TombolActionHome />
        </div>

        {/* Mock Dashboard Card */}
        <div className="w-full max-w-6xl mx-auto pb-8 sm:pb-12 lg:pb-16">
          <Mockup />
        </div>
      </div>
    </section>
  )
}