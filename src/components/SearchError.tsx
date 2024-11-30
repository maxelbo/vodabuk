'use client';

import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps } from '@/lib/types';

export default function Search() {
  const { lang } = useLangContext() as LangContextProps;

  return (
    <div className="text-center">
      <h1 className="text-lg font-bold">
        {lang === 'english' ? 'Error' : 'Eraro'}
        &nbsp;/ Pöl
      </h1>
      <p>
        {lang === 'english'
          ? 'Failed to fetch the dictionary data.'
          : 'Ne eblis elŝuti la datumojn de la vortaro.'}
      </p>
      <p>Ädefon ad ramenön nunädis vödabuka.</p>
    </div>
  );
}
