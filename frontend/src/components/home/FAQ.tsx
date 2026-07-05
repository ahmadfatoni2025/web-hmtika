"use client"

import { useState, useRef, useEffect } from "react"
import { HelpCircle, ChevronDown, Building, UserPlus, Calendar, HeartHandshake, MessageCircle, ArrowRight } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface Category {
  id: string
  label: string
  icon: typeof Building
  items: FAQItem[]
}

const categories: Category[] = [
  {
    id: "organisasi",
    label: "Organisasi",
    icon: Building,
    items: [
      {
        question: "Apa itu HMTIKA?",
        answer:
          "HMTIKA adalah Himpunan Mahasiswa Teknik Informatika STIMIK Tunas Bangsa yang menaungi seluruh mahasiswa program studi Teknik Informatika.",
      },
      {
        question: "Apa saja divisi yang ada di HMTIKA?",
        answer:
          "HMTIKA memiliki beberapa divisi antara lain Divisi Pengembangan Sumber Daya Mahasiswa (PSDM), Divisi Minat dan Bakat, Divisi Hubungan Masyarakat (Humas), serta Divisi Penelitian dan Pengembangan (Litbang).",
      },
      {
        question: "Di mana lokasi sekretariat HMTIKA?",
        answer:
          "Sekretariat HMTIKA berada di Kampus STIMIK Tunas Bangsa, Banjarnegara.",
      },
    ],
  },
  {
    id: "keanggotaan",
    label: "Keanggotaan",
    icon: UserPlus,
    items: [
      {
        question: "Bagaimana cara mendaftar menjadi anggota HMTIKA?",
        answer:
          "Pendaftaran anggota HMTIKA dilakukan melalui Open Recruitment yang diadakan setiap awal semester. Informasi lebih lanjut dapat dilihat di media sosial resmi HMTIKA.",
      },
    ],
  },
  {
    id: "kegiatan",
    label: "Kegiatan & Event",
    icon: Calendar,
    items: [
      {
        question: "Apa saja program kerja HMTIKA?",
        answer:
          "Program kerja HMTIKA meliputi berbagai kegiatan seperti seminar, workshop, lomba, bakti sosial, dan pengembangan skill mahasiswa di bidang teknologi informasi.",
      },
      {
        question: "Bagaimana cara mengikuti event yang diselenggarakan HMTIKA?",
        answer:
          "Informasi event dapat dilihat di halaman Event website HMTIKA. Pendaftaran dilakukan secara online melalui formulir yang disediakan.",
      },
    ],
  },
  {
    id: "layanan",
    label: "Layanan",
    icon: HeartHandshake,
    items: [
      {
        question: "Apakah HMTIKA menyediakan beasiswa?",
        answer:
          "HMTIKA bekerja sama dengan berbagai pihak untuk menyediakan informasi beasiswa bagi mahasiswa. Informasi beasiswa dapat dilihat di halaman Beasiswa website HMTIKA.",
      },
      {
        question: "Bagaimana cara menyampaikan aspirasi kepada HMTIKA?",
        answer:
          "Aspirasi dapat disampaikan melalui halaman Aspirasi website HMTIKA. Setiap aspirasi akan ditindaklanjuti oleh divisi terkait.",
      },
    ],
  },
]

function useContentHeights(deps: unknown[]) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    setHeights(refs.current.map((el) => el?.scrollHeight ?? 0))
  }, deps)

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el
  }

  return { heights, setRef }
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const currentItems = categories.find((c) => c.id === activeCategory)?.items ?? []
  const { heights, setRef } = useContentHeights([activeCategory, currentItems.length])

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full px-6 py-24 relative overflow-hidden border-t border-white/[0.03]">
      <div className="mx-auto max-w-6xl">
        {/* ─── Left-aligned header ─── */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-5">
            ◎ FAQ
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.12] tracking-tight text-white">
            Pertanyaan Umum
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang HMTIKA, mulai dari organisasi, keanggotaan, hingga layanan yang tersedia.
          </p>
        </div>

        {/* ─── Two-column layout ─── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Left column — category tabs */}
          <div className="lg:w-64 shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setOpenIndex(null)
                    }}
                    className={`relative flex items-center gap-3 whitespace-nowrap lg:whitespace-normal px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-white/[0.06] text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-sky-400 hidden lg:block" />
                    )}
                    <Icon className="w-4 h-4 shrink-0" />
                    {cat.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right column — accordion panel */}
          <div className="flex-1 min-w-0 space-y-2">
            {currentItems.length === 0 && (
              <p className="py-8 text-center text-sm text-zinc-500">
                Belum ada pertanyaan di kategori ini.
              </p>
            )}
            {currentItems.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300"
                  data-open={isOpen}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 shrink-0 text-zinc-500" />
                    <span className="flex-1 text-sm font-semibold text-zinc-100">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-zinc-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-sky-400" : ""
                      }`}
                    />
                  </button>
                  <div
                    ref={setRef(i)}
                    className="overflow-hidden transition-[max-height] duration-300 ease-out"
                    style={{ maxHeight: isOpen ? `${heights[i] ?? 0}px` : "0px" }}
                  >
                    <div className="px-5 pb-5 pl-12 text-sm text-zinc-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Footer bar ─── */}
        <hr className="mt-16 border-white/[0.06]" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-sm text-zinc-400 text-center sm:text-left">
            Masih punya pertanyaan?{" "}
            <span className="text-zinc-300">Tim kami siap membantu</span>
          </p>
          <a
            href="/aspirasi"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] px-5 py-2 text-sm font-medium text-zinc-200 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Kami
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
