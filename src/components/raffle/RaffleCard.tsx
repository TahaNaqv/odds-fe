
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Ticket, Timer, Trophy } from 'lucide-react';
import { formatTimeRemaining, getTimeRemaining } from '@/utils/helpers';
import TicketModal from '@/components/activity/TicketModal';
import useRaffle from '@/hooks/useRaffle';

// Helper function for formatting currency
const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
};

interface RaffleCardProps {
  raffle: {
    id: string;
    startTime: string;
    endTime: string;
    ticketsSold: number;
    maxTickets: number;
    prizePool: number;
    winner?: string;
    winningTicket?: number;
  };
  isLoading?: boolean;
  isPast?: boolean;
}

const RaffleCard = ({ raffle, isLoading = false, isPast = false }: RaffleCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const { userActivity } = useRaffle();
  
  // Find user tickets for current raffle
  const currentRaffleTickets = userActivity
    .filter(activity => activity.raffleId === raffle.id && activity.ticketIds && activity.ticketIds.length > 0)
    .flatMap(activity => activity.ticketIds || []);
  
  useEffect(() => {
    if (isPast) return;
    
    const updateTimer = () => {
      const { hours, minutes, seconds } = getTimeRemaining(raffle.endTime);
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer(); // Initial update
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, [raffle.endTime, isPast]);
  
  if (isLoading) {
    return (
      <Card className="w-full animate-pulse shadow-subtle">
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="pb-2">
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-20 w-full mt-4" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-6 w-full" />
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="w-full overflow-hidden animate-fade-in shadow-subtle border border-raffle-light-gray transition-all duration-300 hover:shadow-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              {isPast ? `Raffle #${raffle.id.split('-')[1]}` : 'Current Raffle'}
            </CardTitle>
            {!isPast && (
              <CardDescription className="text-sm">
                Raffle #{raffle.id.split('-')[1]}
              </CardDescription>
            )}
          </div>
          {!isPast && (
            <Badge variant="outline" className="bg-raffle-light-blue text-raffle-blue border-none px-3 py-1.5 flex items-center gap-2 animate-pulse-subtle">
              <Timer className="h-4 w-4" />
              <span className="text-base font-medium tracking-wide">{timeRemaining}</span>
            </Badge>
          )}
          {isPast && raffle.winner && (
            <Badge className="bg-raffle-blue text-white border-none px-2 py-1 flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              <span className="text-xs font-medium">Completed</span>
            </Badge>
          )}
        </div>
        {isPast && (
          <CardDescription>
            Ended on {new Date(raffle.endTime).toLocaleDateString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center mt-2 mb-1">
          <div className="flex items-center gap-1">
            <Ticket className="h-4 w-4 text-raffle-blue" />
            <span className="text-sm font-medium">
              {raffle.ticketsSold} tickets sold
            </span>
          </div>
          
          {/* Add ticket modal button if user has tickets */}
          {currentRaffleTickets.length > 0 && (
            <TicketModal 
              ticketIds={currentRaffleTickets} 
              winningTicket={raffle.winningTicket}
            />
          )}
        </div>
        
        <div className="mt-4 transition-all duration-500 hover:transform hover:scale-[1.02]">
          <div className="bg-raffle-light-blue rounded-xl p-4 flex items-center justify-between border border-raffle-blue/20">
            <div>
              <p className="text-xs font-medium text-raffle-blue/70">Current Prize Pool</p>
              <p className="text-2xl font-bold text-raffle-blue mt-1">
                {formatCurrency(raffle.prizePool)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-raffle-blue/10 flex items-center justify-center animate-float">
              <Trophy className="h-6 w-6 text-raffle-blue" />
            </div>
          </div>
        </div>
        
        {isPast && raffle.winner && (
          <div className="mt-4 bg-raffle-off-white rounded-xl p-4 border border-raffle-light-gray animate-scale-in">
            <p className="text-xs font-medium text-raffle-dark-gray mb-2">Winner Information</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm">Winner Address:</span>
                <span className="text-sm font-medium">{raffle.winner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Winning Ticket:</span>
                <span className="text-sm font-medium">#{raffle.winningTicket}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {isPast
              ? `${raffle.ticketsSold} tickets sold`
              : `Unlimited entries available`
            }
          </span>
          <span>
            {isPast
              ? `Prize pool: ${formatCurrency(raffle.prizePool)}`
              : `USDC $1 per ticket`
            }
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;
