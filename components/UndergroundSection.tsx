"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../lib/gsap";

const IMAGES = {
  left: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600",
  center: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
  right: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
};

export default function UndergroundSection() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ghostRef.current || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(ghostRef.current, {
          x: -80 + self.progress * 80,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-8 md:px-16"
      style={{ backgroundColor: "#EDEAE3" }}
    >
      {/* Ghost text */}
      <div
        ref={ghostRef}
        className="absolute inset-0 flex items-center pointer-events-none select-none"
        style={{ transform: "translateX(-80px)" }}
      >
        <span
          className="text-[18vw] font-light text-[#1C1C1C] whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cormorant)",
            opacity: 0.07,
            lineHeight: 1,
          }}
        >
          UNDERGROUND
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Body copy top-right */}
        <p
          className="text-xs tracking-[0.15em] text-[#8A8680] text-right mb-12 max-w-xs ml-auto"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Only those who dare to be different find us.
        </p>

        {/* Asymmetric image layout */}
        <div className="flex gap-4 md:gap-6 items-stretch h-[520px] md:h-[640px]">
          {/* Left small card */}
          <div className="w-[28%] relative rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src={IMAGES.left}
              alt="Underground editorial left"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Center tall dark card */}
          <div
            className="flex-1 relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#1C1C1C" }}
          >
            <Image
              src={IMAGES.center}
              alt="Underground editorial center"
              fill
              className="object-cover object-center opacity-80"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Right small card */}
          <div className="w-[28%] relative rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src={IMAGES.right}
              alt="Underground editorial right"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* Body copy bottom-left */}
        <p
          className="text-xs tracking-[0.15em] text-[#8A8680] mt-10 max-w-xs"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Crafted for those who move in silence. Premium fabrics, zero compromise.
        </p>
      </div>
    </section>
  );
}
