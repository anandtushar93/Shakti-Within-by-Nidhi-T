import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

// ─── BookModal Component ──────────────────────────────────────────────────────
const AMAZON_URL =
  'https://www.amazon.in/stores/Nidhi-T/author/B0GLM98ML5?ref=ap_rdr&shoppingPortalEnabled=true';

const BookModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Open after 3 s on every page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while open; close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleImageClick = () => {
    window.open(AMAZON_URL, '_blank', 'noopener,noreferrer');
  };

  // ── Animation Variants ─────────────────────────────────────────────────────
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
    exit:   { opacity: 0, transition: { duration: 0.3,  ease: 'easeIn'  as const } },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.78, y: 48, rotateX: 8 },
    visible: {
      opacity: 1, scale: 1, y: 0, rotateX: 0,
      transition: { type: 'spring' as const, stiffness: 240, damping: 24, delay: 0.08 },
    },
    exit: {
      opacity: 0, scale: 0.85, y: 28,
      transition: { duration: 0.26, ease: 'easeIn' as const },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { delay: 0.32, duration: 0.55, ease: 'easeOut' as const },
    },
  };

  const badgeVariants: Variants = {
    hidden:   { opacity: 0, x: 28 },
    visible:  { opacity: 1, x: 0, transition: { delay: 0.55, duration: 0.45, ease: 'easeOut' as const } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.42 + i * 0.1, duration: 0.4, ease: 'easeOut' as const },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────────────── */}
          <motion.div
            id="book-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Books for Brighter Tomorrows – Nidhi T"
            className="fixed inset-0 z-[9990] flex items-center justify-center"
            style={{
              padding: 'clamp(12px, 3vw, 32px)',
              background:
                'radial-gradient(ellipse at center, rgba(32,14,0,0.84) 0%, rgba(14,6,0,0.95) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
          >
            {/* Ambient gold glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(197,155,39,0.13) 0%, transparent 70%)',
              }}
            />

            {/* ── Modal Card ────────────────────────────────────────────────── */}
            {/*
              Responsive width strategy:
                mobile  (<640px)  → w-full, max-w-sm  → single-column
                tablet  (≥640px)  → max-w-xl          → single-column, bigger image
                laptop  (≥1024px) → max-w-3xl         → two-column (image | text)
                desktop (≥1280px) → max-w-4xl         → two-column, more breathing room
            */}
            <motion.div
              id="book-modal-card"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{ perspective: '1200px' }}
              className="relative w-full mx-auto
                         max-w-sm
                         sm:max-w-xl
                         lg:max-w-3xl
                         xl:max-w-6xl"
            >
              {/* Outer glow ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-3xl pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(197,155,39,0.55), rgba(230,184,92,0.22), rgba(197,155,39,0.55))',
                  filter: 'blur(1.5px)',
                }}
              />

              {/* Card body */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #2A1F0E 0%, #1C1208 45%, #2A1F0E 100%)',
                  border: '1px solid rgba(197,155,39,0.32)',
                  boxShadow:
                    '0 32px 90px rgba(0,0,0,0.75), 0 0 70px rgba(197,155,39,0.1), inset 0 1px 0 rgba(197,155,39,0.18)',
                }}
              >
                {/* ── Close Button ─────────────────────────────────────────── */}
                <button
                  id="book-modal-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 z-20 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#C59B27] cursor-pointer"
                  style={{
                    width: 'clamp(32px, 3vw, 44px)',
                    height: 'clamp(32px, 3vw, 44px)',
                    background: 'rgba(197,155,39,0.15)',
                    border: '1px solid rgba(197,155,39,0.3)',
                    color: '#E6B85C',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 'clamp(14px, 1.2vw, 20px)', height: 'clamp(14px, 1.2vw, 20px)' }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* ── Top Decorative Bar ───────────────────────────────────── */}
                <div
                  aria-hidden="true"
                  className="h-1 w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #C59B27 30%, #F5D08E 50%, #C59B27 70%, transparent)',
                  }}
                />

                {/*
                  ── Inner layout ─────────────────────────────────────────────
                  mobile / tablet  → flex-col  (stacked)
                  laptop / desktop → flex-row  (image left, content right)
                */}
                <div
                  className="flex flex-col lg:flex-row"
                  style={{ padding: 'clamp(20px, 3vw, 48px)' }}
                >

                  {/* ════════════════════════════════════════════════════════
                      LEFT PANEL — Book Image
                  ════════════════════════════════════════════════════════ */}
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative group cursor-pointer flex-shrink-0
                               flex justify-center
                               lg:mr-8 xl:mr-12
                               mb-6 lg:mb-0"
                    onClick={handleImageClick}
                    role="link"
                    aria-label="View Nidhi T's books on Amazon"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
                  >
                    {/* Image glow on hover */}
                    <div
                      aria-hidden="true"
                      className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(197,155,39,0.38) 0%, transparent 70%)',
                        filter: 'blur(10px)',
                      }}
                    />

                    {/* Book image wrapper */}
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        /*
                          Fluid image sizing:
                            mobile   → 240px wide
                            tablet   → 280px wide
                            laptop   → 320px wide
                            desktop  → 380px wide
                        */
                        width: 'clamp(220px, 38vw, 600px)',
                        boxShadow:
                          '0 20px 60px rgba(0,0,0,0.65), 0 4px 18px rgba(197,155,39,0.22)',
                        border: '2px solid rgba(197,155,39,0.28)',
                        transition:
                          'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = 'translateY(-8px) scale(1.025)';
                        el.style.boxShadow =
                          '0 36px 90px rgba(0,0,0,0.72), 0 8px 28px rgba(197,155,39,0.38)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = 'translateY(0) scale(1)';
                        el.style.boxShadow =
                          '0 20px 60px rgba(0,0,0,0.65), 0 4px 18px rgba(197,155,39,0.22)';
                      }}
                    >
                      <img
                        id="book-modal-image"
                        src="/Nidhi_T_Books_for_Brighter_Tomorrows.png"
                        alt="Nidhi T – Books for Brighter Tomorrows"
                        draggable={false}
                        loading="eager"
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'block',
                          objectFit: 'cover',
                        }}
                      />

                      {/* Shimmer on hover */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(110deg, transparent 38%, rgba(255,255,255,0.09) 50%, transparent 62%)',
                        }}
                      />
                    </div>

                    {/* "Shop on Amazon" badge */}
                    <motion.div
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute flex items-center gap-1.5 rounded-full"
                      style={{
                        bottom: 'clamp(-14px, -1.2vw, -16px)',
                        right: 'clamp(-10px, -0.8vw, -14px)',
                        padding: 'clamp(5px, 0.5vw, 8px) clamp(10px, 1vw, 16px)',
                        background: 'linear-gradient(135deg, #C59B27, #E6B85C)',
                        boxShadow: '0 4px 18px rgba(197,155,39,0.52)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(10px, 0.8vw, 13px)',
                        fontWeight: 700,
                        color: '#201A15',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ width: 'clamp(10px, 0.85vw, 14px)', height: 'clamp(10px, 0.85vw, 14px)' }}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      Shop on Amazon
                    </motion.div>
                  </motion.div>

                  {/* ════════════════════════════════════════════════════════
                      RIGHT PANEL — Text & CTA
                  ════════════════════════════════════════════════════════ */}
                  <div className="flex flex-col justify-center flex-1 min-w-0 items-center lg:items-start">

                    {/* Eyebrow label */}
                    <motion.div
                      custom={0}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 mb-3"
                    >
                      <span
                        style={{
                          color: '#C59B27',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(10px, 0.75vw, 13px)',
                          fontWeight: 700,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                        }}
                      >
                        ✦ Now Available on Amazon ✦
                      </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h2
                      custom={1}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: '#F5D08E',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        marginBottom: 'clamp(4px, 0.5vw, 8px)',
                        fontSize: 'clamp(22px, 2.8vw, 42px)',
                      }}
                    >
                      Books for Brighter Tomorrows
                    </motion.h2>

                    {/* Author */}
                    <motion.p
                      custom={2}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        color: 'rgba(230,184,92,0.7)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(12px, 1vw, 16px)',
                        marginBottom: 'clamp(16px, 2vw, 32px)',
                      }}
                    >
                      by <span style={{ color: '#E6B85C', fontWeight: 600 }}>Nidhi T</span>
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                      custom={2}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        height: '1px',
                        background:
                          'linear-gradient(90deg, rgba(197,155,39,0.4), rgba(197,155,39,0.08))',
                        marginBottom: 'clamp(14px, 1.8vw, 28px)',
                      }}
                    />

                    {/* Description (visible on laptop+) */}
                    <motion.p
                      custom={3}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="hidden lg:block"
                      style={{
                        color: 'rgba(230,184,92,0.6)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(13px, 1vw, 15px)',
                        lineHeight: 1.75,
                        marginBottom: 'clamp(20px, 2.2vw, 36px)',
                      }}
                    >
                      Explore a curated collection of transformative reads — books that inspire
                      clarity, inner strength, and purposeful living. Each title handpicked
                      to light up your tomorrow.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                      custom={4}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col items-center gap-3 "
                    >
                      <a
                        id="book-modal-amazon-btn"
                        href={AMAZON_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#C59B27]"
                        style={{
                          background: 'linear-gradient(135deg, #C59B27, #E6B85C)',
                          color: '#201A15',
                          fontFamily: 'var(--font-body)',
                          padding: 'clamp(10px, 0.9vw, 16px) clamp(20px, 2vw, 36px)',
                          fontSize: 'clamp(12px, 0.9vw, 15px)',
                          boxShadow: '0 6px 26px rgba(197,155,39,0.42)',
                          letterSpacing: '0.02em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 'clamp(14px, 1.1vw, 18px)', height: 'clamp(14px, 1.1vw, 18px)', flexShrink: 0 }}
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        View All Books on Amazon
                      </a>

                      <button
                        id="book-modal-dismiss-btn"
                        onClick={() => setIsOpen(false)}
                        className="transition-opacity duration-200 hover:opacity-80"
                        style={{
                          color: 'rgba(230,184,92,0.4)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(11px, 0.75vw, 13px)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Maybe later ✕
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* ── Bottom Decorative Bar ────────────────────────────────── */}
                <div
                  aria-hidden="true"
                  className="h-0.5 w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(197,155,39,0.4) 50%, transparent)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
