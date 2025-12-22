'use client'

import * as React from 'react'
import Link from 'next/link'
import { useLanguage } from '../language-provider'
import { preventClickIfSelectingText } from '@/lib/prevent-click-on-selection'

const COPY = {
  en: {
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
      'This site may store small preference cookies in your browser (for example, language and color/palette choices). These are used only to remember your settings on this device. These cookies expire after 1 year.',
    contactTitle: 'Contact',
    contactBody: 'If you have questions about privacy, contact',
  },
  pt: {
    title: 'Privacidade',
    updated: 'Última atualização',
    back: 'Voltar',
    summaryTitle: 'Resumo',
    summaryBody:
      'Este site não utiliza rastreadores de publicidade. Usa Vercel Web Analytics para compreender uso agregado e melhorar o site.',
    noBanner:
      'Não mostramos um banner de cookies porque não utilizamos cookies de publicidade nem rastreamento de terceiros.',
    analyticsTitle: 'Analítica',
    analyticsBody:
      'Usamos Vercel Web Analytics (fornecido pela Vercel Inc.) para medir visitas e padrões básicos de utilização. O Vercel Web Analytics foi concebido para funcionar sem cookies e não utiliza cookies publicitários de terceiros.',
    legalBasis:
      'Base legal: interesses legítimos (medir e melhorar o desempenho e o conteúdo do site).',
    localPrefsTitle: 'Preferências locais',
    localPrefsBody:
      'Este site pode guardar pequenos cookies de preferência no seu navegador (por exemplo, idioma e escolhas de cor/paleta). Isto serve apenas para lembrar as suas definições neste dispositivo. Estes cookies expiram após 1 ano.',
    contactTitle: 'Contacto',
    contactBody: 'Se tiver dúvidas sobre privacidade, contacte',
  },
} as const

export function PrivacyContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]

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
            {t.back}
          </Link>
          <span className="text-current">
            {t.updated}: 2025-12-22
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-(family-name:--font-vesper-libre) tracking-tight">
          {t.title}
        </h1>
      </header>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {t.summaryTitle}
          </h2>
          <p className="font-(family-name:--font-vesper-libre) text-3xl leading-tight lg:text-4xl text-current">
            {t.summaryBody}
          </p>
          <p className="font-(family-name:--font-vesper-libre) text-3xl leading-tight lg:text-4xl text-current">
            {t.noBanner}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {t.analyticsTitle}
          </h2>
          <p className="font-(family-name:--font-vesper-libre) text-3xl leading-tight lg:text-4xl text-current">
            {t.analyticsBody}
          </p>
          <p className="font-(family-name:--font-vesper-libre) text-3xl leading-tight lg:text-4xl text-current">
            {t.legalBasis}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {t.localPrefsTitle}
          </h2>
          <p className="font-(family-name:--font-vesper-libre) text-3xl leading-tight lg:text-4xl text-current">
            {t.localPrefsBody}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-(family-name:--font-sometype-mono) text-sm font-medium">
            {t.contactTitle}
          </h2>
          <p className="font-(family-name:--font-vesper-libre) text-3xl leading-tight lg:text-4xl text-current">
            {t.contactBody}{' '}
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


