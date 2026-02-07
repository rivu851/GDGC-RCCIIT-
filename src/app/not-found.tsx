'use client';

import Link from 'next/link';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { BGPattern } from '@/components/ui/bg-pattern';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/404 Character Animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
         <BGPattern variant="grid" mask="fade-x" fill="#D3D3D3" size={70} className="z-0 h-screen" />
      
      <div className="text-center flex flex-col items-center p-6 z-10">
        {animationData && (
          <motion.div 
            className="w-64 h-64 mb-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              duration: 0.6
            }}
          >
            <Lottie animationData={animationData} loop={true} />
          </motion.div>
        )}
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}