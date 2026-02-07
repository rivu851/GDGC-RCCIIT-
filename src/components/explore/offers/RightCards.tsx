import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export const BouncyCardsFeatures = () => {
  return (
    <section className="px-4  text-slate-800 ">
    
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4  h-[10vh]">
          <CardTitle>Google Cloud Credit</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
            <span className="block text-center font-semibold text-indigo-50">
              FEATURE DEMO HERE
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>GitHub Student Development Pack</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
            <span className="block text-center font-semibold text-orange-50">
              FEATURE DEMO HERE
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>JetBrains Student License</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
            <span className="block text-center font-semibold text-emerald-50">
              FEATURE DEMO HERE
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle >Notion Education</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-linear-to-br from-pink-400 to-red-400 p-4 transition-transform duration-250 group-hover:translate-y-4 group-hover:rotate-2">
            <span className="block text-center font-semibold text-red-50">
              FEATURE DEMO HERE
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="">
       <p className="mt-1 text-gray-600 text-sm w-fit font-light">
        And much more...click "Get Them Now" to explore more offers!
        </p> 
        </div>
    </section>
  );
};

const BounceCard = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg", backgroundColor: "#d1fae5", }}
      className={`border-2 border-gray-200 group relative min-h-[270px] cursor-pointer overflow-hidden rounded-2xl bg-green-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-2xl font-semibold">{children}</h3>
  );
};