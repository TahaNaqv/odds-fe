
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AutoEnrollment {
  id: string;
  startDate: Date;
  endDate: Date;
  dailyTickets: number;
  token: string;
}

interface AutoEnrollmentCardProps {
  enrollment: AutoEnrollment;
}

const AutoEnrollmentCard = ({ enrollment }: AutoEnrollmentCardProps) => {
  return (
    <AccordionItem 
      value={enrollment.id}
      className="border-none mb-4"
    >
      <Card className="shadow-subtle border border-raffle-light-gray overflow-hidden">
        <AccordionTrigger className="w-full hover:no-underline">
          <CardHeader className="pb-2 px-5 py-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-left">
                <CardTitle className="text-lg">Auto-Enrollment #{enrollment.id.split('-')[2]}</CardTitle>
                <CardDescription className="mt-0.5">
                  Started on {enrollment.startDate.toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className="text-xs bg-green-100 text-green-700 border-none h-6">
                Active
              </Badge>
            </div>
          </CardHeader>
        </AccordionTrigger>
        
        <AccordionContent>
          <CardContent className="pt-0 px-5 pb-5">
            <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
              <div className="grid grid-cols-2 gap-y-3 mb-4">
                <div className="text-sm text-muted-foreground">Daily Quantity:</div>
                <div className="text-sm font-medium text-right">{enrollment.dailyTickets} tickets</div>
                
                <div className="text-sm text-muted-foreground">Auto Enrollment Until:</div>
                <div className="text-sm font-medium text-right">{enrollment.endDate.toLocaleDateString()}</div>
                
                <div className="text-sm text-muted-foreground">Payment Method:</div>
                <div className="text-sm font-medium text-right">{enrollment.token}</div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-raffle-light-gray">
                <span className="text-sm font-medium">Next Purchase:</span>
                <span className="text-sm font-bold flex items-center text-raffle-blue">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
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
