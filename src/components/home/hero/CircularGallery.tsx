import React from 'react';
import { Component } from '@/components/ui/circular-gallery';
import {galleryItems} from '@/lib/illustrations';

const DemoOne = [
  { image: galleryItems.img1, text: 'Bridge' },
  { image: galleryItems.img2, text: 'Desk Setup' },
  { image: galleryItems.img3, text: 'Waterfall' },
  { image: galleryItems.img4, text: 'Strawberries' },
  { image: galleryItems.img5, text: 'Deep Diving' },
  { image: galleryItems.img6, text: 'Train Track' },
  { image: galleryItems.img7, text: 'Santorini' },
  { image: galleryItems.img8, text: 'Blurry Lights' },
  { image: galleryItems.img9, text: 'New York' },
  { image: galleryItems.img10, text: 'Good Boy' },
  { image: galleryItems.img11, text: 'Coastline' },
  { image: galleryItems.img12, text: 'Palm Trees' },
];

const CircularGallery = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px]">
      <div className=" top-20 w-full max-w-[90vw] mx-auto h-[80vh] overflow-hidden relative bg-[#fdfcec] bg-[radial-gradient(#999_1px,transparent_1px)] bg-size-[20px_20px] border-none shadow-none flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-zinc-700 mb-6 md:mb-8 mt-4 tracking-wide font-['Jersey_10'] text-center px-4">
          Catch the Recent Vibes
        </h1>
        <Component
          items={DemoOne}
          bend={3}
          textColor="#000000"
          borderRadius={0.05}
          autoRotationSpeed={0.1}
        />
      </div>
    </div>
  );
};

export default CircularGallery;
