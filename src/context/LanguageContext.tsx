'use client';

import { createContext, useContext, useState } from 'react';
import type { LangContextProps, Children } from '@/lib/types';

const LangContext = createContext<LangContextProps | undefined>(undefined);

export function LanguageProvider({ children }: Children) {
  const [lang, setLang] = useState('english');

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLangContext() {
  return useContext(LangContext);
}
