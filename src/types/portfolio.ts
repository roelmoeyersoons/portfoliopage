export interface ExperienceItem {
  /** Core skill ids (coreSkillsData) this experience demonstrates — used for click-through links. */
  skillIds?: string[];
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Research' | 'Freelance' | 'Self-employed' | 'Internship' | 'Education';
  domain:
    | 'Distributed Systems'
    | 'Full Stack'
    | 'Low-Level & Graphics'
    | 'IoT & Hardware'
    | 'Consulting & Architecture'
    | 'Cloud & Enterprise Applications'
    | 'AI & Solution Architecture'
    | 'Dynamics & Power Platform'
    | 'Education & Research';
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
  /** Core skill ids (coreSkillsData) this project demonstrates — used for click-through links. */
  skillIds?: string[];
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

/**
 * A "real" skill: a profiled competency with its own narrative section on
 * the page. Max 6 of these exist; they are ordered by how Roel wants to
 * profile himself (Dynamics → Azure → AI → …). No fake percentages — the
 * story and the linked evidence are the proof.
 */
export interface CoreSkill {
  /** Stable id, kebab-case — used for anchors and cross-links everywhere. */
  id: string;
  title: string;
  iconName: string;
  /** One-line summary shown under the title. */
  tagline: string;
  /** Narrative paragraphs — sometimes short, sometimes longer, by design. */
  paragraphs: string[];
  /** Concrete, checkable proof points (certifications, outcomes, awards). */
  proofPoints: string[];
  /** Experience ids (experiencesData) this skill is distilled from. */
  relatedExperienceIds: string[];
  /** Project ids (projectsData) that also demonstrate this skill. */
  relatedProjectIds: string[];
}

/**
 * The long tail: technologies used at some point. Percentages kept per
 * Roel's request, framed as "how central it became", not a proficiency claim.
 */
export interface OtherSkill {
  name: string;
  level: number; // 1-100
  experienceYears?: string;
  badge?: string;
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

/**
 * Vendor certification. Deliberately NOT part of EducationItem: they are
 * credentials, not schooling. About renders them in the recognition card,
 * the hero lists them as compact chips, and Skills references them in
 * proof points.
 */
export interface CertificationItem {
  id: string;
  /** Official exam / credential code, e.g. "AZ-305". */
  code: string;
  /** Clean certification name (without the "Microsoft Certified:" prefix). */
  name: string;
  /** Extra-short label for compact chip rows (hero). */
  short: string;
  /**
   * Official Microsoft Learn credential page (verified live URLs — several
   * of these credentials were later renamed/retired by Microsoft; the page
   * is still the authoritative reference for what was earned). Rendered as
   * a "verify" link where certifications appear.
   */
  verifyUrl?: string;
}

/**
 * Client engagement case study — the professional proof shelf (distinct
 * from the hobby "Lab" projects). Real engagement names, per owner
 * decision; content is sourced from the matching experience deep-dives.
 */
export interface CaseStudyItem {
  id: string;
  /** Client / engagement name as shown publicly. */
  client: string;
  /** Client's industry, one or two words. */
  industry: string;
  /** Engagement window. */
  period: string;
  /** Roel's role on the engagement. */
  role: string;
  /** One-line headline of the engagement. */
  title: string;
  /** The situation the client was in. */
  challenge: string;
  /** What Roel actually did. */
  approach: string;
  /** Concrete, checkable outcomes. */
  outcomes: string[];
  techStack: string[];
  /** Core skill ids (coreSkillsData) this study demonstrates. */
  skillIds: string[];
}

/**
 * Testimonial card (Contact tab). Texts are owner-supplied: the first-hand
 * quote is real (translated), the others are the owner's paraphrases of
 * recurring feedback — never fabricate quotes. The company is shown and,
 * when `experienceId` is set, links into the Experience tab.
 */
export interface TestimonialItem {
  id: string;
  /** The quote itself. Empty string = slot not yet filled → not rendered. */
  quote: string;
  /** Person name and/or role, e.g. "Kaan" or "Technical expert". */
  attribution: string;
  /** Company the quote relates to — highlighted on the card. */
  company: string;
  /** Experience entry id — when set, the company links to that entry. */
  experienceId?: string;
}

/** Honors & awards (competition results etc.) shown on the About tab. */
export interface HonorItem {
  id: string;
  title: string;
  /** One-line context: year, category, organizer. */
  detail: string;
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
