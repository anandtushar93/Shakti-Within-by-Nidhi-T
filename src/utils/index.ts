import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ─── Tailwind Class Merger ────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Smooth Scroll with Sticky Navbar Offset ──────────────────────────────────
export function smoothScrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) {
    const navbarHeight = 85;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

// ─── Format Phone ─────────────────────────────────────────────────────────────
export function formatPhone(phone: string): string {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// ─── Generate Stars ───────────────────────────────────────────────────────────
export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

// ─── Viewport Check ───────────────────────────────────────────────────────────
export function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
