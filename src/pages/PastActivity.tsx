
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConnectWalletCard from '@/components/activity/ConnectWalletCard';
import ActivityTabs from '@/components/activity/ActivityTabs';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';

const PastActivity = () => {
  const { isConnected, connectWallet } = useWallet();
  const { userActivity, refreshUserActivity, isLoading } = useRaffle();
  
  // Handle refresh
  const handleRefresh = () => {
    refreshUserActivity();
  };
  
  useEffect(() => {
    // Refresh user activity when component mounts
    if (isConnected) {
      refreshUserActivity();
    }
  }, [isConnected, refreshUserActivity]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow px-4 py-10">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Activity</h1>
            <p className="text-muted-foreground mt-2">
              View your raffle tickets and winnings history.
            </p>
          </div>
          
          {!isConnected ? (
            <ConnectWalletCard onConnect={connectWallet} />
          ) : (
            <ActivityTabs 
              userActivity={userActivity}
              isLoading={isLoading}
              onRefresh={handleRefresh}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PastActivity;
