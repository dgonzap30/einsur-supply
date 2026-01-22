import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function MobileMenu({ isOpen, links, onClose }) {
  const menuRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power4.out' })
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.2, ease: 'back.out' }
      )
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power4.in' })
    }
  }, [isOpen])

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-40 bg-white backdrop-blur-3xl flex flex-col justify-center items-center md:hidden translate-x-full"
    >
      <div className="flex flex-col space-y-8 text-center">
        {links.map((link, index) => (
          <a
            key={link.href}
            ref={(el) => (linksRef.current[index] = el)}
            href={link.href}
            onClick={handleLinkClick}
            className="text-3xl font-display font-light text-gray-900 hover:text-red-500 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      <button
        ref={(el) => (linksRef.current[links.length] = el)}
        onClick={handleLinkClick}
        className="mt-12 px-8 py-4 bg-red-500 text-white font-bold rounded-full uppercase tracking-widest text-xs hover:bg-red-600 transition-colors"
      >
        Solicitar Informe
      </button>
    </div>
  )
}
