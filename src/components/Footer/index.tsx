import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Share2 } from 'lucide-react';
import { BRAND } from '../../constants';
import { smoothScrollTo } from '../../utils';
import Container from '../Shared/Container';
import ShareModal from '../Shared/ShareModal';

// ─── Footer Component ─────────────────────────────────────────────────────────
const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <footer
      className="relative bg-[#FFFDF9] border-t border-[#EFE5D3] overflow-hidden"
      role="contentinfo"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" aria-hidden="true" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-t from-[#FAF6EE] to-transparent" />
      </div>

      <Container className="py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          
          {/* Left: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3.5 mb-3">
              <img
                src="/logo.png"
                alt="Shakti Within Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div>
                <p className="font-heading text-xl font-semibold text-[#201A15]">Shakti Within</p>
                <p className="font-body text-[10px] text-[#C59B27] font-semibold tracking-widest uppercase">by Nidhi T</p>
              </div>
            </div>
            <p className="font-heading text-sm italic text-[#C59B27]">
              Reconnect. Realign. Rise.
            </p>
            <div className="mt-3 h-px w-16 bg-gradient-to-r from-[#C59B27] to-transparent" />
          </div>

          {/* Center: Nav */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {[
              { label: 'Services', href: '#services' },
              { label: 'About', href: '#about' },
              { label: 'Why Choose Me', href: '#why-choose-me' },
              { label: 'Testimonials', href: '#testimonials' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => smoothScrollTo(link.href)}
                className="font-body text-sm font-medium text-[#685F52] hover:text-[#C59B27] transition-colors duration-200 cursor-pointer"
                aria-label={`Go to ${link.label}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Social + Share + Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#E1306C]/10 flex items-center justify-center hover:bg-[#E1306C]/20 transition-colors"
                aria-label="Instagram - WorthyOfYou"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0077B5]/10 flex items-center justify-center hover:bg-[#0077B5]/20 transition-colors"
                aria-label="LinkedIn - WorthyOfYou"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={BRAND.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FF0000]/10 flex items-center justify-center hover:bg-[#FF0000]/20 transition-colors"
                aria-label="YouTube - WorthyOfYou"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>

            {/* Share Button */}
            <motion.button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-body text-xs font-medium border cursor-pointer transition-all"
              style={{
                color: '#C59B27',
                borderColor: 'rgba(197,155,39,0.35)',
                background: 'rgba(197,155,39,0.06)',
              }}
              whileHover={{ scale: 1.04, background: 'rgba(197,155,39,0.12)' } as any}
              whileTap={{ scale: 0.96 }}
              aria-label="Share this website"
              id="footer-share-btn"
            >
              <Share2 size={13} />
              Share this site
            </motion.button>

            {/* Back to Top */}
            <motion.button
              onClick={() => smoothScrollTo('#hero')}
              className="group flex items-center gap-2 font-body text-xs text-[#685F52] hover:text-[#C59B27] transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} className="group-hover:text-[#C59B27]" />
              Back to top
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#EFE5D3] flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="font-body text-xs text-[#685F52]">
            © {year} Shakti Within by Nidhi T. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#685F52] flex items-center gap-1">
            Made with <Heart size={12} className="text-[#C59B27] fill-[#C59B27]" /> for your spiritual journey
          </p>
        </div>
      </Container>

      {/* Share Modal */}
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
    </footer>
  );
};

export default Footer;
