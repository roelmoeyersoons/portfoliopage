import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, Send, ExternalLink, MessageSquare } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
      subject || 'Collaboration / Engineering Inquiry'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-400 mb-3">
            <Mail className="h-3.5 w-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            <span>Let's </span>
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Build Together
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Interested in consulting, high-concurrency systems, low-level protocols, or full-stack software architecture? Let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left: Quick Connect & Links (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <SpotlightCard
              spotlightColor="rgba(0, 242, 254, 0.15)"
              borderColor="rgba(0, 242, 254, 0.35)"
              className="p-6"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Email Address</div>
                    <div className="font-semibold text-white text-sm">
                      {profileData.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {copied && (
                <div className="text-xs font-mono text-emerald-400 text-right">
                  ✓ Copied to clipboard!
                </div>
              )}
            </SpotlightCard>

            {/* LinkedIn Profile */}
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <SpotlightCard
                spotlightColor="rgba(0, 242, 254, 0.15)"
                borderColor="rgba(0, 242, 254, 0.35)"
                className="p-6 transition-all group-hover:border-cyan-400/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">LinkedIn Network</div>
                      <div className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        in/roel-moeyersoons
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </SpotlightCard>
            </a>

            {/* GitHub Profile */}
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <SpotlightCard
                spotlightColor="rgba(121, 40, 202, 0.15)"
                borderColor="rgba(121, 40, 202, 0.35)"
                className="p-6 transition-all group-hover:border-purple-400/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">GitHub Repositories</div>
                      <div className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors">
                        roelmoeyersoons
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </div>
              </SpotlightCard>
            </a>
          </div>

          {/* Right: Message Dispatcher (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(0, 242, 254, 0.12)"
              borderColor="rgba(0, 242, 254, 0.3)"
              className="p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 text-white font-bold mb-4">
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                <span>Send a Direct Message</span>
              </div>

              <form onSubmit={handleSendMail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Distributed systems consulting or engineering role"
                    className="w-full rounded-xl border border-white/10 bg-surface-100/60 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Roel, let's discuss an engineering project..."
                    className="w-full rounded-xl border border-white/10 bg-surface-100/60 p-4 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500 hover:scale-[1.01]"
                >
                  <Send className="h-4 w-4" />
                  <span>Launch Message via Email Client</span>
                </button>

                <p className="text-center text-[11px] font-mono text-slate-400">
                  ⚡ 100% Static & Client-Side: Opens directly in your default mail composer.
                </p>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
