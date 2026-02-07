'use client';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import CurvedLoop from '../ui/CurvedLoop';

export default function AboutUsStackingCards() {
  const [animationData, setAnimationData] = useState(null);

  // Load animation data
  useEffect(() => {
    fetch('/assets/animation/HomePageanimation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  return (
    <main className='bg-gray-100'>
      <div className='wrapper'>
        <section className='text-gray-800 h-[75vh] min-h-[500px] w-full bg-gray-50 grid place-content-center sticky top-0'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

          <h1 className='z-50 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl px-4 sm:px-8 font-semibold text-center tracking-tight leading-[120%]'>
            Ready to dive in? Let’s explore what GDG RCC IIT is all about! <br className='hidden sm:block' /> Scroll down! 👇
          </h1>
        </section>
      </div>

      {/* CurvedLoop Animation Section */}
      <section className='w-full bg-gray-50 py-4 sm:py-6 overflow-visible'>
        <div className="w-full max-w-7xl mx-auto">
          <div className="w-full py-2 sm:py-4">
            <CurvedLoop 
              marqueeText="Coding✦ Creating✦ Connecting✦ That’s How We Roll!✦"
              speed={3}
              curveAmount={250}
              direction="right"
              interactive={true}
              className="fill-gray-700"
            />
          </div>
        </div>
      </section>

      <section className='text-gray-800 w-full bg-gray-50'>
        <div className='flex flex-col lg:flex-row justify-between px-4 sm:px-8 lg:px-16 gap-8 lg:gap-0'>
          {/* Cards Container */}
          <div className='grid gap-2 w-full lg:w-auto'>
            {/* Card 1 - Community Growth */}
            <figure className='sticky top-0 h-screen grid place-content-center'>
              <article className='bg-linear-to-br from-[#4285F4] to-blue-600 h-64 sm:h-72 md:h-80 w-full sm:w-[90vw] md:w-[500px] lg:w-[600px] rounded-lg rotate-3 lg:rotate-6 p-6 sm:p-8 grid place-content-center gap-4 shadow-2xl'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Community Growth 🚀</h1>
                <p className='text-sm sm:text-base md:text-lg leading-relaxed'>
                  From a small group of passionate developers to a thriving community of 500+ members. 
                  We've grown together, learned together, and built amazing things together.
                </p>
                <div className='flex gap-4 text-sm sm:text-base'>
                  <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <span className='font-bold'>2400+</span> Members
                  </div>
                  <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <span className='font-bold'>5+</span> Years
                  </div>
                </div>
              </article>
            </figure>

            {/* Card 2 - Events & Workshops */}
            <figure className='sticky top-0 h-screen grid place-content-center'>
              <article className='bg-linear-to-br from-[#EA4335] to-red-600 h-64 sm:h-72 md:h-80 w-full sm:w-[90vw] md:w-[500px] lg:w-[600px] rounded-lg p-6 sm:p-8 grid place-content-center gap-4 shadow-2xl'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Events & Workshops 🎯</h1>
                <p className='text-sm sm:text-base md:text-lg leading-relaxed'>
                  Over 50 technical workshops, hackathons, and community events. From DevFest to 
                  Solution Challenge, we've hosted events that inspire and educate developers.
                </p>
                <div className='flex gap-4 text-sm sm:text-base'>
                  <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <span className='font-bold'>50+</span> Events
                  </div>
                  <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <span className='font-bold'>10+</span> Hackathons
                  </div>
                </div>
              </article>
            </figure>

            {/* Card 3 - Projects & Innovation */}
            <figure className='sticky top-0 h-screen grid place-content-center'>
              <article className='bg-linear-to-br from-[#FBBC04] to-yellow-600 h-64 sm:h-72 md:h-80 w-full sm:w-[90vw] md:w-[500px] lg:w-[600px] rounded-lg -rotate-3 lg:-rotate-6 p-6 sm:p-8 grid place-content-center gap-4 shadow-2xl'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>Projects & Innovation 💡</h1>
                <p className='text-sm sm:text-base md:text-lg leading-relaxed text-gray-900'>
                  Our members have built innovative solutions using Google technologies. From AI/ML 
                  projects to web applications, we're turning ideas into reality.
                </p>
                <div className='flex gap-4 text-sm sm:text-base text-gray-900'>
                  <div className='bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <span className='font-bold'>20+</span> Projects
                  </div>
                  <div className='bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg'>
                    <span className='font-bold'>100+</span> Contributors
                  </div>
                </div>
              </article>
            </figure>

            {/* Card 4 - Google Technologies */}
            <figure className='sticky top-0 h-screen grid place-content-center'>
              <article className='bg-linear-to-br from-[#34A853] to-green-600 h-64 sm:h-72 md:h-80 w-full sm:w-[90vw] md:w-[500px] lg:w-[600px] rounded-lg p-6 sm:p-8 grid place-content-center gap-4 shadow-2xl'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Google Technologies 🛠️</h1>
                <p className='text-sm sm:text-base md:text-lg leading-relaxed'>
                  Expertise in Cloud, Firebase, TensorFlow, Flutter, and more. We empower our 
                  community with cutting-edge Google technologies and best practices.
                </p>
                <div className='flex flex-wrap gap-2 text-xs sm:text-sm'>
                  <span className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full'>Cloud</span>
                  <span className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full'>Firebase</span>
                  <span className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full'>TensorFlow</span>
                  <span className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full'>Flutter</span>
                </div>
              </article>
            </figure>
          </div>

          {/* Sticky Title and Animation - Hidden on mobile, visible on large screens */}
          <div className='hidden lg:block sticky top-0 h-screen'>
            <div className='h-full flex flex-col items-center justify-start pt-8 gap-0'>
              
              {/* Animation */}
              <div className='w-full max-w-xl lg:max-w-2xl px-8 mt-14'>
                {animationData ? (
                  <Lottie 
                    animationData={animationData} 
                    loop 
                    autoplay 
                    className="w-full h-full scale-110"
                  />
                ) : (
                  <div className='w-full h-96 flex items-center justify-center'>
                    <div className='w-12 h-12 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin'></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
