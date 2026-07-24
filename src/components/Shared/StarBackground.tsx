import React, { useEffect, useMemo, useRef } from 'react';
import { generateStars, type Star } from '../../utils';

// ─── Twinkling Star Background ────────────────────────────────────────────────
const StarBackground: React.FC<{ count?: number }> = ({ count = 80 }) => {
  const stars: Star[] = useMemo(() => generateStars(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            background: star.id % 3 === 0
              ? '#E6B85C'
              : star.id % 3 === 1
              ? '#C59B27'
              : '#D4AF37',
          }}
        />
      ))}

      {/* Golden Particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={`gold-${i}`}
          className="absolute rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, #E6B85C, transparent)',
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 6}s`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Constellation Background ─────────────────────────────────────────────────
export const ConstellationBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw constellation lines
    const points = [
      { x: 0.1, y: 0.2 }, { x: 0.25, y: 0.1 }, { x: 0.4, y: 0.15 },
      { x: 0.6, y: 0.08 }, { x: 0.75, y: 0.2 }, { x: 0.9, y: 0.12 },
      { x: 0.15, y: 0.5 }, { x: 0.35, y: 0.45 }, { x: 0.55, y: 0.5 },
      { x: 0.8, y: 0.45 }, { x: 0.2, y: 0.8 }, { x: 0.5, y: 0.85 },
      { x: 0.7, y: 0.75 }, { x: 0.9, y: 0.85 },
    ];

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
      [6, 7], [7, 8], [8, 9],
      [10, 11], [11, 12], [12, 13],
      [1, 7], [4, 9], [11, 7],
    ];

    let opacity = 0;
    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      opacity = Math.min(1, frame / 60);

      // Draw lines
      connections.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(points[a].x * canvas.width, points[a].y * canvas.height);
        ctx.lineTo(points[b].x * canvas.width, points[b].y * canvas.height);
        ctx.strokeStyle = `rgba(197, 155, 39, ${0.12 * opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // Draw star points
      points.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 184, 92, ${0.5 * opacity})`;
        ctx.fill();
      });

      if (frame < 180) requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StarBackground;
