import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";
import AutoEnrollmentCard from "./AutoEnrollmentCard";
import ActivityList from "./ActivityList";
import useRaffle from "@/hooks/useRaffle";

const ActivityPreview = () => {
  const navigate = useNavigate();
  const { userActivity } = useRaffle();

  // For now, we'll show a message that auto-enrollments are not yet implemented
  // This can be enhanced later when auto-enrollment functionality is added
  const autoEnrollments: any[] = [];

  return (
    <div className="container mx-auto max-w-4xl animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="h-9 w-9 rounded-full shadow-subtle"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-high-contrast">
            Activity Preview
          </h1>
          <p className="text-medium-contrast mt-1">
            Here's what your activity will look like with auto-enrollment
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-high-contrast">
        Auto-Enrollments
      </h2>

      {autoEnrollments.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {autoEnrollments.map((enrollment) => (
            <AutoEnrollmentCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No auto-enrollments found</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 mt-8 text-high-contrast">
        Recent Activity
      </h2>

      <ActivityList activities={userActivity} limit={5} />
    </div>
  );
};

export default ActivityPreview;
