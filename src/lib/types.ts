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
  lang: string;
  setLang: (lang: string) => void;
}

export interface ResultProps {
  result: DictionaryEntryType;
  translationLang: string;
}

export interface Children {
  readonly children: React.ReactNode;
}
