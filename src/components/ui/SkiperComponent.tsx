"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Skiper40 = () => {
  return (
    <div className="w-full max-w-xs bg-transparent p-0">
      {/* Mobile/Tablet: Grid layout for two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-1">
        {/* Sitemap Section */}
        <div className="mb-0 sm:mb-0 lg:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-blue-500 mb-2">Sitemap</h3>
          <ul className="flex flex-col gap-1.5 sm:gap-2">
            <li><Link001 href="/">Home</Link001></li>
            <li><Link002 href="/about">About Us</Link002></li>
            <li><Link003 href="/teams">Teams</Link003></li>
            <li><Link004 href="/gallery">Gallery</Link004></li>
            <li><Link005 href="/events">Events</Link005></li>
            <li><Link003 href="/explore">Explore</Link003></li>
          </ul>
        </div>
        {/* Social Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-blue-500 mb-2">Social</h3>
          <ul className="flex flex-col gap-1.5 sm:gap-2">
            <li>
              <Link001 href="https://www.linkedin.com/company/gdgc-rcciit/">
                <span className="inline-flex items-center gap-2"><FaLinkedin className="text-[#0A66C2]" /> LinkedIn</span>
              </Link001>
            </li>
            <li>
              <Link002 href="https://x.com/gdgc_rcciit">
                <span className="inline-flex items-center gap-2"><FaTwitter className="text-[#1da1f2]" /> Twitter</span>
              </Link002>
            </li>
            <li>
              <Link003 href="https://www.instagram.com/gdgoncampus.rcciit?igsh=MXd0Znd0ZTlrcGM0cg%3D%3D&utm_source=qr">
                <span className="inline-flex items-center gap-2"><FaInstagram className="text-[#E4405F]" /> Instagram</span>
              </Link003>
            </li>
            <li>
              <Link004 href="https://www.facebook.com/share/17R2W9Gi1g/?mibextid=wwXIfr">
                <span className="inline-flex items-center gap-2"><FaFacebook className="text-[#1877F3]" /> Facebook</span>
              </Link004>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Skiper40 };

// --- Skiper Animated Link Components ---

const Link001 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group relative flex items-center",
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
      "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
      "hover:before:origin-left hover:before:scale-x-100",
      className
    )}
  >
    {children}
    <svg
      className="ml-[0.3em] mt-0 size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
      fill="none"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
);

const Link002 = Link001;
const Link003 = Link001;
const Link004 = Link001;
const Link005 = Link001;
