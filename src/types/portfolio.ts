export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Research' | 'Freelance';
  domain: 'Distributed Systems' | 'Full Stack' | 'Low-Level & Graphics' | 'IoT & Hardware' | 'Consulting & Architecture';
  summary: string;
  paragraphs: string[];
  bulletPoints: string[];
  techStack: string[];
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  tableData: {
    systemScope: string;
    keyDeliverable: string;
    impactMetric: string;
    coreTech: string;
  };
  deepDive?: {
    architecturalChallenge: string;
    solution: string;
    keyLearnings: string[];
    codeSnippetsOrSpecs?: string[];
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  stars?: number;
  featured?: boolean;
  highlights: string[];
  techHighlights: string[];
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    experienceYears?: string;
    badge?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  thesis: {
    title: string;
    supervisors: string[];
    guidance: string[];
    abstract: string;
    keyContributions: string[];
    technologies: string[];
  };
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bioParagraphs: string[];
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
    description: string;
  }[];
}
