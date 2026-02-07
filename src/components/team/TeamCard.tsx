'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import CursorTrail from './CursorTrail';

interface TeamCardProps {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  index: number;
}

export default function TeamCard({ 
  name, 
  role, 
  image, 
  linkedin, 
  github, 
  instagram,
  index 
}: TeamCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [startX, setStartX] = useState(-100);
  const [startY, setStartY] = useState(-100);
  const cardRef = useRef<HTMLDivElement>(null);

  // Alternate tilt and vertical offset
  const isEven = index % 2 === 0;
  const initialRotate = isEven ? -3 : 3;
  const initialY = isEven ? -10 : 10;

  return (
    <>
      <CursorTrail name={name} isHovering={isHovering} startX={startX} startY={startY} />
      
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ 
          opacity: 1, 
          y: initialY, 
          scale: 1, 
          filter: "blur(0px)",
          rotate: initialRotate
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.4,
          delay: index * 0.03,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        whileHover={{ 
          y: -8, 
          scale: 1.02, 
          rotate: 0,
          transition: { duration: 0.3 } 
        }}
        onMouseEnter={() => {
          if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setStartX(rect.left + rect.width / 2);
            setStartY(rect.top + rect.height / 2);
          }
          setIsHovering(true);
        }}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
      {/* Colored top border - rotates through Google colors */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, 
            ${index % 4 === 0 ? '#4285F4' : 
              index % 4 === 1 ? '#EA4335' : 
              index % 4 === 2 ? '#FBBC04' : '#34A853'} 0%, 
            ${index % 4 === 0 ? '#34A853' : 
              index % 4 === 1 ? '#4285F4' : 
              index % 4 === 2 ? '#EA4335' : '#FBBC04'} 100%)`
        }}
      />
      
      {/* Image container with hover effect */}
      <div className="relative w-full h-82 md:h-64 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-300">
            {name.charAt(0)}
          </div>
        )}
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Social links - appear on hover on desktop, always visible on mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 sm:translate-y-4 group-hover:translate-y-0">
          {linkedin && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link w-10 h-10 rounded-full text-black bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5 " />
            </motion.a>
          )}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link w-10 text-black h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5 " />
            </motion.a>
          )}
          {instagram && (
            <motion.a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="social-link w-10 text-black h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5 " />
            </motion.a>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-red-600 transition-all duration-300">
          {name}
        </h3>
        <p className="text-gray-600 text-sm font-medium">{role}</p>
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-blue-500 to-red-500 rounded-bl-full" />
      </div>
    </motion.div>
    </>
  );
}
