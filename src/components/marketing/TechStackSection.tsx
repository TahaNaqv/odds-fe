
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Zap, Eye, Shield } from 'lucide-react';

const TechStackSection = () => {
  const components = [
    {
      icon: Code,
      title: "Modular Smart Contracts",
      description: "Plug-and-play game logic.",
      color: "text-raffle-blue"
    },
    {
      icon: Zap,
      title: "Chainlink VRF",
      description: "Provably fair randomness.",
      color: "text-app-green"
    },
    {
      icon: Shield,
      title: "Multi-Oracle Support",
      description: "Pyth, Chainlink, UMA ready.",
      color: "text-app-vivid-orange"
    },
    {
      icon: Eye,
      title: "Open Source",
      description: "Every line will be auditable.",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="marketing2-section-techstack py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Infrastructure You Can <span className="text-app-green">Trust</span>.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built on proven technology with transparency at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((component, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-app-green/20">
              <CardHeader>
                <component.icon className={`h-12 w-12 ${component.color} mb-4`} />
                <CardTitle className="text-xl">{component.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{component.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
