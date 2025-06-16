
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Twitter, MessageCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  const handleTwitterShare = () => {
    const text = "Just joined the Ødds community! 🎲 Fair, transparent, on-chain raffles on Base. The future of gaming is here! #Web3 #Base #DeFi";
    const url = window.location.origin;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-raffle-blue/20 to-raffle-light-blue/10">
      <div className="container mx-auto">
        <Card className="bg-gradient-to-r from-raffle-blue/20 to-raffle-light-blue/20 backdrop-blur-sm border-raffle-blue/30 p-8 md:p-12 text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-raffle-blue">Win Big</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of web3 enthusiasts already playing fair, transparent raffles. 
              Your next win could be just one ticket away.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link to="/">
              <Button size="lg" className="px-12 py-4 text-xl font-semibold">
                <Zap className="mr-2 h-6 w-6" />
                Start Playing Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleTwitterShare}
              className="px-8 py-4 text-lg"
            >
              <Twitter className="mr-2 h-5 w-5" />
              Share with Friends
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-400">
            <span>🎯 Fair odds for everyone</span>
            <span>⚡ Instant payouts</span>
            <span>🔒 100% transparent</span>
            <span>🌍 No restrictions</span>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Stay updated with the latest raffles and wins</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="ghost" 
              onClick={() => window.open('https://x.com/odds_dev', '_blank')}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Follow on Twitter
            </Button>
            <Button 
              variant="ghost"
              onClick={() => window.open('#', '_blank')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Join Telegram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
