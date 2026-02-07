'use client'
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { logos } from "@/lib/illustrations";

const LiquidSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Google Developers Logo - top-left corner */}
      <div className="fixed top-5 left-5 z-50 bg-black p-1 rounded-full">
        <Link href="/" aria-label="Home">
          <img
            src={logos.googleDevelopersLogo}
            alt="Google Developers"
            className="w-10 h-10 object-contain"
          />
        </Link>
      </div>

      {/* Fixed top-right navbar button - hidden when menu is open */}
      {!isOpen && (
        <div className="fixed top-4 right-4 z-50 ">
          <motion.button
            whileHover={{ rotate: "180deg" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="text-2xl bg-white text-black hover:text-indigo-500 transition-colors p-3 rounded-full shadow-lg border border-gray-200"
          >
            <FiMenu />
          </motion.button>
        </div>
      )}
      {isOpen && <Nav isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

const Nav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.nav
      className="fixed top-0 bottom-0 w-screen bg-white/60 backdrop-blur-md"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-2xl bg-white text-black hover:text-indigo-500 border border-transparent hover:border-indigo-500 transition-colors p-3 rounded-full absolute top-4 right-4"
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-8"
      >
        <NavLink text="Home" link="/" />
        <NavLink text="About" link="/about" />
        <NavLink text="Teams" link="/teams" />
        <NavLink text="Gallery" link="/gallery" />
        <NavLink text="Explore" link="/explore" />
        <NavLink text="Events" link="/events" />
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <motion.a
      className="inline-block z-10 text-slate-800 w-fit font-black text-7xl hover:text-indigo-500 transition-colors"
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 3,
      }}
      whileHover={{
        y: -15,
        rotate: "-7.5deg",
      }}
      rel="nofollow"
      href={link ? link : "#"}
    >
      {text}
    </motion.a>
  );
};

export default LiquidSideNav;

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};