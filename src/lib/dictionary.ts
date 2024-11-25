import path from 'path';
import { promises as fs } from 'fs';
import { DictionaryEntryType } from '@/lib/types';

export async function getDictionaryData(): Promise<DictionaryEntryType[]> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'dictionaryData.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent) as DictionaryEntryType[];
}

export function getWordsWithTranslations(words: DictionaryEntryType[]) {
  const withEsperanto: DictionaryEntryType[] = [];
  const withEnglish: DictionaryEntryType[] = [];

  words
    .filter((word) => word.lang === 'volapuk')
    .forEach((word) => {
      const hasEsperanto = word.translations?.some((t) => t.lang === 'esperanto');
      const hasEnglish = word.translations?.some((t) => t.lang === 'english');

      if (hasEsperanto) withEsperanto.push(word);
      if (hasEnglish) withEnglish.push(word);
    });

  return {
    withEsperanto,
    withEnglish,
  };
}
