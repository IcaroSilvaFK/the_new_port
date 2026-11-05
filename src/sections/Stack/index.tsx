import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'
import {
  siAdonisjs,
  siAngular,
  siDocker,
  siGin,
  siGo,
  siJavascript,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSvelte,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'

import styles from './styles.module.scss'

const tools: { icon: SimpleIcon; name: string }[] = [
  { icon: siTypescript, name: 'TypeScript' },
  { icon: siReact, name: 'React' },
  { icon: siNextdotjs, name: 'Next.js' },
  { icon: siReact, name: 'React Native' },
  { icon: siNodedotjs, name: 'Node.js' },
  { icon: siNestjs, name: 'NestJS' },
  { icon: siGo, name: 'Go' },
  { icon: siGin, name: 'Gin' },
  { icon: siAdonisjs, name: 'AdonisJS' },
  { icon: siPostgresql, name: 'PostgreSQL' },
  { icon: siMysql, name: 'MySQL' },
  { icon: siDocker, name: 'Docker' },
  { icon: siSvelte, name: 'Svelte' },
  { icon: siAngular, name: 'Angular' },
  { icon: siJavascript, name: 'JavaScript' },
]

export function Stack() {
  const { t } = useTranslation()

  return (
    <section className={styles.stack} aria-label={t('stackLabel')}>
      <p className={styles.label}>{t('stackLabel')}</p>
      <Marquee speed={36} gradient gradientColor="#f4f6fb" gradientWidth={96} pauseOnHover autoFill>
        {tools.map(({ icon, name }) => (
          <span
            className={styles.tool}
            key={name}
            style={{ '--brand': `#${icon.hex}` } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d={icon.path} />
            </svg>
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
