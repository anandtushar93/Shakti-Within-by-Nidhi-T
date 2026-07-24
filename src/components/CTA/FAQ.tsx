import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../../data';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import SectionHeader from '../Shared/SectionHeader';
import Container from '../Shared/Container';

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
const FAQItem: React.FC<{
  faq: typeof FAQS[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ faq, isOpen, onToggle, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
        isOpen ? 'border-[#C59B27]/40 shadow-md' : 'border-[#C59B27]/16'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left gap-4 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-question-${faq.id}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#C59B27]/30 flex items-center justify-center shadow-2xs">
            <span className="font-body text-xs font-bold text-[#C59B27]">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <span className="font-heading text-xl font-semibold text-[#201A15]">{faq.question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <ChevronDown size={20} className={`transition-colors ${isOpen ? 'text-[#C59B27]' : 'text-[#685F52]'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-question-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="ml-12 border-l-2 border-[#C59B27]/40 pl-5">
                <p className="font-body text-sm sm:text-base text-[#685F52] leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── FAQ Section ──────────────────────────────────────────────────────────────
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="py-28 lg:py-36 bg-gradient-to-b from-[#FAF6EE] to-[#FFFDF9] relative overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#C59B27]/4 blur-3xl pointer-events-none" aria-hidden="true" />

      <Container className="max-w-4xl">
        <SectionHeader
          badge="Got Questions?"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Everything you need to know before booking your consultation."
        />

        <div className="space-y-4" role="list">
          {FAQS.map((faq, index) => (
            <div role="listitem" key={faq.id}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                index={index}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-[#685F52]">
            Still have questions?{' '}
            <a
              href="https://wa.me/919899689394"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C59B27] font-semibold hover:underline"
            >
              Chat with Nidhi on WhatsApp →
            </a>
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQ;
