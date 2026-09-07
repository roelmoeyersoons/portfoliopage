/**
 * Site content model for the showcase variants.
 *
 * Wraps the canonical portfolio data (src/data/portfolioData.ts) into a
 * shape that is convenient for full-site layouts: tab definitions,
 * left-menu entries with index labels, per-item generated artwork specs,
 * and flattened deep-dive content.
 *
 * IMPORTANT: variants must render from this module (not portfolioData
 * directly) so content stays identical across all sites.
 */
import {
  profileData,
  experiencesData,
  projectsData,
  skillCategoriesData,
  educationData,
  marqueeTechList,
} from '@/data/portfolioData';

// ── Tabs ──────────────────────────────────────────────────────────
export type TabId = 'home' | 'experience' | 'skills' | 'projects' | 'about' | 'contact';

export interface TabDef {
  id: TabId;
  label: string;
}

export const siteTabs: TabDef[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

// ── Generated artwork specs ───────────────────────────────────────
export type ArtStyle = 'orbits' | 'mesh' | 'waves' | 'constellation' | 'strata' | 'grid';

export interface ArtSpec {
  style: ArtStyle;
  /** Base hue (0-360) driving the palette of the generated art */
  hue: number;
}

// ── Experience ────────────────────────────────────────────────────
export interface ExperienceEntry {
  id: string;
  index: string;
  role: string;
  company: string;
  shortCompany: string;
  period: string;
  location: string;
  type: string;
  domain: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  deepDive: {
    challenge: string;
    solution: string;
    learnings: string[];
  };
  art: ArtSpec;
}

const artForExperience: Record<string, ArtSpec> = {
  'baloise-azure-dynamics': { style: 'grid', hue: 205 },
  'reimagine-ai-architect': { style: 'mesh', hue: 262 },
  'netit-dynamics-consultant': { style: 'waves', hue: 330 },
  'imec-iot-network-engineer': { style: 'orbits', hue: 145 },
  'ugent-informatics-degree': { style: 'constellation', hue: 190 },
};

export const experiences: ExperienceEntry[] = experiencesData.map((e, i) => ({
  id: e.id,
  index: String(i + 1).padStart(2, '0'),
  role: e.role,
  company: e.company,
  shortCompany: e.company.split('(')[0].split('/')[0].split('&')[0].trim(),
  period: e.period,
  location: e.location,
  type: e.type,
  domain: e.domain,
  summary: e.summary,
  paragraphs: e.paragraphs,
  bullets: e.bulletPoints,
  tech: e.techStack,
  metrics: e.metrics ?? [],
  deepDive: {
    challenge: e.deepDive?.architecturalChallenge ?? '',
    solution: e.deepDive?.solution ?? '',
    learnings: e.deepDive?.keyLearnings ?? [],
  },
  art: artForExperience[e.id] ?? { style: 'mesh', hue: 262 },
}));

// ── Skills ────────────────────────────────────────────────────────
export interface SkillGroupEntry {
  id: string;
  index: string;
  title: string;
  /** Lucide icon name — resolve via shared/iconMap */
  icon: string;
  description: string;
  items: { name: string; level: number; years?: string; badge?: string }[];
  art: ArtSpec;
}

const artForSkillGroup: Record<string, ArtSpec> = {
  'dynamics-365-power-platform': { style: 'mesh', hue: 330 },
  'azure-cloud-platform': { style: 'grid', hue: 205 },
  'languages': { style: 'strata', hue: 262 },
  'ai-applied-llms': { style: 'constellation', hue: 285 },
  'other-low-level': { style: 'orbits', hue: 145 },
};

const skillGroupId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const skillGroups: SkillGroupEntry[] = skillCategoriesData.map((c, i) => ({
  id: skillGroupId(c.title),
  index: String(i + 1).padStart(2, '0'),
  title: c.title,
  icon: c.iconName,
  description: c.description,
  items: c.skills,
  art: artForSkillGroup[skillGroupId(c.title)] ?? { style: 'grid', hue: 220 },
}));

// ── Projects ──────────────────────────────────────────────────────
export interface ProjectEntry {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  featured: boolean;
  art: ArtSpec;
}

const artForProject: Record<string, ArtSpec> = {
  'opengl-mandelbrot': { style: 'grid', hue: 145 },
  'multi-radio-mac-protocol': { style: 'constellation', hue: 190 },
  'discord-songbot': { style: 'orbits', hue: 265 },
  archconfig: { style: 'mesh', hue: 205 },
};

export const projects: ProjectEntry[] = projectsData.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  tagline: p.tagline,
  description: p.description,
  tags: p.tags,
  githubUrl: p.githubUrl,
  highlights: p.highlights,
  stats: p.stats ?? [],
  featured: Boolean(p.featured),
  art: artForProject[p.id] ?? { style: 'waves', hue: 250 },
}));

// ── Profile / about / contact ─────────────────────────────────────
export const profile = {
  name: profileData.name,
  firstName: profileData.name.split(' ')[0],
  lastName: profileData.name.split(' ').slice(1).join(' '),
  initials: profileData.name
    .split(' ')
    .map((n) => n[0])
    .join(''),
  title: profileData.title,
  tagline: profileData.tagline,
  bioParagraphs: profileData.bioParagraphs,
  location: profileData.location,
  stats: profileData.stats,
};

export const education = educationData;

export const contact = {
  email: profileData.email,
  linkedinUrl: profileData.linkedinUrl,
  githubUrl: profileData.githubUrl,
  location: profileData.location,
};

export const techMarquee = marqueeTechList;

/** RotatingText role suggestions derived from title + domains */
export const rotatingRoles = [
  'Application Engineering',
  'Dynamics 365 & CRM',
  'C# / .NET Development',
  'Azure Platform',
  'AI & LLM Integration',
];
