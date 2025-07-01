
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

  return (
    <header 
      className={`marketing2-header sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with octopus design and name */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/873f0dd0-339d-4807-be0d-940991e98998.png" 
              alt="Ødds Logo" 
              className="h-16 md:h-20 mr-3" 
              style={{ background: 'transparent' }}
            />
            <span className="text-3xl md:text-4xl font-bold marketing2-headline">Ødds</span>
          </Link>
          
          {/* Play Raffle Button */}
          <Link to="/home">
            <Button className="marketing2-btn-primary px-6 py-2 text-lg font-semibold">
              Play Raffle
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;
