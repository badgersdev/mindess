"use client";
import Link from "next/link";
import { useState } from "react";
import { montserrat } from "@/fonts/googleFonts";

// components
import Hamburger from "./mobileMenu/Hamburger";
import MobileNav from "./mobileMenu/MobileNav";
import LogoutButton from "./LogoutButton";

const MainNav = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  const handleLogo = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`${montserrat.className} flex justify-center text-lg tracking-wide fixed top-0 glassmorphism-main-nav w-screen rounded-none h-[10vh]`}
    >
      <nav className="flex gap-10 items-center h-full w-full max-w-screen-xl px-6">
        <div>
          <Link className={"text-2xl"} href="/" onClick={handleLogo}>
            Logohere
          </Link>
        </div>
        <Hamburger handleHamburger={handleHamburger} isOpen={isOpen} />
        <MobileNav
          handleHamburger={handleHamburger}
          isOpen={isOpen}
          session={session}
        />

        <div className="ml-auto hidden md:flex gap-8 px-8">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {session ? (
            <>
              <LogoutButton isOpen={isOpen} handleHamburger={handleHamburger} />
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainNav;
