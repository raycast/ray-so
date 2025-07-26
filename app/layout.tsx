import { Analytics } from '@vercel/analytics/react';
import {
  Inter,
  Fira_Code,
  IBM_Plex_Mono,
  JetBrains_Mono,
  Roboto_Mono,
} from 'next/font/google';
import './globals.css';
import cn from 'classnames';
import { BASE_URL } from '@/utils/common';
import { TooltipProvider } from '@/components/tooltip';
import { Viewport } from 'next';
import { Toaster } from '@/components/toast';
import { GeistMono } from 'geist/font/mono';
import { Navigation } from '@/components/navigation';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-jetbrainsmono',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-ibmplexmono',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-firacode',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-roboto-mono',
});

const geistMonoFontName = GeistMono.style.fontFamily.split(',')[0];

const title = 'Tech Stacker';
const description = 'Tech Stacker';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: title,
  description: description,
  openGraph: {
    type: 'website',
    siteName: 'Tech Stacker',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@natemcgrady',
  },
};

export const viewport: Viewport = {
  themeColor: '#181818',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <TooltipProvider>
        <body
          className={cn(
            'isolate',
            inter.className,
            jetBrainsMono.variable,
            ibmPlexMono.variable,
            firaCode.variable,
            robotoMono.variable
          )}
          style={
            { '--font-geist-mono': geistMonoFontName } as React.CSSProperties
          }
        >
          <Navigation />
          <main className='flex flex-col min-h-full pt-[50px]'>{children}</main>
          <Toaster position='top-center' offset={70} duration={2000} />
        </body>
      </TooltipProvider>
      <Analytics />
    </html>
  );
}
