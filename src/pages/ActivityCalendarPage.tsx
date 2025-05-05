
import { useState } from "react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ActivityCalendar from '@/components/activity/ActivityCalendar';
import ActivityStats from '@/components/activity/ActivityStats';
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivityCalendarPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow px-4 py-10">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-high-contrast">Activity Calendar</h1>
              <p className="text-muted-foreground mt-2">
                View your raffle tickets and winnings by date
              </p>
            </div>
            <Button
              onClick={() => navigate('/activity-preview')}
              variant="outline"
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              View Default Activity
            </Button>
          </div>
          
          <ActivityStats />
          
          <div className="mt-8">
            <ActivityCalendar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ActivityCalendarPage;
