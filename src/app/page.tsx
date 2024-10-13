import Search from '@/components/Search';

async function getDictionaryData() {
  const endpoint = `${process.env.DOMAIN!}/api/v0/volapuk/words`;

  try {
    const res = await fetch(endpoint);

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
        <h1 className="text-lg font-bold">Error / Pöl</h1>
        <p>Failed to fetch the dictionary data.</p>
        <p>Ädefon ad ramenön nunädis vödabuka.</p>
      </div>
    );
  }
}
