import { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from "lucide-react";
import useRaffle from "@/hooks/useRaffle";
import { UserActivity } from "@/hooks/raffle/raffle-types";
import ActivityTicketDetails from "./ActivityTicketDetails";

interface DailyActivity {
  date: Date;
  activities: UserActivity[];
  ticketCount: number;
  hasWinningTicket: boolean;
}

const ActivityCalendar = () => {
  const { userActivity } = useRaffle();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<DailyActivity[]>([]);

  // Group activities by day
  useEffect(() => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const daysWithActivity = days.map((day) => {
      const dayActivities = userActivity.filter((activity) => {
        const activityDate = new Date(activity.timestamp);
        return isSameDay(activityDate, day);
      });

      const ticketCount = dayActivities.reduce((sum, activity) => {
        if (activity.type === "purchase") {
          return sum + (activity.ticketCount || 0);
        }
        return sum;
      }, 0);

      const hasWinningTicket = dayActivities.some(
        (activity) => activity.type === "win"
      );

      return {
        date: day,
        activities: dayActivities,
        ticketCount,
        hasWinningTicket,
      };
    });

    setCalendarDays(daysWithActivity);
  }, [userActivity, currentMonth]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Days of the week header
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="p-4 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-high-contrast flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {/* Week days header */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-medium text-muted-foreground py-1 text-xs"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((dayData, i) => {
          const dayOfWeek = dayData.date.getDay();
          const isCurrentMonth = isSameMonth(dayData.date, currentMonth);

          // Add empty cells for days before the first of the month
          const emptyDaysBefore = i === 0 ? Array(dayOfWeek).fill(null) : [];

          return (
            <div key={dayData.date.toISOString()}>
              {i === 0 &&
                emptyDaysBefore.map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="h-16 bg-secondary/30 rounded-md border border-border/30"
                  ></div>
                ))}

              <div
                className={`h-16 p-1.5 rounded-md border relative ${
                  isCurrentMonth
                    ? "border-border"
                    : "border-border/30 bg-secondary/30 opacity-50"
                } ${
                  isToday(dayData.date)
                    ? "ring-1 ring-primary ring-offset-1"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-xs font-medium ${
                      isToday(dayData.date)
                        ? "text-primary"
                        : "text-high-contrast"
                    }`}
                  >
                    {format(dayData.date, "d")}
                  </span>

                  {dayData.ticketCount > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="sm"
                          variant={
                            dayData.hasWinningTicket ? "default" : "outline"
                          }
                          className={`h-5 px-1.5 gap-0.5 text-xs ${
                            dayData.hasWinningTicket
                              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                              : "text-primary"
                          }`}
                        >
                          <Ticket className="h-2.5 w-2.5" />
                          <span>{dayData.ticketCount}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0">
                        <ActivityTicketDetails
                          activities={dayData.activities}
                          date={dayData.date}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActivityCalendar;
