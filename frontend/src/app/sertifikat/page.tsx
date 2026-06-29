"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getMyCertificates } from "@/lib/api/certificates"
import type { CertificateItem } from "@/lib/api/certificates"

type PageStatus = "loading" | "error" | "empty" | "success"

export default function SertifikatPage() {
  const router = useRouter()
  const [certificates, setCertificates] = useState<CertificateItem[]>([])
  const [status, setStatus] = useState<PageStatus>("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await getMyCertificates()
        if (cancelled) return
        if (res.success) {
          if (res.data.length === 0) {
            setStatus("empty")
          } else {
            setCertificates(res.data)
            setStatus("success")
          }
        }
      } catch {
        if (!cancelled) {
          setError("Gagal memuat data sertifikat")
          setStatus("error")
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 pb-24 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-12">
        <div className="space-y-4 mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ Sertifikat Digital
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white">
            E-Sertifikat{" "}
            <span className="font-display italic font-light text-zinc-300">
              Kegiatan HMTIKA
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Unduh dan kelola sertifikat digital Anda dari berbagai kegiatan
            dan event yang telah diikuti.
          </p>
        </div>

        {status === "loading" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-52 rounded-2xl bg-white/[0.01] border border-white/[0.05] animate-pulse"
              />
            ))}
          </div>
        ) : status === "error" ? (
          <div className="glass-card-glowing border border-red-500/20 rounded-2xl p-8 text-center max-w-lg mx-auto">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : status === "empty" ? (
          <div className="glass-card-glowing border border-white/5 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <div className="text-4xl mb-4">📜</div>
            <h2 className="text-lg font-bold text-white mb-2">
              Belum Ada Sertifikat
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Anda belum memiliki sertifikat digital. Ikuti kegiatan dan event
              HMTIKA untuk mendapatkan sertifikat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => router.push(`/event?slug=${cert.event_slug}`)}
                className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-500/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-lg">
                    🏅
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    #{cert.nomor_sertif?.split("/").pop() || cert.id}
                  </span>
                </div>

                <div className="space-y-1 flex-1">
                  <h3 className="text-sm font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">
                    {cert.event_judul}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    📅{" "}
                    {new Date(cert.event_tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {cert.event_lokasi && (
                    <p className="text-[11px] text-zinc-500">
                      📍 {cert.event_lokasi}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span>Nomor: {cert.nomor_sertif}</span>
                    <span>
                      {new Date(cert.tgl_terbit).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <a
                    href={
                      cert.file_url.startsWith("http")
                        ? cert.file_url
                        : `http://localhost:3001${cert.file_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs hover:shadow-[0_0_20px_rgba(212,168,83,0.25)] transition-all"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Unduh Sertifikat
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
