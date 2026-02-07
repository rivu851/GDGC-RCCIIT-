'use client';

import React from 'react';

export const LiquidShapes = () => {
  return (
    <>
      <style>{`
        @keyframes liquid-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-25px) translateX(15px);
          }
          50% {
            transform: translateY(-40px) translateX(-15px);
          }
          75% {
            transform: translateY(-20px) translateX(20px);
          }
        }

        @keyframes liquid-wave {
          0%, 100% {
            d: path('M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z');
          }
          25% {
            d: path('M0,50 Q25,25 50,40 T100,50 L100,100 L0,100 Z');
          }
          50% {
            d: path('M0,50 Q25,35 50,60 T100,50 L100,100 L0,100 Z');
          }
          75% {
            d: path('M0,50 Q25,40 50,45 T100,50 L100,100 L0,100 Z');
          }
        }

        @keyframes liquid-morph {
          0%, 100% {
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
          }
          10% {
            border-radius: 28% 72% 35% 65% / 62% 28% 72% 38%;
          }
          20% {
            border-radius: 41% 59% 48% 52% / 48% 51% 49% 52%;
          }
          30% {
            border-radius: 72% 28% 65% 35% / 38% 72% 28% 62%;
          }
          40% {
            border-radius: 37% 63% 52% 48% / 52% 44% 56% 48%;
          }
          50% {
            border-radius: 58% 42% 71% 29% / 66% 58% 42% 34%;
          }
          60% {
            border-radius: 63% 37% 46% 54% / 45% 52% 48% 55%;
          }
          70% {
            border-radius: 35% 65% 29% 71% / 42% 34% 66% 58%;
          }
          80% {
            border-radius: 54% 46% 41% 59% / 49% 55% 45% 51%;
          }
        }

        @keyframes liquid-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes liquid-pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.08);
          }
        }

        @keyframes liquid-blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10px, -15px) scale(1.05);
          }
          50% {
            transform: translate(-10px, 10px) scale(0.98);
          }
          75% {
            transform: translate(15px, 8px) scale(1.03);
          }
        }

        .liquid-shape {
          animation: liquid-float 10s ease-in-out infinite, liquid-blob 7s ease-in-out infinite;
        }

        .liquid-shape-2 {
          animation: liquid-morph 8s ease-in-out infinite, liquid-blob 9s ease-in-out infinite;
        }

        .liquid-shape-3 {
          animation: liquid-rotate 25s linear infinite, liquid-blob 8s ease-in-out infinite;
        }

        .liquid-shape-4 {
          animation: liquid-pulse 5s ease-in-out infinite, liquid-blob 10s ease-in-out infinite;
        }
      `}</style>

      {/* Liquid Shape 1 - Top Left */}
     

      {/* Liquid Shape 2 - Top Right */}
      <div
        className="absolute top-150 left-35 z-0 opacity-15 pointer-events-none liquid-shape-2"
        style={{
          animationDelay: '1s',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
        }}
      />

      {/* Liquid Shape 3 - Middle Left */}
      <div className="absolute top-1/3 left-5 z-0 opacity-25 pointer-events-none liquid-shape" style={{ animationDelay: '2s' }}>
        <svg width="90" height="90" viewBox="0 0 100 100" className="w-20 md:w-28">
          <ellipse cx="50" cy="50" rx="40" ry="45" fill="#8B5CF6" opacity="0.5" />
          <ellipse cx="50" cy="55" rx="35" ry="40" fill="#A78BFA" opacity="0.4" />
        </svg>
      </div>

      {/* Liquid Shape 4 - Bottom Right */}
      <div
        className="absolute bottom-32 right-10 z-0 opacity-20 pointer-events-none liquid-shape-4"
        style={{
          width: '110px',
          height: '110px',
          background: 'linear-gradient(45deg, #3B82F6 0%, #06B6D4 100%)',
          borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
        }}
      />
       <div
        className="absolute top-500 left-10 z-0 opacity-20 pointer-events-none liquid-shape-4"
        style={{
          width: '110px',
          height: '110px',
          background: 'linear-gradient(45deg, #3B82F6 0%, #06B6D4 100%)',
          borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
        }}
      />

      {/* Liquid Shape 5 - Center Bottom */}
      <div className="absolute bottom-20 left-1/3 z-0 opacity-18 pointer-events-none liquid-shape" style={{ animationDelay: '3s' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" className="w-24 md:w-32">
          <path
            d="M30,50 Q30,30 50,25 Q70,30 70,50 Q70,75 50,80 Q30,75 30,50"
            fill="#EC4899"
            opacity="0.5"
          />
          <path
            d="M35,50 Q35,35 50,30 Q65,35 65,50 Q65,70 50,75 Q35,70 35,50"
            fill="#F472B6"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Liquid Shape 6 - Top Center */}
      <div
        className="absolute top-12 right-10 -translate-x-1/2 z-0 opacity-20 pointer-events-none liquid-shape-3"
        style={{
          width: '95px',
          height: '95px',
          background: 'linear-gradient(120deg, #10B981 0%, #34D399 100%)',
          borderRadius: '45% 55% 52% 48% / 48% 45% 55% 52%',
        }}
      />

      {/* Liquid Shape 7 - Right Middle */}
      <div className="absolute top-2/3 right-20 z-0 opacity-22 pointer-events-none liquid-shape-2" style={{ animationDelay: '0.5s' }}>
        <svg width="85" height="85" viewBox="0 0 100 100" className="w-20 md:w-28">
          <path
            d="M20,50 Q20,25 50,20 Q80,25 80,50 L80,80 Q80,90 50,95 Q20,90 20,80 Z"
            fill="#F59E0B"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="absolute top-150 right-20 z-0 opacity-22 pointer-events-none liquid-shape-2" style={{ animationDelay: '0.5s' }}>
        <svg width="85" height="85" viewBox="0 0 100 100" className="w-20 md:w-28">
          <path
            d="M20,50 Q20,25 50,20 Q80,25 80,50 L80,80 Q80,90 50,95 Q20,90 20,80 Z"
            fill="#F59E0B"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Liquid Shape 8 - Bottom Left */}
      <div
        className="absolute bottom-40 left-20 z-0 opacity-18 pointer-events-none liquid-shape-4"
        style={{
          animationDelay: '1.5s',
          width: '105px',
          height: '105px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 100%)',
          borderRadius: '52% 48% 45% 55% / 48% 52% 48% 52%',
        }}
      />
    </>
  );
};
