// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useGetPackagesQuery } from "@/redux/slices/packageApiSlice";

// function WorldDropDownMenu() {
//   const { data: pkg, isLoading, isError } = useGetPackagesQuery();
//   // console.log(pkg);
//   // const data = {
//   //   world: {
//   //     africa: {
//   //       egypt: ["Cairo", "Luxor"],
//   //       kenya: ["Masai Mara"],
//   //     },
//   //     america: {
//   //       usa: ["New York", "Los Angeles", "San Francisco", "Las Vegas"],
//   //       canada: ["Toronto", "Vancouver", "Montreal"],
//   //       "south america": ["Rio de Janeiro", "Buenos Aires", "Machu Picchu"],
//   //     },
//   //     asia: {
//   //       japan: ["Tokyo", "Kyoto"],
//   //     },
//   //     europe: {
//   //       france: ["Paris"],
//   //     },
//   //   },
//   // };
//   const regions = ["asia", "europe", "america", "africa"];

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

//   useEffect(() => {
//     if (!pkg) return;

//     const formatted = {};

//     pkg.forEach((item) => {
//       if (item.type !== "world") return;

//       const continent = item.category;
//       const country = item.group;
//       const city = item.destinationName;

//       if (!formatted[continent]) {
//         formatted[continent] = {};
//       }

//       if (!formatted[continent][country]) {
//         formatted[continent][country] = [];
//       }

//       if (!formatted[continent][country].includes(city)) {
//         formatted[continent][country].push(city);
//       }
//     });

//     setDynamicData(formatted);
//   }, [pkg]);

//   return (
//     <div ref={dropdownRef} className="relative">
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className={cn(
//           "inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold",
//           "bg-transparent hover:bg-gray-100 transition-colors select-none",
//           "focus:outline-none focus:ring-2 focus:ring-blue-500",
//           isOpen && "bg-gray-100 text-black",
//         )}
//       >
//         World
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
//             "absolute top-full left-0 mt-1",
//             "w-[800px] bg-white rounded-lg shadow-2xl border border-gray-100",
//             "grid grid-cols-4 gap-6 p-6",
//             "z-[9999]",
//           )}
//         >
//           {/* LEFT SIDEBAR */}
//           <div className="col-span-1 border-r pr-4 space-y-1">
//             {/* <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                      Regions
//                    </p> */}
//             {regions.map((region) => (
//               <div
//                 key={region}
//                 onMouseEnter={() => setActiveRegion(region)}
//                 onClick={() => setActiveRegion(region)}
//                 className={cn(
//                   "cursor-pointer px-3 py-2 rounded capitalize text-sm transition-colors",
//                   activeRegion === region
//                     ? "bg-blue-100 text-blue-600 font-medium"
//                     : "hover:bg-gray-100 text-gray-700",
//                 )}
//               >
//                 {region}
//               </div>
//             ))}
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className="col-span-3">
//             {/* TOP POPULAR */}
//             {/* <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//                      Popular
//                    </p>
//                    <div className="flex gap-3 mb-6 flex-wrap">
//                      {Object.values(data.india[activeCategory])[0]?.map((item) => (
//                        <Link
//                          key={item}
//                          to={`/packages/${item.toLowerCase()}`}
//                          onClick={() => setIsOpen(false)}
//                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
//                        >
//                          {item}
//                        </Link>
//                      ))}
//                    </div> */}

//             <div className="flex gap-4 mb-4 flex-wrap">
//               {regions.map((tab) => (
//                 <span
//                   key={tab}
//                   className={`px-3 py-1 rounded-full text-sm border ${
//                     tab === activeRegion
//                       ? "bg-blue-100 text-blue-600 border-blue-400"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {tab}
//                 </span>
//               ))}
//             </div>

//             {isLoading ? (
//               <p className="text-sm text-gray-400">Loading...</p>
//             ) : !dynamicData[activeRegion] ? (
//               <p className="text-sm text-gray-400">No destinations available</p>
//             ) : (
//               <div className="grid grid-cols-3 gap-6">
//                 {Object.entries(dynamicData[activeRegion] || {}).map(
//                   ([country, destinations]) => (
//                     <div key={country}>
//                       <h4 className="font-semibold mb-2 capitalize text-sm text-gray-800">
//                         {country}
//                       </h4>
//                       <ul className="space-y-1">
//                         {destinations.map((dest) => (
//                           <li
//                             key={dest}
//                             className="hover:text-blue-600 cursor-pointer text-gray-600 text-sm "
//                           >
//                             <Link to={`/city/${dest?.toLowerCase()}`}>
//                               {dest}
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

// export default WorldDropDownMenu;
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetPackagesQuery } from "@/redux/slices/packageApiSlice";

function WorldDropDownMenu({ isMobile = false }) {
  const { data: pkg, isLoading } = useGetPackagesQuery();
  const regions = ["asia", "europe", "america", "africa"];

  const [activeRegion, setActiveRegion] = useState("asia");
  const [dynamicData, setDynamicData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  // Mobile accordion: which region is expanded
  const [expandedRegion, setExpandedRegion] = useState(null);

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
      if (item.type !== "world") return;
      const { category: continent, group: country, destinationName: city } = item;
      if (!formatted[continent]) formatted[continent] = {};
      if (!formatted[continent][country]) formatted[continent][country] = [];
      if (!formatted[continent][country].includes(city)) {
        formatted[continent][country].push(city);
      }
    });
    setDynamicData(formatted);
  }, [pkg]);

  // ─── MOBILE ACCORDION LAYOUT ───────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Top-level "World" toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full px-5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
        >
          <span>World</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Accordion body */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {isLoading ? (
            <p className="px-5 py-3 text-sm text-white/50">Loading...</p>
          ) : (
            <div className="pb-2">
              {regions.map((region) => {
                const isExpanded = expandedRegion === region;
                const countries = dynamicData[region];

                return (
                  <div key={region} className="border-t border-white/10">
                    {/* Region row */}
                    <button
                      onClick={() =>
                        setExpandedRegion(isExpanded ? null : region)
                      }
                      className="flex items-center justify-between w-full px-6 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors capitalize"
                    >
                      <span>{region}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-white/50 transition-transform duration-200",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </button>

                    {/* Countries + cities — expands inline */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-[400px]" : "max-h-0"
                      )}
                    >
                      {!countries ? (
                        <p className="px-8 py-2 text-xs text-white/40">
                          No destinations
                        </p>
                      ) : (
                        <div className="px-6 pb-4 pt-1 grid grid-cols-2 gap-x-4 gap-y-3">
                          {Object.entries(countries).map(([country, destinations]) => (
                            <div key={country}>
                              <p className="text-xs font-semibold text-sky-300 uppercase tracking-wide mb-1 capitalize">
                                {country}
                              </p>
                              <ul className="space-y-1">
                                {destinations.map((dest) => (
                                  <li key={dest}>
                                    <Link
                                      to={`/city/${dest.toLowerCase()}`}
                                      className="text-xs text-white/70 hover:text-white transition-colors"
                                    >
                                      {dest}
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
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold",
          "bg-transparent hover:bg-gray-100 transition-colors select-none",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          isOpen && "bg-gray-100 text-black"
        )}
      >
        World
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
            "absolute top-full left-0 mt-1",
            "w-[800px] bg-white rounded-lg shadow-2xl border border-gray-100",
            "grid grid-cols-4 gap-6 p-6",
            "z-[9999]"
          )}
        >
          {/* LEFT SIDEBAR */}
          <div className="col-span-1 border-r pr-4 space-y-1">
            {regions.map((region) => (
              <div
                key={region}
                onMouseEnter={() => setActiveRegion(region)}
                onClick={() => setActiveRegion(region)}
                className={cn(
                  "cursor-pointer px-3 py-2 rounded capitalize text-sm transition-colors",
                  activeRegion === region
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {region}
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-3">
            <div className="flex gap-4 mb-4 flex-wrap">
              {regions.map((tab) => (
                <span
                  key={tab}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    tab === activeRegion
                      ? "bg-blue-100 text-blue-600 border-blue-400"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {isLoading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : !dynamicData[activeRegion] ? (
              <p className="text-sm text-gray-400">No destinations available</p>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(dynamicData[activeRegion] || {}).map(
                  ([country, destinations]) => (
                    <div key={country}>
                      <h4 className="font-semibold mb-2 capitalize text-sm text-gray-800">
                        {country}
                      </h4>
                      <ul className="space-y-1">
                        {destinations.map((dest) => (
                          <li key={dest} className="hover:text-blue-600 cursor-pointer text-gray-600 text-sm">
                            <Link to={`/city/${dest?.toLowerCase()}`}>{dest}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorldDropDownMenu;