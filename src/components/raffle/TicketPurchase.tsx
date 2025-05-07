
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';
import TicketCountSelector from './ticket-purchase/TicketCountSelector';
import AutoEnrollDatePicker from './ticket-purchase/AutoEnrollDatePicker';

const TicketPurchase = () => {
  const { isConnected } = useWallet();
  const { purchaseTicket, isLoading } = useRaffle();
  const [ticketCount, setTicketCount] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const daysForAutoEnroll = useMemo(() => {
    if (!date) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }, [date]);
  
  const totalTickets = useMemo(() => {
    if (daysForAutoEnroll <= 0) return ticketCount;
    return ticketCount * (daysForAutoEnroll + 1);
  }, [ticketCount, daysForAutoEnroll]);
  
  const cost = totalTickets * 1;
  
  const handlePurchase = () => {
    purchaseTicket({
      ticketCount,
      token: 'USDC',
      autoEnrollEndDate: date
    });
  };

  return (
    <Card className="w-full animate-fade-in shadow-subtle border border-raffle-light-gray">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Purchase Tickets</CardTitle>
        <CardDescription>Select the number of tickets to purchase with USDC.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TicketCountSelector 
            ticketCount={ticketCount} 
            setTicketCount={setTicketCount} 
          />
          
          <AutoEnrollDatePicker 
            date={date}
            onDateSelect={setDate}
            isDisabled={!isConnected || isLoading}
          />
          
          <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Ticket Price:</span>
              <span className="text-sm font-medium">USDC $1.00 per ticket</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <span className="text-sm font-medium">{ticketCount} tickets</span>
            </div>
            {date && (
              <>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Auto-Entry:</span>
                  <span className="text-sm font-medium">Until {date.toLocaleDateString()} ({daysForAutoEnroll} days)</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Tickets:</span>
                  <span className="text-sm font-medium">{totalTickets} tickets</span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2 border-t border-raffle-light-gray">
              <span className="text-sm font-bold text-gray-700">Total:</span>
              <span className="text-sm font-bold">${cost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          className="w-full bg-app-purple hover:bg-app-purple/90 text-white shadow-subtle font-medium rounded-xl"
          disabled={!isConnected || isLoading}
          onClick={handlePurchase}
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              <Ticket className="mr-2 h-4 w-4" />
              Purchase {totalTickets} Ticket{totalTickets !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketPurchase;
