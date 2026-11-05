import { Fragment } from 'react'
import { motion } from 'framer-motion'

import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  /** Animate when scrolled into view (default) or right after mount. */
  trigger?: 'view' | 'mount'
}

export function RevealText({ text, as = 'h2', className, delay = 0, trigger = 'view' }: Props) {
  const Tag = motion[as]
  const words = text.split(' ').filter(Boolean)
  const play =
    trigger === 'view'
      ? { whileInView: 'show', viewport: { once: true, amount: 0.5 } }
      : { animate: 'show' }

  return (
    <Tag
      key={text}
      className={className}
      aria-label={text}
      initial="hidden"
      {...play}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className={styles.mask} aria-hidden>
            <motion.span
              className={styles.word}
              variants={{
                hidden: { y: '115%' },
                show: { y: '0%', transition: { duration: 0.95, ease } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}
