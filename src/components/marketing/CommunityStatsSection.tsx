
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Trophy, DollarSign, Twitter } from 'lucide-react';
import NumberCounter from '@/components/animations/NumberCounter';

const CommunityStatsSection = () => {
  const stats = [
    {
      icon: Users,
      label: "Active Players",
      value: 2847,
      prefix: "",
      suffix: "+",
      color: "text-raffle-blue"
    },
    {
      icon: Trophy,
      label: "Total Winners",
      value: 892,
      prefix: "",
      suffix: "",
      color: "text-app-green"
    },
    {
      icon: DollarSign,
      label: "ETH Distributed",
      value: 127.5,
      prefix: "",
      suffix: " ETH",
      color: "text-app-vivid-orange"
    },
    {
      icon: MessageCircle,
      label: "Twitter Followers",
      value: 15600,
      prefix: "",
      suffix: "+",
      color: "text-blue-400"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-raffle-blue/5 to-raffle-light-blue/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="text-raffle-blue">Growing Community</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Thousands of web3 enthusiasts are already part of the Ødds community. 
            Don't miss out on the action!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://x.com/odds_dev', '_blank')}
              className="px-8"
            >
              <Twitter className="mr-2 h-5 w-5" />
              Follow on Twitter
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('#', '_blank')}
              className="px-8"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Telegram
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/70 backdrop-blur-sm border-raffle-blue/20 text-center p-6">
              <CardContent className="p-0">
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.prefix}
                  <NumberCounter end={stat.value} decimals={stat.label === "ETH Distributed" ? 1 : 0} />
                  {stat.suffix}
                </div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStatsSection;
