import type { Metadata } from 'next';
import { Libre_Baskerville, Lugrasimo } from 'next/font/google';
import './globals.css';
import type { Children } from '@/lib/types';

import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';
// TODO: Add LanguageSelect component
// import LanguageSelect from '@/components/LanguageSelect';
import Link from 'next/link';

const font = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });
const logoFont = Lugrasimo({ subsets: ['latin'], weight: ['400'] });

const headTitle = 'Vödabuk';
const headDesc = 'A Volapük Dictionary.';
const headCreator = 'Max Elbo';
const headPublisher = 'Svistef Pükas Mekavik';
const headUrl = 'https://vodabuk.com';
const headImage = 'https://vodabuk.com/images/og-image.png';
const menuLinkList = [{ href: '/about', text: 'About' }];
const footerText = `${new Date().getFullYear()}, ${headPublisher}`;

export const metadata: Metadata = {
  title: headTitle,
  description: headDesc,
  creator: headCreator,
  publisher: headPublisher,
  openGraph: {
    type: 'website',
    url: headUrl,
    title: headTitle,
    description: headDesc,
    siteName: headTitle,
    images: [
      {
        url: headImage,
        width: 1200,
        height: 630,
        alt: headTitle,
      },
    ],
  },
  twitter: {
    site: headUrl,
    title: headTitle,
    description: headDesc,
    creator: headCreator,
    images: [
      {
        url: headImage,
        width: 1200,
        height: 630,
        alt: headTitle,
      },
    ],
  },
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex h-dvh flex-col justify-between bg-slate-900 text-white`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <header className="flex items-center justify-between bg-slate-800 p-4">
              <Link href="/" aria-label="home." className={`${logoFont.className} text-xl`}>
                {headTitle}
              </Link>
              <ul className="flex gap-4">
                {/* <li>
                  <LanguageSelect />
                </li> */}
                {menuLinkList.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="underline hover:opacity-80">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </header>
            <main className="mb-auto p-4">{children}</main>
            <footer className="h-20 p-4 text-center sm:h-14">
              <small>{footerText}.</small>
            </footer>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
