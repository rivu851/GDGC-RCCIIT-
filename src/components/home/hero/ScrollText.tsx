"use client";

import React from "react";
import TextAnimation from "@/components/ui/scroll-text";
import { motion } from "framer-motion";

const AnimatedImageLeft = () => (
  <motion.div
    initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="w-full max-w-[300px] md:max-w-[400px]"
  >
    <div className="relative rounded-lg shadow-lg border-4 border-gray-300 p-2 overflow-hidden" style={{ aspectRatio: '1080/1350' }}>
      <video
        src="/assets/scrolltextvdo1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ aspectRatio: '1080/1350' }}
      />
    </div>
  </motion.div>
);

const AnimatedImageRight = () => (
  <motion.div
    initial={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="w-full max-w-[300px] md:max-w-[400px]"
  >
    <div className="relative rounded-lg shadow-lg border-4 border-gray-300 p-2 overflow-hidden" style={{ aspectRatio: '1080/1350' }}>
      <video
        src="/assets/scrolltextvdo2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ aspectRatio: '1080/1350' }}
      />
    </div>
  </motion.div>
);

function Index() {
  return (
    <div className="bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px] min-h-screen text-zinc-800 px-4 md:px-16 lg:px-32 font-['Lexend']">
      <div className="min-h-[120px] flex items-center justify-center">
      </div>
      {/* WRAPPED ALL SECTIONS IN FLEX COL GAP-Y FOR SPACING */}
      <div className="flex flex-col gap-y-16 md:gap-y-24 lg:gap-y-32">
        {/* First Animation Block */}
        <div className="min-h-[200px] flex flex-col justify-center items-center text-center py-8 md:py-10 lg:py-16">
          <TextAnimation
            text="Reimagining the future through innovation and code."
            variants={{
              hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
              visible: {
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                transition: { ease: "linear" },
              },
            }}
            classname="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto capitalize text-black font-semibold font-['Lexend']"
          />
        </div>

        {/* Section: Text Left, Image Right */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-left gap-6 md:gap-10 py-8 md:py-12 lg:py-20">
          <div className="w-full md:flex-1 flex justify-center md:justify-start mt-6 md:mt-0">
            <TextAnimation
              as="p"
              letterAnime={true}
              text="A vibrant community where creativity meets computation."
              classname="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-lg w-full lowercase text-black font-semibold font-['Lexend']"
              variants={{
                hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
                visible: {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.2,
                  },
                },
              }}
            />
          </div>
          <div className="w-full md:flex-1 flex justify-center md:justify-end mb-6 md:mb-0">
            <AnimatedImageLeft />
          </div>
        </div>

        {/* Section: Image Left, Text Right */}
        <div className="flex flex-col md:flex-row justify-between items-center text-right gap-6 md:gap-10 py-8 md:py-12 lg:py-20">
          <div className="w-full md:flex-1 flex justify-center md:justify-start mb-6 md:mb-0 order-2 md:order-1">
            <AnimatedImageRight />
          </div>
          <div className="w-full md:flex-1 flex justify-center md:justify-end mt-6 md:mt-0 order-1 md:order-2">
            <TextAnimation
              text="Crafting real-world solutions with Google technologies"
              direction="right"
              classname="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-lg w-full ml-auto capitalize text-black font-semibold font-['Lexend']"
            />
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="flex justify-center items-center text-center py-10 md:py-16 lg:py-24 px-4">
          <div className="max-w-5xl mx-auto text-black font-['Lexend']">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold">
              Welcome to <br/> <span className="font-bold">GDGC RCCIIT</span>
            </div>
            <div className="flex justify-center items-center mt-4 sm:mt-6 md:mt-8">
              <span className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold md:whitespace-nowrap text-center px-2">
                The Creators&apos; Playground.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
