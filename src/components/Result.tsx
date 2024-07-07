import { Badge } from '@/components/ui/badge';
import { DictionaryEntryType } from '@/lib/types';
// TODO: move capitalizer to utils
// import { capitalizer } from '@/lib/utils';

export function capitalizer(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Result({ result }: { result: DictionaryEntryType }) {
  return (
    <div className="border-b-2 border-white py-4 text-left last:border-b-0">
      <div className="flex justify-between gap-5 pb-1">
        <span className="text-xl font-bold">{capitalizer(result.word)}</span>
        <Badge className="flex min-w-10 justify-center italic">{result.category}</Badge>
      </div>
      <div>
        {result.translations.map((translation) => capitalizer(translation.text)).join(', ')}
      </div>
      {result.examples && result.examples.length > 0 && (
        <div>
          <p className="font-bold">Examples:</p>
          <ul className="list-inside">
            {result.examples.map((example, i) => (
              <li key={i} className="pl-4">
                <span>{example.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
