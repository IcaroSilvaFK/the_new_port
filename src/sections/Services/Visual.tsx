import { Bell, Check, Cpu, Search } from 'lucide-react'

import styles from './visual.module.scss'

export type VisualKey = 'Ai' | 'Web' | 'Systems' | 'Mobile' | 'Seo' | 'Automation'

const Bar = ({ w, tone }: { w: string; tone?: 'accent' | 'strong' }) => (
  <span className={`${styles.bar} ${tone ? styles[tone] : ''}`} style={{ width: w }} />
)

function Ai() {
  return (
    <div className={styles.chat}>
      <div className={`${styles.bubble} ${styles.user}`}>
        <Bar w="70%" tone="strong" />
        <Bar w="45%" tone="strong" />
      </div>
      <div className={styles.toolCall}>
        <Cpu size={14} aria-hidden />
        <span>search_documents</span>
        <i />
      </div>
      <div className={styles.toolCall}>
        <Cpu size={14} aria-hidden />
        <span>check_access</span>
        <i />
      </div>
      <div className={`${styles.bubble} ${styles.bot}`}>
        <Bar w="90%" />
        <Bar w="80%" />
        <Bar w="55%" />
        <div className={styles.sources}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function Web() {
  return (
    <div className={styles.browser}>
      <div className={styles.chrome}>
        <i />
        <i />
        <i />
        <span className={styles.url} />
      </div>
      <div className={styles.page}>
        <div className={styles.pageHero}>
          <Bar w="75%" tone="strong" />
          <Bar w="55%" tone="strong" />
          <Bar w="40%" />
          <span className={styles.pageBtn} />
        </div>
        <div className={styles.pageCards}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

function Systems() {
  return (
    <div className={styles.dash}>
      <aside>
        <span className={styles.dot} />
        <Bar w="70%" tone="accent" />
        <Bar w="60%" />
        <Bar w="75%" />
        <Bar w="50%" />
      </aside>
      <div className={styles.dashMain}>
        <div className={styles.stats}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.chart}>
          {[45, 70, 55, 90, 65, 80, 100].map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
        <div className={styles.rows}>
          <Bar w="100%" />
          <Bar w="100%" />
          <Bar w="100%" />
        </div>
      </div>
    </div>
  )
}

function Mobile() {
  return (
    <div className={styles.phoneWrap}>
      <div className={styles.phone}>
        <span className={styles.notch} />
        <div className={styles.toast}>
          <Bell size={14} aria-hidden />
          <Bar w="60%" tone="strong" />
        </div>
        <div className={styles.appHero} />
        <Bar w="70%" tone="strong" />
        <Bar w="90%" />
        <Bar w="80%" />
        <div className={styles.appList}>
          <span />
          <span />
        </div>
        <span className={styles.appBtn} />
      </div>
    </div>
  )
}

function Seo() {
  return (
    <div className={styles.serp}>
      <div className={styles.searchBar}>
        <Search size={16} aria-hidden />
        <Bar w="45%" tone="strong" />
      </div>
      <div className={`${styles.result} ${styles.first}`}>
        <span className={styles.badge}>
          <Check size={12} strokeWidth={3} aria-hidden />
        </span>
        <Bar w="35%" />
        <Bar w="70%" tone="accent" />
        <Bar w="90%" />
      </div>
      {[0, 1].map((i) => (
        <div className={styles.result} key={i}>
          <Bar w="30%" />
          <Bar w="60%" tone="strong" />
          <Bar w="85%" />
        </div>
      ))}
    </div>
  )
}

function Automation() {
  return (
    <svg className={styles.flow} viewBox="0 0 400 300" fill="none" aria-hidden>
      <path className={styles.wire} d="M90 70 H200 V150 H310" />
      <path className={styles.wire} d="M90 230 H200 V150" />
      <path className={styles.pulse} d="M90 70 H200 V150 H310" />
      <path className={`${styles.pulse} ${styles.late}`} d="M90 230 H200 V150 H310" />
      {[
        [50, 70],
        [50, 230],
        [200, 150],
        [350, 150],
      ].map(([x, y], i) => (
        <g key={i} className={i === 2 ? styles.hub : styles.node}>
          <rect x={x - 40} y={y - 26} width="80" height="52" rx="14" />
          <rect className={styles.nodeBar} x={x - 22} y={y - 4} width="44" height="8" rx="4" />
        </g>
      ))}
    </svg>
  )
}

const visuals = { Ai, Web, Systems, Mobile, Seo, Automation }

export function Visual({ kind }: { kind: VisualKey }) {
  const Component = visuals[kind]
  return (
    <div className={styles.visual} aria-hidden>
      <Component />
    </div>
  )
}
