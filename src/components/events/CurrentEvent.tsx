'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import CursorTrail from '../team/CursorTrail';

const CurrentEvent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  // Spring for tight follow (fast, low lag)
  const springX = useSpring(cursorX, { stiffness: 1200, damping: 80 });
  const springY = useSpring(cursorY, { stiffness: 1200, damping: 80 });
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (bannerRef.current) {
      const rect = bannerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorX.set(x);
      cursorY.set(y);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    window.open("https://vision.hack2skill.com/event/gdgoc-25-showcasex?utm_source=hack2skill&utm_medium=homepage");
  };

  const containerStyle = isMobile ? {
    width: '70vw',
    maxWidth: '280px',
    aspectRatio: '2/3',
  } : {
    height: '40vh',
    width: '70vw',
  };

  const [startCoords, setStartCoords] = useState({ x: -100, y: -100 });

  return (

    <div className="relative z-20 w-full flex items-center justify-center md:mt-40 mt-20 px-4">

      <div className="hidden">
        <Image
          src="/assets/current event_mobile.svg"
          alt="preload mobile"
          width={280}
          height={420}
          priority
        />
        <Image
          src="/assets/current event 3.svg"
          alt="preload desktop"
          width={800}
          height={400}
          priority
        />
      </div>

     


      <motion.div
        ref={bannerRef}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
        className='relative rounded-4xl mx-auto flex items-center justify-center overflow-hidden cursor-pointer'
        style={{
          ...containerStyle,
          background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853, #4285F4) border-box',
          borderWidth: '4px',
          borderStyle: 'solid',
          borderColor: 'transparent'
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: `0 20px 60px rgba(66, 133, 244, 0.4)`,
          transition: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        <div className="relative w-full h-full">
          <Image
            key={isMobile ? 'mobile' : 'desktop'}
            src={isMobile ? "/assets/current event_mobile.svg" : "/assets/current event 3.svg"}
            alt="Current Event"
            fill
            className="object-cover"
            priority
            sizes={isMobile ? "70vw" : "70vw"}
          />
        </div>

      </motion.div>
    </div>
  );
};


export default CurrentEvent;