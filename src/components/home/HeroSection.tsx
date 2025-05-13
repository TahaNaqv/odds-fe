
import { Wallet, Trophy } from 'lucide-react';
import StarsBurst from '@/components/effects/StarsBurst';
import NumberCounter from '@/components/animations/NumberCounter';

const HeroSection = () => {
  return (
    <section className="container mx-auto py-12 md:py-16 animate-children">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-block glass px-4 py-1.5 rounded-full mb-8">
          <span className="text-sm font-medium text-gradient">Base Network</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gradient">
          Daily Raffles
        </h1>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
          Play every day with $1 tickets in USDC. Buy more to increase your odds and opt in for automatic daily entries!
        </p>
        <div className="flex justify-center mb-2">
          <span className="text-[4rem] animate-float">💰</span>
        </div>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient relative z-10 px-8 py-2 inline-block">
            USDC $<NumberCounter 
              end={88888} 
              duration={3000} 
              className="number-counter-hero"
            />
          </h2>
          <div className="absolute inset-0 -top-10 -bottom-6 overflow-hidden">
            <StarsBurst />
          </div>
        </div>
        <p className="text-muted-foreground mb-8 animate-fade-in">
          in raffle winnings claimed till date
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
