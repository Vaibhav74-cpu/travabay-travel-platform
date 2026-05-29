import { useState } from "react";
import Rating from "./Rating.jsx";
import EnquiryForm from "./TravelEnquiryForm.jsx";
import {  X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TravelPackage({ pkg }) {
  const navigate = useNavigate();
  const [showFullHighlights, setShowFullHighlights] = useState(false);
  const [showFullPriceNote, setShowFullPriceNote] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  // Truncate highlights to 2 lines
  const highlightsPreview =
    pkg.highlights.split("→").slice(0, 2).join("→") + "...";
  const shouldShowMoreHighlights = pkg.highlights.split("→").length > 2;

  // Truncate price note to 80 characters
  const priceNotePreview =
    pkg.priceNote.length > 35
      ? pkg.priceNote.substring(0, 35) + "..."
      : pkg.priceNote;
  const shouldShowMorePrice = pkg.priceNote.length > 35;

  return (
    <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Main Container - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-0 p-4 md:p-3">
        {/* Image Section - Full width on mobile, half on tablet, 1/3 on desktop */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 relative h-64 md:h-72 lg:h-64 rounded-lg overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            onClick={() => navigate(`/package/${pkg._id}`)}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          />

          {/* Badge - Positioned on image */}
          {pkg.badge && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs md:text-xs font-bold px-2 py-1 rounded-full">
              {pkg.badge}
            </div>
          )}
        </div>

        {/* Content Section - Full width on mobile, half on tablet, 1/3 on desktop */}
        <div className="col-span-4 md:col-span-4 lg:col-span-4 flex flex-col justify-between py-2 md:py-0 px-4">
          {/* Title */}
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1">
            {pkg.title}
          </h2>

          {/* Tags - Responsive flex wrap */}
          <div className="flex flex-wrap gap-2 mb-1">
            {pkg.tags.map((tag, index) => (
              <span
                key={index}
                className="text-red-800 text-xs md:text-xs px-3 py-1  border border-red-300 border-dotted bg-red-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <Rating value={pkg.rating} />
            <span className="text-xs md:text-sm text-gray-600">
              {pkg.reviews} Reviews
            </span>
          </div>

          {/* All Inclusive Badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">∞</span>
            <span
              className={`text-xs md:text-sm px-2 py-1 rounded-full font-medium ${
                pkg.inclusive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {pkg.inclusive ? "All Inclusive" : "Exclusive"}
            </span>
          </div>

          {/* Days, Destinations, Departures - Responsive grid */}
          <div className="grid grid-cols-3 gap-3 pb-2 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Days</p>
              <p className="text-sm md:text-medium font-semibold text-gray-900 underline underline-offset-2">
                {pkg.days}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">
                Destinations
              </p>
              <p className="text-sm md:text-medium font-semibold text-gray-900">
                {pkg.destinations}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase mb-1">Departures</p>
              <p className="text-sm md:text-medium font-semibold text-gray-900">
                {pkg.departures}
              </p>
            </div>
          </div>

          {/* Tour Highlights */}
          <div className="">
            <p className="text-xs md:text-xs text-light text-green-600 uppercase">
              Tour Highlights
            </p>
            <p className="text-xs md:text-sm text-gray-700 line-clamp-2">
              {showFullHighlights ? pkg.highlights : highlightsPreview}
            </p>
            {shouldShowMoreHighlights && (
              <button
                onClick={() => setShowFullHighlights(!showFullHighlights)}
                className="text-xs md:text-xs text-blue-600 hover:text-blue-800 font-medium mt-1"
              >
                {showFullHighlights ? "Less" : "More"}
              </button>
            )}
          </div>
        </div>

        {/* Price & Action Section - Full width on mobile, half on tablet, 1/3 on desktop */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col justify-between items-center text-center border-2 m-3 mx-5 bg-purple-50 p-4 md:p-2 rounded-lg">
          {/* Price */}
          <div className="w-full md:mb-2">
            <p className="text-xs md:text-sm text-gray-600 mb-1">Starts from</p>
            <p className="text-2xl md:text-2xl font-bold text-gray-900">
              ₹
              {typeof pkg.price === "string"
                ? pkg.price
                : pkg.price.toLocaleString()}
            </p>
            <div>
              <p className="text-xs md:text-xs text-gray-600">
                {showFullPriceNote ? pkg.priceNote : priceNotePreview}
              </p>
              {shouldShowMorePrice && (
                <button
                  onClick={() => setShowFullPriceNote(!showFullPriceNote)}
                  className="text-xs md:text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showFullPriceNote ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          </div>

          {/* Buttons - Stack on mobile, side-by-side on desktop */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <button
              onClick={() => navigate(`/package/${pkg._id}`)}
              className="flex-1 md:flex-none bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-2 rounded text-xs md:text-xs whitespace-nowrap transition-colors"
            >
              Reserve your spot
            </button>
            <button
              onClick={() => navigate(`/package/${pkg._id}`)}
              className="flex-1 md:flex-none border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium py-2 px-2 rounded text-xs md:text-xs whitespace-nowrap transition-colors"
            >
              View Tour Details
            </button>
          </div>

          {/* Enquire Now Link */}
          <a
            onClick={() => setShowEnquiryForm(true)}
            className="text-xs md:text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium mt-1 w-full text-right cursor-pointer"
          >
            Enquire Now
          </a>

          {/* Modal overlay and form */}
          {showEnquiryForm && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
              onClick={() => setShowEnquiryForm(false)}
            >
              <div
                className="bg-white w-full md:w-96 h-screen overflow-y-auto shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowEnquiryForm(false)}
                  className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
                >
                  <X size={24} />
                </button>

                {/* Pass package data to the form */}
                <EnquiryForm
                  package={pkg}
                  onClose={() => setShowEnquiryForm(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TravelPackage;
