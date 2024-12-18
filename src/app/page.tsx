import Search from '@/components/Search';
import SearchError from '@/components/SearchError';

async function getDictionaryData() {
  const endpoint = `${process.env.DOMAIN!}/api/v0/volapuk/words`;

  try {
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return res.json();
  } catch {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
}

export default async function Home() {
  try {
    return <Search dictionaryData={await getDictionaryData()} />;
  } catch {
    return <SearchError />;
  }
}
