export interface TimelineEntry {
  id: number;
  period: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    id: 1,
    period: "2019 - 2023",
    title: "Bioinformatics Foundation",
    description:
      "Began my academic journey studying Biology at Taras Shevchenko National University in Kyiv, specializing in Bioinformatics. This provided a strong foundation in analytical thinking and data analysis, achieving a 3.9 GPA.",
  },
  {
    id: 2,
    period: "2022 - 2023",
    title: "Early Programming & Innovation",
    description:
      "Started learning Python for bioinformatics applications, developing a genomic data visualization tool for my capstone project. This project bridged biology and IT, sparking my passion for programming and software development.",
  },
  {
    id: 3,
    period: "2024 - 2025",
    title: "Full-Stack Expertise & AI Interviewer Lead",
    description:
      "Expanded my technical skills through comprehensive courses in Python, C, and backend development. Gained practical experience as a Full-Stack Web Developer at Goethe University's FLEX Department, where I led the development of an innovative ChatGPT-based interviewer system, achieving 90% client satisfaction.",
  },
  {
    id: 4,
    period: "Jun 2025 - Oct 2026",
    title: "Full-Stack Developer at The Code Registry",
    description:
      "Architected and developed scalable web platforms using Django and Angular, supporting over 10,000 users. Implemented CI/CD pipelines reducing deployment time by 50%. Enhanced security protocols leading to a 60% reduction in vulnerabilities.",
  },
  {
    id: 5,
    period: "Aug 2025 - Sep 2025",
    title: "Full Stack AI Developer (Freelance)",
    description:
      "Developed an AI-driven web application utilizing machine learning algorithms to personalize user experiences. Implemented a data visualization dashboard using Tableau providing real-time insights for stakeholders. Conducted user testing that improved application usability by 15%.",
  },
  {
    id: 6,
    period: "Oct 2025 - Present",
    title: "Full Stack Software Developer at Ruth Miskin Training",
    description:
      "Spearheading the development of an educational platform using Flask and React, increasing course completion rates by 25%. Integrating third-party APIs to enhance platform functionality. Utilizing Agile methodologies to manage project timelines effectively.",
  },
] as const;
