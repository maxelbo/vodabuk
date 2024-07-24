import path from 'path';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { DictionaryEntryType } from '@/lib/types';

type WordCount = { [key: string]: number };
type Duplicate = { word: string; count: number };

const findDuplicates = (words: DictionaryEntryType[]): Duplicate[] => {
  const wordCount: WordCount = {};
  const duplicates: Duplicate[] = [];

  words.forEach(({ word }) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  for (const word in wordCount) {
    if (wordCount[word] > 1) {
      duplicates.push({ word, count: wordCount[word] });
    }
  }

  return duplicates;
};

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Construct the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'src', 'data');
    const filePath = path.join(jsonDirectory, 'dictionaryData.json');

    // Read and parse the JSON file
    const fileContents = await fs.readFile(filePath, 'utf8');
    const words: DictionaryEntryType[] = JSON.parse(fileContents);

    // Filter Volapük words
    const volapukWords = words.filter((word) => word.lang === 'volapuk');

    // Count the number of Volapük words
    const volapukWordsCount = volapukWords.length;

    // Find duplicates among the Volapük words
    const duplicates = findDuplicates(volapukWords);

    // Return the word count and the duplicates JSON
    return new NextResponse(JSON.stringify({ volapukWordsCount, duplicates }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'File not found or unable to read file' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
