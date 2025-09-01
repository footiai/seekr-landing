'use client';

import { useState } from 'react';

interface LoginScreenProps {
  onClose: () => void;
  onShowRegister: () => void;
}

export default function LoginScreen({ onClose, onShowRegister }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    // Simular login
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Login realizado com sucesso!');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl opacity-20"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

      {/* Realistic starfield effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(120)].map((_, i) => {
          // Distribuição realista de tipos de estrelas
          const random = Math.random();
          let starType;
          
          if (random > 0.95) {
            // 5% - Estrelas muito brilhantes (principais)
            starType = {
              size: 'w-0.5 h-0.5',
              brightness: 'bg-white/60',
              opacity: 'opacity-80',
              glow: 'shadow-sm shadow-white/20'
            };
          } else if (random > 0.85) {
            // 10% - Estrelas brilhantes médias
            starType = {
              size: 'w-0.5 h-0.5',
              brightness: 'bg-white/45',
              opacity: 'opacity-60',
              glow: ''
            };
          } else if (random > 0.65) {
            // 20% - Estrelas normais visíveis
            starType = {
              size: 'w-0.5 h-0.5',
              brightness: 'bg-white/25',
              opacity: 'opacity-40',
              glow: ''
            };
          } else {
            // 65% - Estrelas fracas (maioria)
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
                transform: `translate(${Math.random() * 15 - 7.5}px, ${Math.random() * 15 - 7.5}px)`
              }}
            />
          );
        })}
        
        {/* Algumas estrelas especiais super brilhantes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`bright-${i}`}
            className="absolute w-1 h-1 bg-white/70 opacity-90 rounded-full shadow-md shadow-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `brightstartTwinkle ${3 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite alternate`,
            }}
          />
        ))}
        
        {/* Shooting stars ocasionais */}
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

      {/* CSS personalizado para animações das estrelas */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(0.9); }
        }
        
        @keyframes brightstartTwinkle {
          0% { opacity: 0.4; transform: scale(0.9); }
          25% { opacity: 0.9; transform: scale(1.3); }
          75% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(1.0); }
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
      `}</style>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 mb-6 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Seekr Logo"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Back</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Sign in to your account and continue your journey
          </p>
        </div>

        {/* Login Container */}
        <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
          {/* Form decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute -top-1 -left-1 w-full h-full bg-gradient-to-br from-gray-700 to-transparent rounded-3xl opacity-10 blur-xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'email' 
                  ? 'border-gray-400 shadow-lg bg-white/5' 
                  : 'border-gray-700 hover:border-gray-600 bg-black/30'
              }`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-transparent outline-none text-white placeholder-gray-500"
                  placeholder="your@email.com"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'password' 
                  ? 'border-gray-400 shadow-lg bg-white/5' 
                  : 'border-gray-700 hover:border-gray-600 bg-black/30'
              }`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 pr-12 bg-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div 
                    onClick={() => setFormData(prev => ({ ...prev, rememberMe: !prev.rememberMe }))}
                    className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                      formData.rememberMe
                        ? 'border-white bg-white/20 backdrop-blur-sm'
                        : 'border-gray-600 hover:border-gray-500 bg-black/30'
                    }`}
                  >
                    {formData.rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-400">Remember me</span>
              </div>
              <button type="button" className="text-sm text-white hover:text-gray-300 transition-colors underline underline-offset-2">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button 
              type="button"
              onClick={handleLogin}
              disabled={!formData.email || !formData.password || isLoading}
              className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
            </button>

            {/* Social Login Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <span className="px-4 text-gray-500 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 bg-black/40 hover:bg-white/5 border border-gray-700 hover:border-gray-600 rounded-xl transition-all duration-300 backdrop-blur-sm group">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white text-sm font-medium">Google</span>
              </button>

              <button type="button" className="flex items-center justify-center gap-3 py-3 px-4 bg-black/40 hover:bg-white/5 border border-gray-700 hover:border-gray-600 rounded-xl transition-all duration-300 backdrop-blur-sm group">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-white text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button type="button" onClick={onShowRegister} className="text-white hover:text-gray-300 font-semibold transition-colors underline underline-offset-2">
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}