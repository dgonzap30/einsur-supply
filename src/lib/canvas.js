export class ParticleSystem {
  constructor(container) {
    this.container = container
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.particles = []
    this.mouse = { x: null, y: null, radius: 250 }
    this.animationId = null

    this.container.appendChild(this.canvas)
    this.init()
  }

  init() {
    this.resize()
    this.createParticles()
    this.bindEvents()
    this.animate()
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  createParticles() {
    this.particles = []
    const isMobile = window.innerWidth < 768
    const particleCount = Math.min(this.width / (isMobile ? 25 : 15), 60)

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.width, this.height))
    }
  }

  bindEvents() {
    this.handleResize = () => {
      this.resize()
      this.createParticles()
    }

    this.handleMouseMove = (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    }

    this.handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX
        this.mouse.y = e.touches[0].clientY
      }
    }

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true })
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    const isMobile = this.width < 768
    const connectDist = isMobile ? 80 : 150
    const mouseRadius = isMobile ? 100 : this.mouse.radius

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]
      p.update(this.mouse, mouseRadius, this.width, this.height)
      p.draw(this.ctx)

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectDist) {
          this.ctx.beginPath()
          this.ctx.strokeStyle = `rgba(75, 75, 158, ${0.15 - (distance / connectDist) * 0.15})`
          this.ctx.lineWidth = 0.5
          this.ctx.moveTo(p.x, p.y)
          this.ctx.lineTo(p2.x, p2.y)
          this.ctx.stroke()
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('touchmove', this.handleTouchMove)
    this.canvas.remove()
  }
}

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.15
    this.vy = (Math.random() - 0.5) * 0.15
    this.size = Math.random() * 1.5
    this.density = (Math.random() * (width < 768 ? 10 : 20)) + 1
  }

  update(mouse, mouseRadius, width, height) {
    if (mouse.x !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouseRadius) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (mouseRadius - distance) / mouseRadius
        const directionX = forceDirectionX * force * this.density * 0.6
        const directionY = forceDirectionY * force * this.density * 0.6
        this.x -= directionX
        this.y -= directionY
      }
    }

    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(75, 75, 158, 0.4)'
    ctx.fill()
  }
}
