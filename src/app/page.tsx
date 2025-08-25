import HeroSection from '@/components/HeroSection';
import TopNavigation from '@/components/TopNavigation';
import ApiSection from '@/components/ApiSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <TopNavigation />
      <ApiSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
