
import { useEffect } from 'react';
import RaffleCard from '@/components/raffle/RaffleCard';
import TicketPurchase from '@/components/raffle/TicketPurchase';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useRaffle from '@/hooks/useRaffle';
import useWallet from '@/hooks/useWallet';

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
            <p className="text-muted-foreground mb-8 animate-fade-in">
              <span className="text-app-purple font-medium">$88,888</span> in raffle winnings already claimed! Winners are cashing in daily—don't be the one left out! 🎟️
            </p>
          </div>
        </section>
        
        {/* Current Raffle Section */}
        <section className="container mx-auto py-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <RaffleCard raffle={currentRaffle} isLoading={isLoading} />
            
            <div className="flex flex-col justify-center">
              <div className="glass-card p-8 rounded-xl text-center h-full flex items-center">
                <div className="w-full">
                  <p className="text-xl font-bold mb-3 text-gradient">
                    Join today's raffle!
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Buy your tickets now before the timer runs out. The more tickets you buy, the higher your chances of winning!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Ticket Purchase Section */}
        <section className="container mx-auto py-12" id="purchase-section">
          <div className="max-w-xl mx-auto">
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
