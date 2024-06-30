import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const font = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Vödabuk',
  description: 'Vödabuk is a Volapük dictionary that uses the Vōdabuk API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex h-screen flex-col justify-between bg-slate-900 text-white`}
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
