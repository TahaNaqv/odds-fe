
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Ticket, Trophy, DollarSign, Users, Clock } from 'lucide-react';
import { formatTimeRemaining, getTimeRemaining } from '@/utils/helpers';
import TicketModal from '@/components/activity/TicketModal';
import PastRaffleResultsModal from '@/components/raffle/PastRaffleResultsModal';
import useRaffle from '@/hooks/useRaffle';

// Helper function for formatting currency
const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
};

// Helper function to calculate lottery duration
const calculateLotteryDuration = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

interface RaffleCardProps {
  raffle: {
    id: string;
    startTime: string;
    endTime: string | null;
    ticketsSold: number;
    maxTickets: number;
    targetAmount: number;
    prizePool: number;
    progress: number;
    winner?: string;
    winningTicket?: number;
  };
  isLoading?: boolean;
  isPast?: boolean;
}

const RaffleCard = ({ raffle, isLoading = false, isPast = false }: RaffleCardProps) => {
  const { userActivity } = useRaffle();
  
  // Find user tickets for current raffle
  const currentRaffleTickets = userActivity
    .filter(activity => activity.raffleId === raffle.id && activity.ticketIds && activity.ticketIds.length > 0)
    .flatMap(activity => activity.ticketIds || []);
  
  // Calculate mock stats for past raffles
  const uniqueWallets = isPast ? Math.floor(raffle.ticketsSold * 0.3) + Math.floor(Math.random() * 20) : 0;
  
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
            <Badge variant="outline" className="bg-raffle-light-blue text-raffle-blue border-none px-3 py-1.5 flex items-center gap-2">
              <span className="text-base font-medium tracking-wide">
                Target: $1,000
              </span>
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
            Ended on {new Date(raffle.endTime || '').toLocaleDateString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center mt-2 mb-1">
          <div className="flex items-center gap-1">
            <Ticket className="h-4 w-4 text-raffle-blue" />
            <span className="text-sm font-medium">
              {currentRaffleTickets.length > 0 ? `${currentRaffleTickets.length} tickets bought` : 'No tickets purchased yet'}
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
        
        {/* Progress bar showing progress towards target */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(raffle.prizePool)}</span>
            <span>{formatCurrency(raffle.targetAmount)}</span>
          </div>
          <Progress 
            value={raffle.progress} 
            max={100} 
            className="h-2 mt-1"
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">
              {raffle.progress.toFixed(1)}% complete
            </span>
          </div>
        </div>
        
        <div className="mt-4 transition-all duration-500 hover:transform hover:scale-[1.02]">
          <div className="bg-raffle-light-blue rounded-xl p-4 flex items-center justify-between border border-raffle-blue/20">
            <div>
              <p className="text-xs font-medium text-raffle-blue/70">Current Prize Pool</p>
              <p className="text-2xl font-bold text-raffle-blue mt-1">
                {formatCurrency(raffle.prizePool)}
              </p>
              <p className="text-xs text-raffle-blue/70 mt-1">
                {formatCurrency(raffle.targetAmount - raffle.prizePool)} to go
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-raffle-blue/10 flex items-center justify-center animate-float">
              <Trophy className="h-6 w-6 text-raffle-blue" />
            </div>
          </div>
        </div>
        
        {/* Replace winner information section with modal button for past raffles */}
        {isPast && raffle.winner && (
          <div className="mt-4">
            <PastRaffleResultsModal 
              raffleId={raffle.id}
              totalTickets={raffle.ticketsSold}
              prizePool={raffle.prizePool}
            />
          </div>
        )}

        {/* Stats section for past raffles */}
        {isPast && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{uniqueWallets}</p>
                  <p className="text-xs text-muted-foreground">Unique wallets</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {raffle.endTime ? calculateLotteryDuration(raffle.startTime, raffle.endTime) : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Lottery duration</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {!isPast && (
        <CardFooter>
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {`${raffle.maxTickets - raffle.ticketsSold} tickets remaining`}
            </span>
            <span>
              USDC $1 per ticket
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default RaffleCard;
