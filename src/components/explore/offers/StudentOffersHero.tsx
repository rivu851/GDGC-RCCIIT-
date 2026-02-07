'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { StackingCards as UIStackingCards } from '@/components/ui/stacking-card';
import ReactLenis from 'lenis/react';
import { BouncyCardsFeatures } from './RightCards';

const StudentOffersHero = () => {
  const router = useRouter();

  return (
    <ReactLenis root>
    <div className="relative">
      {/* Hero Section - Sticky on desktop, normal flow on mobile */}
      <section className="lg:sticky lg:top-0 w-full min-h-screen lg:h-screen bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px] py-12 sm:py-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
            
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 z-10 order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-[#4285F4]">Student</span>{' '}
                  <span className="text-[#EA4335]">Offers</span>
                  <br />
                  <span className="text-[#FBBC04]">&</span>{' '}
                  <span className="text-[#34A853]">Benefits</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
              >
                Unlock <span className="font-bold text-[#4285F4]">exclusive deals</span> and{' '}
                <span className="font-bold text-[#34A853]">free resources</span> to supercharge
                your learning journey! Get access to premium tools from GitHub, Google Cloud,
                JetBrains, and more.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <motion.button
                  onClick={() => router.push('/offers')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] text-white font-bold text-base sm:text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <span className=" flex items-center gap-2">
                    Get Them Now
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#EA4335] via-[#FBBC04] to-[#4285F4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex -space-x-3">
                    {['', '', '', ''].map((emoji, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xl sm:text-2xl shadow-md"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    <span className="font-bold text-[#4285F4]">8+</span> Premium Offers
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6"
              >
                {[
                  { icon: '', text: 'Developer Tools' },
                  { icon: '', text: 'Cloud Credits' },
                  { icon: '', text: 'Design Software' },
                  { icon: '', text: 'Learning Resources' },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3 bg-white rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-md border border-gray-200"
                  >
                    <span className="text-xl sm:text-2xl">{benefit.icon}</span>
                    <span className="font-medium text-gray-800 text-xs sm:text-sm">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Bouncy Cards - Desktop only (side-by-side) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:flex items-center justify-end order-2"
            >
              <div className="w-[50vw] bg-transparent">
                <BouncyCardsFeatures />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mobile Cards Section - Shows below hero on mobile with stacking overlay effect */}
      <div className="lg:hidden">
        {/* Card 1 */}
        <div className="sticky top-20 bg-[#fdfcec] p-6 mx-4 rounded-2xl shadow-lg border-2 border-gray-200 mb-4">
          <h3 className="text-xl font-bold text-center mb-4 text-violet-600">Google Cloud Credit</h3>
          <div className="h-40 rounded-xl bg-linear-to-br from-violet-400 to-indigo-400 flex items-center justify-center">
            <span className="text-white font-semibold">FEATURE DEMO HERE</span>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="sticky top-24 bg-[#fdfcec] p-6 mx-4 rounded-2xl shadow-lg border-2 border-gray-200 mb-4">
          <h3 className="text-xl font-bold text-center mb-4 text-amber-600">GitHub Student Dev Pack</h3>
          <div className="h-40 rounded-xl bg-linear-to-br from-amber-400 to-orange-400 flex items-center justify-center">
            <span className="text-white font-semibold">FEATURE DEMO HERE</span>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="sticky top-28 bg-[#fdfcec] p-6 mx-4 rounded-2xl shadow-lg border-2 border-gray-200 mb-4">
          <h3 className="text-xl font-bold text-center mb-4 text-green-600">JetBrains Student License</h3>
          <div className="h-40 rounded-xl bg-linear-to-br from-green-400 to-emerald-400 flex items-center justify-center">
            <span className="text-white font-semibold">FEATURE DEMO HERE</span>
          </div>
        </div>
        
        {/* Card 4 */}
        <div className="sticky top-32 bg-[#fdfcec] p-6 mx-4 rounded-2xl shadow-lg border-2 border-gray-200 mb-4">
          <h3 className="text-xl font-bold text-center mb-4 text-pink-600">Notion Education</h3>
          <div className="h-40 rounded-xl bg-linear-to-br from-pink-400 to-red-400 flex items-center justify-center">
            <span className="text-white font-semibold">FEATURE DEMO HERE</span>
          </div>
        </div>
        
        {/* Final message */}
        <div className="p-6 mx-4 text-center mb-8">
          <p className="text-gray-600 text-sm font-light">
            And much more...click "Get Them Now" to explore more offers!
          </p>
        </div>
      </div>


    </div>
    </ReactLenis>
  );
};

export default StudentOffersHero;
