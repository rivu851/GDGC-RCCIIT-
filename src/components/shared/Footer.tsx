'use client';
import React, { FormEvent, useRef, useState, useCallback } from 'react';
import Lanyard from './Lanyard';
import { Skiper40 } from '@/components/ui/SkiperComponent';
import { triggerConfettiStars } from '@/components/ui/ConfettiStars';

const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [firedThisDrag, setFiredThisDrag] = useState(false);

  return (
    <footer
      className="relative min-h-screen w-full flex flex-col justify-between bg-black text-white pt-8 overflow-x-hidden"
      ref={container}
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
      }}
    >
      <style jsx>{`
        footer::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        {/* Layout: Left - Heading, Center - Lanyard */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-8 py-4 lg:py-8 relative">
          <div className="w-full lg:w-1/2 flex flex-col justify-start mb-4 lg:mb-6">
            <h1
              className="font-extrabold tracking-tight mb-2 text-white mt-[2vh] lg:mt-[5vh]"
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 5rem)',
                lineHeight: 1.1,
              }}
            >
              Let&apos;s Do Great Work Together
            </h1>
          </div>

          {/* Middle Lanyard - responsive height */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex justify-center items-center">
            <Lanyard
              position={[0, 0, 24]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent={true}
              onDragStart={() => {
                setIsDragging(true);
                setFiredThisDrag(false);
              }}
              onDragEnd={() => {
                setIsDragging(false);
                // Trigger confetti when drag ends (lanyard is released)
                if (isDragging && !firedThisDrag) {
                  triggerConfettiStars();
                  setFiredThisDrag(true);
                }
              }}
            />
          </div>

          {/* Skiper40: fixed at right bottom on desktop */}
          <div className="hidden lg:block absolute right-8 bottom-70 z-20">
            <Skiper40 />
          </div>
        </div>

        {/* GDGC RCCIIT Heading */}
        <div className="flex flex-col items-start my-4 lg:my-8 w-full mt-4 lg:mt-[-60vh]">
          <div className="w-full flex justify-left">
            <div className="border-t-2 border-gray-600 w-full max-w-2xl flex justify-left"></div>
          </div>
          <h2
            className="text-white font-black uppercase w-full font-bitcount text-left font-['Jersey_10']"
            style={{
              fontSize: 'clamp(3rem, 13vw, 20rem)',
              letterSpacing: '0.1em',
              lineHeight: 0.8,
              margin: 0,
              padding: 0,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              textAlign: 'left',
            }}
          >
            GDGC <br /> RCCIIT
          </h2>
          <div className="w-full flex justify-left mt-2">
            <div className="border-t-2 border-gray-600 w-full max-w-2xl justify-left"></div>
          </div>
        </div>

        {/* Skiper40 for mobile - placed before copyright on mobile */}
        <div className="block lg:hidden mb-6 mt-8">
          <Skiper40 />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 lg:py-6 gap-3 mt-auto">
          <span className="font-medium text-xs md:text-sm lg:text-base text-center md:text-left">
            &copy; 2025 GDGC RCCIIT. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
