
import { useState } from 'react';
import { Wallet, Trophy, RepeatIcon, Play } from 'lucide-react';
import StarsBurst from '@/components/effects/StarsBurst';
import NumberCounter from '@/components/animations/NumberCounter';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [key, setKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const resetAnimation = () => {
    setIsAnimating(true);
    setKey(prevKey => prevKey + 1);
  };

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
        
        {/* Enhanced counter section with improved visibility */}
        <div className="relative z-10 mb-4">
          <div className="counter-backdrop absolute inset-0 bg-black/40 blur-sm rounded-xl -z-10"></div>
          <div className="counter-container glass-prize px-6 py-4 inline-block rounded-lg relative z-10">
            <div className="counter-inner relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-0 text-white">
                USDC $
                <NumberCounter 
                  key={key}
                  end={88888} 
                  duration={3000}
                  className="number-counter-hero counter-highlight"
                  loop={true}
                  loopCount={2}
                />
              </h2>
              {isAnimating && (
                <div className="animation-indicator absolute -top-4 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  Animating
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 -top-10 -bottom-6 overflow-hidden pointer-events-none">
            <StarsBurst className="z-0" />
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 animate-fade-in">
          in raffle winnings claimed till date
        </p>
        
        {/* Reset animation button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetAnimation}
          className="animate-pulse-subtle mb-4"
        >
          <Play className="w-4 h-4 mr-2" /> Replay Animation
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
