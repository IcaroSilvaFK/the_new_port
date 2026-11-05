import type { CSSProperties } from 'react'
import { Box, Cloud, Database, GitBranch, Hash, Route, Share2, Zap, type LucideIcon } from 'lucide-react'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'
import {
  siAdonisjs,
  siAngular,
  siDocker,
  siDotnet,
  siFastapi,
  siGin,
  siGo,
  siJavascript,
  siJest,
  siMui,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siPostgresql,
  siPython,
  siReact,
  siReactquery,
  siRedis,
  siSonarqube,
  siSvelte,
  siTailwindcss,
  siTypescript,
  siVite,
  siVitest,
  type SimpleIcon,
} from 'simple-icons'

import styles from './styles.module.scss'

type Tool = { name: string; icon: SimpleIcon | LucideIcon; brand?: string }

// Front-end, mobile and UI tooling
const front: Tool[] = [
  { name: 'TypeScript', icon: siTypescript },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'React Native', icon: siReact },
  { name: 'TanStack Router', icon: Route, brand: '#FF4154' },
  { name: 'TanStack Query', icon: siReactquery },
  { name: 'Zustand', icon: Box, brand: '#433E38' },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'MUI', icon: siMui },
  { name: 'Vite', icon: siVite },
  { name: 'Vitest', icon: siVitest },
  { name: 'Jest', icon: siJest },
  { name: 'SharePoint (SPFx)', icon: Share2, brand: '#038387' },
  { name: 'Svelte', icon: siSvelte },
  { name: 'Angular', icon: siAngular },
]

// Back-end, data, AI and cloud
const back: Tool[] = [
  { name: 'Go', icon: siGo },
  { name: 'Gin', icon: siGin },
  { name: 'Fiber', icon: Zap, brand: '#00ACD7' },
  { name: 'Echo', icon: siGo },
  { name: '.NET', icon: siDotnet },
  { name: 'C#', icon: Hash, brand: '#512BD4' },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'NestJS', icon: siNestjs },
  { name: 'AdonisJS', icon: siAdonisjs },
  { name: 'Python', icon: siPython },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'OpenAI', icon: siOpenai },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'pgvector', icon: Database, brand: '#4169E1' },
  { name: 'SQL Server', icon: Database, brand: '#CC2927' },
  { name: 'MySQL', icon: siMysql },
  { name: 'Redis', icon: siRedis },
  { name: 'Docker', icon: siDocker },
  { name: 'Azure', icon: Cloud, brand: '#0078D4' },
  { name: 'Azure DevOps', icon: GitBranch, brand: '#0078D4' },
  { name: 'SonarQube', icon: siSonarqube },
]

function isSimpleIcon(icon: Tool['icon']): icon is SimpleIcon {
  return typeof icon === 'object' && 'path' in icon
}

function ToolItem({ name, icon, brand }: Tool) {
  const color = brand ?? (isSimpleIcon(icon) ? `#${icon.hex}` : undefined)
  const Lucide = isSimpleIcon(icon) ? null : icon

  return (
    <span className={styles.tool} style={{ '--brand': color } as CSSProperties}>
      {Lucide ? (
        <Lucide className={styles.lucide} strokeWidth={1.8} aria-hidden />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d={(icon as SimpleIcon).path} />
        </svg>
      )}
      {name}
    </span>
  )
}

export function Stack() {
  const { t } = useTranslation()

  return (
    <section className={styles.stack} aria-label={t('stackLabel')}>
      <p className={styles.label}>{t('stackLabel')}</p>
      <div className={styles.rows}>
        <Marquee speed={34} gradient gradientColor="#f4f6fb" gradientWidth={96} pauseOnHover autoFill>
          {front.map((tool) => (
            <ToolItem key={tool.name} {...tool} />
          ))}
        </Marquee>
        <Marquee
          speed={30}
          direction="right"
          gradient
          gradientColor="#f4f6fb"
          gradientWidth={96}
          pauseOnHover
          autoFill
        >
          {back.map((tool) => (
            <ToolItem key={tool.name} {...tool} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
