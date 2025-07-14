
import ActivityCalendar from '@/components/activity/ActivityCalendar';
import ActivityStats from '@/components/activity/ActivityStats';

const ActivityCalendarPage = () => {
  return (
    <main className="flex-grow px-4 py-10">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-high-contrast">Activity Calendar</h1>
            <p className="text-muted-foreground mt-2">
              View your raffle tickets and winnings by date
            </p>
          </div>
          
          <ActivityStats />
          
          <div className="mt-8">
            <ActivityCalendar />
          </div>
        </div>
      </main>
  );
};

export default ActivityCalendarPage;
