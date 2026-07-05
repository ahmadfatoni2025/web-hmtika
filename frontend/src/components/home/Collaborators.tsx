import LogoLoop from './LogoLoop';
import { FaGoogle, FaMicrosoft, FaGraduationCap } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { MdCode } from 'react-icons/md';

const partners = [
  { node: <FaGoogle />, title: "Google Developer Groups", href: "https://developers.google.com/community/gdg" },
  { node: <SiGithub />, title: "GitHub Campus", href: "https://education.github.com" },
  { node: <MdCode />, title: "Dicoding Academy", href: "https://www.dicoding.com" },
  { node: <FaMicrosoft />, title: "Microsoft Learn", href: "https://learn.microsoft.com" },
  { node: <FaGraduationCap />, title: "STIMIK Tunas Bangsa", href: "https://stimik.ac.id" },
];

export default function Collaborators() {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full py-10 border-t border-b border-white/[0.04]">
        <div className="mx-auto w-auto max-w-7xl px-6 flex flex-col items-center gap-6 relative overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 text-center">
            Kolaborasi & Kemitraan Strategis
          </p>
          <div className="w-full">
            <LogoLoop
              logos={partners}
              speed={40}
              direction="left"
              logoHeight={32}
              gap={64}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#0b0b0b"
              ariaLabel="Partner logos"
            />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
