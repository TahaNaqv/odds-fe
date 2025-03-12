import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TokenSelectorProps {
  selectedToken: 'USDC' | 'USDT';
  cost: number;
  onTokenChange: (value: string) => void;
}

const TokenSelector = ({ selectedToken, cost, onTokenChange }: TokenSelectorProps) => {
  return (
    <Tabs defaultValue={selectedToken} onValueChange={onTokenChange} className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="USDC" className="rounded-lg">USDC</TabsTrigger>
        <TabsTrigger value="USDT" className="rounded-lg">USDT</TabsTrigger>
      </TabsList>
      <TabsContent value="USDC" className="mt-4">
        <div className="p-4 rounded-xl bg-raffle-light-blue border border-raffle-blue/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">$</span>
              </div>
              <div>
                <p className="font-medium text-sm">USD Coin</p>
                <p className="text-xs text-muted-foreground">USDC</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-raffle-blue">${cost.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{cost} USDC</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="USDT" className="mt-4">
        <div className="p-4 rounded-xl bg-raffle-light-blue border border-raffle-blue/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs">$</span>
              </div>
              <div>
                <p className="font-medium text-sm">Tether USD</p>
                <p className="text-xs text-muted-foreground">USDT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-raffle-blue">${cost.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{cost} USDT</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TokenSelector;
