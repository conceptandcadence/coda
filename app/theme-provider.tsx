'use client'

import * as React from 'react'

export type Theme = 'light' | 'dark'

const COOKIE_KEY = 'theme'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 // 1 year

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initialized: boolean
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const cookie = readCookie(COOKIE_KEY)
  if (cookie === 'light' || cookie === 'dark') return cookie

  // Back-compat migration from older localStorage implementation
  const stored = window.localStorage.getItem(COOKIE_KEY)
  if (stored === 'light' || stored === 'dark') {
    writeCookie(COOKIE_KEY, stored, COOKIE_MAX_AGE_SECONDS)
    window.localStorage.removeItem(COOKIE_KEY)
    return stored
  }

  return null
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
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start deterministic for SSR hydration. We'll load persisted theme after mount.
  const [theme, setThemeState] = React.useState<Theme>('light')
  const [initialized, setInitialized] = React.useState(false)
  const [hasManualTheme, setHasManualTheme] = React.useState(false)

  React.useEffect(() => {
    const stored = readStoredTheme()
    if (stored != null) {
      setThemeState(stored)
      setHasManualTheme(true)
    } else {
      setThemeState(getSystemTheme())
    }
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    // Apply theme class to html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Only persist theme choice if user has manually set it
    if (hasManualTheme) {
      writeCookie(COOKIE_KEY, theme, COOKIE_MAX_AGE_SECONDS)
    }
  }, [theme, hasManualTheme])

  // Listen for system theme changes (only if no manual override)
  React.useEffect(() => {
    if (!initialized || hasManualTheme) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      setThemeState(getSystemTheme())
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [initialized, hasManualTheme])

  const setTheme = React.useCallback((next: Theme) => {
    setHasManualTheme(true)
    setThemeState(next)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setHasManualTheme(true)
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, initialized }),
    [theme, setTheme, toggleTheme, initialized],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
