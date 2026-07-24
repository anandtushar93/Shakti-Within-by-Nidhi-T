// ─── Brand Constants ─────────────────────────────────────────────────────────
export const BRAND = {
  name: 'Shakti Within',
  byLine: 'by Nidhi T',
  tagline: 'Reconnect. Realign. Rise.',
  description:
    "Discover clarity through Tarot, Numerology, and intuitive guidance designed to help you navigate life's questions with confidence and self-awareness.",
  phone: '9899689394',
  phoneFormatted: '+91 9899 689 394',
  whatsapp: 'https://wa.me/919899689394',
  instagram: 'https://www.instagram.com/worthyofyou',
  linkedin: 'https://www.linkedin.com/in/worthyofyou',
  calendly: 'https://calendly.com/shaktiwithin',
  email: 'nidhi@shaktiwithin.com',
  website: 'https://shaktiwithin.com',
};

// ─── Color Palette (Extracted directly from Gold & Cream Logo) ─────────────────
export const COLORS = {
  primary: '#C59B27',      // Rich Burnished Gold
  secondary: '#E6B85C',    // Warm Champagne Gold
  accentViolet: '#8A5CF5', // Royal Celestial Accent
  cream: '#FFFDF9',        // Pure Cream
  ivory: '#FAF6EE',        // Warm Parchment Ivory
  linen: '#F6F0E4',        // Soft Gold Linen
  text: '#201A15',         // Warm Deep Charcoal
  muted: '#685F52',        // Muted Bronze
  border: '#EFE5D3',       // Soft Warm Border
};

// ─── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why Me', href: '#why-choose-me' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
export const FADE_UP = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export const FADE_LEFT = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export const FADE_RIGHT = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};
