import React from 'react';
import { cn } from '@/demo/helpers';

interface StretchPlaceholderProps {
  className?: string;
  deps?: string;
}

/** Rendered for "(stretch)" components that were skipped to keep the bundle lean */
const StretchPlaceholder: React.FC<StretchPlaceholderProps> = ({ className, deps = 'ogl' }) => (
  <div className={cn('flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-surface-200/40 p-8 text-center', className)}>
    <span className="text-3xl">🧪</span>
    <p className="text-sm font-semibold text-slate-400">Stretch — not implemented</p>
    <p className="max-w-sm text-xs text-slate-600">
      This component was skipped to keep the static bundle lean. It requires{' '}
      <code className="rounded bg-white/5 px-1 py-0.5 font-mono text-[10px] text-purple-400">
        {deps}
      </code>
      , which is <strong>not installed</strong>. Install it and flip the registry entry to opt in.
    </p>
    <a
      href="https://www.reactbits.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[11px] text-cyan-400/70 underline-offset-2 hover:underline"
    >
      reactbits.dev docs →
    </a>
  </div>
);

export default StretchPlaceholder;