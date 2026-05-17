"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../lib/gsap";

const DROP_IMAGE = "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=900";

export default function FeaturedDrop() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !sectionRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { scale: 0.9, opacity: 0.6 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: "#F5F2EC" }}
    >
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-light text-[#1C1C1C] whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(40px, 6vw, 80px)",
            opacity: 0.05,
            letterSpacing: "0.15em",
          }}
        >
          FOR YOUR NEXT WARDROBE
        </span>
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <div
          ref={cardRef}
          className="relative rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#1C1C1C", aspectRatio: "3/4" }}
        >
          <Image
            src={DROP_IMAGE}
            alt="Featured drop"
            fill
            className="object-cover object-center opacity-60"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <p
              className="text-[10px] tracking-[0.3em] text-white/60 mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              FALL / WINTER 2025
            </p>
            <p
              className="text-[10px] tracking-[0.2em] text-[#8A8680] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              DELIVERY 01/12/2025
            </p>

            <div className="flex flex-col gap-2 mb-8">
              {["● OVERSIZED HOODIE", "● THERMAL LAYER"].map((item) => (
                <span
                  key={item}
                  className="text-[11px] tracking-[0.15em] text-white/80"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white text-[#1C1C1C] px-6 py-3 text-xs tracking-[0.2em] hover:bg-[#F5F2EC] transition-colors duration-200 self-start"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              SHOP THE DROP
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
