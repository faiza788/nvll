"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IMAGE_URL = "/hero-model.png";
const STRIPS = 8;
const STRIP_PCT = 100 / STRIPS;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);

  useGSAP(
    () => {
      const header = document.querySelector("header");
      const strips = sectionRef.current?.querySelectorAll(".hero-strip");
      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      const bottomEls = [bottomLeftRef.current, bottomRightRef.current].filter(
        Boolean
      ) as HTMLElement[];

      // ── Set from-states immediately before first paint ────────────────
      if (header) gsap.set(header, { opacity: 0 });
      if (strips?.length) gsap.set(strips, { scaleY: 0 });
      if (words.length) gsap.set(words, { opacity: 0, y: 30 });
      if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
      if (bottomEls.length) gsap.set(bottomEls, { opacity: 0 });

      const tl = gsap.timeline();

      // Step 1 (t=0): navbar fade-in + strip reveal
      if (header) {
        tl.to(header, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      }
      if (strips?.length) {
        tl.to(
          strips,
          { scaleY: 1, stagger: 0.08, duration: 0.85, ease: "power3.out" },
          0
        );
      }

      // Step 2 (t=1.3): model slides down
      if (imageContainerRef.current) {
        tl.to(
          imageContainerRef.current,
          { y: 90, duration: 0.9, ease: "power2.inOut" },
          1.3
        );
      }

      // Step 3 (t=1.8): headline words stagger in
      if (words.length) {
        tl.to(
          words,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.18, ease: "power2.out" },
          1.8
        );
      }

      // Step 4 (t=2.8): buttons appear
      if (buttonsRef.current) {
        tl.to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          2.8
        );
      }

      // Step 5 (t=3.0): bottom elements
      if (bottomEls.length) {
        tl.to(
          bottomEls,
          { opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          3.0
        );
      }

      // Parallax
      tl.call(() => {
        if (!imageContainerRef.current || !sectionRef.current) return;
        const baseY = 90;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(imageContainerRef.current, {
              y: baseY + self.progress * window.innerHeight * 0.3,
            });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "100%", backgroundColor: "#F5F2EC" }}
    >
      {/* ── Radial starburst SVG ──────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.05, zIndex: 1 }}
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g transform="translate(400,400)" stroke="#1C1C1C" strokeWidth="0.5">
          {Array.from({ length: 60 }, (_, i) => {
            const angle = (i * 360) / 60;
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={Math.cos(rad) * 800}
                y2={Math.sin(rad) * 800}
              />
            );
          })}
        </g>
      </svg>

      {/* ── Model image — 8 animated strips, centered ─────────────────── */}
      {/*   Centering wrapper: flex center, GSAP targets the inner div    */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
          isolation: "isolate",
          pointerEvents: "none",
        }}
      >
        <div
          ref={imageContainerRef}
          style={{
            position: "relative",
            width: 400,
            height: "75vh",
            willChange: "transform",
          }}
        >
          {Array.from({ length: STRIPS }, (_, i) => (
            <div
              key={i}
              className="hero-strip"
              style={{
                position: "absolute",
                top: `${i * STRIP_PCT}%`,
                width: "100%",
                height: `${STRIP_PCT}%`,
                overflow: "hidden",
                transformOrigin: "center center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGE_URL}
                alt=""
                style={{
                  position: "absolute",
                  top: `${-i * 100}%`,
                  left: 0,
                  width: "100%",
                  height: "800%",
                  objectFit: "contain",
                  objectPosition: "center top",
                  mixBlendMode: "multiply",
                  display: "block",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Headline + buttons — top center ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "13%",
          left: 0,
          right: 0,
          zIndex: 20,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 68,
            fontWeight: 900,
            color: "#1C1C1C",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          <div>
            <span
              ref={(el) => { wordRefs.current[0] = el; }}
              style={{ display: "inline-block", marginRight: "0.2em" }}
            >
              GEAR UP
            </span>
            <span
              ref={(el) => { wordRefs.current[1] = el; }}
              style={{ display: "inline-block" }}
            >
              EVERY SEASON
            </span>
          </div>
          <div>
            <span
              ref={(el) => { wordRefs.current[2] = el; }}
              style={{ display: "inline-block", marginRight: "0.2em" }}
            >
              EVERY
            </span>
            <span
              ref={(el) => { wordRefs.current[3] = el; }}
              style={{ display: "inline-block" }}
            >
              WORKOUT!
            </span>
          </div>
        </h1>

        {/* Pill buttons */}
        <div ref={buttonsRef} style={{ display: "flex", gap: 16 }}>
          <button
            style={{
              backgroundColor: "#1C1C1C",
              color: "#FFFFFF",
              border: "none",
              padding: "14px 36px",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: "0.18em",
              fontFamily: "var(--font-inter)",
              cursor: "pointer",
            }}
          >
            SHOP NOW
          </button>
          <button
            style={{
              backgroundColor: "#FFFFFF",
              color: "#1C1C1C",
              border: "1.5px solid #1C1C1C",
              padding: "14px 36px",
              borderRadius: 999,
              fontSize: 11,
              letterSpacing: "0.18em",
              fontFamily: "var(--font-inter)",
              cursor: "pointer",
            }}
          >
            EXPLORE ALL
          </button>
        </div>
      </div>

      {/* ── Bottom-left: avatars + paragraph ──────────────────────────── */}
      <div
        ref={bottomLeftRef}
        style={{
          position: "absolute",
          bottom: 32,
          left: 40,
          zIndex: 20,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        {/* Stacked avatar circles */}
        <div style={{ display: "flex", flexShrink: 0, marginTop: 2 }}>
          {["#C4B5A0", "#A89880", "#8A7A6A"].map((color, n) => (
            <div
              key={n}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                backgroundColor: color,
                border: "2px solid #F5F2EC",
                marginLeft: n === 0 ? 0 : -8,
                position: "relative",
              }}
            />
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 11,
            lineHeight: 1.55,
            color: "#8A8680",
            margin: 0,
            maxWidth: 160,
          }}
        >
          Stay cozy without compromising your range of motion. Our winter range
          is perfect for those chilly outdoor workouts.
        </p>
      </div>

      {/* ── Bottom-right: lookbook card with shoe thumbnail ───────────── */}
      <div
        ref={bottomRightRef}
        style={{
          position: "absolute",
          bottom: 32,
          right: 40,
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "#1C1C1C",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Shoe thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
            alt="Product"
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          {/* Play button */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1,
              }}
            >
              WATCH LOOKBOOK
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "#8A8680",
                margin: "4px 0 0",
              }}
            >
              FW 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
