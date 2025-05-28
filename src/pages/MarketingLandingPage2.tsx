import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// New sections
import NewHeroSection from '@/components/marketing/NewHeroSection';
import ProblemSection from '@/components/marketing/ProblemSection';
import VisionSection from '@/components/marketing/VisionSection';
import HowItWorksSection from '@/components/marketing/HowItWorksSection';
import RoadmapSection from '@/components/marketing/RoadmapSection';
import WhyBaseSection from '@/components/marketing/WhyBaseSection';
import TechStackSection from '@/components/marketing/TechStackSection';
import TokenSection from '@/components/marketing/TokenSection';
import JoinRevolutionSection from '@/components/marketing/JoinRevolutionSection';
import FooterCTASection from '@/components/marketing/FooterCTASection';

// Existing sections
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
        {/* New sections */}
        <NewHeroSection />
        <ProblemSection />
        <VisionSection />
        <HowItWorksSection />
        <RoadmapSection />
        <WhyBaseSection />
        <TechStackSection />
        <TokenSection />
        <JoinRevolutionSection />
        <FooterCTASection />
        
        {/* Existing sections */}
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
