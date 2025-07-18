import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, AlertCircle, Loader2 } from "lucide-react";
import useRaffle from "@/hooks/useRaffle";
import { isValidReferralCode } from "@/lib/utils";
import TicketCountSelector from "./ticket-purchase/TicketCountSelector";
import { toast } from "@/hooks/use-toast";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Zap, Calendar, DollarSign } from "lucide-react";
import AutoEnrollDatePicker from "./ticket-purchase/AutoEnrollDatePicker";
import { RAFFLE } from "@/utils/constants";
import { TOKENS } from "@/utils/constants";

const TicketPurchase = () => {
  const { isConnected, address } = useAppKitAccount();
  const { isAuthenticated, authenticate } = useAuthContext();
  const { purchaseTicket, isLoading, currentRaffle: actualCurrentRaffle, activeRaffles: actualActiveRaffles } =
    useRaffle();
  
  // Use actual raffle data from hooks
  const currentRaffle = actualCurrentRaffle;
  const activeRaffles = actualActiveRaffles;
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedToken, setSelectedToken] =
    useState<keyof typeof TOKENS>("mUSDC");
  const [autoEntry, setAutoEntry] = useState(1);
  const [referralCode, setReferralCode] = useState("");
  const [referralError, setReferralError] = useState<string | null>(null);
  const [maxTicketsError, setMaxTicketsError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-fill referral code from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode && isValidReferralCode(refCode)) {
      setReferralCode(refCode);
      // Clear the ref parameter from URL to avoid confusion
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("ref");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, []);

  const isValidCode = useMemo(() => {
    if (!referralCode) {
      setReferralError("Referral code is required");
      return false;
    }

    // Convert to lowercase before validation
    const lowerCode = referralCode.toLowerCase();
    setReferralCode(lowerCode);

    // Check if the code format is valid
    const isValid = isValidReferralCode(lowerCode);
    if (!isValid) {
      setReferralError("Invalid referral code format");
      return false;
    }

    setReferralError(null);
    return true;
  }, [referralCode]);

  // Calculate the total number of tickets including auto-entry
  const totalTickets = useMemo(() => {
    return autoEntry * ticketCount;
  }, [ticketCount, autoEntry]);

  // Calculate the total cost
  const totalCost = totalTickets * RAFFLE.ticketPrice;

  // Check if purchase exceeds maximum available tickets
  useEffect(() => {
    if (!currentRaffle) return;

    const remainingTickets =
      currentRaffle.maxTickets - currentRaffle.totalTickets;

    if (ticketCount > remainingTickets) {
      setMaxTicketsError(`Only ${remainingTickets} tickets are available`);
    } else {
      setMaxTicketsError(null);
    }
  }, [ticketCount, currentRaffle]);

  const handlePurchase = async () => {
    if (!isValidCode) return;
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase tickets.",
        variant: "destructive",
      });
      return;
    }

    // Check authentication
    if (!isAuthenticated) {
      try {
        await authenticate();
      } catch (error) {
        toast({
          title: "Authentication failed",
          description: "Please try connecting your wallet again.",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate ticket count against remaining tickets
    const remainingTickets =
      currentRaffle.maxTickets - currentRaffle.totalTickets;
    if (ticketCount > remainingTickets) {
      toast({
        title: "Too many tickets",
        description: `Only ${remainingTickets} tickets are available for this raffle.`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await purchaseTicket({
        ticketCount,
        token: selectedToken,
        autoEntry,
        referralCode: referralCode.toLowerCase(),
      });
    } catch (error) {
      console.error("Error in handlePurchase:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReferralCodeChange = (value: string) => {
    setReferralCode(value);
    if (referralError) {
      setReferralError(null);
    }
  };

  if (!currentRaffle) {
    return (
      <Card className="shadow-subtle">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Loading raffle...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in shadow-subtle border border-raffle-light-gray">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Purchase Tickets
        </CardTitle>
        <CardDescription>
          Select the number of tickets to purchase with USDC.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TicketCountSelector
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
          />

          {maxTicketsError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Maximum tickets exceeded</p>
                <p className="mt-1">{maxTicketsError}</p>
              </div>
            </div>
          )}

          {/* Token Selection */}
          {/* <div className="space-y-2">
            <Label htmlFor="token">Token</Label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(TOKENS).map(([key, token]) => (
                <Button
                  key={key}
                  variant={selectedToken === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedToken(key as keyof typeof TOKENS)}
                  className="justify-start"
                >
                  {token.symbol}
                </Button>
              ))}
            </div>
          </div> */}

          {/* Referral Code Input */}
          <div className="space-y-2">
            <label
              htmlFor="referralCode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Referral Code <span className="text-app-light-pink">*</span>
            </label>
            <Input
              id="referralCode"
              placeholder="Enter 8-character referral code"
              value={referralCode}
              onChange={(e) => handleReferralCodeChange(e.target.value)}
              className={referralError ? "border-app-light-pink" : ""}
              disabled={isProcessing}
            />
            {referralError && (
              <div className="flex items-center text-xs text-app-purple/70 mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {referralError}
              </div>
            )}
          </div>

          {/* Auto Entry Selector */}
          <div className="space-y-2">
            <label
              htmlFor="autoEntry"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auto Entry <span className="text-app-light-pink">*</span>
            </label>
            <Select
              value={autoEntry.toString()}
              onValueChange={(value) => setAutoEntry(parseInt(value))}
              disabled={isProcessing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select auto entry count" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: Math.min(activeRaffles.length || 1, 10) },
                  (_, i) => i + 1
                ).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Entry" : "Entries"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Number of consecutive raffles to enter automatically (
              {activeRaffles.length || 1} available)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-raffle-off-white border border-raffle-light-gray">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Ticket Price:
              </span>
              <span className="text-sm font-medium">USDC $1.00 per ticket</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <span className="text-sm font-medium">{ticketCount} tickets</span>
            </div>
            {autoEntry > 1 && (
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Auto-Entry:
                </span>
                <span className="text-sm font-medium">
                  For {autoEntry} {autoEntry === 1 ? "entry" : "entries"}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-raffle-light-gray">
              <span className="text-sm font-bold text-gray-700">Total:</span>
              <span className="text-sm font-bold">
                {totalTickets} tickets (${totalCost.toFixed(2)})
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-full marketing2-btn-primary shadow-subtle font-medium rounded-xl"
          disabled={
            !isConnected ||
            isLoading ||
            !isValidCode ||
            !!maxTicketsError ||
            isProcessing
          }
          onClick={handlePurchase}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Ticket className="mr-2 h-4 w-4" />
              Purchase {totalTickets} Ticket{totalTickets !== 1 ? "s" : ""}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicketPurchase;
