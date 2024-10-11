'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps } from '@/lib/types';

interface AboutTextProps {
  formattedCount: string;
}

export default function AboutText({ formattedCount }: AboutTextProps) {
  const { lang } = useLangContext() as LangContextProps;

  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <h1 className="pb-2 pt-8 text-2xl font-bold">
        {lang === 'english' ? 'About Vödabuk' : 'Pri Vödabuk'}
      </h1>
      <p>
        {lang === 'english'
          ? 'Vödabuk is an open-source Volapük dictionary application designed to make the Volapük language more accessible to everyone.'
          : 'Vödabuk estas malfermita reta Volapuka vortaro, kiu celas fari Volapukon pli alirebla al ĉiuj.'}
      </p>
      {formattedCount && (
        <p>
          {lang === 'english' ? 'It currenlty has ' : 'Ĝi nuntempe havas '}
          <span className="font-bold">{formattedCount}</span>
          {lang === 'english'
            ? ' Volapük words in its database, with translations in English and Esperanto (currently a work in progress.'
            : ' Volapukajn vortojn en sia datumbazo, kun tradukoj en la angla kaj Esperanto (ankoraǔ laboro en progreso).'}
        </p>
      )}
      <br />
      <p>
        {lang === 'english'
          ? 'The dictionary is in continious development. If you find any errors or have suggestions for improvements, please feel free to contact '
          : 'La vortaro estas en daǔra evoluo. Se vi trovas iun ajn eraron aǔ havas sugestojn por plibonigoj, bonvolu kontakti '}
        <Link href="mailto:glidis@vodabuk.com" className="font-bold underline">
          glidis@vodabuk.com
        </Link>
        {lang === 'english' ? ' or open an issue on the ' : ' aǔ malfermi problemon en la '}
        <Link href="https://github.com/maxelbo/vodabuk/issues" className="font-bold underline">
          {lang === 'english' ? 'repository' : 'deponejo'}
        </Link>
        .
      </p>
      <h2 className="pt-8 text-xl font-bold">Sources</h2>
      <p>
        {lang === 'english'
          ? 'The English translations are based on the combined works of the late Ralph Midgley (1929 – 2024), Guvan of the Volapük Community and Honorary Academician of the International Volapük Society. It draws from his '
          : 'La Anglaj tradukoj baziĝas sur la kunigitaj verkoj de la pasinta Ralph Midgley (1929 – 2024), Guvan de la Volapuka Komunumo kaj Honora Akademiano de la Internacia Volapuka Societo. Ĝi ĉerpas vortojn el liaj '}
        <i>&quot;Volapük-English Dictionary&quot;</i>&nbsp;
        {lang === 'english' ? ' and ' : ' kaj '}
        <i>&quot;English-Volapük Dictionary&quot;</i>&nbsp;
        {lang === 'english'
          ? ', both revised in 2010, and his translation of '
          : ', ambaŭ reviziitaj en 2010, kaj lia traduko de '}
        <i>&quot;Vödabuk Volapüka pro Deutänapükans&quot;</i>&nbsp;
        {lang === 'english'
          ? ' by Arie de Jong (1931), which was revised and completed from 2012 – 2022 by Cifal Hermann Philipps. It also includes additional examples extracted from sample texts from Volapük Vifik, and readings from '
          : ' de Arie de Jong (1931), kiu estis reviziita kaj kompletigita de 2012 – 2022 de Cifal Hermann Philipps. Ĝi ankaŭ enhavas aldonajn ekzemplojn el ekzemplaj tekstoj de Volapük Vifik, kaj legaĵoj de '}
        <Link href="https://volapük.com" className="font-bold underline">
          volapük.com
        </Link>
        .
      </p>
      <div className="pt-16">
        <Link href="/" className={buttonVariants()}>
          {lang === 'english' ? 'Back to Search' : 'Reiru al Serĉo'}
        </Link>
      </div>
    </div>
  );
}
