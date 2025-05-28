
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Lock, Users, Cpu, TrendingUp, Globe } from 'lucide-react';

const Web3BenefitsSection = () => {
  const benefits = [
    {
      icon: Lock,
      title: "Trustless & Transparent",
      description: "Smart contracts handle everything. No centralized authority can manipulate results.",
      badge: "Decentralized"
    },
    {
      icon: Coins,
      title: "Low Fees on Base",
      description: "Built on Base for minimal transaction costs. More of your money goes to prizes.",
      badge: "Cost Efficient"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Join our growing web3 family.",
      badge: "Community First"
    },
    {
      icon: Cpu,
      title: "Verifiable Randomness",
      description: "Provably fair random number generation. Every draw is auditable on-chain.",
      badge: "Provably Fair"
    },
    {
      icon: TrendingUp,
      title: "Auto-Compound Winnings",
      description: "Reinvest winnings automatically. Maximize your potential returns effortlessly.",
      badge: "Smart Features"
    },
    {
      icon: Globe,
      title: "Global & Permissionless",
      description: "No KYC, no restrictions. Anyone, anywhere can participate in fair raffles.",
      badge: "Borderless"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-raffle-blue">Web3 Raffles</span> Are Better
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Traditional raffles are broken. Centralized, opaque, and unfair. 
            We're building the future where every raffle is transparent and trustless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-raffle-blue/20 hover:border-raffle-blue/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <benefit.icon className="h-12 w-12 text-raffle-blue" />
                  <Badge variant="secondary" className="text-xs">
                    {benefit.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Web3BenefitsSection;
