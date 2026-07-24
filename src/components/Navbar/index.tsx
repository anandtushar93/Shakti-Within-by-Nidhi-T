import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, BRAND } from '../../constants';
import { useNavbarScroll } from '../../hooks';
import { smoothScrollTo } from '../../utils';
import Container from '../Shared/Container';

// ─── Navbar Component ─────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const scrolled = useNavbarScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    smoothScrollTo(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
          scrolled
            ? 'glass shadow-md py-3'
            : 'bg-transparent py-3'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('#hero'); }}
            className="flex items-center gap-3.5 group cursor-pointer"
            aria-label="Shakti Within - Home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Original Rectangular Logo without circular frames/masks */}
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Shakti Within by Nidhi T"
                className="h-10 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="font-heading text-xl sm:text-2xl font-semibold text-[#201A15] leading-none tracking-wide group-hover:text-[#C59B27] transition-colors">
                Shakti Within
              </p>
              <p className="font-body text-[10px] text-[#C59B27] font-semibold tracking-[0.16em] uppercase mt-1">
                by Nidhi T
              </p>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8" role="navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-body text-sm font-medium transition-all duration-300 relative group cursor-pointer ${
                  activeLink === link.href
                    ? 'text-[#C59B27] font-semibold'
                    : 'text-[#443C33] hover:text-[#C59B27]'
                }`}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#C59B27] to-[#E6B85C] transition-all duration-300 rounded-full ${
                    activeLink === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <motion.a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-primary text-sm px-6 py-2.5 shadow-md"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Book Your Consultation"
              id="navbar-book-btn"
            >
              Book Consultation
            </motion.a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-[#C59B27]/10 transition-colors cursor-pointer"
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-[#C59B27]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-[#C59B27]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-80 z-[850] glass shadow-2xl flex flex-col pt-24 px-8 pb-10 lg:hidden border-l border-[#EFE5D3]"
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-[#C59B27]/10 blur-xl pointer-events-none" />
            <div className="absolute bottom-10 left-5 w-16 h-16 rounded-full bg-[#E6B85C]/10 blur-xl pointer-events-none" />

            <nav className="flex flex-col gap-2 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-3 px-4 rounded-xl font-body font-medium text-[#201A15] hover:text-[#C59B27] hover:bg-[#C59B27]/8 transition-all duration-200 text-lg cursor-pointer"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Book Consultation
            </motion.a>

            <p className="text-center font-body text-xs text-[#685F52] mt-6 tracking-wide">
              ✦ Reconnect. Realign. Rise. ✦
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[840] bg-[#1C1610]/30 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
