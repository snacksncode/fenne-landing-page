import type { Metadata } from 'next'
import { satoshi, spaceMono } from './fonts'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://fenne.app'),
  title: 'Fenne — Your Foxy Meal Companion',
  description:
    'Plan meals, shop smarter, and cook happier with Fenne. The coziest meal planning app for home cooks.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Fenne — Your Foxy Meal Companion',
    description:
      'Plan meals, shop smarter, and cook happier with Fenne. The coziest meal planning app for home cooks.',
    images: ['/icon.png'],
    url: 'https://fenne.app',
    siteName: 'Fenne',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fenne — Your Foxy Meal Companion',
    description:
      'Plan meals, shop smarter, and cook happier with Fenne. The coziest meal planning app for home cooks.',
    images: ['/icon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${spaceMono.variable} overflow-x-hidden`}
    >
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
