'use client'
import React from 'react';

const googleColors = [
  "#4285F4", // Blue
  "#EA4335", // Red
  "#FBBC05", // Yellow
  "#34A853", // Green
];

const Marquee = () => {
  return (
    // Gradient border wrapper: outer uses gradient background, inner holds content with page background to create border effect
    <div className="w-full py-20 bg-transparent bg-size-[20px_20px] rounded-3xl shadow-2xl">
      <div className="p-0.5 rounded-3xl bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)]">
        {/* inner container is transparent so page background shows through; add a backdrop layer to preserve dot-grid look for the marquee text */}
        <div className="relative rounded-3xl px-6 py-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px] rounded-3xl"></div>
          <div className="relative">
            <div className="font-bold tracking-[-0.07em] leading-[90%] flex whitespace-nowrap text-[#232323] py-4 animate-marquee text-[12rem] md:text-[15rem] lg:text-[20rem]">
              {[...Array(4)].map((_, idx) => (
                <span className="flex mr-20" key={idx}>
                  <span className="text-black font-['Lexend']">GDGC&nbsp;</span>
                  {"RCCIIT".split("").map((char, i) => (
                    <span key={`${idx}-${i}`} style={{ color: googleColors[i % googleColors.length], fontWeight: 600 }}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Google-style decorative dots */}
      <div className="flex justify-center gap-3 mt-8">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 7s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
