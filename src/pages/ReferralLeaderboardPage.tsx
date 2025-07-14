import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Link, ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAddress, copyToClipboard } from "@/utils/helpers";
import { NETWORK } from "@/utils/constants";
import { toast } from "@/hooks/use-toast";
import { useAppKitAccount } from "@reown/appkit/react";
import {
  getLeaderboard,
  getUserReferralStats,
  LeaderboardEntry,
} from "@/services/referral";

// Type for sort options
type SortField = "referees" | "earnings";
type SortDirection = "asc" | "desc";

const ReferralLeaderboardPage = () => {
  const { address, isConnected } = useAppKitAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [userReferralData, setUserReferralData] =
    useState<LeaderboardEntry | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [sortField, setSortField] = useState<SortField>("earnings");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Function to handle sorting toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new field, set it and default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Function to copy referral code to clipboard
  const handleCopyReferralCode = (code: string) => {
    copyToClipboard(code).then(() => {
      toast({
        title: "Referral Code Copied",
        description: "Your referral code has been copied to clipboard",
      });
    });
  };

  // Fetch user referral data
  useEffect(() => {
    const fetchUserData = async () => {
      if (isConnected && address) {
        setIsLoading(true);
        try {
          const data = await getUserReferralStats(address);
          setUserReferralData(data);
        } catch (error) {
          console.error("Error fetching user referral data:", error);
          setUserReferralData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserReferralData(null);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isConnected, address]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(sortField, sortDirection);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLeaderboardData([]);
      }
    };

    fetchLeaderboard();
  }, [sortField, sortDirection]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 animate-fade-in space-y-8">
        <h1 className="text-3xl font-bold mb-6 text-high-contrast">
          Referral Leaderboard
        </h1>

        {/* First Section: User's Referral Data */}
        <Card className="border border-raffle-light-gray shadow-subtle">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Your Referral Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ) : !isConnected ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  Please connect your wallet to view your referral data.
                </p>
                <div className="flex justify-center">
                  {/* This is just an illustration - the actual connect button is in the header */}
                  <Button
                    variant="outline"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            ) : userReferralData === null ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  You haven't generated a referral code yet. Purchase a raffle
                  ticket to get your unique referral code.
                </p>
                <div className="flex justify-center">
                  <Button asChild>
                    <a
                      href="/"
                      className="bg-app-purple hover:bg-app-purple/90 text-white rounded-xl"
                    >
                      Purchase Tickets
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-high-contrast">Wallet</div>
                  <div className="flex items-center">
                    <span className="mr-2">
                      {userReferralData?.wallet ? formatAddress(userReferralData.wallet, 6) : "N/A"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        userReferralData?.wallet && window.open(
                          `${NETWORK.blockExplorerUrls[0]}/address/${userReferralData.wallet}`,
                          "_blank"
                        )
                      }
                      disabled={!userReferralData?.wallet}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-medium text-high-contrast">
                    Total Referees
                  </div>
                  <div>{typeof userReferralData?.referees === "number" ? userReferralData.referees : 0}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-medium text-high-contrast">
                    Lifetime Earnings
                  </div>
                  <div>
                    ${
                      typeof userReferralData?.earnings === "number"
                        ? userReferralData.earnings.toFixed(2)
                        : "0.00"
                    } USDC
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-medium text-high-contrast">
                    Referral Code
                  </div>
                  <div className="flex items-center">
                    <code className="bg-muted px-2 py-1 rounded mr-2">
                      {userReferralData?.referralCode ?? "N/A"}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        userReferralData?.referralCode && handleCopyReferralCode(userReferralData.referralCode)
                      }
                      disabled={!userReferralData?.referralCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Second Section: Leaderboard */}
        <Card className="border border-raffle-light-gray shadow-subtle mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Wallet</TableHead>
                    <TableHead>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("referees")}
                      >
                        Total Referees
                        {sortField === "referees" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("earnings")}
                      >
                        Lifetime Earnings
                        {sortField === "earnings" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-1 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-1 h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>Referral Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((entry, index) => (
                    <TableRow
                      key={index}
                      className={
                        userReferralData?.wallet === entry.wallet
                          ? "bg-muted/20"
                          : ""
                      }
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-1">
                            {entry.wallet ? formatAddress(entry.wallet, 4) : "N/A"}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              entry.wallet && window.open(
                                `${NETWORK.blockExplorerUrls[0]}/address/${entry.wallet}`,
                                "_blank"
                              )
                            }
                            disabled={!entry.wallet}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {typeof entry.referees === "number" ? entry.referees : 0}
                      </TableCell>
                      <TableCell>
                        ${
                          typeof entry.earnings === "number"
                            ? entry.earnings.toFixed(2)
                            : "0.00"
                        } USDC
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <code className="bg-muted px-2 py-1 rounded text-xs mr-2">
                            {entry.referralCode ?? "N/A"}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              entry.referralCode && handleCopyReferralCode(entry.referralCode)
                            }
                            disabled={!entry.referralCode}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default ReferralLeaderboardPage;
