import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Badge } from '../ui'
import { Button } from '../ui/Button'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export function Hero({ onContactClick }) {
  const heroRef = useRef(null)

  // Content refs
  const contentRef = useRef(null)
  const badgeRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const [animationComplete, setAnimationComplete] = useState(false)

  // Store reduced motion preference
  const prefersReducedMotionRef = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip animations, show content immediately
      gsap.set(
        [
          badgeRef.current,
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          descriptionRef.current,
          buttonsRef.current,
          scrollIndicatorRef.current,
        ],
        { opacity: 1, y: 0, x: 0 }
      )
      setAnimationComplete(true)
      return
    }

    // Set initial states
    gsap.set(
      [
        badgeRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        descriptionRef.current,
        buttonsRef.current,
      ],
      { opacity: 0 }
    )
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 })

    // Master timeline - simplified entrance animation
    const masterTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => setAnimationComplete(true),
    })

    // Badge drops in
    masterTl.fromTo(
      badgeRef.current,
      {
        y: -40,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      },
      0.2
    )

    // Line 1: "Lideres en el"
    masterTl.fromTo(
      line1Ref.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power4.out',
      },
      0.4
    )

    // Line 2: "Suministro de Valvulas"
    masterTl.fromTo(
      line2Ref.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
      },
      0.6
    )

    // Line 3: "e Instrumentacion"
    masterTl.fromTo(
      line3Ref.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      },
      0.8
    )

    // Description slides in
    masterTl.fromTo(
      descriptionRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      },
      1.0
    )

    // Buttons appear
    masterTl.fromTo(
      buttonsRef.current?.children || [],
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      },
      1.2
    )

    // Scroll indicator appears
    masterTl.fromTo(
      scrollIndicatorRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      1.5
    )

    // Scroll-triggered animations
    const scrollCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '50% top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(contentRef.current, {
            opacity: 1 - progress * 0.7,
            scale: 1 - progress * 0.05,
            y: -progress * 30,
          })
        },
      })
    })

    return () => {
      masterTl.kill()
      scrollCtx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Subtle floating animation for badge after entrance
  useEffect(() => {
    if (!animationComplete || prefersReducedMotionRef.current) return

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
    floatTl.to(badgeRef.current, {
      y: -3,
      duration: 3,
      ease: 'sine.inOut',
    })

    return () => {
      floatTl.kill()
    }
  }, [animationComplete])

  return (
    <header
      ref={heroRef}
      id="hero"
      className="relative w-full hero-height flex items-center justify-center overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-12 lg:pt-20 lg:pb-12 bg-gradient-to-b from-slate-50 to-white"
    >
      <div ref={contentRef} className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div ref={badgeRef}>
            <Badge pulse className="mb-3 sm:mb-4 lg:mb-5">
              ISO 9001:2015 Certificados
            </Badge>
          </div>

          <h1 className="font-display text-[2.5rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-light sm:leading-[1.05] md:leading-[0.95] mb-4 sm:mb-6 lg:mb-8 tracking-tighter text-slate-800">
            <span ref={line1Ref} className="block overflow-hidden">
              <span className="inline-block">Lideres en el</span>
            </span>
            <span ref={line2Ref} className="block overflow-hidden">
              <span className="inline-block font-bold text-navy-500">
                Suministro de Valvulas
              </span>
            </span>
            <span ref={line3Ref} className="block overflow-hidden">
              <span className="inline-block text-slate-400 font-light">
                e Instrumentacion
              </span>
            </span>
          </h1>

          <p
            ref={descriptionRef}
            className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed lg:leading-loose font-light px-2"
          >
            Somos una empresa 100% mexicana con mas de 12 anos de experiencia,
            especializada en el suministro de valvulas, instrumentacion y equipos
            para la industria petrolera, petroquimica y de energia.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center w-full px-4 sm:px-6"
          >
            <Button
              className="w-full sm:w-auto"
              onClick={() =>
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span className="flex items-center justify-center gap-2 tracking-wide text-sm">
                Nuestros Servicios
              </span>
            </Button>

            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-navy-500/30 text-navy-500 text-sm font-bold rounded-xl hover:bg-navy-500 hover:text-white hover:border-navy-500 transition-all duration-300"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-navy-500/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-navy-500 rounded-full animate-bounce" />
        </div>
        <span className="text-[0.6rem] uppercase tracking-widest text-slate-400">
          Scroll
        </span>
      </div>
    </header>
  )
}
