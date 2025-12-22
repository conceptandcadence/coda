import type { Metadata, Viewport } from 'next'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${sometypeMono.variable} bg-(--app-bg) text-(--app-fg) tracking-tight antialiased`}
      >
        <PaletteProvider>
          <LanguageProvider>
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
