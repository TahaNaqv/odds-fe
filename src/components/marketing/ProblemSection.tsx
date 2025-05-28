
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Lock, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Hidden Operator Tax",
      description: "Legacy systems pocket 50-70% in \"admin costs\"",
      color: "text-red-400"
    },
    {
      icon: Lock,
      title: "Zero Creative Control",
      description: "Can't build the games your community wants",
      color: "text-orange-400"
    },
    {
      icon: TrendingDown,
      title: "No Upside for Players",
      description: "Win or lose, you'll never own the platform",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-red-500/5 to-orange-500/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Traditional Lotteries Keep <span className="text-red-400">70%</span>. We're Changing That.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Three broken realities that have plagued the gaming industry for too long.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-red-400/20 p-8 text-center">
              <CardContent className="p-0">
                <problem.icon className={`h-16 w-16 mx-auto mb-6 ${problem.color}`} />
                <h3 className="text-xl font-bold mb-4 text-white">{problem.title}</h3>
                <p className="text-gray-400 leading-relaxed">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
