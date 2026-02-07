'use client'
import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { Liquid } from '@/components/ui/button-1'

const COLORS = {
  color1: '#FFFFFF', // White for transitions
  color2: '#8ab4f8', // Google Blue (lighter)
  color3: '#f28b82', // Google Red (lighter)
  color4: '#fde293', // Google Yellow (lighter)
  color5: '#81c995', // Google Green (lighter)
  color6: '#4285F4', // Google Blue
  color7: '#EA4335', // Google Red
  color8: '#FBBC05', // Google Yellow
  color9: '#34A853', // Google Green
  color10: '#aecbfa', // Google Blue (even lighter)
  color11: '#fad1cf', // Google Red (even lighter)
  color12: '#fef0c3', // Google Yellow (even lighter)
  color13: '#ceead6', // Google Green (even lighter)
  color14: '#8ab4f8', // Lighter blue repeat
  color15: '#f28b82', // Lighter red repeat
  color16: '#fde293', // Lighter yellow repeat
  color17: '#81c995', // Lighter green repeat
}

const JoinButton: React.FC<{ href?: string }> = ({ href = 'https://gdg.community.dev/gdg-on-campus-rcc-institute-of-information-technology-kolkata-india/' }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className="flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block sm:w-44 w-36 h-[3.2em] mx-auto group bg-transparent rounded-lg">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-white/10"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
        </div>
        <button
          className="absolute inset-0 rounded-lg bg-transparent cursor-pointer"
          aria-label="Join Us"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <span className="flex items-center justify-center gap-2 text-white text-lg font-semibold tracking-wide">
            <Star className="fill-white w-5 h-5 flex-shrink-0" />
            <span>JOIN US</span>
          </span>
        </button>
      </a>
    </div>
  )
}

export default JoinButton
