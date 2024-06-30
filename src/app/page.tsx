import Search from '@/components/Search';

async function getDictionaryData() {
  const res = await fetch(process.env.API_ENDPOINT!);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const dictionaryData = await getDictionaryData();

  return (
    <>
      <h1 className="sr-only">Search Page.</h1>
      <Search dictionaryData={dictionaryData} />
    </>
  );
}
