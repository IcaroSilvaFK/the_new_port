import { useTranslation } from 'react-i18next'

import { certifications } from '../../data/certifications'
import styles from './styles.module.scss'

export function Certifications() {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const fmt = new Intl.DateTimeFormat(language?.startsWith('en') ? 'en-US' : 'pt-BR', {
    month: 'short',
    year: 'numeric',
  })
  const formatDate = (ym: string) => {
    const [y, m] = ym.split('-').map(Number)
    return fmt.format(new Date(y, m - 1, 1)).replace('.', '').replace(' de ', ' ')
  }

  return (
    <section className={styles.certs} aria-labelledby="certs-title">
      <div className={styles.head}>
        <h2 id="certs-title">{t('certsTitle')}</h2>
        <p>{t('certsIntro')}</p>
      </div>

      <div className={styles.groups}>
        {certifications.map((group) => (
          <div key={group.issuer} className={styles.group}>
            <h3>{group.issuer}</h3>
            <ul>
              {group.items.map((c) => (
                <li key={c.name}>
                  <span>{c.name}</span>
                  <time dateTime={c.issued}>{formatDate(c.issued)}</time>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
