

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Zap } from 'lucide-react';

const NewHeroSection = () => {
  return (
    <section className="marketing2-section-hero relative px-4 py-20">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Badge className="marketing2-badge px-4 py-2 text-sm font-medium">
              <Zap className="mr-2 h-4 w-4" />
              Genesis Raffle Launching Q3 2025
            </Badge>
            
            {/* Floating Mascot positioned right next to the badge */}
            <div className="animate-float">
              <img 
                src="/lovable-uploads/4ef4a8f3-b1a1-4393-b3da-da105ac572dc.png" 
                alt="Ødds Mascot" 
                className="w-27 h-27 md:w-36 md:h-36 drop-shadow-[0_0_30px_rgba(255,87,34,0.9)]"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 marketing2-headline">
            Create money games on Base
            <span className="marketing2-accent"> in seconds.</span>
          </h1>
          
          <p className="text-xl md:text-2xl marketing2-body mb-8 max-w-4xl mx-auto">
            The first permissionless infrastructure for on-chain money games.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="marketing2-btn-primary px-8 py-4 text-lg font-semibold">
            Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button size="lg" className="marketing2-btn-primary px-8 py-4 text-lg font-semibold">
            <FileText className="mr-2 h-5 w-5" />
            Whitepaper
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;

