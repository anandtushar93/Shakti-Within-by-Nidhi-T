import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND } from '../../constants';
import Container from '../Shared/Container';

// ─── Moon SVG for CTA ─────────────────────────────────────────────────────────
const CTAMoon: React.FC = () => (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none" aria-hidden="true">
    <motion.svg
      width="420"
      height="420"
      viewBox="0 0 400 400"
      animate={{ rotate: 360 }}
      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="200" cy="200" r="190" fill="none" stroke="#E6B85C" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#E6B85C" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="110" fill="none" stroke="#E6B85C" strokeWidth="0.5" strokeDasharray="2 6" />
    </motion.svg>
  </div>
);

// ─── CTA Section ──────────────────────────────────────────────────────────────
const CTA: React.FC = () => {
  return (
    <section
      id="booking"
      className="py-28 lg:py-36 bg-gradient-cta relative overflow-hidden text-white"
      aria-label="Book Consultation CTA Section"
    >
      {/* Background elements */}
      <CTAMoon />
      <div className="absolute left-0 top-0 w-96 h-96 rounded-full bg-[#E6B85C]/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#C59B27]/15 blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Floating stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#E6B85C]/40 text-xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          aria-hidden="true"
        >
          {['✦', '✧', '⭐', '✨', '⋆', '★', '✦', '✧'][i]}
        </motion.div>
      ))}

      <Container className="max-w-4xl text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-[#E6B85C]/30 shadow-sm"
        >
          <span className="text-[#E6B85C] font-body text-xs sm:text-sm font-semibold tracking-widest uppercase">✨ Start Your Journey</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-tight mb-6"
        >
          Ready to Reconnect With Your{' '}
          <span className="italic" style={{ color: '#E6B85C' }}>
            Inner Light?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-body text-white/85 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Take the first step toward clarity, healing, and alignment. Book a personal consultation with Nidhi T and discover the wisdom that already lives within you.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2 text-base px-10 py-4 font-semibold shadow-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="cta-book-btn"
            aria-label="Book Your Consultation via WhatsApp"
          >
            ✨ Book Your Consultation
          </motion.a>

          <motion.a
            href={`tel:${BRAND.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-body font-semibold text-base px-10 py-4 rounded-full border border-white/30 transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="cta-call-btn"
            aria-label="Call Nidhi T"
          >
            📞 Call Now
          </motion.a>
        </motion.div>

        {/* ─── REDESIGNED SCHEDULE ONLINE SECTION ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="glass rounded-[2.5rem] p-8 sm:p-12 border border-[#E6B85C]/40 shadow-2xl bg-gradient-to-br from-white/15 via-white/10 to-[#E6B85C]/10 backdrop-blur-xl relative overflow-hidden text-left"
        >
          {/* Subtle glow border line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E6B85C] to-transparent" />

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 bg-[#E6B85C]/20 border border-[#E6B85C]/30 px-3.5 py-1.5 rounded-full mb-4">
                <Calendar size={16} className="text-[#E6B85C]" />
                <span className="font-body text-xs font-semibold text-[#E6B85C] tracking-wide uppercase">
                  Instant Slot Selection
                </span>
              </div>

              <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-3">
                Schedule Online
              </h3>

              <p className="font-body text-white/80 text-base leading-relaxed mb-6">
                Prefer to book a time slot directly? Choose a date and time that fits your personal schedule seamlessly.
              </p>

              <div className="space-y-2.5 mb-6">
                {[
                  'Instant confirmation & calendar invite',
                  'Flexible time slots across timezones',
                  '100% Private & Confidential 1-on-1 session',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-white/90 font-body">
                    <CheckCircle2 size={16} className="text-[#E6B85C] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href={BRAND.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold shadow-lg group cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id="calendly-btn"
              >
                Open Booking Calendar
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Right Mini Calendar Graphic Preview */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] bg-[#201A15]/80 backdrop-blur-md rounded-2xl p-5 border border-[#E6B85C]/30 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="font-heading text-lg font-semibold text-[#E6B85C] flex items-center gap-2">
                    <Clock size={16} /> Available Slots
                  </span>
                  <span className="font-body text-[11px] bg-[#E6B85C]/20 text-[#E6B85C] px-2 py-0.5 rounded-full font-semibold">
                    Live
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center font-body text-xs mb-3 text-white/50 font-medium">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center font-body text-xs text-white/80">
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    const isAvailable = [4, 8, 12, 15, 19, 22, 26].includes(day);
                    return (
                      <div
                        key={day}
                        className={`py-1.5 rounded-lg font-medium transition-all ${
                          isAvailable
                            ? 'bg-[#E6B85C] text-[#201A15] font-bold shadow-2xs cursor-pointer hover:scale-110'
                            : 'bg-white/5 text-white/40'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70 font-body">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E6B85C]" /> Slots Open Today
                  </span>
                  <span className="text-[#E6B85C] font-semibold">30 Min Sessions</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-8"
        >
          {[
            { icon: '🔒', text: '100% Confidential' },
            { icon: '💳', text: 'Easy Payment' },
            { icon: '🌐', text: 'Online Sessions Available' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-white/80">
              <span>{badge.icon}</span>
              <span className="font-body text-xs sm:text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default CTA;
