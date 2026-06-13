export interface FunFact {
  icon: string;
  text: string;
}

export const funFacts: FunFact[] = [
  {
    icon: "lucide:dna",
    text: "Combined Biology and Programming to create a Genomic Data Visualization Tool",
  },
  {
    icon: "lucide:dices",
    text: "D&D enthusiast who incorporates creative storytelling into projects",
  },
  {
    icon: "lucide:pen-tool",
    text: "Sketches UI designs in a notebook before writing any code",
  },
  {
    icon: "lucide:mountain",
    text: "Avid hiker who has explored many trails across the UK",
  },
] as const;
