'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animate, scroll, spring } from 'motion';
import { ReactLenis } from 'lenis/react';
import BounceCards from '@/components/ui/BounceCards';
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pastEvents } from '@/lib/illustrations';

gsap.registerPlugin(ScrollTrigger);


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function HorizontalScroll() {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const googleElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lenisRef = useRef<any>(null);

  const images = [

     pastEvents.openSourceSafari1,
    pastEvents.flutter1,
    pastEvents.techKotha1,
    pastEvents.hwh1,
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timeoutId = setTimeout(() => {
      if (!ulRef.current || !wrapperRef.current) return;

      const items = ulRef.current.querySelectorAll('li');

      if (items.length > 0) {
        try {
          // Calculate total width for horizontal scroll
          const scrollWidth = (items.length - 1) * 100;

          // Create horizontal scroll animation with GSAP - faster scroll
          const horizontalScroll = gsap.to(ulRef.current, {
            x: () => `-${scrollWidth}vw`,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top top',
              end: () => `+=${items.length * window.innerHeight}`,
              scrub: 0.5, // Reduced for faster horizontal scroll
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          });

          // Text animation with responsive values - slower independent animation
          items.forEach((item, i) => {
            const header = item.querySelector('h2');

            if (header) {
              // Animation distance for right to left movement
              const isMobile = window.innerWidth < 768;
              const startDistance = isMobile ? 400 : 800;
              const endDistance = isMobile ? -400 : -800;

              gsap.fromTo(header, 
                { 
                  x: startDistance,
                  force3D: true 
                },
                { 
                  x: endDistance,
                  ease: 'none',
                  force3D: true,
                  scrollTrigger: {
                    trigger: item,
                    containerAnimation: horizontalScroll,
                    start: 'left right',
                    end: 'right left',
                    scrub: 3, // Slower independent animation
                    invalidateOnRefresh: true,
                  }
                }
              );
            }
          });

          // Animate Google elements on scroll
          googleElementsRef.current.forEach((element, index) => {
            if (element) {
              // Different animations for each element
              if (index % 4 === 0) {
                gsap.to(element, {
                  rotation: 720,
                  x: -100,
                  scale: 1.5,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: `+=${items.length * window.innerHeight}`,
                    scrub: 1,
                  }
                });
              } else if (index % 4 === 1) {
                gsap.to(element, {
                  scale: 2,
                  opacity: 0.9,
                  y: 50,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: `+=${items.length * window.innerHeight}`,
                    scrub: 1,
                  }
                });
              } else if (index % 4 === 2) {
                gsap.to(element, {
                  x: 100,
                  y: -100,
                  rotation: -360,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: `+=${items.length * window.innerHeight}`,
                    scrub: 1,
                  }
                });
              } else {
                gsap.to(element, {
                  rotation: -720,
                  scale: 1.5,
                  x: 80,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: `+=${items.length * window.innerHeight}`,
                    scrub: 1,
                  }
                });
              }
            }
          });
        } catch (error) {
          console.error('Animation error:', error);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} root>
      <main className='overflow-hidden'>
        <article>
          <section ref={wrapperRef} className=' no-scrollbar overflow-hidden'>
            <div className=' h-screen overflow-hidden'>
              <ul ref={ulRef} className=' flex no-scrollbar w-full h-full'>
              <li className='relative left-0 h-screen w-screen shrink-0 bg-white flex flex-col items-center overflow-hidden'>
                {/* Grid Background - Square cells, bigger size */}
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[50px_50px]'></div>

                {/* Animating Geometric Shapes */}
                <div ref={(el) => { googleElementsRef.current[0] = el; }} className='absolute top-[10%] left-[8%] w-16 h-16 md:w-20 md:h-20 bg-[#4285F4]/60 rounded-full animate-bounce backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[1] = el; }} className='absolute top-[15%] right-[12%] w-14 h-14 md:w-16 md:h-16 bg-[#EA4335]/60 rounded-2xl animate-ping backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[2] = el; }} className='absolute bottom-[15%] left-[10%] w-20 h-20 md:w-24 md:h-24 bg-[#FBBC05]/60 rounded-3xl rotate-45 animate-pulse backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[3] = el; }} className='absolute bottom-[10%] right-[8%] w-12 h-16 md:w-16 md:h-20 bg-[#34A853]/60 rounded-2xl animate-bounce backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[4] = el; }} className='absolute top-[25%] right-[20%] w-10 h-10 md:w-12 md:h-12 border-4 border-[#EA4335]/70 rounded-full animate-spin backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[5] = el; }} className='absolute top-[40%] left-[15%] w-14 h-14 md:w-18 md:h-18 bg-[#4285F4]/60 rounded-2xl rotate-12 animate-pulse backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[6] = el; }} className='absolute bottom-[30%] right-[15%] w-16 h-16 md:w-20 md:h-20 border-4 border-[#FBBC05]/70 rounded-3xl rotate-45 animate-spin backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[7] = el; }} className='absolute top-[50%] right-[5%] w-12 h-12 md:w-14 md:h-14 bg-[#34A853]/60 rounded-full animate-bounce backdrop-blur-sm'></div>
                <div ref={(el) => { googleElementsRef.current[8] = el; }} className='absolute bottom-[40%] left-[5%] w-10 h-10 md:w-12 md:h-12 bg-[#EA4335]/60 rounded-xl rotate-45 animate-ping backdrop-blur-sm'></div>


                <h2 className='text-[18vw] sm:text-[15vw] md:text-[10vw] lg:text-[8vw] leading-none text-center font-semibold relative top-4 sm:top-6 md:top-10 inline-block text-black z-10 px-4'>
                 Past Events
                </h2>

                <div className='flex relative left-10 items-center justify-center flex-1 w-full px-4 sm:px-6 md:px-8'>
                  <BounceCards
                    className="custom-bounceCards"
                    images={images}
                    containerWidth={500}
                    containerHeight={250}
                    animationDelay={1}
                    animationStagger={0.08}
                    easeType="elastic.out(1, 0.5)"
                    transformStyles={transformStyles}
                    enableHover={true}
                  />
                </div>

              </li>
              <li className='h-screen w-screen shrink-0 bg-[#4285F4] overflow-hidden flex flex-col justify-between'>
                <div className='flex flex-col items-center pt-4 sm:pt-6 md:pt-8 overflow-hidden w-full '>
                  <h2 className='whitespace-nowrap text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-semibold inline-block text-black px-4'>
                    HELLO WORLD HACKS
                  </h2>
                </div>

                <div className='bottom-15 relative mt-6 sm:mt-10 md:mt-16 lg:mt-20 w-screen px-3 sm:px-6 md:px-8 lg:px-16 xl:px-30 flex flex-col lg:flex-row gap-10 lg:gap-8'>
                  <div className='w-full lg:w-[65vw] xl:w-[70vw] px-2 sm:px-4 md:px-6 flex flex-col justify-center'>
                    <h3 className='text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2'>
                      HELLO WORLD HACKS
                    </h3>
                    <h4 className='text-white font-medium text-sm sm:text-base md:text-2xl mb-3 sm:mb-4'>
                      Description
                    </h4>
                    <p className='text-white text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed max-w-prose'>
                     Hello World Hacks is a month-long hybrid hackathon, organized by Google Developers Group on Campus RCC Institute of Information Technology and RCCTechz, aimed at fostering innovation, collaboration, and technical excellence. Designed for students of all skill levels, this hackathon offers a structured platform to develop groundbreaking solutions, gain expert mentorship, and participate in hands-on workshops.
                    </p> 
                  </div>
                  <div className='w-full lg:w-[35vw] xl:w-[30vw] flex justify-center items-center px-4 sm:px-6 lg:px-0'>
                    <StackedCardsInteraction
                      cards={[
                        {
                          image:
                            pastEvents.hwh1,

                        },
                        {
                          image:
                            pastEvents.hwh2,


                        },
                        {
                          image:
                            pastEvents.hwh3,

                        },
                      ]}
                    />
                  </div>
                </div>
              </li>

              <li className='h-screen w-screen shrink-0 bg-[#EA4335] overflow-hidden flex flex-col justify-between'>
                <div className='flex flex-col items-center pt-4 sm:pt-6 md:pt-8 overflow-hidden w-full'>
                  <h2 className='whitespace-nowrap text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-semibold inline-block text-black px-4'>
                    TECH KOTHA
                  </h2>
                </div>

                <div className='bottom-15 relative mt-6 sm:mt-10 md:mt-16 lg:mt-20 w-screen px-3 sm:px-6 md:px-8 lg:px-16 xl:px-30 flex flex-col lg:flex-row gap-10 lg:gap-8'>
                  <div className='w-full lg:w-[65vw] xl:w-[70vw] px-2 sm:px-4 md:px-6 flex flex-col justify-center'>
                    <h3 className='text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2'>
                      TECH KOTHA
                    </h3>
                    <h4 className='text-white font-medium text-sm sm:text-base md:text-2xl mb-3 sm:mb-4'>
                      Description
                    </h4>
                    <p className='text-white text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed max-w-prose'>
                     GDG RCCIIT and RCCTechz unite to host an inspiring tech event that brings together passionate developers, innovators, and learners.
Through engaging discussions and idea-sharing sessions, participants explore diverse tech domains, exchange insights, and build meaningful connections within the growing tech community.
                    </p>
                  </div>
                  <div className='w-full lg:w-[35vw] xl:w-[30vw] flex justify-center items-center px-4 sm:px-6 lg:px-0'>
                    <StackedCardsInteraction
                      cards={[
                        {
                          image:
                            pastEvents.techKotha1,

                        },
                        {
                          image:
                            pastEvents.techKotha2,
                        },
                        {
                          image:
                            pastEvents.techKotha3,

                        },
                      ]}
                    />
                  </div>
                </div>
              </li>
              <li className='h-screen w-screen shrink-0 bg-[#FBBC05] overflow-hidden flex flex-col justify-between'>
                <div className='flex flex-col items-center pt-4 sm:pt-6 md:pt-8 overflow-hidden w-full'>
                  <h2 className='whitespace-nowrap text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-semibold inline-block text-black px-4'>
                    OPEN SOURCE SAFARI
                  </h2>
                </div>

                <div className='bottom-15 relative mt-6 sm:mt-10 md:mt-16 lg:mt-20 w-screen px-3 sm:px-6 md:px-8 lg:px-16 xl:px-30 flex flex-col lg:flex-row gap-10 lg:gap-8'>
                  <div className='w-full lg:w-[65vw] xl:w-[70vw] px-2 sm:px-4 md:px-6 flex flex-col justify-center'>
                    <h3 className='text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2'>
                      OPEN SOURCE SAFARI
                    </h3>
                    <h4 className='text-white font-medium text-sm sm:text-base md:text-2xl mb-3 sm:mb-4'>
                      Description
                    </h4>
                    <p className='text-white text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed max-w-prose'>
                      Step into the world of innovation with Open Source Safari, Kolkata’s biggest open-source event!
Hosted by GDG RCCIIT in collaboration with @rcctechz_official, @devdotcommunity, and @noobcode, this offline event lets you connect, contribute, and build alongside a GitHub Campus Expert and a 2× Google Summer of Code Contributor.
Learn, code, and collaborate to shape the future of open source.
                    </p>
                  </div>
                  <div className='w-full lg:w-[35vw] xl:w-[30vw] flex justify-center items-center px-4 sm:px-6 lg:px-0'>
                    <StackedCardsInteraction
                      cards={[
                        {
                          image:
                            pastEvents.openSourceSafari1,

                        },
                        {
                          image:
                            pastEvents.openSourceSafari2,

                        },
                        {
                          image:
                            pastEvents.openSourceSafari3,

                        },
                      ]}
                    />
                  </div>
                </div>
              </li>
              <li className='h-screen w-screen shrink-0 bg-[#34A853] overflow-hidden flex flex-col justify-between'>
                <div className='flex flex-col items-center pt-4 sm:pt-6 md:pt-8 overflow-hidden w-full'>
                  <h2 className='whitespace-nowrap text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-semibold inline-block text-black px-4'>
                    FLUTTER
                  </h2>
                </div>

                <div className='bottom-15 relative mt-6 sm:mt-10 md:mt-16 lg:mt-20 w-screen px-3 sm:px-6 md:px-8 lg:px-16 xl:px-30 flex flex-col lg:flex-row gap-10 lg:gap-8'>
                  <div className='w-full lg:w-[65vw] xl:w-[70vw] px-2 sm:px-4 md:px-6 flex flex-col justify-center'>
                    <h3 className='text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2'>
                      FLUTTER
                    </h3>
                    <h4 className='text-white font-medium text-sm sm:text-base md:text-2xl mb-3 sm:mb-4'>
                      Description
                    </h4>
                    <p className='text-white text-xs sm:text-sm md:text-base lg:text-xl leading-relaxed max-w-prose'>
                     Tech Winter Break: Flutter In Production Extended Kolkata is a practical session on Flutter, Google's multi-platform framework for building apps and web applications. Conducted by industry experts, the event focuses on Flutter's usage in production, empowering participants with real-world development skills. Organized by  GDGC RCCIIT, in collaboration with Flutter Kolkata and RCCTechz.
                    </p>
                  </div>
                  <div className='w-full lg:w-[35vw] xl:w-[30vw] flex justify-center items-center px-4 sm:px-6 lg:px-0'>
                      <StackedCardsInteraction
                      cards={[
                        {
                          image:
                            pastEvents.flutter1,

                        },
                        {
                          image:
                            pastEvents.flutter2,

                        },
                        {
                          image:
                            pastEvents.flutter3,

                        },
                      ]}
                    />
                  </div>
                </div>
              </li>
              {/* <li className='h-screen w-screen shrink-0 bg-[#4285F4] overflow-hidden'>
                <div className='flex flex-col items-center'>
                  <h2 className='text-[16vw] md:text-[12vw] font-semibold relative top-0 inline-block text-black'>
                    BELIEVE
                  </h2>
                </div>

                <div className=' top-20 relative w-screen px-4 md:px-8 lg:px-30 flex flex-col md:flex-row gap-4 md:gap-0'>
                  <div className='w-full md:w-[70vw] px-4 md:px-8'>
                    <h3 className='text-white font-semibold text-xl md:text-2xl mb-2'>
                      Event Name
                    </h3>
                    <h4 className='text-white font-medium text-base md:text-lg mb-4'>
                      Description
                    </h4>
                    <p className='text-white text-xs sm:text-sm md:text-base leading-relaxed'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ex laudantium adipisci accusamus laboriosam quam totam recusandae ducimus eius quis quisquam ratione consequatur ad sunt eveniet laborum sint fuga veniam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium aut voluptas autem, mollitia nisi aspernatur laboriosam assumenda fugit omnis dolorem veritatis suscipit. Ipsa recusandae soluta id vel natus assumenda laboriosam!
                    </p>
                  </div>
                  <div className='w-full md:w-[30vw] flex justify-center items-center'>
                      <StackedCardsInteraction
                      cards={[
                        {
                          image:
                            "https://images.unsplash.com/photo-1528741254566-d718e868201f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

                        },
                        {
                          image:
                            "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

                        },
                        {
                          image:
                            "https://images.unsplash.com/photo-1526827826797-7b05204a22ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",

                        },
                      ]}
                    />
                  </div>
                </div>
              </li> */}
            </ul>
            </div>
          </section>


        </article>
        <div className='progress fixed left-0 right-0  h-2 rounded-full bg-red-600 bottom-[50px] scale-x-0'></div>
      </main>
    </ReactLenis>
  );
}