// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useGetPackagesQuery } from "@/redux/slices/packageApiSlice";

// function IndiaDropDownMenu() {
//   const { data: pkg, isLoading, isError } = useGetPackagesQuery();
//   // console.log(pkg);

//   // STATIC DATA
//   const categories = ["north-india", "south-india", "west-india", "north-east"];

//   // const data = {
//   //   india: {
//   //     "north-india": {
//   //       "himachal pradesh": ["Manali", "Shimla"],
//   //       uttarakhand: ["Nainital", "Rishikesh"],
//   //     },
//   //     "south-india": {
//   //       kerala: ["Munnar", "Alleppey"],
//   //     },
//   //     "west-india": {
//   //       goa: ["North Goa", "South Goa"],
//   //       gujarat: ["Ahmedabad", "Kutch"],
//   //       rajasthan: ["Jaipur", "Udaipur", "Jaisalmer"],
//   //       maharashtra: ["Mumbai", "Lonavala", "Pune"],
//   //     },

//   //     "north-east": {
//   //       assam: ["Guwahati", "Kaziranga"],
//   //       sikkim: ["Gangtok"],
//   //       meghalaya: ["Shillong"],
//   //     },
//   //   },
//   // };

//   const [activeCategory, setActiveCategory] = useState("north-india");
//   const [isOpen, setIsOpen] = useState(false);
//   const [dynamicData, setDynamicData] = useState({});
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

//   //TREANSFORM BACKEND DATA ON UI FORMAT
//   useEffect(() => {
//     if (!pkg) return;

//     const formatted = {};

//     pkg.forEach((item) => {
//       if (item.type !== "india") return;

//       const category = item.category;
//       const group = item.group;
//       const city = item.destinationName;

//       if (!formatted[category]) {
//         formatted[category] = {};
//       }

//       if (!formatted[category][group]) {
//         formatted[category][group] = [];
//       }

//       // avoid duplicates
//       if (!formatted[category][group].includes(city)) {
//         formatted[category][group].push(city);
//       }
//     });

//     setDynamicData(formatted);
//   }, [pkg]);

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className={cn(
//           "inline-flex items-center gap-1 rounded-md mr-1 px-3 py-2 text-xs font-bold",
//           "bg-transparent hover:bg-gray-100 transition-colors select-none",
//           "focus:outline-none focus:ring-2 focus:ring-blue-500",
//           isOpen && "bg-gray-100 text-black",
//         )}
//       >
//         India
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
//             "absolute top-full z-[9999]",
//             "mt-1 bg-white rounded-lg shadow-2xl border border-gray-100",
//             "left-0 right-0 w-auto",
//             "sm:right-auto sm:w-[520px]",
//             "lg:w-[800px]",
//             "flex flex-col",
//             "lg:grid lg:grid-cols-4 lg:gap-6 lg:p-6",
//           )}
//         >
//           {/* LEFT SIDEBAR */}
//           <div className="col-span-1 border-r pr-4 space-y-1">
//             {/* <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                   Regions
//                 </p> */}
//             {categories.map((category) => (
//               <div
//                 key={category}
//                 onMouseEnter={() => setActiveCategory(category)}
//                 onClick={() => setActiveCategory(category)}
//                 className={cn(
//                   "cursor-pointer px-3 py-2 rounded capitalize text-sm transition-colors",
//                   "px-2 py-2.5 lg:px-3 lg:py-2 lg:text-left",
//                   activeCategory === category
//                     ? "bg-blue-100 text-blue-600 font-medium"
//                     : "hover:bg-gray-100 text-gray-700",
//                 )}
//               >
//                 {category.replace(/-/g, " ")}
//               </div>
//             ))}
//           </div>

//           <hr className="border-gray-200 mx-3 lg:hidden" />

//           {/* RIGHT CONTENT */}
//           <div
//             className={cn(
//               "p-3",
//               "lg:col-span-3 lg:p-0", // Desktop
//             )}
//           >
//             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//               All Destinations
//             </p>

//             {isLoading ? (
//               <p className="text-sm text-gray-400">Loading...</p>
//             ) : !dynamicData[activeCategory] ? (
//               <p className="text-sm text-gray-400">No destinations available</p>
//             ) : (
//               <div
//                 className={cn(
//                   // ─── Mobile/tablet
//                   "grid grid-cols-2 gap-4",
//                   // ─── Desktop: restore original 3-column grid ─
//                   "lg:grid-cols-3 lg:gap-6",
//                 )}
//               >
//                 {Object.entries(dynamicData[activeCategory] || {}).map(
//                   ([group, cities]) => (
//                     <div key={group}>
//                       <h4 className="font-semibold mb-2 capitalize text-sm text-gray-800">
//                         {group}
//                       </h4>
//                       <ul className="space-y-1">
//                         {cities.map((city) => (
//                           <li key={city}>
//                             <Link
//                               to={`/city/${city?.toLowerCase()}`}
//                               onClick={() => setIsOpen(false)}
//                               className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
//                             >
//                               {city}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ),
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default IndiaDropDownMenu;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetPackagesQuery } from "@/redux/slices/packageApiSlice";

function IndiaDropDownMenu({ isMobile = false }) {
  const { data: pkg, isLoading } = useGetPackagesQuery();
  const categories = ["north-india", "south-india", "west-india", "north-east"];

  const [activeCategory, setActiveCategory] = useState("north-india");
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicData, setDynamicData] = useState({});

  // Mobile accordion: track which category is expanded
  const [expandedCategory, setExpandedCategory] = useState(null);

  const dropdownRef = useRef(null);

  // Desktop: close on outside click
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

  // Transform backend data
  useEffect(() => {
    if (!pkg) return;
    const formatted = {};
    pkg.forEach((item) => {
      if (item.type !== "india") return;
      const { category, group, destinationName: city } = item;
      if (!formatted[category]) formatted[category] = {};
      if (!formatted[category][group]) formatted[category][group] = [];
      if (!formatted[category][group].includes(city)) {
        formatted[category][group].push(city);
      }
    });
    setDynamicData(formatted);
  }, [pkg]);

  // ─── MOBILE ACCORDION LAYOUT ───────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Top-level "India" toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
        >
          <span>India</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Accordion body */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {isLoading ? (
            <p className="px-5 py-3 text-sm text-white/50">Loading...</p>
          ) : (
            <div className="pb-2">
              {categories.map((category) => {
                const isExpanded = expandedCategory === category;
                const groups = dynamicData[category];

                return (
                  <div key={category} className="border-t border-white/10">
                    {/* Category row */}
                    <button
                      onClick={() =>
                        setExpandedCategory(isExpanded ? null : category)
                      }
                      className="flex items-center justify-between w-full px-6 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors capitalize"
                    >
                      <span>{category.replace(/-/g, " ")}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-white/50 transition-transform duration-200",
                          isExpanded && "rotate-90",
                        )}
                      />
                    </button>

                    {/* Cities grid — expands inline, no overflow */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-[400px]" : "max-h-0",
                      )}
                    >
                      {!groups ? (
                        <p className="px-8 py-2 text-xs text-white/40">
                          No destinations
                        </p>
                      ) : (
                        <div className="px-6 pb-4 pt-1 grid grid-cols-2 gap-x-4 gap-y-3">
                          {Object.entries(groups).map(([group, cities]) => (
                            <div key={group}>
                              <p className="text-xs font-semibold text-sky-300 text-transform:uppercase tracking-wide mb-1 capitalize">
                                {group}
                              </p>
                              <ul className="space-y-1">
                                {cities.map((city) => (
                                  <li key={city}>
                                    <Link
                                      to={`/city/${city.toLowerCase()}`}
                                      className="text-xs text-white/70 hover:text-white transition-colors"
                                    >
                                      {city}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── DESKTOP LAYOUT (unchanged) ────────────────────────────────────────────
  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md mr-1 px-3 py-2 text-xs font-bold",
          "bg-transparent hover:bg-gray-100 transition-colors select-none",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          isOpen && "bg-gray-100 text-black",
        )}
      >
        India
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full z-[9999]",
            "mt-1 bg-white rounded-lg shadow-2xl border border-gray-100",
            "left-0 right-0 w-auto",
            "sm:right-auto sm:w-[520px]",
            "lg:w-[800px]",
            "flex flex-col",
            "lg:grid lg:grid-cols-4 lg:gap-6 lg:p-6",
          )}
        >
          {/* LEFT SIDEBAR */}
          <div className="col-span-1 border-r pr-4 space-y-1">
            {categories.map((category) => (
              <div
                key={category}
                onMouseEnter={() => setActiveCategory(category)}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "cursor-pointer px-3 py-2 rounded capitalize text-sm transition-colors",
                  "px-2 py-2.5 lg:px-3 lg:py-2 lg:text-left",
                  activeCategory === category
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700",
                )}
              >
                {category.replace(/-/g, " ")}
              </div>
            ))}
          </div>

          <hr className="border-gray-200 mx-3 lg:hidden" />

          {/* RIGHT CONTENT */}
          <div className={cn("p-3", "lg:col-span-3 lg:p-0")}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              All Destinations
            </p>
            {isLoading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : !dynamicData[activeCategory] ? (
              <p className="text-sm text-gray-400">No destinations available</p>
            ) : (
              <div
                className={cn(
                  "grid grid-cols-2 gap-4",
                  "lg:grid-cols-3 lg:gap-6",
                )}
              >
                {Object.entries(dynamicData[activeCategory] || {}).map(
                  ([group, cities]) => (
                    <div key={group}>
                      <h4 className="font-semibold mb-2 capitalize text-sm text-gray-800">
                        {group}
                      </h4>
                      <ul className="space-y-1">
                        {cities.map((city) => (
                          <li key={city}>
                            <Link
                              to={`/city/${city?.toLowerCase()}`}
                              onClick={() => setIsOpen(false)}
                              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              {city}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IndiaDropDownMenu;
