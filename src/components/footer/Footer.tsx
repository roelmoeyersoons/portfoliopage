import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#07080c] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs">
              RM
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                Roel Moeyersoons
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Software & Systems Engineer • Ghent University M.Sc.
              </div>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-cyan-400 transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('experience')}
              className="hover:text-cyan-400 transition-colors"
            >
              Experiences & Table
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="hover:text-cyan-400 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('skills')}
              className="hover:text-cyan-400 transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => onNavigate('education')}
              className="hover:text-cyan-400 transition-colors"
            >
              Research
            </button>
            <button
              onClick={() => onNavigate('terminal')}
              className="hover:text-cyan-400 transition-colors font-mono"
            >
              CLI
            </button>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/roel-moeyersoons/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="https://github.com/roelmoeyersoons"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-purple-400 hover:text-purple-300 transition-all"
            >
              <Github className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Roel Moeyersoons. Built with React & React Bits components.
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Fully Static SPA • Zero Database Dependency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
