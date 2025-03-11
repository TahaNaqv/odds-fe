
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/helpers";

interface AutoEnrolledActivity {
  id: string;
  type: 'purchase';
  raffleId: string;
  timestamp: string;
  ticketCount: number;
  totalSpent: number;
  token: 'USDC' | 'USDT';
  isAutoEnrolled: boolean;
  autoEnrollEndDate?: string;
}

const ActivityPreview = () => {
  const navigate = useNavigate();
  
  // Mock data for auto-enrolled purchases
  const mockActivities: AutoEnrolledActivity[] = generateMockActivities();
  
  // Calculate days between today and March 15, 2025
  const today = new Date();
  const endDate = new Date('2025-03-15');
  const diffTime = endDate.getTime() - today.getTime();
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
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
      
      <Card className="shadow-subtle border border-raffle-light-gray mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Auto-Enrollment Summary</CardTitle>
          <CardDescription>
            You have purchased 5 tickets daily until March 15, 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Daily Quantity:</span>
              <span className="text-sm font-medium">5 tickets</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Auto Enrollment Until:</span>
              <span className="text-sm font-medium">March 15, 2025</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Days:</span>
              <span className="text-sm font-medium">{totalDays} days</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-raffle-light-gray">
              <span className="text-sm font-medium">Total Tickets:</span>
              <span className="text-sm font-bold">{5 * totalDays} tickets</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-sm font-medium">Total Cost:</span>
              <span className="text-sm font-bold">${(5 * totalDays).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4 mb-4">
        {mockActivities.slice(0, 5).map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground mb-6">
        Showing 5 of {mockActivities.length} activities
      </div>
    </div>
  );
};

// Activity Item Component for auto-enrolled tickets
const ActivityItem = ({ activity }: { activity: AutoEnrolledActivity }) => {
  return (
    <Card className="shadow-subtle border border-raffle-light-gray">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-raffle-light-blue">
              <Ticket className="h-5 w-5 text-raffle-blue" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  Ticket Purchase
                </h3>
                <Badge className="text-xs bg-raffle-light-blue text-raffle-blue border-none">
                  Purchase
                </Badge>
                {activity.isAutoEnrolled && (
                  <Badge className="text-xs bg-green-100 text-green-700 border-none">
                    Auto-enrolled
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.timestamp)} • Raffle #{activity.raffleId.split('-')[1]}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-semibold">
              {activity.ticketCount} Ticket{activity.ticketCount !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              ${activity.totalSpent.toFixed(2)} • {activity.token}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Function to generate mock activities for auto-enrolled tickets
function generateMockActivities(): AutoEnrolledActivity[] {
  const activities: AutoEnrolledActivity[] = [];
  
  // Current date for the first purchase
  const startDate = new Date();
  
  // End date (March 15, 2025)
  const endDate = new Date('2025-03-15');
  
  // Calculate total days
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Generate activities for demonstration (first 10 days)
  for (let i = 0; i < Math.min(10, diffDays + 1); i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Create an activity for each day
    activities.push({
      id: `preview-activity-${i}`,
      type: 'purchase',
      raffleId: `raffle-${1000 + i}`,
      timestamp: date.toISOString(),
      ticketCount: 5,
      totalSpent: 5,
      token: 'USDC',
      isAutoEnrolled: i > 0, // First one is manual, rest are auto-enrolled
      autoEnrollEndDate: i === 0 ? endDate.toISOString() : undefined
    });
  }
  
  return activities;
}

export default ActivityPreview;
