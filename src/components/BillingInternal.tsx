'use client';

import { useState } from 'react';

export default function SpaceBilling() {
  const [selectedCredits, setSelectedCredits] = useState('50000');
  const [autoTopUpCredits, setAutoTopUpCredits] = useState('50000');
  const [autoTopUpThreshold, setAutoTopUpThreshold] = useState('5000');
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(false);
  const [showUnlimitedOffer, setShowUnlimitedOffer] = useState(true);

  const creditOptions = [
    { value: '10000', label: '10,000 credits - $10', price: 10 },
    { value: '25000', label: '25,000 credits - $20', price: 20, popular: true },
    { value: '50000', label: '50,000 credits - $50', price: 50 },
    { value: '100000', label: '100,000 credits - $90', price: 90, bonus: '10% BONUS' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects - same as login */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl opacity-20"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

      {/* Starfield effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(120)].map((_, i) => {
          const random = Math.random();
          let starType;
          
          if (random > 0.95) {
            starType = {
              size: 'w-0.5 h-0.5',
              brightness: 'bg-white/60',
              opacity: 'opacity-80',
              glow: 'shadow-sm shadow-white/20'
            };
          } else if (random > 0.85) {
            starType = {
              size: 'w-0.5 h-0.5',
              brightness: 'bg-white/45',
              opacity: 'opacity-60',
              glow: ''
            };
          } else if (random > 0.65) {
            starType = {
              size: 'w-0.5 h-0.5',
              brightness: 'bg-white/25',
              opacity: 'opacity-40',
              glow: ''
            };
          } else {
            starType = {
              size: 'w-px h-px',
              brightness: 'bg-white/15',
              opacity: 'opacity-20',
              glow: ''
            };
          }
          
          return (
            <div
              key={i}
              className={`absolute ${starType.size} ${starType.brightness} ${starType.opacity} ${starType.glow} rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${1.5 + Math.random() * 5}s ease-in-out ${Math.random() * 4}s infinite alternate`,
              }}
            />
          );
        })}
        
        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-px h-px bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `shootingStar ${8 + Math.random() * 4}s linear ${i * 6 + Math.random() * 3}s infinite`
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(0.9); }
        }
        
        @keyframes shootingStar {
          0% { 
            opacity: 0; 
            transform: translateX(-100px) translateY(-100px) scale(0);
          }
          10% { 
            opacity: 1; 
            transform: translateX(-50px) translateY(-50px) scale(1);
          }
          90% { 
            opacity: 1; 
            transform: translateX(150px) translateY(150px) scale(1);
          }
          100% { 
            opacity: 0; 
            transform: translateX(200px) translateY(200px) scale(0);
          }
        }
        
        @keyframes subtleGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.15); }
        }
      `}</style>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Billing
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Manage payment details</p>
        </div>

        {/* Unlimited Plan Banner - Compact and Elegant */}
        {showUnlimitedOffer && (
          <div className="mb-6">
            <div 
              className="bg-black/30 backdrop-blur-2xl rounded-2xl border-2 border-white/20 p-6 relative overflow-hidden transform hover:scale-[1.005] transition-all duration-700 hover:border-white/30"
              style={{ animation: 'subtleGlow 8s ease-in-out infinite' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 pointer-events-none"></div>
              
              {/* Subtle floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-px h-px bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `twinkle ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 3}s infinite alternate`
                    }}
                  />
                ))}
              </div>

              <button 
                onClick={() => setShowUnlimitedOffer(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">PREMIUM PLAN</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Unlimited Credits
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-lg">$99<span className="text-gray-400 text-sm font-normal">/month</span></p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Unlimited Usage</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Priority Support</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>Early Access</span>
                    </div>
                  </div>

                  <button className="px-6 py-2.5 bg-gradient-to-r from-white/20 via-white/15 to-white/10 backdrop-blur-sm text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/10 border border-white/30 hover:border-white/40 text-sm">
                    Upgrade to Unlimited
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Payment Details */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Details
              </h3>
              
              <p className="text-gray-400 mb-6">
                Please provide your payment details to purchase credits.
              </p>
              
              <button className="relative bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group">
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add payment card
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {/* Payment History */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Payment History
              </h3>
              
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <p className="text-gray-500">No payments found.</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Top Up Section */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Top up
                </h3>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Balance:</p>
                  <p className="text-xl font-bold text-white">2,498 credits</p>
                </div>
              </div>

              {/* Credit Options */}
              <div className="space-y-3 mb-6">
                {creditOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setSelectedCredits(option.value)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedCredits === option.value
                        ? 'border-white/40 bg-white/5 shadow-lg'
                        : 'border-gray-700 hover:border-gray-600 bg-black/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-medium">{option.label}</span>
                          {option.popular && (
                            <span className="bg-gradient-to-r from-white/20 to-gray-600/20 text-white text-xs font-bold px-2 py-1 rounded border border-white/20">
                              POPULAR
                            </span>
                          )}
                          {option.bonus && (
                            <span className="bg-gradient-to-r from-white/15 to-gray-500/15 text-gray-300 text-xs font-bold px-2 py-1 rounded border border-white/15">
                              {option.bonus}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedCredits === option.value ? 'border-white bg-white/20' : 'border-gray-600'
                      }`}>
                        {selectedCredits === option.value && (
                          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-gray-500 mb-6 space-y-1">
                <p>* All prices are excluding tax. Tax may apply depending on your country.</p>
                <p>** Credits are valid for 6 months.</p>
              </div>

              <button className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Buy credits
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </button>
            </div>

            {/* Auto Top-ups */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Auto top-ups
              </h3>

              <div className="space-y-6">
                {/* Enable Auto Top-ups */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-white font-medium">Enable auto top-ups</span>
                  </div>
                  <div 
                    onClick={() => setAutoTopUpEnabled(!autoTopUpEnabled)}
                    className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 border ${
                      autoTopUpEnabled 
                        ? 'bg-white/15 border-white/25 shadow-sm' 
                        : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-all duration-300 ${
                      autoTopUpEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}>
                      <div className={`w-full h-full rounded-full flex items-center justify-center ${
                        autoTopUpEnabled ? 'bg-gradient-to-br from-white to-gray-100' : 'bg-gradient-to-br from-gray-200 to-gray-300'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          autoTopUpEnabled ? 'bg-gray-400' : 'bg-gray-500'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {autoTopUpEnabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Automatically top up
                      </label>
                      <select 
                        value={autoTopUpCredits}
                        onChange={(e) => setAutoTopUpCredits(e.target.value)}
                        className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                      >
                        {creditOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        When balance falls below
                      </label>
                      <select 
                        value={autoTopUpThreshold}
                        onChange={(e) => setAutoTopUpThreshold(e.target.value)}
                        className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                      >
                        <option value="1000">1,000 credits</option>
                        <option value="2500">2,500 credits</option>
                        <option value="5000">5,000 credits</option>
                        <option value="10000">10,000 credits</option>
                      </select>
                    </div>

                    <button className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 border border-white/30 hover:border-white/50 overflow-hidden group">
                      <span className="relative z-10">Save</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}