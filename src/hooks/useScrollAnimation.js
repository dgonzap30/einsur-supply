import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const {
      y = 50,
      x = 0,
      opacity = 0,
      duration = 1,
      delay = 0,
      start = 'top 85%',
      ease = 'power3.out',
      stagger = 0,
    } = options

    const ctx = gsap.context(() => {
      gsap.from(element.children.length > 0 && stagger ? element.children : element, {
        scrollTrigger: {
          trigger: element,
          start,
        },
        y,
        x,
        opacity,
        duration,
        delay,
        stagger,
        ease,
      })
    })

    return () => ctx.revert()
  }, [options])

  return ref
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: 100 * speed,
        ease: 'none',
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}
