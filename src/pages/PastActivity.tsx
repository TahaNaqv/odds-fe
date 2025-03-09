
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ArrowRight, Clock, DollarSign, Ticket, Trophy } from 'lucide-react';
import { formatDate, formatCurrency } from '@/utils/helpers';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';

const PastActivity = () => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const { userActivity, refreshUserActivity, isLoading } = useRaffle();
  
  // Filter activities by type
  const purchases = userActivity.filter(activity => activity.type === 'purchase');
  const wins = userActivity.filter(activity => activity.type === 'win');
  
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
            <Card className="shadow-subtle border border-raffle-light-gray">
              <CardContent className="py-12">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Wallet Not Connected</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Connect your wallet to view your raffle activity and transaction history.
                  </p>
                  <Button 
                    onClick={connectWallet}
                    className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-6 rounded-xl font-medium shadow-subtle"
                  >
                    Connect Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Activity History</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="rounded-lg shadow-subtle"
                >
                  {isLoading ? 'Refreshing...' : 'Refresh'}
                </Button>
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all" className="rounded-lg">All Activity</TabsTrigger>
                  <TabsTrigger value="purchases" className="rounded-lg">Purchases</TabsTrigger>
                  <TabsTrigger value="wins" className="rounded-lg">Winnings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  {userActivity.length === 0 ? (
                    <Card className="shadow-subtle border border-raffle-light-gray">
                      <CardContent className="py-8">
                        <div className="text-center">
                          <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
                          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                            You haven't participated in any raffles yet. Purchase tickets to get started!
                          </p>
                          <Button 
                            onClick={() => navigate('/')}
                            className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-6 rounded-xl font-medium shadow-subtle"
                          >
                            Enter Raffle
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {userActivity.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="purchases">
                  {purchases.length === 0 ? (
                    <Card className="shadow-subtle border border-raffle-light-gray">
                      <CardContent className="py-8">
                        <div className="text-center">
                          <Ticket className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-medium mb-2">No Purchases Yet</h3>
                          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                            You haven't purchased any raffle tickets yet.
                          </p>
                          <Button 
                            onClick={() => navigate('/')}
                            className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-6 rounded-xl font-medium shadow-subtle"
                          >
                            Buy Tickets
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {purchases.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="wins">
                  {wins.length === 0 ? (
                    <Card className="shadow-subtle border border-raffle-light-gray">
                      <CardContent className="py-8">
                        <div className="text-center">
                          <Trophy className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                          <h3 className="text-lg font-medium mb-2">No Winnings Yet</h3>
                          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                            You haven't won any raffles yet. Keep trying your luck!
                          </p>
                          <Button 
                            onClick={() => navigate('/')}
                            className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-6 rounded-xl font-medium shadow-subtle"
                          >
                            Enter Raffle
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {wins.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }: { activity: any }) => {
  const isPurchase = activity.type === 'purchase';
  const isWin = activity.type === 'win';
  
  return (
    <Card className="shadow-subtle border border-raffle-light-gray">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              isPurchase ? 'bg-raffle-light-blue' : 'bg-blue-100'
            }`}>
              {isPurchase ? (
                <Ticket className="h-5 w-5 text-raffle-blue" />
              ) : (
                <Trophy className="h-5 w-5 text-yellow-500" />
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">
                  {isPurchase ? 'Ticket Purchase' : 'Raffle Win'}
                </h3>
                <Badge className={`text-xs ${
                  isPurchase ? 'bg-raffle-light-blue text-raffle-blue' : 'bg-yellow-100 text-yellow-700'
                } border-none`}>
                  {isPurchase ? 'Purchase' : 'Win'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activity.timestamp)} • Raffle #{activity.raffleId.split('-')[1]}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            {isPurchase && (
              <>
                <p className="font-semibold">
                  {activity.ticketCount} Ticket{activity.ticketCount !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(activity.totalSpent)} • {activity.token}
                </p>
              </>
            )}
            
            {isWin && (
              <>
                <p className="font-semibold text-green-600">
                  {formatCurrency(activity.prize)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ticket #{activity.winningTicket}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastActivity;
