
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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow px-4 pb-10">
        {/* Hero Section */}
        <section className="container mx-auto py-6 md:py-8 animate-children">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-raffle-light-blue px-3 py-1 rounded-full mb-6">
              <span className="text-xs font-medium text-raffle-blue">Base Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Daily Raffles
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Enter daily raffles with $1 tickets using USDC or USDT. Buy multiple tickets and auto-enroll to increase your chances of winning.
            </p>
          </div>
        </section>
        
        {/* Current Raffle and Marketing Message Section - side by side */}
        <section className="container mx-auto py-2">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <RaffleCard raffle={currentRaffle} isLoading={isLoading} />
            
            <div className="flex flex-col justify-center">
              <div className="bg-raffle-light-blue text-raffle-blue p-6 rounded-xl border border-raffle-blue/20 text-center shadow-subtle h-full flex items-center">
                <div className="w-full">
                  <div className="flex justify-center mb-1">
                    <span className="text-[4rem] animate-float">💰</span>
                  </div>
                  <p className="text-3xl font-bold mb-2">$88,888</p>
                  <p className="text-base">
                    in raffle winnings already claimed! Winners are cashing in daily—don't be the one left out! 🎟️
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Ticket Purchase Section */}
        <section className="container mx-auto py-8" id="purchase-section">
          <div className="max-w-xl mx-auto">
            <TicketPurchase />
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="container mx-auto py-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 border border-raffle-light-gray bg-white shadow-subtle">
                <div className="h-12 w-12 rounded-full bg-raffle-light-blue flex items-center justify-center mb-4">
                  <span className="text-raffle-blue font-bold">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Buy Tickets</h3>
                <p className="text-muted-foreground">
                  Purchase $1 raffle tickets using USDC or USDT. Buy multiple tickets to increase your chances.
                </p>
              </div>
              
              <div className="rounded-xl p-6 border border-raffle-light-gray bg-white shadow-subtle">
                <div className="h-12 w-12 rounded-full bg-raffle-light-blue flex items-center justify-center mb-4">
                  <span className="text-raffle-blue font-bold">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Wait for Draw</h3>
                <p className="text-muted-foreground">
                  Each raffle lasts for 24 hours. The smart contract randomly selects a winning ticket.
                </p>
              </div>
              
              <div className="rounded-xl p-6 border border-raffle-light-gray bg-white shadow-subtle">
                <div className="h-12 w-12 rounded-full bg-raffle-light-blue flex items-center justify-center mb-4">
                  <span className="text-raffle-blue font-bold">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Collect Winnings</h3>
                <p className="text-muted-foreground">
                  If your ticket wins, the prize pool is automatically transferred to your wallet.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
