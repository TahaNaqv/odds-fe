
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface AutoEnrollment {
  id: string;
  startDate: Date;
  endDate: Date;
  dailyTickets: number;
  token: string;
  status: 'active' | 'inactive';
}

interface AutoEnrollmentCardProps {
  enrollment: AutoEnrollment;
}

const AutoEnrollmentCard = ({ enrollment }: AutoEnrollmentCardProps) => {
  return (
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
              <Badge className={cn(
                "text-xs border-none",
                enrollment.status === 'active' 
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              )}>
                {enrollment.status === 'active' ? 'Active' : 'Inactive'}
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
  );
};

export default AutoEnrollmentCard;
