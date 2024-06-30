import Search from '@/components/Search';
// TEMP: Importing the data from the JSON file
import dictionaryData from '@/data/dictionaryData.json';

// To fetch from the API
// async function getDictionaryData() {
//   const res = await fetch(process.env.API_ENDPOINT!);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

export default async function Home() {
  // TEMP: Fetching the data from the JSON file
  // const dictionaryData = await getDictionaryData();

  return (
    <>
      <h1 className="sr-only">Search Page.</h1>
      <Search dictionaryData={dictionaryData} />
    </>
  );
}
