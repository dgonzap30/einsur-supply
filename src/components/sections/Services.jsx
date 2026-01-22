import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlassCard } from '../ui'

gsap.registerPlugin(ScrollTrigger)

const serviceCards = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-gray-500 group-hover:text-red-500 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    title: 'Suministro',
    description:
      'Válvulas de control, seguridad, alivio, compuerta, globo, bola y mariposa. Instrumentación de las mejores marcas del mercado para la industria petrolera y petroquímica.',
    tag: '01 / Válvulas',
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-gray-500 group-hover:text-red-500 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Servicios',
    description:
      'Mantenimiento preventivo y correctivo, calibración de instrumentos, reparación de válvulas y actuadores. Servicio técnico especializado con personal certificado.',
    tag: '02 / Mantenimiento',
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-gray-500 group-hover:text-red-500 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.2"
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>
    ),
    title: 'Proyectos',
    description:
      'Soluciones integrales de ingeniería para proyectos de infraestructura industrial. Diseño, suministro e instalación de sistemas completos de control y automatización.',
    tag: '03 / Ingeniería',
  },
]

export function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Wait for refs to be populated
    const timer = setTimeout(() => {
      const validCards = cardsRef.current.filter(Boolean)
      if (validCards.length === 0) return

      const isMobile = window.innerWidth < 768

      if (isMobile) {
        validCards.forEach((card) => {
          gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            }
          )
        })
      } else {
        gsap.fromTo(validCards,
          { y: 80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 relative bg-white" ref={sectionRef}>
      <div className="container relative z-10">
        <div className="mb-10 sm:mb-12 lg:mb-16 xl:mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-red-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 sm:mb-6 flex items-center justify-center gap-3 sm:gap-4">
            <span className="w-6 sm:w-8 h-[1px] bg-red-500"></span>
            Nuestros Servicios
            <span className="w-6 sm:w-8 h-[1px] bg-red-500"></span>
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-light text-gray-900 leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6">
            ¿Qué <span className="text-gray-400">Ofrecemos?</span>
          </h3>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Soluciones integrales para la industria petrolera, petroquímica y de energía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {serviceCards.map((card, index) => (
            <GlassCard
              key={card.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="stagger-card p-6 sm:p-8 lg:p-10 group flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] cursor-pointer"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div>
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 lg:mb-10 border border-gray-200 transition-all duration-500 group-hover:bg-red-50 group-hover:border-red-200"
                >
                  {card.icon}
                </div>
                <h4 className="text-2xl sm:text-2xl lg:text-3xl font-display font-medium text-gray-900 mb-3 sm:mb-4">
                  {card.title}
                </h4>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {card.description}
                </p>
              </div>
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-widest text-red-500">
                  {card.tag}
                </span>
                <span className="text-gray-900 text-lg group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
