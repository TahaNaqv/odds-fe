
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Ticket, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  type: 'all' | 'purchases' | 'wins';
}

const EmptyState = ({ type }: EmptyStateProps) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (type) {
      case 'purchases':
        return <Ticket className="h-8 w-8 mx-auto text-muted-foreground mb-3" />;
      case 'wins':
        return <Trophy className="h-8 w-8 mx-auto text-muted-foreground mb-3" />;
      default:
        return <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-3" />;
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case 'purchases':
        return "No Purchases Yet";
      case 'wins':
        return "No Winnings Yet";
      default:
        return "No Activity Yet";
    }
  };
  
  const getMessage = () => {
    switch (type) {
      case 'purchases':
        return "You haven't purchased any raffle tickets yet.";
      case 'wins':
        return "You haven't won any raffles yet. Keep trying your luck!";
      default:
        return "You haven't participated in any raffles yet. Purchase tickets to get started!";
    }
  };
  
  const getButtonText = () => {
    return type === 'purchases' ? 'Buy Tickets' : 'Enter Raffle';
  };
  
  return (
    <Card className="shadow-subtle border border-raffle-light-gray">
      <CardContent className="py-8">
        <div className="text-center">
          {getIcon()}
          <h3 className="text-lg font-medium mb-2">{getTitle()}</h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {getMessage()}
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-6 rounded-xl font-medium shadow-subtle"
          >
            {getButtonText()}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
