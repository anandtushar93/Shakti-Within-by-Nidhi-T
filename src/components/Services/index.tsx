import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SERVICES } from '../../data';
import SectionHeader from '../Shared/SectionHeader';
import { BRAND } from '../../constants';
import Container from '../Shared/Container';

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      className="group relative glass-card rounded-3xl p-8 card-hover gradient-border h-full flex flex-col justify-between"
      aria-label={`Service: ${service.title}`}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C59B27]/5 to-[#E6B85C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 10px 40px rgba(197, 155, 39, 0.15)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Icon */}
          <motion.div
            className="text-4xl mb-6 inline-block p-3 rounded-2xl bg-[#FAF6EE] border border-[#C59B27]/20 shadow-2xs"
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            aria-hidden="true"
          >
            {service.emoji}
          </motion.div>

          {/* Title */}
          <h3 className="font-heading text-2xl font-semibold text-[#201A15] mb-3 group-hover:text-[#C59B27] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Gold Accent Line */}
          <div className="h-[2px] w-12 bg-gradient-to-r from-[#C59B27] to-[#E6B85C] mb-4 group-hover:w-full transition-all duration-500 rounded-full" />

          {/* Description */}
          <p className="font-body text-sm text-[#685F52] leading-relaxed mb-6">
            {service.description}
          </p>
        </div>

        {/* Button */}
        <motion.a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C59B27] hover:text-[#9A7418] transition-colors duration-200 mt-auto pt-2"
          whileHover={{ x: 4 }}
          aria-label={`Book a ${service.title} session`}
        >
          Book Session
          <span className="text-[#E6B85C]">→</span>
        </motion.a>
      </div>
    </motion.article>
  );
};

// ─── Services Section ─────────────────────────────────────────────────────────
const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-28 lg:py-36 bg-gradient-services relative overflow-hidden"
      aria-label="Services Section"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#C59B27]/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#E6B85C]/6 blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Top wave divider */}
      {/* <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" className="w-full h-12" style={{ fill: '#FFFDF9' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div> */}

      <Container>
        <SectionHeader
          badge="What I Offer"
          title="Sacred"
          highlight="Services"
          subtitle="Each service is a doorway to deeper self-understanding, clarity, and transformative growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-body text-[#685F52] mb-5 text-sm">
            Not sure which service is right for you?
          </p>
          <motion.a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            id="services-consult-btn"
          >
            💬 Chat with Nidhi
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
