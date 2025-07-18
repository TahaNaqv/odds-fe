
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Vote, Zap, Trophy } from 'lucide-react';

const TokenSection = () => {
  const utilities = [
    {
      icon: DollarSign,
      title: "Stake & Earn",
      description: "Share in protocol revenues",
      color: "text-app-green"
    },
    {
      icon: Vote,
      title: "Govern",
      description: "Vote on fee distributions",
      color: "text-raffle-blue"
    },
    {
      icon: Zap,
      title: "Create",
      description: "Reduced deployment costs",
      color: "text-app-vivid-orange"
    },
    {
      icon: Trophy,
      title: "Play",
      description: "Access staker-only games",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="marketing2-section-token py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-app-vivid-orange">$ODDS</span> Token
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            More Than a Token. It's Ownership.
          </p>
          <Badge variant="info" className="px-4 py-2">
            Coming Soon
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {utilities.map((utility, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-app-vivid-orange/20">
              <CardHeader>
                <utility.icon className={`h-12 w-12 ${utility.color} mb-4`} />
                <CardTitle className="text-xl">{utility.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{utility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TokenSection;
