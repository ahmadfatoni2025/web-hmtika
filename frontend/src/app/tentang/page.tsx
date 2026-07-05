import ProductDescription from "@/components/tentang/ProductDescription"

export default function Tentang() {
  return (
    <main className="relative min-h-screen bg-bg-dark text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        <ProductDescription />
      </div>
    </main>
  )
}
