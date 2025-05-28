
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MarketingHeroSection from '@/components/marketing/MarketingHeroSection';
import Web3BenefitsSection from '@/components/marketing/Web3BenefitsSection';
import CommunityStatsSection from '@/components/marketing/CommunityStatsSection';
import LiveStatsSection from '@/components/marketing/LiveStatsSection';
import TwitterFeedSection from '@/components/marketing/TwitterFeedSection';
import TrustSecuritySection from '@/components/marketing/TrustSecuritySection';
import CallToActionSection from '@/components/marketing/CallToActionSection';

const MarketingLandingPage2 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-app-dark">
      <Header />
      
      <main className="flex-grow">
        <MarketingHeroSection />
        <Web3BenefitsSection />
        <LiveStatsSection />
        <CommunityStatsSection />
        <TrustSecuritySection />
        <TwitterFeedSection />
        <CallToActionSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketingLandingPage2;
