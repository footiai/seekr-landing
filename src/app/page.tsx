'use client';

import TopNavigation from '@/components/TopNavigation';
import SimpleInternalLayout from '@/components/SimpleInternalLayout';
import HeroSection from '@/components/HeroSection';
import ApiSection from '@/components/ApiSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;
  }

  if (isLoggedIn) {
    return <SimpleInternalLayout />;
  }

  return (
    <div className="min-h-screen bg-black">
      <TopNavigation />
      
      <>
        <HeroSection />
        <ApiSection />
        <PricingSection />
        <Footer />
      </>
    </div>
  );
}
