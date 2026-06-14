import type { Locale } from "@/i18n";
import type { FunFact } from "./types";
import { funFactsEn } from "./en";
import { funFactsUk } from "./uk";
import { funFactsDe } from "./de";

export type { FunFact } from "./types";

export const funFacts: Record<Locale, FunFact[]> = {
  en: funFactsEn,
  uk: funFactsUk,
  de: funFactsDe,
};
