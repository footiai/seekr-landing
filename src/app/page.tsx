import HeroSection from '@/components/HeroSection';
import NavigationWrapper from '@/components/NavigationWrapper';
import ApiSection from '@/components/ApiSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <NavigationWrapper />
      <ApiSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
