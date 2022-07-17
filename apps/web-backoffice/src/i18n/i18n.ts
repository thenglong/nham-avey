import i18n from "i18next"
import languageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import en from "./translations/en"
import km from "./translations/km"

const resources = {
  en: { translation: en },
  km: { translation: km },
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    fallbackLng: "en",
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
