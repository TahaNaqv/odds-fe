
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Flame, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import NumberCounter from '@/components/animations/NumberCounter';

const LiveStatsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="destructive" className="mb-4 px-4 py-2 animate-pulse">
            <Flame className="mr-2 h-4 w-4" />
            Live Now
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Current Raffle <span className="text-raffle-blue">Ends Soon</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't miss your chance to win! The current raffle is heating up with growing prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Countdown Timer */}
          <Card className="bg-gradient-to-br from-raffle-blue/10 to-raffle-light-blue/5 border-raffle-blue/30">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Clock className="mr-3 h-8 w-8 text-raffle-blue" />
                Time Remaining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-raffle-blue">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 uppercase tracking-wide">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-raffle-blue">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 uppercase tracking-wide">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-raffle-blue">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-400 uppercase tracking-wide">Seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Prize Pool */}
          <Card className="bg-gradient-to-br from-app-green/10 to-app-vivid-orange/5 border-app-green/30">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <TrendingUp className="mr-3 h-8 w-8 text-app-green" />
                Prize Pool Growing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl md:text-7xl font-bold text-app-green mb-4">
                  <NumberCounter end={4.75} decimals={2} />
                  <span className="text-3xl ml-2">ETH</span>
                </div>
                <Badge variant="success" className="mb-4">
                  <Zap className="mr-1 h-4 w-4" />
                  +12% in last hour
                </Badge>
                <p className="text-gray-400">
                  <NumberCounter end={127} /> tickets sold
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/">
            <Button size="lg" className="px-12 py-4 text-xl font-semibold animate-pulse">
              Enter Current Raffle
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            Your odds improve as fewer people participate. Early entry = better chances!
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsSection;
