
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Zap, DollarSign, Users } from 'lucide-react';

const VisionSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "95% to Winners",
      description: "Smart contracts enforce fair distribution",
      color: "text-app-green"
    },
    {
      icon: Zap,
      title: "Anyone Can Create",
      description: "Deploy custom money games in minutes",
      color: "text-raffle-blue"
    },
    {
      icon: DollarSign,
      title: "Creators Earn",
      description: "Keep up to 50% of the 5% protocol fee",
      color: "text-app-vivid-orange"
    },
    {
      icon: Users,
      title: "Players Own",
      description: "Token holders govern the protocol",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="marketing2-section-vision py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What If Players Got <span className="text-app-green">95%</span> Instead of <span className="text-red-400">30%</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            The future we're building changes everything about money games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-raffle-blue/20 p-6 text-center">
              <CardContent className="p-0">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
