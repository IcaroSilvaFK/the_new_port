import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe, Plus, Search, Server, Smartphone, Sparkles, Workflow, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

type Service = {
  key: 'Ai' | 'Web' | 'Systems' | 'Mobile' | 'Seo' | 'Automation'
  icon: LucideIcon
  tags: string[]
}

const services: Service[] = [
  { key: 'Ai', icon: Sparkles, tags: ['Claude', 'OpenAI', 'RAG', 'MCP'] },
  { key: 'Web', icon: Globe, tags: ['React', 'Next.js', 'TypeScript'] },
  { key: 'Systems', icon: Server, tags: ['NestJS', 'Node.js', 'Go', 'Gin'] },
  { key: 'Mobile', icon: Smartphone, tags: ['React Native', 'TypeScript'] },
  { key: 'Seo', icon: Search, tags: ['Core Web Vitals', 'SEO local', 'Schema.org'] },
  { key: 'Automation', icon: Workflow, tags: ['APIs', 'Dashboards', 'Webhooks'] },
]

export function Services() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<Service['key'] | null>('Ai')

  return (
    <section id="services" className={styles.services}>
      <header className={styles.header}>
        <RevealText className={styles.title} text={t('servicesTitle')} />
        <motion.p
          className={styles.intro}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          {t('servicesDescription')}
        </motion.p>
      </header>

      <ul className={styles.list}>
        {services.map(({ key, icon: Icon, tags }) => {
          const isOpen = open === key
          const panelId = `service-${key}`

          return (
            <li key={key} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
              <button
                type="button"
                className={styles.row}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : key)}
              >
                <span className={styles.icon} aria-hidden>
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <span className={styles.name}>{t(`service${key}Title`)}</span>
                <span className={styles.summary}>{t(`service${key}Summary`)}</span>
                <motion.span
                  className={styles.toggle}
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
                    id={panelId}
                    className={styles.panel}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <div className={styles.panelInner}>
                      <p>{t(`service${key}Body`)}</p>
                      <ul className={styles.tags}>
                        {tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
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
