import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FADE_LEFT, FADE_RIGHT } from '../../constants';
import { STATS } from '../../data';
import Container from '../Shared/Container';

// ─── Lightweight inline counter hook ─────────────────────────────────────────
function useAnimatedCounter(end: number, duration: number, active: boolean) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, end, duration]);

  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ stat: typeof STATS[0]; index: number }> = ({ stat, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useAnimatedCounter(stat.value, 2.5, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <p className="font-heading text-4xl font-semibold gradient-text">
        {count}{stat.suffix}
      </p>
      <p className="font-body text-xs sm:text-sm text-[#685F52] mt-1 font-medium">{stat.label}</p>
    </motion.div>
  );
};

// ─── About Section ────────────────────────────────────────────────────────────
const About: React.FC = () => {
  const [leftRef, leftInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [rightRef, rightInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="about"
      className="py-28 lg:py-36 bg-gradient-about relative overflow-hidden"
      aria-label="About Section"
    >
      {/* Decorative background glow */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(230,184,92,0.12), transparent)' }}
        aria-hidden="true"
      />

      {/* Top wave divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" className="w-full h-12" style={{ fill: '#FAF6EE' }}>
          <path d="M0,30 C480,0 960,60 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ─── Left: Image ─────────────────────────────────────── */}
          <motion.div
            ref={leftRef}
            variants={FADE_LEFT}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="lg:col-span-5 relative flex justify-center mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative z-10 w-full">
              {/* Main portrait */}
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden gradient-border shadow-xl">
                <img
                  src="/nidhi-profile.png"
                  alt="Nidhi T - Founder of Shakti Within"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201A15]/15 via-transparent to-transparent" />
              </div>

              {/* Floating experience badge */}
              <motion.div
                className="absolute -bottom-5 -right-3 sm:-right-5 glass-card rounded-2xl p-4 shadow-xl border border-[#C59B27]/30"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-heading text-3xl font-semibold gradient-text">6+</p>
                <p className="font-body text-xs text-[#685F52] mt-0.5">Years Experience</p>
              </motion.div>

              {/* Floating quote chip */}
              <motion.div
                className="absolute -top-5 -left-3 sm:-left-5 glass-card rounded-2xl p-4 max-w-[190px] shadow-xl border border-[#C59B27]/25"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <p className="font-heading text-xs sm:text-sm italic text-[#C59B27]">
                  "The light you seek is already within you."
                </p>
              </motion.div>
            </div>

            {/* Offset border decoration */}
            <div
              className="absolute top-6 left-6 w-full h-full rounded-[2.5rem] -z-10 border border-[#C59B27]/20"
              style={{ background: 'linear-gradient(135deg, rgba(197,155,39,0.06), rgba(230,184,92,0.06))' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* ─── Right: Content ───────────────────────────────────── */}
          <motion.div
            ref={rightRef}
            variants={FADE_RIGHT}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C59B27]" />
              <span className="font-body text-xs sm:text-sm font-semibold text-[#C59B27] tracking-widest uppercase">
                About Nidhi T
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-medium text-[#201A15] leading-tight mb-6">
              The Answers You Seek Are{' '}
              <span className="gradient-text italic">Already Within You</span>
            </h2>

            {/* Golden Blockquote */}
            <blockquote className="relative border-l-2 border-[#C59B27] pl-6 py-2 mb-8 bg-[#FAF6EE]/50 rounded-r-2xl">
              <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#C59B27] -translate-x-[5px]" />
              <p className="font-heading text-lg sm:text-xl italic text-[#201A15] leading-relaxed">
                "At Shakti Within, I believe the answers you seek already exist within you. Through tarot,
                numerology, and intuitive guidance, my intention is to help you gain clarity, reconnect
                with your inner wisdom, and move forward with confidence."
              </p>
              <footer className="mt-3 font-body text-sm text-[#C59B27] font-semibold">— Nidhi T</footer>
            </blockquote>

            {/* Mission / Vision / Values */}
            <div className="space-y-5">
              {[
                {
                  icon: '🌟',
                  title: 'My Mission',
                  text: 'To empower every individual with clarity, wisdom, and the courage to walk their highest path—one reading at a time.',
                },
                {
                  icon: '🔮',
                  title: 'My Vision',
                  text: "A world where every person trusts their inner wisdom and lives in alignment with their soul's deepest calling.",
                },
                {
                  icon: '✨',
                  title: 'Core Values',
                  text: 'Compassion · Integrity · Confidentiality · Empowerment · Love · Authenticity · Spiritual Growth',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4 group items-start"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#C59B27]/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-2xs">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#201A15] mb-1">{item.title}</h3>
                    <p className="font-body text-sm text-[#685F52] leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#EFE5D3]">
              {STATS.map((stat, i) => (
                <StatCard key={stat.id} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
