
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface TicketCountSelectorProps {
  ticketCount: number;
  setTicketCount: (count: number) => void;
}

const TicketCountSelector = ({ ticketCount, setTicketCount }: TicketCountSelectorProps) => {
  const handleSliderChange = (value: number[]) => {
    setTicketCount(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setTicketCount(value);
    }
  };

  return (
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
  );
};

export default TicketCountSelector;
