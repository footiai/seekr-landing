'use client';

import { useState, useEffect } from 'react';
import TopNavigation from '@/components/TopNavigation';
import LoginScreen from '@/components/LoginScreen';
import RegisterScreen from '@/components/RegisterScreen';
import SimpleInternalLayout from '@/components/SimpleInternalLayout';
import HeroSection from '@/components/HeroSection';
import ApiSection from '@/components/ApiSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

type Screen = 'home' | 'login' | 'register';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const { isLoggedIn, isLoading } = useAuth();

  const showLogin = () => setCurrentScreen('login');
  const showRegister = () => setCurrentScreen('register');
  const showHome = () => setCurrentScreen('home');

  // Effect to close modal on successful login
  useEffect(() => {
    if (isLoggedIn) {
      setCurrentScreen('home');
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;
  }

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
