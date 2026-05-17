"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../lib/gsap";

const GROUP_IMAGE = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900";

export default function FitsCarousel() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ghostRef.current || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(ghostRef.current, {
          x: -self.progress * 200,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      {/* Ghost scrolling text */}
      <div
        ref={ghostRef}
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{ left: "-5%" }}
      >
        <span
          className="font-light text-[#1C1C1C]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(80px, 12vw, 160px)",
            opacity: 0.06,
            lineHeight: 1,
          }}
        >
          FRESH FITS FOR YOUR WARDROBE
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Tall dark card */}
        <div
          className="relative rounded-2xl overflow-hidden aspect-[3/4]"
          style={{ backgroundColor: "#1C1C1C" }}
        >
          <Image
            src={GROUP_IMAGE}
            alt="NVLL fits group"
            fill
            className="object-cover object-center opacity-75"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            <p
              className="text-xs tracking-[0.3em] text-white/60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              NVLL
            </p>
            <div>
              <h3
                className="text-3xl md:text-4xl font-light text-white leading-tight tracking-wide"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                LEVEL UP WITH THE LATEST IN LUXURY WEAR
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-6 text-xs tracking-[0.2em] text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                SHOP THE LOOK
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
