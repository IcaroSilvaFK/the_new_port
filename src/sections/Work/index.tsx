import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { data } from '../../data/projects'
import { ease, splitProjectName } from '../../lib/motion'
import styles from './styles.module.scss'

export function Work() {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const projects = data[(language?.slice(0, 2) as keyof typeof data) ?? 'pt'] ?? data.pt
  const [active, setActive] = useState(0)
  const current = projects[Math.min(active, projects.length - 1)]

  if (!current) return null

  return (
    <section id="work" className={styles.work}>
      <header className={styles.header}>
        <RevealText className={styles.title} text={t('workTitle')} />
        <p className={styles.intro}>{t('workDescription')}</p>
      </header>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {projects.map((project, i) => {
            const { title, subtitle } = splitProjectName(project.name)
            const isActive = i === active

            return (
              <li key={project.name} className={isActive ? styles.active : undefined}>
                <button
                  type="button"
                  className={styles.item}
                  aria-pressed={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-indicator"
                      className={styles.indicator}
                      transition={{ duration: 0.6, ease }}
                      aria-hidden
                    />
                  )}
                  <span className={styles.name}>{title}</span>
                  {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                </button>

                {/* On small screens the preview opens inline under the active item */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      className={styles.inline}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <div className={styles.inlineInner}>
                        <img src={project.images[0]} alt={project.name} loading="lazy" />
                        <p>{project.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <div className={styles.preview}>
          <div className={styles.frame}>
            <AnimatePresence initial={false}>
              <motion.img
                key={current.images[0]}
                src={current.images[0]}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
              />
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.name}
              className={styles.details}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease }}
            >
              <p>{current.description}</p>
            </motion.div>
          </AnimatePresence>

          <a href="#contact" className={styles.cta}>
            {t('workCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
