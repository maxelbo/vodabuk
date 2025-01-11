'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Result from '@/components/Result';
import Spinner from '@/components/Spinner';
import { Search as SearchIcon } from 'lucide-react';
import type { DictionaryEntryType, LangContextProps } from '@/lib/types';
import { useLangContext } from '@/context/LanguageContext';

interface SearchProps {
  dictionaryData: DictionaryEntryType[];
}

export default function Search({ dictionaryData }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DictionaryEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lang: translationLang } = useLangContext() as LangContextProps;

  function searchDictionary(searchQuery: string): DictionaryEntryType[] {
    const excludeWordList = ['a', 'an', 'to', 'the'];

    // Remove special characters and normalizes spaces
    function normalizeText(text: string): string {
      const normalized = text
        .toLowerCase()
        // rm spaces
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map((word) => {
          // Keep hyphen at start
          const startsWithHyphen = word.startsWith('-');
          const cleaned = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
          // Add back hyphen to start
          return startsWithHyphen ? `-${cleaned}` : cleaned;
        })
        .join(' ');
      return normalized;
    }

    // Exact word match for translations
    function isExactWordMatch(text: string, searchQuery: string): boolean {
      const normalizedText = normalizeText(text);
      const normalizedQuery = normalizeText(searchQuery);

      const textParts = normalizedText.split(',');

      return textParts.some((part) => {
        const words = part.trim().split(' ');
        return words.some((word) => word === normalizedQuery);
      });
    }

    // Starts with match for Volapük words
    function isVolapukMatch(text: string, searchQuery: string): boolean {
      const normalizedText = normalizeText(text);
      const normalizedQuery = normalizeText(searchQuery);

      if (normalizedQuery.startsWith('-')) {
        return normalizedText.startsWith(normalizedQuery);
      }

      return (
        normalizedText.startsWith(normalizedQuery) ||
        normalizedText.startsWith(`-${normalizedQuery}`)
      );
    }

    function cleanTranslationText(text: string): string {
      const normalizedText = normalizeText(text);
      return normalizedText
        .split(' ')
        .filter((word) => !excludeWordList.includes(word))
        .join(' ');
    }

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return [];

    const searchResults = dictionaryData.filter((entry) => {
      // Match Volapük word (starts with match)
      const volapukMatch = isVolapukMatch(entry.word, trimmedQuery);

      // Match translations in selected language (exact word match)
      const translationMatch = entry.translations
        .filter((translation) => translation.lang === translationLang)
        .some((translation) => {
          const cleanedText = cleanTranslationText(translation.text);
          const translationParts = cleanedText.split(',').map((part) => part.trim());
          return translationParts.some((part) => isExactWordMatch(part, trimmedQuery));
        });

      return volapukMatch || translationMatch;
    });

    // Filter results to only include entries with translations in the selected language
    return searchResults.filter((result) =>
      result.translations.some((translation) => translation.lang === translationLang),
    );
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // setIsLoading(true);
    const searchResults = searchDictionary(query);
    setResults(searchResults);
    setIsLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <h1 className="sr-only">Search Page.</h1>
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          className="min-w-0 flex-1 rounded-md py-1 ps-4"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={translationLang === 'english' ? 'Search / Sukolös' : 'Serĉu / Sukolös'}
          aria-label={
            translationLang === 'english'
              ? 'Serĉu vorton en la Volapuka vortaro.'
              : 'Search a word in the Volapük dictionary.'
          }
        />
        <Button
          type="submit"
          aria-label="Search"
          className="rounded-md border-2 px-4"
          disabled={isLoading}
        >
          <SearchIcon />
        </Button>
      </form>
      <div className="mt-4 h-[65vh] w-full overflow-auto rounded-md bg-slate-800 px-4 text-white">
        {isLoading ? (
          <div role="status" className="flex h-full items-center justify-center text-center">
            <Spinner />
            <span className="sr-only">
              {translationLang === 'english' ? 'Loading...' : 'Serĉanta...'}
            </span>
          </div>
        ) : results.length > 0 ? (
          results.map((result, index) => <Result result={result} key={index} />)
        ) : (
          <p className="flex h-full items-center justify-center text-center">
            {translationLang === 'english' ? 'No results found.' : 'Neniu rezulto estis trovita.'}
            <br />
            Seks nonik pätuvons.
          </p>
        )}
      </div>
    </div>
  );
}
