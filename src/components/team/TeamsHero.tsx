
import { Sparkles } from "lucide-react";
import UserAvatars  from "@/components/team/UserAvatars";
import MoodCard from "@/components/team/MoodCard";
import { BGPattern } from "../ui/bg-pattern";
import { motion } from "framer-motion";
import { leads } from "@/lib/leads";
import { teamMembers } from "@/data/team";
import { useEffect, useState } from "react";


const Index = () => {
  const [randomLeads, setRandomLeads] = useState<string[]>([]);

  // Helper function to get team member info by name
  const getTeamMemberByName = (name: string) => {
    return teamMembers.find(member => member.name === name);
  };

  // Convert lead key to display name
  const getDisplayName = (leadKey: string) => {
    const nameMap: { [key: string]: string } = {
      'Rishi_paul': 'Rishi Paul',
      'Anindya_kanti_Das': 'Anindya kanti Das',
      'Rivu_Chattopadhyay': 'Rivu Chattopadhyay',
      'Aditi_Ghosh': 'Aditi Ghosh',
      'Debayudh_Basu': 'Debayudh Basu',
      'Debdyuti_Mondal': 'Debdyuti Mondal',
      'Koushani_Maity': 'Koushani Maity',
      'Arnab_Mondal': 'Arnab Mondal',
      'Rajarshi_Mondal': 'Rajarshi Mondal',
      'Deepjyoti_Dey': 'Deepjyoti Dey',
      'Sambit_Ganguly': 'Sambit Ganguly',
      'Shirshika_Ghosh': 'Shirshika Ghosh',
      'Smaranika_Porel': 'Smaranika Porel',
      'Prachi_Ghosh': 'Prachi Ghosh',
      'Rajarshi_Das': 'Rajarshi Das',
      'Tirtha_Bhattacharya': 'Tirtha Bhattacharya'
    };
    return nameMap[leadKey] || leadKey;
  };

  useEffect(() => {
    // Get all lead keys except Rishi_paul
    const availableLeads = Object.keys(leads).filter(key => key !== 'Rishi_paul' && (leads as any)[key] !== "");
    
    // Randomly select 2 leads
    const shuffled = [...availableLeads].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    
    setRandomLeads(selected);
  }, []);
  return (
      <div className="min-h-screen text-black bg-white overflow-hidden animate-fade-in" style={{ animationDelay: '0ms' }}>
      {/* Hero Section */}
     <BGPattern variant="grid" mask="fade-x" fill="#D3D3D3" size={50} className="z-0 h-screen" />

      {/* Google-themed floating elements */}
      <div className="absolute inset-0 -z-5">
        {/* Floating Google dots */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-4 h-4 bg-[#4285F4] rounded-full opacity-30"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-32 right-20 w-3 h-3 bg-[#EA4335] rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 left-20 w-5 h-5 bg-[#FBBC04] rounded-full opacity-25"
        />
        <motion.div
          animate={{
            y: [0, 18, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-32 right-16 w-4 h-4 bg-[#34A853] rounded-full opacity-35"
        />

        {/* Google-style geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-1/4 w-8 h-8 border-2 border-[#4285F4] rounded-lg opacity-20"
        />
        <motion.div
          animate={{
            rotate: [0, -30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-60 left-1/3 w-6 h-6 bg-[#EA4335] rounded-full opacity-15"
        />
        <motion.div
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-16 w-10 h-3 bg-[#FBBC04] rounded-full opacity-20"
        />

        {/* Google color blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-16 right-32 w-32 h-32 bg-[#4285F4]/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-48 left-24 w-40 h-40 bg-[#EA4335]/8 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute top-1/3 right-1/5 w-28 h-28 bg-[#FBBC04]/12 rounded-full blur-2xl"
        />
      </div>
      <div className="container  mx-auto px-4 pt-25 pb-16 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          
          
          <div className="  relative mb-8">
            {/* Google-themed animated dots around title */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -left-6 w-3 h-3 bg-[#4285F4] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute -top-4 -right-8 w-2 h-2 bg-[#EA4335] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
              className="absolute -bottom-6 left-1/4 w-2.5 h-2.5 bg-[#FBBC04] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-4 right-1/3 w-2 h-2 bg-[#34A853] rounded-full"
            />

            {/* Left decorative sparkle */}
            <div className=" absolute left-0 top-1/4 -translate-x-20 hidden lg:block animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
              <div className=" relative">
                <Sparkles className="w-12 h-12 text-black" strokeWidth={1.5} />
                <div className="absolute top-0 left-0 w-12 h-12 rotate-45">
                  <Sparkles className="w-12 h-12 text-black" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            
            {/* Right decorative curve */}
            <div className="absolute right-0 top-0 translate-x-20 hidden lg:block animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-black">
                <path
                  d="M10 10 Q 40 10, 40 40 T 70 70"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="70" cy="70" r="3" fill="currentColor" />
              </svg>
            </div>
            
            <h1 className="text-4xl text-black sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in px-4" style={{ animationDelay: '250ms' }}>
              <span className="text-blue-500">Meet </span>the <span className="text-red-500">team</span> behind<br />the <span className="text-green-500">magics</span>!
            </h1>
          </div>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in px-4" style={{ animationDelay: '400ms' }}>
            Passionate minds powering every GDG RCCIIT initiative<br className="hidden sm:block" />
            We work together to grow and inspire the tech community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '550ms' }}>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-px left-1/2 -translate-x-1/2 justify-center flex lg:flex flex-col items-center gap-1"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xs font-medium text-[#4285F4]"
        >
          Scroll to Explore
        </motion.span>
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-4 h-4 text-[#4285F4]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </motion.svg>
      </motion.div>
          </div>  
        </div>
      </div>
      
      {/* Mood Cards Section */}
      <div className="container mx-auto px-4 pb-20 -mt-8 md:-mt-20 relative">
        {/* Additional Google-themed decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-4 h-4 border border-[#4285F4] rounded-full opacity-30 hidden lg:block"
        />
        <motion.div
          animate={{
            x: [0, 15, -15, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-16 w-3 h-3 bg-[#34A853] rounded-full opacity-25 hidden lg:block"
        />
        {/* Mobile Layout - Only Lead Organizer */}
        <div className="md:hidden flex flex-col gap-10 max-w-md mx-auto">
          <MoodCard
            color="hsl(330, 75%, 75%)"
            imageSrc={(leads as any).Rishi_paul || ''}
            imageAlt="Rishi Paul - Lead Organizer"
            name="Rishi Paul"
            role="Lead Organizer"
            delay={700}
          />
        </div>

        {/* Desktop Layout - Overlapping */}
        <div className="hidden md:flex relative items-end justify-center max-w-4xl mx-auto h-110">
          {/* Left Card - Behind */}
          <div className="absolute -left-5 bottom-0 w-[280px] lg:w-[340px] z-10 transform">
            <MoodCard
              color="hsl(193, 85%, 55%)"
              imageSrc={randomLeads[0] ? (leads as any)[randomLeads[0]] : ''}
              imageAlt="Lead profile"
              name={randomLeads[0] ? getDisplayName(randomLeads[0]) : undefined}
              role={randomLeads[0] ? getTeamMemberByName(getDisplayName(randomLeads[0]))?.role : undefined}
              delay={600}
              direction="left"
            />
          </div>
          
          {/* Center Card - Front and Larger */}
          <div className="relative z-20 w-[320px] lg:w-[420px] h-[450px] ">
            <MoodCard
              color="hsl(330, 75%, 75%)"
              imageSrc={(leads as any).Rishi_paul}
              imageAlt="Rishi Paul - Lead"
              name="Rishi Paul"
              role="Lead Organizer"
              delay={700}
            />
          </div>
          
          {/* Right Card - Behind */}
          <div className="absolute -right-5 bottom-0 w-[280px] lg:w-[340px] z-10 transform">
            <MoodCard
              color="hsl(15, 85%, 65%)"
              imageSrc={randomLeads[1] ? (leads as any)[randomLeads[1]] : ''}
              imageAlt="Lead profile"
              name={randomLeads[1] ? getDisplayName(randomLeads[1]) : undefined}
              role={randomLeads[1] ? getTeamMemberByName(getDisplayName(randomLeads[1]))?.role : undefined}
              delay={800}
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
