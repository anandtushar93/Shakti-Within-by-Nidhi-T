export type EventCategory = 'moon' | 'festival';

export interface CosmicEvent {
  id: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  day: number;
  month: number; // 0-indexed (0 = Jan … 11 = Dec)
  year: number;
  category: EventCategory;
  badgeIcon: string;
  shortDescription: string;
}

export const CATEGORY_META: Record<EventCategory, { label: string; color: string; bg: string; border: string }> = {
  moon:    { label: 'Lunar Phase',     color: '#F5D08E', bg: 'rgba(245,208,142,0.18)', border: 'rgba(245,208,142,0.4)' },
  festival:{ label: 'Sacred Festival', color: '#E6B85C', bg: 'rgba(230,184,92,0.20)',  border: 'rgba(230,184,92,0.45)' },
};

// ─────────────────────────────────────────────────────────────────────────────
// COSMIC EVENTS DATABASE
// Covers August 2026 – January 2027 (6 months from current date)
// Sorted chronologically. Multiple events on same date have unique IDs.
// Month indexes are JS-compatible: 0 = Jan … 11 = Dec
// ─────────────────────────────────────────────────────────────────────────────
export const COSMIC_EVENTS: CosmicEvent[] = [

  // ── AUGUST 2026 (month index 7) ──────────────────────────────────────────
  {
    id: 'aug-12-2026-nm',
    title: '🌑 New Moon — Amavasya',
    date: '2026-08-12',
    day: 12, month: 7, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon (Amavasya) — Sacred lunar phase for introspection, ancestor prayers (Pitru Tarpan), releasing old karma, and spiritual renewal.',
  },
  {
    id: 'aug-15-2026-independence-day',
    title: '🇮🇳 Independence Day',
    date: '2026-08-15',
    day: 15, month: 7, year: 2026,
    category: 'festival',
    badgeIcon: '🇮🇳',
    shortDescription: "India's 80th Independence Day — Celebrating freedom, unity, courage, and the timeless sacrifices of our freedom fighters.",
  },
  {
    id: 'aug-23-2026-ekadashi',
    title: '🪔 Putrada Ekadashi',
    date: '2026-08-23',
    day: 23, month: 7, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Putrada Ekadashi — Auspicious fast dedicated to Lord Vishnu. Ideal for seeking blessings of prosperity, progeny, and fulfilment of desires.',
  },
  {
    id: 'aug-26-2026-eid-e-milad',
    title: '🕌 Eid-e-Milad (Tentative)',
    date: '2026-08-26',
    day: 26, month: 7, year: 2026,
    category: 'festival',
    badgeIcon: '🕌',
    shortDescription: 'Eid-e-Milad-un-Nabi (Tentative) — Commemorating the birth of Prophet Muhammad with prayers, reflection, and acts of charity.',
  },
  {
    id: 'aug-28-2026-fm',
    title: '🌕 Full Moon — Shravan Purnima',
    date: '2026-08-28',
    day: 28, month: 7, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Shravan Purnima) — Powerful lunar energy for devotion, gratitude, meditation, and sacred rituals in the holy month of Shravan.',
  },
  {
    id: 'aug-28-2026-raksha-bandhan',
    title: '🪢 Raksha Bandhan',
    date: '2026-08-28',
    day: 28, month: 7, year: 2026,
    category: 'festival',
    badgeIcon: '🪢',
    shortDescription: 'Raksha Bandhan — Sacred festival celebrating love, protection, trust, and the eternal bond between siblings.',
  },

  // ── SEPTEMBER 2026 (month index 8) ───────────────────────────────────────
  {
    id: 'sep-04-2026-janmashtami',
    title: '🪶 Krishna Janmashtami',
    date: '2026-09-04',
    day: 4, month: 8, year: 2026,
    category: 'festival',
    badgeIcon: '🪶',
    shortDescription: "Krishna Janmashtami — Celebrate the divine birth of Lord Krishna. A sacred night of devotion, fasting, bhajans, and immense joy.",
  },
  {
    id: 'sep-09-2026-ekadashi',
    title: '🪔 Aja Ekadashi',
    date: '2026-09-09',
    day: 9, month: 8, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Aja Ekadashi — Fasting on this sacred day is believed to cleanse sins accumulated over many lifetimes and bestow moksha.',
  },
  {
    id: 'sep-10-2026-nm',
    title: '🌑 New Moon — Amavasya',
    date: '2026-09-10',
    day: 10, month: 8, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'New Moon — Amavasya. Ideal for new beginnings, deep meditation, ancestor prayers, and releasing what no longer serves you.',
  },
  {
    id: 'sep-14-2026-ganesh',
    title: '🐘 Ganesh Chaturthi',
    date: '2026-09-14',
    day: 14, month: 8, year: 2026,
    category: 'festival',
    badgeIcon: '🐘',
    shortDescription: 'Ganesh Chaturthi — Welcome Lord Ganesha, the remover of all obstacles, with devotion, modaks, and heartfelt prayers.',
  },
  {
    id: 'sep-24-2026-ekadashi',
    title: '🪔 Parivartini Ekadashi',
    date: '2026-09-24',
    day: 24, month: 8, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Parivartini Ekadashi — Lord Vishnu turns in his cosmic sleep. A very auspicious day for Vishnu worship, charity, and fasting.',
  },
  {
    id: 'sep-26-2026-fm',
    title: '🌕 Full Moon — Bhadrapada Purnima',
    date: '2026-09-26',
    day: 26, month: 8, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Bhadrapada Purnima) — A luminous night for gratitude, spiritual sadhana, and moonlight meditation.',
  },

  // ── OCTOBER 2026 (month index 9) ─────────────────────────────────────────
  {
    id: 'oct-02-2026-gandhi-jayanti',
    title: '🕊️ Gandhi Jayanti',
    date: '2026-10-02',
    day: 2, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🕊️',
    shortDescription: "Gandhi Jayanti — Mahatma Gandhi's birth anniversary. A national day to honor truth, non-violence, and the spirit of self-reliance.",
  },
  {
    id: 'oct-09-2026-ekadashi',
    title: '🪔 Indira Ekadashi',
    date: '2026-10-09',
    day: 9, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Indira Ekadashi — Falls during Pitru Paksha. Fasting on this day is believed to liberate ancestors and bring peace to departed souls.',
  },
  {
    id: 'oct-10-2026-nm',
    title: '🌑 New Moon — Mahalaya Amavasya',
    date: '2026-10-10',
    day: 10, month: 9, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'Mahalaya Amavasya — The most sacred Amavasya. End of Pitru Paksha; offer Tarpan and Shraddha to ancestors with love and gratitude.',
  },
  {
    id: 'oct-11-2026-navratri',
    title: '🔱 Sharad Navratri Begins',
    date: '2026-10-11',
    day: 11, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🔱',
    shortDescription: 'Sharad Navratri Begins — 9 sacred nights dedicated to Goddess Durga, awakening Shakti, devotion, and divine feminine power.',
  },
  {
    id: 'oct-19-2026-navami',
    title: '🔥 Maha Navami',
    date: '2026-10-19',
    day: 19, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🔥',
    shortDescription: 'Maha Navami — The 9th and most powerful night of Navratri. A high-energy portal for Siddhi and divine protection from Goddess Durga.',
  },
  {
    id: 'oct-20-2026-dussehra',
    title: '🏹 Dussehra (Vijayadashami)',
    date: '2026-10-20',
    day: 20, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🏹',
    shortDescription: 'Dussehra — Vijayadashami. Celebrates the victory of good over evil. The most auspicious day to begin new ventures, learning, and goals.',
  },
  {
    id: 'oct-23-2026-ekadashi',
    title: '🪔 Papankusha Ekadashi',
    date: '2026-10-23',
    day: 23, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Papankusha Ekadashi — Worshipping Lord Vishnu on this day destroys all sins and grants liberation. One of the most powerful Ekadashis.',
  },
  {
    id: 'oct-25-2026-fm',
    title: '🌕 Full Moon — Ashwina Purnima',
    date: '2026-10-25',
    day: 25, month: 9, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Full Moon (Ashwina Purnima) — Bathe in the gentle moonlight, offer gratitude for the harvest, and bask in abundant lunar energy.',
  },
  {
    id: 'oct-29-2026-karwachauth',
    title: '🌙 Karwa Chauth',
    date: '2026-10-29',
    day: 29, month: 9, year: 2026,
    category: 'festival',
    badgeIcon: '🌙',
    shortDescription: 'Karwa Chauth — Sacred fast observed by married women for love, longevity, and marital bliss. Fast is broken upon sighting the moon.',
  },

  // ── NOVEMBER 2026 (month index 10) ───────────────────────────────────────
  {
    id: 'nov-06-2026-dhanteras',
    title: '🪙 Dhanteras',
    date: '2026-11-06',
    day: 6, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '🪙',
    shortDescription: 'Dhanteras — Festival of wealth and health. Worship Lord Dhanvantari and Goddess Lakshmi for abundance, prosperity, and wellbeing.',
  },
  {
    id: 'nov-07-2026-ekadashi',
    title: '🪔 Rama Ekadashi',
    date: '2026-11-07',
    day: 7, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Rama Ekadashi — One of the most significant Ekadashis, falling just before Diwali. Observing it brings divine grace and removes obstacles.',
  },
  {
    id: 'nov-08-2026-diwali',
    title: '🪔 Diwali (Lakshmi Puja)',
    date: '2026-11-08',
    day: 8, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Diwali — The Festival of Lights! Welcome Goddess Lakshmi, light sacred diyas, and celebrate the eternal victory of light over darkness.',
  },
  {
    id: 'nov-09-2026-nm',
    title: '🌑 New Moon — Kartik Amavasya',
    date: '2026-11-09',
    day: 9, month: 10, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'Kartik Amavasya (Diwali Night) — The darkest night becomes the most auspicious for Lakshmi Puja, manifestation, and new beginnings.',
  },
  {
    id: 'nov-09-2026-govardhan',
    title: '⛰️ Govardhan Puja',
    date: '2026-11-09',
    day: 9, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '⛰️',
    shortDescription: 'Govardhan Puja — Celebrate Lord Krishna lifting Govardhan Hill. A day of gratitude to nature, cattle, and divine protection.',
  },
  {
    id: 'nov-10-2026-bhai-dooj',
    title: '💛 Bhai Dooj',
    date: '2026-11-10',
    day: 10, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '💛',
    shortDescription: 'Bhai Dooj — Sisters pray for the long life and wellbeing of their brothers. A joyful celebration of the sacred sibling bond.',
  },
  {
    id: 'nov-22-2026-ekadashi',
    title: '🪔 Dev Prabodhini Ekadashi',
    date: '2026-11-22',
    day: 22, month: 10, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Dev Prabodhini Ekadashi — Lord Vishnu awakens from his cosmic sleep. Marks the end of Chaturmas; ideal for sacred worship and charity.',
  },
  {
    id: 'nov-24-2026-fm',
    title: '🌕 Full Moon — Dev Deepawali (Kartik Purnima)',
    date: '2026-11-24',
    day: 24, month: 10, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Kartik Purnima — Dev Deepawali. The Diwali of the Gods. Light lamps on the riverbank, take a sacred dip, and seek liberation.',
  },

  // ── DECEMBER 2026 (month index 11) ───────────────────────────────────────
  {
    id: 'dec-07-2026-ekadashi',
    title: '🪔 Utpanna Ekadashi',
    date: '2026-12-07',
    day: 7, month: 11, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Utpanna Ekadashi — The origin day of Ekadashi Devi. One of the most powerful Ekadashis for spiritual merit and liberation.',
  },
  {
    id: 'dec-09-2026-nm',
    title: '🌑 New Moon — Margashirsha Amavasya',
    date: '2026-12-09',
    day: 9, month: 11, year: 2026,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'Margashirsha Amavasya — Powerful lunar phase for ancestor prayers, deep meditation, and releasing old karmic patterns.',
  },
  {
    id: 'dec-22-2026-ekadashi',
    title: '🪔 Mokshada Ekadashi',
    date: '2026-12-22',
    day: 22, month: 11, year: 2026,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Mokshada Ekadashi (Gita Jayanti) — The day the Bhagavad Gita was revealed by Lord Krishna. Observing this fast brings liberation.',
  },
  {
    id: 'dec-23-2026-fm',
    title: '🌕 Full Moon — Margashirsha Purnima',
    date: '2026-12-23',
    day: 23, month: 11, year: 2026,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Margashirsha Purnima — Auspicious full moon in the sacred month of Margashirsha. A day dear to Lord Vishnu and ideal for spiritual sadhana.',
  },

  // ── JANUARY 2027 (month index 0) ─────────────────────────────────────────
  {
    id: 'jan-07-2027-ekadashi',
    title: '🪔 Saphala Ekadashi',
    date: '2027-01-07',
    day: 7, month: 0, year: 2027,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Saphala Ekadashi — The "fruitful" Ekadashi. Fasting and prayer on this day grants success in all endeavors and divine blessings.',
  },
  {
    id: 'jan-08-2027-nm',
    title: '🌑 New Moon — Pausha Amavasya',
    date: '2027-01-08',
    day: 8, month: 0, year: 2027,
    category: 'moon',
    badgeIcon: '🌑',
    shortDescription: 'Pausha Amavasya — Sacred Amavasya in the month of Pausha. Offerings to ancestors during this time bring peace to lineage and great merit.',
  },
  {
    id: 'jan-14-2027-makar-sankranti',
    title: '☀️ Makar Sankranti',
    date: '2027-01-14',
    day: 14, month: 0, year: 2027,
    category: 'festival',
    badgeIcon: '☀️',
    shortDescription: 'Makar Sankranti — The Sun enters Capricorn marking the start of Uttarayan. A harvest festival celebrated with kite flying, til-gur, and charity.',
  },
  {
    id: 'jan-21-2027-ekadashi',
    title: '🪔 Putrada Ekadashi',
    date: '2027-01-21',
    day: 21, month: 0, year: 2027,
    category: 'festival',
    badgeIcon: '🪔',
    shortDescription: 'Pausha Putrada Ekadashi — Fasting and Vishnu worship on this day fulfils desires, blesses with progeny, and removes obstacles.',
  },
  {
    id: 'jan-22-2027-fm',
    title: '🌕 Full Moon — Pausha Purnima',
    date: '2027-01-22',
    day: 22, month: 0, year: 2027,
    category: 'moon',
    badgeIcon: '🌕',
    shortDescription: 'Pausha Purnima — A deeply auspicious full moon. Sacred bathing in holy rivers, charity, and meditation bring immense spiritual merit.',
  },
  {
    id: 'jan-26-2027-republic-day',
    title: '🇮🇳 Republic Day',
    date: '2027-01-26',
    day: 26, month: 0, year: 2027,
    category: 'festival',
    badgeIcon: '🇮🇳',
    shortDescription: "India's Republic Day — Celebrating the adoption of the Constitution. A reminder of our democratic values, unity, and national pride.",
  },
];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY: Generate 6 dynamic month tabs starting from the current month.
// Works automatically every year — no hardcoding needed.
// ─────────────────────────────────────────────────────────────────────────────
export interface MonthTab {
  year: number;
  month: number; // 0-indexed
  label: string; // e.g. "August 2026"
}

export function getAvailableMonths(count = 6): MonthTab[] {
  const today = new Date();
  const tabs: MonthTab[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    tabs.push({
      year: d.getFullYear(),
      month: d.getMonth(),
      label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return tabs;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY: Build a Map of date-string → CosmicEvent[] supporting multiple
// events on the same day (e.g. Full Moon + Raksha Bandhan on Aug 28).
// ─────────────────────────────────────────────────────────────────────────────
export function buildEventMap(events: CosmicEvent[]): Map<string, CosmicEvent[]> {
  const map = new Map<string, CosmicEvent[]>();
  for (const evt of events) {
    const existing = map.get(evt.date);
    if (existing) {
      existing.push(evt);
    } else {
      map.set(evt.date, [evt]);
    }
  }
  return map;
}
