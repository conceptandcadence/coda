'use client'

import * as React from 'react'

export type PaletteStage = 1 | 2 | 3 | 4 | 5

const STORAGE_KEY = 'palette-stage'

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

function readStoredStage(): PaletteStage {
  if (typeof window === 'undefined') return 1
  return clampStage(window.localStorage.getItem(STORAGE_KEY))
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  // Start deterministic for SSR hydration. We'll load persisted stage after mount.
  const [stage, setStage] = React.useState<PaletteStage>(1)
  const [initialized, setInitialized] = React.useState(false)

  React.useEffect(() => {
    const stored = readStoredStage()
    setStage(stored)
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    // Keep HTML attribute in sync so CSS can react.
    document.documentElement.dataset.stage = String(stage)
    window.localStorage.setItem(STORAGE_KEY, String(stage))
  }, [stage])

  const nextStage = React.useCallback(() => {
    setStage((prev) => ((prev % 5) + 1) as PaletteStage)
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


