"use client";

import ScrollExpand from "@/components/ui/ScrollExpand";

export default function ParalaxImage() {
  return (
    <section className="relative w-full h-screen">
      <ScrollExpand
        src="https://i.pinimg.com/736x/a8/e8/8d/a8e88dbebb15890bbb79cc1729e3f610.jpg"
        alt="Parallax Image"
        title="Momentum HMTIKA"
        scrollHint="Scroll"
        useWindowScroll
        mediaZoom={1.35}
        startWidth={70}
        startHeight={76}
        startRadius={50}
        overlayScrim={0.5}
        scrollDistance={0.5}
        holdDistance={0.1}
        smoothing={0.001}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Melaju Bersama Teknologi
        </h2>
        <p className="max-w-xl mt-4 text-base sm:text-lg text-white/80">
          Frame terbuka saat Anda menggulir dan memberikan panggung penuh untuk karya dan inovasi
          anggota HMTIKA.
        </p>
      </ScrollExpand>
    </section >
  );
}
