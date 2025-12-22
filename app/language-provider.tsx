'use client'

import * as React from 'react'

export type Language = 'en' | 'pt'

const STORAGE_KEY = 'language'

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  initialized: boolean
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

function getPreferredLanguage(): Language {
  // Default language for SSR/first paint
  if (typeof window === 'undefined') return 'pt'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'pt') return stored

  const navLang =
    window.navigator.languages?.[0] ?? window.navigator.language ?? 'en'
  return navLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with 'pt' to match server render, then update to preferred language after mount
  const [lang, setLang] = React.useState<Language>('pt')
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    // Update to preferred language after mount to avoid hydration mismatch
    setLang(getPreferredLanguage())
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = React.useMemo<LanguageContextValue>(() => ({ lang, setLang, initialized }), [lang, initialized])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}


