import React from 'react';
import { GraduationCap, Cpu, CheckCircle2, Archive } from 'lucide-react';
import { educationData } from '../../data/portfolioData';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="relative py-24 overflow-hidden">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Academic Credentials & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              <span>Education & </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Distributed Systems Thesis
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Formal training in Informatics and advanced hardware-dependent software engineering at Ghent University.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Master Thesis Deep Card (8 cols) */}
          <div className="lg:col-span-8">
            <SpotlightCard
              spotlightColor="rgba(0, 242, 254, 0.15)"
              borderColor="rgba(0, 242, 254, 0.4)"
              className="p-6 sm:p-8 lg:p-10"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6 mb-6">
                <div>
                  <span className="rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-xs font-mono text-cyan-300">
                    Master Thesis Research
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    {educationData.degree}
                  </h3>
                  <p className="text-cyan-400 font-medium text-sm sm:text-base">
                    {educationData.institution} • {educationData.location}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-slate-300">
                  {educationData.period}
                </div>
              </div>

              {/* Thesis Title */}
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-1">
                  // Thesis Title & Focus
                </div>
                <h4 className="text-lg font-bold text-white leading-snug">
                  "{educationData.thesis.title}"
                </h4>
              </div>

              {/* Thesis Abstract */}
              <div className="mb-6 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  // Abstract & Research Scope
                </h5>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {educationData.thesis.abstract}
                </p>
              </div>

              {/* Key Contributions */}
              <div className="mb-6 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  // Key Contributions
                </h5>
                <ul className="space-y-2">
                  {educationData.thesis.keyContributions.map((contrib, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research Supervisors & Guidance */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">// Supervisors</div>
                  <div className="mt-1 space-y-0.5">
                    {educationData.thesis.supervisors.map((s, idx) => (
                      <div key={idx} className="text-xs font-medium text-slate-200">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">// Guidance</div>
                  <div className="mt-1 space-y-0.5">
                    {educationData.thesis.guidance.map((g, idx) => (
                      <div key={idx} className="text-xs font-medium text-slate-200">
                        {g}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right: Honors & Achievements (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Arctic Code Vault Badge */}
            <SpotlightCard
              spotlightColor="rgba(121, 40, 202, 0.2)"
              borderColor="rgba(121, 40, 202, 0.4)"
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  <Archive className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">
                    Arctic Code Vault Contributor
                  </h4>
                  <p className="text-xs font-mono text-cyan-400">GitHub 2020 Archive</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Recognized by GitHub for code archived in the 2020 Arctic Vault Program in Svalbard, preserving open-source software for future generations.
              </p>

              <div className="pt-3 border-t border-white/5 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Repository Contributor</span>
                <span className="text-purple-300">Verified</span>
              </div>
            </SpotlightCard>

            {/* Ghent University Alumni Spotlight */}
            <SpotlightCard
              spotlightColor="rgba(0, 242, 254, 0.15)"
              borderColor="rgba(0, 242, 254, 0.35)"
              className="p-6 sm:p-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">
                    IDLab Research Group
                  </h4>
                  <p className="text-xs font-mono text-purple-300">UGent - imec</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Specialized in wireless networking protocols, low-power embedded transceivers, and distributed synchronization architectures.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
