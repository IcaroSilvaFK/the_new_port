import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { PROJECT_TYPE_EVENT } from '../../lib/contact'
import { ease } from '../../lib/motion'
import { useLenis } from '../../providers/SmoothScroll'
import styles from './styles.module.scss'
import { Visual, type VisualKey } from './Visual'

type Service = {
  key: VisualKey
  tags: string[]
  /** project type pre-selected in the contact form */
  formType: 'Ai' | 'Site' | 'System' | 'App'
}

const services: Service[] = [
  { key: 'Ai', tags: ['Claude', 'OpenAI', 'RAG', 'MCP'], formType: 'Ai' },
  { key: 'Web', tags: ['React', 'Next.js', 'TypeScript'], formType: 'Site' },
  { key: 'Systems', tags: ['NestJS', 'Node.js', 'Go', 'Gin'], formType: 'System' },
  { key: 'Mobile', tags: ['React Native', 'TypeScript'], formType: 'App' },
  { key: 'Seo', tags: ['Core Web Vitals', 'SEO local', 'Schema.org'], formType: 'Site' },
  { key: 'Automation', tags: ['APIs', 'Dashboards', 'Webhooks'], formType: 'Ai' },
]

const N = services.length
// The pinned version needs room; smaller screens get a plain stacked list.
const PIN_QUERY = '(min-width: 901px) and (min-height: 660px)'

function Details({ service }: { service: Service }) {
  const { t } = useTranslation()
  const { key, tags, formType } = service

  return (
    <>
      <h3>{t(`service${key}Title`)}</h3>
      <p className={styles.summary}>{t(`service${key}Summary`)}</p>
      <p className={styles.body}>{t(`service${key}Body`)}</p>

      <ul className={styles.deliverables}>
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <Check size={16} strokeWidth={2.4} aria-hidden />
            {t(`service${key}Item${n}`)}
          </li>
        ))}
      </ul>

      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <a
        href="#contact"
        className={styles.cta}
        onClick={() => window.dispatchEvent(new CustomEvent(PROJECT_TYPE_EVENT, { detail: formType }))}
      >
        {t(`service${key}Cta`)}
        <ArrowRight size={18} aria-hidden />
      </a>
    </>
  )
}

function Pinned() {
  const { t } = useTranslation()
  const lenis = useLenis()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)))
    if (next !== index) {
      setDirection(next > index ? 1 : -1)
      setIndex(next)
    }
  })

  // jump to a step by scrolling the track to its slice
  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const span = track.offsetHeight - window.innerHeight
    const y = top + span * ((i + 0.5) / N)
    if (lenis) lenis.scrollTo(y, { duration: 1.1 })
    else window.scrollTo({ top: y })
  }

  const current = services[index]

  return (
    <div ref={trackRef} className={styles.track} style={{ height: `calc(${N} * 75vh + 100vh)` }}>
      <div className={styles.stage}>
        <nav className={styles.steps} aria-label={t('servicesPrompt')}>
          <span className={styles.rail} aria-hidden>
            <motion.span style={{ scaleY: rail }} />
          </span>
          {services.map(({ key }, i) => (
            <button
              key={key}
              type="button"
              className={i === index ? styles.current : undefined}
              aria-current={i === index ? 'step' : undefined}
              onClick={() => goTo(i)}
            >
              {t(`service${key}Title`)}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          <span className={styles.counter} aria-hidden>
            {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: direction * 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -36 }}
              transition={{ duration: 0.4, ease }}
            >
              <Details service={current} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.visualSlot}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              initial={{ opacity: 0, scale: 0.94, y: direction * 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: direction * -30 }}
              transition={{ duration: 0.45, ease }}
            >
              <Visual kind={current.key} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function Stacked() {
  return (
    <div className={styles.stack}>
      {services.map((service) => (
        <motion.article
          key={service.key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <Visual kind={service.key} />
          <div className={styles.content}>
            <Details service={service} />
          </div>
        </motion.article>
      ))}
    </div>
  )
}

export function Services() {
  const { t } = useTranslation()
  const [pinned, setPinned] = useState(() => window.matchMedia(PIN_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY)
    const onChange = () => setPinned(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section id="services" className={styles.services}>
      <header className={styles.header}>
        <RevealText className={styles.title} text={t('servicesTitle')} />
        <p className={styles.intro}>{t('servicesDescription')}</p>
      </header>

      {pinned ? <Pinned /> : <Stacked />}
    </section>
  )
}
