"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { gsap } from "gsap"
import "@/styles/magic-bento.css"

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = "56, 189, 248"

interface BentoCard {
  image: string
  label: string
  title: string
  description: string
}

interface MagicBentoProps {
  cards?: BentoCard[]
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  spotlightRadius?: number
  particleCount?: number
  glowColor?: string
  disableAnimations?: boolean
}

const defaultCards: BentoCard[] = [
  {
    image: "https://i.pinimg.com/736x/4b/b8/1f/4bb81fac1e33a9cdcfb1861dee33b8be.jpg",
    label: "Dokumentasi",
    title: "Galeri Kegiatan",
    description: "Foto dan video dokumentasi setiap acara",
  },
  {
    image: "https://i.pinimg.com/1200x/18/d4/fa/18d4faa93a885a31d2aaf0b7b7e24bae.jpg",
    label: "Workshop",
    title: "Pelatihan Teknologi",
    description: "Workshop dan seminar pengembangan skill",
  },
  {
    image: "https://i.pinimg.com/1200x/bc/71/26/bc7126353be75818bdd56b08c17ffe30.jpg",
    label: "Kompetisi",
    title: "Hackathon & Lomba",
    description: "Kompetisi teknologi, desain, dan inovasi",
  },
  {
    image: "https://i.pinimg.com/736x/a5/7d/6f/a57d6fa854ec37f13582937ef34db2a2.jpg",
    label: "Kolaborasi",
    title: "Kerja Sama Mitra",
    description: "Kolaborasi dengan industri dan institusi",
  },
  {
    image: "https://i.pinimg.com/1200x/2a/ff/2f/2aff2fa6764d8405ed791012c1f0d772.jpg",
    label: "Sosial",
    title: "Bakti Masyarakat",
    description: "Kegiatan sosial dan pengabdian masyarakat",
  },
  {
    image: "https://i.pinimg.com/736x/6c/14/a7/6c14a7e6191c652af728fd0e0fd03a01.jpg",
    label: "Prestasi",
    title: "Penghargaan Mahasiswa",
    description: "Capaian dan prestasi anggota HMTIKA",
  },
]

function ParticleCard({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}: {
  children: React.ReactNode
  className?: string
  disableAnimations?: boolean
  style?: React.CSSProperties
  particleCount?: number
  glowColor?: string
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

  const createParticleElement = useCallback(
    (x: number, y: number) => {
      const el = document.createElement("div")
      el.className = "particle"
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.style.background = `rgba(${glowColor}, 1)`
      el.style.boxShadow = `0 0 6px rgba(${glowColor}, 0.6)`
      return el
    },
    [glowColor],
  )

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height),
    )
    particlesInitialized.current = true
  }, [particleCount, createParticleElement])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetismAnimationRef.current?.kill()
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => particle.parentNode?.removeChild(particle),
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return
    if (!particlesInitialized.current) initializeParticles()

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current!.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        })
        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        })
      }, index * 100)
      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return
    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()
      if (enableTilt) {
        gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: "power2.out", transformPerspective: 1000 })
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()
      if (enableTilt) gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" })
      if (enableMagnetism) gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt) {
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -10,
          rotateY: ((x - centerX) / centerX) * 10,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        })
      }
      if (enableMagnetism) {
        magnetismAnimationRef.current = gsap.to(element, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height))

      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `
      element.appendChild(ripple)
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() })
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("click", handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("click", handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div ref={cardRef} className={`${className} particle-container`} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  )
}

export default function MagicBento({
  cards = defaultCards,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disableAnimations || !enableSpotlight || !gridRef.current) return

    const spotlight = document.createElement("div")
    spotlight.className = "global-spotlight"
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)

    const calculateSpotlightValues = (radius: number) => ({
      proximity: radius * 0.5,
      fadeDistance: radius * 0.75,
    })

    const updateCardGlow = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty("--glow-x", `${((mouseX - rect.left) / rect.width) * 100}%`)
      card.style.setProperty("--glow-y", `${((mouseY - rect.top) / rect.height) * 100}%`)
      card.style.setProperty("--glow-intensity", glow.toString())
      card.style.setProperty("--glow-radius", `${radius}px`)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const section = gridRef.current?.closest(".bento-section")
      const rect = section?.getBoundingClientRect()
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      const cards = gridRef.current?.querySelectorAll(".magic-bento-card") as NodeListOf<HTMLElement> | undefined
      if (!cards) return

      if (!mouseInside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" })
        cards.forEach((card) => card.style.setProperty("--glow-intensity", "0"))
        return
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
      let minDistance = Infinity

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cx = cardRect.left + cardRect.width / 2
        const cy = cardRect.top + cardRect.height / 2
        const distance = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cardRect.width, cardRect.height) / 2
        const effectiveDistance = Math.max(0, distance)
        minDistance = Math.min(minDistance, effectiveDistance)

        let glow = 0
        if (effectiveDistance <= proximity) glow = 1
        else if (effectiveDistance <= fadeDistance) glow = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
        updateCardGlow(card, e.clientX, e.clientY, glow, spotlightRadius)
      })

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" })

      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0
      gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: "power2.out" })
    }

    const handleMouseLeaveDoc = () => {
      gridRef.current?.querySelectorAll(".magic-bento-card").forEach((card) => {
        ; (card as HTMLElement).style.setProperty("--glow-intensity", "0")
      })
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" })
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeaveDoc)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeaveDoc)
      spotlight.parentNode?.removeChild(spotlight)
    }
  }, [disableAnimations, enableSpotlight, spotlightRadius, glowColor])

  const baseClass = `magic-bento-card ${textAutoHide ? "magic-bento-card--text-autohide" : ""} ${enableBorderGlow ? "magic-bento-card--border-glow" : ""}`

  return (
    <div className="card-grid bento-section" ref={gridRef}>
      {cards.map((card, index) => {
        const cardEl = (
          <div
            className={baseClass}
            style={{ backgroundColor: "#0f0f0f", "--glow-color": glowColor } as React.CSSProperties}
          >
            {/* Image */}
            <div className="absolute inset-0">
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-60"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
            </div>

            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{card.label}</div>
            </div>
            <div className="magic-bento-card__content">
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </div>
        )

        if (enableStars) {
          return (
            <ParticleCard
              key={index}
              className={baseClass}
              disableAnimations={disableAnimations}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              <div className="absolute inset-0">
                {card.image ? (
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
              </div>
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{card.label}</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">{card.title}</h2>
                <p className="magic-bento-card__description">{card.description}</p>
              </div>
            </ParticleCard>
          )
        }

        return <div key={index}>{cardEl}</div>
      })}
    </div>
  )
}
