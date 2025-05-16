import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Repeat } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';

const AutoEnroll = () => {
  const { isConnected } = useWallet();
  const { autoEnrollSettings, setAutoEnroll, isLoading } = useRaffle();
  const [isEnabled, setIsEnabled] = useState(autoEnrollSettings?.enabled || false);
  const [date, setDate] = useState<Date | undefined>(autoEnrollSettings?.endDate || undefined);
  
  // Calculate the date range for auto-enrollment
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day
  
  // Maximum date is 3 months from today
  const maxDate = addMonths(today, 3);
  
  useEffect(() => {
    // Update state if autoEnrollSettings change (e.g., from external updates)
    if (autoEnrollSettings) {
      setIsEnabled(autoEnrollSettings.enabled);
      setDate(autoEnrollSettings.endDate || undefined);
    }
  }, [autoEnrollSettings]);
  
  // Handle auto-enroll toggle
  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    
    if (!checked) {
      // If disabling, update immediately
      setAutoEnroll({ enabled: false });
    } else if (date) {
      // If enabling and date is selected, update
      setAutoEnroll({ enabled: true, endDate: date });
    } else if (checked) {
      // If enabling without a date, prompt user visually but don't enable yet
      // The user will need to select a date and then use the Update button
      console.log("Date selection required before auto-entry can be activated");
      // We don't call setAutoEnroll here as we need a date first
    }
  };
  
  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate && isEnabled) {
      // If date is selected and auto-entry is enabled, update
      setAutoEnroll({ enabled: true, endDate: selectedDate });
    }
  };
  
  // Format the selected date
  const formattedDate = date ? format(date, 'PPP') : 'Select a date';

  return (
    <Card className="w-full animate-fade-in shadow-subtle border border-raffle-light-gray">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Auto-Entry</CardTitle>
            <CardDescription className="mt-1">
              Automatically enter future raffles until your selected date.
            </CardDescription>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggle}
            disabled={!isConnected || isLoading}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="date" className="text-sm font-medium">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !date ? 'text-muted-foreground' : ''
                  }`}
                  disabled={!isConnected || !isEnabled || isLoading}
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
                  onSelect={handleDateSelect}
                  disabled={(date) => date < today || date > maxDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="p-4 rounded-xl bg-raffle-light-blue border border-raffle-blue/20">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Repeat className="h-5 w-5 text-raffle-blue" />
              </div>
              <div>
                <h4 className="font-medium text-raffle-blue">How Auto-Entry Works</h4>
                <ul className="mt-2 text-sm space-y-2 text-raffle-dark-gray">
                  <li>• Your wallet will be charged $1 per ticket each day</li>
                  <li>• You'll automatically enter each new raffle with 1 ticket</li>
                  <li>• Auto-Entry will continue until your selected end date</li>
                  <li>• You can disable Auto-Entry at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 border-raffle-light-gray text-raffle-dark-gray shadow-subtle font-medium rounded-xl"
          disabled={!isConnected || !isEnabled || !date || isLoading}
          onClick={() => setAutoEnroll({ enabled: true, endDate: date })}
        >
          {isLoading ? 'Saving...' : 'Update Auto-Entry'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutoEnroll;
