
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Trophy, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketingHeroSection = () => {
  const handleTwitterShare = () => {
    const text = "Just discovered Ødds - the fairest on-chain raffle platform on Base! 🎲 Fair, transparent, and built for the web3 community. #Web3 #Base #DeFi";
    const url = window.location.origin;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section className="relative px-4 py-20 bg-gradient-to-br from-raffle-blue/10 to-raffle-light-blue/5">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <Badge variant="info" className="mb-4 px-4 py-2 text-sm font-medium">
            <Zap className="mr-2 h-4 w-4" />
            Live on Base Network
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            The Future of
            <span className="text-raffle-blue bg-gradient-to-r from-raffle-blue to-raffle-light-blue bg-clip-text text-transparent"> Fair Raffles</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Built for the web3 community. Transparent, on-chain, and provably fair. 
            Join thousands of crypto enthusiasts already winning on Ødds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold">
              Start Playing <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleTwitterShare}
            className="px-8 py-4 text-lg"
          >
            <Twitter className="mr-2 h-5 w-5" />
            Share on Twitter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-raffle-blue/20">
            <Shield className="h-12 w-12 text-raffle-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">100% On-Chain</h3>
            <p className="text-gray-400">Every raffle is verifiable on Base blockchain. No hidden algorithms.</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-raffle-blue/20">
            <Trophy className="h-12 w-12 text-raffle-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Daily Wins</h3>
            <p className="text-gray-400">New winners every day. Fair odds for everyone in the community.</p>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-raffle-blue/20">
            <Zap className="h-12 w-12 text-raffle-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
            <p className="text-gray-400">Win and get paid instantly. No waiting, no middlemen.</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketingHeroSection;
