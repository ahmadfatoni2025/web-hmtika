import React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-white/[0.03] border border-white/[0.04] animate-shimmer",
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCircle({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-white/[0.03] border border-white/[0.04] animate-shimmer shrink-0",
        className
      )}
      {...props}
    />
  )
}

export function SkeletonText({
  lines = 3,
  className,
  ...props
}: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn("space-y-2.5 w-full", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3.5",
            i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "glass-card-glowing border border-white/5 rounded-2xl p-5 flex flex-col gap-4 w-full",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4.5 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full shrink-0" />
      </div>
      <SkeletonText lines={3} />
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )
}

export function SkeletonGrid({
  count = 6,
  className,
  cardClassName,
  ...props
}: {
  count?: number
  className?: string
  cardClassName?: string
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} className={cardClassName} />
      ))}
    </div>
  )
}
