import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedServices } from '@/components/home/FeaturedServices';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { HowItWorks } from '@/components/home/HowItWorks';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { PricingPreview } from '@/components/home/PricingPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { ServiceAreas } from '@/components/home/ServiceAreas';
import { FAQSection } from '@/components/home/FAQSection';
import { AppPromo } from '@/components/home/AppPromo';
import { FloatingCTA } from '@/components/home/FloatingCTA';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <FloatingCTA />
      
      <main className="flex-grow">
        {/* The new Premium Hero */}
        <HeroSection />
        
        {/* Core Services with Glassmorphism */}
        <FeaturedServices />
        
        {/* How it works timeline */}
        <HowItWorks />
        
        {/* Value Proposition */}
        <WhyChooseUs />
        
        {/* Interactive Before/After Gallery */}
        <BeforeAfterSlider />
        
        {/* Tiered Pricing Packages */}
        <PricingPreview />
        
        {/* Social Proof */}
        <Testimonials />
        
        {/* Mobile App Promotion */}
        <AppPromo />
        
        {/* Locations map */}
        <ServiceAreas />
        
        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>
    </div>
  );
};
