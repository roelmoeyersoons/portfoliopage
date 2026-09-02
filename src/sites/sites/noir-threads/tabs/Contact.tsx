/**
 * Noir Threads — Contact tab
 *
 * A big serif line, a SpecularButton mailto CTA, editorial link rows and a
 * monochrome LogoLoop of tech names as a divider strip.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { LogoLoop, SpecularButton } from '@/sites/shared/bits';

import { contact, profile, techMarquee } from '@/sites/shared/content';
import { EASE } from '../ui';

const stripUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

interface LinkRowDef {
  label: string;
  value: string;
  href?: string;
}

const LINK_ROWS: LinkRowDef[] = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'LinkedIn', value: stripUrl(contact.linkedinUrl), href: contact.linkedinUrl },
  { label: 'GitHub', value: stripUrl(contact.githubUrl), href: contact.githubUrl },
  { label: 'Location', value: contact.location },
];

const LinkRow: React.FC<{ row: LinkRowDef; index: number }> = ({ row, index }) => {
  const inner = (
    <div className="flex items-baseline justify-between gap-6 border-t border-[#262626] px-1 py-5 transition-colors duration-300 last:border-b hover:bg-white/[0.02] sm:px-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#525252]">
        {String(index + 1).padStart(2, '0')} · {row.label}
      </span>
      <span className="flex min-w-0 items-baseline gap-3">
        <span className="truncate font-serif text-lg text-[#fafafa] sm:text-xl">{row.value}</span>
        {row.href && (
          <ArrowUpRight
            size={14}
            className="shrink-0 self-center text-[#525252] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#3b82f6]"
          />
        )}
      </span>
    </div>
  );
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.06, duration: 0.5, ease: EASE }}
    >
      {row.href ? (
        <a
          href={row.href}
          target={row.href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noreferrer"
          className="group block"
        >
          {inner}
        </a>
      ) : (
        <div className="group">{inner}</div>
      )}
    </motion.li>
  );
};

const LOGO_ITEMS = techMarquee.map((t) => ({
  title: t,
  node: (
    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#525252] transition-colors hover:text-[#a3a3a3]">
      {t}
    </span>
  ),
}));

const Contact: React.FC = () => (
  <section className="relative mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-5 pb-28 pt-36 text-center">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#525252]"
    >
      <span className="text-[#3b82f6]">05</span>
      <span>Contact</span>
      <span className="h-px w-10 bg-[#262626]" />
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
      className="font-serif text-[clamp(2.6rem,7vw,4.8rem)] font-medium leading-[1.04] tracking-tight text-[#fafafa] [text-wrap:balance]"
    >
      Let's build something <em className="italic text-[#3b82f6]">precise</em>.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
      className="mt-6 max-w-xl text-sm leading-relaxed text-[#a3a3a3]"
    >
      {profile.tagline} My inbox is open for systems that need to hold up under pressure.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
      className="mt-10"
    >
      <SpecularButton
        onClick={() => (window.location.href = `mailto:${contact.email}`)}
        size="md"
        radius={999}
        baseColor="#1a1a1a"
        lineColor="#3b82f6"
        textColor="#fafafa"
        tint="#3b82f6"
        tintOpacity={0.12}
        shineSize={16}
        autoAnimate
        proximity={360}
      >
        <span className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.2em]">
          <Mail size={13} className="text-[#3b82f6]" />
          {contact.email}
        </span>
      </SpecularButton>
    </motion.div>

    {/* editorial link rows */}
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16 w-full max-w-2xl text-left"
    >
      {LINK_ROWS.map((row, i) => (
        <LinkRow key={row.label} row={row} index={i} />
      ))}
    </motion.ul>

    {/* monochrome tech divider strip */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.55 }}
      className="mt-16 w-full max-w-3xl border-y border-[#262626] py-4"
    >
      <LogoLoop
        logos={LOGO_ITEMS}
        speed={60}
        gap={40}
        logoHeight={14}
        pauseOnHover
        fadeOut
        fadeOutColor="#0a0a0a"
        ariaLabel="Technologies I work with"
      />
    </motion.div>
  </section>
);

export default Contact;