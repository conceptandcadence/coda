'use client'
import { motion } from 'motion/react'
import * as React from 'react'
import { TextEffect } from '@/components/ui/text-effect'
import { useLanguage } from './language-provider'
import { type PaletteStage, usePalette } from './palette-provider'

function StageHorizonIcon({ stage }: { stage: PaletteStage }) {
  const clipId = React.useId()

  // 5-stage "sun above horizon" mapping:
  // 1 = high sun, 3 = near horizon, 5 = fully set.
  const cyByStage: Record<PaletteStage, number> = {
    1: 2.2,
    2: 4.6,
    // Evening: nearly set (close to the horizon at the bottom)
    3: 9.8,
    // Night/Late: fully gone (below the horizon clip at y=11)
    4: 13.2,
    5: 14.4,
  }

  // Moon fades in from evening -> night -> late to help differentiate stages.
  const moonOpacityByStage: Record<PaletteStage, number> = {
    1: 0,
    2: 0,
    3: 0.28,
    4: 0.6,
    5: 0.9,
  }

  // Keep the crescent shape constant; animate brightness and a tiny drift (night -> late).
  const moonBase = { cx: 7.6, cy: 2.25 }
  const moonOffsetByStage: Record<PaletteStage, { x: number; y: number }> = {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    // Evening -> Night -> Late: gradual up-left travel (reads like sky rotation)
    3: { x: 0.25, y: 0.15 },
    4: { x: -0.2, y: -0.15 },
    5: { x: -0.55, y: -0.45 },
  }

  // Stars appear as the day progresses into evening/night.
  // Keep deterministic positions (no randomness) for stable SSR/hydration.
  const stars = [
    // Fewer, bolder stars (more visible twinkle).
    // Stage 3: first star shows up
    // Distributed across the larger sky area (horizon is at the bottom now),
    // and kept away from the moon footprint.
    { cx: 2.2, cy: 3.1, r: 0.72, startStage: 3, twinkleDelay: 0.0 },

    // Stage 4: add two more
    { cx: 10.7, cy: 2.6, r: 0.62, startStage: 4, twinkleDelay: 0.18 },

    // Stage 5: final night star
    { cx: 3.7, cy: 8.7, r: 0.6, startStage: 5, twinkleDelay: 0.22 },
		{ cx: 6.2, cy: 5.9, r: 0.58, startStage: 4, twinkleDelay: 0.34 },

  ] as const

  return (
    <motion.svg
      viewBox="0 0 12 12"
      className="h-7 w-7 shrink-0 translate-y-[4px]"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Clip sun so it can "set" behind the horizon line */}
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="11" />
        </clipPath>
      </defs>

      {/* Crescent moon (constant shape; brightness + tiny drift) */}
      <motion.g
        initial={false}
        animate={{
          opacity: moonOpacityByStage[stage],
          x: moonOffsetByStage[stage].x,
          y: moonOffsetByStage[stage].y,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.6 }}
      >
        <circle cx={moonBase.cx} cy={moonBase.cy} r="2" fill="currentColor" />
        <circle
          cx={moonBase.cx + 0.95}
          cy={moonBase.cy}
          r="1.75"
          fill="var(--app-bg)"
        />
      </motion.g>

      {/* Stars (appear as sun sets) */}
      {stars.map((s, i) => {
        const visible = stage >= s.startStage
        const baseOpacity =
          stage === 3 ? 0.85 : stage === 4 ? 1 : stage === 5 ? 1 : 0

        return (
          <motion.circle
            key={`star-${i}`}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="currentColor"
            initial={false}
            animate={{
              // Less subtle twinkle: pulse both scale and opacity in a loop.
              opacity: visible ? [baseOpacity * 0.45, baseOpacity, baseOpacity * 0.55] : 0,
              scale: visible ? [0.86, 1.18, 0.9, 1] : 0.75,
            }}
            transition={{
              opacity: visible
                ? {
                    duration: 2.1,
                    delay: s.twinkleDelay + i * 0.06,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
                : { type: 'tween', duration: 0.2 },
              scale: visible
                ? {
                    duration: 2.1,
                    delay: s.twinkleDelay + i * 0.06,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
                : { type: 'tween', duration: 0.2 },
            }}
          />
        )
      })}

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
        y1="11"
        y2="11"
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
      data-cursor-zone="overlay"
      className="inline-flex items-center gap-2 text-current transition-opacity duration-100 opacity-80 hover:opacity-100 focus-visible:outline-2"
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
      night: 'Evening',
      late: 'Still up?',
    },
    pt: {
      morning: 'Bom Dia',
      afternoon: 'Boa Tarde',
      evening: 'Boa Tarde',
      night: 'Boa Noite',
      late: 'Ainda acordado?',
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
        data-cursor-zone="overlay"
        className="inline-flex items-center gap-2 font-(family-name:--font-sometype-mono) text-sm font-medium text-current transition-opacity duration-100 opacity-80 hover:opacity-100 focus-visible:outline-2"
        aria-label={`Cycle palette stage (current: ${stage})`}
      >
        <StageHorizonIcon stage={stage} />
        <TextEffect
          key={greeting}
          as="span"
          per="word"
          preset="fade-in-blur"
          delay={0.02}
          speedReveal={1.2}
          speedSegment={1.1}
          trigger={Boolean(greeting)}
          className="min-w-[15ch] whitespace-nowrap text-left"
        >
          {greeting}
        </TextEffect>
      </button>
      <div className="flex items-end gap-4">
        <div className="flex items-end gap-4">
          <button
            type="button"
            onClick={() => setLang('pt')}
            data-cursor-zone="overlay"
            aria-pressed={isPT}
            className={`font-(family-name:--font-sometype-mono) pb-1 text-sm font-medium lowercase tracking-tight transition-colors ${
              isPT
                ? 'border-b-2 border-current text-current'
                : 'border-b-2 border-transparent text-current opacity-70 hover:opacity-100'
            }`}
          >
            pt
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            data-cursor-zone="overlay"
            aria-pressed={isEN}
            className={`font-(family-name:--font-sometype-mono) pb-1 text-sm font-medium lowercase tracking-tight transition-colors ${
              isEN
                ? 'border-b-2 border-current text-current'
                : 'border-b-2 border-transparent text-current opacity-70 hover:opacity-100'
            }`}
          >
            en
          </button>
        </div>
      </div>
    </header>
  )
}
