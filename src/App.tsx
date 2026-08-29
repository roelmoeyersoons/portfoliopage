import { useState, useEffect } from 'react';
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

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

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

      {/* Main Page Content Flow */}
      <main className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />
        <ExperienceSection />
        <BentoProjects />
        <SkillsSection />
        <EducationSection />
        <InteractiveTerminal />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
