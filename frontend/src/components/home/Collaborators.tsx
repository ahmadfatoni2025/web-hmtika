export default function Collaborators() {
  const partners = [
    { name: "Google Developer Groups", icon: "GDG" },
    { name: "GitHub Campus", icon: "GitHub" },
    { name: "Dicoding Academy", icon: "Dicoding" },
    { name: "Microsoft Learn", icon: "Microsoft" },
    { name: "STIMIK Tunas Bangsa", icon: "STIMIK" }
  ]

  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Kolaborasi & Kemitraan Strategis
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-60 grayscale hover:opacity-85 transition-opacity duration-300">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex h-8 items-center text-lg font-bold tracking-tight text-slate-700"
            >
              {partner.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
