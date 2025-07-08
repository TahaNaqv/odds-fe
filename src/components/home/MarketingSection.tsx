
import RaffleCard from '@/components/raffle/RaffleCard';
import TicketPurchase from '@/components/raffle/TicketPurchase';
import { Trophy, Zap, Ticket, Calendar, Wallet, Users, Link } from 'lucide-react';
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
          <div className="marketing2-card p-6 rounded-xl marketing2-gradient-blue animate-fade-in">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 rounded-full marketing2-card flex items-center justify-center animate-pulse-subtle">
                  <Trophy size={32} className="marketing2-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full marketing2-secondary-accent flex items-center justify-center">
                  <Zap size={12} className="marketing2-headline" />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 marketing2-headline">Three Ways to Win!</h3>
                <p className="marketing2-body text-sm leading-relaxed">
                  <span className="font-medium marketing2-headline">Each $1 ticket is a unique chance to win big.</span> Your ticket could be randomly selected for the double-prize group, equal-prize group, or try again next time!
                </p>
                
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: <Users size={16} />, text: "Three prize groups" },
                    { icon: <Trophy size={16} />, text: "2x prize possible" },
                    { icon: <Wallet size={16} />, text: "95% to winners" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="marketing2-accent">{item.icon}</div>
                      <p className="text-xs font-medium marketing2-headline">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* New referral code explainer */}
            <div className="mt-4 border-t border-white/30 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Link size={16} className="marketing2-accent" />
                <h4 className="text-sm font-bold marketing2-headline">Need a referral code?</h4>
              </div>
              <p className="text-xs marketing2-body">
                All tickets require a valid referral code from an existing player. When you purchase tickets, you'll receive your own referral code to share with others.
              </p>
            </div>
          </div>
        </div>
        
        <TicketPurchase />
      </div>
    </section>
  );
};

export default MarketingSection;
