import { NextResponse } from 'next/server';
import { getDictionaryData, getWordsWithTranslations } from '@/lib/dictionary';

export async function GET(): Promise<NextResponse> {
  try {
    const words = await getDictionaryData();
    const { withEsperanto, withEnglish } = getWordsWithTranslations(words);

    // Find duplicates
    const duplicates = [...words]
      .sort()
      .reduce(
        (acc, { word }) => {
          const existing = acc.find((d) => d.word === word);
          if (existing) existing.count++;
          else acc.push({ word, count: 1 });
          return acc;
        },
        [] as Array<{ word: string; count: number }>,
      )
      .filter(({ count }) => count > 1);

    return NextResponse.json(
      {
        volapukWordCount: words.length,
        voEoWordCount: withEsperanto.length,
        voEnWordCount: withEnglish.length,
        duplicates,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Unexpected error in dictionary processing:', error);
    return NextResponse.json(
      {
        volapukWordCount: 0,
        voEoWordCount: 0,
        englishTranslations: 0,
        wordsWithBothTranslations: 0,
        duplicates: [],
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
