import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar, Footer } from './components/layout'
import { Hero, Stats, Services, About, Projects, News } from './components/sections'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { ContactModal } from './components/ui/ContactModal'

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const openContact = () => setIsContactOpen(true)
  const closeContact = () => setIsContactOpen(false)

  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar onContactClick={openContact} />

      {/* Main Content */}
      <main>
        <Hero onContactClick={openContact} />
        <Stats />
        <Services />
        <About onContactClick={openContact} />
        <Projects />
        <News />
      </main>

      {/* Footer */}
      <Footer onContactClick={openContact} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </>
  )
}

export default App
