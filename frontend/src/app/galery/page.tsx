"use client"

import { useEffect, useState } from "react"
import { getImages } from "@/lib/api/images"
import type { ImageItem } from "@/lib/api/images"
import Masonry from "@/components/ui/Masonry"
import type { MasonryItem } from "@/components/ui/Masonry"

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
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="size-10 rounded-full border-2 border-zinc-600 border-t-white animate-spin" />
          <p className="text-zinc-400 text-sm">Memuat gambar...</p>
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