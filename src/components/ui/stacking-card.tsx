'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen w-full flex items-center justify-center sticky top-[40vh] sm:top-[15vh] lg:top-0 pointer-events-none'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,

          top: `calc(-10vh + ${i * 30}px)`, // Adjust initial position
        }}
        className={`flex flex-col relative h-[350px] sm:h-[400px] lg:h-[450px] w-full sm:w-[90%] lg:w-[80%] rounded-md p-4 sm:p-6 lg:p-10 origin-top pointer-events-auto`}
      >
        <h2 className='text-lg sm:text-xl lg:text-2xl text-center font-semibold mb-3 sm:mb-4'>{title}</h2>
        <div className='flex flex-col sm:flex-row flex-1 gap-3 sm:gap-4 lg:gap-10 overflow-hidden'>
          <div className='w-full sm:w-[40%] flex flex-col justify-center'>
            <p className='text-xs sm:text-sm line-clamp-4 sm:line-clamp-none'>{description}</p>
            <span className='flex items-center gap-2 pt-2 mt-auto'>
              <a href='#' target='_blank' className='underline cursor-pointer text-xs sm:text-sm'>
                See more
              </a>
              <svg
                width='18'
                height='10'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='sm:w-[22px] sm:h-3'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>
          <div className='relative w-full sm:w-[60%] h-[120px] sm:h-full rounded-lg overflow-hidden'>
            <motion.div className='w-full h-full' style={{ scale: imageScale }}>
              <img src={url} alt='image' className='absolute inset-0 w-full h-full object-cover' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export const StackingCards = ({ projects }: { projects: ProjectData[] }) => {
  const container = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div className='flex justify-end'>
    <section
      ref={container as any}
      className='left-0 text-white relative flex justify-center lg:justify-end min-h-[250vh] '
    >
      <div className='w-full lg:w-[50vw]'>
        {projects.map((project, i) => {
          // ✅ Fix: First card doesn't scroll away, others stack later
          const start = i === 0 ? 0 : i * 0.2;
          const end = 1;
          const targetScale = 1 - (projects.length - i) * 0.05;

          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project.link}
              title={project.title}
              color={project.color}
              description={project.description}
              progress={scrollYProgress}
              range={[start, end]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>

    </div>
  );
};
