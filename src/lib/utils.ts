import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string | null | undefined): string {
  if (!string) return '';

  const trimmed = string.trim();

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
