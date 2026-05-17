"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap";

const CARDS = [
  {
    label: "01/WINTER _2025",
    text: "LIMITED EDITION DROP FOR THE UNDERGROUND",
    badge: "● NEW DROP",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
  },
  {
    label: "02/SUMMER _2025",
    text: "LATEST SILHOUETTES AND CRAFTED EXCLUSIVES",
    badge: "● BEST SELLER",
    image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800",
  },
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
const FINAL_TEXT = "TOP LUXURY GEAR FOR PEAK STYLE!";

function ScrambleText({ trigger }: { trigger: boolean }) {
  const [display, setDisplay] = useState(FINAL_TEXT);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      if (frame >= totalFrames) {
        setDisplay(FINAL_TEXT);
        clearInterval(interval);
        return;
      }
      setDisplay(
        FINAL_TEXT.split("").map((char, i) => {
          if (char === " ") return " ";
          if (frame / totalFrames > i / FINAL_TEXT.length) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      frame++;
    }, 60);
    return () => clearInterval(interval);
  }, [trigger]);

  return <>{display}</>;
}

export default function TopPicksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [scramble, setScramble] = useState(false);
  const inView = useInView(headlineRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (inView) setScramble(true);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-8 md:px-16 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs tracking-[0.25em] text-[#8A8680] mb-4"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          OUR TOP PICKS
        </p>

        <div ref={headlineRef} className="mb-14">
          <h2
            className="text-4xl md:text-6xl font-light text-[#1C1C1C] leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            <ScrambleText trigger={scramble} />
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="flex-1 relative rounded-2xl overflow-hidden aspect-[3/4]"
              style={{ backgroundColor: "#1C1C1C" }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover object-center opacity-70"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge top-left */}
              <div className="absolute top-5 left-5">
                <span
                  className="text-[10px] tracking-[0.2em] text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {card.badge}
                </span>
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p
                  className="text-[10px] tracking-[0.2em] text-[#8A8680] mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {card.label}
                </p>
                <p
                  className="text-sm md:text-base font-light text-white leading-snug tracking-wide"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {card.text}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className="text-xs tracking-[0.15em] text-white/70"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    EXPLORE
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity={0.7}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
