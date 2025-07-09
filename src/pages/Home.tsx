import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import useRaffle from "@/hooks/useRaffle";
import HeroSection from "@/components/home/HeroSection";
import MarketingSection from "@/components/home/MarketingSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FAQSection from "@/components/home/FAQSection";

// Import marketing2 styles for consistent color scheme
import '../styles/marketing2.css';

const Home = () => {
  const navigate = useNavigate();
  const { currentRaffle, isLoading } = useRaffle();

  return (
    <div className="marketing2-page flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow px-4 pb-10">
        <div className="marketing2-section-hero">
          <HeroSection />
        </div>
        <div className="marketing2-section-problem">
          <MarketingSection currentRaffle={currentRaffle} isLoading={isLoading} />
        </div>
        <div className="marketing2-section-vision">
          <HowItWorksSection />
        </div>
        <div className="marketing2-section-howitworks">
          <FAQSection />
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
};

export default Home;
