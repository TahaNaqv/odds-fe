
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Shield, TrendingUp, Droplets } from 'lucide-react';

const WhyBaseSection = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "$0.001 Gas",
      description: "Money games for everyone",
      color: "text-app-green"
    },
    {
      icon: Shield,
      title: "Ethereum Security",
      description: "Battle-tested infrastructure",
      color: "text-raffle-blue"
    },
    {
      icon: TrendingUp,
      title: "Growing Ecosystem",
      description: "Where communities thrive",
      color: "text-app-vivid-orange"
    },
    {
      icon: Droplets,
      title: "Native Liquidity",
      description: "Deep pools from day one",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="marketing2-section-whybase py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built Where <span className="text-raffle-blue">Builders Build</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Base provides the perfect foundation for the next generation of on-chain gaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-raffle-blue/20 p-6 text-center">
              <CardContent className="p-0">
                <benefit.icon className={`h-12 w-12 mx-auto mb-4 ${benefit.color}`} />
                <h3 className="text-lg font-bold mb-2 text-white">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBaseSection;
