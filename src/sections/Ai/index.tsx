import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Bot, Check, Cpu, Loader2, Plug, Workflow, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

const capabilities: { n: 1 | 2 | 3; icon: LucideIcon }[] = [
  { n: 1, icon: Bot },
  { n: 2, icon: Plug },
  { n: 3, icon: Workflow },
]

// Odd steps are the agent's thoughts/results, even steps are tool calls.
const STEPS = [1, 2, 3, 4, 5, 6, 7]
const STEP_MS = 950
const HOLD_MS = 2600

function AgentDemo() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? STEPS.length : 0)

  useEffect(() => {
    if (reduce) {
      setShown(STEPS.length)
      return
    }
    if (!inView) return
    const done = shown >= STEPS.length
    const id = setTimeout(() => setShown(done ? 0 : shown + 1), done ? HOLD_MS : shown === 0 ? 400 : STEP_MS)
    return () => clearTimeout(id)
  }, [inView, shown, reduce])

  return (
    <div className={styles.demo} ref={ref} role="img" aria-label={t('aiDemoLabel')}>
      <div className={styles.demoBar} aria-hidden>
        <span />
        <span />
        <span />
        <p>agent.run()</p>
      </div>
      <ol className={styles.demoLog} aria-hidden>
        <AnimatePresence initial={false}>
          {STEPS.slice(0, shown).map((n, i) => {
            const isTool = n % 2 === 0
            const isLast = i === shown - 1 && shown < STEPS.length
            return (
              <motion.li
                key={n}
                className={isTool ? styles.tool : styles.thought}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                <span className={styles.status}>
                  {isLast ? <Loader2 size={14} className={styles.spin} /> : isTool ? <Cpu size={14} /> : <Check size={14} />}
                </span>
                <span>{t(`aiDemo${n}`)}</span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>
      <p className={styles.demoNote}>{t('aiDemoLabel')}</p>
    </div>
  )
}

export function Ai() {
  const { t } = useTranslation()

  return (
    <section id="ai" className={styles.ai}>
      <header className={styles.header}>
        <RevealText className={styles.title} text={t('aiTitle')} />
        <p className={styles.intro}>{t('aiIntro')}</p>
      </header>

      <div className={styles.layout}>
        <div className={styles.columns}>
          <div className={styles.block}>
            <h3>{t('aiExecTitle')}</h3>
            <p>{t('aiExecBody')}</p>
            <ul className={styles.points}>
              {[1, 2, 3].map((n) => (
                <li key={n}>
                  <Check size={16} strokeWidth={2.4} aria-hidden />
                  {t(`aiExecPoint${n}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h3>{t('aiBuildTitle')}</h3>
            <p>{t('aiBuildBody')}</p>
            <ul className={styles.capabilities}>
              {capabilities.map(({ n, icon: Icon }, i) => (
                <motion.li
                  key={n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                >
                  <span className={styles.capIcon} aria-hidden>
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h4>{t(`aiCase${n}Title`)}</h4>
                    <p>{t(`aiCase${n}Body`)}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <AgentDemo />
      </div>
    </section>
  )
}
