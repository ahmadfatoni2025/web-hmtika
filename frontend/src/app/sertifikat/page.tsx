"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getMyCertificates } from "@/lib/api/certificates"
import type { CertificateItem } from "@/lib/api/certificates"
import Folder from "@/components/ui/Folder"

type PageStatus = "loading" | "error" | "empty" | "success"

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-2xl bg-[#14171C] overflow-hidden">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-3 rounded-full bg-white/[0.03] animate-pulse w-3/4" />
                <div className="h-2.5 rounded-full bg-white/[0.02] animate-pulse w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-white/[0.02] animate-pulse" />
              <div className="h-2 rounded-full bg-white/[0.02] animate-pulse w-2/3" />
            </div>
            <div className="pt-4 border-t border-white/[0.04] flex justify-between items-center">
              <div className="h-2 rounded-full bg-white/[0.02] animate-pulse w-20" />
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

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

  const total = certificates.length

  return (
    <main className="relative min-h-screen bg-[#0B0D10] text-zinc-100 pb-24 overflow-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[40%] h-[40%] rounded-full bg-amber-500/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16">
        <div className="space-y-5 mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/10 bg-amber-500/[0.04] px-4 py-1.5 text-[11px] uppercase font-semibold tracking-[0.15em] text-amber-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
            Sertifikat Digital
          </div>
          <div>
            <h1 className="text-5xl sm:text-7xl font-light leading-[1.05] tracking-tight text-white">
              E-Sertifikat{" "}
              <span className="font-display italic font-light text-zinc-400">
                HMTIKA
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-xl leading-relaxed">
              Unduh dan kelola sertifikat digital Anda dari berbagai kegiatan
              dan event yang telah diikuti.
            </p>
          </div>
        </div>

        {status === "loading" ? (
          <LoadingSkeleton />
        ) : status === "error" ? (
          <div className="max-w-md mx-auto mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/10 mb-5">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-zinc-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : status === "empty" ? (
          <div className="flex flex-col items-center justify-center py-24 gap-10">
            <Folder
              size={2.8}
              color="#f59e0b"
              items={[
                <div key={1} className="w-full h-full flex items-center justify-center text-[8px] text-amber-700/60 font-mono font-bold">01</div>,
                <div key={2} className="w-full h-full flex items-center justify-center text-[8px] text-amber-700/40 font-mono font-bold">02</div>,
                <div key={3} className="w-full h-full flex items-center justify-center text-[8px] text-amber-700/20 font-mono font-bold">03</div>,
              ]}
            />
            <div className="text-center max-w-sm space-y-3">
              <h2 className="text-xl font-semibold text-white/90">
                Belum Ada Sertifikat
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Anda belum memiliki sertifikat digital. Ikuti kegiatan dan event
                HMTIKA untuk mendapatkan sertifikat.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                <span className="text-xs text-zinc-400 font-mono">
                  {total} Sertifikat
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-600">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                Terbaru
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => window.open(
                    cert.file_url.startsWith("http")
                      ? cert.file_url
                      : `https://backend.web.h.lazismubanjarnegara.id${cert.file_url}`,
                    "_blank"
                  )}
                  className="group relative rounded-2xl bg-[#14171C] border border-white/[0.04] hover:border-amber-500/15 transition-all duration-500 cursor-pointer overflow-hidden"
                  style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 border border-amber-500/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-amber-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-mono">
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        Sertifikat
                      </div>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="text-[15px] font-semibold text-white/90 leading-snug group-hover:text-amber-300 transition-colors duration-300">
                        {cert.event_judul}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-[12px] text-zinc-500">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(cert.event_tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {cert.event_lokasi && (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {cert.event_lokasi}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-white/[0.04] flex items-center justify-between">
                      <span className="text-[10px] text-zinc-600 font-mono tracking-tight truncate max-w-[55%]">
                        #{cert.nomor_sertif?.split("/").pop() || cert.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={
                            cert.file_url.startsWith("http")
                              ? cert.file_url
                              : `https://backend.web.h.lazismubanjarnegara.id${cert.file_url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-amber-400 hover:border-amber-500/25 hover:bg-amber-500/10 transition-all duration-300"
                          title="Unduh Sertifikat"
                        >
                          <DownloadIcon />
                        </a>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                          <ArrowRightIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
