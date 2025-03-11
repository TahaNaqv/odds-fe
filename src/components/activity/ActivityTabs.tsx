
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ActivityItem from './ActivityItem';
import EmptyState from './EmptyState';

interface ActivityTabsProps {
  userActivity: any[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ActivityTabs = ({ userActivity, isLoading, onRefresh }: ActivityTabsProps) => {
  // Filter activities by type
  const purchases = userActivity.filter(activity => activity.type === 'purchase');
  const wins = userActivity.filter(activity => activity.type === 'win');
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Activity History</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
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
            <EmptyState type="all" />
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
            <EmptyState type="purchases" />
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
            <EmptyState type="wins" />
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
  );
};

export default ActivityTabs;
