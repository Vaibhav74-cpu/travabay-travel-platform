import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


// Import your company logos
import SecoLogo from "../assets/Corporate-Travel/Seco.png";
import HdfcLogo from "../assets/Corporate-Travel/HDFCBank.png";
import IciLogo from "../assets/Corporate-Travel/ICICIBank.png";
import TagitLogo from "../assets/Corporate-Travel/Tagit.png";
import TechMahindraLogo from "../assets/Corporate-Travel/TechMahindra.png";
import BoschLogo from "../assets/Corporate-Travel/Bosch.png";
import JswLogo from "../assets/Corporate-Travel/JSW.png";
import LupinLogo from "../assets/Corporate-Travel/Lupin.png";
import Pidilitelogo from "../assets/Corporate-Travel/Pidilite.png";

import KecLogo from "../assets/Corporate-Travel/KEC.png";
import MahindraLogo from "../assets/Corporate-Travel/Mahindra.png";
import TransrailLogo from "../assets/Corporate-Travel/Transrail.png";
import DiffusionLogo from "../assets/Corporate-Travel/Diffusion.png";
import ShriramLogo from "../assets/Corporate-Travel/SriramFinance.png";
import CalderysLogo from "../assets/Corporate-Travel/Calderys.png";
import MahagencoLogo from "../assets/Corporate-Travel/MahaGenco.png";
import AnkitPulpLogo from "../assets/Corporate-Travel/AnkitPulps.png";
import { corporateSlides } from '@/data/staticData';

const CorporateTravelScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);


  const logos = [
    SecoLogo, HdfcLogo, IciLogo, TagitLogo, TechMahindraLogo, BoschLogo, JswLogo, LupinLogo, Pidilitelogo, KecLogo, MahindraLogo, TransrailLogo, DiffusionLogo, ShriramLogo, CalderysLogo, MahagencoLogo, AnkitPulpLogo
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % corporateSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + corporateSlides.length) % corporateSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 15000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = corporateSlides[currentSlide];

  return (
    <div className="w-full bg-gray-100">
      {/* Main Carousel Section */}
      <div className="relative w-full h-auto md:h-[550px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentSlideData.backgroundImage})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#041d49e6]/90 via-[#041d49e6]/90 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col md:flex-row items-center md:items-center px-4 md:px-8 py-6 md:py-0 md:h-full gap-4 md:gap-0">
          {/* Left Arrow Navigation */}
            <button
              onClick={prevSlide}
              className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-40">
              <ChevronLeft size={24} />
            </button>
            {/* Left Content Section */}
          <div className="w-full md:w-1/2 text-white z-10 md:ml-20">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-full inline-block px-3 py-2 mb-3 md:mb-4">
              <span className="text-[10px] md:text-xs tracking-wide">TRAVABAY CORPORATE TOURS</span>
            </div>

            <h1 className="text-2xl sm:text-2.5xl md:text-3xl leading-tight mb-2">
              Corporate Tours{' '}
              <span className="text-gray-100 transition-all duration-500">
                {currentSlideData.destination}
              </span>
            </h1>

            <p className="text-gray-200 mb-3 text-xs sm:text-sm leading-relaxed max-w-sm">
              {currentSlideData.description}
            </p>

            {/* Highlights */}
            <div className="mb-4 md:mb-6">
              {currentSlideData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5 text-sm md:text-base flex-shrink-0">✓</span>
                  <span className="text-xs md:text-sm text-gray-100 leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Right Form Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-6 h-auto md:h-full z-20">
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xl w-full md:w-[350px] md:max-w-md">
              <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                Request Call Back
              </h2>

              <div className="space-y-2">
                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />

                {/* Email ID */}
                <input
                  type="email"
                  placeholder="Email ID*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />

                {/* Company Name */}
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />

                {/* Company ID */}
                <input
                  type="text"
                  placeholder="Company ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                />

                {/* Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-xs md:text-sm">IN +91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs md:text-sm"
                  />
                </div>

                {/* Tell us more */}
                <textarea
                  placeholder="Tell us more"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs md:text-sm"
                ></textarea>

                {/* Submit Button */}
                <button className="w-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 py-3 rounded-full hover:shadow-lg transition-shadow text-xs md:text-sm flex items-center justify-center gap-2">
                  <span className="text-base md:text-lg">📞</span>
                  Request Call Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls - Bottom Center */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 items-center z-30">
          {/* Dots */}
          <div className="flex gap-2">
            {corporateSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'bg-yellow-400 w-6'
                    : 'bg-white/50 hover:bg-white/70 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Logos Carousel Section */}
      <div className="bg-white py-6 md:py-12 px-2 md:px-4">
        <div className="w-full overflow-hidden">
          {/* First Row - Moving Right */}
          <div className="mb-8 flex overflow-hidden">
            <style>{`
              @keyframes scroll-right {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .scroll-right {
                animation: scroll-right 30s linear infinite;
                display: flex;
                gap: 40px;
              }
            `}</style>
            <div className="scroll-right">
              {[...logos, ...logos].map((logo, idx) => (
                <div key={idx} className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 flex items-center justify-center">
                  <img
                    src={logo}
                    alt={`Logo ${idx}`}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Moving Left */}
          <div className="flex overflow-hidden">
            <style>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(100%);
                }
                100% {
                  transform: translateX(-100%);
                }
              }
              .scroll-left {
                animation: scroll-left 30s linear infinite;
                display: flex;
                gap: 40px;
              }
            `}</style>
            <div className="scroll-left">
              {[...logos, ...logos].map((logo, idx) => (
                <div key={idx} className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
                  <img
                    src={logo}
                    alt={`Logo ${idx}`}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateTravelScreen;