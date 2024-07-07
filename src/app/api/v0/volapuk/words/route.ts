import path from 'path';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { DictionaryEntryType } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    // Construct the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'src', 'data');
    const filePath = path.join(jsonDirectory, 'dictionaryData.json');

    // Read and parse the JSON file
    const fileContents = await fs.readFile(filePath, 'utf8');
    let words: DictionaryEntryType[] = JSON.parse(fileContents);

    // Add the 'letter' key to each word object
    words = words.map((wordObj) => ({
      ...wordObj,
      letter: wordObj.word.charAt(0),
    }));

    // Return the modified JSON
    return new NextResponse(JSON.stringify(words), {
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
