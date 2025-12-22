'use client'

import * as React from 'react'

export type Language = 'en' | 'pt'

const COOKIE_KEY = 'language'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 // 1 hour

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  initialized: boolean
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

function getPreferredLanguage(): Language {
  // Default language for SSR/first paint
  if (typeof window === 'undefined') return 'pt'

  const cookie = readCookie(COOKIE_KEY)
  if (cookie === 'en' || cookie === 'pt') return cookie

  // Back-compat migration from older localStorage implementation
  const stored = window.localStorage.getItem(COOKIE_KEY)
  if (stored === 'en' || stored === 'pt') {
    writeCookie(COOKIE_KEY, stored, COOKIE_MAX_AGE_SECONDS)
    window.localStorage.removeItem(COOKIE_KEY)
    return stored
  }

  const navLang =
    window.navigator.languages?.[0] ?? window.navigator.language ?? 'en'
  return navLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const parts = document.cookie.split(/;\s*/)
  for (const part of parts) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const key = part.slice(0, idx)
    if (key !== name) continue
    return decodeURIComponent(part.slice(idx + 1))
  }
  return null
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  // No "Secure" so it works on localhost/dev; SameSite=Lax by default.
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`
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
    writeCookie(COOKIE_KEY, lang, COOKIE_MAX_AGE_SECONDS)
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


