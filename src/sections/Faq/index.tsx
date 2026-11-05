import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

const items = [1, 2, 3, 4, 5, 6]

export function Faq() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className={styles.faq}>
      <div className={styles.head}>
        <RevealText className={styles.title} text={t('faqTitle')} />
      </div>
      <ul className={styles.list}>
        {items.map((n) => {
          const isOpen = open === n
          return (
            <li key={n} className={isOpen ? styles.open : undefined}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${n}`}
                onClick={() => setOpen(isOpen ? null : n)}
              >
                <span>{t(`faq${n}Q`)}</span>
                <motion.span
                  className={styles.icon}
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  aria-hidden
                >
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-${n}`}
                    className={styles.answer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                  >
                    <p>{t(`faq${n}A`)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
