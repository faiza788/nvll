"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600",
  "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=600",
  "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600",
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600",
];

const PRODUCTS = [
  { name: "NVLL x Equinox Series", price: "USD 189.00" },
  { name: "Shadow Oversized Tee", price: "USD 89.00" },
  { name: "Void Cargo Pants", price: "USD 210.00" },
  { name: "Underground Hoodie", price: "USD 189.00" },
  { name: "Thermal Layer Jacket", price: "USD 145.00" },
  { name: "Equinox Fleece", price: "USD 320.00" },
  { name: "NVLL Void Cap", price: "USD 65.00" },
  { name: "Shadow Series Shorts", price: "USD 120.00" },
];

const WORD_FINAL = ["FRESH", "FITS", "FOR", "YOUR", "NEXT", "DROP!"];

function WordReveal() {
  const words = WORD_FINAL;
  const containerRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const els = wordRefs.current.filter(Boolean);
    if (!els.length || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          els,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out", duration: 0.7 }
        );
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <h2
      ref={containerRef}
      className="text-4xl md:text-6xl font-light text-[#1C1C1C] leading-tight tracking-tight flex flex-wrap gap-x-4"
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => { wordRefs.current[i] = el; }}
          style={{ opacity: 0 }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}


export default function ProductGrid() {
  return (
    <section
      className="py-20 md:py-28 px-8 md:px-16"
      style={{ backgroundColor: "#EDEAE3" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <p
            className="text-xs tracking-[0.25em] text-[#8A8680]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            NEW ARRIVAL
          </p>
          <p
            className="text-xs tracking-[0.25em] text-[#8A8680]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ALL BRANDS
          </p>
        </div>

        <div className="mb-14">
          <WordReveal />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ backgroundColor: "#1C1C1C", aspectRatio: "3/4" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
            >
              <Image
                src={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
                alt={product.name}
                fill
                className="object-cover object-center opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Top badges */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                <span
                  className="text-[9px] tracking-[0.15em] bg-white/90 text-[#1C1C1C] px-2 py-0.5 rounded-full"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Winter
                </span>
                <button className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <div>
                  <p
                    className="text-[11px] font-light text-white leading-tight"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px" }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="text-[9px] tracking-[0.1em] text-white/70 mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {product.price}
                  </p>
                </div>
                <button className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
