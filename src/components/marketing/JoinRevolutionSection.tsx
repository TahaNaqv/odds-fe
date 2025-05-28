
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Gamepad2, Code, MessageSquare, ExternalLink } from 'lucide-react';

const JoinRevolutionSection = () => {
  const ways = [
    {
      icon: Users,
      title: "Creators",
      description: "Apply for early access to build",
      action: "Apply Now",
      color: "text-raffle-blue"
    },
    {
      icon: Gamepad2,
      title: "Players",
      description: "Join waitlist for Genesis Raffle",
      action: "Join Waitlist",
      color: "text-app-green"
    },
    {
      icon: Code,
      title: "Builders",
      description: "Contribute to open development",
      action: "Start Building",
      color: "text-app-vivid-orange"
    }
  ];

  const socialLinks = [
    { name: "Discord", icon: MessageSquare },
    { name: "Telegram", icon: MessageSquare },
    { name: "Twitter", icon: ExternalLink },
    { name: "GitHub", icon: Code }
  ];

  return (
    <section className="marketing2-section-join py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Early. <span className="text-raffle-blue">Be an Owner.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Three ways to get involved in the revolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ways.map((way, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-raffle-blue/20 text-center">
              <CardHeader>
                <way.icon className={`h-16 w-16 mx-auto mb-4 ${way.color}`} />
                <CardTitle className="text-2xl">{way.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6">{way.description}</p>
                <Button className="w-full" size="lg">
                  {way.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-6">Join the Community</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <Button key={index} variant="outline" size="lg">
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinRevolutionSection;
