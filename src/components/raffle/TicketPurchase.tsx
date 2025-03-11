
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';
import TicketCountSelector from './ticket-purchase/TicketCountSelector';
import AutoEnrollDatePicker from './ticket-purchase/AutoEnrollDatePicker';
import TokenSelector from './ticket-purchase/TokenSelector';

const TicketPurchase = () => {
  const { isConnected } = useWallet();
  const { purchaseTicket, isLoading } = useRaffle();
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Calculate days for auto enrollment
  const daysForAutoEnroll = useMemo(() => {
    if (!date) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }, [date]);
  
  // Calculate total cost based on tickets and days
  const totalTickets = useMemo(() => {
    if (daysForAutoEnroll <= 0) return ticketCount;
    return ticketCount * (daysForAutoEnroll + 1); // +1 to include today
  }, [ticketCount, daysForAutoEnroll]);
  
  // Calculate cost
  const cost = totalTickets * 1; // $1 per ticket
  
  // Handle token selection
  const handleTokenChange = (value: string) => {
    setSelectedToken(value as 'USDC' | 'USDT');
  };
  
  // Handle ticket purchase
  const handlePurchase = () => {
    purchaseTicket({
      ticketCount,
      token: selectedToken,
      autoEnrollEndDate: date
    });
  };

  return (
    <Card className="w-full animate-fade-in shadow-subtle border border-raffle-light-gray">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Purchase Tickets</CardTitle>
        <CardDescription>Select the number of tickets and token to purchase.</CardDescription>
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
          
          <TokenSelector 
            selectedToken={selectedToken}
            cost={cost}
            onTokenChange={handleTokenChange}
          />
          
          <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Ticket Price:</span>
              <span className="text-sm font-medium">$1.00 per ticket</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Daily Quantity:</span>
              <span className="text-sm font-medium">{ticketCount} tickets</span>
            </div>
            {date && (
              <>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Auto Enrollment:</span>
                  <span className="text-sm font-medium">Until {date.toLocaleDateString()} ({daysForAutoEnroll} days)</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Tickets:</span>
                  <span className="text-sm font-medium">{totalTickets} tickets</span>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2 border-t border-raffle-light-gray">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-bold">${cost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          className="w-full bg-raffle-blue hover:bg-raffle-blue/90 text-white shadow-subtle font-medium rounded-xl"
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
