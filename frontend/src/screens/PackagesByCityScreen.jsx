import TravelPackage from "@/components/shared/TravelPackage";
import { useGetPackagesByCityQuery } from "@/redux/slices/packageApiSlice";
import React from "react";
import { useParams } from "react-router-dom";

function PackagesByCityScreen() {
  const { city } = useParams();
  const { data: packages } = useGetPackagesByCityQuery(city);

  return (
   <div className="max-w-6xl mx-auto mt-12">
     <div className="flex-1 pl-6 mb-10">
      {packages?.length > 0 ? (
        <div className="space-y-4 md:space-y-6">
          {packages.map((pkg) => (
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
   </div>
  );
}

export default PackagesByCityScreen;
