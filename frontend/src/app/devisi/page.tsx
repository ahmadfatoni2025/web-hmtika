"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { getMembers } from "@/lib/api/devisi"
import type { MemberItem } from "@/lib/api/devisi"
import {
  Users,
  ArrowRight,
  Zap,
  BookOpen,
  Handshake,
  Globe,
  Smartphone,
  GraduationCap,
  Sparkles,
} from "lucide-react"

const divisionIcons: Record<string, React.ElementType> = {
  RISTEK: Zap,
  PENDIDIKAN: BookOpen,
  "HUMAS INTERNAL": Handshake,
  "HUMAS EKSTERNAL": Globe,
  MEDINFO: Smartphone,
  PSDM: GraduationCap,
}

export default function DevisiPage() {
  const [members, setMembers] = useState<MemberItem[]>([])
  const [activeFilter, setActiveFilter] = useState("All")

  useEffect(() => {
    getMembers()
      .then((res) => setMembers(res.data))
      .catch(() => { })
  }, [])

  const divisions = useMemo(() => {
    const names = [...new Set(members.map((m) => m.division_name))]
    return ["All", ...names]
  }, [members])

  const filtered = useMemo(() => {
    if (activeFilter === "All") return members
    return members.filter((m) => m.division_name === activeFilter)
  }, [members, activeFilter])

  return (
    <div className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-gold/20 bg-amber-gold/10 px-4 py-1 text-xs font-semibold text-amber-gold mb-5">
          <Users className="h-3.5 w-3.5" />
          Tim Kami
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
          Kenali Anggota<br />Divisi HMTIKA
        </h1>
        <p className="mx-auto max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
          Kenali individu-individu berbakat yang menjadi bagian dari setiap divisi kami —
          masing-masing membawa keunikan dan semangat untuk mendorong inovasi dan kolaborasi.
        </p>
      </div>

      {/* ─── Filter Row ─────────────────────────────────────────── */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {divisions.map((div) => {
            const Icon = div !== "All" ? divisionIcons[div] : Sparkles
            return (
              <button
                key={div}
                onClick={() => setActiveFilter(div)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${activeFilter === div
                  ? "bg-amber-gold text-black shadow-md shadow-amber-gold/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {div}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Member Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {filtered.map((member) => (
          <div key={member.id} className="group relative overflow-hidden rounded-2xl bg-zinc-900">
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
              <h3 className="text-base font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-zinc-400">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── CTA Footer Bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5">
        <div className="flex items-center gap-3">
          <Users className="h-[18px] w-[18px] text-amber-gold shrink-0" />
          <span className="text-sm font-bold text-white">Ingin bergabung?</span>
          <span className="text-sm text-zinc-400 hidden sm:inline">Kami selalu mencari orang-orang berdedikasi tinggi.</span>
        </div>
        <Link
          href="/kontak"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-gold hover:text-amber-gold-light transition-colors group shrink-0"
        >
          Hubungi Kami
          <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
