import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation from './translation.json'

i18n.use(initReactI18next).init({
  lng: 'de',
  fallbackLng: 'de',
  resources: {
    de: { translation },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
