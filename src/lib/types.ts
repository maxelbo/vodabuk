export interface DictionaryEntryType {
  lang: string;
  word: string;
  roots?: string[];
  letter: string;
  category: string;
  translations: {
    lang: string;
    text: string;
  }[];
  examples?: {
    lang: string;
    text: string;
  }[];
}
export interface LangContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export type Lang = 'english' | 'esperanto' | 'volapük';

export interface Children {
  readonly children: React.ReactNode;
}
