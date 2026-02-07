"use client";
import React from "react";
import { ScrollContainerComponent } from "@/components/ui/container-scroll-animation";

export function ScrollContainer() {
  return (
    <div className="flex flex-col overflow-hidden  bg-[radial-gradient(#999_1px,transparent_1px)]  bg-[#fdfcec] 
      bg-size-[20px_20px]    ">
      <ScrollContainerComponent
        titleComponent={
          <>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold pb-4 md:pb-6 text-black dark:text-zinc-900 px-4">
              Experience the Future of Tech with<br />
              <span className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-bold mt-1 leading-none font-['Jersey_10'] tracking-wide text-zinc-700 block">
               GDGC RCCIIT
              </span>
            </h1>
          </>
        }
      >
        {/* Mobile Video - shown on screens smaller than md (768px) */}
        <video
          src="/assets/scrollcontainervdo2.mp4"

          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="mx-auto rounded-2xl object-cover h-full object-center md:hidden"
        >
          <source src="/assets/scrollcontainervdo2.mp4" type="video/mp4" />
          
        </video>
        
        {/* Desktop Video - shown on screens md (768px) and larger */}
        <video
          src="/assets/scrollcontainervdo11.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="mx-auto rounded-2xl object-cover h-full object-left-top hidden md:block"
        >
          <source src="/assets/scrollcontainervdo1.mp4" type="video/mp4" />
          
        </video>
      </ScrollContainerComponent>
    </div>
  );
}
