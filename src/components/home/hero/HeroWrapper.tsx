import React from 'react'
import Hero from './HeroSection'
import Marquee from './Marquee'
import ScrollText from '@/components/home/hero/ScrollText';
import CircularGallery from './CircularGallery'; 
import { ScrollContainer } from './ScrollContainer';
import AboutWrapper from '../about/AboutWrapper';
const HeroWrapper = () => {
  return (
    <div className=''>
     <Hero />
     <Marquee/>
    <ScrollText/>
   <CircularGallery/>
   <div className='sticky -top-[100vh]'>
    <ScrollContainer/>
   </div>
   <AboutWrapper/>
    </div>
  )
}

export default HeroWrapper
