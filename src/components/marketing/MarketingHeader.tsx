
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/ui/WalletConnect';
import { Ticket, Clock, History, Trophy, Megaphone } from 'lucide-react';

const MarketingHeader = () => {
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
           (path === '/activity-calendar' && (
             location.pathname === '/activity-preview' || 
             location.pathname === '/activity'
           ));
  };

  return (
    <header 
      className={`marketing2-header sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Logo with new octopus design and name */}
          <Link to="/" className="flex items-center mb-3 md:mb-0">
            <img 
              src="/lovable-uploads/c73e7bef-2cc3-4f2d-b867-7ebfbbb7e506.png" 
              alt="Ø Logo" 
              className="h-16 md:h-20 mr-3" 
              style={{ background: 'transparent' }}
            />
            <span className="text-3xl md:text-4xl font-bold marketing2-headline">Ø</span>
          </Link>
          
          {/* Navigation - Centered on mobile and right-adjusted on desktop */}
          <div className="pl-20 flex items-center justify-center space-x-1 mb-3 md:mb-0">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg marketing2-btn-secondary ${isActive('/') ? 'marketing2-btn-primary' : ''}`}
              >
                <Ticket className="mr-2 h-4 w-4" /> Raffle
              </Button>
            </Link>
            
            <Link to="/marketing">
              <Button
                variant={isActive('/marketing') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg marketing2-btn-secondary ${isActive('/marketing') ? 'marketing2-btn-primary' : ''}`}
              >
                <Megaphone className="mr-2 h-4 w-4" /> About
              </Button>
            </Link>
            
            <Link to="/activity-calendar">
              <Button
                variant={isActive('/activity-calendar') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg marketing2-btn-secondary ${isActive('/activity-calendar') ? 'marketing2-btn-primary' : ''}`}
              >
                <Clock className="mr-2 h-4 w-4" /> My Activity
              </Button>
            </Link>
            
            <Link to="/history">
              <Button
                variant={isActive('/history') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg marketing2-btn-secondary ${isActive('/history') ? 'marketing2-btn-primary' : ''}`}
              >
                <History className="mr-2 h-4 w-4" /> Raffle History
              </Button>
            </Link>
            
            <Link to="/referrals">
              <Button
                variant={isActive('/referrals') ? 'secondary' : 'ghost'}
                size="sm"
                className={`rounded-lg marketing2-btn-secondary ${isActive('/referrals') ? 'marketing2-btn-primary' : ''}`}
              >
                <Trophy className="mr-2 h-4 w-4" /> Referrals
              </Button>
            </Link>
          </div>
          
          {/* Wallet Connection */}
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;
