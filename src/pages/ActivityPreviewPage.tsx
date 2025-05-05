
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ActivityPreview from '@/components/raffle/ActivityPreview';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivityPreviewPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
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
      
      <Footer />
    </div>
  );
};

export default ActivityPreviewPage;
