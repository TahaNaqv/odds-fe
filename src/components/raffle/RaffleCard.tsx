import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Ticket, Trophy } from "lucide-react";
import TicketModal from "@/components/activity/TicketModal";
import useRaffle from "@/hooks/useRaffle";

// Helper function for formatting currency
const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
};

interface RaffleCardProps {
  raffle: {
    id: number;
    title: string;
    description: string;
    maxTickets: number;
    totalTickets: number;
    ticketPrice: string;
    status: string;
    totalPrizeAmount: string;
    platformFee: string;
    referralRewards: string;
    distributedAmount: string;
    isDistributed: boolean;
    winnerId: string | null;
    winningTicketId: number | null;
    transactionHash: string;
    isCreated: boolean;
    tickets: Array<{
      id: number;
      ticketNumber: number;
      groupNumber: number | null;
      prizeAmount: string;
      isDistributed: boolean;
      transactionHash: string | null;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  } | null;
  isLoading?: boolean;
  isPast?: boolean;
}

const RaffleCard = ({
  raffle,
  isLoading = false,
  isPast = false,
}: RaffleCardProps) => {
  const { userActivity = [] } = useRaffle();

  // If no raffle data is available, show a message
  if (!raffle && !isLoading) {
    return (
      <Card className="w-full overflow-hidden animate-fade-in shadow-subtle border border-raffle-light-gray">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-muted-foreground">
            No active raffle at the moment. Check back soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full animate-pulse shadow-subtle">
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="pb-2">
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-20 w-full mt-4" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-6 w-full" />
        </CardFooter>
      </Card>
    );
  }

  // At this point, we know raffle is not null
  const safeRaffle = raffle!;

  // Calculate progress percentage
  const progress =
    (Number(safeRaffle.totalTickets) / safeRaffle.maxTickets) * 100;

  return (
    <Card className="w-full overflow-hidden animate-fade-in shadow-subtle border border-raffle-light-gray transition-all duration-300 hover:shadow-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              {`Raffle # ${safeRaffle.id}`}
            </CardTitle>
            {!isPast && (
              <CardDescription className="text-sm">
                Raffle # {safeRaffle.id}
              </CardDescription>
            )}
          </div>
          {!isPast && (
            <Badge
              variant="outline"
              className="bg-raffle-light-blue text-raffle-blue border-none px-3 py-1.5 flex items-center gap-2"
            >
              <span className="text-base font-medium tracking-wide">
                Target: {formatCurrency(Number(safeRaffle.totalPrizeAmount))}
              </span>
            </Badge>
          )}
          {isPast && safeRaffle.winnerId && (
            <Badge className="bg-raffle-blue text-white border-none px-2 py-1 flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              <span className="text-xs font-medium">Completed</span>
            </Badge>
          )}
        </div>
        {isPast && (
          <CardDescription>
            Ended on {new Date(safeRaffle.updatedAt).toLocaleDateString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center mt-2 mb-1">
          <div className="flex items-center gap-1">
            <Ticket className="h-4 w-4 text-raffle-blue" />
            <span className="text-sm font-medium">
              {safeRaffle?.tickets?.length > 0
                ? `${safeRaffle?.tickets?.length} tickets bought`
                : "No tickets purchased yet"}
            </span>
          </div>

          {/* Add ticket modal button if user has tickets */}
          {safeRaffle?.tickets?.length > 0 && (
            <TicketModal
              ticketIds={safeRaffle.tickets.map((ticket) => ticket.id)}
              winningTicket={safeRaffle.winningTicketId}
            />
          )}
        </div>

        {/* Progress bar showing progress towards target */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(Number(safeRaffle.totalTickets))}</span>
            <span>{formatCurrency(Number(safeRaffle.maxTickets))}</span>
          </div>
          <Progress value={progress} max={100} className="h-2 mt-1" />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">
              {progress.toFixed(1)}% complete
            </span>
          </div>
        </div>

        <div className="mt-4 transition-all duration-500 hover:transform hover:scale-[1.02]">
          <div className="bg-raffle-light-blue rounded-xl p-4 flex items-center justify-between border border-raffle-blue/20">
            <div>
              <p className="text-xs font-medium text-raffle-blue/70">
                Current Prize Pool
              </p>
              <p className="text-2xl font-bold text-raffle-blue mt-1">
                {formatCurrency(Number(safeRaffle.totalTickets))}
              </p>
              <p className="text-xs text-raffle-blue/70 mt-1">
                {formatCurrency(
                  Number(safeRaffle.maxTickets) -
                    Number(safeRaffle.totalTickets)
                )}{" "}
                to go
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-raffle-blue/10 flex items-center justify-center animate-float">
              <Trophy className="h-6 w-6 text-raffle-blue" />
            </div>
          </div>
        </div>

        {isPast && safeRaffle.winnerId && (
          <div className="mt-4 bg-raffle-off-white rounded-xl p-4 border border-raffle-light-gray animate-scale-in">
            <p className="text-xs font-medium text-raffle-dark-gray mb-2">
              Winner Information
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm">Winner Address:</span>
                <span className="text-sm font-medium">
                  {safeRaffle.winnerId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Winning Ticket:</span>
                <span className="text-sm font-medium">
                  #{safeRaffle.winningTicketId}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
          <span>
            {isPast
              ? `${safeRaffle.totalTickets} tickets bought`
              : `${
                  safeRaffle.maxTickets - safeRaffle.totalTickets
                } tickets remaining`}
          </span>
          <span>
            {isPast
              ? `Prize pool: ${formatCurrency(
                  Number(safeRaffle.totalPrizeAmount)
                )}`
              : `${formatCurrency(Number(safeRaffle.ticketPrice))} per ticket`}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;
