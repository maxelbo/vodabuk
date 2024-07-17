import { Badge } from '@/components/ui/badge';
import { capitalize } from '@/lib/utils';
import type { DictionaryEntryType, LangContextProps } from '@/lib/types';
import { useLangContext } from '@/context/LanguageContext';

interface ResultProps {
  result: DictionaryEntryType;
}

export default function Result({ result }: ResultProps) {
  const { lang: translationLang } = useLangContext() as LangContextProps;
  const filteredTranslations = result.translations.filter(
    (translation) => translation.lang === translationLang,
  );
  const filteredExamples = result.examples?.filter((example) => example.lang === translationLang);

  return (
    <div className="border-b-2 border-white py-4 text-left last:border-b-0">
      <div className="flex justify-between gap-5 pb-1">
        <span className="text-xl font-bold">{capitalize(result.word)}</span>
        <Badge className="flex min-w-10 justify-center italic">{result.category}</Badge>
      </div>
      <div>
        {filteredTranslations.map((translation) => capitalize(translation.text)).join(', ')}
      </div>
      {filteredExamples && filteredExamples.length > 0 && (
        <div>
          <p className="font-bold">Examples:</p>
          <ul className="list-inside">
            {filteredExamples.map((example, i) => (
              <li key={i} className="pl-4">
                <span>{capitalize(example.text)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
