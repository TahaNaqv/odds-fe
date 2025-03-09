
import { useEffect } from 'react';
import RaffleCard from '@/components/raffle/RaffleCard';
import TicketPurchase from '@/components/raffle/TicketPurchase';
import AutoEnroll from '@/components/raffle/AutoEnroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Wallet } from 'lucide-react';
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
        <section className="container mx-auto py-12 md:py-20 animate-children">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-raffle-light-blue px-3 py-1 rounded-full mb-6">
              <span className="text-xs font-medium text-raffle-blue">Running on Base Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Daily Raffles on the Base Network
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Enter daily raffles with $1 tickets using USDC or USDT. Buy multiple tickets to increase your chances of winning.
            </p>
            <div className="flex items-center justify-center gap-4">
              {!isConnected ? (
                <Button
                  onClick={connectWallet}
                  className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-8 py-6 rounded-xl text-lg font-medium shadow-subtle"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet to Play
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const ticketSection = document.getElementById('purchase-section');
                    if (ticketSection) {
                      ticketSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-raffle-blue hover:bg-raffle-blue/90 text-white px-8 py-6 rounded-xl text-lg font-medium shadow-subtle"
                >
                  Enter Current Raffle
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate('/history')}
                className="border-raffle-light-gray rounded-xl font-medium px-6 py-6 text-lg shadow-subtle"
              >
                <Calendar className="mr-2 h-5 w-5" />
                View Past Raffles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Current Raffle Section */}
        <section className="container mx-auto py-12" id="raffle-section">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Current Raffle</h2>
            <RaffleCard raffle={currentRaffle} isLoading={isLoading} />
          </div>
        </section>
        
        {/* Ticket Purchase Section */}
        <section className="container mx-auto py-12" id="purchase-section">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TicketPurchase />
            <AutoEnroll />
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="container mx-auto py-12">
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
