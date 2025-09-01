'use client';

import { useState } from 'react';
import TopNavigation from './TopNavigation';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import InternalLayout from './InternalLayout';

type Screen = 'home' | 'login' | 'register';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showLogin = () => setCurrentScreen('login');
  const showRegister = () => setCurrentScreen('register');
  const showHome = () => setCurrentScreen('home');
  const handleLogin = () => {
    console.log('handleLogin do App chamado, setando isLoggedIn para true');
    setIsLoggedIn(true);
    setCurrentScreen('home');
    console.log('Estado atualizado: isLoggedIn=true, currentScreen=home');
  };

  // Se o usuário estiver logado, mostra o layout interno
  if (isLoggedIn) {
    return <InternalLayout />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* TopNavigation sempre visível */}
      <TopNavigation 
        onShowLogin={showLogin}
        onShowRegister={showRegister}
      />
      
      {/* Conteúdo principal da home */}
      {currentScreen === 'home' && (
        <div className="pt-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Busca Inteligente com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                IA
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Descubra informações precisas e relevantes com nossa tecnologia de busca avançada
            </p>
          </div>
        </div>
      )}

      {/* Modal de Login */}
      {currentScreen === 'login' && (
        <LoginScreen 
          onClose={showHome}
          onShowRegister={showRegister}
          onLogin={handleLogin}
        />
      )}

      {/* Modal de Registro */}
      {currentScreen === 'register' && (
        <RegisterScreen 
          onClose={showHome}
          onShowLogin={showLogin}
        />
      )}
    </div>
  );
}