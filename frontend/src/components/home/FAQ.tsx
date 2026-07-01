"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Apa itu HMTIKA?",
    answer:
      "HMTIKA adalah Himpunan Mahasiswa Teknik Informatika STIMIK Tunas Bangsa yang menaungi seluruh mahasiswa program studi Teknik Informatika.",
  },
  {
    question: "Bagaimana cara mendaftar menjadi anggota HMTIKA?",
    answer:
      "Pendaftaran anggota HMTIKA dilakukan melalui Open Recruitment yang diadakan setiap awal semester. Informasi lebih lanjut dapat dilihat di media sosial resmi HMTIKA.",
  },
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
]

function useContentHeights(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    setHeights(refs.current.map((el) => el?.scrollHeight ?? 0))
  }, [count])

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el
  }

  return { heights, setRef }
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { heights, setRef } = useContentHeights(faqData.length)

  const filtered = searchQuery.trim()
    ? faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    : faqData

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full flex items-center justify-center px-6 relative overflow-hidden border-t border-white/[0.03]">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-12">
        <div className="text-center space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            ◎ FAQ
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white">
            Pertanyaan Umum
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang HMTIKA.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 size-4" />
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 rounded-full border border-white/[0.08] bg-white/[0.04] pl-11 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-amber-gold/30 focus:bg-white/[0.06] transition-all duration-300"
          />
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-500">
            Tidak ditemukan hasil untuk &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {/* Accordion List */}
        <div className="w-full space-y-2">
          {filtered.map((item) => {
            const realIndex = faqData.indexOf(item)
            const isOpen = openIndex === realIndex

            return (
              <div
                key={realIndex}
                className="rounded-xl border-b-slate-300/80 bg-white/[0.02] transition-all duration-300 data-[open=true]:border-amber-gold/20 data-[open=true]:bg-white/[0.04]"
                data-open={isOpen}
              >
                <button
                  onClick={() => toggle(realIndex)}
                  className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left text-sm sm:text-base text-zinc-100 font-medium transition-colors duration-200 hover:text-white cursor-pointer"
                >
                  <span className="pr-2">{item.question}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-zinc-500 transition-transform duration-300 data-[open=true]:rotate-180 data-[open=true]:text-amber-gold"
                    data-open={isOpen}
                  />
                </button>

                <div
                  ref={setRef(realIndex)}
                  className="overflow-hidden transition-[max-height] duration-300 ease-out"
                  style={{ maxHeight: isOpen ? `${heights[realIndex] ?? 0}px` : "0px" }}
                >
                  <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
