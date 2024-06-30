export interface DictionaryEntryType {
  lang: string;
  word: string;
  roots?: string[];
  // letter: string;
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
