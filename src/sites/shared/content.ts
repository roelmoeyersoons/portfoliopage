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
  certificationsData,
  educationData,
  experiencesData,
  honorsData,
  marqueeTechList,
  otherSkillsData,
  profileData,
  projectsData,
  coreSkillsData,
} from '@/data/portfolioData';
import type { CertificationItem, HonorItem } from '@/types/portfolio';

// ── Tabs ──────────────────────────────────────────────────────────
/** 'terminal' is the hidden easter-egg tab — icon-only in the nav. */
export type TabId = 'home' | 'experience' | 'skills' | 'projects' | 'about' | 'contact' | 'terminal';

export interface TabDef {
  id: TabId;
  label: string;
  /** Icon-only tab: icon name resolved via shared/iconMap, no label shown. */
  icon?: string;
  /** Accessible name for icon-only tabs. */
  ariaLabel?: string;
}

export const siteTabs: TabDef[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'terminal', label: '', icon: 'TerminalSquare', ariaLabel: 'Terminal — hidden shell tab' },
];

/**
 * Shared navigation signature for all variants: switch tab, optionally
 * focusing a specific item (skill id, experience id, project id).
 * Variants re-export/alias this as their own TabNavigate.
 */
export type TabNavigate = (tab: TabId, focusId?: string) => void;

/**
 * Focus payload handed to a tab after cross-tab navigation. `nonce`
 * changes on every navigation so tabs can react even when the target id
 * is unchanged (e.g. clicking the same skill link twice).
 */
export interface TabFocus {
  id: string;
  nonce: number;
}

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
  /** Core skill ids this experience demonstrates — click-through to skills. */
  skillIds: string[];
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
  skillIds: e.skillIds ?? [],
  deepDive: {
    challenge: e.deepDive?.architecturalChallenge ?? '',
    solution: e.deepDive?.solution ?? '',
    learnings: e.deepDive?.keyLearnings ?? [],
  },
  art: artForExperience[e.id] ?? { style: 'mesh', hue: 262 },
}));

// ── Skills ────────────────────────────────────────────────────────
/**
 * The six real skills — each rendered as its own section with narrative
 * text and click-through links to the experiences/projects that prove it.
 * No percentages here on purpose: the story is the claim.
 */
export interface CoreSkillLink {
  id: string;
  /** Experience index label ("01") or project title. */
  label: string;
  sublabel: string;
}

export interface CoreSkillEntry {
  id: string;
  index: string;
  title: string;
  /** Lucide icon name — resolve via shared/iconMap */
  icon: string;
  tagline: string;
  paragraphs: string[];
  proofPoints: string[];
  experiences: CoreSkillLink[];
  projects: CoreSkillLink[];
  art: ArtSpec;
}

export interface OtherSkillsGroup {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: { name: string; level: number; years?: string; badge?: string }[];
}

const artForCoreSkill: Record<string, ArtSpec> = {
  'dynamics-365-power-platform': { style: 'mesh', hue: 330 },
  'azure-platform': { style: 'grid', hue: 205 },
  'applied-ai': { style: 'constellation', hue: 285 },
  'csharp-dotnet': { style: 'strata', hue: 262 },
  'devops-cicd-iac': { style: 'waves', hue: 150 },
  'solution-architecture': { style: 'orbits', hue: 262 },
};

export const coreSkills: CoreSkillEntry[] = coreSkillsData.map((s, i) => ({
  id: s.id,
  index: String(i + 1).padStart(2, '0'),
  title: s.title,
  icon: s.iconName,
  tagline: s.tagline,
  paragraphs: s.paragraphs,
  proofPoints: s.proofPoints,
  experiences: s.relatedExperienceIds
    .map((id) => {
      const e = experiences.find((x) => x.id === id);
      return e ? { id: e.id, label: e.shortCompany, sublabel: e.period } : null;
    })
    .filter((x): x is CoreSkillLink => x !== null),
  projects: s.relatedProjectIds
    .map((id) => {
      const p = projectsData.find((x) => x.id === id);
      return p ? { id: p.id, label: p.title, sublabel: p.category } : null;
    })
    .filter((x): x is CoreSkillLink => x !== null),
  art: artForCoreSkill[s.id] ?? { style: 'mesh', hue: 262 },
}));

/** The long tail: technologies I've used at some point, roughly how central. */
export const otherSkills: OtherSkillsGroup = {
  id: 'other-toolbox',
  title: 'Other — used along the way',
  icon: 'Cpu',
  description:
    'Technologies I have used at some point, with roughly how central each became in my work.',
  items: otherSkillsData,
};

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
  /** Core skill ids this project demonstrates — click-through to skills. */
  skillIds: string[];
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
  skillIds: p.skillIds ?? [],
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

/** Vendor certifications — kept out of education on purpose (credentials ≠ schooling). */
export const certifications: CertificationItem[] = certificationsData;
export type { CertificationItem, HonorItem };

/** Honors & awards (per LinkedIn) — rendered on the About tab. */
export const honors: HonorItem[] = honorsData;

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
