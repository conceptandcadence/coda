'use client'

import * as React from 'react'

export type PaletteStage = 1 | 2 | 3 | 4 | 5

const COOKIE_KEY = 'palette-stage'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 // 1 hour

type PaletteContextValue = {
  stage: PaletteStage
  setStage: (stage: PaletteStage) => void
  initialized: boolean
  nextStage: () => void
}

const PaletteContext = React.createContext<PaletteContextValue | null>(null)

function clampStage(value: unknown): PaletteStage {
  const n = Number(value)
  if (n === 1 || n === 2 || n === 3 || n === 4 || n === 5) return n
  return 1
}

function readStoredStage(): PaletteStage | null {
  if (typeof window === 'undefined') return null
  const cookie = readCookie(COOKIE_KEY)
  if (cookie != null) return clampStage(cookie)

  // Back-compat migration from older localStorage implementation
  const stored = window.localStorage.getItem(COOKIE_KEY)
  if (stored == null) return null
  const stage = clampStage(stored)
  writeCookie(COOKIE_KEY, String(stage), COOKIE_MAX_AGE_SECONDS)
  window.localStorage.removeItem(COOKIE_KEY)
  return stage
}

function stageFromLocalTime(): PaletteStage {
  // Uses the user's local time zone.
  const hour = new Date().getHours()

  // Late / night-owl
  if (hour >= 0 && hour < 5) return 5
  // Morning
  if (hour >= 5 && hour < 12) return 1
  // Afternoon
  if (hour >= 12 && hour < 17) return 2
  // Evening
  if (hour >= 17 && hour < 20) return 3
  // Night
  return 4
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

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  // Start deterministic for SSR hydration. We'll load persisted stage after mount.
  const [stage, setStageState] = React.useState<PaletteStage>(1)
  const [initialized, setInitialized] = React.useState(false)
  const [hasManualStage, setHasManualStage] = React.useState(false)

  React.useEffect(() => {
    const stored = readStoredStage()
    if (stored != null) {
      setStageState(stored)
      setHasManualStage(true)
    } else {
      setStageState(stageFromLocalTime())
    }
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    // Keep HTML attribute in sync so CSS can react.
    document.documentElement.dataset.stage = String(stage)
    // Only persist after the user has manually changed the stage.
    if (hasManualStage) {
      writeCookie(COOKIE_KEY, String(stage), COOKIE_MAX_AGE_SECONDS)
    }
  }, [stage, hasManualStage])

  const setStage = React.useCallback((next: PaletteStage) => {
    setHasManualStage(true)
    setStageState(next)
  }, [])

  const nextStage = React.useCallback(() => {
    setHasManualStage(true)
    setStageState((prev) => ((prev % 5) + 1) as PaletteStage)
  }, [])

  const value = React.useMemo<PaletteContextValue>(
    () => ({ stage, setStage, initialized, nextStage }),
    [stage, initialized, nextStage],
  )

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
}

export function usePalette() {
  const ctx = React.useContext(PaletteContext)
  if (!ctx) throw new Error('usePalette must be used within PaletteProvider')
  return ctx
}


