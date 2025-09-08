'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-black min-h-screen flex items-center">
      {/* Background with white/gray fog effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at top left, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at bottom right, rgba(255,255,255,0.05) 0%, transparent 50%),
                        radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)`
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Find what you&apos;re <span className="text-gray-300">looking for</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              The most powerful search API for developers. Integrate quickly and deliver precise 
              and relevant results to your users.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-800">
                Documentation
              </button>
              <button className="bg-white text-black px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-500 font-medium">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{`< 100ms`}</div>
                <div className="text-gray-500 font-medium">Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
                <div className="text-gray-500 font-medium">Searches/Day</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 -mt-16">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/globe.png" 
                alt="Globe" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-gray-600 rounded-lg flex justify-center">
          <div className="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
