"use client"

import { useState } from "react"

const thumbnails = [
  { label: "Proker", color: "from-sky-400 to-blue-500" },
  { label: "Prestasi", color: "from-lime-400 to-green-500" },
  { label: "Aspirasi", color: "from-purple-400 to-pink-500" },
  { label: "Komunitas", color: "from-amber-400 to-orange-500" },
]

export default function HeroThumbnails() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? thumbnails.length - 1 : a - 1))
  const next = () => setActive((a) => (a === thumbnails.length - 1 ? 0 : a + 1))

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={prev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Previous"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex gap-2">
        {thumbnails.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-12 w-12 rounded-full bg-gradient-to-br ${t.color} transition-all duration-300 ${
              i === active
                ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-transparent"
                : "scale-100 opacity-60 hover:opacity-90"
            }`}
            title={t.label}
          />
        ))}
      </div>

      <button
        onClick={next}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Next"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
