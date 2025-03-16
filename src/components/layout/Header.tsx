
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
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo with increased font size */}
          <Link to="/" className="flex items-center mb-3 md:mb-0">
            <div className="font-bold text-2xl text-raffle-blue dark:text-primary">Ødds</div>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center justify-end space-y-3 md:space-y-0 w-full md:w-auto">
            {/* Navigation - Right aligned on desktop */}
            <nav className="flex items-center justify-end space-x-1 mb-3 md:mb-0 md:mr-4">
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
            </nav>
            
            {/* Wallet Connection */}
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
