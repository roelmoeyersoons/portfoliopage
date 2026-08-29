import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, CheckCircle2, Lightbulb, Activity, ShieldCheck, Layers } from 'lucide-react';
import { ExperienceItem } from '../../types/portfolio';

interface ExperienceDeepDiveModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

export const ExperienceDeepDiveModal: React.FC<ExperienceDeepDiveModalProps> = ({
  experience,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (experience) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 flex flex-col max-h-[90vh] w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0e111a] shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="relative border-b border-white/10 bg-surface-100/70 p-6 sm:p-8 backdrop-blur-xl">
            <button
              onClick={onClose}
              aria-label="Close Deep Dive"
              className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-mono text-cyan-300">
                {experience.domain}
              </span>
              <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-1 text-xs font-mono text-purple-300">
                {experience.period}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {experience.location}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {experience.role}
            </h2>
            <p className="text-lg font-medium text-cyan-400 mt-1">
              {experience.company}
            </p>
          </div>

          {/* Body Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-thin">
            {/* Architectural Challenge */}
            {experience.deepDive && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Cpu className="h-5 w-5" />
                  <h3>Architectural Challenge</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {experience.deepDive.architecturalChallenge}
                </p>
              </div>
            )}

            {/* Engineered Solution */}
            {experience.deepDive && (
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                  <ShieldCheck className="h-5 w-5" />
                  <h3>Engineered Solution</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {experience.deepDive.solution}
                </p>
              </div>
            )}

            {/* Deep Breakdown Paragraphs */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-purple-400" />
                Comprehensive Experience Story
              </h3>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                {experience.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Key Deliverables & Bullets */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Key Deliverables & Responsibilities
              </h3>
              <ul className="space-y-2.5">
                {experience.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Learnings */}
            {experience.deepDive && experience.deepDive.keyLearnings.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  Engineering Lessons & Insights
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {experience.deepDive.keyLearnings.map((learning, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-300"
                    >
                      <span className="font-mono text-cyan-400 font-bold mr-2">0{idx + 1}.</span>
                      {learning}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Metrics Grid */}
            {experience.metrics && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  Verified Metrics & KPIs
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {experience.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-surface-100/60 p-4 text-center"
                    >
                      <div className="text-xl font-bold font-mono text-cyan-400">{m.value}</div>
                      <div className="text-xs text-slate-400 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h3 className="text-sm font-mono text-slate-400 uppercase mb-3">
                // System Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 bg-surface-100/80 p-4 sm:px-8 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Static Data Node: <span className="text-cyan-400">{experience.id}</span>
            </span>
            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-white/20"
            >
              Close Deep Dive
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
