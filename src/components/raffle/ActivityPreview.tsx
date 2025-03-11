
import { Accordion } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AutoEnrollmentCard from "./activity-preview/AutoEnrollmentCard";
import ActivityList from "./activity-preview/ActivityList";
import { generateMockActivities } from "@/utils/mock-activity";

const ActivityPreview = () => {
  const navigate = useNavigate();
  
  const mockActivities = generateMockActivities();
  
  const autoEnrollments = [
    {
      id: "auto-enroll-1",
      startDate: new Date(),
      endDate: new Date('2025-03-15'),
      dailyTickets: 5,
      token: 'USDC'
    },
    {
      id: "auto-enroll-2",
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      endDate: new Date('2025-01-01'),
      dailyTickets: 3,
      token: 'USDT'
    }
  ];
  
  return (
    <div className="container mx-auto max-w-4xl animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/')}
          className="h-9 w-9 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Activity Preview</h1>
          <p className="text-muted-foreground mt-1">
            Here's what your activity will look like with auto-enrollment
          </p>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Active Auto-Enrollments</h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        {autoEnrollments.map((enrollment) => (
          <AutoEnrollmentCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </Accordion>
      
      <h2 className="text-xl font-semibold mb-4 mt-8">Recent Activity</h2>
      
      <ActivityList activities={mockActivities} />
    </div>
  );
};

export default ActivityPreview;
