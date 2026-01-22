export function Badge({ children, pulse = false, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 lg:gap-4 px-4 py-2 rounded-full bg-navy-500 text-white text-[0.6rem] lg:text-[0.65rem] font-bold tracking-[0.2em] uppercase ${className}`}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
        </span>
      )}
      {children}
    </div>
  )
}
