
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MinusCircle, PlusCircle, Ticket } from 'lucide-react';
import { TOKENS } from '@/utils/constants';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';

const TicketPurchase = () => {
  const { isConnected } = useWallet();
  const { purchaseTicket, isLoading } = useRaffle();
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  
  // Calculate cost
  const cost = ticketCount * 1; // $1 per ticket
  
  // Handle ticket count change from slider
  const handleSliderChange = (value: number[]) => {
    setTicketCount(value[0]);
  };
  
  // Handle ticket count change from input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setTicketCount(value);
    }
  };
  
  // Handle token selection
  const handleTokenChange = (value: string) => {
    setSelectedToken(value as 'USDC' | 'USDT');
  };
  
  // Handle ticket purchase
  const handlePurchase = () => {
    purchaseTicket({
      ticketCount,
      token: selectedToken,
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
          {/* Ticket Count Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="ticket-count" className="text-sm font-medium">
                Number of Tickets
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  disabled={ticketCount <= 1}
                >
                  <MinusCircle className="h-3 w-3" />
                </Button>
                <Input
                  id="ticket-count"
                  type="number"
                  value={ticketCount}
                  onChange={handleInputChange}
                  min={1}
                  className="w-16 h-8 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setTicketCount(ticketCount + 1)}
                >
                  <PlusCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Slider 
              value={[Math.min(ticketCount, 100)]} 
              min={1} 
              max={100} 
              step={1} 
              onValueChange={handleSliderChange} 
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 ticket</span>
              <span>100+ tickets</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Slider sets up to 100 tickets. Use input field for larger amounts.
            </p>
          </div>
          
          {/* Token Selection */}
          <Tabs defaultValue="USDC" onValueChange={handleTokenChange} className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="USDC" className="rounded-lg">USDC</TabsTrigger>
              <TabsTrigger value="USDT" className="rounded-lg">USDT</TabsTrigger>
            </TabsList>
            <TabsContent value="USDC" className="mt-4">
              <div className="p-4 rounded-xl bg-raffle-light-blue border border-raffle-blue/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">$</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">USD Coin</p>
                      <p className="text-xs text-muted-foreground">USDC</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-raffle-blue">${cost.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{cost} USDC</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="USDT" className="mt-4">
              <div className="p-4 rounded-xl bg-raffle-light-blue border border-raffle-blue/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xs">$</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Tether USD</p>
                      <p className="text-xs text-muted-foreground">USDT</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-raffle-blue">${cost.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{cost} USDT</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Summary */}
          <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Ticket Price:</span>
              <span className="text-sm font-medium">$1.00 per ticket</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <span className="text-sm font-medium">{ticketCount} tickets</span>
            </div>
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
              Purchase {ticketCount} Ticket{ticketCount !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketPurchase;
