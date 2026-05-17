"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="relative flex items-end justify-center">
        {/* Left nav */}
        <div
          className="flex-1 flex items-center h-16 px-8 gap-8"
          style={{ backgroundColor: "rgba(255,255,255,0.97)" }}
        >
          {["SHOP", "MEN", "WOMEN", "DROPS"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-[0.2em] text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Center logo — extends below with arch */}
        <div
          className="relative flex flex-col items-center flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.97)" }}
        >
          <div className="px-12 pt-4 pb-2 flex items-center justify-center">
            <a
              href="#"
              className="text-4xl tracking-[0.35em] font-light select-none"
              style={{ fontFamily: "var(--font-cormorant)", color: "#1C1C1C" }}
            >
              NVLL
            </a>
          </div>
          {/* Arch shape under logo */}
          <div
            className="w-full"
            style={{
              height: "24px",
              backgroundColor: "rgba(255,255,255,0.97)",
              borderRadius: "0 0 60px 60px",
            }}
          />
        </div>

        {/* Right nav */}
        <div
          className="flex-1 flex items-center justify-end h-16 px-8 gap-6"
          style={{ backgroundColor: "rgba(255,255,255,0.97)" }}
        >
          {["SEASONAL", "ACCESSORIES"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-[0.2em] text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="text-xs tracking-[0.15em] bg-[#1C1C1C] text-white px-4 py-2 rounded-full hover:bg-[#2A2A2A] transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            SIGN IN / UP
          </a>
          <button className="text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
