import React from "react";
import { useNavigate } from "react-router-dom";
// import packages from '../../packages';
import { useGetPackagesQuery } from "@/redux/slices/packageApiSlice";
import Loader from "./Loader";
import Message from "./Message";

function HomePackageGrid() {
  const { data: packages, isLoading, isError } = useGetPackagesQuery();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
          Featured Packages
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Explore our handpicked travel packages
        </p>

        {/* Grid Container - Responsive */}

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{isError}</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {packages.slice(0, 6).map((pkg) => (
              <div
                key={pkg._id}
                onClick={() => navigate(`/package/${pkg._id || pkg._id}`)}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg h-48 sm:h-56 md:h-64 mb-3 shadow-md hover:shadow-xl transition-all duration-300">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                      {pkg.badge}
                    </div>
                  )}

                  {/* Duration Badge */}
                  {pkg.days && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
                      {pkg.days.split(" ")[0]} Days
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-yellow-600 transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">from</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900">
                        ₹
                        {typeof pkg.price === "string"
                          ? pkg.price
                          : pkg.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePackageGrid;
