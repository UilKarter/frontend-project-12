import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/locales'

const i18n = i18next.createInstance()

export const i18nPromise = i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    lng: 'ru',
    debug: false,
    resources,
  })
  .then(() => i18n)

export default i18n
