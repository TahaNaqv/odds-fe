
import { Card, CardContent } from '@/components/ui/card';
import { TOKENS } from '@/utils/constants';
import { CreditCard } from 'lucide-react';

interface TokenSelectorProps {
  cost: number;
}

const TokenSelector = ({ cost }: TokenSelectorProps) => {
  return (
    <Card className="border border-raffle-light-gray">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#2775CA] flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">USDC</p>
              <p className="text-xs text-muted-foreground">{TOKENS.USDC.name}</p>
            </div>
          </div>
          <p className="font-medium">${cost.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSelector;
