'use client'
import React, { useEffect } from 'react'
import TeamsHero from '@/components/team/TeamsHero'
import ReactLenis from 'lenis/react'
import Team_section from '@/components/team/Team_section'

const page = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root>
      <section className='sticky top-0 z-0'>
        <TeamsHero />
      </section>
      <div className='relative z-10 mt-[5vh]'>
        <Team_section />
      </div>
    </ReactLenis>
  )
}

export default page
