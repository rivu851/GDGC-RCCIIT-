"use client";

import React, { useState, useEffect } from "react";
import PillNav from "@/components/shared/Header";
import { logos } from "@/lib/illustrations";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`w-full sticky top-2 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } flex justify-center`}
    >
      <PillNav
        logo={logos.googleDevelopersLogo}
        logoAlt="GDGC"
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Teams", href: "/teams" },
          { label: "Gallery", href: "/gallery" },
          { label: "Explore", href: "/explore" },
          { label: "Events", href: "/events" },
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="black"
      />
    </div>
  );
};

export default Navbar;
