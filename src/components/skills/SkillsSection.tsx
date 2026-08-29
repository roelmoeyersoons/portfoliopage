import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layout, Server, Terminal } from 'lucide-react';
import { skillCategoriesData, marqueeTechList } from '../../data/portfolioData';
import { InfiniteScrollMarquee } from '../reactbits/InfiniteScrollMarquee';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="h-5 w-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="h-5 w-5 text-purple-400" />;
      case 'Layout':
        return <Layout className="h-5 w-5 text-pink-400" />;
      case 'Server':
        return <Server className="h-5 w-5 text-emerald-400" />;
      default:
        return <Terminal className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Infinite Marquee Strip */}
      <div className="mb-20">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
          // Core Technology Ecosystem
        </p>
        <InfiniteScrollMarquee items={marqueeTechList} speed="medium" direction="left" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            <Terminal className="h-3.5 w-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            <span>Skills & </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Systems Architecture
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Spanning low-level C memory management and distributed networking protocols to reactive TypeScript frontend architectures.
          </p>
        </div>

        {/* Category Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {skillCategoriesData.map((cat, idx) => {
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white shadow-lg shadow-cyan-500/10'
                    : 'border border-white/10 bg-surface-100/60 text-slate-400 hover:border-white/20 hover:bg-surface-50 hover:text-slate-200'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Matrix */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <SpotlightCard
            spotlightColor="rgba(0, 242, 254, 0.12)"
            borderColor="rgba(0, 242, 254, 0.35)"
            className="p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  {getCategoryIcon(skillCategoriesData[selectedCategory].iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {skillCategoriesData[selectedCategory].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {skillCategoriesData[selectedCategory].description}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-cyan-400/80">
                {skillCategoriesData[selectedCategory].skills.length} Core Competencies
              </span>
            </div>

            {/* Skills Progress / Pills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {skillCategoriesData[selectedCategory].skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 transition-all hover:border-cyan-400/30 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm sm:text-base">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {skill.badge && (
                        <span className="rounded bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                          {skill.badge}
                        </span>
                      )}
                      {skill.experienceYears && (
                        <span className="text-[11px] font-mono text-slate-400">
                          {skill.experienceYears}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Capability Meter */}
                  <div className="relative h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: sIdx * 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
