/**
 * Registry of showcase sites. Every entry is a full, standalone website
 * reachable from the bottom toast switcher.
 */
import type { ComponentType } from 'react';

export interface SiteDef {
  id: string;
  name: string;
  tagline: string;
  /** 2-3 hex colors representing the site's palette (toast swatches) */
  palette: string[];
  /** Featured ReactBits components used in this site */
  components: string[];
  load: () => Promise<{ default: ComponentType }>;
}

export const sites: SiteDef[] = [
  {
    id: 'aurora-glass',
    name: 'Aurora Glass',
    tagline: 'Aurora gradients, glass panels, serif display type — inspired by the rbp-portfolio look',
    palette: ['#8b5cf6', '#d946ef', '#22d3ee'],
    components: ['Aurora', 'GradientText', 'RotatingText', 'TextType', 'SpecularButton', 'SpotlightCard', 'CountUp', 'GradualBlur', 'MaskedHeading'],
    load: () => import('./sites/aurora-glass/Site'),
  },
  {
    id: 'galaxy',
    name: 'Galaxy Drift',
    tagline: 'Deep-space WebGL galaxy, decrypted headings, orbital skill rings',
    palette: ['#6366f1', '#a855f7', '#22d3ee'],
    components: ['Galaxy', 'DecryptedText', 'MagicRings', 'DotGrid', 'WarpText', 'RotatingText', 'CountUp'],
    load: () => import('./sites/galaxy/Site'),
  },
  {
    id: 'noir-threads',
    name: 'Noir Threads',
    tagline: 'Editorial monochrome noir, web-thread canvas, accordion gallery projects',
    palette: ['#fafafa', '#a3a3a3', '#3b82f6'],
    components: ['WebThreads', 'MaskedHeading', 'AccordionGallery', 'SplitText', 'SpecularButton', 'GradualBlur', 'LogoLoop'],
    load: () => import('./sites/noir-threads/Site'),
  },
  {
    id: 'plasma-bento',
    name: 'Plasma Bento',
    tagline: 'Magnetic bento grids with glow-follow cards over gradient blinds',
    palette: ['#f97316', '#ec4899', '#8b5cf6'],
    components: ['GradientBlinds', 'MagicBento', 'GooeyNav', 'GradientText', 'TextType', 'SpecularButton', 'GradualBlur'],
    load: () => import('./sites/plasma-bento/Site'),
  },
  {
    id: 'prism-ribbons',
    name: 'Prism Ribbons',
    tagline: 'Flowing WebGL ribbons, plasma-wave hero, card-swap project deck',
    palette: ['#22d3ee', '#a78bfa', '#f472b6'],
    components: ['Ribbons', 'PlasmaWave', 'DecryptedText', 'CardSwap', 'FlowingMenu', 'AnimatedList', 'DotGrid'],
    load: () => import('./sites/prism-ribbons/Site'),
  },
  {
    id: 'original',
    name: 'Original v1',
    tagline: 'The first version of the site from our earlier session (particles + terminal)',
    palette: ['#00f2fe', '#7928ca', '#ff0080'],
    components: ['ParticlesBackground', 'DecryptedText', 'TrueFocus', 'SpotlightCard', 'Marquee', 'Counter'],
    load: () => import('@/App'),
  },
];

export const defaultSiteId = sites[0].id;

export function getSite(id: string): SiteDef | undefined {
  return sites.find((s) => s.id === id);
}
