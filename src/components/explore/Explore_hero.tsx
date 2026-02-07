'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DotLottieReact  } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react';
import OvalLiveButton from '@/components/ui/OvalLiveButton';
import { BGPattern } from "../ui/bg-pattern";
import Link from "next/link";
import { other } from "@/lib/illustrations";
const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load Lottie animation data
    fetch('/animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    const drawGrid = () => {
      const gridSize = 60;
      ctx.strokeStyle = "rgba(66, 133, 244, 0.08)"; // Google blue tint
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Ensure we start at the top of the explore page when this hero mounts.
  // This prevents being restored/scrolled to the Offers section when navigating here.
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
    <div className="relative min-h-screen bg-[#fdfcec] transform-gpu">
      {/* Live indicator button (centered below navbar) */}
      <div className="absolute top-6 md:top-20 left-1/2 -translate-x-1/2 z-30">
        <OvalLiveButton />
      </div>
     <BGPattern variant="grid" mask="fade-y" fill="#4285F4" size={80} className="absolute inset-0 opacity-20 -z-10" />

      {/* Floating Google Color Blobs - simplified animation, will-change for performance */}
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
            className="flex-1 space-y-6 lg:space-y-8"
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
                GDGOC RCCIIT - Explore
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
            >
              <span className="inline-block bg-[#4285F4] text-white px-4 py-2 rounded-lg">
                DISCOVER
              </span>{" "}
              <span className="inline-block text-slate-900">THE</span>
              <br />
              <span className="inline-block mt-2 text-slate-900">BEST</span>{" "}
              <span className="inline-block mt-2 bg-[#EA4335] text-white px-4 py-2 rounded-lg">
                TECH
              </span>
              <br />
              <span className="inline-block mt-2 bg-[#FBBC04] text-white px-4 py-2 rounded-lg">
                RESOURCES
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-600 max-w-md leading-relaxed"
            >
              Unlock exclusive student offers, development tools, and resources from Google, GitHub, JetBrains, and more to accelerate your tech journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
             
                <Link href="/offers"> <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#4285F4] cursor-pointer text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >Explore Offers</motion.button></Link>
              
              
              <div className="relative">
               
                  <Link href="/studyjam" className="">
                   <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer px-8 py-4 border-2 border-[#34A853] text-[#34A853] font-semibold rounded-lg hover:bg-[#34A853] hover:text-white transition-all"
                >Study Jam</motion.button>
                  
                  </Link>
                {/* Arrow and hint text - responsive positioning */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="hidden md:block absolute -bottom-2 -right-21 lg:-right-29"
                >
                  <img 
                    src={other.arrow}
                    alt="Arrow pointing to Study Jam" 
                    className="w-20 h-20 lg:w-28 lg:h-28 rotate-30" 
                  />
                  <p className="text-center hand-written-text absolute top-3 left-24 lg:left-32 text-xs lg:text-sm text-slate-700 font-handwriting whitespace-nowrap">
                    Click here for study jam!!
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right: Illustrations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex items-center  justify-center w-[80vw] md:w-[60vw] lg:w-screen"
          >
            {animationData && <Lottie animationData={animationData} loop autoplay />}
          </motion.div>
        </div>
      </div>

      {/* Decorative Google Color Elements - simplified */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-2 h-2 bg-[#4285F4] rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-40 left-40 w-3 h-3 bg-[#EA4335] rounded-full hidden lg:block"
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1"
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
          className="w-3 h-3 text-[#4285F4]"
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

export default Index;
