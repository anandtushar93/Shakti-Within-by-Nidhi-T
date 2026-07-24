import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BRAND } from '../../constants';

// ─── Floating WhatsApp Widget ─────────────────────────────────────────────────
const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-card rounded-3xl w-72 shadow-2xl overflow-hidden border border-[#C59B27]/30"
          >
            {/* Header */}
            <div
              className="p-4 flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg, #C59B27, #E6B85C)' }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-[#201A15] font-heading font-bold text-lg border border-white/30">
                N
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-[#201A15]">Nidhi T</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                  <p className="font-body text-[11px] text-[#201A15]/80 font-medium">Typically replies within hours</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#201A15]/70 hover:text-[#201A15] transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message */}
            <div className="p-4 bg-white">
              <div className="bg-[#FAF6EE] rounded-2xl rounded-tl-sm p-3.5 mb-4 border border-[#C59B27]/15">
                <p className="font-body text-sm text-[#201A15] leading-relaxed">
                  🙏 Hi! I'm Nidhi. Ready to discover clarity through Tarot or Numerology?
                </p>
                <p className="font-body text-sm text-[#201A15] mt-2">
                  Drop me a message and let's begin your journey! ✨
                </p>
                <p className="font-body text-[10px] text-[#685F52] mt-2 text-right">Just now</p>
              </div>

              <a
                href={`${BRAND.whatsapp}?text=${encodeURIComponent("Hi Nidhi! I'd love to book a consultation with you. 🙏")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary text-center text-sm py-3 flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
                id="whatsapp-float-btn"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card rounded-2xl px-4 pr-16 py-2 shadow-lg text-xs sm:text-sm font-body text-[#201A15] border border-[#C59B27]/25"
          >
            💬 Have questions?
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat on WhatsApp"
        id="whatsapp-fab"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
