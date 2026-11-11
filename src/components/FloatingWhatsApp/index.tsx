import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { whatsappUrl } from '../../lib/contact'
import { ease } from '../../lib/motion'
import styles from './styles.module.scss'

/** Shows after the hero and steps aside while the contact section is on screen. */
export function FloatingWhatsApp() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > 480))

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {pastHero && !contactVisible && (
        <motion.a
          className={styles.button}
          href={whatsappUrl(t('whatsappMessage'))}
          target="_blank"
          rel="noreferrer"
          aria-label={t('whatsappCta')}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease }}
        >
          <MessageCircle size={20} strokeWidth={1.9} aria-hidden />
          <span>{t('whatsappCta')}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
