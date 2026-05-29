
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import IndiaDropDownMenu from "./IndiaDropDownMenu";
import WorldDropDownMenu from "./WorldDropDownMenu";
import ForexScreen from "@/screens/ForexScreen";

function MegaNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <div
      ref={menuRef}
      className="relative z-[9999] bg-gradient-to-r from-[#031d3f] via-[#0a2a5c] to-[#031d3f] shadow-md"
    >
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center justify-center px-8 py-2 text-xs text-white">
        <IndiaDropDownMenu />
        <WorldDropDownMenu />
        <Link
          to="/corporate-travel"
          className="font-bold text-xs px-6 hover:text-sky-300 transition-colors duration-200"
        >
          Corporate Travel
        </Link>
        <Link
          to="/contact-us"
          className="font-bold text-xs hover:text-sky-300 transition-colors duration-200"
        >
          Contact Us
        </Link>
        <ForexScreen />
      </nav>

      {/* Mobile top bar */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 text-white">
        <Link to="/" className="font-bold text-sm tracking-wide">
          ✈ Travabay
        </Link>
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
        >
          <span
            className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer — floats over hero, scrollable, capped height */}
      <div
        className={`
          md:hidden absolute top-full left-0 w-full
          bg-gradient-to-b from-[#0a2a5c] to-[#031d3f]
          shadow-2xl z-[9999] overflow-y-auto
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col divide-y divide-white/10">
          {/* isMobile=true triggers accordion layout inside each dropdown */}
          <IndiaDropDownMenu isMobile />
          <WorldDropDownMenu isMobile />
          <Link
            to="/corporate-travel"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            Corporate Travel
          </Link>
          <Link
            to="/contact-us"
            onClick={() => setMenuOpen(false)}
            className="px-5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
          <ForexScreen isMobile />
        </div>
      </div>
    </div>
  );
}

export default MegaNavBar;
