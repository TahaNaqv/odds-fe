
import React from 'react';
import MarketingHeader from '@/components/marketing/MarketingHeader';
import MarketingFooter from '@/components/marketing/MarketingFooter';

// New sections only
import NewHeroSection from '@/components/marketing/NewHeroSection';
import ProblemSection from '@/components/marketing/ProblemSection';
import VisionSection from '@/components/marketing/VisionSection';
import HowItWorksSection from '@/components/marketing/HowItWorksSection';
import RoadmapSection from '@/components/marketing/RoadmapSection';
import TechStackSection from '@/components/marketing/TechStackSection';
import TokenSection from '@/components/marketing/TokenSection';
import JoinRevolutionSection from '@/components/marketing/JoinRevolutionSection';
import FooterCTASection from '@/components/marketing/FooterCTASection';

// Import custom styles
import '../styles/marketing2.css';

const MarketingLandingPage2 = () => {
  return (
    <div className="marketing2-page flex flex-col min-h-screen">
      <MarketingHeader />
      
      <main className="flex-grow">
        <NewHeroSection />
        <JoinRevolutionSection />
        <ProblemSection />
        <VisionSection />
        <HowItWorksSection />
        <RoadmapSection />
        <TechStackSection />
        <TokenSection />
        <FooterCTASection />
      </main>
      
      <MarketingFooter />
    </div>
  );
};

export default MarketingLandingPage2;
