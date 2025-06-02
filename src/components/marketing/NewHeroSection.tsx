
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Zap, MessageSquare, Ticket } from 'lucide-react';

const NewHeroSection = () => {
  const socialLinks = [
    { name: "Telegram", icon: MessageSquare },
    { name: "", icon: Ticket }
  ];

  return (
    <section className="marketing2-section-hero relative px-4 py-20">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Badge className="animate-float px-5 py-3 text-base font-medium shadow-lg" style={{
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              transform: 'scale(1.2)',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4), 0 4px 10px rgba(16, 185, 129, 0.2)'
            }}>
              <Zap className="mr-2 h-5 w-5" />
              Genesis Raffle Launching Q3 2025
            </Badge>
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

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Join the Community</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <Button key={index} variant="outline" size="lg">
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
