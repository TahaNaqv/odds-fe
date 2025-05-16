
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { addDays } from 'date-fns';
import { useEffect } from 'react';

interface AutoEnrollDatePickerProps {
  days: number | null;
  onDaysSelect: (days: number | null) => void;
  isDisabled: boolean;
}

const AutoEnrollDatePicker = ({ days, onDaysSelect, isDisabled }: AutoEnrollDatePickerProps) => {
  // Create an array of options from 1 to 10 days
  const dayOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  
  // Calculate the end date based on selected days
  const endDate = days ? addDays(new Date(), days) : null;

  // Set default to 1 day if no selection
  useEffect(() => {
    if (days === null) {
      onDaysSelect(1);
    }
  }, [days, onDaysSelect]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <label htmlFor="auto-enroll-days" className="text-sm font-medium">
          Auto-Entry
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Buy tickets daily, automatically. Set it and forget it.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select
        value={days?.toString() || "1"}
        onValueChange={(value) => onDaysSelect(parseInt(value))}
      >
        <SelectTrigger
          id="auto-enroll-days"
          className="w-full"
        >
          <SelectValue placeholder="Select number of days" />
        </SelectTrigger>
        <SelectContent>
          {dayOptions.map((day) => (
            <SelectItem key={day} value={day.toString()}>
              {day} {day === 1 ? 'day' : 'days'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {days && (
        <p className="text-xs text-raffle-blue">
          You will be automatically entered in daily raffles for {days} {days === 1 ? 'day' : 'days'} (until {endDate?.toLocaleDateString()}).
        </p>
      )}
    </div>
  );
};

export default AutoEnrollDatePicker;
