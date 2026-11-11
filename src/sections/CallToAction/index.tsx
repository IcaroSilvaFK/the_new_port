import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { RevealText } from '../../components/RevealText'
import { whatsappUrl } from '../../lib/contact'
import styles from './styles.module.scss'

export function CallToAction() {
  const { t } = useTranslation()

  return (
    <section className={styles.wrap}>
      <div className={styles.band}>
        <div>
          <RevealText className={styles.title} text={t('ctaTitle')} />
          <p>{t('ctaBody')}</p>
        </div>
        <div className={styles.actions}>
          <a href="#contact" className={styles.primary}>
            {t('ctaForm')}
          </a>
          <a
            href={whatsappUrl(t('whatsappMessage'))}
            target="_blank"
            rel="noreferrer"
            className={styles.secondary}
          >
            <MessageCircle size={18} strokeWidth={1.8} aria-hidden />
            {t('whatsappCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
