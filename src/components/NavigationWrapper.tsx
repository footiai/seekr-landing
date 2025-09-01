'use client';

import { useState } from 'react';
import TopNavigation from './TopNavigation';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SimpleInternalLayout from './SimpleInternalLayout';
import HeroSection from './HeroSection';
import ApiSection from './ApiSection';
import PricingSection from './PricingSection';
import Footer from './Footer';

type Screen = 'home' | 'login' | 'register';

export default function NavigationWrapper() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showLogin = () => setCurrentScreen('login');
  const showRegister = () => setCurrentScreen('register');
  const showHome = () => setCurrentScreen('home');
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <SimpleInternalLayout />;
  }

  return (
    <div className="min-h-screen bg-black">
      <TopNavigation 
        onShowLogin={showLogin}
        onShowRegister={showRegister}
      />
      
      {currentScreen === 'home' && (
        <>
          <HeroSection />
          <ApiSection />
          <PricingSection />
          <Footer />
        </>
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen 
          onClose={showHome}
          onShowRegister={showRegister}
          onLogin={handleLogin}
        />
      )}
      
      {currentScreen === 'register' && (
        <RegisterScreen 
          onClose={showHome}
          onShowLogin={showLogin}
        />
      )}
    </div>
  );
}