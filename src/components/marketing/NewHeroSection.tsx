
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Zap } from 'lucide-react';

const NewHeroSection = () => {
  const socialLinks = [
    { name: "", icon: null, customIcon: "/lovable-uploads/c7e26bc5-0310-409e-96fb-f8052c54ff20.png" },
    { name: "", icon: null, customIcon: "/lovable-uploads/20369439-3d77-4245-902b-3acfc0bae2e6.png" }
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
          <a href="https://forms.gle/EzsATAaYMTZUYS67A" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="marketing2-btn-primary px-8 py-4 text-lg font-semibold">
              Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          
          <a href="https://oddswhitepaper.notion.site/dds-Whitepaper-199639bfaaee80f38f66d7115352bd26" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="marketing2-btn-primary px-8 py-4 text-lg font-semibold">
              <FileText className="mr-2 h-5 w-5" />
              Whitepaper
            </Button>
          </a>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center gap-6 mb-6">
            <h3 className="text-2xl font-bold">Join the Community</h3>
            <img 
              src="/lovable-uploads/7fca3aae-025c-49f8-a25d-0546338b9b97.png" 
              alt="Mascot" 
              className="h-20 w-20"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(255, 87, 34, 0.6))'
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={index === 0 ? "https://t.me/+RLhhKgpeDYFmZTdh" : "https://x.com/odds_dev"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="flex items-center justify-center">
                  {link.customIcon ? (
                    <img src={link.customIcon} alt="" className="h-5 w-5" />
                  ) : (
                    <link.icon className="h-5 w-5" />
                  )}
                  {link.name}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
