"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

function SiteHeader({}: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "px-4 lg:px-6 h-14 flex items-center fixed top-0 w-full z-50 transition-all duration-300 ",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <img src="/pLogo.png" className="h-10 w-10 lg:h-16 lg:w-16" />
      </Link>
      <nav className="ml-auto hidden sm:flex gap-4 lg:gap-6 items-center">
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact
        </Link>
        <Link
          href="/auth/sign-up"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          <Button>Start your Journey</Button>
        </Link>
      </nav>
      <Button
        variant="ghost"
        className="sm:hidden ml-auto"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </Button>
      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white shadow-md sm:hidden">
          <Link
            href="#"
            className="block py-2 px-4 text-sm font-medium hover:bg-gray-100"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-sm font-medium hover:bg-gray-100"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-sm font-medium hover:bg-gray-100"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-sm font-medium hover:bg-gray-100"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}

export default SiteHeader;
