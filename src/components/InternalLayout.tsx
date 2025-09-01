'use client';

import { useState } from 'react';
import InternalMenu from './InternalMenu';
import UsageDashboard from './UsageDashboard';

export default function InternalLayout() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-8">
            <h1 className="text-white text-2xl mb-4">Dashboard</h1>
            <UsageDashboard />
          </div>
        );
      case 'usage':
        return <div className="p-8 text-white text-xl">Seção de Usage em desenvolvimento...</div>;
      case 'api':
        return <div className="p-8 text-white text-xl">Seção de API em desenvolvimento...</div>;
      case 'hands-on':
        return <div className="p-8 text-white text-xl">Seção Hands-on API em desenvolvimento...</div>;
      case 'billing':
        return <div className="p-8 text-white text-xl">Seção de Billing em desenvolvimento...</div>;
      case 'settings':
        return <div className="p-8 text-white text-xl">Seção de Settings em desenvolvimento...</div>;
      default:
        return (
          <div className="p-8">
            <h1 className="text-white text-2xl mb-4">Dashboard</h1>
            <UsageDashboard />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <InternalMenu 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="pl-80 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
}