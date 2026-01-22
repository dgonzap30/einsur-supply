export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'font-bold rounded-xl overflow-hidden transition-all duration-300 relative group'

  const variants = {
    primary: 'px-8 py-4 bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg',
    secondary: 'px-8 py-3 bg-navy-500 border border-navy-500 text-white text-[0.65rem] uppercase tracking-widest rounded-full hover:bg-navy-600 active:scale-95',
    ghost: 'text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-3 uppercase tracking-widest py-3 active:scale-95',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export function ButtonLink({ children, href = '#', className = '', ...props }) {
  return (
    <a
      href={href}
      className={`text-xs font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-3 uppercase tracking-widest group py-3 ${className}`}
      {...props}
    >
      <span className="w-8 h-[1px] bg-slate-300 group-hover:bg-red-500 transition-colors"></span>
      {children}
    </a>
  )
}
