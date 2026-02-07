'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CursorTrailProps {
  name: string;
  isHovering: boolean;
  startX?: number;
  startY?: number;
}

export default function CursorTrail({ name, isHovering, startX = -100, startY = -100 }: CursorTrailProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (isHovering) {
      // Set position to card center immediately
      setPosition({ x: startX, y: startY });
      
      const moveCursor = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', moveCursor);
      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    } else if (!isHovering) {
      // Reset to off-screen when not hovering
      setPosition({ x: -100, y: -100 });
    }
  }, [isHovering, startX, startY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-9999 hidden lg:block"
      style={{
        left: position.x,
        top: position.y,
        x: '10%',
        y: '20%',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isHovering ? 1 : 0,
        scale: isHovering ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Oval box with name */}
      <div className="relative">
        {/* Main oval */}
        <div className="relative px-4 py-1 bg-blue-600 rounded-full shadow-xl border-2 border-white">
          <p className="text-white font-bold text-sm whitespace-nowrap tracking-wide">
            {name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
