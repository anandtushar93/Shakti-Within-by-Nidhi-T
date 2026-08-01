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

// ─── useLatestBlog ────────────────────────────────────────────────────────────
// Fetches the latest published post from worthyofyou.in via the official
// WordPress REST API (?_embed gives us featured image + category in one call).
// No RSS parsing, no CORS proxies, no hardcoded content — fully automatic.

export interface BlogPost {
  title: string;
  link: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

export interface BlogState {
  post: BlogPost | null;
  loading: boolean;
  error: boolean;
}

/** Strip HTML tags and collapse whitespace from a rendered HTML string. */
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent ?? '').replace(/\s+/g, ' ').trim();
}

/** Decode common WordPress HTML entities in title strings. */
function decodeEntities(str: string): string {
  return str
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8230;/g, '\u2026')
    .replace(/&nbsp;/g, ' ');
}

const WP_API_URL =
  'https://worthyofyou.in/wp-json/wp/v2/posts?_embed&per_page=1&status=publish';

export function useLatestBlog(): BlogState {
  const [state, setState] = useState<BlogState>({
    post: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchLatest = async () => {
      try {
        const res = await fetch(WP_API_URL, {
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const posts: any[] = await res.json();
        if (!posts?.length) throw new Error('No posts');

        const p = posts[0];

        // ── Title ────────────────────────────────────────────────────────────
        const title = decodeEntities(p.title?.rendered ?? '');

        // ── URL ──────────────────────────────────────────────────────────────
        const link: string = p.link ?? 'https://worthyofyou.in/';

        // ── Date ─────────────────────────────────────────────────────────────
        const date = p.date
          ? new Date(p.date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '';

        // ── Featured image ────────────────────────────────────────────────────
        // _embed includes wp:featuredmedia[0] which has source_url + sizes.
        // Prefer the large crop (1024px wide) for card quality; fall back to full.
        const mediaEmbed = p._embedded?.['wp:featuredmedia']?.[0];
        const image: string =
          mediaEmbed?.media_details?.sizes?.large?.source_url ??
          mediaEmbed?.source_url ??
          '';

        // ── Category ─────────────────────────────────────────────────────────
        // _embed includes wp:term[0] (categories array)
        const categoryName: string =
          p._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Blog';

        // ── Excerpt / Description ─────────────────────────────────────────────
        // Use the REST excerpt (rendered HTML), strip tags, clean WP injections.
        const rawExcerpt = stripHtml(p.excerpt?.rendered ?? '');
        const description = rawExcerpt
          .replace(/^Share List\s*/i, '')
          .replace(/The post\s.+?appeared first.+?$/s, '')
          .trim()
          .slice(0, 220);

        if (!cancelled) {
          setState({
            post: { title, link, date, category: categoryName, description, image },
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState({ post: null, loading: false, error: true });
        }
      }
    };

    fetchLatest();
    return () => { cancelled = true; };
  }, []);

  return state;
}

/**
 * Legacy alias kept so existing components that call useBlogPost() still compile
 * without changes. Returns only the BlogPost (null while loading / on error).
 *
 * @deprecated Prefer useLatestBlog() which also exposes loading + error state.
 */
export function useBlogPost(): BlogPost | null {
  const { post } = useLatestBlog();
  return post;
}
