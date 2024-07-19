import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

async function getWordCount() {
  const endpoint = `${process.env.DOMAIN!}/api/v0/volapuk/word-count`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    const data = await res.json();
    return data.volapukWordsCount;
  } catch {
    return 0;
  }
}

export default async function About() {
  const count = await getWordCount();
  const formattedCount = new Intl.NumberFormat('en-US').format(count);

  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <h1 className="pb-2 pt-8 text-2xl font-bold">About Vödabuk</h1>
      <p>
        Vödabuk is an open-source Volapük dictionary application designed to make the Volapük
        language more accessible to everyone.
      </p>
      {count > 0 && (
        <p>
          It currenlty has <span className="font-bold">{formattedCount}</span> Volapük words in its
          database, with translations in English and Esperanto (currently a work in progress).
        </p>
      )}
      <br />
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
      <h2 className="pt-8 text-xl font-bold">Sources</h2>
      <p>
        The English translations are based on the combined works of the late Ralph Midgley (1929
        &ndash; 2024), Guvan of the Volapük community and honorary academician of the International
        Volapük Society. It draws from his <i>&quot;Volapük-English Dictionary&quot;</i> and{' '}
        <i>&quot;English-Volapük Dictionary&quot;</i>, both revised in 2010, and his translation of{' '}
        <i>&quot;Vödabuk Volapüka pro Deutänapükans&quot;</i>&nbsp; by Arie de Jong (1931), which
        was revised and completed from 2012 &ndash; 2022 by Cifal Hermann Philipps. It also includes
        additional examples extracted from sample texts from Volapük Vifik, and readings from{' '}
        <Link href="https://volapük.com" className="font-bold underline">
          volapük.com
        </Link>
        .
      </p>
      <div className="pt-16">
        <Link href="/" className={buttonVariants()}>
          Back to Search
        </Link>
      </div>
    </div>
  );
}
