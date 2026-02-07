'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from 'lottie-react';
import { BGPattern } from "../ui/bg-pattern";

const AboutUsHero = () => {
  const [animationData, setAnimationData] = useState(null);
  const [logoWinAnimation, setLogoWinAnimation] = useState(null);

  // Load team animation data
  useEffect(() => {
    fetch('/assets/animation/team.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
    fetch('/assets/animation/Winner.json')
      .then(response => response.json())
      .then(data => setLogoWinAnimation(data))
      .catch(error => console.error('Error loading logo win animation:', error));
  }, []);


  // Ensure we start at the top of the page when this hero mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch (e) {
        // silent
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white transform-gpu">
      {/* Background Pattern - Same as Explore/Teams */}
      <BGPattern
        variant="grid"
        mask="fade-x"
        fill="#D3D3D3"
        size={50}
        className="absolute inset-0 opacity-100 -z-10"
      />

      {/* Logo Win Animation at Top Right Corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 z-20">
        {logoWinAnimation ? (
          <Lottie
            animationData={logoWinAnimation}
            loop
            autoplay
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Floating Google Color Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-64 h-64 bg-[#4285F4]/10 rounded-full blur-3xl will-change-transform"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-20 w-72 h-72 bg-[#EA4335]/10 rounded-full blur-3xl will-change-transform hidden sm:block"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 right-1/4 w-56 h-56 bg-[#FBBC04]/10 rounded-full blur-3xl will-change-transform hidden sm:block"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-20 lg:py-12">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 space-y-6 lg:space-y-8 max-w-2xl"
          >
            {/* Google Color Dots Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-[#4285F4] rounded-full"></span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-[#EA4335] rounded-full"></span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-[#FBBC04] rounded-full"></span>
              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-[#34A853] rounded-full"></span>
              <p className="text-sm font-medium tracking-wide uppercase text-slate-700 ml-2">
                GDGC RCCIIT
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            >
              <span className="inline-block text-slate-600">WE </span>
              <br />
              <span className="inline-block mt-2 bg-[#4285F4] text-white px-4 py-2 rounded-lg">
                CODE
              </span>{" "}
              <span className="inline-block mt-2 bg-[#EA4335] text-white px-4 py-2 rounded-lg">
                WE CREATE
              </span>
              <br />
              <span className="inline-block mt-2 bg-[#FBBC04] text-white px-4 py-2 rounded-lg">
                WE CAFFEINATE
              </span>{" "}
              <span className="inline-block mt-2 bg-[#34A853] text-white px-4 py-2 rounded-lg">
                REPEAT.
              </span>
            </motion.h1>


            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
            >
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
                <h3 className="text-3xl font-bold text-[#4285F4]">2400+</h3>
                <p className="text-sm text-gray-600 mt-1">Members</p>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
                <h3 className="text-3xl font-bold text-[#EA4335]">50+</h3>
                <p className="text-sm text-gray-600 mt-1">Events</p>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
                <h3 className="text-3xl font-bold text-[#FBBC04]">70+</h3>
                <p className="text-sm text-gray-600 mt-1">Projects</p>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200">
                <h3 className="text-3xl font-bold text-[#34A853]">100%</h3>
                <p className="text-sm text-gray-600 mt-1">Passion</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right: Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex items-center justify-center w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl"
          >
            <div className="w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Google Color Elements */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-2 h-2 bg-[#4285F4] rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-40 right-40 w-3 h-3 bg-[#EA4335] rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#FBBC04] rounded-full hidden lg:block"
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 z-50"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xs font-medium text-[#4285F4]"
        >
          Scroll to Explore
        </motion.span>
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-4 h-4 text-[#4285F4]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default AboutUsHero;
