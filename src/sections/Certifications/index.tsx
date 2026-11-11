import { useTranslation } from 'react-i18next'

import { certifications } from '../../data/certifications'
import styles from './styles.module.scss'

// One flat list, most recent first, so the columns balance themselves.
const items = certifications
  .flatMap((group) => group.items.map((item) => ({ ...item, issuer: group.issuer })))
  .sort((a, b) => b.issued.localeCompare(a.issued))

export function Certifications() {
  const { t } = useTranslation()

  return (
    <section className={styles.certs} aria-labelledby="certs-title">
      <div className={styles.head}>
        <h2 id="certs-title">{t('certsTitle')}</h2>
        <p>{t('certsIntro')}</p>
      </div>

      <ul className={styles.list}>
        {items.map((c) => (
          <li key={c.name}>
            <span>{c.name}</span>
            <small>
              {c.issuer}, {c.issued.slice(0, 4)}
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}
