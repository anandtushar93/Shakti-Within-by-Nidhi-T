import React, { Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './index.css';

// ─── Component Imports ────────────────────────────────────────────────────────
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingWhatsApp from './components/Shared/FloatingWhatsApp';

// ─── Lazy Loaded Sections (code splitting) ────────────────────────────────────
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const WhyChooseMe = lazy(() => import('./components/WhyChooseMe'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const CTA = lazy(() => import('./components/CTA'));
const FAQ = lazy(() => import('./components/CTA/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// ─── Section Loader ───────────────────────────────────────────────────────────
const SectionLoader: React.FC = () => (
  <div className="w-full py-24 flex items-center justify-center">
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-[#C59B27]"
          animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

// ─── App Component ────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Main Layout */}
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col w-full overflow-x-hidden">
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#C59B27] focus:text-[#201A15] focus:px-4 focus:py-2 focus:rounded-lg focus:font-body focus:text-sm font-semibold"
        >
          Skip to main content
        </a>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="flex-1 w-full">
          {/* Hero is eagerly loaded */}
          <Hero />

          {/* Remaining sections lazy loaded */}
          <Suspense fallback={<SectionLoader />}>
            <Services />
            <About />
            <WhyChooseMe />
            <Testimonials />
            <CTA />
            <FAQ />
            <Contact />
          </Suspense>
        </main>

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default App;
