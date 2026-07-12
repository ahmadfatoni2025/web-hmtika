import LogoLoop from './LogoLoop';

const partners = [
  { src: "/logo/stimik_tunasbangsa.webp", title: "STIMIK Tunas Bangsa", href: "https://www.instagram.com/stimik.tunasbangsa/" },
  { src: "/logo/stitusa.webp", title: "STIT Usa", href: "https://www.instagram.com/stitusa.banjarnegara/" },
  { src: "/logo/prodi_informatika.webp", title: "Prodi Informatika", href: "https://www.instagram.com/informatika.stimik/" },
  { src: "/logo/bem_stb.webp", title: "BEM STB", href: "https://www.instagram.com/bem_stb/" },
  { src: "/logo/bem_stittunasbangsa.webp", title: "BEM STIT Tunas Bangsa", href: "https://www.instagram.com/bem_stittunasbangsa/" },
  { src: "/logo/bem_stietambara.webp", title: "BEM STIE Tambara", href: "https://www.instagram.com/bemstietambara/" },
  { src: "/logo/bem_polibara.webp", title: "BEM Polibara", href: "https://www.instagram.com/bem_polibara/" },
  { src: "/logo/himasi_tb.webp", title: "Himasi TB", href: "https://www.instagram.com/himasi_tb/" },
  { src: "/logo/hmm_stietambara.webp", title: "HMM STIE Tambara", href: "https://www.instagram.com/hmm_stietambara/" },
  { src: "/logo/himagro_polibara.webp", title: "Himagro Polibara", href: "https://www.instagram.com/himagro_polibara/" },
  { src: "/logo/hmps_uinpkl.webp", title: "HMPS UIN Pkl", href: "https://www.instagram.com/hmpsinformatika.uinpkl/" },
  { src: "/logo/ksr_tunasbangsa.webp", title: "KSR Tunas Bangsa", href: "https://www.instagram.com/ksr.stimiktunasbangsa/" },
  { src: "/logo/inf_stb.webp", title: "INF STB", href: "https://www.instagram.com/inf.stb/" },
  { src: "/logo/stb_it.webp", title: "STB IT", href: "https://www.instagram.com/stb.it/" },
  { src: "/logo/si1_stb.webp", title: "SI-1 STB", href: "https://www.instagram.com/si1.stb/" },
  { src: "/logo/incare_si.webp", title: "Incare SI", href: "https://www.instagram.com/incare.si/" },
  { src: "/logo/senztech.webp", title: "Senztech", href: "https://www.instagram.com/senztech/" },
  { src: "/logo/pmii_dipayuda.webp", title: "PMII Dipayuda", href: "https://www.instagram.com/pmiidipayuda/" },
  { src: "/logo/narasi_bangsaa.webp", title: "Narasi Bangsa", href: "https://www.instagram.com/narasi_bangsaa/" },
  { src: "/logo/artasychicken.webp", title: "Artasy Chicken", href: "https://www.instagram.com/artasychicken/" },
  { src: "/logo/hma_stietambara.webp", title: "HMA STIE Tambara", href: "https://www.instagram.com/hma_stietambara/" },
  { src: "/logo/imm.webp", title: "IMM" },
];

export default function Collaborators() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full py-10 border-t border-b border-white/[0.04]">
        <div className="mx-auto w-auto max-w-7xl px-6 flex flex-col items-center gap-6 relative overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 text-center">
            Kolaborasi & Kemitraan Strategis
          </p>
          <div className="w-full">
            <LogoLoop
              logos={partners}
              speed={40}
              direction="left"
              logoHeight={55}
              gap={64}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#0b0b0b"
              ariaLabel="Partner logos"
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
