import Link from "next/link";

export default function HeroSection() {
    return (
        <>
            {/* Hero Typography Heading */}
            <div className="space-y-4 mt-18 text-center max-w-3xl">
                <h1 className="text-4xl sm:text-6xl md:text-[76px] font-normal leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    <span className="font-display block italic font-light tracking-wide text-zinc-100">Jangan lupa</span>
                    <span className="font-sans font-black uppercase bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">Titik Koma</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-zinc-200 max-w-xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Himpunan Mahasiswa Teknik Informatika (HMTIKA) STIMIK Tunas Bangsa menjadi wadah sinergi, inovasi, dan pengembangan potensi akademis maupun praktis.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row items-center justify-center gap-4">
                <Link
                    href="/aspirasi"
                    className="rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold text-[#050505] hover:bg-zinc-100 transition-all shadow-xl shadow-white/5 flex items-center gap-2"
                >
                    Kirim Aspirasi &rarr;
                </Link>
                <Link
                    href="/event"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/[0.08] transition-all hover:border-white/20"
                >
                    Daftar Event
                </Link>
            </div>
        </>
    )
}