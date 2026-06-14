import type { Project } from "./types";

export const projectsDe: Project[] = [
  {
    id: "code-registry",
    icon: "lucide:globe",
    title: "Skalierbare Web-Plattform (The Code Registry)",
    description:
      "Entwickelte eine skalierbare Web-Plattform mit Django und Angular, die über 10.000 gleichzeitige Benutzer unterstützt. Implementierte CI/CD-Pipelines, die die Bereitstellungszeit um 50% reduzierten, und verbesserte Sicherheitsprotokolle, was zu einer 60%igen Verringerung der Sicherheitslücken führte. Fokussiert auf die Bereitstellung leistungsstarker, responsiver digitaler Erlebnisse, die die Erwartungen der Kunden stets übertreffen.",
    tags: ["Django", "Angular", "PostgreSQL", "CI/CD", "Docker"],
  },
  {
    id: "ai-interviewer",
    icon: "lucide:bot",
    title: "KI-gestütztes Interviewsystem (Goethe-Universität)",
    description:
      "Leitete die Entwicklung eines innovativen KI-gestützten Interviewsystems an der Goethe-Universität unter Verwendung von Python und der OpenAI-API zur Durchführung intelligenter Interviews und dynamischen Analyse von Antworten. Dieses Full-Stack-Projekt erforderte ein robustes Datenbankdesign und die Bewältigung komplexer KI-Integrationsherausforderungen. Lieferte eine Lösung, die bei verschiedenen Kandidatenbewertungen eine Kundenzufriedenheit von 90% erreichte.",
    tags: ["Python", "OpenAI API", "React", "Datenbankdesign", "Team Lead"],
  },
  {
    id: "genomic-tool",
    icon: "lucide:dna",
    title: "Genom-Datenvisualisierungstool",
    description:
      "Entwickelte ein Python-basiertes Genom-Datenvisualisierungstool als Abschlussprojekt, das die Komplexität der Interpretation großer biologischer Datenmengen adressiert. Entwickelte effiziente Algorithmen für Datenverarbeitung und Rendering und erstellte interaktive Visualisierungen, die Forschern ermöglichen, kritische Erkenntnisse aus riesigen Genomdatensätzen zu gewinnen.",
    tags: ["Python", "Flask", "Datenvisualisierung", "Bioinformatik", "Maschinelles Lernen"],
  },
  {
    id: "educational-platform",
    icon: "lucide:graduation-cap",
    title: "Bildungsplattform (Ruth Miskin Training)",
    description:
      "Leite die Entwicklung einer Bildungsplattform mit Flask und React, die darauf abzielt, die Kursabschlussquoten durch verbessertes Benutzerengagement zu steigern. Integriere Drittanbieter-APIs zur Erweiterung der Funktionalität und arbeite mit Bildungsexperten zusammen, um Funktionen an pädagogischen Zielen auszurichten. Nutze Agile-Methoden, um eine zeitnahe Bereitstellung von Funktionen sicherzustellen.",
    tags: ["Flask", "React", "PostgreSQL", "REST-APIs", "Agile"],
  },
];
