import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag, BookOpen, Star, ArrowLeft, Sparkles } from 'lucide-react';

// ─── Book Data ──────────────────────────────────────────────────────────────
const books = [
  {
    id: 1,
    title: 'Tino Dino Makes a Friend',
    series: 'Adventures of Tiny Dino',
    thumbnail: '/books/Tino_Dino_Makes_A_Friend.jpg',
    amazonUrl: 'https://www.amazon.in/Tino-Dino-Makes-Friend-Adventures-ebook/dp/B0GZNCKP9D',
    format: 'Kindle Edition',
    rating: 4.8,
    reviews: 12,
    ageRange: 'Ages 3–8',
    pages: '32 pages',
    description:
      'Join Tino Dino on a heartwarming adventure as he discovers the joy of friendship! In this delightful picture book, Tino is shy and unsure how to make friends — until a chance encounter changes everything. A gentle story that teaches children about kindness, courage, and the magic of saying "hello."',
    themes: ['Friendship', 'Courage', 'Kindness'],
    badge: 'New Release',
  },
  {
    id: 2,
    title: 'Tiny Dino Learns to Roar',
    series: 'Adventures of Tiny Dino',
    thumbnail: '/books/Tiny_Dino_Learns_To_Roar.jpg',
    amazonUrl: 'https://www.amazon.in/Tiny-Dino-Learns-Roar-Adventures-ebook/dp/B0H25X3CSX',
    format: 'Kindle Edition',
    rating: 4.9,
    reviews: 18,
    ageRange: 'Ages 3–8',
    pages: '30 pages',
    description:
      "Tiny Dino has the softest roar in the whole dinosaur world — and he's embarrassed about it! Follow along as Tiny Dino discovers that being different is actually a superpower. A charming tale about self-confidence, self-expression, and finding your own unique voice.",
    themes: ['Self-Confidence', 'Self-Expression', 'Uniqueness'],
    badge: 'Bestseller',
  },
  {
    id: 3,
    title: 'The Tiny Dino in a Big World',
    series: 'Adventures of Tiny Dino',
    thumbnail: '/books/The_Tiny_Dino_in_a_Big_World.jpg',
    amazonUrl: 'https://www.amazon.in/Tiny-Dino-Big-World-ebook/dp/B0GZ3734VB',
    format: 'Kindle Edition',
    rating: 4.7,
    reviews: 15,
    ageRange: 'Ages 3–8',
    pages: '34 pages',
    description:
      "The world feels enormous when you're tiny! Tiny Dino steps out of his cozy home and faces a great big world full of wonder, surprises, and a few scary moments. A beautifully illustrated story that encourages children to embrace curiosity and face new experiences with a brave heart.",
    themes: ['Curiosity', 'Bravery', 'Adventure'],
    badge: null,
  },
  {
    id: 4,
    title: 'Tiny Dino and the Lost Egg',
    series: 'Adventures of Tiny Dino',
    thumbnail: '/books/Tiny_Dino_and_the_Lost_Egg.jpg',
    amazonUrl: 'https://www.amazon.in/Tiny-Dino-Lost-Egg-Adventures-ebook/dp/B0HF388NJR',
    format: 'Kindle Edition',
    rating: 4.8,
    reviews: 10,
    ageRange: 'Ages 3–8',
    pages: '32 pages',
    description:
      "When Tiny Dino discovers a lonely egg far from home, he sets off on a mission to reunite it with its family. A tender story about empathy, perseverance, and doing the right thing even when it's hard. Children will be cheering for Tiny Dino every step of the way!",
    themes: ['Empathy', 'Perseverance', 'Helping Others'],
    badge: null,
  },
  {
    id: 5,
    title: 'Tiny Dino Cleans Up',
    series: 'Adventures of Tiny Dino',
    thumbnail: '/books/Tiny_Dino_Cleans_Up.jpg',
    amazonUrl: 'https://www.amazon.in/Tiny-Dino-Cleans-Up-Adventures-ebook/dp/B0HDNGRH2H',
    format: 'Kindle Edition',
    rating: 4.6,
    reviews: 9,
    ageRange: 'Ages 3–8',
    pages: '30 pages',
    description:
      "Tiny Dino's room is a mess — toys everywhere, crumbs on the floor, and not a single path to walk through! But with a little help and a positive attitude, tidying up becomes an adventure of its own. A fun and relatable story that makes responsibility feel like playtime.",
    themes: ['Responsibility', 'Tidiness', 'Positivity'],
    badge: null,
  },
  {
    id: 6,
    title: "Tiny Dino's Rainy Day",
    series: 'Adventures of Tiny Dino',
    thumbnail: "/books/Tiny_Dinos_Rainy_Day.jpg",
    amazonUrl: 'https://www.amazon.in/Tiny-Dinos-Rainy-Dino-Adventures-ebook/dp/B0HC6CK1JF',
    format: 'Kindle Edition',
    rating: 4.7,
    reviews: 11,
    ageRange: 'Ages 3–8',
    pages: '32 pages',
    description:
      "It's raining and Tiny Dino can't go outside to play. What starts as a day full of disappointment turns into the most creative, cozy, and magical indoor adventure yet! A warm reminder that some of the best days are the unexpected ones — and imagination is the greatest playground.",
    themes: ['Creativity', 'Imagination', 'Adaptability'],
    badge: null,
  },
  {
    id: 7,
    title: "Tiny Dino's First Day of School",
    series: 'Adventures of Tiny Dino',
    thumbnail: "/books/Tiny_Dino's_First_Day_of_School.jpg",
    amazonUrl: 'https://www.amazon.in/Tiny-Dinos-First-School-Adventures-ebook/dp/B0H75R1N4B',
    format: 'Kindle Edition',
    rating: 4.9,
    reviews: 22,
    ageRange: 'Ages 3–8',
    pages: '34 pages',
    description:
      "Big feelings, new faces, and a backpack that's almost as tall as he is — Tiny Dino's first day of school is a big deal! A reassuring and joyful story that helps children feel seen, understood, and excited about school. Perfect for sharing before the first day of class.",
    themes: ['School Readiness', 'Emotions', 'New Beginnings'],
    badge: 'Fan Favourite',
  },
];

// ─── StarRating Component ────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => (
  <div className="bk-star-row">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={14}
        className={s <= Math.round(rating) ? 'bk-star filled' : 'bk-star'}
      />
    ))}
    <span className="bk-rating-val">{rating}</span>
    <span className="bk-rating-cnt">({reviews} reviews)</span>
  </div>
);

// ─── BookCard Component ──────────────────────────────────────────────────────
const BookCard: React.FC<{ book: typeof books[0]; index: number }> = ({ book, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      className="bk-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label={`Book: ${book.title}`}
    >
      {/* Thumbnail Column */}
      <div className="bk-thumb-col">
        {book.badge && <span className="bk-badge">{book.badge}</span>}
        <div className="bk-thumb-wrap">
          <img
            src={book.thumbnail}
            alt={`Cover of ${book.title}`}
            className="bk-thumb-img"
            loading="lazy"
          />
          <div className="bk-thumb-shine" />
        </div>
        <span className="bk-series-label">
          <BookOpen size={11} /> {book.series}
        </span>
      </div>

      {/* Content Column */}
      <div className="bk-content-col">
        <div className="bk-meta-row">
          <span className="bk-age-tag">{book.ageRange}</span>
          <span className="bk-format-tag">{book.format}</span>
          <span className="bk-pages-tag">{book.pages}</span>
        </div>

        <h2 className="bk-title">{book.title}</h2>
        <p className="bk-author-line">
          by <strong>Nidhi T</strong>
        </p>

        <StarRating rating={book.rating} reviews={book.reviews} />

        <p className="bk-description">{book.description}</p>

        <div className="bk-themes">
          {book.themes.map((t) => (
            <span key={t} className="bk-theme-pill">
              {t}
            </span>
          ))}
        </div>

        <div className="bk-cta-row">
          <motion.a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bk-buy-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Buy ${book.title} on Amazon`}
            id={`buy-btn-${book.id}`}
          >
            <ShoppingBag size={16} />
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
            Preview on Kindle
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Books Page ──────────────────────────────────────────────────────────────
const BooksPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Books by Nidhi T | Tiny Dino Adventures';
  }, []);

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
            Sparking joy, curiosity & imagination in every young reader
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
              inspiration to readers of all ages. From engaging coloring books to thoughtful books
              for teens, each creation is designed to spark joy, encourage self-expression, and make
              everyday moments more meaningful. With many more ideas still to come, Nidhi hopes
              every book leaves readers feeling inspired, uplifted, and creatively empowered.
            </p>
            <div className="bk-author-stats">
              <div className="bk-stat">
                <span className="bk-stat-num">7</span>
                <span className="bk-stat-label">Books Published</span>
              </div>
              <div className="bk-stat-divider" />
              <div className="bk-stat">
                <span className="bk-stat-num">★ 4.8</span>
                <span className="bk-stat-label">Avg. Rating</span>
              </div>
              <div className="bk-stat-divider" />
              <div className="bk-stat">
                <span className="bk-stat-num">Ages 3–8</span>
                <span className="bk-stat-label">Target Readers</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Book List */}
      <main className="bk-list-wrap" id="books-list" aria-label="Books Collection">
        <div className="bk-list-inner">
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="bk-footer-strip">
        <p>
          All books available on{' '}
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
