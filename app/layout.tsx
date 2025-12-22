import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import { Vesper_Libre, Sometype_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { AnimatedHeader } from './animated-header'
import { LanguageProvider } from './language-provider'
import { PaletteProvider } from './palette-provider'
import { MotionCursor } from '@/components/motion-cursor'
import { AnimatedFavicon } from '@/components/animated-favicon'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nim-fawn.vercel.app/'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Luke Ragno',
    template: '%s | Nim'
  },
  description:  'An american designer and developer based in Porto, Portugal.',
};

const geist = Vesper_Libre({
  variable: '--font-vesper-libre',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
})

const sometypeMono = Sometype_Mono({
  variable: '--font-sometype-mono',
  subsets: ['latin'],
  weight: 'variable',
})

function guessLangFromAcceptLanguage(acceptLanguage: string | null): 'en' | 'pt' | null {
  if (!acceptLanguage) return null
  // Example: "en-US,en;q=0.9,pt-PT;q=0.8"
  const first = acceptLanguage.split(',')[0]?.trim().toLowerCase()
  if (!first) return null
  if (first.startsWith('pt')) return 'pt'
  if (first.startsWith('en')) return 'en'
  return null
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const languageCookie = cookieStore.get('language')?.value
  const headerStore = await headers()
  const country = headerStore.get('x-vercel-ip-country')?.toUpperCase() ?? null

  const geoLang: 'en' | 'pt' = country === 'PT' || country === 'BR' ? 'pt' : 'en'
  const acceptLangGuess = guessLangFromAcceptLanguage(
    headerStore.get('accept-language'),
  )

  const initialLang =
    languageCookie === 'en' || languageCookie === 'pt'
      ? languageCookie
      : acceptLangGuess ?? geoLang

  return (
    <html lang={initialLang} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${sometypeMono.variable} bg-(--app-bg) text-(--app-fg) tracking-tight antialiased`}
      >
        <PaletteProvider>
          <LanguageProvider initialLang={initialLang}>
            <AnimatedFavicon />
            <MotionCursor />
            <div className="flex min-h-screen w-full flex-col font-(family-name:--font-inter-tight)">
              <div className="relative mx-auto w-full max-w-4xl flex-1 px-4 pt-20 pb-12">
                <AnimatedHeader />
                {children}
              </div>
            </div>
            <Analytics />
          </LanguageProvider>
        </PaletteProvider>
      </body>
    </html>
  )
}
