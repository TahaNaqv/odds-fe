
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';

const FooterCTASection = () => {
  return (
    <section className="marketing2-section-footer-cta py-20 px-4">
      <div className="container mx-auto">
        <Card className="marketing2-card marketing2-glow-blue p-8 md:p-12 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 marketing2-headline">
              The Future of <span className="marketing2-accent">Fair Games</span> Starts Here
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="marketing2-btn-primary px-12 py-4 text-xl font-semibold">
              Join the Waitlist
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            
            <Button 
              size="lg" 
              className="marketing2-btn-primary px-12 py-4 text-xl font-semibold"
            >
              <FileText className="mr-2 h-6 w-6" />
              Whitepaper
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FooterCTASection;
