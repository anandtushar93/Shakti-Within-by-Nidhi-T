import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
} from 'lucide-react';

// ─── Share Platform Config ────────────────────────────────────────────────────
const SHARE_URL = 'https://shaktiwithin.netlify.app/';
const SHARE_TITLE = 'Shakti Within by Nidhi T | Tarot, Numerology & Spiritual Guidance';
const SHARE_TEXT =
  'Discover clarity through Tarot, Numerology & intuitive guidance. Reconnect. Realign. Rise. ✨';

interface SharePlatform {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  icon: React.ReactNode;
  getUrl: () => string;
}

const whatsappIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const youtubeIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C.001 8.077 0 12 0 12s.001 3.923.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C23.999 15.923 24 12 24 12s-.001-3.923-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const facebookIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const linkedinIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const PLATFORMS: SharePlatform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: 'rgba(37,211,102,0.12)',
    hoverColor: 'rgba(37,211,102,0.22)',
    icon: whatsappIcon,
    getUrl: () =>
      `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n\n${SHARE_URL}`)}`,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: 'rgba(24,119,242,0.12)',
    hoverColor: 'rgba(24,119,242,0.22)',
    icon: facebookIcon,
    getUrl: () =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(SHARE_TEXT)}`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: 'rgba(0,119,181,0.12)',
    hoverColor: 'rgba(0,119,181,0.22)',
    icon: linkedinIcon,
    getUrl: () =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: 'rgba(255,0,0,0.12)',
    hoverColor: 'rgba(255,0,0,0.22)',
    icon: youtubeIcon,
    getUrl: () => 'https://youtube.com/@worthyofyou',
  },
];

// ─── Color helpers ────────────────────────────────────────────────────────────
const PLATFORM_COLORS: Record<string, string> = {
  whatsapp: '#25D366',
  facebook: '#1877F2',
  linkedin: '#0077B5',
  youtube: '#FF0000',
};

// ─── ShareModal Component ─────────────────────────────────────────────────────
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [nativeShareAvailable] = useState(
    typeof navigator !== 'undefined' && !!navigator.share
  );

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = SHARE_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  const handleNativeShare = useCallback(async () => {
    try {
      await navigator.share({
        title: SHARE_TITLE,
        text: SHARE_TEXT,
        url: SHARE_URL,
      });
    } catch {
      // User dismissed or share failed — no-op
    }
  }, []);

  const handlePlatformShare = useCallback((platform: SharePlatform) => {
    window.open(platform.getUrl(), '_blank', 'noopener,noreferrer,width=600,height=500');
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="share-backdrop"
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            key="share-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Share Shakti Within"
            className="fixed z-[9999] bottom-0 left-0 right-0 sm:inset-0 sm:flex sm:items-center sm:justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="pointer-events-auto w-full sm:w-[480px] sm:mx-auto rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #1A1510 0%, #221C13 60%, #2A2017 100%)',
                border: '1px solid rgba(197,155,39,0.25)',
                boxShadow: '0 -4px 80px rgba(197,155,39,0.08), 0 0 0 1px rgba(197,155,39,0.12)',
              }}
              initial={{ y: 60, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 60, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            >
              {/* Drag handle (mobile) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: 'rgba(197,155,39,0.35)' }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-4 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #C59B27, #E6B85C)' }}
                  >
                    <Share2 size={15} color="#201A15" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-heading text-base font-semibold" style={{ color: '#FAF6EE' }}>
                      Share Shakti Within
                    </p>
                    <p className="font-body text-[11px]" style={{ color: '#C59B27', opacity: 0.8 }}>
                      Spread the light ✨
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  aria-label="Close share modal"
                >
                  <X size={16} color="#FAF6EE" />
                </button>
              </div>

              {/* Divider */}
              <div
                className="mx-6 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(197,155,39,0.3), transparent)' }}
              />

              {/* Preview Card */}
              <div className="mx-6 mt-4 mb-3 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(197,155,39,0.2)' }}>
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="Shakti Within preview"
                    className="w-full h-50 object-cover"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(26,21,16,0.85), transparent)' }}
                  />
                  <div className="absolute bottom-2 left-3">
                    <p className="font-heading text-sm font-semibold" style={{ color: '#FAF6EE' }}>
                      Shakti Within
                    </p>
                    <p className="font-body text-[10px]" style={{ color: '#E6B85C' }}>
                      https://shaktiwithin.netlify.app/
                    </p>
                  </div>
                </div>
              </div>

              {/* Share Platforms */}
              <div className="px-6 pb-2">
                <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(230,184,92,0.6)' }}>
                  Share on
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {PLATFORMS.map((platform) => (
                    <motion.button
                      key={platform.id}
                      onClick={() => handlePlatformShare(platform)}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all cursor-pointer group"
                      style={{ background: platform.color }}
                      whileHover={{ scale: 1.06, background: platform.hoverColor } as any}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Share on ${platform.name}`}
                      id={`share-${platform.id}-btn`}
                    >
                      <span style={{ color: PLATFORM_COLORS[platform.id] }}>
                        {platform.icon}
                      </span>
                      <span className="font-body text-[9px] font-medium" style={{ color: 'rgba(250,246,238,0.65)' }}>
                        {platform.name === 'X (Twitter)' ? 'X / Twitter' : platform.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Copy Link */}
              <div className="mx-6 mt-4 mb-3">
                <p className="font-body text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(230,184,92,0.6)' }}>
                  Or copy link
                </p>
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(197,155,39,0.18)' }}
                >
                  <ExternalLink size={13} style={{ color: 'rgba(197,155,39,0.6)', flexShrink: 0 }} />
                  <span
                    className="font-body text-xs flex-1 truncate select-all"
                    style={{ color: 'rgba(250,246,238,0.55)' }}
                  >
                    {SHARE_URL}
                  </span>
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-semibold transition-all cursor-pointer"
                    style={{
                      background: copied
                        ? 'linear-gradient(135deg, #16a34a, #15803d)'
                        : 'linear-gradient(135deg, #C59B27, #E6B85C)',
                      color: '#201A15',
                      minWidth: '72px',
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Copy link to clipboard"
                    id="share-copy-link-btn"
                  >
                    {copied ? (
                      <>
                        <Check size={12} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Native Share (mobile only) */}
              {nativeShareAvailable && (
                <div className="mx-6 mb-5">
                  <motion.button
                    onClick={handleNativeShare}
                    className="w-full py-3 rounded-xl font-body text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                    style={{
                      background: 'rgba(197,155,39,0.12)',
                      color: '#E6B85C',
                      border: '1px solid rgba(197,155,39,0.25)',
                    }}
                    whileHover={{ background: 'rgba(197,155,39,0.2)' } as any}
                    whileTap={{ scale: 0.98 }}
                    id="share-native-btn"
                  >
                    <Share2 size={15} />
                    More sharing options
                  </motion.button>
                </div>
              )}

              {/* Safe area bottom padding (mobile) */}
              <div
                className="h-safe-area-inset-bottom sm:hidden"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
