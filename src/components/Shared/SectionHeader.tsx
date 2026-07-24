import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FADE_UP } from '../../constants';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

// ─── Section Header Component ─────────────────────────────────────────────────
const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={FADE_UP}
      className={`mb-14 lg:mb-16 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-3 mb-4 ${centered ? 'justify-center mx-auto' : ''}`}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C59B27]" />
          <span className="text-[#C59B27] font-body text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase">
            {badge}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C59B27]" />
        </div>
      )}

      <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#201A15] leading-[1.15]">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text italic">{highlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 font-body text-[#685F52] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
