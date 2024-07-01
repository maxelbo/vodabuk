import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const font = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });

const headTitle = 'Vödabuk';
const headDesc = 'A Volapük Dictionary.';
const headCreator = 'Max Elbo';

export const metadata: Metadata = {
  title: headTitle,
  description: headDesc,
  creator: headCreator,
  publisher: headCreator,
  openGraph: {
    type: 'website',
    url: 'https://vodabuk.com',
    title: headTitle,
    description: headDesc,
    siteName: headTitle,
    images: [
      {
        url: 'https://vodabuk.com/og-image.png',
        width: 1200,
        height: 630,
        alt: headTitle,
      },
    ],
  },
  twitter: {
    site: 'https://vodabuk.com',
    title: headTitle,
    description: headDesc,
    creator: headCreator,
    images: [
      {
        url: 'https://vodabuk.com/og-image.png',
        width: 1200,
        height: 630,
        alt: headTitle,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex h-dvh flex-col justify-between bg-slate-900 text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <header className="flex items-center justify-between bg-slate-800 p-4">
            <a href="/" aria-label="home." className="text-lg">
              Vödabuk
            </a>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </header>
          <main className="mb-auto p-4">{children}</main>
          <footer className="h-8 text-center">
            <small>Based on the work of the late Ralph Midgley.</small>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
