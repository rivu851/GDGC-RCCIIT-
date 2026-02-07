'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
};

export default function OvalLiveButton({ text = 'Study jam is live', className = '', ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/90 shadow-md border border-gray-200 text-sm font-medium ${className}`}
      aria-live="polite"
      aria-pressed={false}
    >
      <span className="relative flex items-center justify-center w-3 h-3">
        {/* Pulsing ring */}
        <motion.span
          className="absolute inline-block rounded-full bg-[#4285F4]/30"
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0.15, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 18, height: 18 }}
        />
        {/* Solid dot on top */}
        <motion.span
          className="relative inline-block rounded-full bg-[#4285F4]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 8, height: 8 }}
        />
      </span>

      <span className="whitespace-nowrap text-slate-900">{text}</span>
    </button>
  );
}
