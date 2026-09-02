import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticlesBackground } from './components/reactbits/ParticlesBackground';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { BentoProjects } from './components/projects/BentoProjects';
import { SkillsSection } from './components/skills/SkillsSection';
import { EducationSection } from './components/education/EducationSection';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { DemoLab } from './demo/DemoLab';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [labOpen, setLabOpen] = useState(() => window.location.hash.startsWith('#/reactbits'));
  const [savedScrollY, setSavedScrollY] = useState(0);

  // Sync lab state with hash changes
  useEffect(() => {
    const sync = () => setLabOpen(window.location.hash.startsWith('#/reactbits'));
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openLab = useCallback(() => {
    setSavedScrollY(window.scrollY);
    window.location.hash = '#/reactbits';
  }, []);

  const closeLab = useCallback(() => {
    window.location.hash = '';
    // Restore scroll position on next frame
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollY);
    });
  }, [savedScrollY]);

  // Scroll spy to update active navigation tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'skills', 'education', 'terminal', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* React Bits Interactive Particle Field Background */}
      <ParticlesBackground
        particleCount={55}
        particleColor="rgba(0, 242, 254, 0.4)"
        lineColor="rgba(0, 242, 254, 0.09)"
        interactive={true}
      />

      {/* Floating Navigation Header & Hamburger */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Page Content Flow — hidden when lab is open */}
      {!labOpen && (
        <main className="relative z-10">
          <HeroSection onNavigate={handleNavigate} />
          <ExperienceSection />
          <BentoProjects />
          <SkillsSection />
          <EducationSection />
          <InteractiveTerminal />
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      {!labOpen && <Footer onNavigate={handleNavigate} />}

      {/* React Bits Lab Overlay */}
      <AnimatePresence>
        {labOpen && <DemoLab onExit={closeLab} />}
      </AnimatePresence>

      {/* Floating lab toggle button (always visible when lab is closed) */}
      {!labOpen && (
        <motion.button
          onClick={openLab}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-surface-100/80 px-4 py-2 text-xs font-medium text-cyan-400 shadow-lg backdrop-blur-xl transition hover:border-cyan-500/30 hover:bg-surface-50/80 hover:shadow-cyan-500/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-base">⚡</span>
          <span>React Bits Lab</span>
        </motion.button>
      )}
    </div>
  );
}

export default App;
