import { useEffect, useRef } from 'react'

import styles from './styles.module.scss'

type Particle = { x: number; y: number; vx: number; vy: number; r: number }

const LINK_DIST = 140 // px between particles to draw a link
const CURSOR_DIST = 190 // px from the cursor to draw a link

/**
 * Fixed, decorative page background: slowly drifting colour fields plus a
 * particle network that links nearby points and reaches out to the cursor.
 */
export function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    // particle colour comes from the theme, so it follows light / dark
    const readDot = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--net').trim() || '47, 79, 224'
    let DOT = readDot()
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => {
      DOT = readDot()
      if (reduce) draw()
    }
    const pointer = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(Math.min(90, Math.max(28, (width * height) / 16000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.4,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduce) {
          // gentle pull towards the cursor so the network "notices" it
          if (pointer.active) {
            const dx = pointer.x - p.x
            const dy = pointer.y - p.y
            const d = Math.hypot(dx, dy)
            if (d < CURSOR_DIST && d > 1) {
              p.vx += (dx / d) * 0.006
              p.vy += (dy / d) * 0.006
            }
          }
          // keep speed calm
          const speed = Math.hypot(p.vx, p.vy)
          const max = 0.45
          if (speed > max) {
            p.vx = (p.vx / speed) * max
            p.vy = (p.vy / speed) * max
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20
          if (p.y < -20) p.y = height + 20
          if (p.y > height + 20) p.y = -20
        }
      }

      // links between particles
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${DOT}, ${(1 - d / LINK_DIST) * 0.16})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // links to the cursor
      if (pointer.active) {
        for (const p of particles) {
          const d = Math.hypot(pointer.x - p.x, pointer.y - p.y)
          if (d < CURSOR_DIST) {
            ctx.strokeStyle = `rgba(${DOT}, ${(1 - d / CURSOR_DIST) * 0.32})`
            ctx.beginPath()
            ctx.moveTo(pointer.x, pointer.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.fillStyle = `rgba(${DOT}, 0.38)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduce) frame = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    scheme.addEventListener('change', onScheme)
    if (finePointer && !reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      scheme.removeEventListener('change', onScheme)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className={styles.backdrop} aria-hidden>
      <span className={`${styles.field} ${styles.a}`} />
      <span className={`${styles.field} ${styles.b}`} />
      <span className={`${styles.field} ${styles.c}`} />
      <canvas ref={canvasRef} className={styles.network} />
    </div>
  )
}
