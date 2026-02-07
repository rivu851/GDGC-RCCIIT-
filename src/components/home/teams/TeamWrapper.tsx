// @ts-nocheck
'use client';
import Image from 'next/image';
import TeamReveal from './TeamReveal';
import { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { ReactLenis } from 'lenis/react';
import TeamTempt from './TeamTempt';
import { BGPattern } from '@/components/ui/bg-pattern';

export default function HorizontalScroll(): JSX.Element {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timeoutId = setTimeout(() => {
      if (!ulRef.current || !sectionRef.current) return;

      const items = ulRef.current.querySelectorAll('li');
      
      if (items.length > 0) {
        try {
          // Use linear easing for better mobile performance
          const controls = animate(
            ulRef.current,
            {
              transform: ['translateX(0vw)', `translateX(-${(items.length - 1) * 100}vw)`],
            },
            { easing: 'linear' }
          );
          
          scroll(controls, { 
            target: sectionRef.current,
            offset: ['start start', 'end end']
          });

          // Text animation with responsive values
          const segmentLength = 1 / items.length;
          items.forEach((item, i) => {
            const header = item.querySelector('h2');

            if (header) {
              // Reduce animation distance on mobile
              const isMobile = window.innerWidth < 768;
              const distance = isMobile ? 400 : 800;
              
              scroll(animate(header, { x: [distance, -distance] }), {
                target: sectionRef.current,
                offset: [
                  [i * segmentLength, 1],
                  [(i + 1) * segmentLength, 0],
                ],
              });
            }
          });
        } catch (error) {
          console.error('Animation error:', error);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-white">
        <article>
          <header className='sticky top-0 text-white w-full bg-slate-950 flex justify-center items-center z-20'>
            <TeamReveal />
          </header>
          <div className="relative z-40">
             <BGPattern variant="diagonal-stripes" mask="fade-y"  fill="#A9A9A9" size={50}/>
            <TeamTempt />
          </div>
        </article>
      </main>
    </ReactLenis>
  );
}