import { NextResponse } from 'next/server';
import { getDictionaryData, getWordsWithTranslations } from '@/lib/dictionary';

export async function GET(): Promise<NextResponse> {
  try {
    const words = await getDictionaryData();
    const { withEsperanto, withEnglish } = getWordsWithTranslations(words);

    // Find Volapük words with no English translations (same logic as getWordsWithTranslations)
    const volapukWords = words.filter(word => word.lang === 'volapuk');
    const wordsWithoutEnglish = volapukWords.filter(word => !word.translations.some(translation => translation.lang === 'english'));
    
    // Find words that are NOT Volapük
    const nonVolapukWords = words.filter(word => word.lang !== 'volapuk');

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
        totalWordCount: words.length,
        volapukWordCount: volapukWords.length,
        voEoWordCount: withEsperanto.length,
        voEnWordCount: withEnglish.length,
        wordsWithoutEnglish,
        nonVolapukWords,
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
        voEnWordCount: 0,
        wordsWithoutEnglish: [],
        wordsWithoutLang: [],
        duplicates: [],
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}