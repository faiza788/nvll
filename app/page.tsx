"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import UndergroundSection from "../components/UndergroundSection";
import TopPicksSection from "../components/TopPicksSection";
import FitsCarousel from "../components/FitsCarousel";
import ProductGrid from "../components/ProductGrid";
import FeaturedDrop from "../components/FeaturedDrop";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ── Outer page background ──────────────────────────────────────── */}
      <div style={{ backgroundColor: "#E8E4DC" }}>
        {/* ── Hero card: contains navbar + hero ─────────────────────────── */}
        <div
          style={{
            margin: 12,
            borderRadius: 20,
            backgroundColor: "#F5F2EC",
            border: "1px solid rgba(255,255,255,0.6)",
            overflow: "hidden",
            position: "relative",
            height: "calc(100vh - 24px)",
          }}
        >
          <Navbar />
          <HeroSection />
        </div>
      </div>

      <main>
        <UndergroundSection />
        <TopPicksSection />
        <FitsCarousel />
        <ProductGrid />
        <FeaturedDrop />
      </main>
      <Footer />
    </motion.div>
  );
}
