/**
 * Typed barrel for the raw ReactBits components (which are plain .jsx).
 * Every component is re-exported as React.FC<any> so the site gets clean
 * IntelliSense-friendly imports without fighting JS inference:
 *
 *   import { Galaxy, GradientText, RotatingText } from '@/sites/shared/bits';
 *
 * Only the components the bento-galaxy site uses live here — the rest of
 * the original 38-component collection was removed in the consolidation.
 * The full pre-consolidation collection is preserved at git tag
 * showcase-v1 (replay: git worktree add ../landingpage-showcase-v1 showcase-v1).
 */
import type { ComponentType } from 'react';

import CountUpRaw from './CountUp.jsx';
import DecryptedTextRaw from './DecryptedText.jsx';
import DotGridRaw from './DotGrid.jsx';
import GalaxyRaw from './Galaxy.jsx';
import GradualBlurRaw from './GradualBlur.jsx';
import GradientTextRaw from './GradientText.jsx';
import LogoLoopRaw from './LogoLoop.jsx';
import RotatingTextRaw from './RotatingText.jsx';
import SpecularButtonRaw from './SpecularButton.jsx';
import StepperRaw from './Stepper.jsx';
import TextTypeRaw from './TextType.jsx';

type AnyFC = ComponentType<any>;
const typed = (c: unknown): AnyFC => c as AnyFC;

export const CountUp = typed(CountUpRaw);
export const DecryptedText = typed(DecryptedTextRaw);
export const DotGrid = typed(DotGridRaw);
export const Galaxy = typed(GalaxyRaw);
export const GradualBlur = typed(GradualBlurRaw);
export const GradientText = typed(GradientTextRaw);
export const LogoLoop = typed(LogoLoopRaw);
export const RotatingText = typed(RotatingTextRaw);
export const SpecularButton = typed(SpecularButtonRaw);
export const Stepper = typed(StepperRaw);
export const TextType = typed(TextTypeRaw);
