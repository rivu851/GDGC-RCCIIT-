import { StudyJams } from '@/components/explore/studyjams'
import React from 'react'

const page = () => {
  return (
    <div>
      <StudyJams/>
    </div>
  )
}

export default page

export const metadata = {
  title: 'Study Jams — GDGC RCCIIT',
  description: 'Hands-on study jams and workshops organized by GDGC RCCIIT to help students learn and build projects together.',
  openGraph: {
    title: 'Study Jams — GDGC RCCIIT',
    description: 'Hands-on study jams and workshops organized by GDGC RCCIIT',
    url: 'https://www.gdgcrcc.tech/studyjam',
    images: ['/favicon/favicon.svg'],
  },
  twitter: { card: 'summary' },
};
