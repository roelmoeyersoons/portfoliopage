/**
 * useTabVeil — shared tab-swap transition for the concept sites.
 *
 * Deliberately simple: one fixed overlay whose opacity runs on a plain CSS
 * transition, plus two timeouts. No animation library, no exit animations,
 * no locks.
 *
 * Sequence on navigate(next):
 *   t=0     overlay fades in (400ms)
 *   t=440ms overlay is opaque → tab content swaps, scroll resets
 *   t=560ms overlay fades out (800ms) revealing the new tab
 *
 * The fade is compositor-driven, so it keeps running smoothly even while
 * React is busy mounting the next tab — rAF-driven (framer) animations
 * stall during that mount, which read as flicker.
 *
 * Clicks during a running cycle simply retarget the pending swap; the
 * reveal step re-checks and stays covered if the target moved.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { TabFocus, TabId, TabNavigate } from './content';

export type TabVeilFocus = { tab: TabId } & TabFocus;

export interface UseTabVeilOptions {
  /** Stage color the page fades through — use the concept's own bg tone. */
  color?: string;
}

export interface TabVeilApi {
  tab: TabId;
  /** Cross-tab focus payload, already nonce'd; gate it per tab in the site. */
  focus: TabVeilFocus | null;
  navigate: TabNavigate;
  /** Fixed overlay — render once inside the site root. */
  veil: ReactNode;
}

const DEFAULT_COLOR = '#0a0a12';
const FADE_IN_MS = 100;
const COVER_MS = 100; // swap moment — overlay transition is done by then
const HOLD_MS = 50; // extra dark beat after the swap
const FADE_OUT_MS = 200;

export function useTabVeil(options: UseTabVeilOptions = {}): TabVeilApi {
  const { color = DEFAULT_COLOR } = options;

  const [tab, setTab] = useState<TabId>('home');
  const [focus, setFocus] = useState<TabVeilFocus | null>(null);
  const [covered, setCovered] = useState(false);

  const tabRef = useRef(tab);
  const pendingRef = useRef<TabId | null>(null);
  const cyclingRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  const later = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  /** Swap content — only ever called while the overlay is opaque. */
  const swap = useCallback(() => {
    const target = pendingRef.current;
    if (target && target !== tabRef.current) {
      tabRef.current = target;
      setTab(target);
      window.scrollTo(0, 0); // reposition while covered — never visible
    }
  }, []);

  const navigate = useCallback<TabNavigate>(
    (next, focusId) => {
      // Focus handoff always registers, even for same-tab targets.
      if (focusId) setFocus({ tab: next, id: focusId, nonce: Date.now() });

      if (cyclingRef.current) {
        pendingRef.current = next; // dark or darkening: just retarget
        return;
      }
      if (next === tabRef.current) return;

      pendingRef.current = next;
      cyclingRef.current = true;
      setCovered(true);

      later(swap, COVER_MS);
      later(() => {
        if (pendingRef.current && pendingRef.current !== tabRef.current) {
          // Target moved while covered: swap now, stay dark, reveal after.
          swap();
          later(() => {
            setCovered(false);
            cyclingRef.current = false;
            pendingRef.current = null;
          }, HOLD_MS);
        } else {
          setCovered(false);
          cyclingRef.current = false;
          pendingRef.current = null;
        }
      }, COVER_MS + HOLD_MS);
    },
    [later, swap]
  );

  const veil: ReactNode = (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35]"
      style={{
        backgroundColor: color,
        opacity: covered ? 1 : 0,
        transition: covered
          ? `opacity ${FADE_IN_MS}ms cubic-bezier(0.4, 0, 1, 1)`
          : `opacity ${FADE_OUT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'opacity',
      }}
    />
  );

  return { tab, focus, navigate, veil };
}
