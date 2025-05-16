
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ticket, AlertCircle } from 'lucide-react';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';
import { isValidReferralCode } from '@/lib/utils';
import TicketCountSelector from './ticket-purchase/TicketCountSelector';
import AutoEnrollDatePicker from './ticket-purchase/AutoEnrollDatePicker';
import { addDays } from 'date-fns';

const TicketPurchase = () => {
  const { isConnected } = useWallet();
  const { purchaseTicket, isLoading } = useRaffle();
  const [ticketCount, setTicketCount] = useState(1);
  const [autoDays, setAutoDays] = useState<number | null>(1); // Set default to 1 day
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralError, setReferralError] = useState<string | null>(null);
  
  const isValidCode = useMemo(() => {
    if (!referralCode) {
      setReferralError('Referral code is required');
      return false;
    }
    
    // Check if the code format is valid
    const isValid = isValidReferralCode(referralCode.toLowerCase());
    if (!isValid) {
      setReferralError('Invalid referral code format');
      return false;
    }
    
    setReferralError(null);
    return true;
  }, [referralCode]);
  
  // Calculate the immediate ticket purchase count
  const immediateTickets = ticketCount;
  
  // Calculate the total number of tickets including auto-enrollment for future days
  const totalTickets = useMemo(() => {
    // For auto-enrollment, we multiply the ticket count by the number of days
    return autoDays ? (autoDays * ticketCount) : ticketCount;
  }, [ticketCount, autoDays]);
  
  // Calculate the total cost 
  const totalCost = totalTickets * 1; // $1 per ticket
  
  const handlePurchase = () => {
    if (!isValidCode) return;
    
    // Calculate end date based on selected days
    const autoEnrollEndDate = autoDays ? addDays(new Date(), autoDays) : undefined;
    
    purchaseTicket({
      ticketCount,
      token: 'USDC',
      autoEnrollEndDate,
      referralCode: referralCode.toLowerCase()
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
          
          {/* Referral Code Input */}
          <div className="space-y-2">
            <label htmlFor="referralCode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Referral Code <span className="text-app-light-pink">*</span>
            </label>
            <Input
              id="referralCode"
              placeholder="Enter 8-character referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className={referralError ? "border-app-light-pink" : ""}
            />
            {referralError && (
              <div className="flex items-center text-xs text-app-purple/70 mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {referralError}
              </div>
            )}
          </div>
          
          <AutoEnrollDatePicker 
            days={autoDays}
            onDaysSelect={setAutoDays}
            isDisabled={false}
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
            {autoDays && autoDays > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Auto-Entry:</span>
                <span className="text-sm font-medium">For {autoDays} {autoDays === 1 ? 'day' : 'days'}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-raffle-light-gray">
              <span className="text-sm font-bold text-gray-700">Total:</span>
              <span className="text-sm font-bold">{totalTickets} tickets (${totalCost.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          className="w-full bg-app-purple hover:bg-app-purple/90 text-white shadow-subtle font-medium rounded-xl"
          disabled={!isConnected || isLoading || !isValidCode}
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
