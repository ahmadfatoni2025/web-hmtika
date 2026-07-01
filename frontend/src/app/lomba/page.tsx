"use client"

import { Calendar, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LombaPage() {
  const competitions = [
    {
      title: "Hackathon Tunas Bangsa 2026",
      date: "18-20 Maret 2026",
      location: "Kampus STIMIK Tunas Bangsa",
      category: "Programming",
      desc: "Kompetisi coding 48 jam untuk membangun solusi inovatif bagi permasalahan sosial di Indonesia.",
      prize: "Rp 10.000.000",
      kuota: 50,
    },
    {
      title: "UI/UX Design Competition",
      date: "10 April 2026",
      location: "Online",
      category: "Desain",
      desc: "Lomba desain antarmuka pengguna untuk aplikasi mobile dengan tema pendidikan digital.",
      prize: "Rp 5.000.000",
      kuota: 100,
    },
    {
      title: "Competitive Programming",
      date: "5 Mei 2026",
      location: "Kampus STIMIK Tunas Bangsa",
      category: "Algoritma",
      desc: "Kompetisi pemrograman kompetitif yang menguji kemampuan algoritma dan struktur data.",
      prize: "Rp 7.000.000",
      kuota: 40,
    },
    {
      title: "Web Development Challenge",
      date: "22 April 2026",
      location: "Online",
      category: "Web",
      desc: "Bangun aplikasi web full-stack dalam waktu 1 minggu dengan tema yang ditentukan panitia.",
      prize: "Rp 6.000.000",
      kuota: 30,
    },
    {
      title: "IoT Innovation Challenge",
      date: "15 Juni 2026",
      location: "Laboratorium Komputer",
      category: "IoT",
      desc: "Ciptakan inovasi berbasis Internet of Things untuk solusi smart campus.",
      prize: "Rp 8.000.000",
      kuota: 25,
    },
    {
      title: "Esports Tournament",
      date: "28 Juni 2026",
      location: "Auditorium Kampus",
      category: "Esports",
      desc: "Turnamen game kompetitif antar mahasiswa STIMIK Tunas Bangsa.",
      prize: "Rp 3.000.000",
      kuota: 64,
    },
  ]

  const categoryColors: Record<string, string> = {
    Programming: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    Desain: "bg-violet-500/10 border-violet-500/30 text-violet-400",
    Algoritma: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    Web: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    IoT: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    Esports: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Kompetisi
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white mt-4">
            Pendaftaran <span className="font-display italic font-light text-zinc-300">Lomba & Kompetisi</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Daftarkan diri Anda untuk berbagai kompetisi teknologi, desain, dan inovasi yang diselenggarakan HMTIKA STIMIK Tunas Bangsa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((item, i) => (
            <div
              key={i}
              className="group glass-card-glowing border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-amber-gold/20 transition-all duration-300"
            >
              <div className="relative h-40 w-full bg-gradient-to-br from-amber-gold/10 via-zinc-900 to-zinc-950 flex items-center justify-center">
                <span className="text-5xl font-black text-amber-gold/20 select-none">
                  {item.category[0]}
                </span>
                <span className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border backdrop-blur-md uppercase tracking-widest ${categoryColors[item.category] || "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"}`}>
                  {item.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <h2 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-amber-gold transition-colors">
                  {item.title}
                </h2>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <span className="text-zinc-600">|</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 flex-1">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                  <span>Kuota: {item.kuota} peserta</span>
                  <span className="font-bold text-amber-gold">{item.prize}</span>
                </div>

                <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-gold hover:text-amber-gold-light transition-colors mt-auto pt-2 border-t border-white/[0.04]">
                  <ArrowRight className="h-3.5 w-3.5" />
                  Daftar Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
