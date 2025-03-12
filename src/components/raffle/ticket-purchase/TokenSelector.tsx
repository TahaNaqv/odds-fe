
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    </Tabs>
  );
};

export default TokenSelector;
