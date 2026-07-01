"use client"

import { ExternalLink } from "lucide-react"

export default function BeasiswaPage() {
  const scholarships = [
    {
      title: "Beasiswa Prestasi Akademik",
      provider: "Kemendikbudristek",
      deadline: "15 Agustus 2026",
      desc: "Beasiswa penuh untuk mahasiswa dengan IPK minimal 3.50 yang aktif dalam organisasi dan kegiatan kemahasiswaan.",
      amount: "Full Tuition",
      type: "Akademik",
    },
    {
      title: "Beasiswa Unggulan Mahasiswa TI",
      provider: "PT Teknologi Nusantara",
      deadline: "30 September 2026",
      desc: "Program beasiswa bagi mahasiswa Teknik Informatika berprestasi dengan komitmen magang di perusahaan mitra.",
      amount: "Rp 24.000.000/thn",
      type: "Industri",
    },
    {
      title: "LPDP Dalam Negeri",
      provider: "Kementerian Keuangan",
      deadline: "30 Oktober 2026",
      desc: "Beasiswa pendidikan dalam negeri untuk jenjang S1, S2, dan S3 bagi WNI berprestasi.",
      amount: "Full Tuition + Living",
      type: "Pemerintah",
    },
    {
      title: "Beasiswa Coding Bootcamp",
      provider: "Coding Academy ID",
      deadline: "1 November 2026",
      desc: "Pelatihan intensif pemrograman selama 6 bulan gratis bagi 20 mahasiswa terpilih.",
      amount: "Gratis",
      type: "Pelatihan",
    },
    {
      title: "Beasiswa Hafidz Quran",
      provider: "Yayasan Pendidikan Islam",
      deadline: "20 Juli 2026",
      desc: "Beasiswa bagi mahasiswa penghafal Al-Quran minimal 5 juz dengan IPK minimal 3.00.",
      amount: "Rp 6.000.000/thn",
      type: "Agama",
    },
    {
      title: "Beasiswa Mahasiswa Kurang Mampu",
      provider: "STIMIK Tunas Bangsa",
      deadline: "10 Agustus 2026",
      desc: "Bantuan biaya pendidikan bagi mahasiswa dengan latar belakang ekonomi kurang mampu dan IPK minimal 3.00.",
      amount: "Rp 4.000.000/smt",
      type: "Kampus",
    },
  ]

  const careers = [
    {
      title: "Software Engineer Intern",
      company: "PT Teknologi Nusantara",
      location: "Yogyakarta",
      desc: "Magang 6 bulan di tim pengembangan produk utama. Tech stack: React, Node.js, PostgreSQL.",
      salary: "Rp 3.000.000/bln",
    },
    {
      title: "Full Stack Developer",
      company: "Inovasi Digital Corp",
      location: "Jakarta",
      desc: "Mengembangkan aplikasi web dan mobile untuk klien enterprise. Hybrid working.",
      salary: "Rp 8.000.000 - 12.000.000",
    },
    {
      title: "UI/UX Designer",
      company: "DesignWorks Studio",
      location: "Bandung",
      desc: "Merancang antarmuka pengguna untuk produk digital startup. Remote friendly.",
      salary: "Rp 6.000.000 - 9.000.000",
    },
    {
      title: "Data Analyst Fresh Graduate",
      company: "MediaPintar Corp",
      location: "Jakarta",
      desc: "Program pengembangan fresh graduate di bidang data analytics dan business intelligence.",
      salary: "Rp 5.000.000/bln",
    },
  ]

  const typeColors: Record<string, string> = {
    Akademik: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    Industri: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    Pemerintah: "bg-amber-gold/10 border-amber-gold/30 text-amber-gold",
    Pelatihan: "bg-violet-500/10 border-violet-500/30 text-violet-400",
    Agama: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    Kampus: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Beasiswa & Karier
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white mt-4">
            Beasiswa & <span className="font-display italic font-light text-zinc-300">Peluang Karier</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Temukan informasi beasiswa terbaru, lowongan magang, dan peluang karier di bidang IT untuk mahasiswa Teknik Informatika.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎓</span> Beasiswa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((item, i) => (
              <div
                key={i}
                className="glass-card-glowing border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-amber-gold/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-[11px] text-amber-gold font-semibold mt-0.5">{item.provider}</p>
                  </div>
                  <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold border uppercase tracking-widest ${typeColors[item.type]}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed flex-1">{item.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px]">
                  <span className="text-zinc-500">Deadline: <span className="text-zinc-300 font-semibold">{item.deadline}</span></span>
                  <span className="font-bold text-amber-gold">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>💼</span> Lowongan Karier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.map((item, i) => (
              <div
                key={i}
                className="glass-card-glowing border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-amber-gold/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-[11px] text-amber-gold font-semibold mt-0.5">{item.company}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 shrink-0" />
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed flex-1">{item.desc}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px]">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <span>📍</span> {item.location}
                  </span>
                  <span className="font-bold text-emerald-400">{item.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
