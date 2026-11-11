import { motion, useReducedMotion } from 'framer-motion'
import { Check, GitBranch, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ease } from '../../lib/motion'
import styles from './devScene.module.scss'

type Tok = [string, keyof typeof styles | null]

// A short, readable "launch a product" program. Colours come from the theme.
const CODE: Tok[][] = [
  [['import', 'kw'], [' { build, deploy } ', null], ['from', 'kw'], [" '@icaro/studio'", 'str']],
  [],
  [['export async function', 'kw'], [' launch', 'fn'], ['(idea: ', null], ['Idea', 'type'], [') {', null]],
  [['  const', 'kw'], [' plan = ', null], ['await', 'kw'], [' understand', 'fn'], ['(idea)', null]],
  [['  const', 'kw'], [' app = ', null], ['await', 'kw'], [' build', 'fn'], ['(plan, {', null]],
  [['    web', 'prop'], [': ', null], ['true', 'bool'], [',', null]],
  [['    mobile', 'prop'], [': ', null], ['true', 'bool'], [',', null]],
  [['    ai', 'prop'], [': [', null], ["'agents'", 'str'], [', ', null], ["'rag'", 'str'], [', ', null], ["'mcp'", 'str'], ['],', null]],
  [['  })', null]],
  [['  return', 'kw'], [' deploy', 'fn'], ['(app)', null]],
  [['}', null]],
]

const LINE_GAP = 0.16
const START = 0.6

export function DevScene() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const typedAt = START + CODE.length * LINE_GAP

  return (
    <div className={styles.scene} aria-hidden>
      <div className={styles.editor}>
        <div className={styles.bar}>
          <i />
          <i />
          <i />
          <span className={styles.tab}>launch.ts</span>
          <span className={styles.branch}>
            <GitBranch size={13} />
            main
          </span>
        </div>

        <pre className={styles.code}>
          {CODE.map((line, i) => (
            <motion.div
              key={i}
              className={styles.line}
              initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 0.45, ease: 'linear', delay: START + i * LINE_GAP }}
            >
              <span className={styles.num}>{i + 1}</span>
              <code>
                {line.length === 0
                  ? ' '
                  : line.map(([text, kind], j) => (
                      <span key={j} className={kind ? styles[kind] : undefined}>
                        {text}
                      </span>
                    ))}
                {i === CODE.length - 1 && <span className={styles.caret} />}
              </code>
            </motion.div>
          ))}
        </pre>
      </div>

      <motion.div
        className={styles.terminal}
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease, delay: typedAt + 0.2 }}
      >
        <div className={styles.termHead}>
          <Terminal size={13} />
          <span>terminal</span>
        </div>
        <p className={styles.cmd}>
          <span className={styles.prompt}>$</span> pnpm deploy
        </p>
        <motion.p
          className={styles.ok}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: typedAt + 1 }}
        >
          <Check size={14} strokeWidth={3} />
          {t('heroDeployDone')}
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.badge}
        initial={reduce ? false : { opacity: 0, y: -12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease, delay: typedAt + 1.4 }}
      >
        <span className={styles.live} />
        {t('heroLive')}
      </motion.div>
    </div>
  )
}
