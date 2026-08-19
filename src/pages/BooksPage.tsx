import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, BookOpen, Star, ArrowLeft, Sparkles, Tag } from 'lucide-react';

// ─── Book Data ──────────────────────────────────────────────────────────────
interface Book {
  id: number;
  title: string;
  series: string;
  thumbnail: string;
  amazonUrl: string;
  format: string;
  rating: number | string;
  reviews: number | string;
  ageRange: string;
  pages: string;
  description: string;
  themes: string[];
  badge: string | null;
  category: 'paperback' | 'tiny-dino';
}

const paperbacks: Book[] = [
  {
    id: 101,
    title: 'The Calm Within: A Relaxing Mandala Coloring Book with Affirmations for Mindfulness, Stress Relief, and Inner Peace',
    series: 'Paperbacks',
    thumbnail: '/books/The_Calm_Within.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GP8349F4',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'All Ages',
    pages: '77 pages',
    description:
      'Slow down. Breathe deeply. Reconnect with yourself. The Calm Within is a thoughtfully designed mandala coloring book created to help you find moments of peace, clarity, and balance in your everyday life. Each page combines a beautifully detailed mandala with a gentle affirmation, inviting you to relax your mind, quiet your thoughts, and color with intention.',
    themes: ['Mindfulness', 'Inner Peace', 'Wellness'],
    badge: 'New Release',
    category: 'paperback',
  },
  {
    id: 102,
    title: 'Magical Unicorn Coloring Book: Cute and Inspiring Unicorns with Positive Quotes to Believe in Magic',
    series: 'Paperbacks',
    thumbnail: '/books/Magical_Unicorn_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GLMFXBB4',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 3–10',
    pages: '51 pages',
    description:
      'Step into a world of magic, kindness, and creativity with this adorable unicorn coloring book for kids! This book is filled with cute unicorn illustrations and positive, confidence-boosting messages that encourage children to believe in themselves, dream big, and enjoy the magic of coloring.',
    themes: ['Creativity', 'Magic', 'Art'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 103,
    title: 'Birds Coloring Book',
    series: 'Paperbacks',
    thumbnail: '/books/Magical_Unicorn_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GLMFXBB4',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 4–10',
    pages: '',
    description:
      'Discover the vibrant world of birds through fun, detailed illustrations. A perfect coloring adventure for nature-loving kids.',
    themes: ['Nature', 'Birds', 'Art'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 104,
    title: 'Alphabet A–Z Coloring & Tracing Book',
    series: 'Paperbacks',
    thumbnail: '/books/Alphabet_A–Z_Coloring_Tracing_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GKWFY5SQ',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 2–6',
    pages: '56 pages',
    description:
      'Help your child learn the alphabet while having fun! Alphabet A–Z Coloring & Tracing Book is designed to support early learning through simple tracing and enjoyable coloring activities.',
    themes: ['Education', 'Alphabet', 'Tracing'],
    badge: 'Educational',
    category: 'paperback',
  },
  {
    id: 105,
    title: 'Wild Animals Coloring Book: Large Simple Designs for Relaxing and Creative Fun',
    series: 'Paperbacks',
    thumbnail: '/books/Wild_Animals_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GPF7B4FY',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 4–8',
    pages: '59 pages',
    description:
      'Wild Animals Coloring Book for Kids Ages 4–8 Let your little explorer go on a fun and creative jungle adventure! This exciting coloring book is filled with beautiful wild animals that children love — from lions and elephants to giraffes, pandas, kangaroos, and more. Each page is designed with large, clear outlines that make coloring easy and enjoyable for young artists.',
    themes: ['Wildlife', 'Animals', 'Adventure'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 106,
    title: 'Sea World Coloring Book',
    series: 'Paperbacks',
    thumbnail: '/books/Sea_World_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GV29TQCF',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 4–10',
    pages: '61 pages',
    description:
      'Dive into an exciting underwater adventure with this adorable Sea World Coloring Book for Kids! This fun and relaxing ocean-themed coloring book is filled with cute and easy-to-color sea animals that children will love. From playful dolphins and smiling whales to friendly sharks, turtles, jellyfish, crabs, seahorses, and many more, every page brings a new sea creature to life. Each illustration is printed on a single side with a blank page behind it to prevent bleed-through — perfect for crayons, markers, and colored pencils.',
    themes: ['Ocean', 'Sea Life', 'Exploration'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 107,
    title: 'Dragons Coloring Book: Fun Fantasy Dragons to Color',
    series: 'Paperbacks',
    thumbnail: '/books/Dragons_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GVQDR5P9',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 5–12',
    pages: '85 pages',
    description:
      'Enter a magical world of dragons! This fun and engaging coloring book is perfect for kids ages 4–8 who love fantasy, adventure, and creative play. Inside, children will discover 40 unique dragon illustrations designed to spark imagination and creativity. From fiery dragons to peaceful forest guardians, every page offers a new adventure!',
    themes: ['Fantasy', 'Dragons', 'Imagination'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 108,
    title: 'Daily Gratitude Journal',
    series: 'Paperbacks',
    thumbnail: '/books/Daily_Gratitude_Journal.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GWLT66FG',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'All Ages',
    pages: '187 pages',
    description:
      "Pause. Reflect. Appreciate. This beautifully designed 90-day gratitude journal is your simple daily space to slow down and reconnect with the positive moments in your life. With a clean and calming layout, this journal helps you build a consistent gratitude practice in just a few minutes each day. Whether you're starting your self-care journey or deepening your mindfulness routine, this journal makes it easy and meaningful.",
    themes: ['Gratitude', 'Journaling', 'Mindfulness'],
    badge: 'Bestseller',
    category: 'paperback',
  },
  {
    id: 109,
    title: 'Fun with Fruits Coloring Book',
    series: 'Paperbacks',
    thumbnail: '/books/Fun_with_Fruits_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GXYZ5VGZ',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 2–8',
    pages: '45 pages',
    description:
      'Make learning fun with this adorable fruit coloring book for kids! Fun with Fruits Coloring Book is specially designed for young children to enjoy coloring while learning about different fruits. With simple and easy-to-color pages, this book is perfect for toddlers and early learners. Each page features a large, clear fruit illustration with bold outlines—ideal for little hands to color with ease.',
    themes: ['Fruits', 'Fun', 'Learning'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 110,
    title: 'Transport Coloring Book',
    series: 'Paperbacks',
    thumbnail: '/books/My_Transport_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GZB9GH9R',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 3–7',
    pages: '69 pages',
    description:
      'A fun and engaging transport coloring book designed especially for kids ages 5–7. This book includes a wide variety of vehicles such as cars, trains, airplanes, ships, and more.',
    themes: ['Transport', 'Vehicles', 'Fun'],
    badge: null,
    category: 'paperback',
  },
  {
    id: 111,
    title: 'Animal Alphabet Coloring Book',
    series: 'Paperbacks',
    thumbnail: '/books/Animal_Alphabet_Coloring_Book.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0HD19DSVP',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'New',
    ageRange: 'Ages 2–6',
    pages: '57 pages',
    description:
      'Make learning the alphabet fun with adorable animals! This engaging Animal Alphabet Coloring Book helps little learners explore the alphabet from A to Z while practicing letter tracing and enjoying cute animal coloring pages. Perfect for preschoolers, kindergarteners, and early learners, each page introduces a new animal along with uppercase and lowercase letters to trace.',
    themes: ['Education', 'Animals', 'Alphabet'],
    badge: 'Educational',
    category: 'paperback',
  },
];

const tinyDinoBooks: Book[] = [
  {
    id: 1,
    title: 'The Tiny Dino in a Big World',
    series: 'Tiny Dino Adventure Series',
    thumbnail: '/books/The_Tiny_Dino_in_a_Big_World.jpg',
    amazonUrl: 'https://www.amazon.in/dp/B0GZ3734VB',
    format: 'Paperback',
    rating: 5.0,
    reviews: 4,
    ageRange: 'Ages 3–6',
    pages: '13 pages',
    description:
      'Meet Tiny Dino… a little dinosaur in a BIG world! This beautifully illustrated bedtime story helps little readers build confidence, resilience, and self-belief.',
    themes: ['Curiosity', 'Bravery', 'Adventure'],
    badge: null,
    category: 'tiny-dino',
  },
  {
    id: 2,
    title: 'Tiny Dino Makes a Friend',
    series: 'Tiny Dino Adventure Series',
    thumbnail: '/books/Tino_Dino_Makes_A_Friend.jpg',
    amazonUrl: 'https://www.amazon.in/dp/B0GZNCKP9D',
    format: 'Paperback',
    rating: 5.0,
    reviews: 1,
    ageRange: 'Ages 3–6',
    pages: '25 pages',
    description:
      'Tiny Dino feels lonely in his big world. With small steps, brave tries, and a kind heart, Tiny Dino discovers the magic of friendship.',
    themes: ['Friendship', 'Courage', 'Kindness'],
    badge: 'New Release',
    category: 'tiny-dino',
  },
  {
    id: 3,
    title: 'Tiny Dino Learns to Roar',
    series: 'Tiny Dino Adventure Series',
    thumbnail: '/books/Tiny_Dino_Learns_To_Roar.jpg',
    amazonUrl: 'https://www.amazon.in/dp/B0H25X3CSX',
    format: 'Paperback',
    rating: 5.0,
    reviews: 2,
    ageRange: 'Ages 3–6',
    pages: '22 pages',
    description:
      'Join Tiny Dino on a sweet and heartwarming adventure about courage, confidence, and believing in yourself.',
    themes: ['Self-Confidence', 'Self-Expression', 'Uniqueness'],
    badge: 'Bestseller',
    category: 'tiny-dino',
  },
  {
    id: 4,
    title: "Tiny Dino's First Day of School",
    series: 'Tiny Dino Adventure Series',
    thumbnail: "/books/Tiny_Dino's_First_Day_of_School.jpg",
    amazonUrl: 'https://www.amazon.in/dp/B0H75R1N4B',
    format: 'Paperback',
    rating: 5.0,
    reviews: 1,
    ageRange: 'Ages 2–6',
    pages: '25 pages',
    description:
      'Tiny Dino is going to school for the very first time! A sweet adventure helping little readers feel excited and confident about starting school.',
    themes: ['School Readiness', 'Emotions', 'New Beginnings'],
    badge: 'Fan Favourite',
    category: 'tiny-dino',
  },
  {
    id: 5,
    title: "Tiny Dino's Rainy Day",
    series: 'Tiny Dino Adventure Series',
    thumbnail: '/books/Tiny_Dinos_Rainy_Day.jpg',
    amazonUrl: 'https://www.amazon.in/dp/B0HC6CK1JF',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'NA',
    ageRange: 'Ages 2–6',
    pages: '20 pages',
    description:
      'Filled with adorable illustrations and simple sentences, this heartwarming story helps little readers see that even rainy days can become wonderful adventures.',
    themes: ['Creativity', 'Imagination', 'Adaptability'],
    badge: null,
    category: 'tiny-dino',
  },
  {
    id: 6,
    title: 'Tiny Dino Cleans Up',
    series: 'Tiny Dino Adventure Series',
    thumbnail: '/books/Tiny_Dino_Cleans_Up.jpg',
    amazonUrl: 'https://www.amazon.in/dp/B0HDNGRH2H',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'NA',
    ageRange: 'Ages 3–6',
    pages: '22 pages',
    description:
      'Tiny Dino loves to play! A sweet and simple story for little readers about helping at home and learning everyday habits and routines.',
    themes: ['Responsibility', 'Tidiness', 'Positivity'],
    badge: null,
    category: 'tiny-dino',
  },
  {
    id: 7,
    title: 'Tiny Dino and the Lost Egg',
    series: 'Tiny Dino Adventure Series',
    thumbnail: '/books/Tiny_Dino_and_the_Lost_Egg.jpg',
    amazonUrl: 'https://www.amazon.in/dp/B0HF388NJR',
    format: 'Paperback',
    rating: 5.0,
    reviews: 'NA',
    ageRange: 'Ages 3–6',
    pages: '24 pages',
    description:
      'Join Tiny Dino on a gentle adventure filled with friendship, kindness, and helping others. A sweet story for little dinosaur lovers.',
    themes: ['Empathy', 'Perseverance', 'Helping Others'],
    badge: null,
    category: 'tiny-dino',
  },
];

// ─── StarRating Component ────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number | string; reviews: number | string }> = ({ rating, reviews }) => (
  <div className="bk-star-row">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        className={s <= Math.round(Number(rating)) ? 'bk-star filled' : 'bk-star'}
      />
    ))}
    <span className="bk-rating-val">{rating}</span>
    {reviews !== 'NA' && reviews !== 'New' && (
      <span className="bk-rating-cnt">({reviews} reviews)</span>
    )}
    {(reviews === 'New') && (
      <span className="bk-rating-cnt bk-new-tag">New</span>
    )}
  </div>
);

// ─── BookCard Component ──────────────────────────────────────────────────────
const BookCard: React.FC<{ book: Book; index: number }> = ({ book, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [imgError, setImgError] = useState(false);

  const isDino = book.category === 'tiny-dino';

  return (
    <motion.article
      ref={ref}
      className="bk-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label={`Book: ${book.title}`}
    >
      {/* Thumbnail Column */}
      <div className={`bk-thumb-col ${isDino ? 'bk-thumb-col--dino' : 'bk-thumb-col--paper'}`}>
        {book.badge && <span className={`bk-badge ${isDino ? 'bk-badge--dino' : 'bk-badge--paper'}`}>{book.badge}</span>}
        <div className="bk-thumb-wrap">
          {imgError ? (
            <div className="bk-thumb-placeholder">
              <BookOpen size={40} />
              <span>{book.title}</span>
            </div>
          ) : (
            <img
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              className="bk-thumb-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
          <div className="bk-thumb-shine" />
        </div>
        <span className={`bk-series-label ${isDino ? 'bk-series-label--dino' : ''}`}>
          <BookOpen size={11} /> {book.series}
        </span>
      </div>

      {/* Content Column */}
      <div className="bk-content-col">
        <div className="bk-meta-row">
          <span className="bk-age-tag">{book.ageRange}</span>
          <span className={`bk-format-tag ${isDino ? 'bk-format-tag--dino' : ''}`}>
            <Tag size={10} /> {book.format}
          </span>
          {book.pages && <span className="bk-pages-tag">{book.pages}</span>}
        </div>

        <h2 className="bk-title">{book.title}</h2>
        <p className="bk-author-line">
          by <strong>Nidhi T</strong>
        </p>

        <StarRating rating={book.rating} reviews={book.reviews} />

        <p className="bk-description">{book.description}</p>

        <div className="bk-themes">
          {book.themes.map((t) => (
            <span key={t} className={`bk-theme-pill ${isDino ? 'bk-theme-pill--dino' : ''}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="bk-cta-row">
          <motion.a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`bk-buy-btn ${isDino ? 'bk-buy-btn--dino' : ''}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Buy ${book.title} on Amazon`}
            id={`buy-btn-${book.id}`}
          >
            <ShoppingBag size={15} />
            Buy on Amazon
          </motion.a>

          <motion.a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bk-preview-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Preview ${book.title} on Amazon`}
            id={`preview-btn-${book.id}`}
          >
            Preview
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Section Header Component ────────────────────────────────────────────────
const SectionHeader: React.FC<{
  emoji: string;
  title: string;
  subtitle: string;
  count: number;
  variant?: 'gold' | 'dino';
  delay?: number;
}> = ({ emoji, title, subtitle, count, variant = 'gold', delay = 0 }) => (
  <motion.div
    className={`bk-section-header bk-section-header--${variant}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay }}
  >
    <div className="bk-section-emoji">{emoji}</div>
    <div className="bk-section-title-wrap">
      <h2 className="bk-section-title">{title}</h2>
      <p className="bk-section-subtitle">{subtitle}</p>
    </div>
    <div className="bk-section-count">
      <span className="bk-section-count-num">{count}</span>
      <span className="bk-section-count-label">Books</span>
    </div>
  </motion.div>
);

// ─── Books Page ──────────────────────────────────────────────────────────────
const BooksPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Books by Nidhi T | Shakti Within';
  }, []);

  const totalBooks = paperbacks.length + tinyDinoBooks.length;

  return (
    <div className="bk-page">
      {/* Decorative Background */}
      <div className="bk-bg-orb bk-orb-1" aria-hidden="true" />
      <div className="bk-bg-orb bk-orb-2" aria-hidden="true" />
      <div className="bk-bg-orb bk-orb-3" aria-hidden="true" />

      {/* Back Navigation */}
      <div className="bk-nav-bar">
        <motion.a
          href="/"
          className="bk-back-btn"
          whileHover={{ x: -4 }}
          aria-label="Back to Home"
          id="back-to-home"
        >
          <ArrowLeft size={16} />
          Back to Home
        </motion.a>
        <div className="bk-nav-brand">
          <img
            src="/logo.png"
            alt="ShaktiWithin Logo"
            className="bk-nav-logo"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span>Shakti Within</span>
        </div>
      </div>

      {/* Banner */}
      <motion.div
        className="bk-banner-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bk-banner-inner">
          <img
            src="/Nidhi_T_Books_for_Brighter_Tomorrows.png"
            alt="Nidhi T — Books for Brighter Tomorrows"
            className="bk-banner-img"
          />
          <div className="bk-banner-overlay" />
          <div className="bk-banner-content">
            <Sparkles size={20} className="bk-sparkle" />
            <span>Books for Brighter Tomorrows</span>
            <Sparkles size={20} className="bk-sparkle" />
          </div>
        </div>
      </motion.div>

      {/* Page Header */}
      <motion.header
        className="bk-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bk-header-inner">
          <span className="bk-header-eyebrow">
            <span className="bk-gold-dot" />
            Author's Collection
            <span className="bk-gold-dot" />
          </span>
          <h1 className="bk-heading">
            Books by <em>Nidhi T</em>
          </h1>
          <p className="bk-subheading">
            Sparking joy, curiosity &amp; imagination in every reader
          </p>
          <div className="bk-divider">
            <span className="bk-divider-line" />
            <span className="bk-divider-icon">✦</span>
            <span className="bk-divider-line" />
          </div>
        </div>
      </motion.header>

      {/* Author Block */}
      <motion.section
        className="bk-author-block"
        aria-label="About the Author"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
      >
        <div className="bk-author-inner">
          <div className="bk-author-img-wrap">
            <img src="/nidhi-profile.jpeg" alt="Nidhi T — Author" className="bk-author-img" />
            <div className="bk-author-ring" />
          </div>
          <div className="bk-author-text">
            <span className="bk-author-eyebrow">About the Author</span>
            <h2 className="bk-author-name">Nidhi T</h2>
            <p className="bk-author-bio">
              Nidhi T is a passionate creator dedicated to bringing imagination, creativity, and
              inspiration to readers of all ages. From engaging coloring books to heartwarming
              children's stories, each creation is designed to spark joy, encourage self-expression,
              and make everyday moments more meaningful.
            </p>
            <div className="bk-author-stats">
              <div className="bk-stat">
                <span className="bk-stat-num">{totalBooks}</span>
                <span className="bk-stat-label">Books Published</span>
              </div>
              <div className="bk-stat-divider" />
              <div className="bk-stat">
                <span className="bk-stat-num">★ 5.0</span>
                <span className="bk-stat-label">Avg. Rating</span>
              </div>
              <div className="bk-stat-divider" />
              <div className="bk-stat">
                <span className="bk-stat-num">All Ages</span>
                <span className="bk-stat-label">Target Readers</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── PAPERBACKS SECTION ── */}
      <main className="bk-list-wrap" id="books-list" aria-label="Books Collection">
        <div className="bk-list-inner">

          <SectionHeader
            emoji="📚"
            title="Paperbacks"
            subtitle="Coloring books, journals & more — available on Amazon.com"
            count={paperbacks.length}
            variant="gold"
            delay={0}
          />

          {paperbacks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}

          {/* Spacer between sections */}
          <div className="bk-section-spacer" />

          <SectionHeader
            emoji="🦕"
            title="Tiny Dino Adventure Series"
            subtitle="A heartwarming series for little readers — available on Amazon.in"
            count={tinyDinoBooks.length}
            variant="dino"
            delay={0}
          />

          {tinyDinoBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}

        </div>
      </main>

      {/* Footer Strip */}
      <footer className="bk-footer-strip">
        <p>
          Available on{' '}
          <a
            href="https://www.amazon.com/s?i=stripbooks&rh=p_27%3ANidhi+T"
            target="_blank"
            rel="noopener noreferrer"
            className="bk-footer-link"
          >
            Amazon.com
          </a>{' '}
          &amp;{' '}
          <a
            href="https://www.amazon.in/s?i=digital-text&rh=p_27%3ANidhi+T"
            target="_blank"
            rel="noopener noreferrer"
            className="bk-footer-link"
          >
            Amazon India
          </a>{' '}
          · © {new Date().getFullYear()} Nidhi T · All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default BooksPage;
