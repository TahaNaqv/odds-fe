
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Zap } from 'lucide-react';

const NewHeroSection = () => {
  return (
    <section className="relative px-4 py-20 bg-gradient-to-br from-raffle-blue/10 to-raffle-light-blue/5">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <Badge variant="info" className="mb-6 px-4 py-2 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4" />
            Genesis Raffle Launching Q3 2025
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Own the House.
            <span className="text-raffle-blue bg-gradient-to-r from-raffle-blue to-raffle-light-blue bg-clip-text text-transparent"> Create the Games.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The first permissionless infrastructure for on-chain money games. 
            Where 95% goes to players, and creators capture the house edge.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="px-8 py-4 text-lg font-semibold">
            Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Read the Docs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
