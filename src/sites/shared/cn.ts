import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-aware class merge (moved here from the removed demo lab). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
