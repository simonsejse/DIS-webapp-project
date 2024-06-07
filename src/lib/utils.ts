import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError } from "axios";

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
  CLOSED: "Lukket",
  OPEN: "Åben",
};
export class Translator {
  static translate(text: string) {
    return translations[text as keyof typeof translations] || text;
  }
}

export function parseNumber(value: string) {
  return Number(value.replace(/[^0-9.-]+/g, ""));
}
