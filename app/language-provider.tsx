'use client'

import * as React from 'react'

export type Language = 'en' | 'pt'

const COOKIE_KEY = 'language'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 // 1 year

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  initialized: boolean
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

function getPreferredLanguage(): Language {
  const cookie = readCookie(COOKIE_KEY)
  if (cookie === 'en' || cookie === 'pt') return cookie

  // Back-compat migration from older localStorage implementation
  const stored = window.localStorage.getItem(COOKIE_KEY)
  if (stored === 'en' || stored === 'pt') {
    writeCookie(COOKIE_KEY, stored, COOKIE_MAX_AGE_SECONDS)
    window.localStorage.removeItem(COOKIE_KEY)
    return stored
  }

  // Site default: Portuguese unless the user explicitly chose English.
  return 'pt'
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

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode
  initialLang?: Language
}) {
  // Initialize from server-provided language (cookie), so first paint matches.
  const [lang, setLang] = React.useState<Language>(initialLang ?? 'pt')
  const [initialized, setInitialized] = React.useState(true)

  React.useEffect(() => {
    // If no initialLang was provided (or old pages), fall back to client-side preference.
    if (initialLang == null) {
      setLang(getPreferredLanguage())
    }
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


