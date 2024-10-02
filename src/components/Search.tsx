'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Result from '@/components/Result';
import { Search as SearchIcon } from 'lucide-react';
import { DictionaryEntryType } from '@/lib/types';
import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps } from '@/lib/types';

interface SearchProps {
  dictionaryData: DictionaryEntryType[];
}

export default function Search({ dictionaryData }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DictionaryEntryType[]>([]);
  const { lang: translationLang } = useLangContext() as LangContextProps;

  // List of excluded words in English translations
  const excludeWordList = ['a', 'an', 'to', 'the'];

  // Remove articles and certain prefixes in English translations
  const removeExcludedPrefix = (text: string) => {
    const lowerCaseText = text.toLowerCase().trim();

    for (const excludeWord of excludeWordList) {
      const prefix = excludeWord + ' ';
      if (lowerCaseText.startsWith(prefix)) {
        return lowerCaseText.slice(prefix.length).trim();
      }
    }
    return lowerCaseText;
  };

  // Split text into words and check if any word matches the query
  const isWholeWordOrPhraseMatch = (text: string, query: string) => {
    const words = text.split(/\s+/).map((word) => word.toLowerCase());
    const normalizedQuery = query.toLowerCase();
    return words.some((word) => word === normalizedQuery);
  };

  // Check if the word starts with the query string
  const startsWithQuery = (word: string, query: string) => {
    const lowerCaseWord = word.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    return lowerCaseWord.startsWith(normalizedQuery);
  };

  // Remove excluded words from parts of the translation text
  const cleanTranslationText = (text: string) => {
    return text
      .split(/\s+/)
      .filter((word) => !excludeWordList.includes(word.toLowerCase()))
      .join(' ')
      .trim();
  };

  // Search the dictionary for Volapük words and English translations
  function searchDictionary(query: string): DictionaryEntryType[] {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      return [];
    }

    const results = dictionaryData.filter((entry: DictionaryEntryType) => {
      const wordMatch =
        (entry.lang === 'volapuk' && startsWithQuery(entry.word, trimmedQuery)) ||
        isWholeWordOrPhraseMatch(entry.word, trimmedQuery);

      const translationMatch = entry.translations.some((translation) => {
        const cleanedTranslationText = removeExcludedPrefix(translation.text);

        // Split the cleaned translation text into separate words or phrases
        const translationWords = cleanedTranslationText.split(/,\s*/).map(cleanTranslationText);

        // Check if any of the separated words or phrases match the query
        return translationWords.some((word) => isWholeWordOrPhraseMatch(word, trimmedQuery));
      });

      return wordMatch || translationMatch;
    });

    return results;
  }

  // Set the search results on form submission
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const searchResults = searchDictionary(query);

    setResults(searchResults);
  }

  const filteredResults = results.filter((result) => {
    return result.translations.some((translation) => translation.lang === translationLang);
  });

  function getPlaceholder() {
    return translationLang === 'english' ? 'Search / Sukolös' : 'Serĉu / Sukolös';
  }

  function getLabel() {
    return translationLang === 'english'
      ? 'Serĉu vorton en la Volapuka vortaro.'
      : 'Search a word in the Volapük dictionary.';
  }

  function getResMessage() {
    return translationLang === 'english' ? 'No results found.' : 'Neniu rezulto trovita.';
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-4">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          className="min-w-0 flex-1 rounded-md py-1 ps-4"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={getPlaceholder()}
          aria-label={getLabel()}
        />
        <Button type="submit" aria-label="Search" className="rounded-md border-2 px-4">
          <SearchIcon />
        </Button>
      </form>
      <div className="mt-4 h-[65vh] w-full overflow-auto rounded-md bg-slate-800 px-4 text-white">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => <Result result={result} key={index} />)
        ) : (
          <p className="flex h-full items-center justify-center text-center">
            {getResMessage()}
            <br />
            Seks nonik pätuvons.
          </p>
        )}
      </div>
    </div>
  );
}
