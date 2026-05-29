import React, { useState } from "react";
import logo from "../../assets/Travabay_logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SearchBox from "./SearchBox";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#212529] text-white">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* LEFT: LOGO */}
        <div className="w-28 md:w-32">
          <Link to="/">
            <img src={logo} alt="Travabay Logo" className="w-full" />
          </Link>
        </div>

        <SearchBox />

        {/* RIGHT: BUTTONS (desktop) */}
        <div className="hidden md:flex items-center gap-3 font-bold text-sm">
          <button className="px-4 py-1 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition">
            Invite-only club
          </button>

          <button className="px-4 py-1 rounded-full bg-[#0096c7] hover:bg-[#0077a6] transition">
            +91 95796 59074
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder='Search "Eiffel Tower"'
            className="w-full rounded-full px-4 h-10 text-sm text-black"
          />

          {/* BUTTONS */}
          <button className="w-full px-4 py-2 border border-yellow-500 rounded-full text-yellow-500">
            Invite-only club
          </button>

          <button className="w-full px-4 py-2 rounded-full bg-[#0096c7]">
            +91 95796 59074
          </button>
        </div>
      )}
    </header>
  );
}

export default NavBar;
