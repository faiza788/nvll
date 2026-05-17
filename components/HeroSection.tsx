"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const HERO_IMAGE = "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1400";
const STRIP_COUNT = 8;

export default function HeroSection() {
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const strips = stripRefs.current.filter(Boolean);
    gsap.fromTo(
      strips,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        stagger: 0.08,
        ease: "power3.out",
        duration: 1.4,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* SVG radial line pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ opacity: 0.06 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1C1C1C" stopOpacity="1" />
            <stop offset="100%" stopColor="#1C1C1C" stopOpacity="0" />
          </radialGradient>
          <pattern id="lines" patternUnits="userSpaceOnUse" width="40" height="40">
            <line x1="0" y1="0" x2="40" y2="40" stroke="#1C1C1C" strokeWidth="0.5" />
            <line x1="40" y1="0" x2="0" y2="40" stroke="#1C1C1C" strokeWidth="0.5" />
          </pattern>
          <mask id="radialMask">
            <rect width="100%" height="100%" fill="url(#rg)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" mask="url(#radialMask)" />
      </svg>

      {/* Image strips */}
      {Array.from({ length: STRIP_COUNT }, (_, i) => {
        const top = i * (100 / STRIP_COUNT);
        const bottom = 100 - (i + 1) * (100 / STRIP_COUNT);
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{ clipPath: `inset(${top}% 0 ${bottom}% 0)` }}
          >
            <div
              ref={(el) => { stripRefs.current[i] = el; }}
              className="w-full h-full"
              style={{ clipPath: "inset(0 0 100% 0)" }}
            >
              <Image
                src={HERO_IMAGE}
                alt="NVLL hero"
                fill
                className="object-cover object-center"
                unoptimized
                priority
              />
            </div>
          </div>
        );
      })}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/20 z-20" />

      {/* Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-12 md:px-20">
        <h1
          className="text-white leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(64px, 9vw, 120px)",
            fontWeight: 300,
          }}
        >
          WEAR NOTHING.
          <br />
          WEAR NVLL.
        </h1>
        <div className="flex gap-4 mt-10">
          <a
            href="#"
            className="px-8 py-4 bg-white text-[#1C1C1C] text-xs tracking-[0.2em] hover:bg-[#F5F2EC] transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            SHOP NOW
          </a>
          <a
            href="#"
            className="px-8 py-4 border border-white text-white text-xs tracking-[0.2em] hover:bg-white/10 transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            EXPLORE ALL
          </a>
        </div>
      </div>

      {/* Bottom left: avatars + caption */}
      <div className="absolute bottom-8 left-12 md:left-20 z-30 flex items-center gap-3">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-8 h-8 rounded-full border-2 border-white bg-[#8A8680]"
              style={{ zIndex: 3 - n }}
            />
          ))}
        </div>
        <p
          className="text-white text-xs tracking-[0.1em]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          10,000+ drops claimed
        </p>
      </div>

      {/* Bottom right: video card */}
      <div className="absolute bottom-8 right-12 md:right-20 z-30">
        <div className="bg-[#1C1C1C]/90 rounded-2xl px-5 py-4 flex items-center gap-4 border border-white/10 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <div>
            <p className="text-white text-xs tracking-[0.15em]" style={{ fontFamily: "var(--font-inter)" }}>
              WATCH LOOKBOOK
            </p>
            <p className="text-[#8A8680] text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              FW 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
