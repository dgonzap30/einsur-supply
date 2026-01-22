import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { href: '#hero', label: 'Inicio' },
  { href: '#about', label: 'Nosotros' },
  { href: '#stats', label: 'Marcas' },
  { href: '#services', label: 'Servicios' },
]

export function Navbar({ onContactClick }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : ''
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-navy-500 text-white text-xs py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lun - Vie: 9:00 - 18:00
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contacto@einsursupply.com.mx
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +52 (55) 1234-5678
          </div>
        </div>
      </div>

      <nav
        className={`fixed w-full z-50 transition-all duration-700 border-b ${
          isScrolled
            ? 'bg-white shadow-sm border-gray-200 py-4'
            : 'border-transparent py-5 lg:py-6 bg-white/80 backdrop-blur-sm'
        } ${isScrolled ? 'top-0' : 'lg:top-10 top-0'}`}
      >
        <div className="container flex justify-between items-center">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-slate-600 hover:text-red-500 transition-colors tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={onContactClick}
            className="hidden md:block px-8 py-3 bg-red-500 border border-red-500 text-white text-[0.65rem] font-bold uppercase tracking-widest rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-500 group"
          >
            Contacto
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-navy-500 z-50 p-2 relative group w-10 h-10 flex items-center justify-center"
          >
            <div className="space-y-1.5 w-6">
              <span
                className={`block w-full h-[2px] bg-navy-500 transition-transform duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block w-3/4 h-[2px] bg-navy-500 ml-auto transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-full h-[2px] bg-navy-500 transition-transform duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        links={navLinks}
        onClose={closeMobileMenu}
      />
    </>
  )
}
