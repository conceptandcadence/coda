'use client'

import * as React from 'react'
import Link from 'next/link'
import { preventClickIfSelectingText } from '@/lib/prevent-click-on-selection'

const COPY = {
  title: 'Privacy',
  updated: 'Last updated',
  back: 'Back',
  summaryTitle: 'Summary',
  summaryBody:
    'This site does not use advertising trackers. It uses Vercel Web Analytics to understand aggregate usage and improve the site.',
  noBanner:
    'We do not show a cookie banner because we do not use advertising cookies or third‑party tracking.',
  analyticsTitle: 'Analytics',
  analyticsBody:
    'We use Vercel Web Analytics (provided by Vercel Inc.) to measure visits and basic usage patterns. Vercel Web Analytics is designed to be cookie-less and does not use third‑party advertising cookies.',
  legalBasis:
    'Legal basis: legitimate interests (measuring and improving the performance and content of the site).',
  localPrefsTitle: 'Local preferences',
  localPrefsBody:
    'This site may store small preference cookies in your browser (for example, theme preference). These are used only to remember your settings on this device. These cookies expire after 1 year.',
  contactTitle: 'Contact',
  contactBody: 'If you have questions about privacy, contact',
} as const

export function PrivacyContent() {
  const t = COPY

  return (
    <main className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-baseline justify-between gap-6 font-(family-name:--font-sometype-mono) text-sm mb-12 pt-6 border-t border-current">
          <Link
            href="/"
            data-cursor-zone="overlay"
            className="inline-flex items-center gap-2 text-current font-medium"
            onClickCapture={preventClickIfSelectingText}
          >
            {COPY.back}
          </Link>
          <span className="text-current">
            {COPY.updated}: 2025-12-22
          </span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-(family-name:--font-pp-mori) tracking-tight">
          {COPY.title}
        </h1>
      </header>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {COPY.summaryTitle}
          </h2>
          <p className="font-(family-name:--font-pp-mori) text-3xl leading-tight lg:text-3xl text-current">
            {COPY.summaryBody}
          </p>
          <p className="font-(family-name:--font-pp-mori) text-3xl leading-tight lg:text-3xl text-current">
            {COPY.noBanner}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {COPY.analyticsTitle}
          </h2>
          <p className="font-(family-name:--font-pp-mori) text-3xl leading-tight lg:text-3xl text-current">
            {COPY.analyticsBody}
          </p>
          <p className="font-(family-name:--font-pp-mori) text-3xl leading-tight lg:text-3xl text-current">
            {COPY.legalBasis}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {COPY.localPrefsTitle}
          </h2>
          <p className="font-(family-name:--font-pp-mori) text-3xl leading-tight lg:text-3xl text-current">
            {COPY.localPrefsBody}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {COPY.contactTitle}
          </h2>
          <p className="font-(family-name:--font-pp-mori) text-3xl leading-tight lg:text-3xl text-current">
            {COPY.contactBody}{' '}
            <a
              className="text-current underline underline-offset-8"
              href="mailto:hello@lukeragno.com"
              data-cursor-zone="overlay"
              onClickCapture={preventClickIfSelectingText}
            >
              hello@lukeragno.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}


