import Link from "next/link"

export default function Footer() {
  const navLinks = [
    { href: "/event", label: "Event" },
    { href: "/galery", label: "Galeri" },
    { href: "/berita", label: "Berita" },
    { href: "/aspirasi", label: "Aspirasi" },
    { href: "/sertifikat", label: "Sertifikat" },
    { href: "/devisi", label: "Divisi" },
  ]

  const serviceLinks = [
    { href: "/aspirasi", label: "Kirim Aspirasi" },
    { href: "/event", label: "Daftar Event" },
    { href: "/sertifikat", label: "Klaim Sertifikat" },
    { href: "/berita", label: "Pusat Informasi" },
  ]

  const socialLinks = [
    { href: "https://www.instagram.com/hmtika.sttb", label: "Instagram" },
    { href: "#", label: "YouTube" },
    { href: "#", label: "TikTok" },
    { href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="border-t border-white/20 ">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* ================= LEFT ================= */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* Ganti dengan logo jika ada */}
              <div className="flex h-10 w-10">
                <img src="#" alt="Logo_hmtika" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Himpunan Mahasiswa Informatika
                </h3>
                <p className="text-xs text-zinc-500">
                  STIMIK Tunas Bangsa
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
              Himpunan Mahasiswa Teknik Informatika STIMIK Tunas Bangsa
              merupakan wadah pengembangan potensi, kreativitas,
              inovasi, dan kolaborasi mahasiswa dalam bidang
              teknologi, akademik, maupun organisasi.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Newsletter
              </p>

              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="w-full rounded-l-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-gold/50 focus:outline-none"
                />

                <button className="rounded-r-lg bg-amber-gold px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-gold-light">
                  Langganan
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:gap-16">
            {/* Navigasi */}
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Navigasi
              </h4>

              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layanan */}
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Layanan
              </h4>

              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sosial Media */}
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Ikuti Kami
              </h4>

              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} HMTIKA STIMIK Tunas Bangsa.
            Jangan lupa titi koma.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/tentang"
              className="transition hover:text-zinc-300"
            >
              Tentang
            </Link>

            <span className="text-white/10">|</span>

            <Link
              href="/privacy"
              className="transition hover:text-zinc-300"
            >
              Kebijakan Privasi
            </Link>

            <span className="text-white/10">|</span>

            <Link
              href="/terms"
              className="transition hover:text-zinc-300"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}