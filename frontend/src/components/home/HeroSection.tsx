import Link from "next/link";
import ShinyText from "./ShinyText";

export default function HeroSection() {
    return (
        <>
            {/* Hero Typography Heading */}
            <div className="space-y-4 mt-18 text-center max-w-3xl">
                <div className="flex flex-row items-center justify-center gap-4">
                    <input type="text" className="p-3 w-96 h-10 focus:outline-slate-100/5 shadow-amber-200/40 rounded-full border border-zinc-400/30 bg-black/20 backdrop-blur-sm text-white placeholder:text-white/50" placeholder="Cari yang kamu inginkan di sini..." />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-6xl font-medium leading-[1.08] tracking-tight text-zinc-100 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                    Jangan lupa Titik Koma.
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