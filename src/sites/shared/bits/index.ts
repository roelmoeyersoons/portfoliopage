/**
 * Typed barrel for the raw ReactBits components (which are plain .jsx).
 * Every component is re-exported as React.FC<any> so variants get clean
 * IntelliSense-friendly imports without fighting JS inference:
 *
 *   import { Aurora, GradientText, RotatingText } from '@/sites/shared/bits';
 */
import type { ComponentType } from 'react';
import React from 'react';

import AccordionGalleryRaw from './AccordionGallery.jsx';
import AnimatedListRaw from './AnimatedList.jsx';
import AuroraRaw from './Aurora.jsx';
import BlurTextRaw from './BlurText.jsx';
import BounceCardsRaw from './BounceCards.jsx';
import CardSwapRaw from './CardSwap.jsx';
import CountUpRaw from './CountUp.jsx';
import DecryptedTextRaw from './DecryptedText.jsx';
import DockRaw from './Dock.jsx';
import DotGridRaw from './DotGrid.jsx';
import FlowingMenuRaw from './FlowingMenu.jsx';
import GalaxyRaw from './Galaxy.jsx';
import GlassIconsRaw from './GlassIcons.jsx';
import GooeyNavRaw from './GooeyNav.jsx';
import GradualBlurRaw from './GradualBlur.jsx';
import GradientBlindsRaw from './GradientBlinds.jsx';
import GradientTextRaw from './GradientText.jsx';
import LogoLoopRaw from './LogoLoop.jsx';
import MagicBentoRaw from './MagicBento.jsx';
import MaskedHeadingRaw from './MaskedHeading.jsx';
import ParticlesRaw from './Particles.jsx';
import PillNavRaw from './PillNav.jsx';
import PlasmaRaw from './Plasma.jsx';
import PlasmaWaveRaw from './PlasmaWave.jsx';
import RibbonsRaw from './Ribbons.jsx';
import RotatingTextRaw from './RotatingText.jsx';
import ShinyTextRaw from './ShinyText.jsx';
import SpecularButtonRaw from './SpecularButton.jsx';
import SpotlightCardRaw from './SpotlightCard.jsx';
import SplitTextRaw from './SplitText.jsx';
import StepperRaw from './Stepper.jsx';
import TextTypeRaw from './TextType.jsx';
import ThreadsRaw from './Threads.jsx';
import TrueFocusRaw from './TrueFocus.jsx';
import WarpTextRaw from './WarpText.jsx';
import WebThreadsRaw from './WebThreads.jsx';

type AnyFC = ComponentType<any>;
const typed = (c: unknown): AnyFC => c as AnyFC;

export const AccordionGallery = typed(AccordionGalleryRaw);
export const AnimatedList = typed(AnimatedListRaw);
export const Aurora = typed(AuroraRaw);
export const BlurText = typed(BlurTextRaw);
export const BounceCards = typed(BounceCardsRaw);
export const CardSwap = typed(CardSwapRaw);
export const CountUp = typed(CountUpRaw);
export const DecryptedText = typed(DecryptedTextRaw);
export const Dock = typed(DockRaw);
export const DotGrid = typed(DotGridRaw);
export const FlowingMenu = typed(FlowingMenuRaw);
export const Galaxy = typed(GalaxyRaw);
export const GlassIcons = typed(GlassIconsRaw);
export const GooeyNav = typed(GooeyNavRaw);
export const GradualBlur = typed(GradualBlurRaw);
export const GradientBlinds = typed(GradientBlindsRaw);
export const GradientText = typed(GradientTextRaw);
export const LogoLoop = typed(LogoLoopRaw);
export const MagicBento = typed(MagicBentoRaw);
// MagicRings pulls in three.js (~280 KB gzip) — keep it out of the eager graph
// so variants that don't use it never download it. Rendered lazily; the
// Showcase's <Suspense> boundary catches it on first mount.
export const MagicRings = typed(React.lazy(() => import('./MagicRings.jsx')));
export const MaskedHeading = typed(MaskedHeadingRaw);
export const Particles = typed(ParticlesRaw);
export const PillNav = typed(PillNavRaw);
export const Plasma = typed(PlasmaRaw);
export const PlasmaWave = typed(PlasmaWaveRaw);
export const Ribbons = typed(RibbonsRaw);
export const RotatingText = typed(RotatingTextRaw);
export const ShinyText = typed(ShinyTextRaw);
export const SpecularButton = typed(SpecularButtonRaw);
export const SpotlightCard = typed(SpotlightCardRaw);
export const SplitText = typed(SplitTextRaw);
export const Stepper = typed(StepperRaw);
export const TextType = typed(TextTypeRaw);
export const Threads = typed(ThreadsRaw);
export const TrueFocus = typed(TrueFocusRaw);
export const WarpText = typed(WarpTextRaw);
export const WebThreads = typed(WebThreadsRaw);
