"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import RotatingText from "@/components/ui/RotatingText";
import { BsCalendarDateFill } from "react-icons/bs";


export default function HeroLayout() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(15px)";
    requestAnimationFrame(() => {
      el.style.transition =
        "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `/aspirasi?email=${encodeURIComponent(email)}`;
    }, 800);
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[650px] flex flex-col justify-between overflow-hidden bg-[#0c0d12]"
    >
      {/* ─── Immersive Full-screen Background ─── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.02]"
        >
          <source src="/videos/light.mp4" type="video/mp4" />
        </video>
        {/* Sky glow adjustment */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10]/15 via-transparent to-[#0c0d12]/75" />
        {/* Soft mist glow at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent pointer-events-none" />
      </div>

      {/* Spacing for Fixed Navbar */}
      <div className="h-24 shrink-0" />

      {/* ─── Hero Content Area ─── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 flex-1 flex flex-col justify-end pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full ">
          {/* ════════════ LEFT/BOTTOM: Main Heading & Call to Action ════════════ */}
          <div className="lg:col-span-8 flex flex-col items-start text-left max-w-3xl">

            {/* Badge */}
            <div className="mb-5">
              <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-black/40 backdrop-blur-md px-4 py-2 text-sm text-slate-100 tracking-wide">
                ✦ Himpunan Mahasiswa Teknik Informatika
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight">
              Jangan Lupa{" "}
              <RotatingText
                texts={[
                  "Titik Koma.",
                  "Ngopi.",
                  "Makan.",
                ]}
                mainClassName="inline-flex text-amber-400 overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 28, stiffness: 380 }}
                rotationInterval={2500}
              />
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-md text-zinc-300 leading-8">
              Himpunan Mahasiswa Teknik Informatika (HMTIKA) STMIK Tunas Bangsa menjadi
              ruang kolaborasi bagi mahasiswa untuk berkembang melalui inovasi, kegiatan
              akademik, organisasi, dan pengabdian kepada masyarakat.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">

              <button
                className="
        rounded-full
        bg-amber-400
        px-7
        py-3
        font-medium
        text-black
        transition-all
        duration-300
        hover:bg-amber-300
        hover:shadow-[0_0_35px_rgba(251,191,36,.35)]
      "
              >
                🎓 Sertifikat
              </button>

              <button
                className=" flex gap-1
        rounded-full
        border
        border-white/15
        bg-white/5
        backdrop-blur-xl
        px-7
        py-3
        text-white
        transition-all
        duration-300
        hover:bg-white/10
        hover:border-amber-300/40
      "
              >
                <BsCalendarDateFill className="text-sm" />
                <p>Lihat Event</p>
              </button>

            </div>

          </div>

          {/* ════════════ RIGHT/BOTTOM: Sponsored/Partners Logos ════════════ */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-2 lg:gap-3 lg:justify-self-end mt-6 lg:mt-0 pb-1.5">
            <span className="text-[10px] sm:text-xs tracking-widest text-zinc-400 font-mono uppercase">
              Supported By
            </span>
            <div className="flex items-center gap-6 sm:gap-8 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-white font-semibold tracking-wider text-base sm:text-lg select-none">
                BEM
              </span>
              <span className="text-white font-bold tracking-tight text-lg sm:text-xl select-none font-mono">
                HIMASI
              </span>
              <span className="text-white font-medium tracking-tight text-base sm:text-lg select-none">
                MUGIWARAS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
