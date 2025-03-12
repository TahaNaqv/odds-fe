
import { formatCurrency } from '@/utils/helpers';

interface ActivityDetailsProps {
  type: 'purchase' | 'win';
  ticketCount?: number;
  totalSpent?: number;
  token?: string;
  prize?: number;
  winningTicket?: number;
}

const ActivityDetails = ({ type, ticketCount, totalSpent, token, prize, winningTicket }: ActivityDetailsProps) => {
  const isPurchase = type === 'purchase';
  
  if (isPurchase) {
    return (
      <>
        <p className="font-semibold text-high-contrast">
          {ticketCount} Ticket{ticketCount !== 1 ? 's' : ''}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(totalSpent!)} • {token}
        </p>
      </>
    );
  }

  return (
    <>
      <p className="font-semibold text-green-600 dark:text-green-400">
        {formatCurrency(prize!)}
      </p>
      <p className="text-sm text-muted-foreground">
        Ticket #{winningTicket}
      </p>
    </>
  );
};

export default ActivityDetails;
