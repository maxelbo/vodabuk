import AboutText from '@/components/AboutText';

interface WordCountData {
  volapukWordCount: number;
  voEoWordCount: number;
  duplicates: { word: string; count: number }[];
}

async function getWordCount(): Promise<WordCountData> {
  const endpoint = `${process.env.DOMAIN!}/api/v0/volapuk/word-count`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await res.json();
  } catch {
    return {
      volapukWordCount: 0,
      voEoWordCount: 0,
      duplicates: [],
    };
  }
}

function getFormatedCount(c: number) {
  return new Intl.NumberFormat('en-US').format(c);
}

export default async function About() {
  const count = await getWordCount();

  const totalCount = getFormatedCount(count.volapukWordCount);
  const eoCount = getFormatedCount(count.voEoWordCount);

  return <AboutText totalCount={totalCount} eoCount={eoCount} />;
}
