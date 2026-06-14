import type { Locale } from "@/i18n";
import type { Project } from "./types";
import { projectsEn } from "./en";
import { projectsUk } from "./uk";
import { projectsDe } from "./de";

export type { Project } from "./types";

export const projects: Record<Locale, Project[]> = {
  en: projectsEn,
  uk: projectsUk,
  de: projectsDe,
};
