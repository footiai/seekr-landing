'use client';

import { useState } from 'react';

export default function SpaceSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('John Doe');
  const [language, setLanguage] = useState('en');
  const [showPasswords, setShowPasswords] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'pt', label: 'Português', flag: '🇧🇷' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects - same as billing */}
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
              Settings
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your account preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Profile Settings */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Settings
              </h3>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter your email address"
                  />
                </div>

                <button className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Profile
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </button>
              </div>
            </div>

            {/* Password Settings */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security
              </h3>

              <div className="space-y-6">
                {/* Show Passwords Toggle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-white font-medium">Show passwords</span>
                  </div>
                  <div 
                    onClick={() => setShowPasswords(!showPasswords)}
                    className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 border ${
                      showPasswords 
                        ? 'bg-white/15 border-white/25 shadow-sm' 
                        : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-all duration-300 ${
                      showPasswords ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </div>
                </div>

                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter current password"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-all duration-300 hover:border-gray-600"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-all duration-300 hover:border-gray-600"
                    placeholder="Confirm new password"
                  />
                </div>

                <button className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Update Password
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Language Settings */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Language & Region
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Interface Language
                  </label>
                  <div className="relative">
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-white/40 focus:outline-none transition-all duration-300 hover:border-gray-600 appearance-none cursor-pointer pr-10"
                    >
                      {languageOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                          {option.flag} {option.label}
                        </option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Language
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </button>
              </div>
            </div>

            {/* Notifications & Privacy */}
            <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.829 2.829-.707.707M9.828 15l-5-5 .707-.707L8.364 12l5-5-.707-.707L9.828 9.121 7 7"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferences
              </h3>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    emailNotifications
                      ? 'border-white/40 bg-white/5 shadow-lg'
                      : 'border-gray-700 hover:border-gray-600 bg-black/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <div>
                        <span className="text-white font-medium block">Email notifications</span>
                        <span className="text-gray-400 text-sm">Get notified about account activity</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      emailNotifications ? 'border-white bg-white/20' : 'border-gray-600'
                    }`}>
                      {emailNotifications && (
                        <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    twoFactorEnabled
                      ? 'border-white/40 bg-white/5 shadow-lg'
                      : 'border-gray-700 hover:border-gray-600 bg-black/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <span className="text-white font-medium block">Two-factor authentication</span>
                        <span className="text-gray-400 text-sm">Add an extra layer of security</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      twoFactorEnabled ? 'border-white bg-white/20' : 'border-gray-600'
                    }`}>
                      {twoFactorEnabled && (
                        <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-6 border-t border-gray-700/50">
                  <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Danger Zone
                  </h4>
                  <button className="relative w-full bg-gradient-to-r from-red-600/20 via-red-700/10 to-transparent backdrop-blur-sm text-red-400 py-3 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-red-500/30 hover:border-red-400/50 overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Account
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}