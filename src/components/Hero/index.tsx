import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { ChevronDown, Star, Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import { BRAND } from '../../constants';
import { useMouseParallax, useLatestBlog } from '../../hooks';
import StarBackground, { ConstellationBg } from '../Shared/StarBackground';
import Container from '../Shared/Container';
import { smoothScrollTo } from '../../utils';

// ─── Floating Tarot Card SVG ──────────────────────────────────────────────────
const TarotCard: React.FC<{ x: number; y: number; rotate: number; delay: number; index: number }> = ({
  x, y, rotate, delay, index,
}) => {
  const colors = [
    ['#C59B27', '#E6B85C'],
    ['#E6B85C', '#FAF6EE'],
    ['#D4AF37', '#9A7418'],
  ];
  const [c1, c2] = colors[index % 3];
  const symbols = ['☽', '✦', '♾', '☆', '✧'];

  return (
    <motion.div
      className="absolute glass-card rounded-2xl overflow-hidden shadow-md"
      style={{ left: `${x}%`, top: `${y}%`, width: 58, height: 90 }}
      animate={{
        y: [0, -10, 0],
        rotate: [rotate, rotate + 3, rotate],
      }}
      transition={{
        duration: 5 + index,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 0.9, scale: 1 }}
      viewport={{ once: true }}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center p-2"
        style={{ background: `linear-gradient(135deg, ${c1}15, ${c2}20)` }}
      >
        <div className="w-full h-1 rounded-full mb-2" style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }} />
        <p style={{ color: c1, fontSize: 20 }}>{symbols[index % symbols.length]}</p>
        <div className="w-8 h-px my-2" style={{ background: `${c1}40` }} />
        <div className="w-4 h-4 rounded-full" style={{ background: `linear-gradient(135deg, ${c1}30, ${c2}30)` }} />
        <div className="w-full h-1 rounded-full mt-2" style={{ background: `linear-gradient(90deg, ${c2}, ${c1})` }} />
      </div>
    </motion.div>
  );
};

// ─── Moon SVG ─────────────────────────────────────────────────────────────────
const MoonSVG: React.FC = () => (
  <svg width="300" height="300" viewBox="0 0 280 280" className="absolute top-[-35px] right-[-35px]" aria-hidden="true">
    <defs>
      <radialGradient id="moonGrad" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFDF9" />
        <stop offset="60%" stopColor="#FAF6EE" />
        <stop offset="100%" stopColor="#E6B85C" stopOpacity="0.35" />
      </radialGradient>
      <filter id="moonGlow">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="140" cy="140" r="130" fill="none" stroke="#E6B85C" strokeWidth="0.6" strokeOpacity="0.25" />
    <circle cx="140" cy="140" r="118" fill="none" stroke="#C59B27" strokeWidth="0.6" strokeOpacity="0.18" />
    <path
      d="M140 30 C90 30, 50 75, 50 140 C50 205, 90 250, 140 250 C100 240, 72 195, 72 140 C72 85, 100 42, 140 30Z"
      fill="url(#moonGrad)"
      filter="url(#moonGlow)"
    />
    <circle cx="100" cy="120" r="6" fill="#C59B27" fillOpacity="0.15" />
    <circle cx="115" cy="155" r="4" fill="#E6B85C" fillOpacity="0.18" />
    <circle cx="88" cy="160" r="3" fill="#C59B27" fillOpacity="0.12" />
    {[
      { x: 180, y: 60, s: 3 }, { x: 220, y: 100, s: 2 }, { x: 200, y: 150, s: 4 },
      { x: 230, y: 180, s: 2 }, { x: 170, y: 210, s: 3 }, { x: 60, y: 50, s: 2 },
    ].map((star, i) => (
      <g key={i}>
        <circle cx={star.x} cy={star.y} r={star.s / 2} fill="#C59B27" opacity="0.65" />
        <line x1={star.x - star.s} y1={star.y} x2={star.x + star.s} y2={star.y} stroke="#C59B27" strokeWidth="0.5" opacity="0.4" />
        <line x1={star.x} y1={star.y - star.s} x2={star.x} y2={star.y + star.s} stroke="#C59B27" strokeWidth="0.5" opacity="0.4" />
      </g>
    ))}
  </svg>
);

// ─── Golden Halo ──────────────────────────────────────────────────────────────
const GoldenHalo: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
    {[1, 2, 3].map((ring) => (
      <motion.div
        key={ring}
        className="absolute rounded-full border"
        style={{
          width: `${100 + ring * 36}%`,
          height: `${100 + ring * 36}%`,
          borderColor: ring === 1 ? 'rgba(197,155,39,0.3)' : ring === 2 ? 'rgba(230,184,92,0.18)' : 'rgba(212,175,55,0.1)',
          borderWidth: ring === 1 ? '1.5px' : '1px',
        }}
        animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 22 + ring * 8, repeat: Infinity, ease: 'linear' }}
      />
    ))}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C59B27]/12 via-transparent to-[#E6B85C]/12 blur-2xl" />
  </div>
);

// ─── Hero Section ─────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const mouse = useMouseParallax();
  const { post: latestPost, loading: blogLoading, error: blogError } = useLatestBlog();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  const tarotCards = [
    { x: 4, y: 28, rotate: -12, delay: 0.2, index: 0 },
    { x: 78, y: 10, rotate: 8, delay: 0.5, index: 1 },
    { x: 84, y: 62, rotate: 14, delay: 0.8, index: 2 },
    { x: 2, y: 65, rotate: -8, delay: 1.1, index: 3 },
    { x: 42, y: 84, rotate: 4, delay: 0.3, index: 4 },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] bg-gradient-hero flex flex-col justify-center overflow-hidden py-16 lg:py-24"
      aria-label="Hero Section"
    >
      {/* Background Elements */}
      <StarBackground count={60} />
      <ConstellationBg />

      {/* Aurora Blobs */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#C59B27]/8 via-[#E6B85C]/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FAF6EE] via-[#E6B85C]/8 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <motion.div style={{ y }} className="relative z-10 w-full">
        <Container className="pt-24 pb-12 lg:pt-32 lg:pb-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center justify-center">

            {/* ─── Left: Text Content ─────────────────────────────── */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-[#C59B27]/25 rounded-full px-4.5 py-2 mb-6 shadow-sm"
              >
                <Sparkles size={14} className="text-[#C59B27]" />
                <span className="font-body text-xs font-semibold text-[#201A15] tracking-wider uppercase">
                  Tarot • Numerology • Intuitive Guidance
                </span>
                <Star size={12} className="text-[#C59B27] fill-[#C59B27]" />
              </motion.div>

              {/* Brand Name */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mb-4"
              >
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#201A15] leading-[1.08] tracking-tight">
                  Shakti{' '}
                  <span className="italic gradient-text">Within</span>
                </h1>
                <p className="font-body text-xs sm:text-sm text-[#C59B27] font-semibold tracking-[0.22em] uppercase mt-2">
                  by Nidhi T
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mb-6 flex flex-col items-center lg:items-start"
              >
                <p className="font-heading text-2xl sm:text-3xl text-[#C59B27] italic font-light tracking-wide">
                  Reconnect. Realign. Rise.
                </p>
                <div className="mt-2.5 h-px w-28 bg-gradient-to-r from-[#C59B27] to-transparent" />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="font-body text-[#685F52] text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
              >
                Discover clarity through Tarot, Numerology, and intuitive guidance designed to help you navigate life's questions with{' '}
                <span className="text-[#C59B27] font-semibold">confidence</span> and{' '}
                <span className="text-[#C59B27] font-semibold">self-awareness</span>.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center lg:justify-start"
              >
                <motion.a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  id="hero-book-btn"
                  aria-label="Book Your Consultation via WhatsApp"
                >
                  ✨ Book Your Consultation
                </motion.a>

                <motion.button
                  onClick={() => smoothScrollTo('#services')}
                  className="btn-outline cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  id="hero-services-btn"
                  aria-label="Explore Services"
                >
                  Explore Services →
                </motion.button>
              </motion.div>

              {/* Premium WorthyOfYou Link — powered by WP REST API */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="pt-2 flex flex-col items-center lg:items-start"
              >
                {/* Description: skeleton while loading, hidden on error, post excerpt when ready */}
                {blogLoading && (
                  <div className="h-4 w-72 rounded-full bg-[#685F52]/20 animate-pulse mb-3" />
                )}
                {!blogLoading && !blogError && latestPost && (
                  <p className="font-body text-xs sm:text-sm text-[#685F52] mb-3 font-medium">
                    {latestPost.title}
                  </p>
                )}

                {/* <a
                  href={(!blogLoading && !blogError && latestPost?.link) ? latestPost.link : 'https://worthyofyou.in/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FFFDF9] to-[#FAF6EE] border border-[#C59B27]/40 px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(197,155,39,0.15)] hover:shadow-[0_8px_30px_rgba(197,155,39,0.25)] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C59B27]/0 via-[#C59B27]/10 to-[#C59B27]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] z-0" />
                  <Sparkles size={16} className="text-[#C59B27] relative z-10" />
                  <span className="font-heading text-sm sm:text-base font-semibold text-[#201A15] group-hover:text-[#C59B27] transition-colors relative z-10">
                    worthyofyou.in
                    {(!blogLoading && !blogError && latestPost?.link) ? 
                    <>
                      <BookOpen size={15} />
                      Read Full Blog
                      <ExternalLink size={13} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    </>
                     : 
                     <>
                      <Sparkles size={13} />
                      All Blogs →
                     </>
                    }
                  </span>
                  <span className="text-[#C59B27] group-hover:translate-x-1 transition-transform relative z-10">→</span>
                </a> */}

                <a
                  href={
                    !blogLoading && !blogError && latestPost?.link
                      ? latestPost.link
                      : "https://worthyofyou.in/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#FFFDF9] to-[#FAF6EE] border border-[#C59B27]/40 px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(197,155,39,0.15)] hover:shadow-[0_8px_30px_rgba(197,155,39,0.25)] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C59B27]/0 via-[#C59B27]/10 to-[#C59B27]/0 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-full group-hover:translate-x-full" />

                  {(!blogLoading && !blogError && latestPost) ? (
                    <>
                      <BookOpen
                        size={16}
                        className="text-[#C59B27] relative z-10 flex-shrink-0"
                      />

                      <span className="font-heading text-sm sm:text-base font-semibold text-[#201A15] group-hover:text-[#C59B27] transition-colors relative z-10">
                        Read Full Blog
                      </span>

                      <ExternalLink
                        size={14}
                        className="relative z-10 text-[#C59B27] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                    </>
                  ) : (
                    <>
                      <Sparkles
                        size={16}
                        className="text-[#C59B27] relative z-10 flex-shrink-0"
                      />

                      <span className="font-heading text-sm sm:text-base font-semibold text-[#201A15] group-hover:text-[#C59B27] transition-colors relative z-10">
                        Visit worthyofyou.in
                      </span>

                      <span className="relative z-10 text-[#C59B27] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </>
                  )}
                </a>
              </motion.div>
            </div>

            {/* ─── Right: Portrait + Celestial ───────────────────── */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px]">
                {/* Parallax Moon */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    x: mouse.x * -10,
                    y: mouse.y * -8,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                  <MoonSVG />
                </motion.div>

                {/* Glow ring */}
                <GoldenHalo />

                {/* Portrait Frame */}
                <motion.div
                  className="absolute inset-7 rounded-full overflow-hidden z-10 border-2 border-[#C59B27]/40 shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                  style={{
                    x: mouse.x * 5,
                    y: mouse.y * 5,
                    boxShadow: '0 25px 70px rgba(197,155,39,0.2), 0 0 0 3px rgba(230,184,92,0.3)',
                  }}
                >
                  <img
                    src="/nidhi-profile.jpeg"
                    alt="Nidhi T - Spiritual Guide & Tarot Reader at Shakti Within"
                    className="w-full object-cover top-0"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201A15]/20 via-transparent to-transparent" />
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{
                    x: mouse.x * 12,
                    y: mouse.y * 8,
                  }}
                >
                  {tarotCards.map((card) => (
                    <TarotCard key={card.index} {...card} />
                  ))}
                </motion.div>

                {/* Floating Name Chip */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 glass-card px-5 py-2 rounded-full flex items-center gap-2 shadow-lg border border-[#C59B27]/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  style={{ x: mouse.x * -4, y: mouse.y * -3 }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse" />
                  <span className="font-body text-xs sm:text-sm font-semibold text-[#201A15]">Nidhi T</span>
                  {/* <span className="font-body text-xs text-[#685F52]">• Spiritual Guide</span> */}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Interactive Scroll to Explore Button */}
          <motion.button
            onClick={() => smoothScrollTo('#services')}
            className="flex flex-col items-center gap-1.5 mt-14 mb-2 mx-auto cursor-pointer group focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            aria-label="Scroll to Services section"
          >
            <span className="font-body text-[11px] text-[#685F52] group-hover:text-[#C59B27] tracking-widest uppercase transition-colors font-medium">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={18} className="text-[#C59B27] group-hover:scale-125 transition-transform" />
            </motion.div>
          </motion.button>
        </Container>
      </motion.div>
    </section>
  );
};

export default Hero;
