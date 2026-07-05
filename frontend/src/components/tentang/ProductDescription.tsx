"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductDescriptionProps {
  className?: string
}

export default function ProductDescription({ className }: ProductDescriptionProps) {
  return (
    <section className={cn("w-full mx-auto", className)}>
      <div className="mx-auto max-w-6xl px-4 2xl:px-0">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Tentang HMTIKA
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed">
            HMTIKA (Himpunan Mahasiswa Teknik Informatika dan Komputer) STIMIK Tunas Bangsa adalah organisasi kemahasiswaan yang menjadi wadah pengembangan minat, bakat, dan kompetensi mahasiswa di bidang teknologi informasi dan komputer.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed">
            Berdiri sejak tahun 2015, HMTIKA telah menjadi rumah bagi ratusan mahasiswa untuk belajar, berkolaborasi, dan berkontribusi dalam berbagai kegiatan akademik maupun non-akademik. Kami percaya bahwa teknologi adalah kunci untuk masa depan yang lebih baik.
          </p>

          <p className="text-base font-semibold my-2 text-white">
            Program dan Kegiatan Unggulan:
          </p>

          <ul className="list-disc list-outside ml-4 space-y-4">
            <li className="text-base text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white">Pengembangan Web:</span>{" "}
              Pelatihan dan proyek pengembangan website modern menggunakan teknologi terkini seperti Next.js, Laravel, dan React.
            </li>
            <li className="text-base text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white">Desain UI/UX:</span>{" "}
              Workshop desain antarmuka dan pengalaman pengguna yang berfokus pada prinsip desain modern dan tools industri.
            </li>
            <li className="text-base text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white">Workshop &amp; Seminar:</span>{" "}
              Kegiatan rutin menghadirkan praktisi industri untuk berbagi pengetahuan dan pengalaman di bidang teknologi.
            </li>
            <li className="text-base text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white">Kompetisi &amp; Hackathon:</span>{" "}
              Ajang kompetisi programming, desain, dan inovasi yang diadakan secara berkala untuk mengasah kemampuan.
            </li>
            <li className="text-base text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white">Pengabdian Masyarakat:</span>{" "}
              Program sosial yang memanfaatkan teknologi untuk memberikan dampak positif bagi masyarakat sekitar.
            </li>
          </ul>

          <div className="my-6 md:my-12">
            <div className="w-full h-[260px] md:h-[540px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video Profil HMTIKA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>


          <p className="text-base text-zinc-400 leading-relaxed">
            Dengan dukungan dosen dan alumni yang berpengalaman, HMTIKA terus berupaya menciptakan lingkungan yang kondusif bagi pengembangan soft skill dan hard skill mahasiswa. Kami juga menjalin kerja sama dengan berbagai perusahaan dan institusi untuk membuka peluang magang dan karir bagi anggota.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed">
            HMTIKA terbuka bagi seluruh mahasiswa STIMIK Tunas Bangsa yang ingin mengembangkan potensi diri di bidang teknologi. Tidak ada persyaratan khusus — cukup minat dan semangat untuk belajar.
          </p>
        </div>
      </div>
    </section >
  )
}
