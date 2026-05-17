export default function Footer() {
  const links = ["Shop", "Men", "Women", "Drops", "Seasonal", "About", "Contact"];

  return (
    <footer style={{ backgroundColor: "#1C1C1C" }} className="py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        <span
          className="text-6xl md:text-8xl tracking-[0.4em] font-light text-white"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          NVLL
        </span>

        <nav className="flex flex-wrap justify-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-[0.2em] text-[#8A8680] hover:text-white transition-colors duration-200 uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="w-full h-px bg-[#2A2A2A]" />

        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <p
            className="text-xs text-[#8A8680] tracking-[0.1em]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2025 NVLL. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs tracking-[0.1em] text-[#8A8680] hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
