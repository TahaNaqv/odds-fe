
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Trophy } from 'lucide-react';
import { formatDate, formatCurrency } from '@/utils/helpers';

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
  };
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const isPurchase = activity.type === 'purchase';
  const isWin = activity.type === 'win';
  
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
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.timestamp)} • Raffle #{activity.raffleId.split('-')[1]}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            {isPurchase && (
              <>
                <p className="font-semibold">
                  {activity.ticketCount} Ticket{activity.ticketCount !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(activity.totalSpent!)} • {activity.token}
                </p>
              </>
            )}
            
            {isWin && (
              <>
                <p className="font-semibold text-green-600">
                  {formatCurrency(activity.prize!)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ticket #{activity.winningTicket}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityItem;
