import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Linkedin, Mail, Terminal, Sparkles, BookOpen, Layers, Briefcase } from 'lucide-react';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { id: 'hero', label: 'Overview', icon: Sparkles, desc: 'Intro & Core Specializations' },
    { id: 'experience', label: 'Experiences & Timeline', icon: Briefcase, desc: 'Interactive Roles, Table & Deep-Dives' },
    { id: 'projects', label: 'Featured Projects', icon: Layers, desc: 'OpenGL, Protocols, C# & CLI' },
    { id: 'skills', label: 'Skills & Tech Radar', icon: Terminal, desc: 'Languages, Systems & Web Architecture' },
    { id: 'education', label: 'Education & Research', icon: BookOpen, desc: 'UGent Master Thesis & UWB Ranging' },
    { id: 'terminal', label: 'Interactive Terminal', icon: Terminal, desc: 'Interactive CLI Sandbox Mode' },
    { id: 'contact', label: 'Get in Touch', icon: Mail, desc: 'Direct Connect & LinkedIn' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.3 } },
  };

  const menuVariants = {
    closed: { x: '100%', transition: { type: 'spring', damping: 30, stiffness: 300 } },
    open: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
  };

  const containerVariants = {
    open: {
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
    closed: {
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 40 },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-[#0c0e17]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 font-mono font-bold">
                  RM
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-wide">Roel Moeyersoons</h3>
                  <p className="text-xs text-cyan-400/80 font-mono">Systems & Software Engineer</p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation List */}
            <motion.nav
              className="flex-1 overflow-y-auto py-6 pr-2 scrollbar-none"
              variants={containerVariants}
              initial="closed"
              animate="open"
            >
              <p className="mb-3 text-xs font-mono tracking-wider text-slate-400 uppercase">
                // System Navigation
              </p>
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;

                  return (
                    <motion.button
                      key={link.id}
                      variants={itemVariants}
                      onClick={() => handleLinkClick(link.id)}
                      className={`group flex w-full items-center justify-between rounded-xl p-3.5 text-left transition-all ${
                        isActive
                          ? 'border border-cyan-500/40 bg-gradient-to-r from-cyan-500/15 to-purple-500/10 text-white shadow-lg shadow-cyan-500/5'
                          : 'border border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                            isActive
                              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                              : 'border-white/10 bg-white/5 text-slate-400 group-hover:border-cyan-400/30 group-hover:text-cyan-300'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-wide flex items-center gap-2">
                            <span>{link.label}</span>
                            {isActive && (
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-normal">{link.desc}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">
                        -&gt;
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>

            {/* Footer / Connect */}
            <div className="border-t border-white/10 pt-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400">// Connect</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Available for select roles & consulting
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.linkedin.com/in/roel-moeyersoons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-slate-200 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                >
                  <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>

                <a
                  href="https://github.com/roelmoeyersoons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-slate-200 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                >
                  <Github className="h-3.5 w-3.5 text-purple-400" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
