import { useNavigate } from "react-router-dom";
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
    <div className="marketing2-page">
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
    </div>
  );
};

export default Home;
