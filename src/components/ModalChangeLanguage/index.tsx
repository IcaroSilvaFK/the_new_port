import { useTranslation } from 'react-i18next'
import { useTranslatorContext } from '../../hooks/useTranslatorContext'
import { X } from 'lucide-react'

import styles from './styles.module.scss'
import { useCallback } from 'react'
import { success } from '../../externals/toast/toast'
import { constants } from '../../common/contants/constants'

export function ModalChangeLanguage() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation()
  const { isOpenModalChangeLanguage, handleCloseModalChangeLanguage } = useTranslatorContext()

  const onRequestSave = useCallback(() => {
    localStorage.setItem(constants.languageKey, language)
    success(t('changeLanguageSucess'))
    handleCloseModalChangeLanguage()
  }, [language])

  if (!isOpenModalChangeLanguage) return

  return (
    <div onClick={handleCloseModalChangeLanguage} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()}>
        <header>
          <h3>{t('selectLanguage')}</h3>

          <button onClick={handleCloseModalChangeLanguage}>
            <X />
          </button>
        </header>
        <p>{t('chooseYourPreferredLanguage')}</p>
        <ul>
          <li>
            <button
              className={language === 'en' ? styles.active : ''}
              onClick={() => changeLanguage('en')}
            >
              <div>
                <span>🇺🇸</span>
              </div>
              <span>{t('enTranslate')}</span>
            </button>
          </li>
          <li>
            <button
              className={language === 'pt' ? styles.active : ''}
              onClick={() => changeLanguage('pt')}
            >
              <div>
                <span>🇧🇷</span>
              </div>
              <span>{t('ptTranslate')}</span>
            </button>
          </li>
        </ul>
        <footer>
          <button onClick={onRequestSave}>{t('save')}</button>
        </footer>
      </div>
    </div>
  )
}
