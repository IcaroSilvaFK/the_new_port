import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { constants } from '../common/contants/constants'
import enUs from './translations/enUs.json'
import ptBr from './translations/ptBr.json'

const resources = {
  en: enUs,
  pt: ptBr,
}

type Lang = keyof typeof resources

// Accepts 'pt', 'pt-BR', 'en-GB', 'EN'… and maps to a supported language.
function normalize(value: string | null | undefined): Lang | undefined {
  const base = value?.slice(0, 2).toLowerCase()
  return base && base in resources ? (base as Lang) : undefined
}

function readStored() {
  try {
    return localStorage.getItem(constants.languageKey)
  } catch {
    return null
  }
}

const browserLang = navigator.languages?.map(normalize).find(Boolean) ?? normalize(navigator.language)

const initialLang = normalize(readStored()) ?? browserLang ?? 'pt'

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: 'pt',
  supportedLngs: ['pt', 'en'],
  interpolation: {
    escapeValue: false, // React already escapes
  },
})

document.documentElement.lang = initialLang === 'pt' ? 'pt-BR' : 'en'
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng === 'pt' ? 'pt-BR' : 'en'
})

export default i18n
