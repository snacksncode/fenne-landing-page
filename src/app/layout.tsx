import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { satoshi, spaceMono } from './fonts';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fenneplanner.com'),
  title: 'Fenne - Foxy Meal Companion',
  description: 'Meal planning, minus the headache',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'Fenne - Foxy Meal Companion',
    description: 'Meal planning, minus the headache',
    url: 'https://fenneplanner.com',
    siteName: 'Fenne',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${spaceMono.variable} overflow-x-hidden`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
