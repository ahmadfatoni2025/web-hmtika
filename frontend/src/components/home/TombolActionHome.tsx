import { MessageSquare, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PremiumCTA() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">

            {/* ─── TOMBOL UTAMA: KIRIM ASPIRASI (Aurora Radial Gradient Expansion) ─── */}
            <Link
                href="/aspirasi"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold text-zinc-950 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_20px_-4px_rgba(245,158,11,0.3)] transition-all duration-500 hover:shadow-[0_0_30px_2px_rgba(245,158,11,0.5),0_12px_30px_-6px_rgba(0,0,0,0.5)] hover:-translate-y-1 active:translate-y-0 select-none"
            >
                {/* State Bawaan: Solid Amber-Gold Premium */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 transition-opacity duration-500 group-hover:opacity-0" />

                {/* State Hover: Spektrum Aurora Fluida Aktif (Menyebar dari dalam keluar) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-amber-400 to-amber-300 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)" />

                {/* Specular Edge Glow Effect */}
                <div className="absolute inset-px rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Konten Internal */}
                <span className="relative z-10 flex items-center gap-2.5 tracking-wide">
                    <MessageSquare className="size-4.5 transition-transform duration-500 ease-out group-hover:rotate-[12deg] group-hover:scale-110" />
                    Kirim Aspirasi
                </span>
            </Link>

            {/* ─── TOMBOL SEKUNDER: DEVCAMP (Hyper-Glassmorphism & Border Reactive) ─── */}
            <Link
                href="https://devcamp-hmtika-web-id.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold text-zinc-200 overflow-hidden bg-zinc-900/30 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 hover:text-white hover:shadow-[0_0_40px_0_rgba(255,255,255,0.05),0_12px_30px_-6px_rgba(0,0,0,0.7)] hover:border-zinc-700 hover:-translate-y-1 active:translate-y-0 select-none"
            >
                {/* Layer Pendaran Belakang (Ambient Reactive Radial Glow) */}
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Warna Latar Menyapu Lembut */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/40 via-zinc-900/40 to-zinc-950/40 opacity-100 group-hover:from-zinc-800/80 group-hover:to-zinc-900/80 transition-all duration-500" />

                {/* Micro-Shine Line (Garis kilau atas yang dinamis) */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                {/* Konten Internal */}
                <span className="relative z-10 flex items-center gap-2.5 tracking-wide">
                    <Zap className="size-4.5 text-zinc-400 transition-all duration-500 ease-out group-hover:text-amber-400 group-hover:scale-110" />
                    <span>Devcamp</span>
                    <ArrowUpRight className="size-4 text-zinc-500 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </span>
            </Link>

        </div>
    );
}