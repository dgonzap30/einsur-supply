import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useCounter(target, duration = 2.5) {
  const ref = useRef(null)
  const hasAnimatedRef = useRef(false)
  const triggerRef = useRef(null)

  const animate = useCallback(() => {
    const element = ref.current
    if (!element || hasAnimatedRef.current) return

    hasAnimatedRef.current = true
    gsap.fromTo(
      element,
      { innerHTML: 0 },
      {
        innerHTML: target,
        duration,
        snap: { innerHTML: 1 },
        ease: 'power2.out',
      }
    )
  }, [target, duration])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: element,
        start: 'top 95%',
        once: true,
        onEnter: animate,
      })

      // Refresh ScrollTrigger to catch elements already in view
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (triggerRef.current) {
        triggerRef.current.kill()
      }
    }
  }, [animate])

  return ref
}
