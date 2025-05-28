
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Zap } from 'lucide-react';

const NewHeroSection = () => {
  return (
    <section className="marketing2-section-hero relative px-4 py-20">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <Badge className="marketing2-badge mb-6 px-4 py-2 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4" />
            Genesis Raffle Launching Q3 2025
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 marketing2-headline">
            Own the House.
            <span className="marketing2-accent"> Create the Games.</span>
          </h1>
          
          <p className="text-xl md:text-2xl marketing2-body mb-8 max-w-4xl mx-auto">
            The first permissionless infrastructure for on-chain money games. 
            Where 95% goes to players, and creators capture the house edge.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="marketing2-btn-primary px-8 py-4 text-lg font-semibold">
            Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button size="lg" className="marketing2-btn-secondary px-8 py-4 text-lg">
            <FileText className="mr-2 h-5 w-5" />
            Read the Docs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
