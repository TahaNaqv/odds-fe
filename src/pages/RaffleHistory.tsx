import { useEffect } from "react";
import RaffleCard from "@/components/raffle/RaffleCard";
import { Button } from "@/components/ui/button";
import { Clock, RotateCcw } from "lucide-react";
import useRaffle from "@/hooks/useRaffle";
import { Skeleton } from "@/components/ui/skeleton";

const RaffleHistory = () => {
  const { pastRaffles, refreshPastRaffles, isLoading } = useRaffle();

  // Handle refresh
  const handleRefresh = () => {
    refreshPastRaffles();
  };

  useEffect(() => {
    // Refresh past raffles when component mounts
    refreshPastRaffles();
  }, [refreshPastRaffles]);

  return (
    <main className="flex-grow px-4 py-10">
      <div className="container mx-auto max-w-4xl animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Raffle History</h1>
          <p className="text-muted-foreground mt-2">
            View all past raffle rounds and winners.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Past Raffles</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="rounded-lg shadow-subtle"
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6">
            <div className="bg-raffle-off-white rounded-xl border border-raffle-light-gray shadow-subtle p-6">
              <Skeleton className="h-48 w-full rounded-md mb-4" />{" "}
              {/* Image Placeholder */}
              <Skeleton className="h-6 w-2/3 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-1/2 mb-2" /> {/* Subtitle */}
              <Skeleton className="h-4 w-1/3" /> {/* Small Text */}
            </div>
          </div>
        ) : pastRaffles.length === 0 ? (
          <div className="bg-raffle-off-white rounded-xl border border-raffle-light-gray shadow-subtle p-12 text-center">
            <Clock className="h-12 w-12 mx-auto text-raffle-blue mb-4" />
            <h3 className="text-xl font-medium mb-2 text-raffle-blue">
              No Past Raffles
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no completed raffles yet. Check back later for results!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pastRaffles.map((raffle) => (
              <RaffleCard key={raffle.id} raffle={raffle} isPast={true} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default RaffleHistory;
