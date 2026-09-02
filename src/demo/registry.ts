import React from 'react';

// ── Category type ────────────────────────────────────────────────
export type CategoryId =
  | 'text-animations'
  | 'cursor-hover'
  | 'ui-components'
  | 'backgrounds'
  | 'existing-live';

export interface DemoTabMeta {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  deps: 'none' | 'canvas' | 'ogl' | 'gsap' | 'three';
  url?: string;
  component: React.ComponentType;
  /** True if the component is marked as "(stretch)" in the plan */
  stretch?: boolean;
}

// ── Lazy imports (chunked per category for dev-speed) ────────────

// Text Animations
const RotatingText = React.lazy(() => import('@/demo/bits/RotatingText'));
const TextType = React.lazy(() => import('@/demo/bits/TextType'));
const GlitchText = React.lazy(() => import('@/demo/bits/GlitchText'));
const BlurText = React.lazy(() => import('@/demo/bits/BlurText'));
const GradientText = React.lazy(() => import('@/demo/bits/GradientText'));
const ShinyText = React.lazy(() => import('@/demo/bits/ShinyText'));
const ScrollFloat = React.lazy(() => import('@/demo/bits/ScrollFloat'));
const FallingText = React.lazy(() => import('@/demo/bits/FallingText'));
const TextLoop = React.lazy(() => import('@/demo/bits/TextLoop'));
const ASCIIText = React.lazy(() => import('@/demo/bits/ASCIIText'));

// Cursor & Hover
const Magnet = React.lazy(() => import('@/demo/bits/Magnet'));
const GlareHover = React.lazy(() => import('@/demo/bits/GlareHover'));
const PixelTransition = React.lazy(() => import('@/demo/bits/PixelTransition'));
const Noise = React.lazy(() => import('@/demo/bits/Noise'));
const ClickSpark = React.lazy(() => import('@/demo/bits/ClickSpark'));
const BlobCursor = React.lazy(() => import('@/demo/bits/BlobCursor'));
const StarBorder = React.lazy(() => import('@/demo/bits/StarBorder'));
const ElectricBorder = React.lazy(() => import('@/demo/bits/ElectricBorder'));
const SplashCursor = React.lazy(() => import('@/demo/bits/SplashCursor'));

// UI Components
const TiltedCard = React.lazy(() => import('@/demo/bits/TiltedCard'));
const BorderGlow = React.lazy(() => import('@/demo/bits/BorderGlow'));
const ScrollStack = React.lazy(() => import('@/demo/bits/ScrollStack'));
const Stepper = React.lazy(() => import('@/demo/bits/Stepper'));
const AnimatedList = React.lazy(() => import('@/demo/bits/AnimatedList'));
const BounceCards = React.lazy(() => import('@/demo/bits/BounceCards'));
const GooeyNav = React.lazy(() => import('@/demo/bits/GooeyNav'));
const PillNav = React.lazy(() => import('@/demo/bits/PillNav'));
const Dock = React.lazy(() => import('@/demo/bits/Dock'));
const CardSwap = React.lazy(() => import('@/demo/bits/CardSwap'));
const ProfileCard = React.lazy(() => import('@/demo/bits/ProfileCard'));

// Backgrounds
const LetterGlitch = React.lazy(() => import('@/demo/bits/LetterGlitch'));
const FaultyTerminal = React.lazy(() => import('@/demo/bits/FaultyTerminal'));
const DotGrid = React.lazy(() => import('@/demo/bits/DotGrid'));
const GridMotion = React.lazy(() => import('@/demo/bits/GridMotion'));
const Aurora = React.lazy(() => import('@/demo/bits/Aurora'));
const Beams = React.lazy(() => import('@/demo/bits/Beams'));

// Existing live bits (already bundled — static imports)
import {
  ExistingParticles,
  ExistingDecryptedText,
  ExistingTrueFocus,
  ExistingSpotlightCard,
  ExistingSplitText,
  ExistingMarquee,
  ExistingCounter,
} from '@/demo/bits/ExistingBits';

// Stretch placeholder (deps not installed)
const StretchPlaceholder = React.lazy(() => import('@/demo/bits/StretchPlaceholder'));

const mkStretch = (
  id: string,
  category: CategoryId,
  name: string,
  description: string,
  deps: 'ogl' | 'three',
  url: string
): DemoTabMeta => ({
  id,
  category,
  name,
  description: `${description} (needs ${deps} — not installed)`,
  deps,
  url,
  component: StretchPlaceholder,
  stretch: true,
});

// ── The Registry ─────────────────────────────────────────────────
export const demoRegistry: DemoTabMeta[] = [
  // ── Text Animations ──
  {
    id: 'rotating-text',
    category: 'text-animations',
    name: 'RotatingText',
    description: 'Cycle roles/words with a smooth vertical flip animation',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/rotating-text',
    component: RotatingText,
  },
  {
    id: 'text-type',
    category: 'text-animations',
    name: 'TextType',
    description: 'Typing machine effect—letters appear one by one',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/text-type',
    component: TextType,
  },
  {
    id: 'glitch-text',
    category: 'text-animations',
    name: 'GlitchText',
    description: 'RGB-split glitch distortion on hover',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/glitch-text',
    component: GlitchText,
  },
  {
    id: 'blur-text',
    category: 'text-animations',
    name: 'BlurText',
    description: 'Soft-focus blur-to-clear reveal animation',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/blur-text',
    component: BlurText,
  },
  {
    id: 'gradient-text',
    category: 'text-animations',
    name: 'GradientText',
    description: 'Animated text gradient flowing across the headline',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/gradient-text',
    component: GradientText,
  },
  {
    id: 'shiny-text',
    category: 'text-animations',
    name: 'ShinyText',
    description: 'Metallic sheen sweeping across text',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/shiny-text',
    component: ShinyText,
  },
  {
    id: 'scroll-float',
    category: 'text-animations',
    name: 'ScrollFloat',
    description: 'Word-by-word floating entrance on scroll',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/scroll-float',
    component: ScrollFloat,
  },
  {
    id: 'falling-text',
    category: 'text-animations',
    name: 'FallingText',
    description: 'Playful falling-letter entrance animation',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/falling-text',
    component: FallingText,
  },
  {
    id: 'text-loop',
    category: 'text-animations',
    name: 'TextLoop',
    description: 'Marquee / text loop alternative',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/text-loop',
    component: TextLoop,
  },
  {
    id: 'ascii-text',
    category: 'text-animations',
    name: 'ASCIIText',
    description: 'Retro ASCII-art text background effect',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/ascii-text',
    component: ASCIIText,
  },

  // ── Cursor & Hover Effects ──
  {
    id: 'magnet',
    category: 'cursor-hover',
    name: 'Magnet',
    description: 'Elements spring toward the cursor like a magnet',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/magnet',
    component: Magnet,
  },
  {
    id: 'glare-hover',
    category: 'cursor-hover',
    name: 'GlareHover',
    description: 'Moving glare / sheen over a card on hover',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/glare-hover',
    component: GlareHover,
  },
  {
    id: 'pixel-transition',
    category: 'cursor-hover',
    name: 'PixelTransition',
    description: 'Pixel-dissolve image transition on hover',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/pixel-transition',
    component: PixelTransition,
  },
  {
    id: 'noise',
    category: 'cursor-hover',
    name: 'Noise',
    description: 'Film-grain / TV-static overlay effect',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/noise',
    component: Noise,
  },
  {
    id: 'click-spark',
    category: 'cursor-hover',
    name: 'ClickSpark',
    description: 'Particle spark burst on mouse click',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/click-spark',
    component: ClickSpark,
  },
  {
    id: 'blob-cursor',
    category: 'cursor-hover',
    name: 'BlobCursor',
    description: 'Organic blob following the cursor position',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/blob-cursor',
    component: BlobCursor,
  },
  {
    id: 'star-border',
    category: 'cursor-hover',
    name: 'StarBorder',
    description: 'Sparkle / star border orbiting a container',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/star-border',
    component: StarBorder,
  },
  {
    id: 'electric-border',
    category: 'cursor-hover',
    name: 'ElectricBorder',
    description: 'Jittery electric energy border on a card',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/electric-border',
    component: ElectricBorder,
  },
  {
    id: 'splash-cursor',
    category: 'cursor-hover',
    name: 'SplashCursor',
    description: 'Liquid splash / ripple at cursor (canvas 2D)',
    deps: 'canvas',
    url: 'https://www.reactbits.dev/animations/splash-cursor',
    component: SplashCursor,
  },

  // ── UI Components ──
  {
    id: 'tilted-card',
    category: 'ui-components',
    name: 'TiltedCard',
    description: '3D perspective tilt following cursor on a card',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/tilted-card',
    component: TiltedCard,
  },
  {
    id: 'border-glow',
    category: 'ui-components',
    name: 'BorderGlow',
    description: 'Cursor-following mesh-gradient animated border',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/border-glow',
    component: BorderGlow,
  },
  {
    id: 'scroll-stack',
    category: 'ui-components',
    name: 'ScrollStack',
    description: 'Overlapping cards that stack on scroll',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/scroll-stack',
    component: ScrollStack,
  },
  {
    id: 'stepper',
    category: 'ui-components',
    name: 'Stepper',
    description: 'Animated step indicator / state machine metaphor',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/stepper',
    component: Stepper,
  },
  {
    id: 'animated-list',
    category: 'ui-components',
    name: 'AnimatedList',
    description: 'Staggered list reveal animation',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/animated-list',
    component: AnimatedList,
  },
  {
    id: 'bounce-cards',
    category: 'ui-components',
    name: 'BounceCards',
    description: 'Cards bounce in from off-screen with tilt spread',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/bounce-cards',
    component: BounceCards,
  },
  {
    id: 'gooey-nav',
    category: 'ui-components',
    name: 'GooeyNav',
    description: 'Liquid sliding indicator for tab navigation',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/gooey-nav',
    component: GooeyNav,
  },
  {
    id: 'pill-nav',
    category: 'ui-components',
    name: 'PillNav',
    description: 'Minimal sliding-pill navigation indicator',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/pill-nav',
    component: PillNav,
  },
  {
    id: 'dock',
    category: 'ui-components',
    name: 'Dock',
    description: 'macOS-style magnifying dock of icons',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/dock',
    component: Dock,
  },
  {
    id: 'card-swap',
    category: 'ui-components',
    name: 'CardSwap',
    description: 'Cards that animate position swapping',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/card-swap',
    component: CardSwap,
  },
  {
    id: 'profile-card',
    category: 'ui-components',
    name: 'ProfileCard',
    description: 'Glare + 3D hover profile card',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/profile-card',
    component: ProfileCard,
  },

  // ── Backgrounds ──
  {
    id: 'letter-glitch',
    category: 'backgrounds',
    name: 'LetterGlitch',
    description: 'Matrix-style falling letters (canvas 2D)',
    deps: 'canvas',
    url: 'https://www.reactbits.dev/backgrounds/letter-glitch',
    component: LetterGlitch,
  },
  {
    id: 'faulty-terminal',
    category: 'backgrounds',
    name: 'FaultyTerminal',
    description: 'CRT scanline / glitch terminal backdrop',
    deps: 'none',
    url: 'https://www.reactbits.dev/backgrounds/faulty-terminal',
    component: FaultyTerminal,
  },
  {
    id: 'dot-grid',
    category: 'backgrounds',
    name: 'DotGrid',
    description: 'Interactive dot grid canvas background',
    deps: 'canvas',
    url: 'https://www.reactbits.dev/backgrounds/dot-grid',
    component: DotGrid,
  },
  {
    id: 'grid-motion',
    category: 'backgrounds',
    name: 'GridMotion',
    description: 'Mouse-displaced wall of squares (canvas 2D)',
    deps: 'canvas',
    url: 'https://www.reactbits.dev/backgrounds/grid-motion',
    component: GridMotion,
  },
  {
    id: 'aurora',
    category: 'backgrounds',
    name: 'Aurora',
    description: 'Flowing aurora gradient background (canvas 2D)',
    deps: 'canvas',
    url: 'https://www.reactbits.dev/backgrounds/aurora',
    component: Aurora,
  },
  {
    id: 'beams',
    category: 'backgrounds',
    name: 'Beams',
    description: 'Crossing animated light ribbons',
    deps: 'none',
    url: 'https://www.reactbits.dev/backgrounds/beams',
    component: Beams,
  },

  // ── Existing Live Bits (comparison) ──
  {
    id: 'live-particles',
    category: 'existing-live',
    name: 'ParticlesBackground',
    description: 'Live page hero background — interactive particle field',
    deps: 'canvas',
    url: 'https://www.reactbits.dev/backgrounds/particles',
    component: ExistingParticles,
  },
  {
    id: 'live-decrypted-text',
    category: 'existing-live',
    name: 'DecryptedText',
    description: 'Scramble-to-reveal text effect (used in hero)',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/decrypted-text',
    component: ExistingDecryptedText,
  },
  {
    id: 'live-true-focus',
    category: 'existing-live',
    name: 'TrueFocus',
    description: 'Glowing focus ring walking between words',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/true-focus',
    component: ExistingTrueFocus,
  },
  {
    id: 'live-spotlight-card',
    category: 'existing-live',
    name: 'SpotlightCard',
    description: 'Cursor spotlight + border highlight card',
    deps: 'none',
    url: 'https://www.reactbits.dev/components/spotlight-card',
    component: ExistingSpotlightCard,
  },
  {
    id: 'live-split-text',
    category: 'existing-live',
    name: 'SplitText',
    description: 'Blur-spring stagger word reveal',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/split-text',
    component: ExistingSplitText,
  },
  {
    id: 'live-infinite-marquee',
    category: 'existing-live',
    name: 'InfiniteScrollMarquee',
    description: 'Seamless looping tech marquee',
    deps: 'none',
    url: 'https://www.reactbits.dev/text-animations/text-loop',
    component: ExistingMarquee,
  },
  {
    id: 'live-animated-counter',
    category: 'existing-live',
    name: 'AnimatedCounter',
    description: 'Ease-out counting numbers on view',
    deps: 'none',
    url: 'https://www.reactbits.dev/animations/count-up',
    component: ExistingCounter,
  },

  // ── (Stretch) — skipped: WebGL deps not installed, keep bundle lean ──
  mkStretch(
    'stretch-orb',
    'backgrounds',
    'Orb (stretch)',
    'Floating shader energy orb',
    'ogl',
    'https://www.reactbits.dev/backgrounds/orb'
  ),
  mkStretch(
    'stretch-glow-cursor',
    'cursor-hover',
    'GlowCursor (stretch)',
    'Shader light-trail cursor',
    'ogl',
    'https://www.reactbits.dev/animations/glow-cursor'
  ),
  mkStretch(
    'stretch-magic-bento',
    'ui-components',
    'MagicBento (stretch)',
    'Click-to-expand bento grid',
    'ogl',
    'https://www.reactbits.dev/components/magic-bento'
  ),
  mkStretch(
    'stretch-topography',
    'backgrounds',
    'Topography (stretch)',
    'Contour-map canvas background',
    'ogl',
    'https://www.reactbits.dev/backgrounds/topography'
  ),
  mkStretch(
    'stretch-hyperspeed',
    'backgrounds',
    'Hyperspeed (stretch)',
    'Hyperspace streak shader',
    'three',
    'https://www.reactbits.dev/backgrounds/hyperspeed'
  ),
];

// ── Helpers ──────────────────────────────────────────────────────

export const categoryLabels: Record<CategoryId, string> = {
  'text-animations': 'Text Animations',
  'cursor-hover': 'Cursor & Hover',
  'ui-components': 'UI Components',
  'backgrounds': 'Backgrounds',
  'existing-live': 'Existing Live Bits',
};

export const categoryOrder: CategoryId[] = [
  'text-animations',
  'cursor-hover',
  'ui-components',
  'backgrounds',
  'existing-live',
];

export function getEntriesByCategory(category: CategoryId) {
  return demoRegistry.filter((e) => e.category === category);
}
