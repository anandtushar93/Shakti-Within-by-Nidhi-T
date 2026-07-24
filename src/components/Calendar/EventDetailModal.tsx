import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Sparkles, Compass, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import type { CosmicEvent } from '../../data/cosmicEvents';
import { CATEGORY_META } from '../../data/cosmicEvents';

interface EventDetailModalProps {
  event: CosmicEvent | null;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const catMeta = CATEGORY_META[event.category] || CATEGORY_META.spiritual;

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const whatsappLink = `https://wa.me/919899689394?text=${encodeURIComponent(
    `Hi Nidhi! I saw the event "${event.title}" (${formattedDate}) on your Cosmic Calendar and would love to book a personalized guidance reading.`
  )}`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-[#0D0A07]/90 backdrop-blur-2xl overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Event details for ${event.title}`}
      >
        <motion.div
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C1610] via-[#241D15] to-[#17120C] rounded-3xl border border-[#C59B27]/40 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(197,155,39,0.2)] overflow-hidden mt-24 sm:mt-20 text-white"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="relative p-4 sm:p-8 bg-gradient-to-br from-[#120E0A] via-[#2A2016] to-[#4A3719] text-white border-b border-[#C59B27]/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#E6B85C]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Category Pill & Close Button */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide border shadow-sm"
                style={{
                  color: catMeta.color,
                  backgroundColor: catMeta.bg,
                  borderColor: catMeta.border,
                }}
              >
                <span>{event.badgeIcon}</span>
                <span>{catMeta.label}</span>
              </span>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C59B27] hover:text-[#17120C] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Date */}
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2 leading-tight relative z-10">
              {event.title}
            </h3>

            <div className="flex items-center gap-2 font-body text-xs sm:text-sm text-[#E6B85C] font-medium relative z-10">
              <CalendarIcon size={16} />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
            {/* Overview / Description */}
            <div className="bg-white/5 rounded-2xl p-5 border border-[#C59B27]/30 backdrop-blur-md">
              <p className="font-body text-sm sm:text-base text-white/90 leading-relaxed italic">
                "{event.shortDescription}"
              </p>
            </div>

            {/* Dual Grid: Spiritual & Astrology Significance */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#E6B85C] font-body text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles size={16} />
                  <span>Spiritual Importance</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed">
                  {event.spiritualImportance}
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#B388FF] font-body text-xs font-semibold uppercase tracking-wider mb-2">
                  <Compass size={16} />
                  <span>Astrology Significance</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed">
                  {event.astrologySignificance}
                </p>
              </div>
            </div>

            {/* Suggested Activities */}
            {event.suggestedActivities && event.suggestedActivities.length > 0 && (
              <div>
                <h4 className="font-heading text-lg font-semibold text-[#E6B85C] mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#E6B85C]" />
                  <span>Suggested Spiritual Practices</span>
                </h4>
                <div className="grid sm:grid-cols-3 gap-2.5">
                  {event.suggestedActivities.map((act, idx) => (
                    <div
                      key={idx}
                      className="bg-white/8 border border-white/12 rounded-xl p-3 font-body text-xs text-white/90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E6B85C] flex-shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lucky Meta & Remedies */}
            <div className="flex flex-wrap gap-4 pt-2">
              {event.luckyColor && (
                <div className="bg-white/8 border border-[#C59B27]/30 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-body">
                  <span className="text-white/60">Lucky Color:</span>
                  <span className="font-semibold text-[#E6B85C]">{event.luckyColor}</span>
                </div>
              )}
              {event.luckyNumber && (
                <div className="bg-white/8 border border-[#C59B27]/30 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-body">
                  <span className="text-white/60">Lucky Number:</span>
                  <span className="font-semibold text-[#FFD700]">{event.luckyNumber}</span>
                </div>
              )}
            </div>

            {/* Recommended Remedies */}
            {event.recommendedRemedies && event.recommendedRemedies.length > 0 && (
              <div className="border-t border-white/10 pt-5">
                <h4 className="font-heading text-base font-semibold text-[#E6B85C] mb-2.5 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#E6B85C]" />
                  <span>Recommended Remedies</span>
                </h4>
                <ul className="space-y-2">
                  {event.recommendedRemedies.map((rem, i) => (
                    <li key={i} className="font-body text-xs text-white/85 flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <span className="text-[#E6B85C] font-bold">✦</span>
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-[#120E0A] border-t border-[#C59B27]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-white/75 text-center sm:text-left flex items-center gap-1.5">
              <Heart size={14} className="text-[#E6B85C] fill-[#E6B85C]" />
              Need personalized guidance for this auspicious day?
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs px-6 py-3 font-semibold whitespace-nowrap shadow-lg"
              id="event-modal-cta-btn"
            >
              Book Guidance with Nidhi T ✨
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventDetailModal;
