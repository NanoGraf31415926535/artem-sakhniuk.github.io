import type { Locale } from "@/i18n";
import type { Skill } from "./types";
import { skillsEn } from "./en";
import { skillsUk } from "./uk";
import { skillsDe } from "./de";

export type { Skill } from "./types";

export const skills: Record<Locale, Skill[]> = {
  en: skillsEn,
  uk: skillsUk,
  de: skillsDe,
};
