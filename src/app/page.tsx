import Search from '@/components/Search';
import SearchError from '@/components/SearchError';

async function getDictionaryData() {
  const endpoint = `${process.env.DOMAIN!}/api/v0/volapuk/words`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    }

    throw error;
  }
}

export default async function Home() {
  try {
    return <Search dictionaryData={await getDictionaryData()} />;
  } catch {
    return <SearchError />;
  }
}
