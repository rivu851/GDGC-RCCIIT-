"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import EventSlideUp from "./EventSlideUp";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

function TiltCard({
  children,
  className = "",
  ...rest
}: HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxSpring = useSpring(rx, { stiffness: 420, damping: 18, mass: 0.8 });
  const rySpring = useSpring(ry, { stiffness: 420, damping: 18, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 8; // left/right
    const rotateX = -((y - midY) / midY) * 8; // up/down
    rx.set(rotateX);
    ry.set(rotateY);
  };

  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rxSpring, rotateY: rySpring, transformPerspective: 1000 }}
      className={"transform-gpu will-change-transform " + className}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    // Determine which item is closest to the viewport center
    const centerY = window.innerHeight / 2;
    let minDist = Number.POSITIVE_INFINITY;
    let closest = 0;
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - centerY);
      if (dist < minDist) {
        minDist = dist;
        closest = idx;
      }
    });
    setActiveIndex(closest);
  });

  useEffect(() => {
    const onResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="w-full text-black font-sans md:px-10 relative flex flex-col items-center"
      ref={containerRef}
    >
      <style>{`
        @keyframes bounce-down {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(6px);
          }
        }
        .arrow-bounce {
          animation: bounce-down 2s ease-in-out infinite;
          display: inline-block;
          margin-left: 8px;
        }
      `}</style>
      <div className="max-w-7xl mx-auto py-55 pt-25  px-4 md:px-8 lg:px-10 text-center sm:py-20">
        <h2 className="text-lg md:text-4xl mb-4 text-black max-w-4xl">
          Events That Shapes!
        </h2>
      
       
      </div>
       <p className=" gap-2 animate-bounce absolute top-65 border-blue-400 px-5 py-2 border-2 rounded-full flex items-center justify-center">
          Scroll To Explore
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </span>
        </p>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={item.title || index}
            className="flex  justify-start pt-10 md:pt-40 md:gap-10"
            ref={(el) => { itemRefs.current[index] = el; }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center transition-colors duration-300"
              >
                <div
                  className={`h-4 w-4 rounded-full border p-2 transition-colors duration-300 ${
                    activeIndex === index
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-neutral-300"
                  }`}
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <TiltCard
              className="min-w-sm lg:min-w-3xl -top-10 relative pl-20 pr-4 md:pl-4 p-10 cursor-pointer rounded-xl overflow-hidden transform-gpu will-change-transform transition-colors duration-150 ease-out hover:bg-white/15 hover:backdrop-blur-md hover:ring-1 hover:ring-white/10 hover:shadow-lg"
              onClick={() => setSelectedIndex(index)}
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold ">
                {item.title}
              </h3>
              {item.content}{" "}
            </TiltCard>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-0.5 bg-linear-to-t from-purple-500 via-blue-500 to-transparent from-0% via-10% rounded-full"
          />
        </div>
      </div>
      <EventSlideUp
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        year={selectedIndex !== null ? parseInt(data[selectedIndex].title) || undefined : undefined}
        title={selectedIndex !== null ? data[selectedIndex].title : undefined}
      >
        {selectedIndex !== null ? data[selectedIndex].content : null}
      </EventSlideUp>
    </div>
  );
};
