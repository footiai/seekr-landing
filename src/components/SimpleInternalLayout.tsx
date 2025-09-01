'use client';

import { useState } from 'react';
import InternalMenu from './InternalMenu';
import UsageDashboard from './UsageDashboard';
import ApiKeysManager from './ApiKeysManager';
import HandsOnApi from './HandsOnApi';
import BillingInternal from './BillingInternal';
import UserSettings from './UserSettings';

export default function SimpleInternalLayout() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-black">
      <InternalMenu 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="ml-80 pt-4">
        {activeSection === 'dashboard' && <UsageDashboard />}
        {activeSection === 'usage' && (
          <div className="text-white p-6">
            <h1 className="text-2xl mb-4">Usage Section</h1>
            <p>Em desenvolvimento...</p>
          </div>
        )}
        {activeSection === 'api' && <ApiKeysManager />}
        {activeSection === 'hands-on' && <HandsOnApi />}
        {activeSection === 'billing' && <BillingInternal />}
        {activeSection === 'settings' && <UserSettings />}
      </div>
    </div>
  );
}