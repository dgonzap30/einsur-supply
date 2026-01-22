import { useState } from 'react'

const projects = [
  {
    image:
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2070&auto=format&fit=crop',
    alt: 'Oil refinery with complex valve and piping systems at sunset',
    location: 'Refinería, Veracruz',
    locationColor: 'text-red-500',
    dotColor: 'bg-red-500',
    title: 'Sistema de Control PEMEX',
    description:
      'Suministro e instalación de válvulas de control y seguridad para sistema de procesamiento de crudo. Más de 200 válvulas de diferentes especificaciones y actuadores.',
    hoverBorder: 'group-hover:border-red-500',
    layout: 'left',
  },
  {
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    alt: 'Industrial petrochemical plant with modern instrumentation systems',
    location: 'Planta Petroquímica, Tamaulipas',
    locationColor: 'text-emerald-500',
    dotColor: 'bg-emerald-500',
    title: 'Automatización Industrial',
    description:
      'Proyecto integral de instrumentación y automatización para planta de procesamiento. Incluye transmisores, controladores y sistemas de medición de flujo.',
    hoverBorder: 'group-hover:border-emerald-500',
    layout: 'right',
  },
]

function ProjectCard({ project, index }) {
  const isRight = project.layout === 'right'
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`group relative mb-16 sm:mb-20 lg:mb-28 last:mb-0 ${
        isRight ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Container with overlapping layout */}
      <div className={`relative flex flex-col lg:flex-row ${isRight ? 'lg:flex-row-reverse' : ''} items-stretch`}>
        {/* Image Container */}
        <div className="relative w-full lg:w-[65%] overflow-hidden rounded-2xl sm:rounded-3xl aspect-[16/10] cursor-pointer">
          {/* Skeleton loader */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
            </div>
          )}
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {imageError && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image unavailable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
        </div>

        {/* Card - overlapping on desktop */}
        <div
          className={`relative lg:absolute ${
            isRight
              ? 'lg:left-0 lg:top-1/2 lg:-translate-y-1/2'
              : 'lg:right-0 lg:top-1/2 lg:-translate-y-1/2'
          } w-full lg:w-[45%] mt-[-2rem] lg:mt-0 z-20 px-4 sm:px-6 lg:px-0`}
        >
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300 transition-all">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <span className={`w-2 h-2 ${project.dotColor} rounded-full animate-pulse`}></span>
              <span
                className={`${project.locationColor} text-[0.6rem] sm:text-xs font-bold uppercase tracking-[0.2em]`}
              >
                {project.location}
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-gray-900 mb-4">
              {project.title}
            </h4>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>
            <a
              href="#"
              className={`inline-flex items-center gap-2 text-xs text-gray-900 font-bold uppercase tracking-widest border-b-2 border-gray-300 pb-1 ${project.hoverBorder} hover:gap-4 transition-all cursor-pointer`}
            >
              Ver Proyecto
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 lg:mb-20">
          <div>
            <h2 className="text-red-500 font-bold text-xs tracking-[0.2em] uppercase mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
              <span className="w-6 sm:w-8 h-[1px] bg-red-500"></span>
              Proyectos Destacados
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-gray-900 leading-tight">
              Casos de <span className="text-gray-400">Éxito</span>
            </h3>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-gray-900 hover:text-red-500 transition-colors mt-6 md:mt-0 font-bold uppercase text-xs tracking-widest pb-2 border-b border-gray-300 hover:border-red-500"
          >
            Ver Todos
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Project Cards */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
