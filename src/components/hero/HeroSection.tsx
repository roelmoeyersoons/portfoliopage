import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Table2, Layers, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { DecryptedText } from '../reactbits/DecryptedText';
import { TrueFocus } from '../reactbits/TrueFocus';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { AnimatedCounter } from '../reactbits/AnimatedCounter';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Status badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-mono text-cyan-300 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Available for Technical Architecture & Consulting</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]">
              <span>Hi, I'm </span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                <DecryptedText text="Roel Moeyersoons" speed={35} maxIterations={12} />
              </span>
            </h1>

            {/* Sub-headline with TrueFocus */}
            <div className="text-xl sm:text-2xl text-slate-300 font-medium mb-6">
              <TrueFocus
                sentence="Designing Distributed Protocols High-Performance Systems & Web Platforms"
                focusColor="#00f2fe"
                glowColor="rgba(0, 242, 254, 0.3)"
              />
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-3 text-slate-300 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
              <p>
                {profileData.bioParagraphs[0]}
              </p>
              <p className="text-sm sm:text-base text-slate-400">
                {profileData.bioParagraphs[1]}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => onNavigate('experience')}
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 hover:scale-[1.02]"
              >
                <Table2 className="h-4 w-4" />
                <span>Explore Experiences & Table</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-surface-100/60 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-surface-50 hover:text-white"
              >
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Featured Projects</span>
              </button>

              <button
                onClick={() => onNavigate('terminal')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3.5 text-sm font-mono text-purple-300 backdrop-blur-md transition-all duration-300 hover:border-purple-400/60 hover:bg-purple-500/20"
              >
                <Terminal className="h-4 w-4" />
                <span>CLI Mode</span>
              </button>
            </div>

            {/* Quick Feature Pill Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 border border-white/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                100% Static & Standalone
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 border border-white/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                Zero Backend Dependency
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 border border-white/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Interactive React Bits Engine
              </span>
            </div>
          </motion.div>

          {/* Right Column: Interactive System Terminal / Spec Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SpotlightCard
              spotlightColor="rgba(0, 242, 254, 0.18)"
              borderColor="rgba(0, 242, 254, 0.4)"
              className="p-6 sm:p-7 shadow-2xl"
            >
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    roel@system-node: ~
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 rounded px-1.5 py-0.5 bg-cyan-500/10">
                  SYSTEM READY
                </span>
              </div>

              {/* Code / Profile Spec Content */}
              <div className="font-mono text-xs space-y-3 text-slate-300">
                <div className="text-cyan-300">
                  <span className="text-purple-400">const</span> engineerProfile = &#123;
                </div>

                <div className="pl-4 space-y-1.5 text-slate-300 border-l border-white/10">
                  <div>
                    <span className="text-slate-500">name:</span>{" "}
                    <span className="text-emerald-300">"Roel Moeyersoons"</span>,
                  </div>
                  <div>
                    <span className="text-slate-500">degree:</span>{" "}
                    <span className="text-emerald-300">"M.Sc. Industrial Sciences: Informatics"</span>,
                  </div>
                  <div>
                    <span className="text-slate-500">almaMater:</span>{" "}
                    <span className="text-cyan-300">"Ghent University (UGent)"</span>,
                  </div>
                  <div>
                    <span className="text-slate-500">focus:</span>{" "}
                    <span className="text-purple-300">"Dynamics 365 · C#/.NET · Azure"</span>,
                  </div>
                  <div>
                    <span className="text-slate-500">specialties:</span> [
                    <span className="text-amber-300">"Dynamics 365"</span>,{" "}
                    <span className="text-amber-300">"C#/.NET"</span>,{" "}
                    <span className="text-amber-300">"Azure"</span>,{" "}
                    <span className="text-amber-300">"TypeScript"</span>],
                  </div>
                  <div>
                    <span className="text-slate-500">status:</span>{" "}
                    <span className="text-emerald-400">"Open to High-Impact Opportunities"</span>
                  </div>
                </div>

                <div className="text-cyan-300">&#125;;</div>
              </div>

              {/* Hardware / Engine Metrics Badges */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                  <div className="text-xl font-bold font-mono text-cyan-400">
                    <AnimatedCounter to={99} duration={2} formatter={(v) => `${v}.9%`} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Reliability & SLA</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                  <div className="text-xl font-bold font-mono text-purple-400">
                    AZ-305
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Azure Solutions Architect Expert</div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Bottom Key Stats Bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white/5 bg-surface-100/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-surface-50"
            >
              <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-cyan-300 transition-colors">
                <span>{stat.value}</span>
                {stat.suffix && <span className="text-cyan-400 text-lg">{stat.suffix}</span>}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.description}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
