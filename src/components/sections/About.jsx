import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    number: '01',
    title: 'Consulta',
    description:
      'Analizamos sus necesidades y requerimientos técnicos para ofrecer la mejor solución.',
  },
  {
    number: '02',
    title: 'Solución',
    description:
      'Diseñamos una propuesta integral con los equipos y servicios que mejor se adapten.',
  },
  {
    number: '03',
    title: 'Entrega',
    description:
      'Suministro puntual con soporte técnico continuo y garantía de calidad.',
  },
]

export function About({ onContactClick }) {
  const itemsRef = useRef([])
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const validItems = itemsRef.current.filter(Boolean)
      validItems.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          x: 20,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        })
      })
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-28 bg-gray-50 clip-slant relative"
    >
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Visual Side */}
          <div className="w-full lg:w-1/2 relative lg:sticky lg:top-32 order-1">
            <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden border border-gray-200 shadow-xl bg-gray-100 aspect-[4/3] sm:aspect-square group">
              {/* Skeleton loader */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
                </div>
              )}
              {/* Real Image */}
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop"
                alt="Industrial valve and instrumentation equipment in petroleum facility"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {imageError && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image unavailable</span>
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>

              {/* Floating Card */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 shadow-lg rounded-xl sm:rounded-2xl max-w-[200px] sm:max-w-[220px] lg:max-w-[240px]">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-[0.5rem] sm:text-[0.6rem] font-bold text-gray-700 uppercase tracking-widest">
                    Desde 2012
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
                  12<span className="text-red-500">+</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  Años de Excelencia
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 pt-4 sm:pt-0 lg:pt-8 order-2">
            <h2 className="text-red-500 font-bold text-xs tracking-[0.2em] uppercase mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
              <span className="w-6 sm:w-8 h-[1px] bg-red-500"></span>
              Nosotros
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
              ¿Quiénes <br />
              <span className="text-gray-400">Somos?</span>
            </h3>
            <p className="text-gray-500 mb-10 sm:mb-12 lg:mb-16 leading-relaxed text-base sm:text-lg font-light">
              Somos una empresa 100% mexicana con más de 12 años de experiencia en el
              suministro de válvulas, instrumentación y equipos para la industria
              petrolera, petroquímica y de energía. Contamos con certificación ISO 9001:2015
              y representamos a las marcas más reconocidas del mercado internacional.
            </p>

            <div className="space-y-8 sm:space-y-10 lg:space-y-12 border-l border-gray-200 pl-6 sm:pl-8 lg:pl-12">
              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="process-item group"
                >
                  <span className="text-xs font-bold text-red-500 mb-2 sm:mb-3 block tracking-widest">
                    {step.number}
                  </span>
                  <h4 className="text-xl sm:text-2xl text-gray-900 font-medium mb-2 sm:mb-3 group-hover:text-red-500 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-16">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-3 text-gray-900 font-bold uppercase text-xs tracking-widest group"
              >
                <span className="pb-1 border-b-2 border-red-500 group-hover:border-gray-900 transition-colors">
                  Contáctanos
                </span>
                <span className="text-red-500 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
