/**
 * Bento Galaxy — Terminal tab (the easter egg).
 *
 * The interactive CLI from the original v1 site used to sit at the bottom
 * of the About tab; it now lives on its own nav entry — an icon-only pill
 * with no label, easy to miss, fun to find. The tab itself stays minimal:
 * a short hint, then the terminal, nothing else.
 */
import React from 'react';
import { TerminalSquare } from 'lucide-react';
import { Panel, SectionHeading } from '../ui';
import Terminal from './Terminal';

const TerminalTab: React.FC = () => (
  <section className="mx-auto max-w-4xl px-5 pb-28 pt-28">
    <SectionHeading kicker="Sys · interactive" title="Terminal" />

    <div className="-mt-2 mb-6 flex flex-wrap items-end justify-between gap-3">
      <p className="max-w-xl text-[13.5px] leading-relaxed text-slate-400">
        You found the hidden shell. The whole site is queryable from this CLI —
        start with <span className="font-mono font-semibold text-cyan-300/90">help</span>.
      </p>
      <p className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:flex">
        <TerminalSquare size={12} className="text-cyan-300" />
        roel@bento-galaxy · sandbox
      </p>
    </div>

    <Panel className="p-4 sm:p-6">
      <Terminal />
    </Panel>
  </section>
);

export default TerminalTab;
