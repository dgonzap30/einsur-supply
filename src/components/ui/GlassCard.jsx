import { forwardRef } from 'react'

export const GlassCard = forwardRef(function GlassCard(
  { children, className = '', hover = true, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`glass-card rounded-[2rem] ${hover ? 'hover-lift' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
