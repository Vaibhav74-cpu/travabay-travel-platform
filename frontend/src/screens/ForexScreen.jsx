// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import ForexDropdown from "@/components/shared/ForexDropdown";



// function ForexScreen() {
//   const [activeRegion, setActiveRegion] = useState("asia");
//   const [dynamicData, setDynamicData] = useState({});
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className={cn(
//           "inline-flex items-center gap-1 rounded-md px-3 ml-3 py-2 text-xs font-bold",
//           "bg-transparent hover:bg-gray-100 transition-colors select-none",
//           "focus:outline-none focus:ring-2 focus:ring-blue-500",
//           isOpen && "bg-gray-100 text-black",
//         )}
//       >
//         Forex
//         <ChevronDown
//           className={cn(
//             "h-4 w-4 text-gray-500 transition-transform duration-200",
//             isOpen && "rotate-180",
//           )}
//         />
//       </button>

//       {/* DROPDOWN PANEL */}
//       {isOpen && (
//         <div
//           className={cn(
//             "absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[420px] h-[500px] sm:w-[340px] max-w-[calc(100vw-16px)]",
//           )}
//         >
//         <ForexDropdown />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ForexScreen;

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ForexDropdown from "@/components/shared/ForexDropdown";

function ForexScreen({ isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Desktop only: close on outside click
  useEffect(() => {
    if (isMobile) return;
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // ─── MOBILE: inline accordion ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Toggle row */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
        >
          <span>Forex</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Inline panel — no absolute, no fixed width, scrollable */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pb-4 overflow-y-auto max-h-[480px]">
            {/* ForexDropdown rendered full-width inside the drawer */}
            <div className="w-full overflow-x-hidden">
              <ForexDropdown />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── DESKTOP: floating panel (unchanged behaviour) ────────────────────────
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 ml-3 py-2 text-xs font-bold",
          "bg-transparent hover:bg-gray-100 transition-colors select-none",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          isOpen && "bg-gray-100 text-black"
        )}
      >
        Forex
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 mt-1",
            "w-[420px] sm:w-[340px] max-w-[calc(100vw-16px)]",
            "h-[500px] z-[9999]"
          )}
        >
          <ForexDropdown />
        </div>
      )}
    </div>
  );
}

export default ForexScreen;
