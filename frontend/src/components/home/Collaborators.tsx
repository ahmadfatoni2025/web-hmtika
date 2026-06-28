export default function Collaborators() {
  const partners = [
    { name: "Google Developer Groups", icon: "GDG" },
    { name: "GitHub Campus", icon: "GitHub" },
    { name: "Dicoding Academy", icon: "Dicoding" },
    { name: "Microsoft Learn", icon: "Microsoft" },
    { name: "STIMIK Tunas Bangsa", icon: "STIMIK" }
  ]

  return (
    <section className="w-full px-6 relative overflow-hidden">
      {/* ── TRUSTED BY / PARTNERS SECTION ── */}
      <div className="w-full py-10 overflow-hidden border-t border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 text-center">
            Kolaborasi & Kemitraan Strategis
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-35 hover:opacity-70 transition-opacity duration-300">
            <span className="text-base font-semibold tracking-tight text-white">Google Developer Groups</span>
            <span className="text-base font-serif font-bold italic tracking-wide text-white">GitHub Campus</span>
            <span className="text-base font-sans font-black text-white">Dicoding Academy</span>
            <span className="text-base font-sans font-light tracking-widest uppercase text-white">Microsoft Learn</span>
            <span className="text-base font-serif font-semibold text-white">STIMIK Tunas Bangsa</span>
          </div>
        </div>
      </div>
    </section>
  )
}
