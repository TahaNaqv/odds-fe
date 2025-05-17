import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ConnectWalletCard from "@/components/activity/ConnectWalletCard";
import ActivityTabs from "@/components/activity/ActivityTabs";
import useRaffle from "@/hooks/useRaffle";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import { useAppKitAccount } from "@reown/appkit/react";

const PastActivity = () => {
  const navigate = useNavigate();
  const { isConnected } = useAppKitAccount();
  const { userActivity, refreshUserActivity, isLoading } = useRaffle();

  // Handle refresh
  const handleRefresh = () => {
    refreshUserActivity();
  };

  useEffect(() => {
    // Refresh user activity when component mounts
    if (isConnected) {
      refreshUserActivity();
    }
  }, [isConnected, refreshUserActivity]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow px-4 py-10">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Activity</h1>
              <p className="text-muted-foreground mt-2">
                View your raffle tickets and winnings history.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/activity-calendar")}
                variant="outline"
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Calendar View
              </Button>
              <Button
                onClick={() => navigate("/activity-preview")}
                variant="outline"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Auto-Enroll Preview
              </Button>
            </div>
          </div>

          {!isConnected ? (
            <ConnectWalletCard />
          ) : (
            <ActivityTabs
              userActivity={userActivity}
              isLoading={isLoading}
              onRefresh={handleRefresh}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PastActivity;
