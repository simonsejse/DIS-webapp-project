import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filter<T>(arr: T[], callback: (item: T) => boolean) {
  return arr.filter(callback);
}

function groupBy<T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((accumulator, item) => {
    const key = getKey(item);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(item);
    return accumulator;
  }, {} as Record<K, T[]>);
}

// from english to danish
// key value map
const translations = {
  CLOSED: 'Lukket',
  OPEN: 'Åben',
};

export class Translator {
  static translate(text: string) {
    return translations[text as keyof typeof translations] || text;
  }
}

export class DateHelper {
  static parse(dateStr: string) {
    return new Date(dateStr);
  }
  static formatPretty(dateStr: string) {
    const date = this.parse(dateStr);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return format(date, 'dd/MM/yyyy HH:mm', { locale: da });
  }

  static extractMonth(dateStr: string) {
    const date = this.parse(dateStr);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return format(date, 'MMMM', { locale: da });
  }
}

export function parseNumber(value: string) {
  return Number(value.replace(/[^0-9.-]+/g, ''));
}

export function placeValueIntoPlaceholder<T>(
  str: string,
  placeholder: string,
  value: T
) {
  return str.replace(placeholder, String(value));
}

export function lower(str: string) {
  return str.toLowerCase();
}
