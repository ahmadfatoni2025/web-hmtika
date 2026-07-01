import MagicBento from "./MagicBento"

export default function BentoDocs() {
    return (
        <section className="w-full py-24 px-6 relative overflow-hidden border-t border-white/[0.03]">
            <div className="mx-auto max-w-6xl flex flex-col items-center gap-12">
                <div className="text-center space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                        ◎ Dokumentasi
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white">
                        Galeri Kegiatan <span className="font-display italic font-light text-sky-400">HMTIKA</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                        Dokumentasi foto dan video dari setiap acara, seminar, dan workshop yang pernah diselenggarakan HMTIKA.
                    </p>
                </div>

                <div className="w-full flex justify-center">
                    <MagicBento
                        textAutoHide={true}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={300}
                        particleCount={12}
                        glowColor="56, 189, 248"
                    />
                </div>
            </div>
        </section>
    )
}
