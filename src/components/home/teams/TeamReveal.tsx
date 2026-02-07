import React from 'react'
import { BGPattern } from '@/components/ui/bg-pattern'
import ScrollBaseAnimation from '@/components/ui/scroll-text-marque';
const TeamTempt = () => {
    return (
        <div className="relative text-black mx-auto w-full space-y-5 p-8 bg-[#FAF6F0] overflow-hidden">
            <BGPattern variant="grid" mask="fade-edges" fill="#808080" size={50} className="z-0" />
            <div className="w-full h-[50vh] flex-col justify-center items-center relative z-10">
                <div className='flex flex-col h-full justify-center gap-2'>
                    <ScrollBaseAnimation
                        delay={5000}
                        baseVelocity={-1}
                        className='h-[21vw] font-bold tracking-[-0.07em] leading-[90%]'
                    >
                        Lets Get to Know the Awesome Upcoming Events!
                    </ScrollBaseAnimation>
                    <ScrollBaseAnimation
                        delay={5000}
                        baseVelocity={1}
                        className='h-[21vw] md:h-[] font-bold tracking-[-0.07em] leading-[90%]'
                    >
                        Lets Get to Know the Awesome Upcoming Events!
                    </ScrollBaseAnimation>
                     
                </div>

            </div>
        </div>
    )
}

export default TeamTempt
