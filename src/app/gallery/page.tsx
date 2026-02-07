// src/app/gallery/page.tsx
'use client';

import React, { Suspense } from 'react';
import DomeGallery from '@/components/gallery/DomeGallery';
import { BGPattern } from '@/components/ui/bg-pattern';

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading Gallery...</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen text-black bg-white overflow-hidden relative" style={{ width: '100vw', height: '100vh' }}>
      {/* Background Pattern - Same as Teams Page */}
      <BGPattern variant="grid" mask="fade-x" fill="#D3D3D3" size={50} className="z-0 h-screen" />

      {/* DomeGallery Component */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="relative z-10" style={{ width: '100vw', height: '100vh' }}>
          <DomeGallery />
        </div>
      </Suspense>
    </div>
  );
}
