
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Zap, Share, TrendingUp } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Settings,
      title: "Choose Your Template",
      description: "Raffles, predictions, sports markets, custom events",
      color: "text-raffle-blue"
    },
    {
      icon: Zap,
      title: "Set Your Parameters",
      description: "Prize curves, oracle sources, house edge split",
      color: "text-app-green"
    },
    {
      icon: Share,
      title: "Deploy & Share",
      description: "One-click deployment, instant community access",
      color: "text-app-vivid-orange"
    },
    {
      icon: TrendingUp,
      title: "Earn from Every Play",
      description: "Sustainable revenue from your game's success",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-raffle-blue/5 to-app-green/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Idea to On-Chain Game in <span className="text-raffle-blue">Minutes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The creator journey simplified. Build, deploy, and earn from your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-raffle-blue/20 relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <step.icon className={`h-12 w-12 ${step.color}`} />
                  <div className={`text-2xl font-bold ${step.color} opacity-20`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-600">
                  →
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
