'use client';

import { Lugrasimo } from 'next/font/google';
import LanguageSelect from '@/components/LanguageSelect';
import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps } from '@/lib/types';
import Link from 'next/link';

const lugrasimo = Lugrasimo({ subsets: ['latin'], weight: ['400'] });
const logoFont = lugrasimo.className;

interface HeaderProps {
  headTitle: string;
}

export default function Header({ headTitle }: HeaderProps) {
  const { lang } = useLangContext() as LangContextProps;
  const isLangChange = true; // Show language select

  const menuLinkList = [
    {
      href: '/about',
      text: () => {
        return lang === 'english' ? 'About' : 'Informo';
      },
    },
  ];

  return (
    <header className="flex items-center justify-between bg-slate-800 p-4">
      <Link href="/" aria-label="home." className={`${logoFont} text-xl`}>
        {headTitle}
      </Link>
      <ul className="flex gap-4">
        {isLangChange && (
          <li>
            <LanguageSelect />
          </li>
        )}
        {menuLinkList.map((link, i) => (
          <li key={i}>
            <Link href={link.href} className="underline hover:opacity-80">
              {link.text()}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
