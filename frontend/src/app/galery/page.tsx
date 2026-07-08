"use client"

import { useEffect, useState } from "react"
import { getImages } from "@/lib/api/images"
import type { ImageItem } from "@/lib/api/images"
import Masonry from "@/components/ui/Masonry"
import type { MasonryItem } from "@/components/ui/Masonry"
import { Skeleton } from "@/components/ui/Skeleton"

function assignHeight(id: number, index: number): number {
  const heights = [350, 500, 280, 420, 600, 320, 480, 380, 550, 300]
  return heights[(id * 7 + index * 13) % heights.length]
}

export default function GaleryPage() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await getImages()
        if (res?.data) setImages(res.data)
      } catch (err) {
        console.error("Failed to load images:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const masonryItems: MasonryItem[] = images.map((img, i) => ({
    id: String(img.id),
    img: img.image_url,
    url: img.image_url,
    height: assignHeight(img.id, i),
    title: img.title,
    description: img.description,
  }))

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-center text-2xl sm:text-3xl py-6 font-black text-white">
        Dokumentasi Kegiatan HMTIKA
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card-glowing border border-white/5 rounded-2xl p-4 space-y-4">
              <Skeleton
                className="w-full rounded-xl"
                style={{ height: i % 3 === 0 ? "350px" : i % 3 === 1 ? "280px" : "420px" }}
              />
              <div className="space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : masonryItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <p className="text-zinc-400 text-sm">Belum ada gambar.</p>
        </div>
      ) : (
        <Masonry
          items={masonryItems}
          ease="power2.out"
          duration={2}
          stagger={0.13}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
        />
      )}
    </main>
  )
}