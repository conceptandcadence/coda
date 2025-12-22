import type { Metadata, Viewport } from 'next'
import { Vesper_Libre, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AnimatedHeader } from './animated-header'
import { LanguageProvider } from './language-provider'
import { PaletteProvider } from './palette-provider'

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

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-(--palette-bg) text-(--palette-fg) tracking-tight antialiased`}
      >
        <PaletteProvider>
          <LanguageProvider>
            <div className="flex min-h-screen w-full flex-col font-(family-name:--font-inter-tight)">
              <div className="relative mx-auto w-full max-w-screen-md flex-1 px-4 py-20">
                <AnimatedHeader />
                {children}
              </div>
            </div>
          </LanguageProvider>
        </PaletteProvider>
      </body>
    </html>
  )
}
