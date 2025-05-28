
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';

const FooterCTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-raffle-blue/20 to-raffle-light-blue/10">
      <div className="container mx-auto">
        <Card className="bg-gradient-to-r from-raffle-blue/20 to-raffle-light-blue/20 backdrop-blur-sm border-raffle-blue/30 p-8 md:p-12 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              The Future of <span className="text-raffle-blue">Fair Games</span> Starts Here
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="px-12 py-4 text-xl font-semibold">
              Join the Waitlist
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg"
            >
              <FileText className="mr-2 h-5 w-5" />
              Read the Whitepaper
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FooterCTASection;
