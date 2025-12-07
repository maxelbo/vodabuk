'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useTranslation } from '@/lib/utils';

interface AboutTextProps {
  totalCount: string;
  eoCount: string;
}

export default function AboutText({ totalCount, eoCount }: AboutTextProps) {
  const { translate } = useTranslation();

  const title = {
    english: 'About Vödabuk',
    esperanto: 'Pri Vödabuk',
    volapük: 'Dö Vödabuk',
  };
  const intro = {
    english: (
      <p>
        Vödabuk is an open-source Volapük dictionary application designed to make the Volapük
        language more accessible to everyone.
      </p>
    ),
    esperanto: (
      <p>
        Vödabuk estas malfermita reta Volapuka vortaro, kiu celas fari Volapukon pli alirebla al
        ĉiuj.
      </p>
    ),
    volapük: <p>Vödabuk binon maifiköl volapükavödabuk, kel diseinon ad brafükön Volapüki.</p>,
  };
  const count = {
    english: (
      <p>
        It currently has <span className="font-bold">{totalCount}</span> Volapük words in its
        database, with translations in English and Esperanto (currently, it has {eoCount} words in
        Esperanto).
      </p>
    ),
    esperanto: (
      <p>
        Ĝi nuntempe havas <span className="font-bold">{totalCount}</span> Volapukajn vortojn en sia
        datumbazo, kun tradukoj en la angla kaj Esperanto (nuntempe, ĝi havas {eoCount} vortojn en
        Esperanto).
      </p>
    ),
    volapük: (
      <p>
        Anu labob <span className="font-bold">{totalCount}</span>
      </p>
    ),
  };
  const contact = {
    english: (
      <p>
        The dictionary is in continious development. If you find any errors or have suggestions for
        improvements, please feel free to contact{' '}
        <Link href="mailto:glidis@vodabuk.com" className="font-bold underline">
          glidis@vodabuk.com
        </Link>{' '}
        or open an issue on the{' '}
        <Link href="https://github.com/maxelbo/vodabuk/issues" className="font-bold underline">
          repository
        </Link>
        .
      </p>
    ),
    esperanto: (
      <p>
        La vortaro estas en daǔra evoluo. Se vi trovas iun ajn eraron aǔ havas sugestojn por
        plibonigoj, bonvolu kontakti{' '}
        <Link href="mailto:glidis@vodabuk.com" className="font-bold underline">
          glidis@vodabuk.com
        </Link>{' '}
        aǔ malfermi problemon en la{' '}
        <Link href="https://github.com/maxelbo/vodabuk/issues" className="font-bold underline">
          deponejo
        </Link>
        .
      </p>
    ),
    volapük: '',
  };
  const sourceTitle = {
    english: 'Sources',
    esperanto: 'Fontoj',
    volapük: 'Fonäts',
  };
  const sources = {
    english: (
      <p>
        The English translations are based on the combined works of the late Ralph Midgley (1929
        &ndash; 2024), Guvan of the Volapük Community and Honorary Academician of the International
        Volapük Society. It draws from his <i>&quot;Volapük-English Dictionary&quot;</i>&nbsp; and{' '}
        <i>&quot;English-Volapük Dictionary&quot;</i>&nbsp;, both revised in 2010, and his
        translation of <i>&quot;Vödabuk Volapüka pro Deutänapükans&quot;</i>&nbsp; by Arie de Jong
        (1931), which was revised and completed from 2012 &ndash; 2022 by Cifal Hermann Philipps. It
        also includes additional examples extracted from sample texts from Volapük Vifik, and
        readings from{' '}
        <Link href="https://volapük.com" className="font-bold underline">
          volapük.com
        </Link>
        .<br />
        The Esperanto translations are based on{' '}
        <i>&quot;Vortaro Volapük&ndash;Esperanto kaj Esperanto&ndash;Volapük&quot;</i>&nbsp; by
        André Cherpillod.
      </p>
    ),
    esperanto: (
      <p>
        La anglaj tradukoj baziĝas sur la kunigitaj verkoj de la pasinta Ralph Midgley (1929 –
        2024), Guvan de la Volapuka Komunumo kaj Honora Akademiano de la Internacia Volapuka
        Societo. Ĝi ĉerpas vortojn el liaj <i>&quot;Volapük-English Dictionary&quot;</i> kaj{' '}
        <i>&quot;English-Volapük Dictionary&quot;</i>, ambaŭ reviziitaj en 2010, kaj lia traduko de{' '}
        <i>&quot;Vödabuk Volapüka pro Deutänapükans&quot;</i> de Arie de Jong (1931), kiu estis
        reviziita kaj kompletigita de 2012 &ndash; 2022 de Cifal Hermann Philipps. Ĝi ankaŭ enhavas
        aldonajn ekzemplojn el ekzemplaj tekstoj de Volapük Vifik, kaj legaĵoj de{' '}
        <Link href="https://volapük.com" className="font-bold underline">
          volapük.com
        </Link>
        .<br />
        La Esperantaj tradukoj baziĝas sur{' '}
        <i>&quot;Vortaro Volapük&ndash;Esperanto kaj Esperanto&ndash;Volapük&quot;</i> de André
        Cherpillod.
      </p>
    ),
    volapük: '',
  };
  const back = {
    english: 'Back to Search',
    esperanto: 'Reiru al Serĉo',
    volapuk: 'Gekam',
  };

  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <h1 className="pb-2 pt-8 text-2xl font-bold">{translate(title)}</h1>
      {translate(intro)}
      {totalCount && translate(count)}
      <br />
      {translate(contact)}
      <h2 className="pt-8 text-xl font-bold">{translate(sourceTitle)}</h2>
      {translate(sources)}
      <div className="pt-16">
        <Link href="/" className={buttonVariants()}>
          {translate(back)}
        </Link>
      </div>
    </div>
  );
}
