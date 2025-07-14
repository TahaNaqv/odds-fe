
import React from 'react';
import MarketingHeroSection from '@/components/marketing/MarketingHeroSection';
import Web3BenefitsSection from '@/components/marketing/Web3BenefitsSection';
import CommunityStatsSection from '@/components/marketing/CommunityStatsSection';
import LiveStatsSection from '@/components/marketing/LiveStatsSection';
import TwitterFeedSection from '@/components/marketing/TwitterFeedSection';
import TrustSecuritySection from '@/components/marketing/TrustSecuritySection';
import CallToActionSection from '@/components/marketing/CallToActionSection';

const MarketingLandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-app-dark">
      <main className="flex-grow">
        <MarketingHeroSection />
        <Web3BenefitsSection />
        <LiveStatsSection />
        <CommunityStatsSection />
        <TrustSecuritySection />
        <TwitterFeedSection />
        <CallToActionSection />
      </main>
    </div>
  );
};

export default MarketingLandingPage;
