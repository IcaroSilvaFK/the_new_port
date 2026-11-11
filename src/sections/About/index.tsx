import { motion } from 'framer-motion'
import { BadgeCheck, Handshake, Layers, Sparkles, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import portrait from '../../assets/icaro-portrait.webp'
import { RevealText } from '../../components/RevealText'
import { certifications } from '../../data/certifications'
import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

const certCount = certifications.reduce((n, g) => n + g.items.length, 0)

const facts: { icon: LucideIcon; key: string }[] = [
  { icon: Handshake, key: 'aboutFact1' },
  { icon: Layers, key: 'aboutFact2' },
  { icon: Sparkles, key: 'aboutFact3' },
  { icon: BadgeCheck, key: 'aboutFact4' },
]

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className={styles.about}>
      <motion.figure
        className={styles.photo}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease }}
      >
        <span className={styles.glow} aria-hidden />
        <div className={styles.frame}>
          <img src={portrait} alt="Icaro Vieira" width={840} height={1099} loading="lazy" />
        </div>
      </motion.figure>

      <div className={styles.text}>
        <p className={styles.kicker}>{t('aboutKicker')}</p>
        <RevealText className={styles.title} text={t('aboutTitle')} />
        <p className={styles.lead}>{t('aboutP1')}</p>
        <p className={styles.lead}>{t('aboutP2')}</p>

        <ul className={styles.facts}>
          {facts.map(({ icon: Icon, key }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
              <Icon size={18} strokeWidth={1.7} aria-hidden />
              {t(key, { count: certCount })}
            </motion.li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href="#contact" className={styles.primary}>
            {t('navCta')}
          </a>
          <a href="https://www.linkedin.com/in/icarovieira" target="_blank" rel="noreferrer" className={styles.secondary}>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
