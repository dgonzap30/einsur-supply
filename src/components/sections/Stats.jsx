import { useCounter } from '../../hooks/useCounter'

const stats = [
  { target: 12, label: 'Años de Experiencia', suffix: '+' },
  { target: 500, label: 'Proyectos Completados', suffix: '+' },
  { target: 15, label: 'Marcas Representadas', suffix: '+' },
  { target: 9001, label: 'ISO Certificación', suffix: '', isISO: true },
]

const partners = [
  'SAMSON',
  'YOKOGAWA',
  'CAMERON',
  'AUMA',
  'APOLLO',
  'POWELL',
  'CURTISS WRIGHT',
  'WIKA',
  'ARCA',
  'ARTES',
  'VON ROHR',
  'FELUWA',
  'WEKA',
  'ASCO',
]

function StatItem({ target, label, suffix, isISO }) {
  const counterRef = useCounter(target)

  return (
    <div className="text-left group cursor-default">
      <div className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-light text-gray-900 mb-2 group-hover:text-red-500 transition-colors duration-500">
        {isISO ? (
          <span>ISO</span>
        ) : (
          <>
            <span ref={counterRef}>0</span>
            {suffix}
          </>
        )}
      </div>
      <div className="h-[1px] w-8 lg:w-12 bg-red-500/50 mb-3 group-hover:w-full transition-all duration-700 ease-out"></div>
      <div className="text-[0.55rem] sm:text-[0.6rem] text-gray-500 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
        {isISO ? '9001:2015' : label}
      </div>
    </div>
  )
}

function PartnerLogo({ name }) {
  return (
    <span className="text-sm sm:text-base lg:text-lg font-display font-bold text-gray-400 hover:text-red-500 tracking-widest whitespace-nowrap transition-colors duration-300 px-2">
      {name}
    </span>
  )
}

export function Stats() {
  return (
    <section
      id="stats"
      className="border-y border-gray-200 bg-gray-50"
    >
      <div className="container py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-8 md:gap-10 lg:gap-14 xl:gap-16 mb-0">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Infinite Marquee - Partner Brands */}
      <div className="border-t border-gray-200 py-5 sm:py-6 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="marquee-container">
          <div className="flex gap-8 sm:gap-12 lg:gap-16 animate-scroll items-center opacity-95 hover:[animation-play-state:paused] transition-all duration-500">
            {/* Triple partners for seamless loop */}
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <PartnerLogo key={`${partner}-${index}`} name={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
