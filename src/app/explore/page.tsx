import React from 'react'
import StudyJams from '@/components/explore/studyjams/StudyJams'
import StudentOffersHero from '@/components/explore/offers/StudentOffersHero'
import Index from '@/components/explore/Explore_hero'
import ReactLenis from 'lenis/react'
import OffersPage from '@/components/explore/offerrsPage'


const page = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
    {/* Explore Hero - normal flow */}
    <div className="sticky -top-[45vh]">
     <Index />
    </div>
    
    {/* Offers Page - will stack on scroll on small screens, normal flow on desktop */}
    <div className="">
      <OffersPage />
    </div>
    </ReactLenis>
  )
}

export default page

export const metadata = {
  title: 'Explore — GDGC RCCIIT',
  description: 'Explore offers, study jams, projects and other learning opportunities from GDGC RCCIIT.',
  openGraph: {
    title: 'Explore — GDGC RCCIIT',
    description: 'Explore offers, study jams, projects and other learning opportunities from GDGC RCCIIT',
    url: 'https://www.gdgcrcc.tech/explore',
    images: ['/favicon/favicon.svg'],
  },
  twitter: { card: 'summary' },
};
