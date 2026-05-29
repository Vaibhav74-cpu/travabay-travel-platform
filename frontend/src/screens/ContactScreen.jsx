import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSendEnquieryMutation } from "@/redux/slices/enquieryApiSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { contactSlides } from "@/data/staticData";

const ContactScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [createEnquiery] = useSendEnquieryMutation();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    destination: "",
    travellers: "",
    travelDetails: "",
  });

  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contactSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contactSlides.length) % contactSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 15000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = contactSlides[currentSlide];

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitEnquieryHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name: input.name,
      email: input.email,
      countryCode: input.countryCode,
      phoneNumber: input.phone,
      destination: input.destination,
      travellers: input.travellers,
      travelDetails: input.travelDetails || "",
    };

    try {
      const res = await createEnquiery(payload).unwrap();
      navigate("/");
      toast.success(res?.data?.message || "Enquiery send succesfully");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Some issues are happening while sending enquiery",
      );
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Main Carousel Section - Shorter Height */}
      <div className="relative w-full h-auto md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentSlideData.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#041d49e6]/90 via-[#041d49e6]/90 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col md:flex-row items-start md:items-center px-4 md:px-6 lg:px-8 gap-4 md:gap-0 py-6 md:py-0 md:h-full">
          {/* Left Content Section */}
          <div className="w-1/2 md:w-1/2 text-white z-10">
            <div className="bg-gray-600/40 backdrop-blur-sm rounded-full inline-block px-3 py-2 mb-3 md:mb-4">
              <span className="text-[10px] md:text-xs tracking-wide">
                TRAVABAY HOLIDAYS
              </span>
            </div>

            <h1 className="text-4xl sm:text-3xl md:text-4xl leading-tight mb-3">
              Tell us about your next trip to{" "}
              <span className="text-yellow-400 font-semibold transition-all duration-500">
                {currentSlideData.destination}
              </span>
            </h1>

            <p className="text-gray-200 mb-4 text-xs sm:text-sm leading-relaxed max-w-sm">
              {currentSlideData.description}
            </p>

            {/* Highlights */}
            <div className="mb-4 md:mb-6">
              {currentSlideData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 mb-1 md:mb-2">
                  <span className="text-yellow-400 mt-0.5 text-sm md:text-base flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-xs md:text-sm text-gray-100 leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 md:flex-row md:gap-6 text-xs md:text-sm w-full md:w-auto">
              <div className="flex items-center gap-2 bg-gray-900/40 backdrop-blur-sm rounded-full px-4 py-2 md:px-4 md:py-2 mb-4">
                <span className="text-sm md:text-base">📞</span>
                <span className="text-sm md:text-sm">+91 95796 59074</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/40 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <span>📧</span>
                <span>holidays@travabay.com</span>
              </div>
            </div>
          </div>

          {/* Right Form Section - Full Height Stretch */}
          <div className="w-full md:w-1/2 flex items-center justify-center z-20 md:h-full">
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl w-full md:max-w-xxl md:h-[450px]">
              <form onSubmit={submitEnquieryHandler}>
                <h2 className="text-lg sm:text-xl text-light text-gray-800 mb-4">
                  Plan your holiday with us
                </h2>
                <div className="space-y-4">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={inputHandler}
                      placeholder="Full Name*"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={inputHandler}
                      placeholder="Email ID*"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                  </div>

                  {/* Row 2: Country Code & Phone */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <select
                      name="countryCode"
                      value={input.countryCode}
                      onChange={inputHandler}
                      className="px-3 bg-gray-50 text-sm outline-none"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>

                    <input
                      type="tel"
                      name="phone"
                      value={input.phone}
                      onChange={inputHandler}
                      placeholder="Phone Number*"
                      className="flex-1 px-4 py-3 outline-none text-sm"
                    />
                  </div>

                  {/* Row 3: Preferred Destination & Travelers */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="destination"
                      value={input.destination}
                      onChange={inputHandler}
                      placeholder="Prefered destination"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                    <input
                      type="number"
                      name="travellers"
                      value={input.travellers}
                      onChange={inputHandler}
                      placeholder="No. of travellers"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    name="travelDetails"
                    value={input.travelDetails}
                    onChange={inputHandler}
                    placeholder="Share your travel dates and special requests"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs sm:text-sm"
                  ></textarea>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-light py-3 rounded-full hover:shadow-lg transition-shadow text-sm"
                  >
                    Send Enquiry
                  </button>

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-500 text-center">
                    Our holiday expert will get in touch within 24 working
                    hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Carousel Controls - Bottom Center */}
        <div className="absolute bottom-6 right-1/2 transform -translate-x-1/2 flex gap-3 items-center z-30">
          <button
            onClick={prevSlide}
            className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {contactSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? "bg-yellow-400 w-6"
                    : "bg-white/50 hover:bg-white/70 w-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center px-2 sm:px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            We are with you at every step of the journey
          </h2>
          <p className="text-gray-600 mb-8 ">
            Reach out to us for trip planning, booking support or anything in
            between.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: "🏢",
                title: "Visit Our Branches",
                desc: "Walk into the nearest Travabay branch to speak with our holiday experts in person.",
              },
              {
                icon: "⏰",
                title: "Timings",
                desc: "Monday to Saturday, 10:00 AM to 7:00 PM. Public holiday timings may differ.",
              },
              {
                icon: "🌐",
                title: "Stay Connected",
                desc: "Follow Travabay on social media for new tours, deals and travel inspiration.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition"
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="text-light text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
