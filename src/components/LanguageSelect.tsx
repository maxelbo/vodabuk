'use client';

import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps } from '@/lib/types';

const languageList = ['english', 'esperanto'];

export default function LanguageSelect() {
  const { lang, setLang } = useLangContext() as LangContextProps;

  function getLabel() {
    return lang === 'english' ? 'Select a language.' : 'Elektu lingvon.';
  }

  return (
    <select
      className="rounded-md px-4 py-1 capitalize"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      aria-label={getLabel()}
    >
      {languageList.map((lang, i) => (
        <option key={i} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}