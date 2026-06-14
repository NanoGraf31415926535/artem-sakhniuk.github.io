import en from "./en.json";
import uk from "./uk.json";
import de from "./de.json";

export type Locale = "en" | "uk" | "de";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "uk", "de"];

const translations: Record<Locale, Record<string, string>> = { en, uk, de };

export function t(key: string, locale: Locale = defaultLocale): string {
  return translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key;
}

export function localeFromPath(path: string): Locale {
  const match = path.match(/^\/(en|uk|de)(\/|$)/);
  return (match?.[1] as Locale) ?? defaultLocale;
}

export function localizedPath(path: string, targetLocale: Locale): string {
  return path.replace(/^\/(en|uk|de)/, `/${targetLocale}`);
}

export function localeLabel(locale: Locale): string {
  const labels: Record<Locale, string> = { en: "EN", uk: "UK", de: "DE" };
  return labels[locale];
}

export function localeData<T>(data: Record<Locale, T>, locale: string, fallback: Locale = defaultLocale): T {
  return (data as Record<string, T>)[locale] ?? data[fallback];
}
