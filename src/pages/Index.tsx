import { useEffect } from 'react';
import RaffleCard from '@/components/raffle/RaffleCard';
import TicketPurchase from '@/components/raffle/TicketPurchase';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, Wallet, Trophy, Ticket, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';
import StarsBurst from '@/components/effects/StarsBurst';

const Index = () => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const { currentRaffle, isLoading } = useRaffle();

  return (
    <div className="flex flex-col min-h-screen bg-app-dark">
      <Header />
      
      <main className="flex-grow px-4 pb-10">
        {/* Hero Section */}
        <section className="container mx-auto py-12 md:py-16 animate-children">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block glass px-4 py-1.5 rounded-full mb-8">
              <span className="text-sm font-medium text-gradient">Base Network</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gradient">
              Daily Raffles
            </h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Play every day with $1 tickets in USDC! Buy more to increase your odds and opt in for automatic daily entries!
            </p>
            <div className="flex justify-center mb-2">
              <span className="text-[4rem] animate-float">💰</span>
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient relative z-10">
                USDC $88,888
              </h2>
              <div className="absolute inset-0 -top-10 -bottom-6 overflow-hidden">
                <StarsBurst />
              </div>
            </div>
            <p className="text-muted-foreground mb-8 animate-fade-in">
              in raffle winnings claimed till date
            </p>
          </div>
        </section>
        
        {/* Current Raffle and Ticket Purchase Section - Side by Side */}
        <section className="container mx-auto py-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <RaffleCard raffle={currentRaffle} isLoading={isLoading} />
              
              {/* New Graphic and Marketing Copy */}
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
        
        {/* How It Works Section */}
        <section className="container mx-auto py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Buy Tickets",
                  description: "Purchase $1 raffle tickets using USDC or USDT. Buy multiple tickets to increase your chances."
                },
                {
                  step: 2,
                  title: "Wait for Draw",
                  description: "Each raffle lasts for 24 hours. The smart contract randomly selects a winning ticket."
                },
                {
                  step: 3,
                  title: "Collect Winnings",
                  description: "If your ticket wins, the prize pool is automatically transferred to your wallet."
                }
              ].map((item) => (
                <div key={item.step} className="glass-card p-6 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-app-purple/10 flex items-center justify-center mb-4">
                    <span className="text-app-purple font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
