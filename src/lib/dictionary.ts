import path from 'path';
import { promises as fs } from 'fs';
import { DictionaryEntryType } from '@/lib/types';
import { getDictionaryDataFromDB } from '@/lib/db';

/**
 * Get dictionary data from the database or fallback to JSON file
 * Set USE_DATABASE=true in environment to use PostgreSQL
 */
export async function getDictionaryData(): Promise<DictionaryEntryType[]> {
  const useDatabase = process.env.USE_DATABASE === 'true';

  if (useDatabase) {
    try {
      return await getDictionaryDataFromDB();
    } catch (error) {
      console.error('Error fetching from database, falling back to JSON file:', error);
      // Fallback to JSON file if database fails
    }
  }

  // Default: read from JSON file
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
