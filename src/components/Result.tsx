import { Badge } from '@/components/ui/badge';
import { DictionaryEntryType } from '@/types';

function capitalizer(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Result({ result }: { result: DictionaryEntryType }) {
  return (
    <div className="border-b-2 py-4 text-left">
      <p className="flex justify-between gap-5 capitalize">
        {result.word} <Badge className="capitalize">{result.category}</Badge>
      </p>
      <div>
        <p>
          <span className="font-bold">Translations:&nbsp;</span>
          <span>
            {result.translations.map((translation) => capitalizer(translation.text)).join(', ')}
          </span>
        </p>
      </div>
      {result.examples && result.examples.length > 0 && (
        <div>
          <p className="font-bold">Examples:</p>
          <ul className="list-inside">
            {result.examples.map((example, idx) => (
              <li key={idx}>
                <span>{example.text}.</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
