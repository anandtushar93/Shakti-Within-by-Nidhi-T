import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
  id?: string;
}

// ─── Magnetic Button with Ripple ──────────────────────────────────────────────
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  href,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: ripple-expand 0.6s ease-out forwards;
      pointer-events: none;
    `;
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => { handleRipple(e); onClick?.(); }}
      className={cn('relative inline-flex items-center justify-center', className)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} id={id} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      id={id}
      className="inline-block"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default MagneticButton;
