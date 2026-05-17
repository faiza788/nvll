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
      <Navbar />
      <main>
        <HeroSection />
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
