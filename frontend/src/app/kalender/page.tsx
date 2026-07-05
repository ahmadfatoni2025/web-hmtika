"use client"

import { Calendar, MapPin } from "lucide-react"

export default function KalenderPage() {
  const months = [
    {
      month: "Januari",
      events: [
        { date: "15 Jan 2026", title: "Semester Genap Dimulai", type: "Akademik" },
        { date: "20-25 Jan 2026", title: "Masa Perwalian", type: "Akademik" },
      ],
    },
    {
      month: "Februari",
      events: [
        { date: "10 Feb 2026", title: "Workshop UI/UX Design", type: "Kegiatan" },
        { date: "22 Feb 2026", title: "Seminar Karier Teknologi", type: "Kegiatan" },
      ],
    },
    {
      month: "Maret",
      events: [
        { date: "5 Mar 2026", title: "UTS Semester Genap", type: "Akademik" },
        { date: "18 Mar 2026", title: "Hackathon Internal HMTIKA", type: "Kegiatan" },
      ],
    },
    {
      month: "April",
      events: [
        { date: "10 Apr 2026", title: "Studi Banding Universitas", type: "Kegiatan" },
        { date: "25 Apr 2026", title: "Pelatihan Python Lanjutan", type: "Kegiatan" },
      ],
    },
    {
      month: "Mei",
      events: [
        { date: "5-10 Mei 2026", title: "Pekan Teknologi Nasional", type: "Kegiatan" },
        { date: "20 Mei 2026", title: "Batas Akhir Pendaftaran Lomba", type: "Akademik" },
      ],
    },
    {
      month: "Juni",
      events: [
        { date: "10 Jun 2026", title: "UAS Semester Genap", type: "Akademik" },
        { date: "25 Jun 2026", title: "Wisuda Periode II", type: "Akademik" },
      ],
    },
  ]

  const typeColors: Record<string, string> = {
    Akademik: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    Kegiatan: "bg-amber-gold/10 border-amber-gold/30 text-amber-gold",
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Kalender
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white mt-4">
            Kalender <span className="font-display italic font-light text-zinc-300">Akademik & Kegiatan</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Pantau jadwal perkuliahan, ujian, tenggat akademik, dan agenda kegiatan HMTIKA dalam satu tampilan terintegrasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map((m, i) => (
            <div
              key={i}
              className="glass-card-glowing border border-white/5 rounded-2xl p-6"
            >
              <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-white/[0.06] flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-gold" />
                {m.month}
              </h3>
              <div className="space-y-4">
                {m.events.map((event, j) => (
                  <div key={j} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono">{event.date}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold border uppercase tracking-widest ${typeColors[event.type]}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-xs text-white font-semibold leading-snug">{event.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
