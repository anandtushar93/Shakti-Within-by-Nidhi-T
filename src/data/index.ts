// ─── Services Data ────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  glowColor: string;
}

export const SERVICES: Service[] = [
  {
    id: 'tarot',
    emoji: '🔮',
    title: 'Tarot Readings',
    description: 'Gain deep clarity and insight into your life\'s journey through intuitive tarot card readings tailored specifically for your unique situation.',
    color: 'from-violet-500/10 to-purple-500/5',
    glowColor: 'rgba(123, 77, 255, 0.15)',
  },
  {
    id: 'numerology',
    emoji: '🔢',
    title: 'Numerology Consultations',
    description: 'Unlock the sacred language of numbers to understand your life path, destiny, and the divine timing of events in your life.',
    color: 'from-pink-400/10 to-rose-400/5',
    glowColor: 'rgba(192, 132, 252, 0.15)',
  },
  {
    id: 'spiritual',
    emoji: '🌙',
    title: 'Spiritual Guidance',
    description: 'Receive compassionate, intuitive guidance to navigate life\'s challenges and align with your highest self and true purpose.',
    color: 'from-blue-400/10 to-indigo-400/5',
    glowColor: 'rgba(99, 102, 241, 0.15)',
  },
  {
    id: 'energy',
    emoji: '💫',
    title: 'Energy Healing',
    description: 'Restore balance, release blocked energy, and invite healing vibrations that support your emotional, mental, and spiritual wellbeing.',
    color: 'from-amber-400/10 to-yellow-300/5',
    glowColor: 'rgba(230, 184, 92, 0.15)',
  },
  {
    id: 'switchwords',
    emoji: '✨',
    title: 'Switchwords',
    description: 'Harness the power of ancient and modern switch words to shift your energy, attract abundance, and manifest your deepest desires.',
    color: 'from-teal-400/10 to-cyan-400/5',
    glowColor: 'rgba(20, 184, 166, 0.15)',
  },
  {
    id: 'switch-codes',
    emoji: '⭐',
    title: 'Switch Codes',
    description: 'Use specialized numerical codes that work directly with your subconscious mind to unlock transformation and accelerate your growth.',
    color: 'from-violet-400/10 to-fuchsia-400/5',
    glowColor: 'rgba(167, 139, 250, 0.15)',
  },
  {
    id: 'energy-circles',
    emoji: '🌸',
    title: 'Energy Circles',
    description: 'Sacred geometric energy circles created specifically for you to amplify intentions, protect your aura, and manifest your goals.',
    color: 'from-rose-400/10 to-pink-400/5',
    glowColor: 'rgba(251, 113, 133, 0.15)',
  },
  {
    id: 'counselling',
    emoji: '💬',
    title: 'Counselling',
    description: 'A safe, confidential space for heart-centered conversation and guidance to help you find clarity and move forward with confidence.',
    color: 'from-emerald-400/10 to-green-400/5',
    glowColor: 'rgba(52, 211, 153, 0.15)',
  },
  {
    id: 'remedies',
    emoji: '🌿',
    title: 'Remedies',
    description: 'Personalized spiritual remedies including crystals, mantras, rituals, and practices to harmonize your life and invite positive change.',
    color: 'from-orange-400/10 to-amber-400/5',
    glowColor: 'rgba(251, 146, 60, 0.15)',
  },
  {
    id: 'pendulum',
    emoji: '🔱',
    title: 'Pendulum Reading',
    description: 'Harness the subtle energy of a pendulum to receive clear yes/no answers and deeper intuitive guidance on life\'s most important questions.',
    color: 'from-cyan-400/10 to-sky-400/5',
    glowColor: 'rgba(34, 211, 238, 0.15)',
  },
  {
    id: 'oracle',
    emoji: '🌟',
    title: 'Oracle Reading',
    description: 'Connect with divine wisdom through sacred oracle cards, channeling uplifting messages and spiritual insights to illuminate your path forward.',
    color: 'from-yellow-400/10 to-orange-300/5',
    glowColor: 'rgba(251, 191, 36, 0.15)',
  },
];

// ─── Why Choose Me Data ───────────────────────────────────────────────────────
export interface WhyPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const WHY_POINTS: WhyPoint[] = [
  {
    id: 'personal',
    icon: '🫶',
    title: 'Personal Guidance',
    description: 'Every session is uniquely crafted for you—no cookie-cutter answers. Your journey is one of a kind.',
  },
  {
    id: 'confidential',
    icon: '🔒',
    title: 'Confidential Sessions',
    description: 'Your privacy is sacred. All consultations are 100% confidential, creating a safe space for you to be completely honest.',
  },
  {
    id: 'practical',
    icon: '💡',
    title: 'Practical Advice',
    description: 'Receive grounded, actionable insights that you can apply immediately in your everyday life for real transformation.',
  },
  {
    id: 'growth',
    icon: '🌱',
    title: 'Spiritual Growth',
    description: 'Every reading is designed to empower you to grow, evolve, and step into the highest version of yourself.',
  },
  {
    id: 'energy',
    icon: '✨',
    title: 'Positive Energy',
    description: 'Sessions are held in a space of love, light, and compassion—leaving you feeling uplifted, clear, and inspired.',
  },
  {
    id: 'trusted',
    icon: '🏆',
    title: 'Trusted by Clients',
    description: 'Hundreds of clients across India and globally have experienced profound clarity and transformation through Shakti Within.',
  },
];

// ─── Testimonials Data ────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  category: 'tarot' | 'numerology' | 'spiritual' | 'energy' | 'general';
  image?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Entrepreneur, Delhi',
    quote: 'Nidhi\'s tarot reading was incredibly accurate. She helped me make a major business decision with such clarity. I can\'t thank her enough!',
    rating: 5,
    category: 'tarot',
  },
  {
    id: '2',
    name: 'Ananya Gupta',
    role: 'Marketing Professional, Mumbai',
    quote: 'The numerology session completely changed my perspective on my career path. I now understand my life numbers and feel so aligned.',
    rating: 5,
    category: 'numerology',
  },
  {
    id: '3',
    name: 'Mehak Verma',
    role: 'Teacher, Pune',
    quote: 'Nidhi is a true healer. Her spiritual guidance has helped me overcome my anxiety and find peace I never thought possible.',
    rating: 5,
    category: 'spiritual',
  },
  {
    id: '4',
    name: 'Sonali Kapoor',
    role: 'Homemaker, Bangalore',
    quote: 'The energy circles Nidhi created for me have brought so much positivity to my home. My family has noticed the difference!',
    rating: 5,
    category: 'energy',
  },
  {
    id: '5',
    name: 'Deepa Nair',
    role: 'Doctor, Chennai',
    quote: 'I was skeptical at first, but Nidhi\'s readings were so precise it gave me chills. She truly has a gift. Highly recommend!',
    rating: 5,
    category: 'tarot',
  },
  {
    id: '6',
    name: 'Ritika Joshi',
    role: 'Software Engineer, Hyderabad',
    quote: 'The switchwords given by Nidhi have been life-changing. Within a month of using them, I got my dream job offer!',
    rating: 5,
    category: 'energy',
  },
];

// ─── Testimonial Screenshot Images ───────────────────────────────────────────
// Add your actual screenshot filenames here when you upload them to public/testimonials/
export const TESTIMONIAL_IMAGES: string[] = [
  // Add files like: '/testimonials/testimonial-1.jpg'
];

// ─── Testimonial Categories ───────────────────────────────────────────────────
export const TESTIMONIAL_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Tarot', value: 'tarot' },
  { label: 'Numerology', value: 'numerology' },
  { label: 'Spiritual', value: 'spiritual' },
  { label: 'Energy', value: 'energy' },
  { label: 'General', value: 'general' },
];

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How does a tarot reading work?',
    answer: 'A tarot reading involves drawing cards that reflect the energy and circumstances around your question. I use intuition combined with card symbolism to give you clear, meaningful insights tailored to your situation.',
  },
  {
    id: '2',
    question: 'Can consultations be done online?',
    answer: 'Yes! All consultations are available online via WhatsApp, Zoom, or Google Meet. Distance does not affect the quality or accuracy of a reading—energy transcends physical boundaries.',
  },
  {
    id: '3',
    question: 'How long is a consultation session?',
    answer: 'Sessions typically range from 30 to 60 minutes depending on the service chosen. You\'ll receive a booking confirmation with all details after scheduling.',
  },
  {
    id: '4',
    question: 'Is my information kept confidential?',
    answer: 'Absolutely. Your privacy is sacred to me. Everything shared in a session remains strictly confidential. I hold a space of trust, compassion, and complete discretion.',
  },
  {
    id: '5',
    question: 'How do I book a consultation?',
    answer: 'You can book through the booking button on this website, or reach out directly via WhatsApp at +91 9899 689 394. I\'ll confirm your appointment within 24 hours.',
  },
  {
    id: '6',
    question: 'What is Numerology and how can it help me?',
    answer: 'Numerology is the ancient study of numbers and their divine significance. By analyzing your birth date and name, I can reveal your life path, personality traits, strengths, challenges, and the best times to make major decisions.',
  },
  {
    id: '7',
    question: 'Do I need to believe in tarot for it to work?',
    answer: 'An open mind is all you need. You don\'t have to be a believer—many clients come in skeptical and leave amazed. All I ask is that you come with genuine questions and an open heart.',
  },
];

// ─── Stats / Counter Data ─────────────────────────────────────────────────────
export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { id: '1', value: 5, suffix: 'K', label: 'Happy Clients' },
  { id: '2', value: 6, suffix: '+', label: 'Years Experience' },
  // { id: '3', value: 1000, suffix: '+', label: 'Sessions Completed' },
  { id: '4', value: 100, suffix: '%', label: 'Trusted By Clients' },
];
