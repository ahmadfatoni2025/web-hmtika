"use client"

import { useState, useEffect } from "react"
import ProductDescription from "@/components/tentang/ProductDescription"
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton"

export default function Tentang() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen bg-bg-dark text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20">
        {loading ? (
          <div className="space-y-8 glass-card-glowing border border-white/5 rounded-3xl p-6 md:p-10 max-w-3xl mx-auto">
            <div className="space-y-4">
              <Skeleton className="h-4.5 w-28 rounded-full" />
              <Skeleton className="h-10 w-2/3" />
            </div>
            <div className="space-y-4">
              <SkeletonText lines={4} />
              <SkeletonText lines={3} />
            </div>
          </div>
        ) : (
          <ProductDescription />
        )}
      </div>
    </main>
  )
}
