import type { Locale } from "@/i18n";
import type { FaqEntry } from "./types";
import { faqEn } from "./en";
import { faqUk } from "./uk";
import { faqDe } from "./de";

export type { FaqEntry } from "./types";

export const faq: Record<Locale, FaqEntry[]> = {
  en: faqEn,
  uk: faqUk,
  de: faqDe,
};
