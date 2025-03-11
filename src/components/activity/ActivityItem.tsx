
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Trophy, Zap } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import TicketModal from './TicketModal';
import ActivityDetails from './ActivityDetails';

interface ActivityItemProps {
  activity: {
    id: string;
    type: 'purchase' | 'win';
    timestamp: string;
    raffleId: string;
    ticketCount?: number;
    totalSpent?: number;
    token?: string;
    prize?: number;
    winningTicket?: number;
    ticketIds?: number[];
    isAutoEnrolled?: boolean;
  };
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const isPurchase = activity.type === 'purchase';
  const isWin = activity.type === 'win';
  const isAutoEnrolled = activity.isAutoEnrolled;
  
  return (
    <Card className="shadow-subtle border border-raffle-light-gray">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              isPurchase ? 'bg-raffle-light-blue' : 'bg-blue-100'
            }`}>
              {isPurchase ? (
                <Ticket className="h-5 w-5 text-raffle-blue" />
              ) : (
                <Trophy className="h-5 w-5 text-yellow-500" />
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  {isPurchase ? 'Ticket Purchase' : 'Raffle Win'}
                </h3>
                <Badge className={`text-xs ${
                  isPurchase ? 'bg-raffle-light-blue text-raffle-blue' : 'bg-yellow-100 text-yellow-700'
                } border-none`}>
                  {isPurchase ? 'Purchase' : 'Win'}
                </Badge>
                {isPurchase && (
                  <Badge className={`text-xs ${
                    isAutoEnrolled 
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-indigo-50 text-indigo-700'
                  } border-none flex items-center gap-1`}>
                    {isAutoEnrolled && <Zap className="h-3 w-3" />}
                    {isAutoEnrolled ? 'Auto' : 'Manual'}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.timestamp)} • Raffle #{activity.raffleId.split('-')[1]}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <ActivityDetails {...activity} />
            </div>
            
            {activity.ticketIds && activity.ticketIds.length > 0 && (
              <TicketModal 
                ticketIds={activity.ticketIds} 
                winningTicket={activity.winningTicket}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityItem;
