
import AboutWrapper from '@/components/home/about/AboutWrapper'
import HeroWrapper from '@/components/home/hero/HeroWrapper'
import TeamWrapper from '@/components/home/teams/TeamWrapper'
import StudentOffersHero from '@/components/explore/offers/StudentOffersHero'
import React from 'react'
import { ReactLenis } from 'lenis/react';
import Footer from '@/components/shared/Footer';
import Marquee from '@/components/home/hero/Marquee';
import ScrollText from '@/components/home/hero/ScrollText';
import AboutPreviousComingEvents from '@/components/home/about/AboutPreviousComingEvents';

export const metadata = {
  title: 'Home — GDGC RCCIIT',
  description: 'Official Website of Google Developer Group On Campus, RCCIIT — events, teams, projects and opportunities for students.',
  openGraph: {
    title: 'GDGC RCCIIT',
    description: 'Official Website of Google Developer Group On Campus, RCCIIT',
    url: 'https://www.gdgcrcc.tech/',
    images: ['/favicon/favicon.svg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};
const page = () => {
  return (
    
    <ReactLenis root>  
    <div className='bg-[#fdfcec] overflow-x-hidden lg:overflow-x-visible'>
       <HeroWrapper />
    </div>
       
    </ReactLenis>
  )
}

export default page