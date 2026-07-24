import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

// ─── Custom Celestial Cursor ──────────────────────────────────────────────────
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!(target.closest('button') ||
          target.closest('a') ||
          target.closest('[data-hover]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A')
      );
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [x, y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        style={{ x: position.x - 5, y: position.y - 5 }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <div
          className={`w-2.5 h-2.5 rounded-full bg-[#C59B27] transition-transform duration-150 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
        />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      >
        <div
          className={`border border-[#C59B27]/40 rounded-full transition-all duration-300 ${
            isHovering ? 'w-10 h-10 border-[#E6B85C] bg-[#E6B85C]/15' : 'w-7 h-7'
          }`}
        />
      </motion.div>

      {/* Star sparkle when hovering */}
      {isHovering && (
        <motion.div
          style={{ x: position.x - 12, y: position.y - 30 }}
          className="fixed top-0 left-0 pointer-events-none z-[9997] text-[#C59B27] text-xs font-semibold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          ✦
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
