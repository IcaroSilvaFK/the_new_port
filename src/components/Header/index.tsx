import { Mountain } from 'lucide-react'

import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className={styles.container}>
      <div>
        <Mountain />
      </div>
      <nav>
        <a href="#services">{t('ourServices')}</a>
        <a href="#portfolio">{t('portfolio')}</a>
        <a href="#contact">{t('contact')}</a>
      </nav>
    </header>
  )
}
