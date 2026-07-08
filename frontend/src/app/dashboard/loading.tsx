import React from "react"
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton"

export default function DashboardLoading() {
  return (
    <div className="w-full text-zinc-100 min-h-screen bg-[#050505] p-6 md:p-12 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-4.5 w-72" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass-card-glowing border border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        ))}
      </div>

      <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 space-y-6">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-3.5 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
