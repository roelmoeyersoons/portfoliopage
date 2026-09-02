/**
 * Shared hooks for the showcase sites.
 */
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'showcase.site';

/** Parse a location.hash into a site id, or null when the hash carries no site route. */
function parseHash(hash: string): string | null {
  const h = hash.replace(/^#\/?/, '');
  if (!h) return null; // empty hash → keep current (e.g. lab closed inside original site)
  if (h.startsWith('site/')) return h.slice('site/'.length) || null;
  if (h === 'original') return 'original';
  if (h.startsWith('reactbits')) return 'original'; // original site's lab route
  return null;
}

export interface SiteRoute {
  siteId: string;
  select: (id: string) => void;
}

export function useSiteRoute(defaultId: string): SiteRoute {
  const [siteId, setSiteId] = useState<string>(() => {
    const fromHash = parseHash(window.location.hash);
    if (fromHash) return fromHash;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    } catch {
      /* ignore */
    }
    return defaultId;
  });

  useEffect(() => {
    const onHash = () => {
      const parsed = parseHash(window.location.hash);
      if (parsed) {
        setSiteId((cur) => (cur === parsed ? cur : parsed));
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const select = useCallback((id: string) => {
    setSiteId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    const target = `#/site/${id}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
  }, []);

  return { siteId, select };
}

/** Attach a keydown handler (auto-cleaned). */
export function useKeydown(handler: (e: KeyboardEvent) => void) {
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
