import React from 'react'
import StudentOffers from '@/components/explore/offers/StudentOffers'

const OffersPage = () => {
  return (
    <div className="bg-[#fdfcec]">
      <StudentOffers />
    </div>
  )
}

export default OffersPage

export const metadata = {
  title: 'Offers — GDGC RCCIIT',
  description: 'Student offers and opportunities shared by GDGC RCCIIT — internships, trainings and community benefits.',
  openGraph: {
    title: 'GDGC RCCIIT Offers',
    description: 'Student offers and opportunities shared by GDGC RCCIIT',
    url: 'https://www.gdgcrcc.tech/offers',
    images: ['/favicon/favicon.svg'],
  },
  twitter: { card: 'summary' },
};
