export class IndustrialParticleSystem {
  constructor(container, options = {}) {
    this.container = container
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Configuration
    const isMobile = window.innerWidth < 768
    const isLowPower = navigator.hardwareConcurrency <= 4

    this.config = {
      nodeCount: options.nodeCount || (isMobile ? 20 : isLowPower ? 30 : 45),
      connectionDistance: isMobile ? 100 : 180,
      nodeSize: { min: 2, max: 6 },
      colors: {
        primary: '#4B4B9E',
        secondary: '#64748b',
        glow: 'rgba(75, 75, 158, 0.6)',
      },
      pressure: {
        mouseRadius: isMobile ? 150 : 300,
        flowSpeed: 0.8,
        pulseFrequency: 0.02,
      },
      enableGlow: !isMobile,
      enableFlowIndicators: !isMobile,
      frameSkip: isMobile ? 2 : 1,
    }

    // State
    this.nodes = []
    this.mouse = { x: null, y: null }
    this.time = 0
    this.frameCount = 0
    this.intensity = 1
    this.animationId = null
    this.width = 0
    this.height = 0

    // Reduced motion check
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    this.container.appendChild(this.canvas)
    this.init()
  }

  init() {
    this.resize()
    this.createNodes()
    this.bindEvents()

    if (this.prefersReducedMotion) {
      this.drawStatic()
    } else {
      this.animate()
    }
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  createNodes() {
    this.nodes = []

    for (let i = 0; i < this.config.nodeCount; i++) {
      const depth = Math.random() // 0 = far, 1 = near
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size:
          this.config.nodeSize.min +
          Math.random() * (this.config.nodeSize.max - this.config.nodeSize.min),
        pressure: 0.1 + Math.random() * 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
        type: Math.random() > 0.7 ? 'valve' : 'junction',
        depth, // Depth layer for parallax/speed variation
      })
    }
  }

  bindEvents() {
    this.handleResize = () => {
      this.resize()
      this.createNodes()
    }

    this.handleMouseMove = (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    }

    this.handleMouseLeave = () => {
      this.mouse.x = null
      this.mouse.y = null
    }

    this.handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX
        this.mouse.y = e.touches[0].clientY
      }
    }

    this.handleTouchEnd = () => {
      this.mouse.x = null
      this.mouse.y = null
    }

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseleave', this.handleMouseLeave)
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true })
    window.addEventListener('touchend', this.handleTouchEnd)
  }

  setIntensity(value) {
    this.intensity = Math.max(0, Math.min(1, value))
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  interpolateColor(color1, color2, factor) {
    const c1 = this.hexToRgb(color1)
    const c2 = this.hexToRgb(color2)

    const r = Math.round(c1.r + (c2.r - c1.r) * factor)
    const g = Math.round(c1.g + (c2.g - c1.g) * factor)
    const b = Math.round(c1.b + (c2.b - c1.b) * factor)

    return `rgb(${r}, ${g}, ${b})`
  }

  drawHexagon(x, y, size, color) {
    const ctx = this.ctx
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2
      const px = x + size * Math.cos(angle)
      const py = y + size * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  drawNode(node) {
    const ctx = this.ctx
    const pulse = Math.sin(
      this.time * this.config.pressure.pulseFrequency + node.pulseOffset
    )
    // Depth affects opacity - farther nodes are more transparent
    const depthOpacity = 0.4 + node.depth * 0.6
    const pressureColor = this.interpolateColor(
      this.config.colors.secondary,
      this.config.colors.primary,
      node.pressure
    )

    // Glow effect for high-pressure nodes
    if (this.config.enableGlow && node.pressure > 0.5) {
      const glowSize = node.size * (2 + pulse * 0.5)
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        glowSize * 2
      )
      gradient.addColorStop(0, `rgba(75, 75, 158, ${0.4 * node.pressure * this.intensity * depthOpacity})`)
      gradient.addColorStop(1, 'rgba(75, 75, 158, 0)')

      ctx.beginPath()
      ctx.arc(node.x, node.y, glowSize * 2, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Main node - size varies by depth (farther = smaller)
    const depthScale = 0.7 + node.depth * 0.3
    const effectiveSize = node.size * depthScale

    if (node.type === 'valve') {
      this.drawHexagon(node.x, node.y, effectiveSize * 1.5, pressureColor)
    } else {
      // Junction - circle with ring
      ctx.beginPath()
      ctx.arc(node.x, node.y, effectiveSize, 0, Math.PI * 2)
      ctx.fillStyle = pressureColor
      ctx.fill()

      // Outer ring
      ctx.beginPath()
      ctx.arc(node.x, node.y, effectiveSize * 1.8, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(148, 163, 184, ${(0.2 + node.pressure * 0.3) * this.intensity * depthOpacity})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }
  }

  drawFlowIndicator(nodeA, nodeB, pressure, opacity) {
    if (!this.config.enableFlowIndicators || pressure < 0.3) return

    const ctx = this.ctx
    const flowPos = ((this.time * 0.001 * this.config.pressure.flowSpeed) % 1)
    const x = nodeA.x + (nodeB.x - nodeA.x) * flowPos
    const y = nodeA.y + (nodeB.y - nodeA.y) * flowPos

    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(75, 75, 158, ${opacity * pressure * this.intensity})`
    ctx.fill()
  }

  drawConnections() {
    const ctx = this.ctx

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i]
        const nodeB = this.nodes[j]
        const dx = nodeA.x - nodeB.x
        const dy = nodeA.y - nodeB.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.config.connectionDistance) {
          const opacity = (1 - distance / this.config.connectionDistance) * this.intensity
          const avgPressure = (nodeA.pressure + nodeB.pressure) / 2

          // Connection pulsing - creates flowing energy effect
          const pulsePhase = ((this.time * 0.015 + i * 0.2) % (Math.PI * 2))
          const pulseIntensity = Math.sin(pulsePhase) * 0.15

          ctx.beginPath()
          ctx.moveTo(nodeA.x, nodeA.y)
          ctx.lineTo(nodeB.x, nodeB.y)

          if (avgPressure > 0.5) {
            // High pressure - thicker, glowing line with pulse
            ctx.strokeStyle = `rgba(75, 75, 158, ${Math.max(0, opacity * 0.5 + pulseIntensity)})`
            ctx.lineWidth = 2
            ctx.stroke()

            // Inner glow
            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.strokeStyle = `rgba(75, 75, 158, ${Math.max(0, opacity * 0.8 + pulseIntensity)})`
            ctx.lineWidth = 1
            ctx.stroke()
          } else {
            // Low pressure - thin industrial line with subtle pulse
            ctx.strokeStyle = `rgba(148, 163, 184, ${Math.max(0, opacity * 0.3 + pulseIntensity * 0.3)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }

          this.drawFlowIndicator(nodeA, nodeB, avgPressure, opacity)
        }
      }
    }
  }

  updateNodes() {
    this.time++

    this.nodes.forEach((node) => {
      // Mouse pressure influence
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - node.x
        const dy = this.mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.config.pressure.mouseRadius) {
          const force =
            (this.config.pressure.mouseRadius - distance) /
            this.config.pressure.mouseRadius

          // Pressure increases near mouse
          node.pressure = Math.min(1, node.pressure + force * 0.05)

          // Nodes are pushed away (like pressure wave)
          const angle = Math.atan2(dy, dx)
          node.vx -= Math.cos(angle) * force * 0.5
          node.vy -= Math.sin(angle) * force * 0.5
        }
      }

      // Natural pressure decay
      node.pressure *= 0.995
      node.pressure = Math.max(0.1, node.pressure)

      // Apply velocity with damping - speed varies by depth
      const depthFactor = 0.5 + node.depth * 0.5
      node.x += node.vx * depthFactor
      node.y += node.vy * depthFactor
      node.vx *= 0.98
      node.vy *= 0.98

      // Wave-based ambient flow (more organic than linear)
      const waveX = Math.sin(this.time * 0.001 + node.y * 0.002 + node.pulseOffset) * 0.015
      const waveY = Math.cos(this.time * 0.0012 + node.x * 0.002 + node.pulseOffset) * 0.01
      node.vx += waveX * depthFactor
      node.vy += waveY * depthFactor

      // Boundary handling with soft bounce
      const margin = 50
      if (node.x < margin) node.vx += 0.1
      if (node.x > this.width - margin) node.vx -= 0.1
      if (node.y < margin) node.vy += 0.1
      if (node.y > this.height - margin) node.vy -= 0.1
    })
  }

  drawStatic() {
    // Draw a single static frame for reduced motion preference
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.drawConnections()
    this.nodes.forEach((node) => this.drawNode(node))
  }

  animate() {
    this.frameCount++

    // Frame skip for performance
    if (this.frameCount % this.config.frameSkip !== 0) {
      this.animationId = requestAnimationFrame(() => this.animate())
      return
    }

    this.ctx.clearRect(0, 0, this.width, this.height)

    this.updateNodes()
    this.drawConnections()
    this.nodes.forEach((node) => this.drawNode(node))

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseleave', this.handleMouseLeave)
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('touchend', this.handleTouchEnd)
    this.canvas.remove()
  }
}
