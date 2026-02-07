import AboutUsWrapper from '@/components/aboutus/aboutUsWrapper'
import React from 'react'

const page = () => {
  return (
    <div>
      <AboutUsWrapper />
    </div>
  )
}

export default page

export const metadata = {
  title: 'About — GDGC RCCIIT',
  description: 'Learn about Google Developer Group on Campus at RCCIIT — our mission, team, and activities.',
  openGraph: {
    title: 'About GDGC RCCIIT',
    description: 'Learn about Google Developer Group on Campus at RCCIIT',
    url: 'https://www.gdgcrcc.tech/about',
    images: ['/favicon/favicon.svg'],
  },
  twitter: {
    card: 'summary',
  },
};
