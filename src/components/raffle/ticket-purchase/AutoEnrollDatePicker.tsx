
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface AutoEnrollDatePickerProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isDisabled: boolean;
}

const AutoEnrollDatePicker = ({ date, onDateSelect, isDisabled }: AutoEnrollDatePickerProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate = date ? format(date, 'PPP') : 'Select a date (optional)';

  return (
    <div className="space-y-2">
      <label htmlFor="auto-enroll-date" className="text-sm font-medium">
        Auto Enrollment (Optional)
      </label>
      <p className="text-xs text-muted-foreground mb-2">
        Pick a date until which you want to be automatically enrolled in daily raffles.
      </p>
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
          You will be automatically enrolled in daily raffles until {format(date, 'PPP')}.
        </p>
      )}
    </div>
  );
};

export default AutoEnrollDatePicker;
