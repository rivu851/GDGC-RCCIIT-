"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Building2, Lightbulb, ScreenShare, Trophy, User, User2, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { BGPattern } from "@/components/ui/bg-pattern"
// Removed DotGrid import as background dots are no longer used


// Register GSAP plugins safely (avoid SSR and duplicate registration)
if (typeof window !== "undefined" && gsap && ScrollTrigger) {
  try {
    // disable lag smoothing to avoid skipped frames during scroll-driven animations
    type GsapTicker = { lagSmoothing?: (v: number) => void }
    const ticker = (gsap as unknown as { ticker?: GsapTicker }).ticker
    if (ticker && typeof ticker.lagSmoothing === "function") {
      // call with explicit typing to satisfy ESLint (no-explicit-any)
      (ticker.lagSmoothing as (v: number) => void)(0)
    }

    // register only if ScrollTrigger isn't already registered
    const core = (gsap as unknown as { core?: { globals?: () => unknown } }).core
    const globals = core && typeof core.globals === "function" ? core.globals() : null
    if (!globals || !(globals as any).ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger)
    }
  } catch {
    // ignore registration errors in unusual environments
  }
}

// Define the feature item type
type FeatureItem = {
  icon: LucideIcon
  title: string
  description: string
  label: string
  bgClass: string
  iconBgClass: string
  textClass: string
  borderClass: string
  delay: string
  animationDirection: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

// Feature data array with animation directions
const featureData: FeatureItem[] = [
  {
    icon: Building2,
    title: "Who We Are",
    description:
      "A passionate tech community of developers, innovators, and learners at RCC IIT.",
    label: "Agentic Ops",
  bgClass: "bg-brand-to-br from-green_accent1 to-green_accent2",
  iconBgClass: "bg-green-100/30",
  textClass: "text-green-500",
    borderClass: "border-green_accent1/30 hover:border-green_accent1/60",
    delay: "delay-75",
    animationDirection: "top",
  },
  {
    icon: ScreenShare,
    title: "What We Do",
    description:
      "We host workshops, hackathons, and events exploring Google technologies and beyond.",
    label: "Microsites",
  bgClass: "bg-gradient-to-br from-green_accent1 to-green_accent2",
  iconBgClass: "bg-red-100/30",
  textClass: "text-red-500",
    borderClass: "border-green_accent1/30 hover:border-green_accent1/60",
    delay: "delay-100",
    animationDirection: "top-right",
  },
  {
    icon: User2,
    title: "Our Mission",
    description:
      "Empowering students to learn, build, and create real-world tech solutions together.",
    label: "Smart Shortlist",
  bgClass: "bg-gradient-to-br from-green_accent1 to-green_accent2",
  iconBgClass: "bg-yellow-100/30",
  textClass: "text-yellow-400",
    borderClass: "border-green_accent1/30 hover:border-green_accent1/60",
    delay: "delay-150",
    animationDirection: "right",
  },
  {
    icon: Trophy,
    title: "Why Join Us",
    description:
      "“Gain skills, network globally, and grow through hands-on tech experiences and collaboration.”",
    label: "Nudges",
  bgClass: "bg-gradient-to-br from-green_accent1 to-green_accent2",
  iconBgClass: "bg-blue-100/30",
  textClass: "text-blue-500",
    borderClass: "border-green_accent1/30 hover:border-green_accent1/60",
    delay: "delay-200",
    animationDirection: "bottom-right",
  },
  {
    icon: User,
    title: "Our Impact",
    description:
      "Inspiring innovation and shaping future tech leaders within the RCC IIT community.",
    label: "Follow-ups",
  bgClass: "bg-gradient-to-br from-green_accent1 to-green_accent2",
  iconBgClass: "bg-yellow-100/30",
  textClass: "text-yellow-400",
    borderClass: "border-green_accent1/30 hover:border-green_accent1/60",
    delay: "delay-300",
    animationDirection: "left",
  },
  
  
]

// Counter animation hook
const useCountUp = (target: number, duration: number = 2000, suffix: string = "") => {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset count and start animation every time it comes into view
            setCount(0)
            
            // Cancel any existing animation
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current)
            }
            
            const startTime = Date.now()
            const startValue = 0

            const updateCount = () => {
              const elapsed = Date.now() - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeOut = 1 - Math.pow(1 - progress, 3)
              const currentCount = Math.floor(startValue + (target - startValue) * easeOut)
              
              setCount(currentCount)
              
              if (progress < 1) {
                animationRef.current = requestAnimationFrame(updateCount)
              } else {
                setCount(target)
                animationRef.current = null
              }
            }
            
            animationRef.current = requestAnimationFrame(updateCount)
          } else {
            // Reset to 0 when out of view
            setCount(0)
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current)
              animationRef.current = null
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(elementRef.current)
    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [target, duration])

  return { count, elementRef }
}

const StatsSection = () => {
  // Updated stats and text
  const stat1 = useCountUp(5, 2000)
  const stat2 = useCountUp(80, 2500)
  const stat3 = useCountUp(25, 2200)
  const stat4 = useCountUp(30, 2200)

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-10">
      <div className="text-center transform transition-all duration-700 hover:scale-105">
        <div 
          ref={stat1.elementRef}
          className={cn("text-2xl md:text-3xl lg:text-4xl font-black text-brand-primary transition-all duration-500")}
        >
           {stat1.count}×
        </div>
  <div className="text-xs md:text-sm lg:text-base text-text_grey font-semibold tracking-wide mt-1">Workshops</div>
        <div className="w-full h-0.5 bg-linear-to-r from-transparent via-brand-primary/50 to-transparent mt-1 rounded-full" />
      </div>
      <div className="text-center transform transition-all duration-700 hover:scale-105">
        <div
          ref={stat2.elementRef}
          className={cn("text-2xl md:text-3xl lg:text-4xl font-black text-brand-secondary transition-all duration-500")}
          style={{ animationDelay: "0.2s" }}
        >
           {stat2.count}%
        </div>
  <div className="text-xs md:text-sm lg:text-base text-text_grey font-semibold tracking-wide mt-1">Events</div>
        <div className="w-full h-0.5 bg-linear-to-r from-transparent via-brand-primary/50 to-transparent mt-1 rounded-full" />
      </div>
      <div className="text-center transform transition-all duration-700 hover:scale-105">
        <div
          ref={stat3.elementRef}
          className={cn("text-2xl md:text-3xl lg:text-4xl font-black text-brand-primary transition-all duration-500")}
          style={{ animationDelay: "0.4s" }}
        >
           {stat3.count}%
        </div>
  <div className="text-xs md:text-sm lg:text-base text-text_grey font-semibold tracking-wide mt-1">Hackathon</div>
        <div className="w-full h-0.5 bg-linear-to-r from-transparent via-brand-primary/50 to-transparent mt-1 rounded-full" />
      </div>
      <div className="text-center transform transition-all duration-700 hover:scale-105">
        <div
          ref={stat4.elementRef}
          className={cn("text-2xl md:text-3xl lg:text-4xl font-black text-brand-secondary transition-all duration-500")}
          style={{ animationDelay: "0.6s" }}
        >
          +20–{stat4.count}%
        </div>
  <div className="text-xs md:text-sm lg:text-base text-text_grey font-semibold tracking-wide mt-1">Networking</div>
        <div className="w-full h-0.5 bg-linear-to-r from-transparent via-brand-primary/50 to-transparent mt-1 rounded-full" />
      </div>
      <div className="text-center transform transition-all duration-700 hover:scale-105">
        <div
          className={cn("text-2xl md:text-3xl lg:text-4xl font-black text-brand-primary transition-all duration-500")}
        >
          DevFest
        </div>
        <div className="text-xs md:text-sm lg:text-base text-text_grey font-semibold tracking-wide mt-1">DevFest</div>
        <div className="w-full h-0.5 bg-linear-to-r from-transparent via-brand-primary/50 to-transparent mt-1 rounded-full" />
      </div>
    </div>
  )
}

// Feature card component
const FeatureCard = ({ feature, isGlowing }: { feature: FeatureItem; isGlowing: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const Icon = feature.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative group cursor-pointer feature-card", feature.delay, "transform transition-all duration-500")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect (dynamic color matching feature) */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-all duration-1000",
          isGlowing && "animate-pulse-glow-strong"
        )}
        style={{
          boxShadow: isGlowing
            ? feature.title === "Who We Are"
              ? "0 0 140px rgba(13, 233, 13, 0.95)"
              : feature.textClass.includes("red") || feature.textClass.includes("text-red")
              ? "0 0 120px rgba(238, 16, 16, 0.85)"
              : feature.textClass.includes("yellow") || feature.textClass.includes("text-yellow")
              ? "0 0 120px rgba(255,200,0,0.85)"
              : feature.textClass.includes("blue") || feature.textClass.includes("text-blue")
              ? "0 0 120px rgba(0,102,255,0.85)"
              : feature.textClass.includes("green") || feature.textClass.includes("text-green")
              ? "0 0 120px rgba(182, 235, 7, 0.9)"
              : "0 0 120px rgba(183, 236, 9, 0.9)"
            : "none",
        }}
      />

      {/* Shiny border effect */}
      <div
        className="absolute inset-0 rounded-xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${
            feature.textClass.includes("green_accent1")
              ? "rgba(76,92,24,0.95)"
              : feature.textClass.includes("green-700") || feature.textClass.includes("green_accent3")
              ? "rgba(21,128,61,0.95)"
              : "rgba(126,151,25,0.95)"
          } 10%, rgba(255,255,255,0.85) 30%, transparent 60%)`,
          animation: "border-shine 2.5s linear infinite",
        }}
      >
        <div className="w-full h-full rounded-xl bg-transparent" />
      </div>

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            feature.textClass.includes("green_accent1")
              ? "rgba(76, 92, 24, 0.15)"
              : feature.textClass.includes("green-700") || feature.textClass.includes("green_accent3")
              ? "rgba(21, 128, 61, 0.15)"
              : "rgba(126, 151, 25, 0.15)"
          }, transparent 40%)`,
        }}
      />

      <div
        className={cn(
          "relative rounded-xl px-4 pt-4 pb-4 text-sm overflow-hidden",
          "backdrop-blur-sm border-2 shadow-lg transition-all duration-500 ease-out transform",
          "hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/95 hover:backdrop-blur-md",
          feature.bgClass,
          feature.borderClass,
          "hover:shadow-[0_0_40px_rgba(126,151,25,0.25)]",
          isGlowing && "scale-105 shadow-2xl -translate-y-1"
        )}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/20 -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-white/15 translate-y-6 -translate-x-6" />
        </div>

        {/* Animated background particles */}
        {(isHovered || isGlowing) && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-1 h-1 rounded-full opacity-60",
                  feature.textClass.includes("green-700") ? "bg-green-700" : feature.textClass.replace("text-", "bg-")
                )}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 25}%`,
                  animation: `particle-float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div
            className={cn(
              "mb-3 p-2 rounded-lg w-fit transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-md",
              feature.iconBgClass,
              isGlowing && "scale-110 rotate-3"
            )}
          >
            <Icon size={20} className={cn("drop-shadow-sm", feature.textClass)} />
          </div>

            <h2
              className={cn(
                "mb-2 text-base md:text-lg font-bold transition-all duration-300", // increased size
                feature.textClass,
                "group-hover:opacity-90 group-hover:scale-105",
                isGlowing && "opacity-90 scale-105"
              )}
            >
              {feature.title}
            </h2>

          <p className="text-gray-700 text-base font-semibold leading-relaxed transition-colors duration-300 group-hover:text-gray-900">{/* bigger & semi-bold */}
            {feature.description}
          </p>
        </div>

        {/* Enhanced effects for glowing state */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-white/5 to-transparent transition-opacity duration-300",
            (isHovered || isGlowing) ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Decorative bottom accent line */}
        <span
          className={cn(
            "absolute -bottom-px left-1/2 h-0.5 -translate-x-1/2 transition-all duration-500",
            feature.textClass.includes("green-700") ? "bg-green-700" : feature.textClass.replace("text-", "bg-"),
            (isHovered || isGlowing) ? "w-1/2 shadow-[0_0_24px_rgba(76,92,24,0.55)]" : "w-0"
          )}
        />

        {/* Corner badge */}
        <div
          className={cn(
            "absolute top-2 right-2 px-1.5 py-0.5 rounded text-xs font-medium transition-all duration-300",
            (isHovered || isGlowing) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
            feature.iconBgClass,
            feature.textClass
          )}
        >
          {feature.label}
        </div>

        {/* Subtle inner glow */}
        <div
          className={cn(
            "absolute inset-px rounded-xl transition-opacity duration-500 bg-linear-to-br from-white/10 via-transparent to-transparent",
            (isHovered || isGlowing) ? "opacity-20" : "opacity-0"
          )}
        />
      </div>
    </div>
  )
}

// Helper function to get initial animation values based on direction
const getInitialAnimationValues = (direction: FeatureItem["animationDirection"]) => {
  switch (direction) {
    case "left":
      return { x: -200, y: 0, rotation: -15 }
    case "right":
      return { x: 200, y: 0, rotation: 15 }
    case "top":
      return { x: 0, y: -150, rotation: 10 }
    case "bottom":
      return { x: 0, y: 150, rotation: -10 }
    case "top-left":
      return { x: -150, y: -150, rotation: -20 }
    case "top-right":
      return { x: 150, y: -150, rotation: 20 }
    case "bottom-left":
      return { x: -150, y: 150, rotation: 20 }
    case "bottom-right":
      return { x: 150, y: 150, rotation: -20 }
    default:
      return { x: 0, y: 100, rotation: 10 }
  }
}

function EnhancedFeatureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentGlowIndex, setCurrentGlowIndex] = useState(0)

  // Glow cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGlowIndex((prev) => (prev + 1) % featureData.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Scroll animations
  useEffect(() => {
    if (!sectionRef.current) return
    const section = sectionRef.current
    const cards = section.querySelectorAll<HTMLElement>(".feature-card")

    // Set initial state
    cards.forEach((card, index) => {
      const feature = featureData[index]
      if (!feature) return
      const initial = getInitialAnimationValues(feature.animationDirection)
      gsap.set(card, { x: initial.x, y: initial.y, opacity: 0, scale: 0.7, rotation: initial.rotation })
    })

    // Animate cards using gsap.fromTo with scrollTrigger for smoother, declarative animations
    const tweens: gsap.core.Tween[] = []
    cards.forEach((card, index) => {
      const feature = featureData[index]
      if (!feature) return
      const initial = getInitialAnimationValues(feature.animationDirection)

      const tween = gsap.fromTo(
        card,
        { x: initial.x, y: initial.y, opacity: 0, scale: 0.7, rotation: initial.rotation },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
            // markers: true, // enable while debugging
          },
        }
      )

      tweens.push(tween)
    })

    // Force a refresh after layout changes
    try {
      ScrollTrigger.refresh()
    } catch (e) {
      // ignore
    }

    // Debug: log how many triggers were created
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug("ScrollTriggers:", ScrollTrigger.getAll().length)
    }

    return () => {
      tweens.forEach(t => t.kill && t.kill())
      try { ScrollTrigger.getAll().forEach(t => t.kill()) } catch (e) {}
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-16 relative overflow-visible text-black bg-[#fdfcec]"
      id="features"
    >
        <BGPattern variant="grid" mask="fade-y" fill="#808080" size={50} className="z-0" />
      {/* Background dots removed */}
      <h2 className="text-3xl">GDGC On Campus RCC-IIT</h2>
    <div className="bg-blur absolute top-20 left-10 w-72 h-72 bg-green_accent3/20 rounded-full blur-3xl animate-pulse-glow z-10" />
    <div className="bg-blur absolute bottom-20 right-10 w-96 h-96 bg-green_accent2/20 rounded-full blur-3xl animate-pulse-glow z-10" style={{ animationDelay: "0.1s" }} />
    <div className="bg-blur absolute top-1/2 left-1/2 w-64 h-64 bg-green_accent1/15 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow z-10" style={{ animationDelay: "2s" }} />
  {/* Subtle dot overlay removed */}

      <div className="relative mx-6 pt-8 pb-12 max-[300px]:mx-4 min-[1450px]:mx-auto">
        {/* Desktop circular layout */}
        <div className="hidden lg:block relative mx-auto" style={{ width: "1200px", height: "700px", maxWidth: "95vw" }}>
    <div className="relative w-full h-full z-10">
            {featureData.map((feature, index) => {
              const angle = (index * 72 - 90) * (Math.PI / 180)
              // Use elliptical radii to pull top card closer while keeping horizontal spread
              const radiusX = 430 // keep horizontal distance
              const radiusY = 360 // reduced from 430 to close vertical gap above heading
              let x = Math.cos(angle) * radiusX
              let y = Math.sin(angle) * radiusY
              // Slight downward nudge for specific cards that overlap center content
              const lowerTitles = new Set(["Our Mission", "Why Join Us"])
              const specialYOffset = lowerTitles.has(feature.title) ? 40 : 0
              y += specialYOffset
              // Nudge left/right for specific features to avoid overlap
              const specialXLeft = feature.title === "Our Impact" ? -40 : 0
              const specialXRight = feature.title === "What We Do" ? 40 : 0
              x += specialXLeft + specialXRight
              return (
                <div
                  key={`feature-${index}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    width: "280px",
                  }}
                >
                  <FeatureCard feature={feature} isGlowing={currentGlowIndex === index} />
                </div>
              )
            })}
          </div>

          {/* Center content */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
            

            <h2 className="text-black max-w-xl pl-8 mb-4 text-center text-3xl lg:text-6xl font-bold leading-tight font-lemon-milk">
              Oncampus <span aria-hidden className="inline-flex items-center gap-0 font-lemon-milk">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">D</span>
                <span className="text-green-500">G</span>
                <span className="text-yellow-500">C</span>
              </span>  <span className="text-brand-secondary">RCCIIT</span>
            </h2>

            {/* Removed descriptive paragraph */}
            <StatsSection />
          </div>
        </div>

        {/* Tablet layout */}
        <div className="hidden md:block lg:hidden">
          <div className="text-center mb-6">
            <div className="bg-app-card/90 text-green_accent1 ring-green_accent3/40 relative mx-auto mb-3 w-fit rounded-full rounded-bl-sm px-3 py-1.5 text-xs ring-2 backdrop-blur-sm shadow-lg border border-green_accent3/30">
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <Lightbulb size={12} className="text-green_accent2" />
                AI Features
              </span>
              <span className="from-green_accent3/0 via-green_accent3 to-green_accent3/0 absolute -bottom-px left-1/2 h-0.5 w-2/5 -translate-x-1/2 bg-linear-to-r" />
              <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,theme(colors.green\_accent3/0.25)_0%,transparent_100%)] rounded-full" />
            </div>

            <h2 className="text-black mb-4 text-center text-2xl font-bold leading-tight font-lemon-milk">
              We Deliver Results
            </h2>
            {/* Removed descriptive paragraph */}
            <StatsSection />
          </div>

          <div className="relative mx-auto" style={{ width: "800px", height: "450px", maxWidth: "95vw" }}>
              {featureData.slice(0, 3).map((feature, index) => {
              const angle = (index * 50 - 50) * (Math.PI / 180)
              const radius = 250 // increased from 220 for more spacing
              let x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius - 40
              // small tablet horizontal adjustments
              const tabletShift = feature.title === "Our Impact" ? -20 : feature.title === "What We Do" ? 20 : 0
              x += tabletShift
              return (
                <div key={`tablet-top-${index}`} className="absolute" style={{ left: "50%", top: "30%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, width: "220px" }}>
                  <FeatureCard feature={feature} isGlowing={currentGlowIndex === index} />
                </div>
              )
            })}

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-6">
              {featureData.slice(3).map((feature, index) => {
                const tabletShift = feature.title === "Our Impact" ? -20 : feature.title === "What We Do" ? 20 : 0
                return (
                  <div key={`tablet-bottom-${index}`} style={{ width: "220px", transform: `translateX(${tabletShift}px)` }}>
                    <FeatureCard feature={feature} isGlowing={currentGlowIndex === index + 3} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="block md:hidden">
          <div className="text-center mb-8 px-4">
            <div className="bg-app-card/90 text-green_accent1 ring-green_accent3/40 relative mx-auto mb-4 w-fit rounded-full rounded-bl-sm px-4 py-2 text-sm ring-2 backdrop-blur-sm shadow-lg border border-green_accent3/30">
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <Lightbulb size={16} className="text-green_accent2" />
                AI Features
              </span>
              <span className="from-green_accent3/0 via-green_accent3 to-green_accent3/0 absolute -bottom-px left-1/2 h-0.5 w-2/5 -translate-x-1/2 bg-linear-to-r" />
              <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,theme(colors.green\_accent3/0.25)_0%,transparent_100%)] rounded-full" />
            </div>

            <h2 className="text-black mb-6 text-center text-3xl font-bold leading-tight font-lemon-milk">
              We Deliver Results
            </h2>
            {/* Removed descriptive paragraph */}
            <StatsSection />
          </div>

          <div className="space-y-4 px-4 max-w-md mx-auto">
            {featureData.map((feature, index) => (
              <div key={`mobile-feature-${index}`} className="w-full">
                <FeatureCard feature={feature} isGlowing={currentGlowIndex === index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-shine { 0% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }
        @keyframes particle-float { 0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; } 50% { transform: translateY(-10px) rotate(180deg); opacity: 0.8; } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
  @keyframes pulse-glow-strong { 0% { opacity: 0.55; transform: scale(0.98); } 50% { opacity: 0.95; transform: scale(1.06); } 100% { opacity: 0.6; transform: scale(1); } }
  @keyframes bounce-in { 0% { transform: scale(0.3) rotate(-10deg); opacity: 0; } 50% { transform: scale(1.1) rotate(5deg); } 70% { transform: scale(0.9) rotate(-2deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
  @keyframes border-shine { 0% { transform: rotate(0deg); } 50% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-pulse-glow-strong { animation: pulse-glow-strong 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
      `}</style>
    </section>
  )
}

export default EnhancedFeatureSection