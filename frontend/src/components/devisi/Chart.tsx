"use client"

import { useState, useMemo } from "react"
import { Users, LayoutGrid, Sparkles, ExternalLink } from "lucide-react"
import type { Division, MemberItem } from "@/lib/api/devisi"

interface DivisionChartProps {
  divisions: Division[]
  members: MemberItem[]
}

export default function DivisionChart({ divisions, members }: DivisionChartProps) {
  // Hubungkan divisi dengan anggota
  const chartData = useMemo(() => {
    return divisions.map((div) => {
      const divMembers = members.filter((m) => m.division_id === div.id || m.division_name === div.name)
      return {
        ...div,
        memberCount: divMembers.length,
        membersList: divMembers,
      }
    })
  }, [divisions, members])

  const [selectedDiv, setSelectedDiv] = useState<typeof chartData[0] | null>(null)

  // Set default selected division
  useMemo(() => {
    if (chartData.length > 0 && !selectedDiv) {
      setSelectedDiv(chartData[0])
    }
  }, [chartData, selectedDiv])

  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center p-4">

      {/* ─── RADIAL ORBIT SYSTEM (DIAGRAM LINGKARAN SEPERTI REFERENSI GAMBAR) ─── */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center select-none">

        {/* Lingkaran Garis Orbit Latar Belakang */}
        <div className="absolute inset-[12%] rounded-full border border-zinc-800/60 pointer-events-none"></div>
        <div className="absolute inset-[24%] rounded-full border border-dashed border-zinc-800/40 pointer-events-none"></div>
        <div className="absolute inset-[36%] rounded-full border border-zinc-900 pointer-events-none"></div>

        {/* Garis Hubung SVG (Mengarah ke Pusat) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <filter id="glowGreen">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {chartData.map((div, idx) => {
            const total = chartData.length || 1
            const angle = (idx * 2 * Math.PI) / total - Math.PI / 2

            // Koordinat pusat lingkaran (250, 250)
            const cx = 250
            const cy = 250

            // Jarak radius ke node luar (~170px)
            const r = 175
            const x = cx + r * Math.cos(angle)
            const y = cy + r * Math.sin(angle)

            const isSelected = selectedDiv?.id === div.id

            return (
              <g key={div.id}>
                {/* Garis radial ke pusat */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={isSelected ? "#10b981" : "#27272a"}
                  strokeWidth={isSelected ? 1.8 : 0.8}
                  strokeDasharray={isSelected ? "none" : "3,3"}
                  filter={isSelected ? "url(#glowGreen)" : undefined}
                  className="transition-all duration-300"
                />
                {/* Node titik koneksi di dekat lingkaran tengah */}
                <circle
                  cx={cx + 52 * Math.cos(angle)}
                  cy={cy + 52 * Math.sin(angle)}
                  r={isSelected ? 4 : 3}
                  fill={isSelected ? "#10b981" : "#3f3f46"}
                  className="transition-all duration-300"
                />
              </g>
            )
          })}
        </svg>

        {/* Pusat Orbit (Logo / Singkatan HMTIKA) */}
        <div className="absolute z-20 w-20 h-20 rounded-full bg-[#111c24] border border-zinc-800 flex items-center justify-center shadow-xl">
          <div className="text-center">
            <h4 className="text-xs font-black tracking-widest text-zinc-400">HM</h4>
            <h4 className="text-xs font-black tracking-widest text-white -mt-0.5">TIKA</h4>
          </div>
        </div>

        {/* Node Divisi yang Mengitari Pusat */}
        {chartData.map((div, idx) => {
          const total = chartData.length || 1
          // Hitung sudut penempatan melingkar
          const angle = (idx * 2 * Math.PI) / total - Math.PI / 2

          // Radius penempatan
          const r = 175

          // Peta posisi berdasarkan sudut dalam persentase
          const xPercent = 50 + (r / 250) * 50 * Math.cos(angle)
          const yPercent = 50 + (r / 250) * 50 * Math.sin(angle)

          const isSelected = selectedDiv?.id === div.id

          return (
            <button
              key={div.id}
              onClick={() => setSelectedDiv(div)}
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute z-10 px-4 py-2 rounded-full border flex items-center gap-2.5 transition-all duration-300 shadow-lg ${isSelected
                  ? "bg-[#14232c]/90 border-[#10b981] text-white scale-105"
                  : "bg-[#0b1217]/95 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
            >
              {/* Dot Indikator Status Aktif */}
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-emerald-400" : "bg-zinc-600"}`} />

              <div className="text-left max-w-[90px] truncate leading-tight">
                <p className="text-[10px] font-bold tracking-wide uppercase truncate">
                  {div.name}
                </p>
                <p className={`text-[8px] mt-0.5 truncate ${isSelected ? "text-[#10b981] font-semibold" : "text-zinc-500"}`}>
                  {div.memberCount} Staff
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* ─── DETAIL INFO PANEL: DI BAWAH RADIAL (SIMPLE & PREMIUM) ─────────── */}
      {selectedDiv && (
        <div className="w-full max-w-[500px] bg-[#111c24] rounded-2xl border border-zinc-800/80 p-5 shadow-xl space-y-4">
          {/* Header Divisi */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-[#10b981] border border-emerald-500/20 uppercase tracking-wider">
                Divisi Terpilih
              </span>
              <span className="text-[10px] font-mono text-zinc-500">ID: #{selectedDiv.id}</span>
            </div>

            <h3 className="text-lg font-black text-white mt-2 tracking-wide uppercase">
              {selectedDiv.name}
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">
              {selectedDiv.description || "Divisi Himpunan Mahasiswa Teknik Informatika yang bertugas mengelola program kerja terintegrasi."}
            </p>
          </div>

          {/* Daftar Anggota Divisi */}
          <div className="pt-2 border-t border-zinc-800/60">
            <h4 className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 mb-2">
              Anggota Aktif ({selectedDiv.memberCount})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
              {selectedDiv.membersList.length > 0 ? (
                selectedDiv.membersList.map((m) => (
                  <div key={m.id} className="flex items-center justify-between bg-[#0c141a] px-3 py-2 rounded-xl border border-zinc-800/40">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={m.photo_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                        alt={m.name}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-800"
                      />
                      <div className="leading-tight overflow-hidden">
                        <h6 className="text-[10px] font-bold text-white truncate max-w-[130px]">{m.name}</h6>
                        <span className="text-[8px] text-zinc-500 truncate block mt-0.5">{m.description || "Staff"}</span>
                      </div>
                    </div>
                    {m.social_media_url && (
                      <a href={m.social_media_url} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white shrink-0">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-5 border border-dashed border-zinc-800 rounded-xl">
                  <p className="text-[10px] text-zinc-500">Belum ada staff anggota terdaftar.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}