import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WHY_POINTS } from '../../data';
import SectionHeader from '../Shared/SectionHeader';
import { STAGGER_CONTAINER, FADE_UP } from '../../constants';
import Container from '../Shared/Container';

// ─── Why Card ─────────────────────────────────────────────────────────────────
const WhyCard: React.FC<{ point: typeof WHY_POINTS[0]; index: number }> = ({ point, index }) => {
  return (
    <motion.article
      variants={FADE_UP}
      className="group relative glass-card rounded-3xl p-8 card-hover text-center h-full flex flex-col justify-between border border-[#C59B27]/18"
      aria-label={point.title}
    >
      {/* Background overlay on hover */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C59B27]/5 to-[#E6B85C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Animated accent dot */}
      <motion.div
        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FAF6EE] border border-[#C59B27]/25 flex items-center justify-center shadow-2xs"
        whileHover={{ scale: 1.1 }}
      >
        <span className="font-body text-[11px] font-bold text-[#C59B27]">0{index + 1}</span>
      </motion.div>

      <div className="relative z-10 flex-1 flex flex-col justify-between pt-2">
        <div>
          {/* Icon */}
          <motion.div
            className="text-5xl mb-5 inline-block p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#C59B27]/20 shadow-2xs"
            whileHover={{ scale: 1.15, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            aria-hidden="true"
          >
            {point.icon}
          </motion.div>

          <h3 className="font-heading text-2xl font-semibold text-[#201A15] mb-3 group-hover:text-[#C59B27] transition-colors duration-300">
            {point.title}
          </h3>

          <div className="h-[2px] w-10 bg-gradient-to-r from-[#C59B27] to-[#E6B85C] mx-auto mb-4 group-hover:w-20 transition-all duration-500 rounded-full" />

          <p className="font-body text-sm text-[#685F52] leading-relaxed">
            {point.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Why Choose Me Section ────────────────────────────────────────────────────
const WhyChooseMe: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="why-choose-me"
      className="py-28 lg:py-36 bg-gradient-to-b from-[#FAF6EE] to-[#FFFDF9] relative overflow-hidden"
      aria-label="Why Choose Me Section"
    >
      {/* Sacred Geometry SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg width="600" height="600" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="280" fill="none" stroke="#C59B27" strokeWidth="1" />
          <circle cx="300" cy="300" r="200" fill="none" stroke="#C59B27" strokeWidth="1" />
          <circle cx="300" cy="300" r="120" fill="none" stroke="#C59B27" strokeWidth="1" />
          <polygon points="300,40 540,400 60,400" fill="none" stroke="#E6B85C" strokeWidth="1" />
          <polygon points="300,560 60,200 540,200" fill="none" stroke="#E6B85C" strokeWidth="1" />
          <circle cx="300" cy="300" r="40" fill="none" stroke="#C59B27" strokeWidth="1" />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-[#E6B85C]/6 blur-3xl pointer-events-none" aria-hidden="true" />

      <Container>
        <SectionHeader
          badge="Why Shakti Within"
          title="Why Choose"
          highlight="Me"
          subtitle="A sacred space of trust, compassion, and genuine guidance — because you deserve nothing less."
        />

        <motion.div
          ref={ref}
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {WHY_POINTS.map((point, index) => (
            <WhyCard key={point.id} point={point} index={index} />
          ))}
        </motion.div>

        {/* Bottom feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 glass-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C59B27]/25 shadow-lg"
        >
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#201A15] mb-2">
              Ready to Begin Your Journey?
            </h3>
            <p className="font-body text-sm text-[#685F52]">
              Your first step toward clarity is just one message away.
            </p>
          </div>
          <motion.a
            href="https://wa.me/919899689394"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-shrink-0 inline-flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="why-cta-btn"
          >
            ✨ Start Your Consultation
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyChooseMe;
