import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ConnectWalletCard = () => {
  return (
    <Card className="shadow-subtle border border-raffle-light-gray">
      <CardContent className="py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Wallet Not Connected</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Connect your wallet to view your raffle activity and transaction
            history.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectWalletCard;
