"use client";
import React, { useState, useEffect, useRef } from "react";
import RotatingText from "@/components/ui/RotatingText";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import JoinButton from "@/components/ui/JoinButton";
import { homePage } from "@/lib/illustrations";
import SnowfallClient from '@/components/ui/SnowfallClient';

const googleColors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const Eye = ({
  eyeColor,
  size,
  pointer,
  scrollY,
  scrollVelocity,
  isMobile,
  heroHeight,
  gravity,
}: {
  eyeColor: string;
  size: number;
  pointer: { x: number; y: number } | null;
  scrollY: number;
  scrollVelocity: number;
  isMobile: boolean;
  heroHeight: number;
  gravity?: { x: number; y: number } | null;
}) => {
  const r = size / 2;
  const pupilR = size * 0.12;
  const scleraR = size * 0.28;
  const eyeRef = useRef<SVGCircleElement | null>(null);

  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [scleraPos, setScleraPos] = useState({ x: 0, y: 0 });

  // Calculate scroll factor relative to hero height, clamped [0,1]
  const scrollProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

  useEffect(() => {
    if (!isMobile && pointer && eyeRef.current) {
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = pointer.x - cx;
      const dy = pointer.y - cy;

      const maxPupilMove = r * 0.3;
      const maxScleraMove = r * 0.22;

      const dist = Math.sqrt(dx * dx + dy * dy);

      const newPupilPos = { x: 0, y: 0 };
      const newScleraPos = { x: 0, y: 0 };

      if (dist > 0) {
        const pupilDist = Math.min(dist, maxPupilMove);
        newPupilPos.x = (dx / dist) * pupilDist;
        newPupilPos.y = (dy / dist) * pupilDist;

        const scleraDist = Math.min(dist, maxScleraMove);
        newScleraPos.x = (dx / dist) * scleraDist;
        newScleraPos.y = (dy / dist) * scleraDist;
      }

      // Add vertical scroll offset (down on scroll down)
      newPupilPos.y += scrollProgress * maxPupilMove;
      newPupilPos.y = Math.min(Math.max(newPupilPos.y, -maxPupilMove), maxPupilMove);

      newScleraPos.y += scrollProgress * maxScleraMove;
      newScleraPos.y = Math.min(Math.max(newScleraPos.y, -maxScleraMove), maxScleraMove);

      setPupilPos(newPupilPos);
      setScleraPos(newScleraPos);
    } else {
      // Mobile or no cursor: eyes follow scroll velocity smoothly
      const maxPupilMove = r * 0.35; // Reduced from 0.5 to prevent touching edges
      const maxScleraMove = r * 0.25; // Reduced from 0.35 to prevent touching edges

      const newPupilPos = { x: 0, y: 0 };
      const newScleraPos = { x: 0, y: 0 };
      // On mobile, prefer device gravity when available
      // gravity.x and gravity.y range from -1..1 (approx). Positive x -> tilt right, positive y -> tilt forward (look down)
      if (gravity && (gravity.x !== 0 || gravity.y !== 0)) {
        newPupilPos.x = gravity.x * maxPupilMove;
        newPupilPos.y = gravity.y * maxPupilMove + scrollVelocity * (maxPupilMove * 0.6);

        newScleraPos.x = gravity.x * maxScleraMove;
        newScleraPos.y = gravity.y * maxScleraMove + scrollVelocity * (maxScleraMove * 0.6);
      } else {
        // Fallback to scroll velocity only
        newPupilPos.y = scrollVelocity * maxPupilMove;
        newScleraPos.y = scrollVelocity * maxScleraMove;
      }

      setPupilPos(newPupilPos);
      setScleraPos(newScleraPos);
    }
  }, [isMobile, pointer, scrollY, scrollVelocity, scrollProgress, r, gravity]);

  return (
    <svg
      width={size}
      height={size}
      className="inline-block"
      style={{
        verticalAlign: "middle",
        display: "inline",
        overflow: "visible",
      }}
    >
      <circle
        ref={eyeRef}
        cx={r}
        cy={r}
        r={r - 3}
        fill="#fff"
        stroke="#666"
        strokeWidth="2"
      />
      <circle
        cx={r + scleraPos.x}
        cy={r + scleraPos.y}
        r={scleraR}
        fill={eyeColor}
        style={{
          transition: isMobile ? "cx 0.3s ease-out, cy 0.3s ease-out" : "none",
        }}
      />
      <circle
        cx={r + pupilPos.x}
        cy={r + pupilPos.y}
        r={pupilR}
        fill="#222"
        style={{
          transition: isMobile ? "cx 0.3s ease-out, cy 0.3s ease-out" : "none",
        }}
      />
    </svg>
  );
};

const Hero = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showEyes, setShowEyes] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  // const [dinoScrollOffset, setDinoScrollOffset] = useState(0); 
  const [taxiScrollProgress, setTaxiScrollProgress] = useState(0);
  const [gravity, setGravity] = useState<{ x: number; y: number } | null>(null);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [showDevfest, setShowDevfest] = useState(false);
  const taxiRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0); // Persist progress across renders
  const targetProgressRef = useRef(0); // Target for smooth interpolation
  const animationFrameRef = useRef<number | null>(null);


  const googleContainer = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const handleOClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount < 3) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } else if (newCount === 3) {
      setShowEyes(true);
      setShowNotification(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      const updateHeight = () => {
        setHeroHeight(heroRef.current?.clientHeight || 1); // fallback 1 to prevent zero div
      };
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % googleColors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      setPointer({ x: e.clientX, y: e.clientY });
    };

    const leave = () => {
      setPointer(null);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [isMobile]);

  // Device orientation for mobile gravity-like eye movement
  useEffect(() => {
    if (!isMobile) return;

    let lastX = 0;
    let lastY = 0;
    let raf: number | null = null;

    const handleOrientation = (ev: DeviceOrientationEvent) => {
      // gamma is the left-to-right tilt in degrees [-90,90]
      // beta is the front-to-back tilt in degrees [-180,180]
      const gamma = ev.gamma ?? 0;
      const beta = ev.beta ?? 0;

      // Normalize to -1..1
      const nx = Math.max(-1, Math.min(1, gamma / 30));
      const ny = Math.max(-1, Math.min(1, beta / 30));

      // Smooth using simple lerp and requestAnimationFrame
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        lastX = lastX + (nx - lastX) * 0.15;
        lastY = lastY + (ny - lastY) * 0.15;
        setGravity({ x: lastX, y: lastY });
      });
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();

      // Calculate scroll velocity (pixels per millisecond)
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        // Normalize velocity to a range of -1 to 1
        const velocity = Math.max(-1, Math.min(1, deltaY / 10));
        setScrollVelocity(velocity);
      }

      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
      lastTime = currentTime;

      // Reset velocity to 0 after 150ms of no scrolling
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollVelocity(0);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  /* COMMENTED OUT UNTIL DEC 21, 2025 - Dinosaur scroll animation for all devices
  useEffect(() => {
    const handleDinoScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroRef.current?.clientHeight || 1000;

      // Calculate progress: 0 at top, 1 when hero section is scrolled past
      const progress = Math.min(scrollPosition / heroHeight, 1);

      // Different starting position for mobile vs desktop
      const isMobile = window.innerWidth < 768;
      const startPercent = isMobile ? 15 : 20; // Start position (closer to center)
      const endPercent = 1; // End position (1% from edges - stays within viewport)

      // Calculate offset: moves from startPercent to endPercent
      const movementPercent = (startPercent - endPercent) / 100; // Convert to decimal
      const viewportWidth = window.innerWidth;
      const maxMovement = viewportWidth * movementPercent;

      // Calculate offset based on progress
      const offset = progress * maxMovement;
      setDinoScrollOffset(offset);
    };

    handleDinoScroll(); // Initial call
    window.addEventListener("scroll", handleDinoScroll, { passive: true });
    window.addEventListener("resize", handleDinoScroll);
    return () => {
      window.removeEventListener("scroll", handleDinoScroll);
      window.removeEventListener("resize", handleDinoScroll);
    };
  }, []);
  */

  // Scroll Lock while taxi animates then release
  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [scrollLocked, isMobile]);

  // Smooth animation loop for buttery smooth movement
  useEffect(() => {
    const animate = () => {
      // Smooth interpolation towards target
      const diff = targetProgressRef.current - progressRef.current;
      
      if (Math.abs(diff) > 0.001) {
        // Lerp (linear interpolation) for super smooth movement
        progressRef.current += diff * 0.12; // 0.12 = smoother (lower = smoother but slower catch-up)
        
        const progress = progressRef.current;
        
        // Update taxi position
        if (taxiRef.current) {
          const leftPos = progress * 100;
          taxiRef.current.style.left = `${leftPos}%`;
          taxiRef.current.style.transform = `translateX(-${leftPos}%)`;
        }

        // Update text reveal
        if (textRef.current) {
          const revealStart = 0.4;
          const revealProgress = Math.max(0, (progress - revealStart) / (1 - revealStart));
          const clipValue = Math.max(0, 100 - (revealProgress * 100));
          textRef.current.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
          textRef.current.style.opacity = progress >= revealStart ? '1' : '0';
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Yellow Taxi scroll animation - ultra smooth with interpolation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLocked) {
        e.preventDefault();
        
        // Update target progress (not actual progress)
        const delta = e.deltaY / 300;
        targetProgressRef.current += delta;
        targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current));
        
        const target = targetProgressRef.current;
        
        // Unlock at end
        if (target >= 0.98) {
          setScrollLocked(false);
        }
      } else {
        // Re-lock when scrolling back at top
        if (window.scrollY <= 10 && e.deltaY < 0) {
          e.preventDefault();
          setScrollLocked(true);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // --- Mobile touch handling (swipe to advance taxi) ---
    // Only attach touch handlers on mobile to avoid interfering with desktop input.
    let touchStartY: number | null = null;
    let lastTouchY: number | null = null;
    let isDragging = false;
    const DRAG_THRESHOLD = 6; // pixels before we consider it a drag

    const handleTouchStart = (ev: TouchEvent) => {
      if (!scrollLocked) return;
      if (ev.touches.length !== 1) return;
      touchStartY = ev.touches[0].clientY;
      lastTouchY = touchStartY;
      isDragging = false;
    };

    const handleTouchMove = (ev: TouchEvent) => {
      if (!scrollLocked) return;
      if (ev.touches.length !== 1 || touchStartY === null) return;
      const y = ev.touches[0].clientY;
      const delta = lastTouchY !== null ? (lastTouchY - y) : 0; // positive when swiping up
      lastTouchY = y;

      // If movement exceeds threshold, treat as drag and prevent default to stop page scroll
      if (!isDragging && Math.abs((touchStartY ?? 0) - y) > DRAG_THRESHOLD) {
        isDragging = true;
      }

      if (!isDragging) return; // small movement -> treat as tap, don't consume

      // Prevent the browser's native scroll on touchmove
      if (ev.cancelable) ev.preventDefault();

      // Convert vertical swipe to progress change similar to wheel
      const baseDelta = delta / 300;
      const mobileMultiplier = isMobile ? 3 : 1;
      const deltaProgress = baseDelta * mobileMultiplier;
      targetProgressRef.current += deltaProgress;
      targetProgressRef.current = Math.max(0, Math.min(1, targetProgressRef.current));

      if (targetProgressRef.current >= 0.98) {
        setScrollLocked(false);
      }
    };

    const handleTouchEnd = () => {
      touchStartY = null;
      lastTouchY = null;
      isDragging = false;
    };

    const taxiEl = taxiRef.current;

    if (isMobile) {
      // Attach to window to capture gestures anywhere on screen. Also keep taxi as a fallback.
      window.addEventListener("touchstart", handleTouchStart, { passive: true } as EventListenerOptions);
      // touchmove must be non-passive so preventDefault works
      window.addEventListener("touchmove", handleTouchMove, { passive: false } as EventListenerOptions);
      window.addEventListener("touchend", handleTouchEnd, { passive: true } as EventListenerOptions);

      if (taxiEl) {
        taxiEl.addEventListener("touchstart", handleTouchStart, { passive: true } as EventListenerOptions);
        taxiEl.addEventListener("touchmove", handleTouchMove, { passive: false } as EventListenerOptions);
        taxiEl.addEventListener("touchend", handleTouchEnd, { passive: true } as EventListenerOptions);
      }
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart as EventListener);
        window.removeEventListener("touchmove", handleTouchMove as EventListener);
        window.removeEventListener("touchend", handleTouchEnd as EventListener);
        if (taxiEl) {
          taxiEl.removeEventListener("touchstart", handleTouchStart as EventListener);
          taxiEl.removeEventListener("touchmove", handleTouchMove as EventListener);
          taxiEl.removeEventListener("touchend", handleTouchEnd as EventListener);
        }
      }
    };
  }, [scrollLocked, isMobile]);


  // Responsive sizing: font sizes and eye sizes handled with CSS clamp and relative units
  // Keep viewportWidth for some movement math when needed
  // We'll compute a derived value for eye size as fallback for inline SVG when necessary
  const targetWidth = Math.max(320, Math.min(viewportWidth || 1024, 1400));
  const calculatedFontSize = Math.max(28, Math.min(targetWidth / 6, 120));
  const eyeSize = Math.max(28, Math.min(calculatedFontSize * 0.8, 110));

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
   
    <div
    
      ref={heroRef}
      data-scroll
      data-scroll-speed="-.3"
      className="relative w-full min-h-screen bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px] flex justify-center items-center overflow-hidden"

    >
       <SnowfallClient  />
      {/* DECOR - UNCHANGED */}
      <motion.img
        src="/assets/left_kite.svg"
        alt="left_kite"
        width={200}
        height={200}
        loading="lazy"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] sm:top-[30%] left-0 w-[22vw] sm:w-[10vw] pointer-events-none z-2"
      />
      <motion.img
        src="/assets/right_kite.svg"
        alt="right_kite"
        width={200}
        height={200}
        loading="lazy"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[42%] right-0 w-[22vw] sm:w-[10vw] pointer-events-none z-2"
      />
      <motion.img
        src="/assets/cloud_1.svg"
        alt="cloud_1"
        width={200}
        height={200}
        loading="lazy"
        style={{ scale }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] md:top-[8%] md:left-[27%] w-[36vw] sm:w-[17vw] pointer-events-none"
      />
      <motion.img
        src="/assets/cloud_2.svg"
        alt="cloud_2"
        width={200}
        height={200}
        loading="lazy"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[15%] w-[12vw] sm:w-[3vw] pointer-events-none"
      />
      <motion.img
        src="/assets/cloud_3.svg"
        alt="cloud_3"
        width={200}
        height={200}
        loading="lazy"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[7%] left-[17%] w-[14vw] sm:w-[7vw] pointer-events-none"
      />
      {/* COMMENTED OUT UNTIL DEC 21, 2025 - Left Dinosaur - moves from center-left TO far left */}
      {/* <motion.img
        src={homePage.blackDaino}
        alt="black_diano_left"
        width={300}
        height={140}
        loading="lazy"
        style={{
          left: `calc(${viewportWidth < 768 ? '15%' : '20%'} - ${dinoScrollOffset}px)`,
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 w-[18vw] sm:w-[12vw] md:w-[10vw] pointer-events-none z-20"
      /> */}
      {/* <motion.img
        src={homePage.blackDaino}
        alt="black_diano_right"
        width={300}
        height={140}
        loading="lazy"
        style={{
          right: `calc(${viewportWidth < 768 ? '15%' : '20%'} - ${dinoScrollOffset}px)`,
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-0 w-[18vw] sm:w-[12vw] md:w-[10vw] pointer-events-none z-20 scale-x-[-1]"
      /> */}

      {/* Yellow Taxi - ultra smooth with no vibration */}
      <div
        ref={taxiRef}
        style={{
          position: 'absolute',
          bottom: isMobile ? '16vh' : 0,
          left: '0%',
          transform: 'translateX(0%)',
          willChange: 'transform, left',
          zIndex: 20,
        }}
        onClick={() => {
          window.open('/events', '_blank');
        }}
        className="w-[28vw] sm:w-[26vw] md:w-[18vw] lg:w-[15vw] xl:w-[13vw] pointer-events-auto cursor-pointer"
      >
        <Image
          src="/assets/taxi-snow2.png"
          alt="yellow_taxi"
          width={450}
          height={350}
          loading="lazy"
          className="w-full h-auto"
          draggable={false}
        />
      </div>

      {/* DevFest announcement - ultra smooth reveal */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          bottom: isMobile ? '20vh' : '8vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0,
          willChange: 'clip-path, opacity',
        }}
        className="pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          {/* Main announcement */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Google colored dots - left side */}
            <div className="flex gap-0.5 sm:gap-1.5">
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#4285F4]" />
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#EA4335]" />
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#FBBC05]" />
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#34A853]" />
            </div>
            
            {/* Announcement text */}
            <p 
              className="text-sm sm:text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap"
              style={{ 
                textShadow: "3px 3px 10px rgba(0,0,0,0.15)"
              }}
            >
              <span className="text-[#4285F4]">Show</span>
              <span className="text-[#EA4335]">Case </span>
              <span className="text-[#FBBC05]">X </span>
              <span className="text-gray-700">by </span>
              <span className="text-[#4285F4]">GDGC </span>
              <span className="text-[#EA4335]">RCCIIT </span>
              <span className="text-[#34A853]">is here</span>
            </p>
            
            {/* Google colored dots - right side */}
            <div className="flex gap-0.5 sm:gap-1.5">
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#4285F4]" />
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#EA4335]" />
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#FBBC05]" />
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#34A853]" />
            </div>
          </div>
          
          {/* Click instruction */}
          <span className="text-[10px] sm:text-base md:text-lg text-gray-700 font-semibold bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg border border-gray-200 inline-block">
            👉 Click the taxi to explore
          </span>
        </div>
      </div>

      {/* LOGO - Responsive sizing */}
      <Image
        src={homePage.gdgOnCampus}
        alt="GDGC Logo"
        width={420}
        height={420}
        loading="lazy"
        className="hidden md:block absolute top-[3revh] sm:top-[4vw] left-1/2 -translate-x-1/2 w-20 sm:w-32 md:w-40 lg:w-52 xl:w-[280px] z-30 select-none pointer-events-none"
        draggable={false}
      />

      {/* HERO CENTER - SHIFTED UP & CENTERED */}
      <div className="relative text-center font-['Lexend'] z-10 w-full -mt-[2vh]">
        {/* Mobile logo - positioned ABOVE google text with proper spacing */}
        <div className="md:hidden flex justify-center mb-4 pointer-events-none z-40">
          <Image
            src={homePage.gdgOnCampus}
            alt="GDGC Mobile Logo"
            width={420}
            height={420}
            loading="lazy"
            className="w-40 sm:w-48 filter drop-shadow-lg"
            draggable={false}
          />
        </div>

        <div
          ref={googleContainer}
          className="relative w-full flex justify-center mb-4 select-none"
        >
          <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
            <h1
              className="flex flex-nowrap items-center justify-center leading-none whitespace-nowrap font-semibold"
              style={{
                fontSize: `${calculatedFontSize}px`,
                gap: "0.05em",
              }}
            >
              <span className="text-[#4285F4]">G</span>
              {showEyes ? (
                <span className="inline-flex items-center">
                  <Eye
                    eyeColor="#EA4335"
                    size={eyeSize}
                    pointer={pointer}
                    scrollY={scrollY}
                    scrollVelocity={scrollVelocity}
                    isMobile={isMobile}
                    heroHeight={heroHeight}
                    gravity={gravity}
                  />
                </span>
              ) : (
                <span
                  className="text-[#EA4335] cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleOClick}
                >
                  o
                </span>
              )}
              {showEyes ? (
                <span className="inline-flex items-center">
                  <Eye
                    eyeColor="#FBBC05"
                    size={eyeSize}
                    pointer={pointer}
                    scrollY={scrollY}
                    scrollVelocity={scrollVelocity}
                    isMobile={isMobile}
                    heroHeight={heroHeight}
                    gravity={gravity}
                  />
                </span>
              ) : (
                <span
                  className="text-[#FBBC05] cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleOClick}
                >
                  o
                </span>
              )}
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </h1>
          </div>
        </div>

        {/* Notification */}
        {showNotification && !showEyes && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce mt-12">
            Click me {3 - clickCount} more{" "}
            {3 - clickCount === 1 ? "time" : "times"}!
          </div>
        )}

        {/* MOVED UP with reduced margins */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-zinc-900 mt-2 px-4">
          Developer&apos;s Group On
          <span style={{ color: "#4285F4" }}>C</span>
          <span style={{ color: "#EA4335" }}>a</span>
          <span style={{ color: "#FBBC05" }}>m</span>
          <span style={{ color: "#4285F4" }}>p</span>
          <span style={{ color: "#34A853" }}>u</span>
          <span style={{ color: "#EA4335" }}>s</span>
        </h1>

        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold text-black mt-1 px-4">
          RCCIIT
        </h2>

        <h3 className="text-black mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl flex flex-wrap justify-center items-center px-4 gap-1">
          <span>Converting Ideas into&nbsp;</span>
          <RotatingText
            texts={[
              "Reality",
              "Innovation",
              "Success",
              "Solutions",
              "Impact",
              "Experiences",
              "Growth",
              "Designs",
              "Ideas",
              "Dreams",
              "Vision",
              "Future",
              "Creativity",
              "Possibilities",
              "Opportunities",
            ]}
            mainClassName="inline-block px-3 overflow-hidden text-white p-2 rounded-xl"
            style={{ backgroundColor: googleColors[colorIndex] }}
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={1500}
          />
        </h3>

        {/* JOIN BUTTON - Positioned at dino face level */}
        <div className="mt-4 sm:mt-6 flex justify-center px-4">
          <div className="w-full sm:w-auto max-w-xs">
            <JoinButton href="https://chat.whatsapp.com/B5XAPwqpfor56TkohzyUuM?mode=ems_copy_t" />
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs text-gray-500 md:hidden">
        <p>↓ Scroll to see eyes move ↓</p>
      </div> */}
    </div>
  );
};

export default Hero;
