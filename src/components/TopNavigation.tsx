'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const searchSuggestions = [
  'AI powered search...',
  'Find anything instantly...',
  'Search with intelligence...',
  'Discover new insights...',
  'Smart search results...'
];

export default function TopNavigation() {
  const { showLogin, showRegister } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [typewriterText, setTypewriterText] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);

  useEffect(() => {
    if (isUserTyping || isSearchFocused) return;

    let currentSuggestionIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const animateText = () => {
      const currentSuggestion = searchSuggestions[currentSuggestionIndex];
      
      if (!isDeleting) {
        setTypewriterText(currentSuggestion.slice(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentSuggestion.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            animateText();
          }, 2000);
          return;
        }
        
        timeout = setTimeout(animateText, 100);
      } else {
        setTypewriterText(currentSuggestion.slice(0, currentCharIndex));
        currentCharIndex--;
        
        if (currentCharIndex < 0) {
          isDeleting = false;
          currentCharIndex = 0;
          currentSuggestionIndex = (currentSuggestionIndex + 1) % searchSuggestions.length;
        }
        
        timeout = setTimeout(animateText, 50);
      }
    };

    timeout = setTimeout(animateText, 1000);

    return () => clearTimeout(timeout);
  }, [isUserTyping, isSearchFocused]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setIsUserTyping(e.target.value.length > 0);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsUserTyping(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (searchValue.length === 0) {
      setIsUserTyping(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-gray-500/10 to-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
          
          <div className="relative bg-black/30 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-2xl shadow-black/50 p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Seekr Logo"
                  width={940}
                  height={214}
                  className="h-8 w-auto"
                />
              </div>

              <div className="flex-1 max-w-lg mx-8">
                <div className="relative group/search">
                  <div className={`absolute -inset-1 bg-gradient-to-r from-white/20 via-gray-400/20 to-white/20 rounded-xl opacity-0 blur transition-all duration-500 ${
                    isSearchFocused ? 'opacity-20' : 'group-hover/search:opacity-10'
                  }`}></div>
                  
                  <div className={`relative rounded-xl border-2 transition-all duration-500 ${
                    isSearchFocused
                      ? 'border-white/40 shadow-2xl bg-white/10 shadow-gray-500/20'
                      : 'border-white/20 hover:border-white/30 bg-black/20 hover:bg-white/5'
                  }`}>
                    
                    <input
                      type="text"
                      value={searchValue}
                      placeholder=""
                      className="w-full px-5 py-3 pr-12 bg-transparent outline-none text-white text-lg"
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      onChange={handleSearchInput}
                    />
                    
                    {!isUserTyping && (
                      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <span className="text-gray-400 text-lg">
                          {typewriterText}
                          <span className="animate-pulse">|</span>
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className={`p-1 rounded-full transition-all duration-300 ${
                        isSearchFocused ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}>
                        <svg
                          className="w-5 h-5 text-gray-400 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
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
                </div>
              </div>

              <div className="flex items-center space-x-8">
                {['About', 'API', 'Pricing', 'Contact'].map((item) => (
                  <button
                    key={item}
                    className="relative text-gray-400 hover:text-white transition-all duration-300 font-medium text-lg group/nav"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-white transition-all duration-300 group-hover/nav:w-full"></span>
                  </button>
                ))}
                
                <button onClick={showLogin} className="relative group/signin overflow-hidden">
                  <div className="relative bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-6 py-2.5 rounded-xl font-medium text-base transition-all duration-300">
                    <span className="relative z-10 flex items-center gap-2">
                      Sign In
                    </span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/signin:opacity-100 transition-all duration-300 rounded-xl"></div>
                  </div>
                </button>
                
                <button onClick={showRegister} className="relative group/register overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-gray-400/20 to-white/20 rounded-xl opacity-0 group-hover/register:opacity-70 blur transition-all duration-500"></div>
                  
                  <div className="relative bg-gradient-to-r from-white via-gray-100 to-white text-black px-8 py-3 rounded-xl font-semibold text-base shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200 opacity-0 group-hover/register:opacity-100 transition-all duration-500 rounded-xl"></div>
                    
                    <span className="relative z-10 flex items-center gap-2">
                      Register
                      <svg className="w-4 h-4 transition-all duration-300 group-hover/register:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    
                    <div className="absolute inset-0 -translate-x-full group-hover/register:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
