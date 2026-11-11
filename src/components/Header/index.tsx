import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useTranslatorContext } from '../../hooks/useTranslatorContext'
import { ease } from '../../lib/motion'
import { Logo } from '../Logo'
import styles from './styles.module.scss'

export function Header() {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { handleOpenModalChangeLanguage } = useTranslatorContext()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <motion.header
      className={`${styles.container} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
    >
      <div className={styles.inner}>
        <a href="#top" className={styles.logo}>
          <Logo className={styles.mark} />
          <span>Icaro Vieira</span>
        </a>

        <nav className={styles.nav}>
          <a href="#services">{t('navServices')}</a>
          <a href="#ai">{t('navAi')}</a>
          <a href="#work">{t('navWork')}</a>
          <a href="#about">{t('navAbout')}</a>
          <a href="#contact">{t('navContact')}</a>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.lang}
            onClick={handleOpenModalChangeLanguage}
            aria-label={t('changeLanguage')}
          >
            <Languages size={16} aria-hidden />
            <span>{(language ?? 'pt').slice(0, 2).toUpperCase()}</span>
          </button>
          <a href="#contact" className={styles.cta}>
            {t('navCta')}
          </a>
        </div>

        <motion.span className={styles.progress} style={{ scaleX: progress }} aria-hidden />
      </div>
    </motion.header>
  )
}
