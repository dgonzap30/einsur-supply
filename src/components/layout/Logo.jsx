export function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 group cursor-pointer z-50 relative">
      <div className="relative h-10 lg:h-12">
        <img
          src="/einsur-logo.svg"
          alt="Einsur Supply"
          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </a>
  )
}
