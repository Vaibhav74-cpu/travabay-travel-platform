import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  Shield,
  Utensils,
  Camera,
  Bus,
  BookOpen,
  FileCheck,
  Phone,
  Mail,
  ChevronRight,
  Infinity,
} from "lucide-react";
import Loader from "@/components/shared/Loader";
import Message from "@/components/shared/Message";
import { useGetPackageByIdQuery } from "@/redux/slices/packageApiSlice";

import StarRating from "@/components/shared/StarRating";
import TagBadge from "@/components/shared/TopBadge";
import AccordionItem from "@/components/shared/AccordionItem";
import { DEFAULT_ITINERARY } from "@/data/staticData";
import { useCreateBookingMutation } from "@/redux/slices/bookingApiSlice";
import ReserveSpot from "@/components/shared/ReserveSpot";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
];

const INCLUDES = [
  { icon: Shield, label: "Hotel" },
  { icon: Utensils, label: "Meals" },
  { icon: Camera, label: "Sightseeing" },
  { icon: Bus, label: "Transport" },
  { icon: BookOpen, label: "Guide" },
  { icon: FileCheck, label: "Permits" },
];

// Dummy itinerary — replace with pkg.itinerary once your backend exposes it

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${active ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
    >
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function PackageDetailsScreen() {
  const { id: packageId } = useParams();
  const [open, setOpen] = useState(false);
  const { data: pkg, isLoading, isError } = useGetPackageByIdQuery(packageId);
  
  const [reserveSpot] = useCreateBookingMutation();

  console.log(pkg);

 
  const navigate = useNavigate();
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeSection, setActiveSection] = useState("Itinerary");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });



  const images = pkg?.image
    ? [pkg.image, ...FALLBACK_IMAGES.slice(1)]
    : FALLBACK_IMAGES;
  const sections = [
    "Itinerary",
    "Tour Details",
    "Tour Information",
    "Need to Know",
    "Policy & Terms",
    "Upgrades",
  ];
  const itinerary = DEFAULT_ITINERARY; // swap with pkg.itinerary when available

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (isError)
    return (
      <div className="p-8">
        <Message variant="danger">Failed to fetch package details.</Message>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* ── BREADCRUMB ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/" className="hover:text-amber-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            to="/packages"
            className="hover:text-amber-600 transition-colors"
          >
            Packages
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-800 font-medium truncate max-w-[200px]">
            {pkg?.title}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* ── HERO GALLERY ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_100px] gap-3 rounded-2xl overflow-hidden mb-6">
          {/* Main image */}
          <div className="relative overflow-hidden rounded-2xl lg:rounded-r-none aspect-[16/9] lg:aspect-auto lg:max-h-[460px] bg-gray-200">
            <img
              src={images[activeThumb]}
              alt={pkg?.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {/* Review overlay */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg max-w-[220px] hidden sm:block">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                  <Star size={10} className="fill-white text-white" />
                </div>
                <span className="text-xs font-bold text-gray-800">
                  {pkg?.rating > 4.5 ? "Excellent" : "Good"} ·{" "}
                  {pkg?.rating ?? "4.8"}/5
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-snug line-clamp-3 italic">
                {pkg?.highlights}
              </p>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] font-semibold text-gray-700"></span>
                <span className="text-[10px] text-gray-400">Tour Manager</span>
              </div>
            </div>
          </div>

          {/* Thumbnails — vertical strip on desktop, horizontal on mobile */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[460px] scrollbar-thin scrollbar-thumb-gray-200 lg:rounded-r-2xl">
            {images.slice(1).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i + 1)}
                className={`shrink-0 w-20 h-20 lg:w-full lg:h-24 rounded-xl overflow-hidden border-2 transition-all ${activeThumb === i + 1 ? "border-amber-400 opacity-100" : "border-transparent opacity-75 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── TITLE STRIP ──────────────────────────────────────────────────── */}
        <div className="mb-6">
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-3">
            {pkg?.badge && <TagBadge label={pkg.badge} />}
            {(pkg?.tags ?? []).map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
            {pkg?.title ?? "Package Details"}
          </h1>

          {/* Rating row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <StarRating rating={pkg?.rating} />
            <span className="text-sm font-semibold text-gray-800">
              {pkg?.rating ?? "—"}
            </span>
            <span className="text-sm text-gray-500">
              {pkg?.reviews
                ? `${pkg.reviews}+ guests rated ${pkg.rating}★`
                : "No reviews yet"}
            </span>
            {pkg?.reviews && (
              <a
                href="#"
                className="text-sm font-semibold text-blue-600 underline underline-offset-2"
              >
                {pkg.reviews} Reviews
              </a>
            )}
          </div>

          {/* Trip meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {pkg?.inclusive ? (
              <span className="flex items-center gap-1.5 font-medium text-gray-700 p-1 bg-green-200 rounded-xl ">
                <Infinity size={16} className="text-amber-500" />
                All Inclusive
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-medium text-gray-700 bg-red-200 rounded-xl p-1">
                All Exclusive
              </span>
            )}
            {pkg?.days && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-400" />
                <span className="font-semibold text-gray-800">{pkg.days}</span>
              </span>
            )}
            {pkg?.destinationName && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400" />
                <span>
                  {pkg.destinationName} -{" "}
                  <span className="text-green-600 font-semibold">
                    {pkg?.group}
                  </span>
                </span>
              </span>
            )}
            {pkg?.departures && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-400" />
                <span>{pkg.departures} Departures</span>
              </span>
            )}
          </div>
        </div>

        {/* ── TWO-COLUMN LAYOUT ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Route summary */}
            {pkg?.destinationName && (
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {pkg?.title} , {pkg.destinationName} - {pkg?.group} ({pkg?.category})
                </p>
              </div>
            )}

            {/* Tour Manager */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Travabay Tour Manager
              </h2>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Users size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 mb-1.5">
                    This tour in{" "}
                    <strong className="capitalize">
                      {pkg?.destinationName}
                    </strong>{" "}
                    is specially curated for travelers looking for memorable
                    experiences, local culture, and comfortable stays.
                  </p>
                  <ul className="space-y-1">
                    {[
                      `Explore the beauty of ${pkg?.destinationName} with expert planning.`,
                      `${pkg?.days} trip with well-managed travel experiences.`,
                      `Perfect for ${pkg?.tags?.join(", ").toLowerCase()} travelers.`,
                    ].map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {/* <button className="mt-2 text-sm font-semibold text-blue-600 hover:underline">
                    View more
                  </button> */}
                </div>
              </div>
            </div>

            {/* Tour Highlights */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Tour Highlights
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {(
                  pkg?.highlights?.split(".").filter(Boolean) ?? [
                    "Arrival Srinagar – Pahalgam",
                    "ABC Valley – Srinagar Houseboat",
                    "Srinagar – Gulmarg",
                  ]
                )
                  .slice(0, 6)
                  .map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {point.trim()}
                    </li>
                  ))}
              </ul>
              {/* <button className="mt-3 text-sm font-semibold text-blue-600 hover:underline">
                View more
              </button> */}
            </div>

            {/* Call-back form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              {/* <form onSubmit={submitHandler}>
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Want us to call you?
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name*"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                  <input
                    type="email"
                    placeholder="Email ID*"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 shrink-0">
                      <span className="text-xs">🇮🇳</span>
                      <span className="text-gray-700 font-medium">+91</span>
                      <ChevronDown size={12} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      placeholder="+91"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                  </div>
                  <button className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                    Request Call Back
                  </button>
                </div>
              </form> */}
            </div>

            {/* Booking / Departure Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-900 mb-1">
                Select departure city, dates &amp; add guests to book your tour
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                As seats fill, prices increase! So book today!
              </p>

              <p className="text-sm font-semibold text-gray-700 mb-3">
                1. Select departure city &amp; date
              </p>

              <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4 hover:bg-blue-700 transition-colors">
                <span>+</span> All departures
              </button>

              {/* Departure calendar card */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[
                  {
                    month: "JUNE",
                    year: "2026",
                    day: "01",
                    price: "₹24,999",
                    lowest: true,
                  },
                  {
                    month: "JULY",
                    year: "2026",
                    day: "15",
                    price: "₹26,999",
                    lowest: false,
                  },
                  {
                    month: "AUG",
                    year: "2026",
                    day: "08",
                    price: "₹25,499",
                    lowest: false,
                  },
                ].map((dep, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-28 border-2 border-gray-200 rounded-xl overflow-hidden text-center cursor-pointer hover:border-amber-400 transition-colors"
                  >
                    <div className="bg-gray-800 text-white text-[10px] font-bold py-1 tracking-widest">
                      {dep.month} {dep.year}
                    </div>
                    <div className="py-3">
                      <p className="text-3xl font-bold text-gray-800">
                        {dep.day}
                      </p>
                      <p className="text-xs font-semibold text-gray-700 mt-1">
                        {dep.price}
                      </p>
                      {dep.lowest && (
                        <p className="text-[10px] text-red-500 font-medium mt-0.5">
                          Lowest Price
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-4">
                You can complete your booking now by paying 20% online, or skip
                payment and just reserve your seats. Departure city &amp; date
                and a short message are required.
              </p>
            </div>

            {/* Section Nav Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex gap-6 px-5 overflow-x-auto border-b border-gray-100">
                {sections.map((s) => (
                  <SectionTab
                    key={s}
                    label={s}
                    active={activeSection === s}
                    onClick={() => setActiveSection(s)}
                  />
                ))}
              </div>

              <div className="p-5">
                {activeSection === "Itinerary" && (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-gray-900">
                        Itinerary{" "}
                        <span className="text-gray-400 font-normal text-sm">
                          (Day Wise)
                        </span>
                      </h3>
                      <button className="text-sm font-semibold text-blue-600 hover:underline">
                        View all days
                      </button>
                    </div>
                    <div className="space-y-0">
                      {itinerary.map((item) => (
                        <AccordionItem key={item.day} {...item} />
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "Tour Details" && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Tour Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      Best facilities with no added cost.
                    </p>
                  </div>
                )}

                {activeSection === "Tour Information" && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Tour Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Detailed tour information will be shown here.
                    </p>
                  </div>
                )}

                {!["Itinerary", "Tour Details", "Tour Information"].includes(
                  activeSection,
                ) && (
                  <p className="text-sm text-gray-500">
                    Content for <strong>{activeSection}</strong> coming soon.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — sticky price card */}
          <div className="lg:sticky lg:top-6 space-y-4 self-start">
            {/* Price card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
              {/* Header tabs */}
              <div className="grid grid-cols-2 border-b border-gray-100 text-center text-xs font-semibold">
                <div className="py-3 border-r border-gray-100 text-gray-700">
                  <p className="text-gray-400 font-normal">
                    Srinagar To Srinagar
                  </p>
                  <p className="text-[10px] text-gray-400">Starts from</p>
                  <p className="text-lg font-extrabold text-gray-900">
                    ₹
                    {pkg?.price
                      ? Number(pkg.price).toLocaleString("en-IN")
                      : "24,999"}
                  </p>
                </div>
                <div className="py-3 text-gray-700">
                  <p className="text-gray-400 font-normal">Joining/Leaving</p>
                  <p className="text-[10px] text-gray-400">Starts from</p>
                  <p className="text-lg font-extrabold text-gray-900">
                    ₹
                    {pkg?.price
                      ? Number(pkg.price).toLocaleString("en-IN")
                      : "24,999"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="px-4 py-3 text-xs text-gray-600 border-b border-gray-100">
                {pkg?.priceNote ??
                  "Breakfast from day 2nd till day 6th day. Dinner from day 1 to day 5th, all transport included. Sightseeing included."}
              </div>

              {/* Includes icons */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Tour Includes
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {INCLUDES.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 text-center"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                        <Icon size={16} className="text-amber-600" />
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking summary */}
              <div className="px-4 py-3 space-y-1.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-700 mb-2">
                  Booking Summary
                </p>
                {[
                  ["Dept. city", "All departures"],
                  ["Dept. date", "—"],
                  ["Travellers", "0 Adult(s) | 0 Child | 0 Infant"],
                  ["Rooms", "0 Room"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <span className="text-gray-400">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>

              {/* Basic price */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-gray-700">
                      Basic Price
                    </p>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Cancellation Policy
                    </a>
                    <p className="text-[10px] text-gray-400">
                      per person on twin sharing
                    </p>
                  </div>
                  <p className="text-xl font-extrabold text-gray-900">
                    ₹
                    {pkg?.price
                      ? Number(pkg.price).toLocaleString("en-IN")
                      : "24,999"}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="p-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate("/contact-us")}
                  className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Enquire Now
                </button>
                <ReserveSpot pkg={pkg} reserveSpot={reserveSpot} />
              </div>
            </div>

            {/* Dates & Prices CTA */}
            <button className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm">
              Dates &amp; Prices
            </button>

            {/* Quick contact */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
              <p className="text-xs font-bold text-gray-700">Need Help?</p>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Phone size={14} className="text-amber-500" /> +91 99999 99999
              </a>
              <a
                href="mailto:hello@travabay.com"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Mail size={14} className="text-amber-500" /> hello@travabay.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetailsScreen;
