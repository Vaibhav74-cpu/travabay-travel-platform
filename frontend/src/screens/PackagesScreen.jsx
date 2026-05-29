import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TravelPackage from "@/components/shared/TravelPackage";
import { Search } from "lucide-react";
import { useGetPackagesQuery } from "@/redux/slices/packageApiSlice.js";
import Loader from "@/components/shared/Loader.jsx";
import Message from "@/components/shared/Message.jsx";
import { Link, useParams } from "react-router-dom";
import { priceRanges, tags } from "@/data/staticData.js";


function PackagesScreen() {
  const { keyword, pageNumber } = useParams();
  const {
    data: packages,
    isLoading,
    isError,
  } = useGetPackagesQuery({ keyword: keyword, pageNumber: pageNumber || "" });
  
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  // Filter packages based on selected filters
  const filteredPackages = (packages || []).filter((pkg) => {
    //filter by tag
    if (selectedTag !== "All Tags") {
      // Check if package has tags array and includes the selected tag
      const hasTag =
        pkg.tags &&
        pkg.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

      // Also check if package title or description contains the tag
      const titleContainsTag = pkg.title
        ?.toLowerCase()
        .includes(selectedTag.toLowerCase());
      const descriptionContainsTag = pkg.description
        ?.toLowerCase()
        .includes(selectedTag.toLowerCase());

      if (!hasTag && !titleContainsTag && !descriptionContainsTag) {
        return false;
      }
    }

    // if no filter selected → show all
    if (selectedPriceRanges.length === 0) return true;

    return selectedPriceRanges.some((rangeId) => {
      const range = priceRanges.find((r) => r.id === rangeId);

      if (!range) return false;

      return pkg.price >= range.min && pkg.price <= range.max;
    });
  });

  const handleResetFilters = () => {
   
    setSelectedTag("All Tags");
    setSelectedPriceRanges([]);
    setSelectedCountries([]);
    setCountrySearch("");
  };

  const togglePriceRange = (rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId],
    );
  };


  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6">Error loading packages</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-gray-200 ">
        <div className="px-4 md:px-8 md:pt-6">
          {keyword && (
            <Link
              to="/"
              className="bg-gray-100 p-2 rounded-lg shadow-sm cursor-pointer hover:bg-slate-300"
            >
              Back
            </Link>
          )}
          <div className="flex flex-col md:flex-row gap-4 md:gap-20 md:justify-center mb-4">
            {/* Title and Subtitle */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {filteredPackages.length} Holiday Packages
              </h1>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Showing {filteredPackages.length} packages out of{" "}
                {packages.length} total packages
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <label className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
                Tag
              </label>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full md:w-[300px] border-gray-300 text-xs md:text-sm">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={5}
                  className="w-[var(--radix-select-trigger-width)]  max-h-[300px] overflow-y-auto bg-white z-50"
                >
                  <SelectGroup>
                    <SelectLabel></SelectLabel>
                    {tags.map((tag, index) => (
                      <SelectItem key={index} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Filter */}
        <div className="w-full md:w-[280px] border-b md:border-b-0 border-gray-200">
          <div className="bg-white p-4 md:p-6 ml-6 md:sticky md:top-0 border-2 rounded-xl">
            <div className="flex justify-between items-center mb-4 md:mb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="text-blue-600 text-lg">⚙️</div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  Filter Your Tour
                </h3>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-blue-600 hover:text-blue-700 text-xs md:text-xs font-medium underline"
              >
                Reset
              </button>
            </div>

            {/* Price Range Section */}
            <div className="mb-4 md:mb-6">
              <h4 className="font-semibold text-gray-900 text-xs md:text-xs mb-2 md:mb-2">
                Price Range
              </h4>
              <div className="space-y-1">
                {priceRanges.map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.id)}
                      onChange={() => togglePriceRange(range.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-xs md:text-xs text-gray-700">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>


            {/* Countries Section */}

            <div>
              {/* <h4 className="font-semibold text-gray-900 text-xs md:text-sm mb-2 md:mb-3">
                Countries
              </h4> */}

              {/* Search Input */}
              {/* <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1 border border-gray-300 rounded-full text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div> */}

            </div>
            
          </div>
        </div>

        {/* Right Content - Packages */}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{isError}</Message>
        ) : (
          <div className="flex-1 pl-6 mb-10">
            {filteredPackages.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {filteredPackages.map((pkg) => (
                  <TravelPackage key={pkg._id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base md:text-lg">
                  No packages found matching your filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PackagesScreen;
