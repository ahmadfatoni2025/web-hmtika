"use client"

export default function SponsorPage() {
  const sponsors = [
    { name: "PT Teknologi Nusantara", tier: "Platinum", desc: "Perusahaan teknologi terkemuka di Indonesia yang bergerak di bidang pengembangan perangkat lunak dan infrastruktur digital." },
    { name: "Inovasi Digital Corp", tier: "Gold", desc: "Startup teknologi yang fokus pada inovasi produk digital dan solusi cloud computing." },
    { name: "Coding Academy ID", tier: "Gold", desc: "Platform pendidikan teknologi yang menyediakan kursus pemrograman dan bootcamp IT." },
    { name: "DevOps Solutions", tier: "Silver", desc: "Perusahaan konsultan DevOps dan penyedia layanan infrastruktur cloud." },
    { name: "TechHub Indonesia", tier: "Silver", desc: "Komunitas dan coworking space untuk para pengembang teknologi di Indonesia." },
    { name: "DesignWorks Studio", tier: "Bronze", desc: "Studio desain grafis dan UI/UX yang mendukung kegiatan branding HMTIKA." },
    { name: "NetConnect ISP", tier: "Bronze", desc: "Penyedia layanan internet untuk kebutuhan kampus dan event teknologi." },
    { name: "MediaPintar Corp", tier: "Bronze", desc: "Perusahaan media digital yang mendukung publikasi kegiatan HMTIKA." },
  ]

  const tierColors: Record<string, string> = {
    Platinum: "text-zinc-100 border-zinc-300/30 bg-zinc-300/10",
    Gold: "text-amber-gold border-amber-gold/30 bg-amber-gold/10",
    Silver: "text-sky-300 border-sky-300/30 bg-sky-300/10",
    Bronze: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Kemitraan
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white mt-4">
            Sponsor & <span className="font-display italic font-light text-zinc-300">Partner Strategis</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            HMTIKa bekerja sama dengan berbagai mitra industri dan institusi untuk mendukung setiap program kerja, workshop, seminar, dan kompetisi teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((sponsor, i) => (
            <div
              key={i}
              className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-gold/20 transition-all duration-300"
            >
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-gold/20 to-zinc-900 flex items-center justify-center mx-auto border border-white/5">
                <span className="text-2xl font-black text-amber-gold/60">{sponsor.name[0]}</span>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-sm font-bold text-white">{sponsor.name}</h3>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border uppercase tracking-widest ${tierColors[sponsor.tier]}`}>
                  {sponsor.tier}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">{sponsor.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center glass-card-glowing border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 className="text-base font-bold text-white mb-2">Tertarik Menjadi Sponsor?</h2>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            Dukung kegiatan mahasiswa Teknik Informatika STIMIK Tunas Bangsa dan dapatkan eksposur merek Anda di setiap event HMTIKA.
          </p>
          <a
            href="mailto:sponsor@hmtika.com"
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-amber-gold to-amber-gold-dark text-black hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </main>
  )
}
