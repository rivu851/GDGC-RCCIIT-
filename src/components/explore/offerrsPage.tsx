'use client';
import React from 'react';
import { BGPattern } from '../ui/bg-pattern';
import { motion } from 'framer-motion';
import  Link  from 'next/link';
import { ArrowRightIcon, GithubIcon } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { SiFigma, SiGooglecloud, SiJetbrains, SiNotion } from "react-icons/si";

export default function OffersPage() {
  return (
    <div className="relative isolate min-h-screen bg-white overflow-hidden">
      {/* Background with proper isolation */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-green-50 -z-10" />
      <BGPattern variant="grid" mask="fade-y" fill="#4285F4" size={50} className="absolute inset-0 opacity-20 -z-10" />

      {/* Google-themed floating elements */}
      <div className="absolute inset-0 -z-5">
        {/* Floating Google dots */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-3 h-3 bg-[#4285F4] rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -80, 120, 0],
            y: [0, 100, -40, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-20 w-2 h-2 bg-[#EA4335] rounded-full opacity-40"
        />
        <motion.div
          animate={{
            x: [0, 60, -100, 0],
            y: [0, -60, 80, 0],
            rotate: [0, 90, 270],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 left-20 w-4 h-4 bg-[#FBBC04] rounded-full opacity-25"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 40, -100, 0],
            rotate: [0, -90, -270],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-3 h-3 bg-[#34A853] rounded-full opacity-35"
        />

        {/* Google-style geometric shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-1/4 w-6 h-6 border-2 border-[#4285F4] rounded-lg opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-32 left-1/3 w-5 h-5 bg-[#EA4335] rounded-full opacity-15"
        />
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-10 w-8 h-2 bg-[#FBBC04] rounded-full opacity-20"
        />
      </div>
      
      {/* Content wrapper with padding */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Google theme */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-10 relative"
        >
          {/* Animated Google dots around header */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-4 -left-4 w-3 h-3 bg-[#4285F4] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -top-2 -right-6 w-2 h-2 bg-[#EA4335] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-4 left-1/4 w-2.5 h-2.5 bg-[#FBBC04] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute -bottom-2 right-1/3 w-2 h-2 bg-[#34A853] rounded-full"
          />

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#4285F4] rounded-full"></span>
            <span className="w-2 h-2 bg-[#EA4335] rounded-full"></span>
            <span className="w-2 h-2 bg-[#FBBC04] rounded-full"></span>
            <span className="w-2 h-2 bg-[#34A853] rounded-full"></span>
            <div className="text-slate-600 text-sm font-medium ml-2 tracking-wider">
              STUDENT RESOURCES
            </div>
          </div>
          <h1 className="text-slate-900 font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#4285F4]">Explore</span>{' '}
            <span className="text-[#EA4335]">Student</span>{' '}
            <span className="text-[#FBBC04]">Offers</span>
          </h1>
        </motion.div>

        {/* Grid with enhanced Google-themed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Google Cloud Card */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 lg:p-8 shadow-lg bg-white border-2 border-[#4285F4]/20 relative overflow-hidden"
          >

            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl text-[#4285F4]"><SiGooglecloud /></div>
              <div className="text-[#4285F4] text-sm font-bold tracking-widest">
                GOOGLE CLOUD
              </div>
            </div>
            <h3 className="text-slate-900 text-lg lg:text-xl font-bold mb-2">Cloud Credits</h3>
            <p className="text-slate-600 text-sm mb-4">
              Get $300 in Google Cloud credits for students to build and deploy applications.
            </p>
            <Link href='https://cloud.google.com/free' className="flex items-center gap-2">
              <span className="text-[#34A853] text-sm font-semibold">Free for Students</span>
              <svg className="w-4 h-4 text-[#34A853]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>

          {/* GitHub Student Pack - spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2 rounded-3xl p-6 lg:p-8 shadow-lg flex flex-col bg-linear-to-br from-slate-900 to-slate-800 min-h-[500px] lg:min-h-[600px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl"><GithubIcon /></div>
              <div className="text-white text-sm font-bold tracking-widest">
                GITHUB STUDENT
              </div>
            </div>
            <h3 className="text-white text-xl lg:text-2xl font-bold mb-4">Developer Pack</h3>
            <p className="text-slate-300 text-sm mb-6">
              Access to industry-leading developer tools including GitHub Pro, cloud services, and more.
            </p>
            
            {/* Feature pills */}
            <div className='flex-col flex gap-8 h-full'>

            <div className="flex flex-wrap gap-2 mb-8">
              {['GitHub Pro', 'Azure Credits', 'Heroku', 'Canva Pro', 'JetBrains'].map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-3 py-1 bg-[#4285F4] text-white text-xs rounded-full font-medium"
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            {/* Illustration cards - optimized */}
            <div className='flex justify-center'>
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
               <DotLottieReact 
                 src="/Programming Animation.lottie"
                 autoplay
                 loop
                 className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[800px] h-auto"
               />
             </motion.div>
             
            </div>
              <Link href='https://education.github.com/pack' className="flex items-center gap-2 mt-10 text-white">
              <span className=" text-sm font-semibold">Apply Now</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            </div>
              
          </motion.div>

          {/* JetBrains Card */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 lg:p-8 shadow-lg bg-white border-2 border-[#EA4335]/20 relative overflow-hidden"
          >

            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl text-black"><SiJetbrains /></div>
              <div className="text-[#EA4335] text-sm font-bold tracking-widest">
                JETBRAINS
              </div>
            </div>
            <h3 className="text-slate-900 text-lg lg:text-xl font-bold mb-2">All Products Pack</h3>
            <p className="text-slate-600 text-sm mb-4">
              Free access to all JetBrains IDEs including IntelliJ, PyCharm, WebStorm.
            </p>
            <Link href='https://www.jetbrains.com/community/education/' className="flex items-center gap-2">
              <span className="text-[#EA4335] text-sm font-semibold">Learn More</span>
              <svg className="w-4 h-4 text-[#EA4335]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>

          {/* Notion Card */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 lg:p-8 shadow-lg bg-white border-2 border-[#FBBC04]/20 relative overflow-hidden"
          >

            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl text-black"><SiNotion /></div>
              <div className="text-[#FBBC04] text-sm font-bold tracking-widest">
                NOTION
              </div>
            </div>
            <h3 className="text-slate-900 text-lg lg:text-xl font-bold mb-2">Education Plan</h3>
            <p className="text-slate-600 text-sm mb-4">
              Free Notion Plus for students to organize notes, projects, and collaborate.
            </p>
            <Link href='https://www.notion.so/product/notion-for-education' className="flex items-center gap-2">
              <span className="text-[#FBBC04] text-sm font-semibold">Get Started</span>
              <svg className="w-4 h-4 text-[#FBBC04]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>

          {/* Figma Card */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            className="rounded-3xl p-6 lg:p-8 shadow-lg bg-white border-2 border-[#34A853]/20 relative overflow-hidden"
          >

            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl text-black"><SiFigma /></div>
              <div className="text-[#34A853] text-sm font-bold tracking-widest">
                FIGMA
              </div>
            </div>
            <h3 className="text-slate-900 text-lg lg:text-xl font-bold mb-2">Student License</h3>
            <p className="text-slate-600 text-sm mb-4">
              Professional design and prototyping tools free for students and educators.
            </p>
            <Link href='https://www.figma.com/education/' className="flex items-center gap-2">
              <span className="text-[#34A853] text-sm font-semibold">Apply Now</span>
              <svg className="w-4 h-4 text-[#34A853]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
        
          </motion.div>
        </div>
      <div className="pt-10 flex justify-center">
        <Link
          href="/offers"
          className="inline-flex items-center gap-3 px-5 py-3 bg-[#4285F4] text-white rounded-lg font-semibold shadow-md hover:bg-[#2b6ad6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4]"
          aria-label="Explore more offers"
        >
          <span className="text-white">
            <span className="text-white font-medium">Explore</span>{' '}
            <span className="font-semibold">More Offers</span>
          </span>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
      </div>
      </div>
    </div>
  );
}