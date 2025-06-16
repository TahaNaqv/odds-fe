
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Expand, Unlock, Users } from 'lucide-react';

const RoadmapSection = () => {
  const phases = [
    {
      icon: Rocket,
      phase: "Q3 2025",
      title: "Genesis",
      description: "Daily raffles go live. Staking opens.",
      color: "text-app-green",
      status: "Coming Soon"
    },
    {
      icon: Expand,
      phase: "Q4 2025",
      title: "Expansion",
      description: "New game types. Multi-chain deployment.",
      color: "text-raffle-blue",
      status: "Planned"
    },
    {
      icon: Unlock,
      phase: "Q1 2026",
      title: "Permissionless",
      description: "Open game creation. Anyone can build.",
      color: "text-app-vivid-orange",
      status: "Planned"
    },
    {
      icon: Users,
      phase: "2026+",
      title: "Full DAO",
      description: "Complete decentralization. Community-run.",
      color: "text-purple-400",
      status: "Vision"
    }
  ];

  return (
    <section className="marketing2-section-roadmap py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building in Public. <span className="text-raffle-blue">Launching with Purpose.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our transparent roadmap to revolutionizing on-chain gaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-raffle-blue/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <phase.icon className={`h-12 w-12 ${phase.color}`} />
                  <Badge variant="outline">{phase.status}</Badge>
                </div>
                <div className={`text-lg font-bold ${phase.color} mb-2`}>{phase.phase}</div>
                <CardTitle className="text-xl">{phase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{phase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
