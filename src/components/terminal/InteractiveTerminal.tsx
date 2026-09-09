import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, RotateCcw } from 'lucide-react';
import { profileData, experiencesData, projectsData, coreSkillsData, otherSkillsData, educationData } from '../../data/portfolioData';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            Roel Moeyersoons — Interactive Systems CLI (v1.0.0)
          </div>
          <div className="text-xs text-slate-400">
            Type <span className="text-cyan-300 font-bold">help</span> to list available commands, or explore <span className="text-purple-300 font-bold">experience</span>, <span className="text-emerald-300 font-bold">projects</span>, and <span className="text-amber-300 font-bold">table</span>.
          </div>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the latest output in view inside the terminal's own scroll box.
  // IMPORTANT: never scrollIntoView() here — it also scrolls every scrollable
  // ancestor (i.e. the whole page), jumping the site to the bottom on mount
  // and on every command. Setting scrollTop only scrolls the output box.
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-cyan-300 font-mono font-bold">about</span> - Summary of Roel's background</div>
              <div><span className="text-cyan-300 font-mono font-bold">experience</span> - List professional roles & timeline</div>
              <div><span className="text-cyan-300 font-mono font-bold">table</span> - Render ASCII Experience Matrix Table</div>
              <div><span className="text-cyan-300 font-mono font-bold">projects</span> - Showcase featured repositories & builds</div>
              <div><span className="text-cyan-300 font-mono font-bold">skills</span> - Breakdown of core technologies</div>
              <div><span className="text-cyan-300 font-mono font-bold">education</span> - Ghent University M.Sc. & Thesis</div>
              <div><span className="text-cyan-300 font-mono font-bold">contact</span> - Email and LinkedIn links</div>
              <div><span className="text-cyan-300 font-mono font-bold">clear</span> - Clear terminal session</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">{profileData.name} — {profileData.title}</div>
            <p>{profileData.bioParagraphs[0]}</p>
            <p className="text-slate-400">{profileData.bioParagraphs[1]}</p>
            <div className="text-slate-400">Location: {profileData.location}</div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">Career & Engineering Roles:</div>
            {experiencesData.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500/50 pl-3 space-y-1">
                <div className="font-bold text-white">
                  {exp.role} <span className="text-cyan-300 font-normal">@ {exp.company}</span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  {exp.period} • {exp.location} • {exp.domain}
                </div>
                <div className="text-slate-300">{exp.summary}</div>
                <div className="text-slate-500 text-[11px]">
                  Tech: {exp.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'table':
        output = (
          <div className="space-y-2 text-[11px] font-mono text-slate-300 overflow-x-auto">
            <div className="text-cyan-400 font-bold mb-1">EXPERIENCE MATRIX TABLE:</div>
            <pre className="text-slate-300 leading-tight">
{`+----------------+-----------------------------+--------------------------------+-------------------------------+
| TIMELINE       | COMPANY / CLIENT            | ROLE & SYSTEM SCOPE            | CORE TECH                     |
+----------------+-----------------------------+--------------------------------+-------------------------------+
| 2025 — Present | Baloise BE (Independent)    | IT Consultant (Azure / D365)   | Azure, Terraform, D365, C#    |
| 2023 — 2025    | REIMAGINE                   | AI/.NET Solution Architect     | GPT-4, .NET, TS, Python       |
| 2020 — 2023    | Net IT nv                   | D365 / Power Platform Consult. | D365, Power Platform, C#      |
| Jul — Aug 2020 | imec                        | IoT Network Engineer           | C++, Python, Docker, K8s      |
| 2016 — 2020    | Ghent University            | M.Sc. Informatics · Magna      | C/C++, UWB, Networking        |
+----------------+-----------------------------+--------------------------------+-------------------------------+`}
            </pre>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">Featured Projects:</div>
            {projectsData.map((proj) => (
              <div key={proj.id} className="border-l-2 border-purple-500/50 pl-3 space-y-0.5">
                <div className="font-bold text-white">
                  {proj.title} <span className="text-purple-400 text-[11px]">({proj.category})</span>
                </div>
                <div className="text-slate-300">{proj.description}</div>
                <div className="text-slate-500 text-[11px]">Tags: {proj.tags.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">Core skills:</div>
            {coreSkillsData.map((skill, idx) => (
              <div key={skill.id} className="space-y-1">
                <div className="font-semibold text-purple-300">
                  {String(idx + 1).padStart(2, '0')}. {skill.title}
                </div>
                <div className="pl-2 text-slate-400">{skill.tagline}</div>
              </div>
            ))}
            <div className="pt-2 text-cyan-400 font-bold">Also used along the way:</div>
            <div className="flex flex-wrap gap-1.5 pl-2">
              {otherSkillsData.map((s, sIdx) => (
                <span key={sIdx} className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-slate-200">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">{educationData.degree}</div>
            <div className="text-slate-400">{educationData.institution} ({educationData.period})</div>
            <div className="mt-2 text-white font-medium">Thesis: "{educationData.thesis.title}"</div>
            <div className="text-slate-300 text-[11px]">{educationData.thesis.abstract}</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Contact & Profiles:</div>
            <div>Email: <a href="mailto:contact@roelmoeyersoons.dev" className="text-cyan-300 underline">contact@roelmoeyersoons.dev</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/roel-moeyersoons/" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">linkedin.com/in/roel-moeyersoons/</a></div>
            <div>GitHub: <a href="https://github.com/roelmoeyersoons" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">github.com/roelmoeyersoons</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = (
          <div className="text-xs text-rose-400">
            Command not recognized: <span className="font-bold">{cmd}</span>. Type <span className="text-cyan-300 font-bold underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> to view commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-mono text-purple-300 mb-3">
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>Interactive CLI Environment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            <span>Terminal </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Sandbox
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Try typing <span className="text-cyan-300 font-mono">experience</span>, <span className="text-purple-300 font-mono">table</span>, <span className="text-emerald-300 font-mono">projects</span>, or <span className="text-amber-300 font-mono">help</span>.
          </p>
        </div>

        {/* Terminal Window */}
        <div
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className="cursor-text rounded-2xl border border-white/15 bg-[#090b12]/95 shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          {/* Top Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-slate-400">
                roel@landingpage: ~ (interactive-shell)
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setHistory([]);
              }}
              title="Clear Terminal"
              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          </div>

          {/* Terminal Output Area */}
          <div
            ref={outputRef}
            className="p-4 sm:p-6 font-mono text-xs space-y-4 max-h-96 overflow-y-auto scrollbar-thin"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-purple-400 font-bold">&gt;</span>
                  <span className="text-slate-400">roel-cli:</span>
                  <span className="font-semibold text-white">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Current Input Prompt */}
            <div className="flex items-center gap-2 text-cyan-400 pt-1">
              <span className="text-purple-400 font-bold">&gt;</span>
              <span className="text-slate-400 font-mono">roel-cli:</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. 'table', 'experience', 'help')..."
                className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
                autoComplete="off"
                spellCheck="false"
              />
              <CornerDownLeft className="h-3 w-3 text-slate-500 shrink-0" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
