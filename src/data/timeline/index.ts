import type { Locale } from "@/i18n";
import type { TimelineEntry } from "./types";
import { timelineEn } from "./en";
import { timelineUk } from "./uk";
import { timelineDe } from "./de";

export type { TimelineEntry } from "./types";

export const timeline: Record<Locale, TimelineEntry[]> = {
  en: timelineEn,
  uk: timelineUk,
  de: timelineDe,
};
