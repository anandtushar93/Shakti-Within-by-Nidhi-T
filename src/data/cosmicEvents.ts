export type EventCategory = 'moon' | 'festival';

export interface CosmicEvent {
  id: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  day: number;
  month: number; // 0-indexed (0 = Jan, 6 = Jul, 7 = Aug …)
  year: number;
  category: EventCategory;
  badgeIcon: string;
  shortDescription: string;
}

export const CATEGORY_META: Record<EventCategory, { label: string; color: string; bg: string; border: string }> = {
  moon:    { label: 'Lunar Phase',    color: '#F5D08E', bg: 'rgba(245,208,142,0.18)', border: 'rgba(245,208,142,0.4)' },
  festival:{ label: 'Sacred Festival', color: '#E6B85C', bg: 'rgba(230,184,92,0.20)', border: 'rgba(230,184,92,0.45)' },
};

export const COSMIC_EVENTS: CosmicEvent[] = [

  // ── JULY 2026 (month index 6) ────────────────────────────────────────────────
  {
    id: 'jul-14-2026-nm',
    title: '🌑 New Moon (Amavasya)',
    date: '2026-07-14',
    day: 14, month: 6, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon — Amavasya. A powerful time for new beginnings, setting intentions, and ancestor prayers.',
  },
  {
    id: 'jul-15-2026-ekadashi',
    title: '🪔 Devshayani Ekadashi',
    date: '2026-07-15',
    day: 15, month: 6, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Devshayani Ekadashi — Beginning of the holy Chaturmas period. A powerful day for fasting, purification, and spiritual practice.',
  },
  {
    id: 'jul-29-2026-fm',
    title: '🌕 Full Moon — Guru Purnima',
    date: '2026-07-29',
    day: 29, month: 6, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Purnima) — Guru Purnima. Sacred day to honor spiritual teachers, mentors, and the inner Guru within.',
  },

  // ── AUGUST 2026 (month index 7) ──────────────────────────────────────────────
  {
    id: 'aug-12-2026-nm',
    title: '🌑 New Moon — Shravana Amavasya',
    date: '2026-08-12',
    day: 12, month: 7, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon — Shravana Amavasya. Sacred day for ancestor blessings, pitru tarpan, and releasing old karma.',
  },
  {
    id: 'aug-27-2026-fm',
    title: '🌕 Full Moon — Shravan Purnima',
    date: '2026-08-27',
    day: 27, month: 7, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Purnima) — Shravan Purnima. Auspicious lunar energy for devotion, blessings, and sacred rituals.',
  },
  {
    id: 'aug-28-2026-rakshabandhan',
    title: '🪢 Raksha Bandhan',
    date: '2026-08-28',
    day: 28, month: 7, year: 2026,
    category: 'festival',
    badgeIcon: '🪢',
    shortDescription: 'Raksha Bandhan — Sacred festival celebrating divine protection, unconditional love, and the bond of siblings.',
  },

  // ── SEPTEMBER 2026 (month index 8) ───────────────────────────────────────────
  {
    id: 'sep-04-2026-janmashtami',
    title: '🪶 Krishna Janmashtami',
    date: '2026-09-04',
    day: 4, month: 8, year: 2026,
    category: 'festival',
    badgeIcon: '🪶',
    shortDescription: 'Krishna Janmashtami — Celebrate the divine birth of Lord Krishna. A night of devotion, fasting, and joy.',
  },
  {
    id: 'sep-10-2026-nm',
    title: '🌑 New Moon (Amavasya)',
    date: '2026-09-10',
    day: 10, month: 8, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon — Amavasya. Ideal for new beginnings, deep meditation, and releasing what no longer serves you.',
  },
  {
    id: 'sep-14-2026-ganesh',
    title: '🐘 Ganesh Chaturthi',
    date: '2026-09-14',
    day: 14, month: 8, year: 2026,
    category: 'festival',
    badgeIcon: '🐘',
    shortDescription: 'Ganesh Chaturthi — Welcome Lord Ganesha, remover of all obstacles, with devotion, modaks, and prayers.',
  },
  {
    id: 'sep-26-2026-fm',
    title: '🌕 Full Moon — Bhadrapada Purnima',
    date: '2026-09-26',
    day: 26, month: 8, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Purnima) — Bhadrapada Purnima. A luminous night for gratitude, spiritual sadhana, and moonlight meditation.',
  },

  // ── OCTOBER 2026 (month index 9) ─────────────────────────────────────────────
  {
    id: 'oct-10-2026-nm',
    title: '🌑 New Moon (Amavasya)',
    date: '2026-10-10',
    day: 10, month: 9, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon — Amavasya. Plant seeds of intention, pray for ancestors, and reset your energy for a new cycle.',
  },
  {
    id: 'oct-11-2026-navratri',
    title: '🔱 Sharad Navratri Begins',
    date: '2026-10-11',
    day: 11, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🔱',
    shortDescription: 'Sharad Navratri Begins — 9 sacred nights of Goddess Durga, awakening Shakti, devotion, and divine feminine power.',
  },
  {
    id: 'oct-19-2026-navami',
    title: '🔥 Maha Navami',
    date: '2026-10-19',
    day: 19, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🔥',
    shortDescription: 'Maha Navami — The 9th and most powerful night of Navratri. A high-energy portal for Siddhi and divine protection.',
  },
  {
    id: 'oct-20-2026-dussehra',
    title: '🏹 Dussehra (Vijayadashami)',
    date: '2026-10-20',
    day: 20, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🏹',
    shortDescription: 'Dussehra — Vijayadashami. Victory of good over evil. The most auspicious day to begin new ventures and goals.',
  },
  {
    id: 'oct-25-2026-fm',
    title: '🌕 Full Moon — Ashwina Purnima',
    date: '2026-10-25',
    day: 25, month: 9, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Purnima) — Ashwina Purnima. Bathe in the gentle moonlight and offer gratitude for the harvest.',
  },
  {
    id: 'oct-29-2026-karwachauth',
    title: '🌙 Karwa Chauth',
    date: '2026-10-29',
    day: 29, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🌙',
    shortDescription: 'Karwa Chauth — Sacred fast observed for love, longevity, and marital bliss. Fast broken upon moonrise.',
  },

  // ── NOVEMBER 2026 (month index 10) ───────────────────────────────────────────
  {
    id: 'nov-06-2026-dhanteras',
    title: '🪙 Dhanteras',
    date: '2026-11-06',
    day: 6, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '🪙',
    shortDescription: 'Dhanteras — Day of wealth and health. Worship Lord Dhanvantari and Goddess Lakshmi for abundance and prosperity.',
  },
  {
    id: 'nov-08-2026-diwali',
    title: '🪔 Diwali (Lakshmi Puja)',
    date: '2026-11-08',
    day: 8, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Diwali — Festival of Lights. Welcome Goddess Lakshmi, light diyas, and celebrate the victory of light over darkness.',
  },
  {
    id: 'nov-09-2026-nm',
    title: '🌑 New Moon — Kartik Amavasya',
    date: '2026-11-09',
    day: 9, month: 10, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon — Kartik Amavasya (Diwali night). The darkest night becomes the most auspicious for Lakshmi Puja and new beginnings.',
  },
  {
    id: 'nov-24-2026-fm',
    title: '🌕 Full Moon — Kartik Purnima (Dev Deepawali)',
    date: '2026-11-24',
    day: 24, month: 10, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon — Kartik Purnima (Dev Deepawali). Diwali of the Gods. Light lamps on the river bank and seek liberation.',
  },
];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
