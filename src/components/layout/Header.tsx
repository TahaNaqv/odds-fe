
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/ui/WalletConnect';
import { Ticket, Clock, History } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Update scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'bg-white/80 shadow-subtle' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-raffle-blue flex items-center justify-center shadow-subtle">
              <Ticket className="h-5 w-5 text-white" />
            </div>
            <div className="font-bold text-lg hidden sm:block">RaffleRiver</div>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button
              variant={isActive('/') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg ${isActive('/') ? 'bg-raffle-light-blue text-raffle-blue font-medium' : ''}`}
            >
              <Ticket className="mr-2 h-4 w-4" /> Current Raffle
            </Button>
          </Link>
          
          <Link to="/activity">
            <Button
              variant={isActive('/activity') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg ${isActive('/activity') ? 'bg-raffle-light-blue text-raffle-blue font-medium' : ''}`}
            >
              <Clock className="mr-2 h-4 w-4" /> My Activity
            </Button>
          </Link>
          
          <Link to="/history">
            <Button
              variant={isActive('/history') ? 'secondary' : 'ghost'}
              size="sm"
              className={`rounded-lg ${isActive('/history') ? 'bg-raffle-light-blue text-raffle-blue font-medium' : ''}`}
            >
              <History className="mr-2 h-4 w-4" /> Raffle History
            </Button>
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-1">
          <Link to="/">
            <Button
              variant={isActive('/') ? 'secondary' : 'ghost'}
              size="icon"
              className={`rounded-lg ${isActive('/') ? 'bg-raffle-light-blue text-raffle-blue' : ''}`}
            >
              <Ticket className="h-4 w-4" />
            </Button>
          </Link>
          
          <Link to="/activity">
            <Button
              variant={isActive('/activity') ? 'secondary' : 'ghost'}
              size="icon"
              className={`rounded-lg ${isActive('/activity') ? 'bg-raffle-light-blue text-raffle-blue' : ''}`}
            >
              <Clock className="h-4 w-4" />
            </Button>
          </Link>
          
          <Link to="/history">
            <Button
              variant={isActive('/history') ? 'secondary' : 'ghost'}
              size="icon"
              className={`rounded-lg ${isActive('/history') ? 'bg-raffle-light-blue text-raffle-blue' : ''}`}
            >
              <History className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Wallet Connection */}
        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;
