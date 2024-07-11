import { Languages } from 'lucide-react'

import styles from './styles.module.scss'
import { useTranslatorContext } from '../../hooks/useTranslatorContext'

export function Translator() {
   const {handleOpenModalChangeLanguage} = useTranslatorContext()

  
  return (
    <div className={styles.container}>
      <button onClick={handleOpenModalChangeLanguage}>
        <Languages />
      </button>
    </div>
  )
}
