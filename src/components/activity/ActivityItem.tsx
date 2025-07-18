import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, Trophy, Zap } from "lucide-react";
import { formatDate } from "@/utils/helpers";
import TicketModal from "./TicketModal";
import ActivityDetails from "./ActivityDetails";

interface ActivityItemProps {
  activity: {
    id: string;
    type: "purchase" | "win";
    timestamp: string;
    raffleId: string;
    ticketCount?: number;
    totalSpent?: number;
    token?: string;
    prize?: number;
    winningTicket?: number;
    ticketIds?: number[];
    isAutoEnrolled?: boolean;
    autoEnrollId?: string;
  };
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const isPurchase = activity.type === "purchase";
  const isWin = activity.type === "win";
  const isAutoEnrolled = activity.isAutoEnrolled;
  const autoEnrollId = activity.autoEnrollId;

  // Get the auto-enrollment number from the ID
  const getAutoEnrollmentNumber = () => {
    if (!autoEnrollId) return "";

    // Extract the number from the auto-enroll ID (e.g., "auto-enroll-1" -> "1")
    const match = autoEnrollId.match(/\d+$/);
    return match ? ` #${match[0]}` : "";
  };

  return (
    <Card className="shadow-subtle border border-raffle-light-gray card-high-contrast">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                isPurchase
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : "bg-yellow-100 dark:bg-yellow-900/30"
              }`}
            >
              {isPurchase ? (
                <Ticket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-high-contrast">
                  {isPurchase ? "Ticket Purchase" : "Raffle Win"}
                </h3>
                <Badge
                  className={`text-xs ${
                    isPurchase
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                  } border-none`}
                >
                  {isPurchase ? "Purchase" : "Win"}
                </Badge>
                {isPurchase && (
                  <Badge
                    className={`text-xs ${
                      isAutoEnrolled
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    } border-none flex items-center gap-1`}
                  >
                    {isAutoEnrolled && <Zap className="h-3 w-3" />}
                    {isAutoEnrolled
                      ? `Auto-Entry${getAutoEnrollmentNumber()}`
                      : "Manual"}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.timestamp)} • Raffle #{activity.raffleId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <ActivityDetails {...activity} />
            </div>

            {activity.ticketIds && activity.ticketIds.length > 0 && (
              <TicketModal
                ticketIds={activity.ticketIds}
                winningTicket={activity.winningTicket}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityItem;
