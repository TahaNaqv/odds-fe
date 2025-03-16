
import RaffleCard from '@/components/raffle/RaffleCard';
import TicketPurchase from '@/components/raffle/TicketPurchase';
import { Trophy, Zap, Ticket, Calendar, Wallet } from 'lucide-react';
import { RaffleData } from '@/hooks/raffle/raffle-types';

interface MarketingSectionProps {
  currentRaffle: RaffleData;
  isLoading: boolean;
}

const MarketingSection = ({ currentRaffle, isLoading }: MarketingSectionProps) => {
  return (
    <section className="container mx-auto py-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <RaffleCard raffle={currentRaffle} isLoading={isLoading} />
          
          {/* Marketing Copy */}
          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-app-purple/20 to-app-blue/20 border border-app-purple/30 animate-fade-in">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 rounded-full bg-app-purple/30 flex items-center justify-center animate-pulse-subtle">
                  <Trophy size={32} className="text-app-bright-purple" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-app-blue flex items-center justify-center">
                  <Zap size={12} className="text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-gradient">Boost Your Chances!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <span className="font-medium text-white">Every USDC $1 ticket is a chance to win big.</span> The 
                  more tickets you buy, the higher your odds of winning the daily prize pool!
                </p>
                
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: <Ticket size={16} />, text: "1 ticket = 1 entry" },
                    { icon: <Calendar size={16} />, text: "Daily drawings" },
                    { icon: <Wallet size={16} />, text: "Instant payouts" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="text-app-purple">{item.icon}</div>
                      <p className="text-xs font-medium text-white">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <TicketPurchase />
      </div>
    </section>
  );
};

export default MarketingSection;
