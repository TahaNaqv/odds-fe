
import ActivityPreview from '@/components/raffle/ActivityPreview';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivityPreviewPage = () => {
  const navigate = useNavigate();
  
  return (
    <main className="flex-grow px-4 py-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => navigate('/activity-calendar')}
              variant="outline"
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              Calendar View
            </Button>
          </div>
          <ActivityPreview />
        </div>
      </main>
  );
};

export default ActivityPreviewPage;
