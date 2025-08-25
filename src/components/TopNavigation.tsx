'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TopNavigation() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Container - Floating card with glassmorphism */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border-2 border-white/40 shadow-2xl shadow-gray-500/30 p-4 relative overflow-hidden">
          {/* Elegant decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"></div>
          <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-gray-700 to-transparent rounded-3xl opacity-20 blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Seekr Logo"
                width={940}
                height={214}
                className="h-8 w-auto"
              />
            </div>

            {/* Search Bar - Rectangle with rounded corners */}
            <div className="flex-1 max-w-lg mx-8">
              <div
                className={`relative rounded-xl border-2 transition-all duration-300 ${
                  isSearchFocused
                    ? 'border-gray-400 shadow-lg bg-white/5'
                    : 'border-gray-700 hover:border-gray-600 bg-black/30'
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-5 py-3 pr-10 bg-transparent outline-none text-white placeholder-gray-500"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              <button className="relative text-gray-400 hover:text-white transition-all duration-300 font-medium text-lg group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
              <a href="#api" className="relative text-gray-400 hover:text-white transition-all duration-300 font-medium text-lg group">
                API
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#pricing" className="relative text-gray-400 hover:text-white transition-all duration-300 font-medium text-lg group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button className="relative text-gray-400 hover:text-white transition-all duration-300 font-medium text-lg group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button className="relative bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-105 border border-white/20 hover:border-white/40 overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  Sign In
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
