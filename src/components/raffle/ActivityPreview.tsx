import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/helpers";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AutoEnrolledActivity {
  id: string;
  type: 'purchase';
  raffleId: string;
  timestamp: string;
  ticketCount: number;
  totalSpent: number;
  token: 'USDC' | 'USDT';
  isAutoEnrolled: boolean;
  autoEnrollId?: string;
  autoEnrollEndDate?: string;
}

const ActivityPreview = () => {
  const navigate = useNavigate();
  
  const mockActivities: AutoEnrolledActivity[] = generateMockActivities();
  
  const today = new Date();
  const endDate = new Date('2025-03-15');
  const diffTime = endDate.getTime() - today.getTime();
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
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
        {autoEnrollments.map((enrollment, index) => (
          <AccordionItem 
            key={enrollment.id} 
            value={enrollment.id}
            className="border-none"
          >
            <Card className="shadow-subtle border border-raffle-light-gray">
              <AccordionTrigger className="w-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Auto-Enrollment #{enrollment.id.split('-')[2]}</CardTitle>
                    <Badge className="text-xs bg-green-100 text-green-700 border-none">
                      Active
                    </Badge>
                  </div>
                  <CardDescription>
                    Started on {enrollment.startDate.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </AccordionTrigger>
              
              <AccordionContent>
                <CardContent>
                  <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Daily Quantity:</span>
                      <span className="text-sm font-medium">{enrollment.dailyTickets} tickets</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Auto Enrollment Until:</span>
                      <span className="text-sm font-medium">{enrollment.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Payment Method:</span>
                      <span className="text-sm font-medium">{enrollment.token}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-raffle-light-gray">
                      <span className="text-sm font-medium">Next Purchase:</span>
                      <span className="text-sm font-bold flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        In 24 hours
                      </span>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
      
      <h2 className="text-xl font-semibold mb-4 mt-8">Recent Activity</h2>
      
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
                {activity.autoEnrollId && (
                  <Badge className="text-xs bg-blue-100 text-blue-700 border-none">
                    Plan #{activity.autoEnrollId.split('-')[2]}
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

function generateMockActivities(): AutoEnrolledActivity[] {
  const activities: AutoEnrolledActivity[] = [];
  
  const startDate = new Date();
  
  const endDate = new Date('2025-03-15');
  
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i < Math.min(10, diffDays + 1); i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const autoEnrollId = i % 2 === 0 ? "auto-enroll-1" : "auto-enroll-2";
    const ticketCount = i % 2 === 0 ? 5 : 3;
    const token = i % 2 === 0 ? 'USDC' : 'USDT';
    
    activities.push({
      id: `preview-activity-${i}`,
      type: 'purchase',
      raffleId: `raffle-${1000 + i}`,
      timestamp: date.toISOString(),
      ticketCount: ticketCount,
      totalSpent: ticketCount,
      token: token as 'USDC' | 'USDT',
      isAutoEnrolled: i > 0,
      autoEnrollId: i > 0 ? autoEnrollId : undefined,
      autoEnrollEndDate: i === 0 ? endDate.toISOString() : undefined
    });
  }
  
  return activities;
}

export default ActivityPreview;
