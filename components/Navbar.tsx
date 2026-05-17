"use client";

const LEFT_LINKS = ["SHOP", "MEN", "WOMEN", "DROPS"];
const RIGHT_LINKS = ["SEASONAL", "ACCESSORIES"];

export default function Navbar() {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "#FFFFFF",
        // VEXO notch: sides end at 58px, center platform extends to 96px
        // diagonals connect at ~45deg on a wide screen
        clipPath:
          "polygon(0 0, 100% 0, 100% 58px, 63% 58px, 60% 96px, 40% 96px, 37% 58px, 0 58px)",
      }}
    >
      <div className="flex items-start">
        {/* Left links */}
        <div
          className="flex items-center gap-7 px-8 flex-1"
          style={{ height: 58 }}
        >
          {LEFT_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] tracking-[0.2em] text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Center: logo on raised platform */}
        <div
          className="flex items-center justify-center flex-shrink-0 px-14"
          style={{ height: 96, backgroundColor: "#FFFFFF" }}
        >
          <a
            href="#"
            className="text-[32px] tracking-[0.4em] font-light select-none text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-300"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            NVLL
          </a>
        </div>

        {/* Right links */}
        <div
          className="flex items-center justify-end gap-6 px-8 flex-1"
          style={{ height: 58 }}
        >
          {RIGHT_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] tracking-[0.2em] text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            className="text-[11px] tracking-[0.15em] bg-[#1C1C1C] text-white px-5 py-2 rounded-full hover:bg-[#2A2A2A] transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            SIGN IN / UP
          </a>
          <button
            className="text-[#1C1C1C] hover:text-[#8A8680] transition-colors duration-200"
            aria-label="Bag"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
