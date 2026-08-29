import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Table2, LayoutGrid, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { experiencesData } from '../../data/portfolioData';
import { ExperienceItem } from '../../types/portfolio';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { ExperienceTable } from './ExperienceTable';
import { ExperienceDeepDiveModal } from './ExperienceDeepDiveModal';

export const ExperienceSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [activeModalExperience, setActiveModalExperience] = useState<ExperienceItem | null>(null);

  const domains = [
    'All',
    'Consulting & Architecture',
    'Distributed Systems',
    'Full Stack',
    'Low-Level & Graphics',
  ];

  const filteredExperiences = experiencesData.filter((exp) => {
    if (selectedDomain === 'All') return true;
    return exp.domain === selectedDomain;
  });

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Ambient background light */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] -z-10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              <span>Career & System Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              <span>Experience & </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Technical Roles
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              A comprehensive record of systems, distributed protocol research, full-stack platforms, and architectural consulting.
            </p>
          </div>

          {/* View Mode Toggle: Cards vs Table */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-surface-100/60 p-1.5 backdrop-blur-md self-start md:self-auto shadow-lg">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Visual Cards</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table2 className="h-4 w-4" />
              <span>Matrix Table</span>
            </button>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/5">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter Domain:
          </span>
          {domains.map((domain) => {
            const isSelected = selectedDomain === domain;
            return (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'border border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-sm'
                    : 'border border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/15 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>

        {/* Render View: Cards or Table */}
        <AnimatePresence mode="wait">
          {viewMode === 'table' ? (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ExperienceTable
                experiences={filteredExperiences}
                onSelectExperience={(exp) => setActiveModalExperience(exp)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="cards-view"
              className="space-y-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {filteredExperiences.map((exp) => (
                <SpotlightCard
                  key={exp.id}
                  spotlightColor="rgba(0, 242, 254, 0.12)"
                  borderColor="rgba(0, 242, 254, 0.35)"
                  className="p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                      {/* Domain and metadata */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                        <span className="rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 text-xs font-mono text-cyan-300">
                          {exp.domain}
                        </span>
                        <span className="rounded-md bg-purple-500/15 border border-purple-500/30 px-2.5 py-1 text-xs font-mono text-purple-300">
                          {exp.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {exp.location}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg font-semibold text-cyan-400 mt-1">
                        {exp.company}
                      </h4>
                    </div>

                    {/* Period and Deep Dive Trigger */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3">
                      <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-cyan-300 font-semibold">
                        {exp.period}
                      </span>
                      <button
                        onClick={() => setActiveModalExperience(exp)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-mono text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/20"
                      >
                        <span>Deep Dive Specs</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Summary & Paragraphs */}
                  <div className="py-6 space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                    <p className="font-medium text-slate-200">
                      {exp.summary}
                    </p>
                    {exp.paragraphs.slice(0, 2).map((para, pIdx) => (
                      <p key={pIdx} className="text-slate-400">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Bullet points */}
                  <div className="mb-6 space-y-2">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      // Key Deliverables
                    </h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {exp.bulletPoints.map((point, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics Bar */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      {exp.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="text-center sm:text-left">
                          <div className="text-lg font-bold font-mono text-cyan-300">
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-400">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 mr-2">Technologies:</span>
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Deep-Dive Modal */}
      <ExperienceDeepDiveModal
        experience={activeModalExperience}
        onClose={() => setActiveModalExperience(null)}
      />
    </section>
  );
};
