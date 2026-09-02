/**
 * Showcase — the shell that mounts one full website variant at a time
 * and keeps the bottom toast switcher mounted across switches.
 */
import React, { Suspense, useEffect, useMemo } from 'react';
import { getSite, sites } from './registry';
import { useSiteRoute } from './shared/hooks';
import { default as VariantToast } from './VariantToast';

class SiteErrorBoundary extends React.Component<
  { children: React.ReactNode; siteName: string },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode; siteName: string }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0b0b10] p-8 text-slate-200">
          <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="mb-2 text-3xl">💥</div>
            <h1 className="text-lg font-semibold">"{this.props.siteName}" crashed</h1>
            <p className="mt-2 text-sm text-white/60">
              This concept hit a runtime error. Pick another site with the switcher below — or check the console for
              details.
            </p>
            <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-black/50 p-3 text-left font-mono text-[10px] text-rose-300">
              {this.state.error.message}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Loading: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0b10] text-slate-300">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
    <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">Loading {name}…</p>
  </div>
);

export const Showcase: React.FC = () => {
  const { siteId, select } = useSiteRoute(sites[0].id);
  const site = getSite(siteId) ?? sites[0];

  const SiteComponent = useMemo(() => React.lazy(site.load), [site.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [site.id]);

  return (
    <>
      <SiteErrorBoundary key={site.id} siteName={site.name}>
        <Suspense fallback={<Loading name={site.name} />}>
          <SiteComponent key={site.id} />
        </Suspense>
      </SiteErrorBoundary>
      <VariantToast current={site.id} onSelect={select} />
    </>
  );
};

export default Showcase;
