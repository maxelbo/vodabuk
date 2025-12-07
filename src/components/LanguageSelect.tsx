'use client';

import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps, Lang } from '@/lib/types';
import { useTranslation } from '@/lib/utils';

const languageList = [
  'english',
  'esperanto',
  // 'volapük'
];

export default function LanguageSelect() {
  const { lang, setLang } = useLangContext() as LangContextProps;
  const { translate } = useTranslation();

  const selectMessage = {
    english: 'Select a language.',
    esperanto: 'Elektu lingvon.',
    volapük: 'Völolös püki.',
  };

  return (
    <select
      className="rounded-md px-4 py-1 capitalize"
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
      aria-label={translate(selectMessage)}
    >
      {languageList.map((lang, i) => (
        <option key={i} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}
