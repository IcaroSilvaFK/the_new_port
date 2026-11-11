import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Gauge, Handshake, ListChecks, Plug, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

const principles: { key: string; icon: LucideIcon }[] = [
  { key: 'Performance', icon: Gauge },
  { key: 'Integration', icon: Plug },
  { key: 'Clarity', icon: ListChecks },
  { key: 'Partner', icon: Handshake },
]

const steps = [1, 2, 3, 4, 5]

export function Approach() {
  const { t } = useTranslation()
  const stepsRef = useRef<HTMLOListElement>(null)
  // The line between the steps draws itself as the section scrolls into view.
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 85%', 'end 55%'] })
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  return (
    <section className={styles.approach}>
      <div className={styles.block}>
        <RevealText className={styles.title} text={t('principlesTitle')} />
        <ul className={styles.principles}>
          {principles.map(({ key, icon: Icon }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            >
              <Icon size={22} strokeWidth={1.6} aria-hidden />
              <h3>{t(`principle${key}Title`)}</h3>
              <p>{t(`principle${key}Body`)}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <RevealText className={styles.title} text={t('processTitle')} />
        <p className={styles.lead}>{t('processIntro')}</p>
        <ol className={styles.steps} ref={stepsRef}>
          <span className={styles.track} aria-hidden>
            <motion.span style={{ scaleX: line }} />
          </span>
          {steps.map((n) => (
            <li key={n}>
              <span className={styles.number} aria-hidden>
                {String(n).padStart(2, '0')}
              </span>
              <h3>{t(`processStep${n}Title`)}</h3>
              <p>{t(`processStep${n}Body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
