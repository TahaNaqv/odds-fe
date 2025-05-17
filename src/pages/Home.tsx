import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useRaffle from "@/hooks/useRaffle";
import HeroSection from "@/components/home/HeroSection";
import MarketingSection from "@/components/home/MarketingSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FAQSection from "@/components/home/FAQSection";

const Home = () => {
  const navigate = useNavigate();
  const { currentRaffle, isLoading } = useRaffle();

  return (
    <div className="flex flex-col min-h-screen bg-app-dark">
      <Header />

      <main className="flex-grow px-4 pb-10">
        <HeroSection />
        <MarketingSection currentRaffle={currentRaffle} isLoading={isLoading} />
        <HowItWorksSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
