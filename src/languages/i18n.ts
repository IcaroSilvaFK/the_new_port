import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBr from './translations/ptBr.json'
import enUs from './translations/enUs.json'
import { constants } from '../common/contants/constants'

const defaultSelectedLanguage = localStorage.getItem(constants.languageKey)

const resources = {
  en: enUs,
  pt: ptBr,
}

i18n
  .use(initReactI18next)
  //@ts-expect-error
  .init({
    resources,
    lng: defaultSelectedLanguage ? defaultSelectedLanguage : 'pt',
    interpolation: {
      scapeValue: true,
    },
  })

export default i18n
