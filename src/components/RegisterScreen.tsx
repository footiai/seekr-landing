'use client';

import { useState } from 'react';

interface RegisterScreenProps {
  onClose: () => void;
  onShowLogin: () => void;
}

export default function RegisterScreen({ onClose, onShowLogin }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [focusedField, setFocusedField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      const strength = Math.min(value.length * 25, 100);
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const handleRegister = async () => {
    alert('Account created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/2 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="h-16 mb-6 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Seekr Logo"
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Account</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Get API tokens for web search
          </p>
        </div>

        <div className="bg-black/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl shadow-gray-500/10 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'name' ? 'border-gray-400 shadow-lg bg-white/5' : 'border-gray-700 hover:border-gray-600 bg-black/30'
              }`}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'email' ? 'border-gray-400 shadow-lg bg-white/5' : 'border-gray-700 hover:border-gray-600 bg-black/30'
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
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'password' ? 'border-gray-400 shadow-lg bg-white/5' : 'border-gray-700 hover:border-gray-600 bg-black/30'
              }`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 pr-12 bg-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Enter a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength < 50 ? 'text-red-400' : passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className={`relative rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'confirmPassword' ? 'border-gray-400 shadow-lg bg-white/5' : 'border-gray-700 hover:border-gray-600 bg-black/30'
              }`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 pr-12 bg-transparent outline-none text-white placeholder-gray-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfirmPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}
                  className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    formData.agreeToTerms ? 'border-white bg-white/20 backdrop-blur-sm' : 'border-gray-600 hover:border-gray-500 bg-black/30'
                  }`}
                >
                  {formData.agreeToTerms && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-white hover:text-gray-300 underline underline-offset-2">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="text-white hover:text-gray-300 underline underline-offset-2">
                  Privacy Policy
                </button>
              </p>
            </div>

            <button 
              type="button"
              onClick={handleRegister}
              disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.agreeToTerms || formData.password !== formData.confirmPassword}
              className="relative w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-sm text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-0.5 hover:scale-[1.02] border border-white/30 hover:border-white/50 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Create Account
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </button>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button type="button" onClick={onShowLogin} className="text-white hover:text-gray-300 font-semibold transition-colors underline underline-offset-2">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}