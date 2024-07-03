import Search from '@/components/Search';

// To fetch from the API
async function getDictionaryData() {
  const endpoint = process.env.API_ENDPOINT!;

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
    const dictionaryData = await getDictionaryData();

    return (
      <>
        <h1 className="sr-only">Search Page.</h1>
        <Search dictionaryData={dictionaryData} />
      </>
    );
  } catch {
    return (
      <div className="text-center">
        <h1 className="text-lg font-bold">Error</h1>
        <p>Failed to fetch data from the API.</p>
      </div>
    );
  }
}
