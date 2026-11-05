import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { constants } from '../../common/contants/constants'
import { success } from '../../externals/toast/toast'
import { useTranslatorContext } from '../../hooks/useTranslatorContext'
import { ease } from '../../lib/motion'
import { useLenis } from '../../providers/SmoothScroll'
import styles from './styles.module.scss'

const options = [
  { code: 'pt', label: 'ptTranslate' },
  { code: 'en', label: 'enTranslate' },
] as const

export function ModalChangeLanguage() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const { isOpenModalChangeLanguage, handleCloseModalChangeLanguage } = useTranslatorContext()
  const lenis = useLenis()

  const onRequestSave = useCallback(() => {
    localStorage.setItem(constants.languageKey, language)
    success(t('changeLanguageSucess'))
    handleCloseModalChangeLanguage()
  }, [language, t, handleCloseModalChangeLanguage])

  useEffect(() => {
    if (!isOpenModalChangeLanguage) return
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleCloseModalChangeLanguage()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpenModalChangeLanguage, lenis, handleCloseModalChangeLanguage])

  return (
    <AnimatePresence>
      {isOpenModalChangeLanguage && (
        <motion.div
          className={styles.overlay}
          onClick={handleCloseModalChangeLanguage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-title"
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
          >
            <header>
              <h3 id="language-title">{t('selectLanguage')}</h3>
              <button type="button" onClick={handleCloseModalChangeLanguage} aria-label="Fechar / Close" autoFocus>
                <X size={18} />
              </button>
            </header>
            <p>{t('chooseYourPreferredLanguage')}</p>

            <ul>
              {options.map((o) => {
                const active = language?.startsWith(o.code)
                return (
                  <li key={o.code}>
                    <button
                      type="button"
                      className={active ? styles.active : undefined}
                      aria-pressed={active}
                      onClick={() => changeLanguage(o.code)}
                    >
                      <span className={styles.code} aria-hidden>
                        {o.code.toUpperCase()}
                      </span>
                      <span>{t(o.label)}</span>
                      {active && (
                        <motion.span layoutId="lang-check" className={styles.check} transition={{ duration: 0.4, ease }}>
                          <Check size={16} strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <footer>
              <button type="button" onClick={onRequestSave}>
                {t('save')}
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
