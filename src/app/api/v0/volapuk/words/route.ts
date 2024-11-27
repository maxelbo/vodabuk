import { NextResponse } from 'next/server';
import { getDictionaryData } from '@/lib/dictionary';

export async function GET(): Promise<NextResponse> {
  try {
    let words = await getDictionaryData();

    // Add the 'letter' key to each word object
    words = words.map((wordObj) => ({
      ...wordObj,
      letter: wordObj.word.charAt(0),
    }));

    return new NextResponse(JSON.stringify(words), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Unexpected error in dictionary processing:', error);
    return new NextResponse(JSON.stringify({ error: 'File not found or unable to read file' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
