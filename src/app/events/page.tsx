import CurrentEvent from '@/components/events/CurrentEvent';
import { Timeline } from '@/components/events/PastEvents';
import { BGPattern } from '@/components/ui/bg-pattern';
import OvalLiveButton from '@/components/ui/OvalLiveButton';
import { LiquidShapes } from '@/components/ui/LiquidShapes';
import Image from 'next/image';
import { events } from '@/data/events';
import SnowfallClient from '@/components/ui/SnowfallClient';

export const metadata = {
  title: 'Events — GDGC RCCIIT',
  description:
    'Upcoming and past events organized by GDGC RCCIIT. Join workshops, hackathons and study jams.',
  openGraph: {
    title: 'GDGC RCCIIT Events',
    description: 'Upcoming and past events organized by GDGC RCCIIT',
    url: 'https://www.gdgcrcc.tech/events',
    images: ['/favicon/favicon.svg'],
  },
  twitter: { card: 'summary' },
};

const Page = () => {
  // Group events by year
  const eventsByYear = events.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {} as Record<number, typeof events>);

  // Sort years in descending order
  const years = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Generate timeline data from actual events
  const data = years.map(year => {
    const yearEvents = eventsByYear[year].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Get the first image from each event of this year
    const firstImages: string[] = [];
    yearEvents.forEach(event => {
      if (event.images) {
        const first = Object.values(event.images)[0];
        if (first) firstImages.push(first);
      }
    });

    // Take up to 4 images for the grid
    const displayImages = firstImages.slice(0, 4);
    
    // Create summary text
    const eventCount = yearEvents.length;
    const eventTypes = [...new Set(yearEvents.map(e => e.type).filter(Boolean))];
    
    return {
      title: year.toString(),
      content: (
        <div>
          <p className="text-black text-xs md:text-sm font-normal mb-4">
            {eventCount} event{eventCount !== 1 ? 's' : ''} hosted in {year}
            {eventTypes.length > 0 && ` — including ${eventTypes.join(', ')}`}
          </p>
          <p className="text-black text-xs md:text-sm font-normal mb-8">
            {yearEvents.slice(0, 3).map(e => e.title).join(', ')}
            {yearEvents.length > 3 && ` and ${yearEvents.length - 3} more`}
          </p>
          {displayImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {displayImages.map((img, idx) => (
                <Image
                  key={`${year}-${idx}-${img}`}
                  src={img}
                  alt={`${year} event ${idx + 1}`}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]"
                />
              ))}
            </div>
          )}
        </div>
      ),
    };
  });
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <SnowfallClient  />
      <BGPattern
        variant="grid"
        mask="fade-x"
        fill="#E0E7FF"
        size={60}
        className="absolute inset-0 z-0"
      />

      {/* Liquid Animated Shapes */}
      <LiquidShapes />

      {/* Google Inspired Shape Elements */}
      {/* Top Left Kite */}
      <div className="absolute top-20 left-0 z-10 opacity-70 pointer-events-none animate-float">
        <Image
          src="/assets/left_kite.svg"
          alt="decorative kite"
          width={120}
          height={120}
          className="w-24 md:w-32"
        />
      </div>

      {/* Top Right Kite */}
      <div className="absolute top-32 right-5 z-10 opacity-70 pointer-events-none animate-float" style={{ animationDelay: '1s' }}>
        <Image
          src="/assets/right_kite.svg"
          alt="decorative kite"
          width={100}
          height={100}
          className="w-20 md:w-28"
        />
      </div>

      {/* Gemini Star - Center decoration */}
      <div className="absolute top-1/3 right-10 z-10 opacity-60 pointer-events-none animate-pulse">
        <Image
          src="/assets/gemini star.svg"
          alt="gemini star"
          width={80}
          height={80}
          className="w-16 md:w-24"
        />
      </div>

      {/* Top Cloud - Cloud_1 */}
      <div className="absolute top-35 left-1/4 z-10 opacity-60 pointer-events-none animate-float" style={{ animationDelay: '0.3s' }}>
        <Image
          src="/assets/cloud_1.svg"
          alt="cloud decoration"
          width={140}
          height={80}
          className="w-24 md:w-40"
        />
      </div>

      {/* Middle Right Cloud - Cloud_2 */}
      <div className="absolute top-2/3 right-0 z-10 opacity-50 pointer-events-none animate-float" style={{ animationDelay: '1.5s' }}>
        <Image
          src="/assets/cloud_2.svg"
          alt="cloud decoration"
          width={130}
          height={70}
          className="w-20 md:w-36"
        />
      </div>



      {/* Bottom Left Cloud - Cloud_3 */}
      <div className="absolute bottom-40 left-5 z-10 opacity-55 pointer-events-none animate-float" style={{ animationDelay: '2s' }}>
        <Image
          src="/assets/cloud_3.svg"
          alt="cloud decoration"
          width={150}
          height={85}
          className="w-28 md:w-44"
        />
      </div>

      {/* Bottom Right Cloud - Cloud_1 */}
      <div className="absolute bottom-20 right-10 z-10 opacity-50 pointer-events-none animate-float" style={{ animationDelay: '0.7s' }}>
        <Image
          src="/assets/cloud_1.svg"
          alt="cloud decoration"
          width={110}
          height={60}
          className="w-20 md:w-32"
        />
      </div>

      {/* Middle Left Cloud - Cloud_2 */}
      <div className="absolute top-1/2 left-0 z-10 opacity-40 pointer-events-none animate-float" style={{ animationDelay: '2.5s' }}>
        <Image
          src="/assets/cloud_2.svg"
          alt="cloud decoration"
          width={120}
          height={65}
          className="w-16 md:w-32"
        />
      </div>

      {/* Bottom Right Kite - Liquid shape accent */}
      <div className="absolute bottom-40 right-20 z-10 opacity-70 pointer-events-none animate-float" style={{ animationDelay: '0.5s' }}>
        <Image
          src="/assets/left_kite.svg"
          alt="decorative shape"
          width={110}
          height={110}
          className="w-24 md:w-32"
        />
      </div>

      {/* Top Center Right Kite - Additional shape */}
      <div className="absolute top-1/4 left-3/4 z-10 opacity-60 pointer-events-none animate-float" style={{ animationDelay: '1.2s' }}>
        <Image
          src="/assets/right_kite.svg"
          alt="decorative shape"
          width={90}
          height={90}
          className="w-16 md:w-28"
        />
      </div>

      <div className="absolute top-6 md:top-23 left-1/2 -translate-x-1/2 z-30">
        <OvalLiveButton text="ShowCaseX is live" />
      </div>
      <CurrentEvent />
      <Timeline data={data} />

    </div>
  );
};

export default Page;
