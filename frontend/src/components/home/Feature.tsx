"use client"

import { getNews, getEvents, getAspirations } from "@/lib/api"
import type { NewsItem, EventItem, AspirationItem } from "@/lib/api"
import { useState, useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const features = [
    {
        img: "https://i.pinimg.com/1200x/6a/01/cf/6a01cf7d26de21cce2e5441d562ce2e5.jpg",
        title: "Pusat Informasi & Newsroom",
        desc: "Akses berita resmi, pengumuman akademik, dan rilis darurat organisasi secara real-time dan terpusat.",
    },
    {
        img: "https://i.pinimg.com/736x/72/bd/0d/72bd0d9a7e09c28b2ed3f7170054b28a.jpg",
        title: "Informasi PPPKM terbaru",
        desc: "Sampaikan kritik, keluhan, dan saran terkait fasilitas maupun kurikulum kampus secara aman dan rahasia.",
    },
    {
        img: "https://i.pinimg.com/736x/20/78/d0/2078d06cc691dd7544db31f9e95fa5ef.jpg",
        title: "Sponsor & Partner",
        desc: "Pantau program kerja, workshop teknologi, seminar, dan rapat umum. Daftarkan diri secara instan.",
    },
    {
        img: "https://i.pinimg.com/736x/3b/5a/7e/3b5a7e9f1c2d4a6b8e0f1c2d3e4f5a6b.jpg",
        title: "Kalender Akademik",
        desc: "Lihat jadwal perkuliahan, ujian, dan tenggat akademik dalam satu tampilan terintegrasi.",
    },
    {
        img: "https://i.pinimg.com/736x/8c/9d/0e/8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f.jpg",
        title: "Pendaftaran Lomba",
        desc: "Daftarkan diri untuk berbagai kompetisi teknologi, desain, dan inovasi yang diselenggarakan HMTIKA.",
    },
    {
        img: "https://i.pinimg.com/736x/4d/5e/6f/4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a.jpg",
        title: "Beasiswa & Karier",
        desc: "Temukan informasi beasiswa terbaru, lowongan magang, dan peluang karier di bidang IT.",
    },
    {
        img: "https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.jpg",
        title: "Galeri Kegiatan",
        desc: "Dokumentasi foto dan video dari setiap acara, seminar, dan workshop yang pernah diselenggarakan.",
    },
]

export default function Feature() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [events, setEvents] = useState<EventItem[]>([])
    const [aspirations, setAspirations] = useState<AspirationItem[]>([])
    const [totalNews, setTotalNews] = useState(0)
    const [totalEvents, setTotalEvents] = useState(0)
    const [totalAspirations, setTotalAspirations] = useState(0)
    const [loading, setLoading] = useState(true)
    const [api, setApi] = useState<any>(null)

    useEffect(() => {
        async function loadData() {
            try {
                const [newsRes, eventsRes, aspirationsRes] = await Promise.all([
                    getNews(1, 5).catch(() => null),
                    getEvents(1, 5).catch(() => null),
                    getAspirations(1, 5).catch(() => null),
                ])

                if (newsRes?.data) {
                    setNews(newsRes.data)
                    setTotalNews(newsRes.total || newsRes.data.length)
                }
                if (eventsRes?.data) {
                    setEvents(eventsRes.data)
                    setTotalEvents(eventsRes.total || eventsRes.data.length)
                }
                if (aspirationsRes?.data) {
                    setAspirations(aspirationsRes.data)
                    setTotalAspirations(aspirationsRes.total || aspirationsRes.data.length)
                }
            } catch (err) {
                console.error("Error loading home page API data:", err)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (!api) return
        const onSelect = () => {
        }
        api.on("select", onSelect)
        return () => {
            api?.off("select", onSelect)
        }
    }, [api])

    const latestNewsItem = news[0] || {
        id: 1,
        judul: "Workshop Modern Web Development 2026",
        kategori: "Kegiatan",
        ringkasan: "Membangun aplikasi Next.js dengan arsitektur modern.",
        tglPublish: new Date().toLocaleDateString("id-ID"),
    }

    const latestAspirationItem = aspirations[0] || {
        id: 1,
        kategori: "Fasilitas",
        isiAspirasi: "Perluasan kapasitas AC di laboratorium komputer utama kampus.",
        status: "reviewed",
    }

    const latestEventItem = events[0] || {
        id: 1,
        judul: "Hackathon Tunas Bangsa 2026",
        lokasi: "Gedung Serbaguna",
        tanggal: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        kuota: 100,
        biaya: 0,
    }

    return (
        <>
            <section id="enterprise" className="w-full py-24 px-6 relative overflow-hidden">

                <div className="mx-auto max-w-6xl flex flex-col items-center gap-16">

                    {/* Section Header */}
                    <div className="text-center space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                            ◎ Layanan
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white">
                            Sinergi Teknologi <span className="font-display italic font-light text-zinc-100">untuk Mahasiswa IT</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
                            Portal HMTIKA mengintegrasikan sistem informasi organisasi, kalender pendaftaran event, dan kotak aspirasi ke dalam satu portal digital yang aman.
                        </p>
                    </div>

                    {/* Carousel */}
                    <div className="w-full">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                                breakpoints: {
                                    "(min-width: 768px)": { slidesToScroll: 3 },
                                },
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                    stopOnInteraction: true,
                                    stopOnMouseEnter: true,
                                }),
                            ]}
                            setApi={setApi}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4 md:-ml-6">
                                {features.map((item, i) => (
                                    <CarouselItem key={i} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                                        <div className="glass-card-glowing border border-white/5 rounded-2xl p-6 flex flex-col gap-6 h-full">
                                            <div className="h-44 w-full rounded-xl overflow-hidden isolation-blur">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300 pointer-events-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-zinc-400 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>

                    </div>

                </div>

            </section>
        </>
    )
}
