'use client';
import React from 'react'
import AboutUsHero from './aboutUsHero'
import AboutUsStackingCards from './AboutUsStackingCards'
import { ReactLenis } from 'lenis/react'

const AboutUsWrapper = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {/* Hero Section - Sticky at top */}
      <div className='sticky -top-[40vh]'>
        <AboutUsHero />
      </div>
      
      {/* Stacking Cards Section - Will appear on scroll */}
      <div className='relative z-10'>
        <AboutUsStackingCards />
      </div>
    </ReactLenis>
  )
}

export default AboutUsWrapper
