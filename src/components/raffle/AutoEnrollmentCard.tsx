import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface AutoEnrollment {
  id: string;
  startDate: Date;
  endDate: Date;
  dailyTickets: number;
  token: string;
  status: "active" | "inactive";
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
      <Card className="shadow-subtle border border-white/10">
        <AccordionTrigger className="w-full [&[data-state=open]]:text-current [&[data-state=open]>svg]:rotate-180 hover:no-underline">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg text-high-contrast">
                    Auto-Enrollment #{enrollment.id}
                  </CardTitle>
                  <Badge
                    className={cn(
                      "text-xs px-3 py-0.5 ml-2 font-medium",
                      enrollment.status === "active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-gray-200 text-gray-800 border-gray-300"
                    )}
                  >
                    {enrollment.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription className="mt-1 text-medium-contrast">
                  Started on {enrollment.startDate.toLocaleDateString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </AccordionTrigger>

        <AccordionContent>
          <CardContent>
            <div className="p-4 rounded-xl bg-secondary border border-white/10">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-medium-contrast">
                  Daily Quantity:
                </span>
                <span className="text-sm font-medium text-high-contrast">
                  {enrollment.dailyTickets} tickets
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-medium-contrast">
                  Auto Enrollment Until:
                </span>
                <span className="text-sm font-medium text-high-contrast">
                  {enrollment.endDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-medium-contrast">
                  Payment Method:
                </span>
                <span className="text-sm font-medium text-high-contrast">
                  {enrollment.token}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-sm font-medium text-high-contrast">
                  Next Purchase:
                </span>
                <span className="text-sm font-bold text-high-contrast flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-app-purple" />
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
