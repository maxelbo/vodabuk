import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLangContext } from '@/context/LanguageContext';
import type { LangContextProps } from '@/lib/types';
import { ReactNode } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string | null | undefined): string {
  if (!string) return '';

  const trimmed = string.trim();

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function useTranslation() {
  const { lang } = useLangContext() as LangContextProps;

  function translate<T extends string | ReactNode>(translations: Record<string, T>): T {
    return translations[lang] || translations.volapük;
  }

  return { translate, lang };
}
