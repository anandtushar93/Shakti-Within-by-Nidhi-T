import { useState, useEffect } from 'react';
import { debounce } from '../utils';

// ─── useScrollProgress ────────────────────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// ─── useNavbarScroll ──────────────────────────────────────────────────────────
export function useNavbarScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}

// ─── useMouseParallax ─────────────────────────────────────────────────────────
export function useMouseParallax() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mousePos;
}

// ─── useMediaQuery ────────────────────────────────────────────────────────────
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ─── useReducedMotion ─────────────────────────────────────────────────────────
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

// ─── useLockScroll ────────────────────────────────────────────────────────────
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
}
