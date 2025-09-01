'use client';

import { useState } from 'react';
import TopNavigation from './TopNavigation';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

type Screen = 'home' | 'login' | 'register';

export default function NavigationWrapper() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const showLogin = () => setCurrentScreen('login');
  const showRegister = () => setCurrentScreen('register');
  const showHome = () => setCurrentScreen('home');

  return (
    <>
      <TopNavigation 
        onShowLogin={showLogin}
        onShowRegister={showRegister}
      />
      
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
    </>
  );
}