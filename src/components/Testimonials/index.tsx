import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Star } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIAL_CATEGORIES, type Testimonial } from '../../data';
import SectionHeader from '../Shared/SectionHeader';
import { useLockScroll } from '../../hooks';
import Container from '../Shared/Container';
import ClientScreenshotGallery from './ClientScreenshotGallery';

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-[#C59B27] fill-[#C59B27]' : 'text-[#EFE5D3]'}
      />
    ))}
  </div>
);

// ─── Testimonial Card (Text) ──────────────────────────────────────────────────
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number; onClick: (t: Testimonial) => void }> = ({
  testimonial,
  index,
  onClick,
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="masonry-item group glass-card rounded-3xl p-7 card-hover cursor-pointer border border-[#C59B27]/16 flex flex-col justify-between"
      onClick={() => onClick(testimonial)}
      role="button"
      tabIndex={0}
      aria-label={`Read testimonial from ${testimonial.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(testimonial)}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={testimonial.rating} />
          <span className="inline-flex items-center px-2.5 py-0.5 bg-[#FAF6EE] border border-[#C59B27]/20 rounded-full text-[10px] font-body font-semibold text-[#C59B27] capitalize">
            {testimonial.category}
          </span>
        </div>
        
        <p className="font-body text-sm text-[#383026] leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-[#EFE5D3] pt-4 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C59B27] to-[#E6B85C] flex items-center justify-center text-[#201A15] font-heading font-semibold text-base flex-shrink-0 shadow-2xs">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-heading text-base font-semibold text-[#201A15]">{testimonial.name}</p>
          <p className="font-body text-xs text-[#685F52]">{testimonial.role}</p>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox: React.FC<{
  item: Testimonial | string | null;
  onClose: () => void;
}> = ({ item, onClose }) => {
  useLockScroll(!!item);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Testimonial detail"
        >
          <motion.div
            className="relative max-w-lg w-full mx-4"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 glass rounded-full flex items-center justify-center text-[#201A15] hover:bg-white transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {typeof item === 'string' ? (
              <img
                src={item}
                alt="Client testimonial screenshot"
                className="w-full rounded-3xl max-h-[80vh] object-contain border border-[#C59B27]/30"
              />
            ) : (
              <div className="glass-card rounded-3xl p-8 border border-[#C59B27]/30 shadow-2xl">
                <div className="font-heading text-6xl text-[#C59B27]/20 leading-none mb-3" aria-hidden="true">"</div>
                <StarRating rating={item.rating} />
                <p className="font-heading text-xl italic text-[#201A15] leading-relaxed mt-4 mb-6">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-[#EFE5D3] pt-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C59B27] to-[#E6B85C] flex items-center justify-center text-[#201A15] font-heading font-semibold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-semibold text-[#201A15]">{item.name}</p>
                    <p className="font-body text-sm text-[#685F52]">{item.role}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Testimonials Section ─────────────────────────────────────────────────────
const Testimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<Testimonial | string | null>(null);

  const filtered = activeCategory === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === activeCategory);

  const handleTextClick = useCallback((t: Testimonial) => setLightboxItem(t), []);
  const handleClose = useCallback(() => setLightboxItem(null), []);

  return (
    <>
      <section
        id="testimonials"
        className="py-28 lg:py-36 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] relative overflow-hidden"
        aria-label="Testimonials Section"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#E6B85C]/6 blur-3xl pointer-events-none" aria-hidden="true" />

        <Container>
          <SectionHeader
            badge="Client Love"
            title="Words From My"
            highlight="Beautiful Clients"
            subtitle="Real experiences, real transformations — from people just like you."
          />

          {/* Category Filter */}
          {/* <div className="flex flex-wrap justify-center gap-3 mb-14" role="tablist" aria-label="Filter testimonials by category">
            {TESTIMONIAL_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                role="tab"
                aria-selected={activeCategory === cat.value}
                className={`font-body text-sm px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#C59B27] text-[#201A15] border-[#C59B27] font-semibold shadow-md'
                    : 'bg-white text-[#685F52] border-[#EFE5D3] hover:border-[#C59B27] hover:text-[#C59B27]'
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div> */}

          {/* Masonry Grid - Text Testimonials */}
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="masonry-grid"
            >
              {filtered.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  onClick={handleTextClick}
                />
              ))}
            </motion.div>
          </AnimatePresence> */}

          {/* Client Screenshot Gallery Slider (Swiper Slider) */}
          <div className="mt-0">
            {/* <div className="text-center mb-6">
              <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#201A15]">
                Verified Client <span className="gradient-text italic">Reviews & Chat Screenshots</span>
              </h3>
              <p className="font-body text-sm text-[#685F52] mt-2">
                Real feedback from real clients — Swipe to explore
              </p>
            </div> */}

            <ClientScreenshotGallery />
          </div>

          {/* Bottom CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mt-12"
          >
            <p className="font-body text-[#685F52] mb-5 text-sm">
              Join 500+ clients who have found clarity through Shakti Within
            </p>
            <motion.a
              href="https://wa.me/919899689394"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              id="testimonials-cta-btn"
            >
              ✨ Book Your Session Today
            </motion.a>
          </motion.div> */}
        </Container>
      </section>

      <Lightbox item={lightboxItem} onClose={handleClose} />
    </>
  );
};

export default Testimonials;
