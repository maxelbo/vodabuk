'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Result from '@/components/Result';
import { Search as SearchIcon } from 'lucide-react';

import { DictionaryEntryType } from '@/types';

interface SearchProps {
  dictionaryData: DictionaryEntryType[];
}

export default function Search({ dictionaryData }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DictionaryEntryType[]>([]);

  function searchDictionary(query: string): DictionaryEntryType[] {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return [];
    }

    const lowerCaseQuery = trimmedQuery.toLowerCase();

    const results = dictionaryData.filter(
      (entry: DictionaryEntryType) =>
        (entry.word.toLowerCase().includes(lowerCaseQuery) && entry.lang.includes('volapuk')) ||
        entry.translations.some((translation) =>
          translation.text.toLowerCase().includes(lowerCaseQuery),
        ),
    );

    return results;
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const searchResults = searchDictionary(query);

    setResults(searchResults);
  }

  return (
    <div className="mx-auto w-full max-w-[600px] py-4">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          className="min-w-0 flex-1 rounded-md py-1 ps-4"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a word"
          aria-label="Search for an English word in the Volapük dictionary"
        />
        <Button type="submit" aria-label="Search" className="rounded-md border-2 px-4">
          <SearchIcon />
        </Button>
      </form>
      <div className="mt-4 h-[50vh] w-full overflow-auto rounded-md bg-slate-800 px-4 text-white">
        {results.length > 0 ? (
          results.map((result, index) => <Result result={result} key={index} />)
        ) : (
          <p className="flex h-full items-center justify-center">
            No results found. Ätuvon sekis nonikis.
          </p>
        )}
      </div>
    </div>
  );
}
