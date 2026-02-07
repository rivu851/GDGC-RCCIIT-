'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TeamCard from './TeamCard';
import { teamMembers } from '@/data/team';

// Floating shape component (more organic blob-like)
const FloatingShape = ({ 
  color, 
  size, 
  initialX, 
  initialY, 
  duration 
}: { 
  color: string; 
  size: number; 
  initialX: string; 
  initialY: string; 
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-[40%] blur-3xl opacity-20"
    style={{
      backgroundColor: color,
      width: size,
      height: size * 0.85,
      left: initialX,
      top: initialY,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.08, 1],
      rotate: [0, 6, -6, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Organic SVG blob icon (Google-colored)
const BlobIcon = ({ 
  color, 
  delay, 
  position 
}: { 
  color: string; 
  delay: number; 
  position: { top?: string; bottom?: string; left?: string; right?: string };
}) => (
  <motion.svg
    width="72"
    height="72"
    viewBox="0 0 100 100"
    className="absolute opacity-30"
    style={{ ...position }}
    animate={{ rotate: [0, 8, -8, 0], y: [0, -12, 0] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <path
      d="M50 5C65 5 84 12 90 28C96 44 88 64 74 74C60 84 40 95 24 86C8 77 5 55 10 38C15 21 35 5 50 5Z"
      fill={color}
    />
  </motion.svg>
);

const Team_section = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'subcore'>('core');

  // Filter team members based on active tab
  const filteredMembers = teamMembers.filter(member => {
    const role = member.role.toLowerCase();
    if (activeTab === 'core') {
      return role.includes('lead') || role.includes('co-lead') || role.includes('colead') || role.includes('coordinator');
    } else {
      return role.includes('associate');
    }
  });

  return (
    <div className="min-h-screen bg-white rounded-t-3xl relative overflow-hidden py-20">
      {/* Animated Background Elements */}
      <FloatingShape color="#4285F4" size={400} initialX="10%" initialY="10%" duration={8} />
      
      <FloatingShape color="#FBBC04" size={350} initialX="60%" initialY="70%" duration={9} />
   
      
      {/* Floating Google-colored shapes */}
  <BlobIcon color="#4285F4" delay={0} position={{ top: "10%", right: "10%" }} />
  <BlobIcon color="#EA4335" delay={1} position={{ top: "60%", left: "5%" }} />
  <BlobIcon color="#FBBC04" delay={2} position={{ bottom: "20%", right: "15%" }} />
  <BlobIcon color="#34A853" delay={1.5} position={{ top: "40%", right: "5%" }} />
  
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-linear-to-r from-blue-500 via-red-500 to-yellow-500 text-white text-sm font-semibold rounded-full">
              Meet Our Team
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-red-600 to-yellow-600">
              The People Behind
            </span>
            <br />
            <span className="text-gray-900">GDGC RCCIIT</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Passionate developers, designers, and innovators working together to build an amazing tech community
          </motion.p>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="relative flex bg-gray-100 rounded-full p-1 shadow-lg">
            {/* Animated background indicator */}
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-full shadow-md"
              initial={false}
              animate={{
                left: activeTab === 'core' ? '4px' : 'calc(50% - 10px)',
                width: activeTab === 'core' ? 'calc(50% - 2px)' : 'calc(50% + 6px)'
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3
              }}
            />
            <motion.button
              onClick={() => setActiveTab('core')}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 z-10 ${
                activeTab === 'core'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-105'
              }`}
              whileHover={{ scale: activeTab === 'core' ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className='ml-4'>

              Core Team
              </p>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('subcore')}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 z-10 ${
                activeTab === 'subcore'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-105'
              }`}
              whileHover={{ scale: activeTab === 'subcore' ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <p className='ml-4'>
              Subcore Team
              
              </p> 
            </motion.button>
          </div>
        </motion.div>
        
        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-8 max-w-7xl mx-auto"
        >
          {filteredMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.profPic}
              linkedin={member.linkedin}
              github={member.github}
              instagram={member.instagram}
              index={index}
            />
          ))}
        </motion.div>
        
        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-linear-to-br from-blue-50 to-red-50 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">Want to Join Our Team?</h3>
            <p className="text-gray-600 max-w-md">
              We're always looking for passionate individuals to join our growing community
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-not-allowed"
            >
              Recruitment Closed
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-50 to-transparent" />
    </div>
  );
};

export default Team_section;
