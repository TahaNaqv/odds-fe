
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar as CalendarIcon, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AutoEnrollDatePickerProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isDisabled: boolean;
}

const AutoEnrollDatePicker = ({ date, onDateSelect, isDisabled }: AutoEnrollDatePickerProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate = date ? format(date, 'PPP') : 'Select a date';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <label htmlFor="auto-enroll-date" className="text-sm font-medium">
          Auto-Entry (Optional)
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            disabled={isDisabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 pointer-events-auto" 
          align="start"
          side="bottom"
          sideOffset={5}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateSelect}
            disabled={(date) => date < today}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {date && (
        <p className="text-xs text-raffle-blue">
          You will be automatically entered in daily raffles until {format(date, 'PPP')}.
        </p>
      )}
    </div>
  );
};

export default AutoEnrollDatePicker;
