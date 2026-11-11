import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { ease } from '../../lib/motion'
import { DevScene } from './DevScene'
import styles from './styles.module.scss'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  // The scene drifts slower than the page while the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  // Gentle lean towards the cursor.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const rotateY = useTransform(sx, (v) => v / 2)
  const rotateX = useTransform(sy, (v) => -v / 2)

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14)
  }

  return (
    <section
      id="top"
      ref={ref}
      className={styles.hero}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <div className={styles.copy}>
        <motion.span className={styles.badge} {...fadeUp(0.15)}>
          <span className={styles.dot} aria-hidden />
          {t('heroBadge')}
        </motion.span>

        <motion.p className={styles.greeting} {...fadeUp(0.25)}>
          {t('greeting')}
        </motion.p>

        <RevealText as="h1" trigger="mount" delay={0.35} className={styles.title} text={t('title')} />

        <motion.p className={styles.description} {...fadeUp(1.05)}>
          {t('description')}
        </motion.p>

        <motion.div className={styles.buttons} {...fadeUp(1.2)}>
          <a href="#contact" className={styles.primary}>
            <span>{t('contactUs')}</span>
          </a>
          <a href="#work" className={styles.secondary}>
            {t('seeWork')}
          </a>
        </motion.div>
      </div>

      <motion.figure className={styles.portrait} style={{ y: frameY, x: sx, rotateY, rotateX }}>
        <span className={styles.glow} aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          <DevScene />
        </motion.div>
        <motion.figcaption {...fadeUp(1.35)}>{t('portraitCaption')}</motion.figcaption>
      </motion.figure>
    </section>
  )
}
