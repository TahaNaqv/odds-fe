
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Wallet, ExternalLink, LogOut, ArrowRight } from 'lucide-react';
import useWallet from '@/hooks/useWallet';
import { formatAddress } from '@/utils/helpers';
import { NETWORK } from '@/utils/constants';

const WalletConnect = () => {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    isCorrectNetwork, 
    connectWallet, 
    switchNetwork,
    disconnectWallet 
  } = useWallet();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = useCallback(() => {
    connectWallet();
  }, [connectWallet]);

  const handleDisconnect = useCallback(() => {
    disconnectWallet();
    setIsOpen(false);
  }, [disconnectWallet]);

  const handleSwitchNetwork = useCallback(() => {
    switchNetwork();
  }, [switchNetwork]);

  // Render connect button if not connected
  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect} 
        disabled={isConnecting}
        size="sm"
        className="bg-raffle-blue hover:bg-raffle-blue/90 text-white font-medium rounded-xl transition-all shadow-subtle"
      >
        {isConnecting ? 'Connecting...' : (
          <>
            <Wallet className="mr-2 h-4 w-4" /> 
            Connect Wallet
          </>
        )}
      </Button>
    );
  }

  // Render network switch button if on wrong network
  if (!isCorrectNetwork) {
    return (
      <Button 
        onClick={handleSwitchNetwork} 
        variant="destructive"
        size="sm"
        className="rounded-xl font-medium shadow-subtle"
      >
        <ArrowRight className="mr-2 h-4 w-4" /> 
        Switch to {NETWORK.chainName}
      </Button>
    );
  }

  // Render wallet info if connected
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-raffle-light-blue text-raffle-blue hover:bg-raffle-light-blue/80 border-none font-medium rounded-xl transition-all shadow-subtle"
        >
          <Wallet className="mr-2 h-4 w-4" /> 
          {formatAddress(address || '')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-muted-foreground">Connected Address</p>
            <p className="font-medium">{formatAddress(address || '', 8)}</p>
          </div>
          
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="font-medium">{NETWORK.chainName}</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => {
                window.open(`${NETWORK.blockExplorerUrls[0]}/address/${address}`, '_blank');
                setIsOpen(false);
              }}
            >
              <ExternalLink className="mr-1 h-3 w-3" /> 
              View on Explorer
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={handleDisconnect}
            >
              <LogOut className="mr-1 h-3 w-3" /> 
              Disconnect
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WalletConnect;
