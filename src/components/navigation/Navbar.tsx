import React, { useState, useEffect } from 'react';
import { Menu, Terminal, Github, Linkedin } from 'lucide-react';
import { HamburgerMenu } from './HamburgerMenu';
import { DecryptedText } from '../reactbits/DecryptedText';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experiences' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Research' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 ${
              isScrolled
                ? 'border-white/10 bg-[#0c0e17]/85 shadow-xl shadow-black/40 backdrop-blur-xl'
                : 'border-white/5 bg-surface-100/40 backdrop-blur-md'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => onNavigate('hero')}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 border border-cyan-500/30 text-cyan-300 font-mono font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                <span className="relative z-10">RM</span>
                <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="block text-sm font-bold text-white tracking-tight">
                  <DecryptedText text="Roel Moeyersoons" speed={30} animateOn="hover" />
                </span>
                <span className="block text-[11px] font-mono text-cyan-400/80 -mt-0.5">
                  Systems & Software
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 shadow-inner">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 -z-10 shadow-sm" />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="flex items-center gap-2">
              {/* Terminal Quick Button */}
              <button
                onClick={() => onNavigate('terminal')}
                title="Launch Interactive Terminal"
                className="hidden lg:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-cyan-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>CLI</span>
              </button>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/roel-moeyersoons/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/roelmoeyersoons"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <Github className="h-4 w-4" />
              </a>

              {/* Hamburger Toggle */}
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Navigation Menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger Drawer */}
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
    </>
  );
};
