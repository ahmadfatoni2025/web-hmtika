import Link from "next/link"
import Image from "next/image"

export default function OverviewSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 mb-4">
                Program Unggulan
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Membangun Generasi IT Profesional dan Inovatif
              </h2>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              HMTIKA berkomitmen untuk memfasilitasi dan mengoptimalkan potensi mahasiswa Teknik Informatika melalui program-program kerja terstruktur, pelatihan teknologi terkini, serta ruang kolaborasi riset.
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              Dengan ekosistem kolaboratif kami, mahasiswa dipersiapkan untuk menghadapi tantangan industri digital global, baik di bidang Software Engineering, Artificial Intelligence, maupun Cybersecurity.
            </p>
            
            <div className="pt-2">
              <Link
                href="/aspirasi"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800"
              >
                Kirim Aspirasi
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right Image Layout Column */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-4">
            
            {/* Tall Vertical Image */}
            <div className="col-span-2 relative h-[360px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md group">
              <Image
                src="/images/coding_event.png"
                alt="Hackathon Coding Event"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
            
            {/* Stacked Images Column */}
            <div className="col-span-1 flex flex-col gap-4">
              
              {/* Top Landscape/Square Image */}
              <div className="relative h-[172px] sm:h-[217px] rounded-3xl overflow-hidden shadow-md group">
                <Image
                  src="/images/student_seminar.png"
                  alt="Student Seminar"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
              
              {/* Bottom Landscape/Square Image */}
              <div className="relative h-[172px] sm:h-[217px] rounded-3xl overflow-hidden shadow-md group">
                <Image
                  src="/images/hero_student.png"
                  alt="Students Collaborating"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
              
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  )
}
