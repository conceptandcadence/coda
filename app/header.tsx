'use client'
import { motion } from 'motion/react'
import * as React from 'react'
import { useLanguage } from './language-provider'
import { type PaletteStage, usePalette } from './palette-provider'

function StageHorizonIcon({ stage }: { stage: PaletteStage }) {
  const clipId = React.useId()

  // 5-stage "sun above horizon" mapping:
  // 1 = high sun, 3 = near horizon, 5 = fully set.
  const cyByStage: Record<PaletteStage, number> = {
    1: 2.2,
    2: 3.3,
    3: 4.8,
    4: 6.2,
    5: 9.2,
  }

  // Moon fades in as the sun goes down (stage 1 -> hidden, stage 5 -> visible).
  const moonOpacityByStage: Record<PaletteStage, number> = {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.45,
    5: 0.65,
  }

  // Keep a constant distance between the sun and moon as they move.
  // This means the moon starts above the viewport for early stages (which is intentional).
  const moonYOffset = 3.2
  const moonCy = cyByStage[stage] - moonYOffset

  return (
    <motion.svg
      viewBox="0 0 12 12"
      className="h-6 w-6"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Clip sun so it can "set" behind the horizon line */}
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="7" />
        </clipPath>
      </defs>

      {/* Moon (appears as sun sets) */}
      <motion.circle
        cx="9.2"
        r="1.6"
        fill="currentColor"
        animate={{
          cy: moonCy,
          opacity: moonOpacityByStage[stage],
          scale: 0.9 + moonOpacityByStage[stage] * 0.2,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.6 }}
      />

      {/* Sun (clipped by horizon) */}
      <motion.circle
        cx="6"
        r="2"
        clipPath={`url(#${clipId})`}
        fill="currentColor"
        animate={{ cy: cyByStage[stage] }}
        transition={{ type: 'spring', stiffness: 520, damping: 34, mass: 0.55 }}
      />

      {/* Horizon */}
      <line
        x1="1"
        x2="11"
        y1="7"
        y2="7"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

function PaletteStageSwitch() {
  const { stage, nextStage, initialized } = usePalette()

  // Keep hook order stable; just render nothing until initialized.
  if (!initialized) return null

  return (
    <button
      type="button"
      onClick={nextStage}
      className="inline-flex items-center gap-2 text-current/60 transition-colors duration-100 hover:text-current focus-visible:outline-2"
      aria-label={`Cycle palette stage (current: ${stage})`}
    >
      <StageHorizonIcon stage={stage} />
    </button>
  )
}

function getPortoGreetingForStage(
  language: 'en' | 'pt',
  stage: PaletteStage,
): string {
  const greetings = {
    en: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
      night: 'Good Night',
      late: 'Hey nightowl',
    },
    pt: {
      morning: 'Bom Dia',
      afternoon: 'Boa Tarde',
      evening: 'Boa Tarde',
      night: 'Boa Noite',
      late: 'Olá, noctívago',
    },
  } as const

  const keyByStage: Record<PaletteStage, keyof (typeof greetings)['en']> = {
    1: 'morning',
    2: 'afternoon',
    3: 'evening',
    4: 'night',
    5: 'late',
  }

  return greetings[language][keyByStage[stage]]
}

export function Header() {
  const { lang, setLang, initialized } = useLanguage()
  const { stage, initialized: paletteInitialized, nextStage } = usePalette()

  const isPT = initialized && lang === 'pt'
  const isEN = initialized && lang === 'en'
  const greeting =
    initialized && paletteInitialized ? getPortoGreetingForStage(lang, stage) : ''

  return (
    <header className="mb-8 flex items-center justify-between">
      <button
        type="button"
        onClick={nextStage}
        className="inline-flex items-center gap-2 font-(family-name:--font-geist-mono) text-sm font-medium text-current/60 transition-colors duration-100 hover:text-current focus-visible:outline-2"
        aria-label={`Cycle palette stage (current: ${stage})`}
      >
        <StageHorizonIcon stage={stage} />
        <span className="min-w-[15ch] whitespace-nowrap text-left">{greeting}</span>
      </button>
      <div className="flex items-end gap-4">
        <div className="flex items-end gap-4">
          <button
            type="button"
            onClick={() => setLang('pt')}
            aria-pressed={isPT}
            className={`font-(family-name:--font-geist-mono) pb-1 text-sm font-medium lowercase tracking-tight transition-colors ${
              isPT
                ? 'border-b-2 border-current text-current'
                : 'border-b-2 border-transparent text-current/60 hover:text-current'
            }`}
          >
            pt
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            aria-pressed={isEN}
            className={`font-(family-name:--font-geist-mono) pb-1 text-sm font-medium lowercase tracking-tight transition-colors ${
              isEN
                ? 'border-b-2 border-current text-current'
                : 'border-b-2 border-transparent text-current/60 hover:text-current'
            }`}
          >
            en
          </button>
        </div>
      </div>
    </header>
  )
}
