import AboutText from '@/components/AboutText';

async function getWordCount() {
  const endpoint = `${process.env.DOMAIN!}/api/v0/volapuk/word-count`;

  try {
    const res = await fetch(endpoint);

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

  return <AboutText formattedCount={formattedCount} />;
}
