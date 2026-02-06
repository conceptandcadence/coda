import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { AnimatedHeader } from './animated-header'
import { ThemeProvider } from './theme-provider'
import { MotionCursor } from '@/components/motion-cursor'
import { AnimatedFavicon } from '@/components/animated-favicon'
import { RandomBackgroundMedia } from '@/components/random-background-media'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nim-fawn.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Concept & Cadence',
    template: '%s | Nim',
  },
  description: 'A design & development studio based in NYC.',
  icons: {
    icon: [
      { url: '/public/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/public/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/public/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/public/favicon.ico', sizes: 'any' },
    ],
    apple: [
      {
        url: '/public/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: '/public/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      {
        url: '/public/apple-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        url: '/public/apple-icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        url: '/public/apple-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      {
        url: '/public/apple-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/public/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/public/ms-icon-144x144.png',
    'msapplication-config': '/public/browserconfig.xml',
  },
}

const ppMori = localFont({
  src: [
    {
      path: '../public/fonts/PPMori-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPMori-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-sometype-mono',
  display: 'swap',
})

const exposureTrial = localFont({
  src: [
    {
      path: '../public/fonts/ExposureTrial[-10].woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ExposureTrial[-10].woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ExposureTrial[-10].otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-pp-mori',
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ppMori.variable} ${exposureTrial.variable} bg-(--app-bg) tracking-tight text-(--app-fg) antialiased`}
      >
        <ThemeProvider>
          <AnimatedFavicon />
          <MotionCursor />
          <RandomBackgroundMedia />
          <div className="flex min-h-screen w-full flex-col font-(family-name:--font-inter-tight)">
            <div className="relative mx-auto w-full max-w-3xl flex-1 px-4 pt-20 pb-12">
              <AnimatedHeader />
              {children}
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
