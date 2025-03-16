
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/ui/WalletConnect';
import { ThemeToggle } from '@/components/ThemeToggle';
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
    return location.pathname === path || 
           (path === '/activity' && location.pathname === '/activity-preview');
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'bg-background/80 shadow-subtle dark:bg-background/80' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Logo with increased font size and text-gradient */}
          <Link to="/" className="flex items-center mb-3 md:mb-0">
            <div className="font-bold text-2xl tracking-tight text-gradient">Ødds</div>
          </Link>
          
          {/* Navigation - Centered on mobile and right-adjusted on desktop */}
          <div className="pl-20 flex items-center justify-center space-x-1 mb-3 md:mb-0">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg ${isActive('/') ? 'bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium' : ''}`}
              >
                <Ticket className="mr-2 h-4 w-4" /> Current Raffle
              </Button>
            </Link>
            
            <Link to="/activity-preview">
              <Button
                variant={isActive('/activity') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg ${isActive('/activity') ? 'bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium' : ''}`}
              >
                <Clock className="mr-2 h-4 w-4" /> My Activity
              </Button>
            </Link>
            
            <Link to="/history">
              <Button
                variant={isActive('/history') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg ${isActive('/history') ? 'bg-raffle-light-blue text-raffle-blue dark:bg-secondary dark:text-high-contrast font-medium' : ''}`}
              >
                <History className="mr-2 h-4 w-4" /> Raffle History
              </Button>
            </Link>
            
            <ThemeToggle />
          </div>
          
          {/* Wallet Connection */}
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
