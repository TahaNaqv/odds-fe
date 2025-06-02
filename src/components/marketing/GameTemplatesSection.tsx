
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Trophy, TrendingUp } from 'lucide-react';

// Using basketball icon from the allowed icons, and creating other icons with available ones
const Basketball = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const CalendarDollar = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
    <path d="M14 12h2v1h-1v1h1v1h-2v1h3v-2h-1v-1h1v-1h-3v1z"/>
  </svg>
);

const Dice = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm2 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm10 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM7 12c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm5 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm5 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM7 16c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm10 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
  </svg>
);

const GameTemplatesSection = () => {
  const gameTemplates = [
    {
      icon: Basketball,
      title: "Single Event",
      description: "Create markets on any match, game, or competition. Perfect for sports communities."
    },
    {
      icon: CalendarDollar,
      title: "Date Prediction",
      description: "When will Bitcoin hit $1M? Let your community bet on milestone moments."
    },
    {
      icon: Trophy,
      title: "Tournament Markets",
      description: "Multi-stage competitions with dynamic odds. Ideal for leagues and championships."
    },
    {
      icon: Dice,
      title: "Number Games",
      description: "Predict exact outcomes like player points or protocol TVL. Pure skill meets probability."
    }
  ];

  const rolloverPool = {
    icon: TrendingUp,
    title: "Roll-over Pools",
    description: "Daily compounding games. Yesterday's winners become today's stake."
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#0A0E27' }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Build Any Game. Own Every Play.
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#94A3B8' }}>
            Choose from battle-tested templates or create something entirely new. Your community, your rules.
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {gameTemplates.map((template, index) => (
            <Card 
              key={index} 
              className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border cursor-pointer"
              style={{ 
                backgroundColor: '#1E293B',
                borderColor: '#2A3441'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF5722';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A3441';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-white opacity-80">
                    <template.icon />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {template.title}
                    </h3>
                    <p style={{ color: '#94A3B8' }}>
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full-width Roll-over Pools Card */}
        <div className="mb-8">
          <Card 
            className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border cursor-pointer"
            style={{ 
              backgroundColor: '#1E293B',
              borderColor: '#2A3441'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FF5722';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 87, 34, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2A3441';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-white opacity-80">
                  <rolloverPool.icon className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {rolloverPool.title}
                  </h3>
                  <p style={{ color: '#94A3B8' }}>
                    {rolloverPool.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p style={{ color: '#94A3B8' }}>
            More templates coming soon. Have an idea?{' '}
            <a 
              href="#" 
              className="transition-colors duration-200 hover:underline"
              style={{ color: '#2196F3' }}
            >
              Let us know →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GameTemplatesSection;
