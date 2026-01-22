import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const newsItems = [
  {
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop',
    alt: 'Industrial valves and instrumentation equipment',
    date: 'Ene 15, 2026',
    title: 'Nuevas Alianzas con Fabricantes Europeos',
    excerpt:
      'Einsur Supply amplía su catálogo con la incorporación de nuevas marcas líderes en válvulas de alta presión y actuadores neumáticos.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop',
    alt: 'Engineer checking industrial equipment',
    date: 'Dic 20, 2025',
    title: 'Certificación ISO 9001:2015 Renovada',
    excerpt:
      'Reafirmamos nuestro compromiso con la calidad al renovar exitosamente nuestra certificación ISO por tercer año consecutivo.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2070&auto=format&fit=crop',
    alt: 'Modern industrial facility',
    date: 'Nov 08, 2025',
    title: 'Expansión de Servicios Técnicos',
    excerpt:
      'Inauguramos nuevo centro de servicio técnico especializado en calibración de instrumentos y mantenimiento de válvulas.',
  },
]

function NewsCard({ item }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <a href="#" className="group news-card block">
      <div className="overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] mb-4 sm:mb-6 relative">
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          </div>
        )}
        <img
          src={item.image}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`news-card-img w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          alt={item.alt}
        />
        {imageError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image unavailable</span>
          </div>
        )}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-navy-500 px-2.5 py-1 sm:px-3 rounded-full text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-widest text-white">
          {item.date}
        </div>
      </div>
      <h4 className="text-lg sm:text-xl font-display font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-500 transition-colors">
        {item.title}
      </h4>
      <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
      <span className="inline-block mt-3 sm:mt-4 text-xs font-bold text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
        Leer Más →
      </span>
    </a>
  )
}

export function News() {
  const cardsRef = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const validCards = cardsRef.current.filter(Boolean)
      if (validCards.length === 0) return

      gsap.from(validCards, {
        scrollTrigger: {
          trigger: '#news',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="news" className="py-16 sm:py-24 border-t border-gray-200 bg-gray-50">
      <div className="container">
        <h2 className="text-red-500 font-bold text-xs tracking-[0.2em] uppercase mb-8 sm:mb-12 text-center">
          Noticias & Novedades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsItems.map((item, index) => (
            <div key={item.title} ref={(el) => (cardsRef.current[index] = el)}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
