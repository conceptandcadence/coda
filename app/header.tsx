'use client'
import { motion } from 'motion/react'
import * as React from 'react'
import { useTheme } from './theme-provider'
import { AnimatedLogo } from '@/components/animated-logo'

function ThemeToggleIcon({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {theme === 'dark' ? (
        <motion.g
          initial={false}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      ) : (
        <motion.g
          initial={false}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.g>
      )}
    </motion.svg>
  )
}

export function Header() {
  const { theme, toggleTheme, initialized } = useTheme()

  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <AnimatedLogo />
      </div>
      <div className="flex items-center gap-4">
        {initialized && (
          <button
            type="button"
            onClick={toggleTheme}
            data-cursor-zone="overlay"
            className="inline-flex items-center justify-center p-2 font-(family-name:--font-sometype-mono) text-sm font-medium text-current opacity-80 transition-opacity duration-100 hover:opacity-100 focus-visible:outline-2"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <ThemeToggleIcon theme={theme} />
          </button>
        )}
      </div>
    </header>
  )
}
